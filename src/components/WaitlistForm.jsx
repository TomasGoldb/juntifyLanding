import React, { useState } from "react";

export default function WaitlistForm({ buttonLabel = "Unirme" }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
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
      // Obtener lista existente del localStorage
      let list = JSON.parse(localStorage.getItem("waitlist") || "[]");
      
      // Verificar si el email ya existe
      if (list.includes(email.toLowerCase().trim())) {
        setError("¡Este correo ya está en la lista de espera!");
        setIsLoading(false);
        return;
      }

      // Agregar email a la lista
      list.push(email.toLowerCase().trim());
      localStorage.setItem("waitlist", JSON.stringify(list));
      
      // Éxito
      setSubmitted(true);
      setEmail("");
      
      // Opcional: Enviar a analytics o backend
      // await fetch('/api/waitlist', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email: email.toLowerCase().trim() })
      // });
      
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

  if (submitted) {
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
      <input
        type="email"
        placeholder="Tu correo electrónico"
        value={email}
        onChange={handleEmailChange}
        disabled={isLoading}
        required
        className={error ? "error" : ""}
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
      {error && <div className="waitlist-error">{error}</div>}
    </form>
  );
}