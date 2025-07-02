import React, { useState, useEffect } from "react";
import { createClient } from '@supabase/supabase-js';
import { useNavigate } from "react-router-dom";
import "./Sorteo.css";

const SUPABASE_URL = "https://ohkrsgrgcsvimtupgech.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9oa3JzZ3JnY3N2aW10dXBnZWNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEzMjQ1MjYsImV4cCI6MjA2NjkwMDUyNn0.1wgD3b2oEEw3Vl5iHUKfVtbAKYFEDg7xo9Rqk-H8Bi8";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const BLOQUES = [
  { id: 1, nombre: "Bloque 1", hora: "09:00 - 10:40", color: "#A100FF" },
  { id: 2, nombre: "Bloque 2", hora: "10:40 - 12:15", color: "#7A02ED" },
  { id: 3, nombre: "Bloque 3", hora: "12:50 - 14:30", color: "#5A02B8" },
  { id: 4, nombre: "Bloque 4", hora: "14:30 - 16:00", color: "#3A0280" }
];

export default function Sorteo() {
  const [emails, setEmails] = useState([]);
  const [ganador, setGanador] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [sorteosRealizados, setSorteosRealizados] = useState([]);
  const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date().toISOString().split('T')[0]);
  const navigate = useNavigate();

  useEffect(() => {
    cargarEmails();
  }, [fechaSeleccionada]);

  const cargarEmails = async () => {
    try {
      setIsLoading(true);
      setError("");
      
      // Obtener emails de la fecha seleccionada
      const fechaInicio = new Date(fechaSeleccionada);
      fechaInicio.setHours(0, 0, 0, 0);
      
      const fechaFin = new Date(fechaSeleccionada);
      fechaFin.setHours(23, 59, 59, 999);

      const { data, error } = await supabase
        .from('mails')
        .select('*')
        .gte('fechaAnotado', fechaInicio.toISOString())
        .lte('fechaAnotado', fechaFin.toISOString())
        .order('fechaAnotado', { ascending: true });

      if (error) {
        throw error;
      }

      setEmails(data || []);
    } catch (err) {
      setError("Error al cargar los emails: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const sortearPorBloque = async (bloque) => {
    if (emails.length === 0) {
      setError("No hay emails registrados para esta fecha");
      return;
    }

    setIsLoading(true);
    setError("");
    setGanador(null);

    // Simular delay para mejor UX
    await new Promise(resolve => setTimeout(resolve, 1500));

    try {
      // Filtrar emails por bloque horario
      const emailsBloque = emails.filter(email => {
        const fechaEmail = new Date(email.fechaAnotado);
        const hora = fechaEmail.getHours();
        const minutos = fechaEmail.getMinutes();
        const tiempoTotal = hora * 60 + minutos; // Convertir a minutos para comparación precisa
        
        switch (bloque.id) {
          case 1: // 09:00 - 10:40 (540 - 640 minutos)
            return tiempoTotal >= 540 && tiempoTotal < 640;
          case 2: // 10:40 - 12:15 (640 - 735 minutos)
            return tiempoTotal >= 640 && tiempoTotal < 735;
          case 3: // 12:50 - 14:30 (770 - 870 minutos)
            return tiempoTotal >= 770 && tiempoTotal < 870;
          case 4: // 14:30 - 16:00 (870 - 960 minutos)
            return tiempoTotal >= 870 && tiempoTotal < 960;
          default: return false;
        }
      });

      if (emailsBloque.length === 0) {
        setError(`No hay emails registrados en el ${bloque.nombre}`);
        setIsLoading(false);
        return;
      }

      // Seleccionar ganador aleatorio
      const ganadorAleatorio = emailsBloque[Math.floor(Math.random() * emailsBloque.length)];
      setGanador({
        email: ganadorAleatorio.mail,
        bloque: bloque,
        tipo: "bloque"
      });

      // Guardar en historial
      const nuevoSorteo = {
        id: Date.now(),
        email: ganadorAleatorio.mail,
        bloque: bloque.nombre,
        fecha: new Date().toLocaleString('es-ES'),
        tipo: "bloque"
      };
      setSorteosRealizados(prev => [nuevoSorteo, ...prev]);

    } catch (err) {
      setError("Error al realizar el sorteo: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const sorteoTotal = async () => {
    if (emails.length === 0) {
      setError("No hay emails registrados para esta fecha");
      return;
    }

    setIsLoading(true);
    setError("");
    setGanador(null);

    // Simular delay para mejor UX
    await new Promise(resolve => setTimeout(resolve, 2000));

    try {
      // Seleccionar ganador aleatorio de todos los emails del día
      const ganadorAleatorio = emails[Math.floor(Math.random() * emails.length)];
      setGanador({
        email: ganadorAleatorio.mail,
        bloque: null,
        tipo: "total"
      });

      // Guardar en historial
      const nuevoSorteo = {
        id: Date.now(),
        email: ganadorAleatorio.mail,
        bloque: "Sorteo Total",
        fecha: new Date().toLocaleString('es-ES'),
        tipo: "total"
      };
      setSorteosRealizados(prev => [nuevoSorteo, ...prev]);

    } catch (err) {
      setError("Error al realizar el sorteo: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const limpiarGanador = () => {
    setGanador(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("sorteoAuth");
    navigate("/");
  };

  return (
    <div className="sorteo-container">
      <div className="sorteo-header">
                  <div className="sorteo-header-content">
            <div className="sorteo-header-left">
              <h1>🎉 Sorteo Juntify</h1>
              <p>Selecciona una fecha y realiza el sorteo</p>
            </div>
            <button 
              className="volver-btn"
              onClick={handleLogout}
            >
              ← Volver
            </button>
          </div>
      </div>

      <div className="sorteo-controls">
        <div className="fecha-selector">
          <label htmlFor="fecha">Fecha del sorteo:</label>
          <input
            type="date"
            id="fecha"
            value={fechaSeleccionada}
            onChange={(e) => setFechaSeleccionada(e.target.value)}
            max={new Date().toISOString().split('T')[0]}
          />
        </div>

        <div className="stats">
          <div className="stat-item">
            <span className="stat-number">{emails.length}</span>
            <span className="stat-label">Emails registrados</span>
          </div>
        </div>
      </div>

      {error && (
        <div className="sorteo-error">
          {error}
        </div>
      )}

      <div className="sorteo-content">
        <div className="bloques-container">
          <h2>Sorteo por Bloques</h2>
          <div className="bloques-grid">
            {BLOQUES.map((bloque) => (
              <div key={bloque.id} className="bloque-card">
                <div className="bloque-header" style={{ backgroundColor: bloque.color }}>
                  <h3>{bloque.nombre}</h3>
                  <span className="bloque-hora">{bloque.hora}</span>
                </div>
                <div className="bloque-content">
                  <button
                    className="sortear-btn"
                    onClick={() => sortearPorBloque(bloque)}
                    disabled={isLoading}
                    style={{ backgroundColor: bloque.color }}
                  >
                    {isLoading ? (
                      <>
                        <span className="loading-spinner"></span>
                        Sorteando...
                      </>
                    ) : (
                      "🎲 Sortear"
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="sorteo-total">
          <h2>Sorteo Total del Día</h2>
          <button
            className="sortear-total-btn"
            onClick={sorteoTotal}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="loading-spinner"></span>
                Sorteando...
              </>
            ) : (
              "🎯 Sorteo Total"
            )}
          </button>
        </div>
      </div>

      {ganador && (
        <div className="ganador-container">
          <div className="ganador-card">
            <div className="ganador-header">
              <h3>¡Ganador!</h3>
              {ganador.tipo === "bloque" && (
                <span className="ganador-bloque">{ganador.bloque.nombre}</span>
              )}
            </div>
            <div className="ganador-email">
              {ganador.email}
            </div>
            <button className="limpiar-btn" onClick={limpiarGanador}>
              Limpiar
            </button>
          </div>
        </div>
      )}

      {sorteosRealizados.length > 0 && (
        <div className="historial-container">
          <h2>Historial de Sorteos</h2>
          <div className="historial-list">
            {sorteosRealizados.slice(0, 10).map((sorteo) => (
              <div key={sorteo.id} className="historial-item">
                <div className="historial-info">
                  <span className="historial-email">{sorteo.email}</span>
                  <span className="historial-bloque">{sorteo.bloque}</span>
                </div>
                <span className="historial-fecha">{sorteo.fecha}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 