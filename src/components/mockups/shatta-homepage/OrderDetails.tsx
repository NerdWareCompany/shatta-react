import React, { useState } from 'react';
import { Header } from './layout/Header';
import { Footer } from './layout/Footer';
import { 
  ArrowLeft, 
  Download, 
  Package, 
  Truck, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  CreditCard, 
  FileText, 
  RotateCcw, 
  Printer, 
  X, 
  Share2, 
  HelpCircle,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface OrderItem {
  id: string;
  name: string;
  category: string;
  color: string;
  size?: string;
  price: string;
  priceNum: number;
  quantity: number;
  image: string;
}

export interface OrderDetailsData {
  id: string;
  date: string;
  time: string;
  status: 'Delivered' | 'Shipped' | 'Processing';
  estimatedDelivery?: string;
  trackingNumber?: string;
  carrier?: string;
  paymentMethod: string;
  cardLast4?: string;
  items: OrderItem[];
  shippingAddress: {
    name: string;
    street: string;
    city: string;
    state: string;
    country: string;
    phone: string;
  };
  subtotal: number;
  shippingFee: number;
  discount: number;
  tax: number;
  total: number;
}

const DEFAULT_ORDER: OrderDetailsData = {
  id: 'ORD-8934-21',
  date: 'May 12, 2025',
  time: '14:32 PM',
  status: 'Delivered',
  estimatedDelivery: 'May 15, 2025 by 5:00 PM',
  trackingNumber: 'ARX-982341908-EG',
  carrier: 'Aramex Express Logistics',
  paymentMethod: 'Credit Card (Visa)',
  cardLast4: '4242',
  items: [
    {
      id: 'prod-1',
      name: 'Signature Royal Sateen Cushion Cover',
      category: 'LIVING ROOM',
      color: 'Gold & Ivory',
      size: '50x50 cm',
      price: 'EGP 4,250',
      priceNum: 4250,
      quantity: 1,
      image: 'https://api.shatta.com/storage/259/CUSH1_433.jpg'
    },
    {
      id: 'prod-2',
      name: 'Egyptian Cotton Luxury Duvet Set',
      category: 'BEDROOM',
      color: 'Pure White',
      size: 'King (240x220 cm)',
      price: 'EGP 4,200',
      priceNum: 4200,
      quantity: 1,
      image: 'https://api.shatta.com/storage/4480/lehaf_138.webp'
    }
  ],
  shippingAddress: {
    name: 'Sarah Mahmoud',
    street: '12 El Zamalek Street, Apt 4B',
    city: 'Zamalek, Cairo',
    state: 'Cairo Governorate',
    country: 'Egypt',
    phone: '+20 10 1234 5678'
  },
  subtotal: 8450,
  shippingFee: 0,
  discount: 450,
  tax: 450,
  total: 8450
};

interface OrderDetailsProps {
  orderData?: OrderDetailsData;
  onBack?: () => void;
}

export function OrderDetails({ orderData = DEFAULT_ORDER, onBack }: OrderDetailsProps) {
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const formatCurrency = (val: number) => {
    return `EGP ${val.toLocaleString('en-US')}`;
  };

  const handleDownloadInvoice = () => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      setShowInvoiceModal(true);
    }, 400);
  };

  const handlePrint = () => {
    window.print();
  };

  // Timeline steps computation
  const timelineSteps = [
    { title: 'Order Placed', date: `${orderData.date}, ${orderData.time}`, completed: true },
    { title: 'Processing', date: 'May 12, 16:00', completed: true },
    { 
      title: 'Shipped', 
      date: orderData.status === 'Processing' ? 'Pending' : 'May 13, 09:15', 
      completed: orderData.status === 'Shipped' || orderData.status === 'Delivered' 
    },
    { 
      title: 'Delivered', 
      date: orderData.status === 'Delivered' ? 'May 15, 14:20' : 'Expected May 15', 
      completed: orderData.status === 'Delivered' 
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Delivered':
        return (
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold tracking-widest rounded-full uppercase">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Delivered
          </span>
        );
      case 'Shipped':
        return (
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold tracking-widest rounded-full uppercase">
            <Truck className="w-3.5 h-3.5" />
            Shipped
          </span>
        );
      case 'Processing':
        return (
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#C4A35A]/10 text-[#C4A35A] border border-[#C4A35A]/30 text-xs font-bold tracking-widest rounded-full uppercase">
            <Clock className="w-3.5 h-3.5" />
            Processing
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans text-[#1A1A1A] overflow-x-hidden selection:bg-[#C4A35A] selection:text-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=Inter:wght@300;400;500;600;700&display=swap');
        .font-serif { font-family: 'Cormorant Garamond', serif; }
        .font-sans { font-family: 'Inter', sans-serif; }
        
        @media print {
          body * {
            visibility: hidden;
          }
          #printable-invoice, #printable-invoice * {
            visibility: visible;
          }
          #printable-invoice {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            padding: 0;
          }
        }
      `}</style>

      <Header />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        
        {/* Navigation Breadcrumb */}
        <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
          <button 
            onClick={onBack || (() => window.history.back())}
            className="flex items-center gap-2 text-sm font-medium text-[#1A1A1A]/70 hover:text-[#C4A35A] transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Orders</span>
          </button>
          
          <div className="flex items-center gap-3">
            <span className="text-xs text-[#1A1A1A]/50">Order Date: <strong className="text-[#1A1A1A] font-medium">{orderData.date}</strong></span>
          </div>
        </div>

        {/* Header Title Bar */}
        <div className="bg-white border border-[#E8E0D4] rounded-3xl p-6 md:p-8 mb-8 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#E8E0D4]">
            <div>
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <h1 className="font-serif text-3xl md:text-4xl text-[#1A1A1A]">Order #{orderData.id}</h1>
                {getStatusBadge(orderData.status)}
              </div>
              <p className="text-sm text-[#1A1A1A]/60 font-light">
                Placed on {orderData.date} at {orderData.time} • Payment: {orderData.paymentMethod}
              </p>
            </div>

            {/* Top Primary Actions */}
            <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap">
              <button
                onClick={handleDownloadInvoice}
                disabled={isDownloading}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-3 bg-[#C4A35A] hover:bg-[#B39249] text-white rounded-full text-xs font-semibold tracking-widest transition-all shadow-md shadow-[#C4A35A]/20 hover:shadow-lg"
              >
                {isDownloading ? (
                  <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Download className="w-4 h-4" />
                )}
                <span>DOWNLOAD INVOICE</span>
              </button>

              <button 
                onClick={handlePrint}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-3 border border-[#1A1A1A]/20 hover:border-[#1A1A1A] text-[#1A1A1A] rounded-full text-xs font-semibold tracking-widest hover:bg-[#1A1A1A] hover:text-white transition-all"
              >
                <Printer className="w-4 h-4" />
                <span className="hidden sm:inline">PRINT</span>
              </button>
            </div>
          </div>

          {/* Status Timeline */}
          <div className="pt-8">
            <h3 className="text-xs font-bold tracking-widest uppercase text-[#1A1A1A]/50 mb-6">Delivery Status Timeline</h3>
            <div className="relative">
              
              {/* Timeline Connector Line */}
              <div className="absolute top-4 start-4 end-4 h-0.5 bg-gray-200 hidden md:block -z-0">
                <div 
                  className="h-full bg-[#C4A35A] transition-all duration-700" 
                  style={{ 
                    width: orderData.status === 'Delivered' ? '100%' : orderData.status === 'Shipped' ? '66%' : '33%' 
                  }} 
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">
                {timelineSteps.map((step, idx) => (
                  <div key={idx} className="flex md:flex-col items-center md:items-start gap-4 md:gap-3">
                    <div 
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                        step.completed 
                          ? 'bg-[#C4A35A] text-white ring-4 ring-[#C4A35A]/20' 
                          : 'bg-gray-100 text-gray-400 border border-gray-300'
                      }`}
                    >
                      {step.completed ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                    </div>
                    <div>
                      <div className={`text-sm font-medium ${step.completed ? 'text-[#1A1A1A]' : 'text-gray-400'}`}>
                        {step.title}
                      </div>
                      <div className="text-xs text-[#1A1A1A]/50">{step.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {orderData.trackingNumber && (
              <div className="mt-8 p-4 bg-[#F9F7F2] border border-[#E8E0D4] rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-white rounded-xl text-[#C4A35A] border border-[#E8E0D4]">
                    <Truck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-[#1A1A1A]/50 font-medium">CARRIER & TRACKING</div>
                    <div className="text-sm font-semibold text-[#1A1A1A]">
                      {orderData.carrier} — <span className="font-mono text-[#C4A35A]">{orderData.trackingNumber}</span>
                    </div>
                  </div>
                </div>

                <a 
                  href="#track" 
                  onClick={(e) => { e.preventDefault(); alert(`Tracking package ${orderData.trackingNumber} via ${orderData.carrier}`); }}
                  className="flex items-center gap-1.5 text-xs font-bold tracking-widest text-[#C4A35A] hover:text-[#B39249] hover:underline"
                >
                  <span>TRACK SHIPMENT</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Main 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT Column: Items Breakdown (2 cols) */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white border border-[#E8E0D4] rounded-3xl p-6 md:p-8 shadow-sm">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#E8E0D4]">
                <h2 className="font-serif text-2xl text-[#1A1A1A]">Items in this Order ({orderData.items.length})</h2>
                <button 
                  onClick={() => alert("Items added back to your cart!")}
                  className="flex items-center gap-1.5 text-xs font-semibold tracking-widest text-[#C4A35A] hover:text-[#B39249]"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>REORDER ALL</span>
                </button>
              </div>

              <div className="divide-y divide-[#E8E0D4]">
                {orderData.items.map((item) => (
                  <div key={item.id} className="py-6 first:pt-0 last:pb-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-20 h-20 rounded-2xl object-cover border border-[#E8E0D4] flex-shrink-0 bg-gray-50" 
                      />
                      <div>
                        <span className="text-[10px] font-bold tracking-widest text-[#C4A35A] uppercase">{item.category}</span>
                        <h4 className="font-serif text-lg text-[#1A1A1A] leading-snug">{item.name}</h4>
                        <div className="text-xs text-[#1A1A1A]/60 mt-1 space-x-3">
                          <span>Color: <strong>{item.color}</strong></span>
                          {item.size && <span>• Size: <strong>{item.size}</strong></span>}
                          <span>• Qty: <strong>{item.quantity}</strong></span>
                        </div>
                      </div>
                    </div>

                    <div className="flex sm:flex-col items-end justify-between w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-[#E8E0D4]">
                      <div className="font-medium text-[#1A1A1A] text-base mb-2">{item.price}</div>
                      <button 
                        onClick={() => alert(`Review dialog for ${item.name}`)}
                        className="text-xs font-medium text-[#1A1A1A]/60 hover:text-[#C4A35A] underline underline-offset-4"
                      >
                        Write a Review
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping & Payment Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Shipping Address */}
              <div className="bg-white border border-[#E8E0D4] rounded-3xl p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4 text-[#C4A35A]">
                  <MapPin className="w-5 h-5" />
                  <h3 className="font-serif text-xl text-[#1A1A1A]">Shipping Address</h3>
                </div>
                <div className="text-sm text-[#1A1A1A]/80 leading-relaxed font-light">
                  <div className="font-medium text-[#1A1A1A] mb-1">{orderData.shippingAddress.name}</div>
                  <div>{orderData.shippingAddress.street}</div>
                  <div>{orderData.shippingAddress.city}</div>
                  <div>{orderData.shippingAddress.country}</div>
                  <div className="mt-2 text-xs text-[#1A1A1A]/50 font-mono">{orderData.shippingAddress.phone}</div>
                </div>
              </div>

              {/* Payment Details */}
              <div className="bg-white border border-[#E8E0D4] rounded-3xl p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4 text-[#C4A35A]">
                  <CreditCard className="w-5 h-5" />
                  <h3 className="font-serif text-xl text-[#1A1A1A]">Payment Method</h3>
                </div>
                <div className="text-sm text-[#1A1A1A]/80 leading-relaxed font-light">
                  <div className="font-medium text-[#1A1A1A] mb-1">{orderData.paymentMethod}</div>
                  {orderData.cardLast4 && (
                    <div className="text-xs text-[#1A1A1A]/60 font-mono mb-2">
                      Ending in •••• {orderData.cardLast4}
                    </div>
                  )}
                  <div className="inline-flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 mt-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Payment Verified</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT Column: Financial Order Summary (1 col) */}
          <div className="space-y-6">
            <div className="bg-white border border-[#E8E0D4] rounded-3xl p-6 md:p-8 shadow-sm sticky top-6">
              <h3 className="font-serif text-2xl text-[#1A1A1A] mb-6 pb-4 border-b border-[#E8E0D4]">Order Summary</h3>

              <div className="space-y-3.5 text-sm mb-6">
                <div className="flex justify-between text-[#1A1A1A]/70">
                  <span>Subtotal</span>
                  <span>{formatCurrency(orderData.subtotal)}</span>
                </div>

                {orderData.discount > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <span>Discount (Promo LUXURY10)</span>
                    <span>-{formatCurrency(orderData.discount)}</span>
                  </div>
                )}

                <div className="flex justify-between text-[#1A1A1A]/70">
                  <span>Shipping Fee</span>
                  <span>{orderData.shippingFee === 0 ? <strong className="text-emerald-600 font-semibold uppercase text-xs">FREE</strong> : formatCurrency(orderData.shippingFee)}</span>
                </div>

                <div className="flex justify-between text-[#1A1A1A]/70">
                  <span>Estimated VAT (14%)</span>
                  <span>{formatCurrency(orderData.tax)}</span>
                </div>

                <div className="pt-4 border-t border-[#E8E0D4] flex justify-between items-baseline">
                  <span className="font-serif text-xl text-[#1A1A1A]">Total Paid</span>
                  <span className="font-serif text-2xl font-bold text-[#C4A35A]">{formatCurrency(orderData.total)}</span>
                </div>
              </div>

              {/* Action Buttons Box */}
              <div className="space-y-3 pt-4 border-t border-[#E8E0D4]">
                <button
                  onClick={handleDownloadInvoice}
                  disabled={isDownloading}
                  className="w-full flex items-center justify-center gap-2 bg-[#C4A35A] hover:bg-[#B39249] text-white py-3.5 rounded-full text-xs font-semibold tracking-widest transition-all shadow-md shadow-[#C4A35A]/20"
                >
                  <FileText className="w-4 h-4" />
                  <span>VIEW & DOWNLOAD INVOICE</span>
                </button>

                <button 
                  onClick={() => alert("Need assistance? Customer Support team has been notified.")}
                  className="w-full flex items-center justify-center gap-2 border border-[#E8E0D4] hover:border-[#1A1A1A] text-[#1A1A1A]/70 hover:text-[#1A1A1A] py-3 rounded-full text-xs font-medium tracking-wide transition-colors"
                >
                  <HelpCircle className="w-4 h-4" />
                  <span>Need Help with this Order?</span>
                </button>
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* INVOICE MODAL / PRINTABLE DIALOG */}
      <AnimatePresence>
        {showInvoiceModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-10 shadow-2xl relative my-8"
              id="printable-invoice"
            >
              {/* Modal Close Button */}
              <button 
                onClick={() => setShowInvoiceModal(false)}
                className="absolute top-6 end-6 p-2 rounded-full bg-gray-50 hover:bg-gray-100 text-gray-600 transition-colors print:hidden"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Invoice Content */}
              <div className="border border-[#E8E0D4] rounded-2xl p-8 bg-[#FFFFFF]">
                
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-8 border-b border-[#E8E0D4] gap-6">
                  <div>
                    <div className="font-serif text-3xl font-bold tracking-wider text-[#1A1A1A] uppercase mb-1">
                      SHATTA
                    </div>
                    <div className="text-xs text-[#C4A35A] font-semibold tracking-widest uppercase">
                      Luxury Home & Living
                    </div>
                    <div className="text-xs text-[#1A1A1A]/50 mt-2 leading-relaxed">
                      Tax Registration: 492-109-883<br />
                      Cairo Festival City, New Cairo, Egypt
                    </div>
                  </div>

                  <div className="text-start sm:text-end">
                    <div className="inline-block bg-[#C4A35A]/10 text-[#C4A35A] px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-2">
                      TAX INVOICE
                    </div>
                    <div className="text-sm font-semibold text-[#1A1A1A]">Invoice #{orderData.id}</div>
                    <div className="text-xs text-[#1A1A1A]/60">Date: {orderData.date}</div>
                  </div>
                </div>

                {/* Customer Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-6 border-b border-[#E8E0D4] text-xs">
                  <div>
                    <div className="text-[#1A1A1A]/50 font-bold tracking-widest uppercase mb-1">Billed To</div>
                    <div className="font-semibold text-sm text-[#1A1A1A]">{orderData.shippingAddress.name}</div>
                    <div className="text-[#1A1A1A]/70 mt-1">{orderData.shippingAddress.street}</div>
                    <div className="text-[#1A1A1A]/70">{orderData.shippingAddress.city}, {orderData.shippingAddress.country}</div>
                    <div className="text-[#1A1A1A]/70 mt-1 font-mono">{orderData.shippingAddress.phone}</div>
                  </div>

                  <div className="sm:text-end">
                    <div className="text-[#1A1A1A]/50 font-bold tracking-widest uppercase mb-1">Payment Method</div>
                    <div className="font-semibold text-[#1A1A1A]">{orderData.paymentMethod}</div>
                    <div className="text-[#1A1A1A]/70">Status: <strong className="text-emerald-600">PAID IN FULL</strong></div>
                  </div>
                </div>

                {/* Itemized Table */}
                <div className="py-6 overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-[#E8E0D4] text-[#1A1A1A]/50 font-bold tracking-widest uppercase">
                        <th className="pb-3">Item Description</th>
                        <th className="pb-3 text-center">Qty</th>
                        <th className="pb-3 text-end">Unit Price</th>
                        <th className="pb-3 text-end">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E8E0D4]/60">
                      {orderData.items.map((item) => (
                        <tr key={item.id}>
                          <td className="py-3.5 pr-4">
                            <div className="font-semibold text-sm text-[#1A1A1A]">{item.name}</div>
                            <div className="text-[11px] text-[#1A1A1A]/50">{item.category} • {item.color}</div>
                          </td>
                          <td className="py-3.5 text-center font-medium">{item.quantity}</td>
                          <td className="py-3.5 text-end font-medium">{item.price}</td>
                          <td className="py-3.5 text-end font-semibold text-[#1A1A1A]">{formatCurrency(item.priceNum * item.quantity)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Financial Summary */}
                <div className="pt-4 border-t border-[#E8E0D4] flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 text-xs">
                  <div className="text-[#1A1A1A]/50 space-y-1">
                    <div>Thank you for choosing Shatta Luxury Home.</div>
                    <div>For inquiries, contact support@shatta.com</div>
                  </div>

                  <div className="w-full sm:w-64 space-y-2 text-sm">
                    <div className="flex justify-between text-[#1A1A1A]/70">
                      <span>Subtotal:</span>
                      <span>{formatCurrency(orderData.subtotal)}</span>
                    </div>
                    {orderData.discount > 0 && (
                      <div className="flex justify-between text-emerald-600">
                        <span>Discount:</span>
                        <span>-{formatCurrency(orderData.discount)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-[#1A1A1A]/70">
                      <span>VAT (14% Included):</span>
                      <span>{formatCurrency(orderData.tax)}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-[#E8E0D4] font-bold text-base text-[#C4A35A]">
                      <span>Grand Total:</span>
                      <span>{formatCurrency(orderData.total)}</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Modal Bottom Actions */}
              <div className="mt-6 flex items-center justify-end gap-3 print:hidden">
                <button
                  onClick={() => setShowInvoiceModal(false)}
                  className="px-5 py-2.5 border border-gray-300 rounded-full text-xs font-semibold text-gray-700 hover:bg-gray-50"
                >
                  Close
                </button>

                <button
                  onClick={handlePrint}
                  className="flex items-center gap-2 px-6 py-2.5 bg-[#C4A35A] hover:bg-[#B39249] text-white rounded-full text-xs font-semibold tracking-widest shadow-md"
                >
                  <Printer className="w-4 h-4" />
                  <span>PRINT / SAVE AS PDF</span>
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}

export default OrderDetails;
