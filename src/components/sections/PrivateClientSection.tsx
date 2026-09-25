import { useState } from 'react';
import { MagneticButton } from '@/components/ui/magnetic-button';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/scroll-reveal';

export function PrivateClientSection() {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [interest, setInterest] = useState('Chronograph Architecture');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <section id="contact" className="relative w-full bg-[#0E0E0D] text-foreground py-20 sm:py-28 md:py-48 px-5 sm:px-8 md:px-16 overflow-hidden">
      <div className="max-w-4xl mx-auto text-center space-y-10 sm:space-y-14">
        {/* Header with Scroll Reveal */}
        <ScrollReveal direction="up" distance={30} className="space-y-4">
          <span className="font-sans text-xs uppercase tracking-[0.4em] text-gold font-medium">
            Private Client Services
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-ivory tracking-tight">
            Arrange a Private Viewing.
          </h2>
          <p className="font-sans text-sm md:text-base text-slate max-w-xl mx-auto leading-relaxed">
            Our horological advisory offers dedicated private consultations for collectors seeking deeper insight into reference architectures and private commissions.
          </p>
        </ScrollReveal>

        {submitted ? (
          <ScrollReveal direction="up">
            <div className="p-10 bg-[#141413] rounded-sm max-w-lg mx-auto flex flex-col items-center gap-4 shadow-2xl animate-fadeIn">
              <CheckCircle2 className="w-8 h-8 text-gold" />
              <h3 className="font-serif text-xl text-ivory">Inquiry Transmitted</h3>
              <p className="font-sans text-xs text-slate max-w-xs">
                Our concierge will contact you within one business day with private viewing arrangements.
              </p>
            </div>
          </ScrollReveal>
        ) : (
          <ScrollReveal direction="up" delay={0.15}>
            <form
              onSubmit={handleSubmit}
              className="p-6 sm:p-10 md:p-14 bg-[#121211] max-w-xl mx-auto text-left space-y-6 shadow-2xl rounded-sm"
            >
              <div className="space-y-1.5">
                <label htmlFor="client-name" className="font-mono text-[10px] uppercase tracking-widest text-slate-dark block">
                  Full Name
                </label>
                <input
                  id="client-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Lord / Lady / Collector Name"
                  className="w-full bg-[#181817] px-4 py-3.5 text-sm text-ivory placeholder:text-slate-dark focus:outline-none focus:bg-[#1E1E1C] transition-colors font-sans rounded-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="client-email" className="font-mono text-[10px] uppercase tracking-widest text-slate-dark block">
                  Email Address
                </label>
                <input
                  id="client-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="client@veritas-horology.com"
                  className="w-full bg-[#181817] px-4 py-3.5 text-sm text-ivory placeholder:text-slate-dark focus:outline-none focus:bg-[#1E1E1C] transition-colors font-sans rounded-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="client-interest" className="font-mono text-[10px] uppercase tracking-widest text-slate-dark block">
                  Primary Reference of Interest
                </label>
                <select
                  id="client-interest"
                  value={interest}
                  onChange={(e) => setInterest(e.target.value)}
                  className="w-full bg-[#181817] px-4 py-3.5 text-sm text-ivory focus:outline-none focus:bg-[#1E1E1C] transition-colors font-sans rounded-sm"
                >
                  <option value="Chronograph Architecture">Chronograph Architecture Study</option>
                  <option value="Geometric Dial Study">Geometric Case & Dial Study</option>
                  <option value="Dual-Time Complication">Dual-Time Complication Study</option>
                  <option value="Aviation Instrument">Aviation Instrument Dial Study</option>
                  <option value="Bespoke Commission">Bespoke Atelier Commission</option>
                </select>
              </div>

              <div className="pt-4">
                <MagneticButton
                  type="submit"
                  className="w-full py-4 bg-gold hover:bg-gold-light text-black font-semibold text-xs tracking-widest uppercase transition-all duration-300 shadow-xl flex items-center justify-center gap-2 rounded-sm"
                >
                  Submit Consultation Request <ArrowRight className="w-4 h-4" />
                </MagneticButton>
              </div>
            </form>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
}
