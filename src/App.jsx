import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Layout from "./components/Layout";
import Inicio from "./pages/Inicio";
import Servicios from "./pages/Servicios";
import ComoFunciona from "./pages/ComoFunciona";
import Contacto from "./pages/Contacto";
import Pendiente from "./pages/Pendiente";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Inicio />} />
            <Route path="/servicios" element={<Servicios />} />
            <Route path="/como-funciona" element={<ComoFunciona />} />
            <Route path="/contacto" element={<Contacto />} />

            {/* Aún sin migrar: reportar (formulario.html), actualizar, caja, panel */}
            <Route path="/reportar" element={<Pendiente titulo="Reportar" />} />
            <Route path="/actualizar" element={<Pendiente titulo="Mis Registros / Pagos" />} />
            <Route path="/caja" element={<Pendiente titulo="Módulo de Caja" />} />
            <Route path="/panel" element={<Pendiente titulo="Panel CRUD Global" />} />
            <Route path="*" element={<Pendiente titulo="Página no encontrada" />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
