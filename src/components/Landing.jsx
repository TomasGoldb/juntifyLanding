import React from "react";
import WaitlistForm from "./WaitlistForm";
import "./Landing.css";
import { FaInstagram, FaLinkedin } from "react-icons/fa";

function GradientText({ children }) {
  return <span className="gradient-text">{children}</span>;
}

function Section({ children, className = "" }) {
  return <section className={`section ${className}`}>{children}</section>;
}

function FeatureCard({ img, alt, title, children }) {
  return (
    <div className="feature-card">
      <div className="feature-icon-wrapper">
        <img src={img} alt={alt} className="feature-card-img" />
      </div>
      <h3>{title}</h3>
      <p>{children}</p>
    </div>
  );
}

function StatCard({ number, label }) {
  return (
    <div className="stat-card">
      <div className="stat-number">{number}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

export default function Landing() {
  return (
    <div className="landing-root">
      {/* Fondo decorativo */}
      <div className="decorative-bg" aria-hidden />

      {/* HERO */}
      <Section className="hero">
        <div className="hero-content">
          <div className="hero-badge">
            🚀 Próximamente disponible
          </div>
          <h1>
            <GradientText>
              Better life,<br />Your style
            </GradientText>
          </h1>
          <p className="hero-desc">
            Organiza tus actividades de manera sencilla y efectiva. Con nuestra app, podés crear, gestionar y compartir planes de forma rápida y colaborativa.{" "}
            <strong>¡Sumate hoy y llevá tu planificación al siguiente nivel!</strong>
          </p>
          
          <div className="hero-cta">
            <WaitlistForm buttonLabel="Unirme a la Waitlist" />
            <p className="hero-cta-subtitle">
              ✨ Únete a más de 500 personas que ya están esperando
            </p>
          </div>
        </div>
        <div className="hero-img">
          <img src="/img/imghome3.png" alt="Personas conectando" />
        </div>
      </Section>

      {/* WAVE */}
      <svg className="wave-top" viewBox="0 0 500 60" preserveAspectRatio="none">
        <path d="M0,25 Q250,60 500,25 L500,60 L0,60 Z" fill="url(#grad1)" opacity="0.12" />
        <defs>
          <linearGradient id="grad1" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#003BFF" />
            <stop offset="50%" stopColor="#A100FF" />
            <stop offset="100%" stopColor="#FF25C4" />
          </linearGradient>
        </defs>
      </svg>

      {/* STATS */}
      <Section className="stats-section">
        <div className="stats-grid">
          <StatCard number="500+" label="Personas en waitlist" />
          <StatCard number="3" label="Características principales" />
          <StatCard number="24/7" label="Soporte disponible" />
        </div>
      </Section>

      {/* FEATURES */}
      <Section className="features">
        <div className="section-header">
          <h2>¿Por qué elegir Juntify?</h2>
          <p>Descubre las características que hacen de Juntify tu compañero perfecto</p>
        </div>
        <div className="features-grid">
          <FeatureCard img="/img/imghome4.png" alt="Seguridad" title="Seguridad Garantizada">
            Tus datos y actividades están siempre protegidos. Estamos comprometidos con ofrecerte un entorno confiable y seguro para todas tus actividades.
          </FeatureCard>
          <FeatureCard img="/img/imghome2.png" alt="Organización" title="Organización Inteligente">
            Lleva el control total de tus compromisos y actividades. Accede a tus eventos y tareas de manera sencilla, manteniendo todo en orden y al alcance.
          </FeatureCard>
          <FeatureCard img="/img/imghome3.png" alt="Confianza" title="Colaboración Efectiva">
            Fomentamos relaciones auténticas. Comparte y coordina actividades con tus amigos y grupos sin complicaciones, todo en un solo lugar.
          </FeatureCard>
        </div>
      </Section>

      <svg className="wave-bottom" viewBox="0 0 500 60" preserveAspectRatio="none">
        <path d="M0,35 Q250,0 500,35 L500,0 L0,0 Z" fill="url(#grad2)" opacity="0.10" />
        <defs>
          <linearGradient id="grad2" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#003BFF" />
            <stop offset="50%" stopColor="#A100FF" />
            <stop offset="100%" stopColor="#FF25C4" />
          </linearGradient>
        </defs>
      </svg>

      {/* SOBRE JUNTIFY */}
      <Section className="about-section">
        <div className="about-text">
          <h2 className="about-title">¿Qué es Juntify?</h2>
          <p>
            ¡Es tu compañero perfecto para una planificación sin estrés! Con Juntify, transformar tus ideas en planes concretos nunca fue tan fácil. Ordená tu agenda, organiza eventos y coordina proyectos de manera intuitiva y colaborativa.
          </p>
          <div className="about-features">
            <div className="about-feature">
              <span className="feature-icon">🎯</span>
              <span>Planificación inteligente</span>
            </div>
            <div className="about-feature">
              <span className="feature-icon">🤝</span>
              <span>Colaboración en tiempo real</span>
            </div>
            <div className="about-feature">
              <span className="feature-icon">⚡</span>
              <span>Interfaz súper rápida</span>
            </div>
          </div>
        </div>
        <div className="about-img">
          <img src="/img/Facetime.svg" alt="Teléfono enviando mensaje" />
        </div>
      </Section>

      {/* POR QUÉ USARLO */}
      <Section className="why-section">
        <div className="why-img">
          <img src="/img/imghome2.png" alt="Red social y mail" />
        </div>
        <div className="why-text">
          <h2 className="about-title color-accent">¿Por qué usarlo?</h2>
          <p>
            La forma más sencilla de convertir tus ideas en acción. Con Juntify, planificar nunca fue tan eficiente y agradable. Nuestra app te permite organizar tus tareas, coordinar eventos y gestionar proyectos con facilidad.
          </p>
          <div className="why-benefits">
            <div className="benefit-item">
              <div className="benefit-icon">🚀</div>
              <div>
                <h4>Lanzamiento Próximo</h4>
                <p>Sé de los primeros en probar Juntify</p>
              </div>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon">🎁</div>
              <div>
                <h4>Acceso Anticipado</h4>
                <p>Beneficios exclusivos para early adopters</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* CTA FINAL */}
      <Section className="final-cta">
        <div className="cta-content">
          <h2>¿Listo para transformar tu productividad?</h2>
          <p>Únete a la waitlist y sé notificado cuando Juntify esté disponible</p>
          <WaitlistForm buttonLabel="Unirme Ahora" />
        </div>
      </Section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-cols">
          <div className="footer-branding">
            <img src="/img/logo.svg" alt="Logo Juntify" className="footer-logo" />
            <span className="footer-brand">Juntify</span>
            <p className="footer-legal">
              La reproducción, utilización o modificación del contenido de este sitio está sujeta a derechos de autor y a las políticas de Juntify.
            </p>
          </div>
          <div className="footer-contact">
            <h4>Contactanos</h4>
            <a href="mailto:juntifyapp@gmail.com">juntifyapp@gmail.com</a>
          </div>
          <div className="footer-social">
            <h4>Seguinos</h4>
            <div className="social-icons">
              <a href="https://www.instagram.com/juntifyapp/" aria-label="Instagram"><FaInstagram size={24} /></a>
              <a href="https://www.linkedin.com/company/juntify" aria-label="Linkedin"><FaLinkedin size={24} /></a>
            </div>
          </div>
        </div>
        <div className="footer-copy">
          ©2025 Juntify. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
}