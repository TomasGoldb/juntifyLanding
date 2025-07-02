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

// Helper para obtener fecha YYYY-MM-DD en zona de Montevideo
function getMontevideoDate(date) {
  return new Date(
    date.toLocaleString("en-US", { timeZone: "America/Montevideo" })
  );
}

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
    setGanador(null);
    setSorteosRealizados([]);
    // eslint-disable-next-line
  }, [fechaSeleccionada]);

  const cargarEmails = async () => {
    try {
      setIsLoading(true);
      setError("");
      
      // Fechas en UTC para el rango del día seleccionado
      const fechaInicio = new Date(fechaSeleccionada + "T00:00:00.000Z");
      const fechaFin = new Date(fechaSeleccionada + "T23:59:59.999Z");

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

  // Devuelve minutos desde 00:00 para la hora local de Montevideo
  function getMinutosMontevideo(fechaISO) {
    const fechaLocal = new Date(
      new Date(fechaISO).toLocaleString("en-US", { timeZone: "America/Montevideo" })
    );
    const horas = fechaLocal.getHours();
    const minutos = fechaLocal.getMinutes();
    return horas * 60 + minutos;
  }

  // Devuelve la fecha local de Montevideo en formato YYYY-MM-DD (para debug)
  function getFechaLocalMontevideo(fechaISO) {
    const fechaLocal = new Date(
      new Date(fechaISO).toLocaleString("en-US", { timeZone: "America/Montevideo" })
    );
    return fechaLocal.toISOString().split("T")[0];
  }

  const sortearPorBloque = async (bloque) => {
    if (emails.length === 0) {
      setError("No hay emails registrados para esta fecha");
      return;
    }

    // Filtrar emails por bloque usando hora local de Montevideo
    const emailsBloque = emails.filter(email => {
      // Filtro extra: asegurarse que la fecha local también sea la seleccionada
      const fechaLocalStr = getFechaLocalMontevideo(email.fechaAnotado);
      if (fechaLocalStr !== fechaSeleccionada) return false;

      const tiempoTotal = getMinutosMontevideo(email.fechaAnotado);

      let perteneceAlBloque = false;
      switch (bloque.id) {
        case 1: perteneceAlBloque = tiempoTotal >= 540 && tiempoTotal < 640; break;   // 09:00 - 10:40
        case 2: perteneceAlBloque = tiempoTotal >= 640 && tiempoTotal < 735; break;   // 10:40 - 12:15
        case 3: perteneceAlBloque = tiempoTotal >= 770 && tiempoTotal < 870; break;   // 12:50 - 14:30
        case 4: perteneceAlBloque = tiempoTotal >= 870 && tiempoTotal < 960; break;   // 14:30 - 16:00
        default: perteneceAlBloque = false;
      }
      // Debug (puedes sacar el console luego)
      //console.log(`Mail: ${email.mail} | fechaAnotado: ${email.fechaAnotado} | LocalDate: ${fechaLocalStr} | Minutos: ${tiempoTotal} | Bloque ${bloque.id}: ${perteneceAlBloque}`);
      return perteneceAlBloque;
    });

    if (emailsBloque.length === 0) {
      setError(`No hay emails registrados en el ${bloque.nombre} para esta fecha`);
      return;
    }

    setIsLoading(true);
    setError("");
    setGanador(null);

    await new Promise(resolve => setTimeout(resolve, 1500));

    try {
      const ganadorAleatorio = emailsBloque[Math.floor(Math.random() * emailsBloque.length)];
      setGanador({
        email: ganadorAleatorio.mail,
        bloque: bloque,
        tipo: "bloque"
      });

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

    // Filtro extra: emails que en Montevideo correspondan a la fecha seleccionada
    const emailsDelDia = emails.filter(email => {
      const fechaLocalStr = getFechaLocalMontevideo(email.fechaAnotado);
      return fechaLocalStr === fechaSeleccionada;
    });

    if (emailsDelDia.length === 0) {
      setError("No hay emails registrados para esta fecha (en horario local)");
      return;
    }

    setIsLoading(true);
    setError("");
    setGanador(null);

    await new Promise(resolve => setTimeout(resolve, 2000));

    try {
      const ganadorAleatorio = emailsDelDia[Math.floor(Math.random() * emailsDelDia.length)];
      setGanador({
        email: ganadorAleatorio.mail,
        bloque: null,
        tipo: "total"
      });

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
            <span className="stat-number">{emails.filter(email => getFechaLocalMontevideo(email.fechaAnotado) === fechaSeleccionada).length}</span>
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