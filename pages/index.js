// pages/index.js
import { useState, useEffect } from 'react';

export default function Home({ countries }) {
  const [lang, setLang] = useState('es');
  const [t, setT] = useState({
    // Valores por defecto (español)
    title: "e-migrar",
    tagline: "Tu guía digital para emigrar con confianza",
    search_placeholder: "Buscar país...",
    filter_label: "Todos los trámites",
    route_work: "Trabajo",
    route_study: "Estudio",
    route_tourism: "Turismo",
    route_marriage: "Matrimonio",
    route_asylum: "Asilo",
    processing_time: "Tiempo estimado",
    cost: "Costo aproximado",
    allows_residence: "¿Permite residencia?",
    allows_family: "¿Puede traer familiares?",
    requirements: "Requisitos",
    official_link: "Ver sitio oficial",
    alert_special: "Alerta",
    footer: "© 2025 e-migrar.org. Información educativa. No constituye asesoría legal."
  });

  useEffect(() => {
  const savedLang = typeof localStorage !== 'undefined' ? localStorage.getItem('lang') || 'es' : 'es';
  setLang(savedLang);

  fetch('/locales/translations.json')
    .then(res => res.json())
    .then(data => {
      if (data[savedLang]) {
        setT(data[savedLang]);
      }
    })
    .catch(err => {
      console.warn('No se cargaron traducciones. Usando valores por defecto.', err);
    });
}, []);

  const [filter, setFilter] = useState('');
  const [type, setType] = useState('');

  const filtered = countries.filter((c) =>
    c.country.toLowerCase().includes(filter.toLowerCase()) &&
    (type ? c.route_type === type : true)
  );

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '1000px', margin: '0 auto', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <header style={{ textAlign: 'center', marginBottom: '30px', backgroundColor: '#0D47A1', color: 'white', padding: '20px', borderRadius: '8px' }}>
        <img 
          src="/images/logo-e-migrar.png" 
          alt="e-migrar" 
          style={{ width: '200px', height: 'auto', marginBottom: '10px' }} 
        />
        <p><strong>{t.tagline}</strong></p>
        <div style={{ marginTop: '10px' }}>
          <select 
            onChange={(e) => {
              const lang = e.target.value;
              localStorage.setItem('lang', lang);
              window.location.reload();
            }}
            defaultValue={lang}
            style={{ padding: '6px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '14px' }}
          >
            <option value="es">🇪🇸 Español</option>
            <option value="en">🇬🇧 English</option>
            <option value="fr">🇫🇷 Français</option>
            <option value="pt">🇵🇹 Português</option>
            <option value="ar">🇦🇪 العربية</option>
          </select>
        </div>
      </header>

      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <input
          placeholder={t.search_placeholder}
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{ padding: '12px', minWidth: '200px', borderRadius: '6px', border: '1px solid #ccc' }}
        />
        <select
          onChange={(e) => setType(e.target.value)}
          style={{ padding: '12px', borderRadius: '6px', border: '1px solid #ccc' }}
        >
          <option value="">{t.filter_label}</option>
          <option value="Trabajo">{t.route_work}</option>
          <option value="Estudio">{t.route_study}</option>
          <option value="Turismo">{t.route_tourism}</option>
          <option value="Matrimonio">{t.route_marriage}</option>
          <option value="Asilo">{t.route_asylum}</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#666' }}>No se encontraron resultados.</p>
      ) : (
        filtered.map((c, i) => (
          <div key={i} style={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '20px',
            marginBottom: '20px',
            backgroundColor: '#fff',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
            transition: 'box-shadow 0.3s ease'
          }}>
            <h3 style={{ margin: '0 0 10px 0', color: '#0D47A1' }}>
              🌐 <strong>{c.country}</strong> – {c.title}
            </h3>
            <p><strong>💼 Trámite:</strong> {c.route_type}</p>
            <p><strong>⏳ Tiempo estimado:</strong> {c.processing_time || 'No especificado'}</p>
            <p><strong>💶 Costo aproximado:</strong> {c.cost || 'No especificado'}</p>
            <p><strong>🏠 ¿Permite residencia?</strong> {c.allows_residence === 'true' ? '✅ Sí' : '❌ No'}</p>
            <p><strong>👨‍👩‍👧‍👦 ¿Puede traer familiares?</strong> {c.allows_family === 'true' ? '✅ Sí' : '❌ No'}</p>
            <p><strong>📝 Descripción:</strong> {c.description || 'Información no disponible'}</p>
            <h4>📋 Requisitos:</h4>
            <p>{c.requirements || 'No especificados'}</p>
            {c.official_link && (
              <p>
                <a
                  href={c.official_link}
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: '#0D47A1', fontWeight: 'bold', textDecoration: 'none' }}
                >
                  🔗 {t.official_link}
                </a>
              </p>
            )}
            {c.alert_special && (
              <p style={{ color: 'orange', fontWeight: 'bold', marginTop: '10px', backgroundColor: '#fff3cd', padding: '10px', borderRadius: '4px' }}>
                ⚠️ {t.alert_special}: {c.alert_special}
              </p>
            )}
          </div>
        ))
      )}

      <footer style={{ textAlign: 'center', marginTop: '50px', color: '#777', fontSize: '0.9em', borderTop: '1px solid #eee', paddingTop: '20px' }}>
        <p>{t.footer}</p>
      </footer>
    </div>
  );
}

// ====> Carga solo los datos de migración
export async function getStaticProps() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'https://e-migrar-site.vercel.app'}/data.json`);
    const countries = await res.json();

    return {
      props: {
        countries,
      },
      revalidate: 3600,
    };
  } catch (error) {
    console.error('Error al cargar data.json:', error);
    return {
      props: {
        countries: [],
      },
    };
  }
}
