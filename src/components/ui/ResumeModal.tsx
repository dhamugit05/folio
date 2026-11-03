import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, FileText, Check, AlertCircle } from 'lucide-react';
import { usePortfolioStore } from '../../store/usePortfolioStore';
import { downloadResumeFile, resumeDataUri } from '../../lib/downloadUtils';

export const ResumeModal: React.FC = () => {
  const { isResumeModalOpen, closeResumeModal, showToast, profile } = usePortfolioStore();
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeResumeModal();
      }
    };
    if (isResumeModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isResumeModalOpen, closeResumeModal]);

  if (!isResumeModalOpen) return null;

  const handleDownload = async () => {
    setDownloading(true);
    showToast('Starting resume download...');
    const success = await downloadResumeFile('Dhamotharan_S_Resume.pdf');
    setDownloading(false);
    if (success) {
      setDownloadSuccess(true);
      showToast('Resume downloaded successfully!');
      setTimeout(() => setDownloadSuccess(false), 3000);
    } else {
      showToast('Could not initiate download. Opening in browser...');
    }
  };

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
        role="dialog"
        aria-modal="true"
        aria-labelledby="resume-modal-title"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeResumeModal}
          className="fixed inset-0 bg-black/85 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 26, stiffness: 300 }}
          className="relative w-full max-w-4xl h-[90vh] bg-white dark:bg-[#0B0F1C] border border-slate-300 dark:border-cyan-500/30 rounded-2xl shadow-2xl flex flex-col z-10 text-slate-900 dark:text-slate-100 overflow-hidden"
        >
          {/* Header Controls */}
          <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-900/70 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-500 flex items-center justify-center font-bold">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <h3 id="resume-modal-title" className="font-heading font-bold text-sm sm:text-base leading-tight">
                  {profile.name} — Resume
                </h3>
                <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                  Junior Software Developer • BCA Graduate
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleDownload}
                disabled={downloading}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-400 to-cyan-500 text-slate-950 font-bold text-xs shadow-md shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:-translate-y-0.5 transition-all disabled:opacity-50"
              >
                {downloadSuccess ? (
                  <Check className="w-3.5 h-3.5 text-emerald-950" />
                ) : (
                  <Download className="w-3.5 h-3.5" />
                )}
                <span>{downloadSuccess ? 'Downloaded!' : downloading ? 'Saving...' : 'Download PDF'}</span>
              </button>

              <button
                type="button"
                onClick={closeResumeModal}
                aria-label="Close resume viewer"
                className="p-1.5 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Embedded Document View */}
          <div className="flex-1 w-full h-full bg-slate-100 dark:bg-slate-950/80 p-2 sm:p-4 overflow-hidden relative">
            <object
              data={resumeDataUri}
              type="application/pdf"
              className="w-full h-full rounded-xl border border-slate-300 dark:border-slate-800 shadow-inner"
            >
              <div className="flex flex-col items-center justify-center h-full p-6 text-center space-y-4">
                <AlertCircle className="w-12 h-12 text-cyan-400" />
                <p className="text-sm font-mono text-slate-600 dark:text-slate-300 max-w-md">
                  Your browser does not support inline PDF viewing, or mobile PDF embedding is disabled.
                </p>
                <button
                  type="button"
                  onClick={handleDownload}
                  className="px-5 py-2.5 rounded-xl bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Resume PDF Directly</span>
                </button>
              </div>
            </object>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
