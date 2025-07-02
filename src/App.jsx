import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Landing from "./components/Landing";
import Sorteo from "./components/Sorteo";
import LoginPage from "./components/LoginPage";
import TestPage from "./components/TestPage";
import ProtectedRoute from "./components/ProtectedRoute";
import "./components/Landing.css";
import "./components/WaitlistForm.css";
import "./components/Sorteo.css";
import "./components/LoginPage.css";

// Componente para manejar scroll automático
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <div className="App">
        <ScrollToTop />
        <Routes>
          {/* Ruta principal - Landing page */}
          <Route path="/" element={<Landing />} />
          
          {/* Ruta de login */}
          <Route path="/login" element={<LoginPage />} />
          
          {/* Ruta de prueba */}
          <Route path="/test" element={<TestPage />} />
          
          {/* Ruta de sorteo protegida */}
          <Route 
            path="/sorteo" 
            element={
              <ProtectedRoute>
                <Sorteo />
              </ProtectedRoute>
            } 
          />
          
          {/* Redirigir cualquier otra ruta a la landing page */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;