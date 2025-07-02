import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  // Scroll al inicio cuando se carga la página
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleGoToSorteo = () => {
    navigate("/sorteo");
  };

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
            Coordiná juntadas de forma simple, rápida y sin estrés. Juntify unifica todo lo que necesitás para organizar planes en grupo: ideas, votaciones, accesibilidad, seguridad y más, en un solo lugar.
<strong>¡Sumate y hacé que cada encuentro sea posible!</strong>
          </p>
          
          <div className="hero-cta">
            <WaitlistForm buttonLabel="Unirme a la Waitlist" />
            <p className="hero-cta-subtitle">
              ✨ Únete a más de 500 personas que ya están esperando
            </p>
          </div>
        </div>
        <div className="hero-img">
          <img src="./vite.png" alt="Personas conectando" />
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
          <FeatureCard img="/img/Cybersecurity.svg" alt="Seguridad" title="Seguridad Garantizada">
            Garantizamos una experiencia segura desde la planificación hasta el encuentro. Ubicación en tiempo real, batería visible y espacios verificados para disfrutar cada juntada sin preocupaciones ni sobresaltos.
          </FeatureCard>
          <FeatureCard img="/img/imghome2.png" alt="Organización" title="Organización Inteligente">
            Planificá sin caos ni confusión. Con Juntify centralizás todo: ideas, votaciones, reservas, horarios y presupuestos, para que organizar una juntada sea ágil, clara y sin frustraciones innecesarias.
          </FeatureCard>
          <FeatureCard img="/img/Collaboration.svg" alt="Confianza" title="Colaboración Efectiva">
            Involucrá a todos en el proceso. Cada participante propone ideas, vota, ajusta detalles y ayuda a que el plan refleje intereses reales, fomentando encuentros más democráticos y entretenidos para todos.
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
Juntify es tu aliada para transformar ideas en juntadas reales. Ya no necesitás 5 apps para coordinar: con Juntify podés encontrar lugares accesibles, votar planes, compartir mapas y mantener todo claro para cada participante.          </p>
          <div className="about-features">
            <div className="about-feature">
              <span className="feature-icon">🎯</span>
              <span>Planificación personalizada</span>
            </div>
            <div className="about-feature">
              <span className="feature-icon">🤝</span>
              <span>Colaboración en tiempo real</span>
            </div>
            <div className="about-feature">
              <span className="feature-icon">⚡</span>
              <span>Todo en un solo lugar</span>
            </div>
          </div>
        </div>
        <div className="about-img">
          <img src="/img/World Connection 1.svg" alt="Teléfono enviando mensaje" />
        </div>
      </Section>

      {/* POR QUÉ USARLO */}
      <Section className="why-section">
        <div className="why-img">
          <img src="/img/Leadership.svg" alt="Red social y mail" />
        </div>
        <div className="why-text">
          <h2 className="about-title color-accent">¿Por qué usarlo?</h2>
          <p>
Juntify convierte tus ganas de juntarte en encuentros reales. Disfrutá de una experiencia completa: desde proponer ideas hasta confirmar asistencia, con total claridad y sin estrés organizativo.
          </p>
          <div className="why-benefits">
            <div className="benefit-item">
              <div className="benefit-icon">🚀</div>
              <div>
                <h4>Lanzamiento Próximo</h4>
                <p>Formá parte de la primera comunidad en revolucionar la forma de organizar planes.</p>
              </div>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon">🎁</div>
              <div>
                <h4>Acceso Anticipado</h4>
                <p>Descuentos, funciones premium, acceso a alianzas con apps de transporte y gastronomía ¡y muchos beneficios más!</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* CTA FINAL */}
      <Section className="final-cta">
        <div className="cta-content">
          <h2>¿Listo para que tus juntadas sí sucedan?</h2>
          <p>Sumate a la waitlist y enterate antes que nadie del lanzamiento de Juntify</p>
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
