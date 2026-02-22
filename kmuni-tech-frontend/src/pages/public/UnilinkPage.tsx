import React, { useMemo, useState } from 'react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { Award, Users, Video } from 'lucide-react';
import { registerUnilinkLead } from '../../utils/api';

function normalizePhone(value: string) {
  return value.replace(/[^\d+]/g, '');
}

export default function UnilinkPage() {
  const whatsappGroupUrl = useMemo(() => {
    const url = (import.meta.env.VITE_UNILINK_WHATSAPP_GROUP_URL as string | undefined)?.trim();
    return url && url.length > 0 ? url : 'https://chat.whatsapp.com/';
  }, []);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedPhone = phone.trim();

    if (!trimmedName) {
      setError('Please enter your name.');
      return;
    }
    if (!trimmedPhone) {
      setError('Please enter your phone number.');
      return;
    }

    setIsSubmitting(true);
    setError('');
    try {
      await registerUnilinkLead({ name: trimmedName, phone: trimmedPhone });
      setSubmitted(true);
    } catch (err: any) {
      setError(err?.message || 'Failed to submit details');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0f1a]">
      <Navbar />

      <main className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            {/* Left */}
            <section>
              <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-1.5 mb-6">
                <span className="text-emerald-300 text-xs font-bold uppercase tracking-widest">Unilink</span>
                <span className="text-slate-400 text-xs font-semibold">Free webinar & workshops</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Unilink <span className="gradient-text">Free Webinar & Workshops</span>
              </h1>
              <p className="text-slate-400 text-lg leading-relaxed max-w-xl">
                Join our Unilink sessions for free. Free e-certificate given after completion.
              </p>

              <div className="mt-10 space-y-4 max-w-xl">
                <div className="flex items-start gap-3 bg-white/5 border border-white/10 rounded-2xl p-5">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center shrink-0">
                    <Video size={18} className="text-indigo-400" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">Live Classes</p>
                    <p className="text-slate-400 text-sm mt-1">Access live course updates directly via WhatsApp group.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white/5 border border-white/10 rounded-2xl p-5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0">
                    <Award size={18} className="text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">Free E-Certificate</p>
                    <p className="text-slate-400 text-sm mt-1">Complete the webinar/workshops and receive your e-certificate.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white/5 border border-white/10 rounded-2xl p-5">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center shrink-0">
                    <Users size={18} className="text-purple-400" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">Community Support</p>
                    <p className="text-slate-400 text-sm mt-1">Ask questions and get help from mentors and peers.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Right */}
            <section className="card p-6 md:p-8">
              {!submitted ? (
                <form onSubmit={onSubmit} className="space-y-5">
                  <div>
                    <h2 className="text-2xl font-bold text-white">Register to Join</h2>
                    <p className="text-slate-400 text-sm mt-2">
                      Enter your details. After submitting, you’ll see the WhatsApp group link.
                    </p>
                  </div>

                  {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-300 text-sm rounded-xl px-4 py-3">
                      {error}
                    </div>
                  )}

                  <div>
                    <label className="block text-slate-300 text-sm font-medium mb-2">Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="input-field"
                      placeholder="Your full name"
                      autoComplete="name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 text-sm font-medium mb-2">Phone number</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(normalizePhone(e.target.value))}
                      className="input-field"
                      placeholder="e.g. +91XXXXXXXXXX"
                      autoComplete="tel"
                      inputMode="tel"
                      required
                    />
                  </div>

                  <button type="submit" className="btn-primary w-full" disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'Submit Details'}
                  </button>
                </form>
              ) : (
                <a
                  href={whatsappGroupUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full text-center break-all"
                >
                  {whatsappGroupUrl}
                </a>
              )}
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
