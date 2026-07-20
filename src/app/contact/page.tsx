import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import Accordion from "@/components/Accordion";
import { FaFacebook, FaInstagram, FaLinkedin, FaWhatsapp, FaXTwitter, FaCalendar } from "react-icons/fa6";
import MapEmbed from "@/components/MapEmbed";

export const metadata: Metadata = { title: "Contact", description: "Tell DevTork Studio about your website, app, brand, or digital growth project." };

export default function ContactPage() {
  return (
    <>
      <section className="page-hero page-hero-animated"><div className="container parallax-layer" data-parallax data-parallax-speed="0.035"><p className="eyebrow">Start a project</p><h1 className="page-title">Let’s begin with a clear conversation.</h1><p className="lead">A complete brief is not required. Share the goal, the problem, and what you know so far.</p></div></section>
      <section className="section section-paper-2 contact-section-tight">
        <div className="container">
          <h2 style={{ textAlign: 'center', fontSize: 'clamp(50px, 4vw, 40px)', fontWeight: 700, marginBottom: 'clamp(40px, 5vw, 70px)', marginTop: 0 }}>Contact</h2>
        </div>
        <div className="container contact-grid">
          <aside className="contact-sidebar">
            <div className="contact-cards">

              {/* Social */}
              <div className="contact-card">
                <span className="contact-card-label">Connect with us</span>
                <div className="social-links" style={{ display: 'flex', gap: '1.25rem', marginTop: '1rem', opacity: 0.85 }}>
                  <a href="https://www.facebook.com/profile.php?id=61591844288765" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover-facebook"><FaFacebook size={24} /></a>
                  <a href="https://www.instagram.com/devtork?igsh=OXBkc3I3YXEyeXM2" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover-instagram"><FaInstagram size={24} /></a>
                  <a href="https://x.com/DevtorkStudio" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" className="hover-x"><FaXTwitter size={24} /></a>
                  <a href="https://www.linkedin.com/company/devtork-studio/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover-linkedin"><FaLinkedin size={24} /></a>
                  <a href="https://wa.me/8801570297669" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="hover-whatsapp"><FaWhatsapp size={24} /></a>
                </div>
              </div>

              {/* Email */}
              <div className="contact-card">
                <span className="contact-card-label">Email</span>
                <a href="mailto:hello@devtork.com" className="contact-card-value">hello@devtork.com</a>
              </div>

              {/* Schedule a call */}
              <div className="contact-card contact-card-cta">
                <span className="contact-card-label">Schedule a call</span>
                <strong className="contact-card-title">Prefer to talk first?</strong>
                <p className="contact-card-desc">Book a free 30-minute call with our manager.</p>
                <a href="https://cal.com/devtork/30min" target="_blank" rel="noopener noreferrer" className="contact-card-btn">
                  Book a Call <FaCalendar size={16} />
                </a>
              </div>

              {/* Location map */}
              <div className="contact-card" style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ height: '240px', width: '100%' }}>
                  <MapEmbed center={[90.4125, 23.8103]} zoom={8} />
                </div>
                <div style={{ padding: '16px 24px' }}>
                  <span className="contact-card-label">Location</span>
                  <span className="contact-card-value">Dhaka, Bangladesh</span>
                </div>
              </div>

            </div>
          </aside>
          <ContactForm />
        </div>
      </section>
      <section className="section" id="faq"><div className="container"><div className="split-heading"><div><p className="eyebrow">Common questions</p><h2>Before we start.</h2></div><Accordion /></div></div></section>
    </>
  );
}
