// pages/index.js
import { useState, useEffect } from 'react';

export default function Home({ countries, }) {
  const [lang, setLang] = useState('es');
  const [translations, setTranslations] = useState(null);
  const [t, setT] = useState(null);
  
  useEffect(() => {
    const savedLang = localStorage.getItem('lang') || 'es';
    setLang(savedLang);

    fetch('/locales/translations.json')
      .then(res => res.json())
      .then(data => {
        setTranslations(data);
        setT(data[savedLang]);
      });
  }, []);

  if (!t) {
    return <div style={{ textAlign: 'center', padding: '50px' }}>Cargando traducciones...</div>;
  }

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
  <p><strong>{t.tagline}</strong></p> <div style={{ marginTop: '10px' }}>
  <select 
    onChange={(e) => {
      const lang = e.target.value;
      localStorage.setItem('lang', lang);
      window.location.reload();
    }}
    defaultValue={localStorage.getItem('lang') || 'es'}
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
          placeholder="Buscar país..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{ padding: '12px', minWidth: '200px', borderRadius: '6px', border: '1px solid #ccc' }}
        />
        <select
          onChange={(e) => setType(e.target.value)}
          style={{ padding: '12px', borderRadius: '6px', border: '1px solid #ccc' }}
        >
          <option value="">Todos los trámites</option>
          <option value="Trabajo">Trabajo</option>
          <option value="Estudio">Estudio</option>
          <option value="Turismo">Turismo</option>
          <option value="Matrimonio">Matrimonio</option>
          <option value="Asilo">Asilo</option>
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
                  🔗 Ver sitio oficial
                </a>
              </p>
            )}
            {c.alert_special && (
              <p style={{ color: 'orange', fontWeight: 'bold', marginTop: '10px', backgroundColor: '#fff3cd', padding: '10px', borderRadius: '4px' }}>
                ⚠️ {c.alert_special}
              </p>
            )}
          </div>
        ))
      )}

      <footer style={{ textAlign: 'center', marginTop: '50px', color: '#777', fontSize: '0.9em', borderTop: '1px solid #eee', paddingTop: '20px' }}>
        <p>© 2025 e-migrar.org. Información educativa. No constituye asesoría legal.</p>
      </footer>
    </div>
  );
}

// ====> Carga los datos desde /data.json
export async function getStaticProps() {
  try {
    // ====> 1. Carga los datos de migración
    const res = await fetch('/data.json');
    const countries = await res.json();

    // ====> 2. Carga las traducciones
    const resTranslations = await fetch('/locales/translations.json');
    const translations = await resTranslations.json();

    // ====> 3. Define el idioma predeterminado (español)
    const t = translations['es']; // Puedes cambiar a 'en', 'fr', etc.

    return {
      props: {
        countries,
        translations, // Opcional: si quieres cambiar de idioma en el cliente
        t,            // Etiqueta corta para usar en el componente
      },
      revalidate: 3600,
    };
  } catch (error) {
    console.error('Error al cargar datos o traducciones:', error);
    return {
      props: {
        countries: [],
        t: {
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
        }
      },
    };
  }
}
