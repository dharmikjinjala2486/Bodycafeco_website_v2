import React, { useState } from 'react';
import { Mail, Phone, Clock } from 'lucide-react';
import { Input } from '../components/UI/Input';
import { Button } from '../components/UI/Button';

export const Contact: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formState.name && formState.email && formState.message) {
      setSubmitted(true);
      setFormState({ name: '', email: '', subject: '', message: '' });
    }
  };

  return (
    <div className="bg-bg-soft pt-12 pb-24 text-left font-sans">
      <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-24">
        
        <div className="max-w-3xl mb-16 space-y-4">
          <span className="text-[10px] uppercase tracking-superwide font-bold text-text-muted">Direct Support</span>
          <h1 className="text-editorial-h2">Consultations & Support</h1>
          <p className="text-sm md:text-base text-text-secondary leading-relaxed font-light">
            Have questions regarding formulation batch analysis, active dosages, or custom subscription configurations? Get in touch with our wellness support team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-start border-t border-border-light pt-12">
          
          {/* Left Column: Contact Form */}
          <div className="bg-white border border-border-light p-8 md:p-10 space-y-6">
            <h3 className="text-xs uppercase tracking-superwide font-bold text-text-dark mb-4">Send an Inquiry</h3>
            {submitted ? (
              <div className="py-12 text-center space-y-3">
                <span className="text-brand-ltheanine font-semibold text-sm">✓ Inquiry Transmitted Successfully</span>
                <p className="text-xs text-text-secondary font-light max-w-xs mx-auto">
                  Our clinical response representative will contact you via email within 24 business hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-[10px] uppercase tracking-wider font-bold text-text-dark border-b border-text-dark pb-0.5 mt-4"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                  label="Your Name"
                  required
                  placeholder="e.g. Eleanor Vance"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                />
                <Input
                  label="Email Address"
                  type="email"
                  required
                  placeholder="e.g. eleanor@domain.com"
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                />
                <Input
                  label="Subject"
                  placeholder="e.g. Batch purity certification lookup"
                  value={formState.subject}
                  onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                />
                
                {/* Custom Textarea styled to match bottom borders */}
                <div className="flex flex-col">
                  <label className="text-xs uppercase tracking-editorial text-text-secondary font-semibold mb-2">Message</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Provide detailed inquiry details here..."
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full bg-transparent border-b border-border-subtle py-3 px-1 text-sm text-text-dark placeholder-text-muted focus:outline-none focus:border-text-dark transition-colors resize-none"
                  />
                </div>

                <Button type="submit" variant="primary" fullWidth className="h-12 mt-4 text-xs font-bold uppercase tracking-superwide">
                  Transmit Inquiry
                </Button>
              </form>
            )}
          </div>

          {/* Right Column: details */}
          <div className="space-y-12">
            
            {/* Sourcing Lab info */}
            <div className="space-y-4">
              <h4 className="text-[10px] uppercase font-bold tracking-superwide text-text-muted">Lab Desk</h4>
              <p className="text-xs md:text-sm leading-relaxed text-text-secondary font-light">
                For chemical chromatography raw certificates (COAs) requests, please include the specific batch ID printed on the bottom base of your glass bottle.
              </p>
            </div>

            {/* Direct Channels */}
            <div className="space-y-6 text-xs text-text-dark font-semibold uppercase tracking-wider">
              
              <div className="flex items-center gap-4">
                <div className="w-9 h-9 bg-white border border-border-light flex items-center justify-center text-text-secondary">
                  <Mail size={14} />
                </div>
                <div>
                  <span className="text-[10px] text-text-muted block font-normal normal-case">Direct Email</span>
                  <a href="mailto:support@bodycafe.co" className="hover:text-text-secondary transition-colors">support@bodycafe.co</a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-9 h-9 bg-white border border-border-light flex items-center justify-center text-text-secondary">
                  <Phone size={14} />
                </div>
                <div>
                  <span className="text-[10px] text-text-muted block font-normal normal-case">Priority Line</span>
                  <span className="text-text-dark">+1 (800) 420-5666</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-9 h-9 bg-white border border-border-light flex items-center justify-center text-text-secondary">
                  <Clock size={14} />
                </div>
                <div>
                  <span className="text-[10px] text-text-muted block font-normal normal-case">Response Window</span>
                  <span className="text-text-dark">Mon - Fri / 9:00 AM - 5:00 PM EST</span>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
export default Contact;
