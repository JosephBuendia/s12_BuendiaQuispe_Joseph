# Cambios en serenazgo-react/src/pages/Contacto.jsx

1. Quita la línea:
   import { sql } from "../services/neon-config";
   y agrega:
   import { http } from "../services/http";

2. Reemplaza el bloque `await sql` + INSERT INTO mensajes_contacto por:

   const { ok, datos } = await http("/contacto", {
     method: "POST",
     body: { nombres, apellidos, dni, telefono: tel, correo, asunto: f.asunto, mensaje },
   });
   if (!ok) throw new Error(datos?.mensaje ?? "Error al enviar");

   (el resto —setAviso de éxito y el catch— queda igual)
