import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  MapPin,
  Send,
  Copy,
  Check,
  Github,
  Linkedin,
  FileText,
  AlertCircle,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import { usePortfolioStore } from '../store/usePortfolioStore';
import { validateContactForm, createMailtoLink } from '../lib/portfolioUtils';

export const Contact: React.FC = () => {
  const { profile, showToast, openResumeModal } = usePortfolioStore();

  const [form, setForm] = useState({ name: '', email: '', message: '', honeypot: '' });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'fallback'>('idle');
  const [copied, setCopied] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (formErrors[e.target.name]) {
      setFormErrors({ ...formErrors, [e.target.name]: '' });
    }
  };

  const handleCopyEmail = () => {
    try {
      navigator.clipboard.writeText(profile.email);
      setCopied(true);
      showToast('Email address copied to clipboard!');
      setTimeout(() => setCopied(false), 2500);
    } catch {
      showToast(profile.email);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = validateContactForm(form);
    if (!validation.valid) {
      setFormErrors(validation.errors);
      return;
    }

    setSubmitting(true);
    setStatus('idle');

    const formspreeEndpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT;

    if (formspreeEndpoint && !formspreeEndpoint.includes('your_')) {
      try {
        const response = await fetch(formspreeEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            message: form.message,
          }),
        });

        if (response.ok) {
          setStatus('success');
          showToast('Message sent successfully!');
          setForm({ name: '', email: '', message: '', honeypot: '' });
          setSubmitting(false);
          return;
        }
      } catch (err) {
        console.warn('Form service endpoint error, invoking mailto fallback:', err);
      }
    }

    // Direct mailto fallback path
    setStatus('fallback');
    setSubmitting(false);
    const mailtoUrl = createMailtoLink(profile.email, form.name, form.email, form.message);
    window.location.href = mailtoUrl;
  };

  const directMailtoUrl = createMailtoLink(
    profile.email,
    form.name || 'Recruiter / Collaborator',
    form.email || '',
    form.message || 'Hi Dhamotharan, I saw your portfolio and would like to connect.'
  );

  return (
    <section id="contact" className="min-h-screen max-w-7xl mx-auto px-4 sm:px-8 py-10 sm:py-16">
      {/* Header */}
      <div className="max-w-3xl mb-12">
        <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-slate-900 dark:text-white">
          Get in Touch
        </h1>
        <p className="text-sm sm:text-base font-mono text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
          Available for full-time Full Stack, Frontend, and Python-Django developer roles. Have an opening, inquiry, or question? Send a message directly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Direct info and quick social cards */}
        <div className="lg:col-span-5 space-y-5">
          {/* Direct Contact Card */}
          <div className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-[#0D1222] border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
            <h2 className="font-heading font-bold text-slate-900 dark:text-white text-base">
              Direct Contact Details
            </h2>

            {/* Email item */}
            <div className="flex items-center gap-3 text-xs font-mono text-slate-700 dark:text-slate-300">
              <div className="p-2.5 rounded-lg bg-cyan-500/10 text-cyan-500">
                <Mail className="w-4 h-4" />
              </div>
              <div className="flex-1 overflow-hidden">
                <span className="text-slate-400 block text-[10px]">Primary Inbox</span>
                <span className="truncate block font-semibold text-slate-900 dark:text-white">
                  {profile.email}
                </span>
              </div>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-cyan-500 transition-colors"
                title="Copy Email to Clipboard"
                aria-label="Copy Email to Clipboard"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Location item */}
            <div className="flex items-center gap-3 text-xs font-mono text-slate-700 dark:text-slate-300">
              <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-500">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Location</span>
                <span className="font-semibold text-slate-900 dark:text-white">{profile.location}</span>
              </div>
            </div>

            {/* Action buttons: Direct Email */}
            <div className="pt-2 flex flex-wrap gap-2">
              <a
                href={`mailto:${profile.email}?subject=Portfolio%20Enquiry`}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 font-mono text-xs font-semibold transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Open Mail Client</span>
              </a>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-mono text-xs font-semibold transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy Address'}</span>
              </button>
            </div>
          </div>

          {/* Profiles and Resume Card */}
          <div className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-[#0D1222] border border-slate-200 dark:border-slate-800 shadow-xl">
            <h2 className="font-heading font-bold text-slate-900 dark:text-white text-base mb-3">
              Social Profiles & Resume
            </h2>
            <div className="flex flex-col gap-2.5 font-mono text-xs">
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 hover:border-cyan-400 border border-slate-200 dark:border-slate-800 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Github className="w-4 h-4 text-slate-800 dark:text-slate-200" />
                  <span className="font-semibold text-slate-800 dark:text-slate-200">GitHub</span>
                </span>
                <span className="text-slate-500">@dhamugit05 →</span>
              </a>

              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 hover:border-cyan-400 border border-slate-200 dark:border-slate-800 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Linkedin className="w-4 h-4 text-sky-500" />
                  <span className="font-semibold text-slate-800 dark:text-slate-200">LinkedIn</span>
                </span>
                <span className="text-slate-500">dhamotharansamy- →</span>
              </a>

              {profile.resumeUrl && (
                <button
                  type="button"
                  onClick={openResumeModal}
                  className="w-full flex items-center justify-between p-3 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-bold border border-cyan-500/30 hover:bg-cyan-500/20 transition-colors cursor-pointer text-left"
                >
                  <span className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    <span>View & Download Candidate Resume (PDF)</span>
                  </span>
                  <span>↗</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Working Contact Form */}
        <div className="lg:col-span-7">
          <form
            onSubmit={handleSubmit}
            noValidate
            className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0D1222] border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4"
          >
            <h2 className="text-xl font-heading font-bold text-slate-900 dark:text-white mb-2">
              Send a Direct Message
            </h2>

            {/* Honeypot field (hidden from screen reader and visual users) */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="website-honeypot">Website (do not fill)</label>
              <input
                id="website-honeypot"
                type="text"
                name="honeypot"
                value={form.honeypot}
                onChange={handleChange}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            {/* Name */}
            <div>
              <label htmlFor="contact-name" className="block text-xs font-mono text-slate-600 dark:text-slate-400 mb-1.5">
                Your Name <span className="text-rose-500">*</span>
              </label>
              <input
                id="contact-name"
                type="text"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                placeholder="Sarah Jenkins"
                className={`w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#12172A] border ${
                  formErrors.name ? 'border-rose-500' : 'border-slate-200 dark:border-slate-800'
                } text-slate-900 dark:text-white text-sm focus:border-cyan-400 outline-none transition-colors`}
              />
              {formErrors.name && (
                <p className="text-rose-500 text-xs font-mono mt-1">{formErrors.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="contact-email" className="block text-xs font-mono text-slate-600 dark:text-slate-400 mb-1.5">
                Your Email <span className="text-rose-500">*</span>
              </label>
              <input
                id="contact-email"
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="sarah@company.com"
                className={`w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#12172A] border ${
                  formErrors.email ? 'border-rose-500' : 'border-slate-200 dark:border-slate-800'
                } text-slate-900 dark:text-white text-sm focus:border-cyan-400 outline-none transition-colors`}
              />
              {formErrors.email && (
                <p className="text-rose-500 text-xs font-mono mt-1">{formErrors.email}</p>
              )}
            </div>

            {/* Message */}
            <div>
              <label htmlFor="contact-message" className="block text-xs font-mono text-slate-600 dark:text-slate-400 mb-1.5">
                Message / Opportunity Details <span className="text-rose-500">*</span>
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                rows={5}
                value={form.message}
                onChange={handleChange}
                placeholder="Hi Dhamotharan, we reviewed your Horolo and full-stack projects and would love to interview you..."
                className={`w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#12172A] border ${
                  formErrors.message ? 'border-rose-500' : 'border-slate-200 dark:border-slate-800'
                } text-slate-900 dark:text-white text-sm focus:border-cyan-400 outline-none transition-colors`}
              />
              {formErrors.message && (
                <p className="text-rose-500 text-xs font-mono mt-1">{formErrors.message}</p>
              )}
            </div>

            {/* Fallback Notice */}
            {status === 'fallback' && (
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs font-mono text-amber-700 dark:text-amber-400 space-y-1">
                <div className="flex items-center gap-2 font-semibold">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>One-click Mailto Activated</span>
                </div>
                <p>
                  Opened your default email client with your message prefilled.{' '}
                  <a href={directMailtoUrl} className="underline text-cyan-500 font-semibold inline-flex items-center gap-1">
                    Click here if your client didn't open <ExternalLink className="w-3 h-3" />
                  </a>
                </p>
              </div>
            )}

            {status === 'success' && (
              <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Message received! Thank you for reaching out.</span>
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 to-cyan-500 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:-translate-y-0.5 transition-all disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>{submitting ? 'Delivering...' : 'Send Message to Dhamotharan'}</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
