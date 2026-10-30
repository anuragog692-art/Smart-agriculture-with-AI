import React, { useState } from 'react';
import { Mail, MapPin, Phone, Send, CheckCircle2, Key, Settings, Globe, Building2 } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [apiKey, setApiKey] = useState<string>('');
  const [showApiModal, setShowApiModal] = useState<boolean>(false);
  const [apiKeySaved, setApiKeySaved] = useState<boolean>(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectType: 'Commercial Complex',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', company: '', projectType: 'Commercial Complex', message: '' });
    }, 4000);
  };

  const handleSaveApiKey = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('AIPOWER_CUSTOM_API_KEY', apiKey);
    setApiKeySaved(true);
    setTimeout(() => {
      setApiKeySaved(false);
      setShowApiModal(false);
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-navy-900/90 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
            <Mail className="w-3.5 h-3.5 text-cyan-400" />
            <span>GET IN TOUCH</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-space font-extrabold text-white tracking-tight">
            START YOUR <span className="gradient-text-cyan">AI PROJECT CONSULTATION</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Partner with our AI product architects and civil engineering specialists to deploy AI POWER for your firm or developments.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Contact Form */}
          <div className="lg:col-span-7 glass-panel-glow p-8 rounded-3xl border border-cyan-500/30 space-y-6">
            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
              <h3 className="text-xl font-space font-bold text-white">Project Consultation Form</h3>
              <button
                onClick={() => setShowApiModal(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-400 hover:border-cyan-500/40"
              >
                <Key className="w-3.5 h-3.5" />
                <span>API Settings</span>
              </button>
            </div>

            {submitted ? (
              <div className="p-8 text-center bg-emerald-500/10 border border-emerald-500/30 rounded-2xl space-y-3 font-mono text-xs text-emerald-300">
                <CheckCircle2 className="w-10 h-10 mx-auto text-emerald-400" />
                <div className="text-lg font-bold font-space text-white">Consultation Request Dispatched</div>
                <p>Thank you! An AI POWER product architect will reach out within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">FULL NAME *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full input-cyber"
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">EMAIL ADDRESS *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full input-cyber"
                      placeholder="jane@architecture.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">COMPANY / FIRM NAME</label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full input-cyber"
                      placeholder="Vance Architectural Studio"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">PROJECT TYPE</label>
                    <select
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full input-cyber bg-slate-900"
                    >
                      <option value="Commercial Complex">Commercial Office Hub</option>
                      <option value="Residential Villa">Luxury Residential Villa</option>
                      <option value="Apartment Tower">Apartment Skyscraper</option>
                      <option value="Enterprise BIM Integration">Enterprise API & BIM Integration</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">PROJECT DETAILS / INQUIRY</label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full input-cyber"
                    placeholder="Describe your plot location, expected floor area, and timelines..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full btn-cyber-primary py-4 font-space text-sm font-extrabold uppercase justify-center"
                >
                  <Send className="w-4 h-4 mr-2" />
                  <span>DISPATCH CONSULTATION REQUEST</span>
                </button>
              </form>
            )}
          </div>

          {/* Global Office Locations */}
          <div className="lg:col-span-5 glass-panel p-8 rounded-3xl border border-slate-800 space-y-6">
            <h3 className="text-xl font-space font-bold text-white flex items-center gap-2">
              <Globe className="w-5 h-5 text-cyan-400" />
              <span>Global Technology Hubs</span>
            </h3>

            <div className="space-y-4 text-xs font-mono">
              {[
                { city: 'Austin, TX (HQ)', address: '1100 Innovation Way, Tech Ridge', contact: '+1 (800) 555-AIPOWER' },
                { city: 'London, UK', address: '45 Canary Wharf Tower, E14 5AB', contact: '+44 20 7946 0912' },
                { city: 'Singapore', address: '8 Marina Boulevard, Financial Centre', contact: '+65 6789 0123' },
                { city: 'Dubai, UAE', address: 'Dubai International Financial Centre (DIFC)', contact: '+971 4 312 4000' },
              ].map((loc, idx) => (
                <div key={idx} className="p-3.5 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-1">
                  <div className="font-bold text-cyan-300">{loc.city}</div>
                  <div className="text-slate-400">{loc.address}</div>
                  <div className="text-slate-500 text-[10px]">{loc.contact}</div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* API Settings Modal */}
        {showApiModal && (
          <div className="fixed inset-0 z-50 bg-navy-950/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="glass-panel-glow p-8 rounded-3xl max-w-md w-full border border-cyan-500/40 space-y-4 font-mono text-xs">
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <span className="font-bold text-white flex items-center gap-2">
                  <Key className="w-4 h-4 text-cyan-400" />
                  API KEY INTEGRATION POINT
                </span>
                <button
                  onClick={() => setShowApiModal(false)}
                  className="text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <p className="text-slate-300 text-[11px] leading-relaxed">
                Enter a custom LLM / OpenAI API key to process complex custom design prompts directly through your private API quota.
              </p>

              <form onSubmit={handleSaveApiKey} className="space-y-3">
                <input
                  type="password"
                  placeholder="sk-proj-..."
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="w-full input-cyber"
                />
                <button
                  type="submit"
                  className="w-full btn-cyber-primary py-2.5 justify-center"
                >
                  {apiKeySaved ? 'KEY SAVED LOCALLY!' : 'SAVE PRIVATE API KEY'}
                </button>
              </form>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default ContactSection;
