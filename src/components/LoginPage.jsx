import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

// Contraseña hardcodeada (puedes cambiarla aquí)
const ADMIN_PASSWORD = "Stancanelli2008";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted with password:", password); // Debug log
    setError("");
    setIsLoading(true);

    // Simular delay para mejor UX
    await new Promise(resolve => setTimeout(resolve, 1000));

    console.log("Checking password:", password === ADMIN_PASSWORD); // Debug log

    if (password === ADMIN_PASSWORD) {
      console.log("Password correct, setting localStorage"); // Debug log
      // Guardar en localStorage para mantener la sesión
      localStorage.setItem("sorteoAuth", "true");
      console.log("localStorage set, navigating to /sorteo"); // Debug log
      navigate("/sorteo");
    } else {
      console.log("Password incorrect"); // Debug log
      setError("Contraseña incorrecta. Intenta nuevamente.");
      setPassword("");
    }
    
    setIsLoading(false);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (error) setError(""); // Limpiar error cuando el usuario empiece a escribir
  };

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h1>🔐 Acceso al Sorteo</h1>
          <p>Ingresa la contraseña para acceder al panel de sorteo de Juntify</p>
          <p style={{fontSize: '0.8rem', color: '#999'}}>Debug: Contraseña = {ADMIN_PASSWORD}</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="password-input-group">
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Ingresa la contraseña"
              required
              autoFocus
              disabled={isLoading}
            />
          </div>

          {error && (
            <div className="login-error">
              {error}
            </div>
          )}

          <div className="login-buttons">
            <button
              type="button"
              className="back-btn"
              onClick={handleGoBack}
              disabled={isLoading}
            >
              ← Volver
            </button>
            <button
              type="submit"
              className="login-btn"
              disabled={isLoading || !password.trim()}
            >
              {isLoading ? (
                <>
                  <span className="loading-spinner"></span>
                  Verificando...
                </>
              ) : (
                "Acceder"
              )}
            </button>
          </div>
        </form>

        <div className="login-footer">
          <p>💡 Pista: La contraseña está relacionada con el año de lanzamiento</p>
        </div>
      </div>
    </div>
  );
} 