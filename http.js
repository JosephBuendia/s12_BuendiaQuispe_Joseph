// serenazgo-react/src/services/http.js  (NUEVO)
const BASE = import.meta.env.VITE_API_URL ?? '/api';

export async function http(ruta, { method = 'GET', body } = {}) {
  const token = sessionStorage.getItem('token');
  const res = await fetch(BASE + ruta, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  let datos = null;
  try { datos = await res.json(); } catch { /* sin cuerpo */ }
  return { ok: res.ok, status: res.status, datos };
}
