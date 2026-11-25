import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { usePageStyles } from "../hooks/usePageStyles";
import css from "../css/index.css?inline";

const SLIDES = [
  { src: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=80", alt: "Unidades operativas de Serenazgo" },
  { src: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80", alt: "Centro de Monitoreo de Videovigilancia" },
  { src: "https://images.unsplash.com/photo-1508847154043-be5407fcaa5a?auto=format&fit=crop&w=1200&q=80", alt: "Patrullaje Nocturno Municipal" },
];

const INCIDENTES = [
  {
    id: "boton-auxilio",
    cardImg: "https://cloudfront-us-east-1.images.arcpublishing.com/lacronicadehoy/CXZVK4PN666DHFY7QMBTHYK5JA.jpg",
    titulo: "Botón de auxilio",
    resumen: "Reporte inmediato de emergencias en curso: robos, agresiones o personas en riesgo.",
    badge: "Atención de Emergencia Inmediata",
    modalTitulo: "Botón de auxilio en línea",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80",
    descripcion: "Plataforma digital optimizada para el despacho prioritario de patrullas y serenos en tiempo real. Al presionar el botón de auxilio, se genera un ticket de alerta instantáneo con tu ubicación registrada.",
    detalles: [
      "Geolocalización referencial directa a la Central de Cómputo",
      "Asignación automática de la unidad móvil o motorizada más cercana",
      "Comunicación directa con el radio operador de turno",
      "Disponible las 24 horas del día, los 365 días del año",
    ],
    btnText: "Reportar emergencia",
    link: "/reportar",
  },
  {
    id: "patrullaje-zonas",
    cardImg: "https://images.unsplash.com/photo-1569974498991-d3c12a504f95?auto=format&fit=crop&w=800&q=80",
    titulo: "Patrullaje por zonas",
    resumen: "Consulta el recorrido y horario de las unidades asignadas a tu sector.",
    badge: "Patrullaje Sectorizado",
    modalTitulo: "Patrullaje por zonas y cuadrantes",
    image: "https://images.unsplash.com/photo-1569974498991-d3c12a504f95?auto=format&fit=crop&w=800&q=80",
    descripcion: "Consulta el recorrido, horarios y cuadrantes asignados a tu sector. Despliegue constante de unidades vehiculares y patrullaje a pie para la prevención del delito en zonas urbanas.",
    detalles: [
      "Rutas programadas en cuadrantes urbanos y zonas periurbanas",
      "Monitoreo permanente en coordinación con serenos motorizados",
      "Presencia física preventiva en puntos de mayor afluencia",
      "Atención y respuesta directa a comités vecinales de seguridad",
    ],
    btnText: "Ver Zonas de Patrullaje",
    link: "/servicios",
  },
  {
    id: "central-radio",
    cardImg: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80",
    titulo: "Central de radio",
    resumen: "Línea directa con el operador de turno para coordinar el apoyo en campo.",
    badge: "Central de Comunicaciones 24/7",
    modalTitulo: "Central de radio y mando operativo",
    image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80",
    descripcion: "Mesa de control e interconexión telefónica y de radio para coordinar la respuesta rápida de patrullas, ambulancias, bomberos y la Policía Nacional del Perú.",
    detalles: [
      "Línea directa (064) 123-4567 activa de forma permanente",
      "Red de radiocomunicación integrada de alta cobertura provincial",
      "Articulación inmediata con la Policía Nacional (105) y SAMU",
      "Atención y asistencia guiada por operadores capacitados",
    ],
    btnText: "Ver Ubicación y Contacto",
    link: "/contacto",
  },
];

function Contador({ target, prefix = "", suffix = "" }) {
  const ref = useRef(null);
  const [valor, setValor] = useState(0);

  useEffect(() => {
    let timer;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const pasos = 60;
      let paso = 0;
      timer = setInterval(() => {
        paso++;
        setValor(Math.min(target, Math.floor((target * paso) / pasos)));
        if (paso >= pasos) clearInterval(timer);
      }, 2000 / pasos);
    }, { threshold: 0.4 });
    observer.observe(ref.current);
    return () => { observer.disconnect(); clearInterval(timer); };
  }, [target]);

  return <dt ref={ref} className="stat-number">{prefix}{valor}{suffix}</dt>;
}

