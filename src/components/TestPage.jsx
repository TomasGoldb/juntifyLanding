import React from "react";
import { useNavigate } from "react-router-dom";

export default function TestPage() {
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1>🧪 Página de Prueba</h1>
      <p>React Router está funcionando correctamente</p>
      
      <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
        <button 
          onClick={() => navigate('/')}
          style={{
            padding: '1rem 2rem',
            background: 'rgba(255,255,255,0.2)',
            border: '2px solid white',
            borderRadius: '10px',
            color: 'white',
            cursor: 'pointer'
          }}
        >
          Ir a Landing
        </button>
        
        <button 
          onClick={() => navigate('/sorteo')}
          style={{
            padding: '1rem 2rem',
            background: 'rgba(255,255,255,0.2)',
            border: '2px solid white',
            borderRadius: '10px',
            color: 'white',
            cursor: 'pointer'
          }}
        >
          Ir a Sorteo
        </button>
        
        <button 
          onClick={() => navigate('/login')}
          style={{
            padding: '1rem 2rem',
            background: 'rgba(255,255,255,0.2)',
            border: '2px solid white',
            borderRadius: '10px',
            color: 'white',
            cursor: 'pointer'
          }}
        >
          Ir a Login
        </button>
      </div>
      
      <div style={{ marginTop: '2rem', fontSize: '0.9rem', opacity: 0.8 }}>
        <p>localStorage.sorteoAuth: {localStorage.getItem("sorteoAuth") || "null"}</p>
      </div>
    </div>
  );
} 