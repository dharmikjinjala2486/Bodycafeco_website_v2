import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, HelpCircle, CheckCircle, RefreshCcw, ChevronDown, ChevronUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    shopAll: false,
    myAccount: false,
    contactUs: false,
  });

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <footer className="bg-[#111111] text-[#A3A3A3] pt-20 pb-12 border-t border-black font-sans">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-[#222222]">
          
          {/* Brand Philosophy column */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-6 border-b border-[#222222] md:border-b-0 pb-8 md:pb-0">
            <Link to="/" className="hover:opacity-85 transition-opacity select-none block">
              <img
                src="/Logo/Body Cafe Co logo white.svg"
                alt="Body Cafe Co."
                className="h-16 md:h-20 w-auto object-contain"
              />
            </Link>
            <p className="text-xs leading-relaxed max-w-[280px]">
              A premium wellness ritual brand focused on science-backed supplements, long-term cellular health, and complete formulation transparency.
            </p>

            {/* Social Media Row */}
            <div className="flex items-center justify-center md:justify-start gap-4 py-1">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-[#B51E2E] transition-colors duration-300 cursor-pointer flex items-center justify-center"
                aria-label="Facebook"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-[#B51E2E] transition-colors duration-300 cursor-pointer flex items-center justify-center"
                aria-label="Instagram"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-[#B51E2E] transition-colors duration-300 cursor-pointer flex items-center justify-center"
                aria-label="YouTube"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z"/>
                  <polygon points="10 15 15 12 10 9"/>
                </svg>
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-[#B51E2E] transition-colors duration-300 cursor-pointer flex items-center justify-center"
                aria-label="X (Twitter)"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
                  <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
                </svg>
              </a>
            </div>

            {/* Certifications badges */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
              <span className="text-[9px] uppercase tracking-wider border border-[#333333] px-2.5 py-1 text-white bg-black">
                Third-Party Tested
              </span>
              <span className="text-[9px] uppercase tracking-wider border border-[#333333] px-2.5 py-1 text-white bg-black">
                100% Traceable
              </span>
            </div>
          </div>

          {/* Shop All column */}
          <div className="flex flex-col border-b border-[#222222] md:border-b-0 py-4 md:py-0 text-left">
            <button
              onClick={() => toggleSection('shopAll')}
              className="flex items-center justify-between w-full md:cursor-default text-left md:pointer-events-none focus:outline-none py-2 md:py-0"
            >
              <h4 className="text-[10px] uppercase font-bold tracking-superwide text-white">SHOP ALL</h4>
              <span className="text-white md:hidden transition-transform duration-300">
                {openSections.shopAll ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </span>
            </button>
            <ul className={`${openSections.shopAll ? 'block animate-fade-in' : 'hidden'} md:block space-y-3.5 text-xs font-medium pt-4 md:pt-4`}>
              <li><Link to="/product/omega-3-fish-oil" className="hover:text-white transition-colors block py-2 md:py-0">Omega-3 Fish Oil</Link></li>
              <li><Link to="/product/creatine-monohydrate" className="hover:text-white transition-colors block py-2 md:py-0">Creatine Monohydrate</Link></li>
              <li><Link to="/product/vitamin-d3-k2" className="hover:text-white transition-colors block py-2 md:py-0">Vitamin D3 + K2</Link></li>
              <li><Link to="/shop" className="hover:text-white transition-colors block py-2 md:py-0">Shop All Products</Link></li>
            </ul>
          </div>

          {/* My Account column */}
          <div className="flex flex-col border-b border-[#222222] md:border-b-0 py-4 md:py-0 text-left">
            <button
              onClick={() => toggleSection('myAccount')}
              className="flex items-center justify-between w-full md:cursor-default text-left md:pointer-events-none focus:outline-none py-2 md:py-0"
            >
              <h4 className="text-[10px] uppercase font-bold tracking-superwide text-white">MY ACCOUNT</h4>
              <span className="text-white md:hidden transition-transform duration-300">
                {openSections.myAccount ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </span>
            </button>
            <ul className={`${openSections.myAccount ? 'block animate-fade-in' : 'hidden'} md:block space-y-3.5 text-xs font-medium pt-4 md:pt-4`}>
              <li><Link to="#" className="hover:text-white transition-colors block py-2 md:py-0">Shipping & Returns</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors block py-2 md:py-0">Terms of Service</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors block py-2 md:py-0">Privacy Policy</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors block py-2 md:py-0">Money Back Guarantee</Link></li>
              <li><Link to="/quiz" className="hover:text-white transition-colors block py-2 md:py-0">Body Cafe Co Quiz</Link></li>
            </ul>
          </div>

          {/* Contact Us column */}
          <div className="flex flex-col border-b border-[#222222] md:border-b-0 py-4 md:py-0 text-left">
            <button
              onClick={() => toggleSection('contactUs')}
              className="flex items-center justify-between w-full md:cursor-default text-left md:pointer-events-none focus:outline-none py-2 md:py-0"
            >
              <h4 className="text-[10px] uppercase font-bold tracking-superwide text-white">CONTACT US</h4>
              <span className="text-white md:hidden transition-transform duration-300">
                {openSections.contactUs ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </span>
            </button>
            <ul className={`${openSections.contactUs ? 'block animate-fade-in' : 'hidden'} md:block space-y-3.5 text-xs font-medium pt-4 md:pt-4`}>
              <li><Link to="/about" className="hover:text-white transition-colors block py-2 md:py-0">About Us</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors block py-2 md:py-0">Accessibility Statement</Link></li>
              <li><Link to="/learn" className="hover:text-white transition-colors block py-2 md:py-0">FAQ’s</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors block py-2 md:py-0">Cookie Preferences</Link></li>
            </ul>
          </div>

          {/* Newsletter subscription */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-4 md:col-span-2 lg:col-span-1 pt-8 md:pt-0">
            <h4 className="text-[10px] uppercase font-bold tracking-superwide text-white">The Daily Protocol</h4>
            <p className="text-xs leading-relaxed max-w-[280px]">
              Subscribe to receive weekly breakdowns on scientific literature, daily habit design, and early access to new batches.
            </p>
            {subscribed ? (
              <p className="text-xs text-white font-semibold pt-2 text-center md:text-left">
                ✓ Added to the protocol mailing list.
              </p>
            ) : (
              <form onSubmit={handleSubscribe} className="relative flex items-center border-b border-[#333333] focus-within:border-white transition-colors py-1.5 w-full max-w-[280px] mx-auto md:mx-0">
                <input
                  type="email"
                  required
                  placeholder="Enter email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-transparent border-none w-full text-xs text-white focus:outline-none placeholder-[#555555] text-left"
                />
                <button type="submit" className="text-white hover:opacity-80 p-1" aria-label="Subscribe">
                  <ArrowRight size={14} />
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Brand Value Pillars Section (Aesop/WHOOP Style) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 py-12 border-b border-[#222222] text-left">
          <div className="flex items-start gap-3">
            <ShieldCheck size={18} strokeWidth={1.5} className="text-white flex-shrink-0" />
            <div>
              <h5 className="text-[11px] uppercase tracking-wider font-bold text-white mb-1">Clean Purity</h5>
              <p className="text-[10px] leading-relaxed">No binders, heavy metals, or artificial additives.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle size={18} strokeWidth={1.5} className="text-white flex-shrink-0" />
            <div>
              <h5 className="text-[11px] uppercase tracking-wider font-bold text-white mb-1">Clinical Potency</h5>
              <p className="text-[10px] leading-relaxed">Active ingredient dosages backed by scientific literature.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <RefreshCcw size={18} strokeWidth={1.5} className="text-white flex-shrink-0" />
            <div>
              <h5 className="text-[11px] uppercase tracking-wider font-bold text-white mb-1">Flexible Bag</h5>
              <p className="text-[10px] leading-relaxed">Modify, skip, or cancel delivery times whenever needed.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <HelpCircle size={18} strokeWidth={1.5} className="text-white flex-shrink-0" />
            <div>
              <h5 className="text-[11px] uppercase tracking-wider font-bold text-white mb-1">Expert Support</h5>
              <p className="text-[10px] leading-relaxed">Direct support channels for supplement queries.</p>
            </div>
          </div>
        </div>

        {/* Bottom Legal / Details */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 text-[10px] uppercase tracking-wider font-medium space-y-4 md:space-y-0 text-[#666666]">
          <div className="flex items-center gap-6">
            <span>© 2026 Body Cafe Co.</span>
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
          <div>
            <span>Synthesized for Human Endurance</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