export default function Inicio() {
  usePageStyles(css);
  const { usuario, abrirModal } = useAuth();
  const navigate = useNavigate();
  const [slide, setSlide] = useState(0);
  const [detalle, setDetalle] = useState(null);

  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % SLIDES.length), 4500);
    return () => clearInterval(t);
  }, []);

  function irProtegido(e, ruta) {
    e.preventDefault();
    if (!usuario) abrirModal("login");
    else navigate(ruta);
  }

  return (
    <>
      <section className="hero">
        <div className="container">
          <div>
            <p className="hero-eyebrow">MUNICIPALIDAD PROVINCIAL DE HUANCAYO — SUBGERENCIA DE SERENAZGO</p>
            <h1>Patrullaje y respuesta a emergencias las 24 horas</h1>
            <p>Serenazgo Alerta Huancayo coordina el patrullaje de la provincia y atiende reportes ciudadanos en tiempo real: robos, disturbios, accidentes de tránsito y situaciones de riesgo en la vía pública.</p>
            <div className="hero-actions">
              <a className="btn btn-auxilio" href="/reportar" onClick={(e) => irProtegido(e, "/reportar")}>Botón de auxilio</a>
              <a className="btn btn-outline btn-como-funciona" href="/como-funciona" onClick={(e) => irProtegido(e, "/como-funciona")}>Cómo funciona</a>
            </div>
          </div>

          <div className="hero-carousel">
            {SLIDES.map((s, i) => (
              <div key={s.src} className={`carousel-slide ${i === slide ? "active" : ""}`}>
                <img src={s.src} alt={s.alt} />
                <div className="carousel-overlay"></div>
              </div>
            ))}
            <div className="carousel-dots">
              {SLIDES.map((_, i) => (
                <span key={i} className={`dot ${i === slide ? "active" : ""}`} onClick={() => setSlide(i)}></span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="stats">
        <div className="container">
          <dl className="stat"><Contador target={24} suffix="/7" /><dd>Atención permanente todos los días del año</dd></dl>
          <dl className="stat"><Contador target={5} /><dd>Zonas de patrullaje activo en la provincia</dd></dl>
          <dl className="stat"><Contador target={8} prefix="~" suffix=" min" /><dd>Tiempo promedio de respuesta en zona urbana</dd></dl>
          <dl className="stat"><Contador target={42} /><dd>Unidades móviles y a pie en servicio</dd></dl>
        </div>
      </section>

      <section className="section-incidents">
        <div className="container">
          <h2 className="section-title">Atención según el tipo de incidente</h2>
          <p className="section-subtitle">Cada reporte se deriva a la unidad correspondiente según el trámite y el nivel de urgencia.</p>

          <div className="incidents-grid">
            {INCIDENTES.map((inc) => (
              <article key={inc.id} className="incident-card" onClick={() => setDetalle(inc)}>
                <div className="incident-media">
                  <img src={inc.cardImg} alt={inc.titulo} />
                  <button type="button" className="btn-card-details">Ver detalles &rarr;</button>
                </div>
                <div className="incident-content">
                  <h3>{inc.titulo}</h3>
                  <p>{inc.resumen}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="section-actions" style={{ marginTop: "2rem" }}>
            <Link to="/servicios" className="btn btn-outline">Ver todos los servicios</Link>
          </div>
        </div>
      </section>

      {/* Modal de detalle del incidente */}
      <div
        className={`modal-overlay ${detalle ? "active" : ""}`}
        aria-hidden={!detalle}
        onClick={(e) => e.target === e.currentTarget && setDetalle(null)}
      >
        {detalle && (
          <div className="modal-card" role="dialog" aria-modal="true">
            <div className="modal-header-img">
              <img src={detalle.image} alt="Detalle del servicio" />
              <button type="button" className="modal-close-btn" aria-label="Cerrar modal" onClick={() => setDetalle(null)}>&times;</button>
            </div>
            <div className="modal-body">
              <span className="modal-badge">{detalle.badge}</span>
              <h2 className="modal-title">{detalle.modalTitulo}</h2>
              <p className="modal-description">{detalle.descripcion}</p>
              <div className="modal-section-details">
                <h4 className="modal-subtitle">Características clave del servicio:</h4>
                <ul className="modal-list">
                  {detalle.detalles.map((d) => <li key={d}>{d}</li>)}
                </ul>
              </div>
              <hr className="modal-divider" />
              <div className="modal-footer-action">
                <button type="button" className="btn-modal-primary"
                  onClick={() => { const l = detalle.link; setDetalle(null); navigate(l); }}>
                  {detalle.btnText}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}