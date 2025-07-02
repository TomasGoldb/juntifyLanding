import React, { useState } from "react";
import { createClient } from '@supabase/supabase-js';
import emailjs from '@emailjs/browser';

const SUPABASE_URL = "https://ohkrsgrgcsvimtupgech.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9oa3JzZ3JnY3N2aW10dXBnZWNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEzMjQ1MjYsImV4cCI6MjA2NjkwMDUyNn0.1wgD3b2oEEw3Vl5iHUKfVtbAKYFEDg7xo9Rqk-H8Bi8";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const EMAILJS_SERVICE_ID = "service_s6aakua";
const EMAILJS_TEMPLATE_ID = "template_1g2pb8m";
const EMAILJS_PUBLIC_KEY = "3pZClmXq5kpLrVeyS"; // Debes poner tu public key de EmailJS

export default function WaitlistForm({ buttonLabel = "Unirme" }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const sendConfirmationEmail = async (toEmail) => {
    const templateParams = {
      to_email: toEmail,
      instagram_url: "https://www.instagram.com/juntifyapp/",
      mensaje_bonito: "¡Gracias por sumarte a la waitlist de Juntify! Pronto vas a recibir novedades exclusivas. Mientras tanto, seguinos en Instagram para no perderte nada:",
      firma: "El equipo de Juntify"
    };
    try {
      const result = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );
      console.log("EmailJS result:", result);
    } catch (e) {
      console.error("Error enviando email de confirmación:", e);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simular delay para mejor UX
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (!email.trim()) {
      setError("Por favor, ingresa tu correo electrónico.");
      setIsLoading(false);
      return;
    }

    if (!validateEmail(email)) {
      setError("Por favor, ingresa un correo electrónico válido.");
      setIsLoading(false);
      return;
    }

    try {
      // Verificar si ya existe
      const { data: existing, error: selectError } = await supabase
        .from('mails')
        .select('id')
        .eq('mail', email.toLowerCase().trim())
        .maybeSingle();
      if (existing) {
        setError("¡Este correo ya está en la lista de espera!");
        setIsLoading(false);
        return;
      }
      // Insertar con fecha actual
      const now = new Date().toISOString();
      const { data, error: supaError } = await supabase
        .from('mails')
        .insert([{ mail: email.toLowerCase().trim(), fechaAnotado: now }]);
      if (supaError) {
        setError("Error al guardar en la base de datos. Intenta nuevamente.");
        setIsLoading(false);
        return;
      }
      // Enviar email de confirmación
     await sendConfirmationEmail(email.toLowerCase().trim());
      // Guardar en localStorage como backup
      let list = JSON.parse(localStorage.getItem("waitlist") || "[]");
      if (!list.includes(email.toLowerCase().trim())) {
        list.push(email.toLowerCase().trim());
        localStorage.setItem("waitlist", JSON.stringify(list));
      }
      setSubmitted(true);
      setEmail("");
    } catch (error) {
      setError("Hubo un error. Por favor, intenta nuevamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (error) setError(""); // Limpiar error cuando el usuario empiece a escribir
  };

  if (submitted && !error) {
    return (
      <div className="waitlist-success">
        <div className="success-icon">🎉</div>
        <div className="success-content">
          <h3>¡Te sumaste exitosamente!</h3>
          <p>Te notificaremos cuando Juntify esté disponible.</p>
        </div>
      </div>
    );
  }

  return (
    <form className="waitlist-form" onSubmit={handleSubmit}>
      <div className="waitlist-form-row">
        <input
          type="email"
          placeholder="Tu correo electrónico"
          value={email}
          onChange={handleEmailChange}
          disabled={isLoading}
          required
          className={error ? "error" : ""}
          autoFocus
        />
        <button 
          type="submit" 
          className={`waitlist-btn ${isLoading ? "loading" : ""}`} 
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className="loading-spinner"></span>
              Uniéndome...
            </>
          ) : (
            buttonLabel
          )}
        </button>
      </div>
      {error && <div className="waitlist-error">{error}</div>}
    </form>
  );
}