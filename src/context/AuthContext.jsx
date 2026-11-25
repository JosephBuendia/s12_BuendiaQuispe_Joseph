import { createContext, useContext, useState } from "react";
import * as auth from "../services/auth";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(auth.obtenerUsuarioActual());
  const [modal, setModal] = useState(null); // null | "login" | "register"

  async function login(correo, contrasena) {
    const r = await auth.iniciarSesion(correo, contrasena);
    if (r.exito) {
      setUsuario(r.usuario);
      setModal(null);
    }
    return r;
  }

  function logout() {
    auth.cerrarSesion();
    setUsuario(null);
  }

  return (
    <AuthContext.Provider
      value={{
        usuario,
        login,
        logout,
        registrar: auth.registrarUsuario,
        modal,
        abrirModal: setModal,
        cerrarModal: () => setModal(null),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}