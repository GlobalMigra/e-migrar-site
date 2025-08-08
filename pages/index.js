// pages/index.js
import { useState, useEffect } from 'react';

export default function Home({ countries }) {
  const [filter, setFilter] = useState('');
  const [type, setType] = useState('');

  const filtered = countries.filter((c) =>
    c.country.toLowerCase().includes(filter.toLowerCase()) &&
    (type ? c.route_type === type : true)
  );

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '1000px', margin: '0 auto', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <header style={{ textAlign: 'center', marginBottom: '30px', backgroundColor: '#0D47A1', color: 'white', padding: '20px', borderRadius: '8px' }}>
        <h1 style={{ fontSize: '2.5em', margin: 0 }}>🌍 e-migrar</h1>
        <p style={{ margin: '10px 0 0 0', fontWeight: 'normal' }}>Tu guía digital para emigrar con confianza</p>
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
   const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'https://e-migrar-site.pages.dev'}/data.json`);
    const countries = await res.json();

    return {
      props: {
        countries,
      },
      revalidate: 3600, // Actualiza cada hora
    };
  } catch (error) {
    console.error('Error al cargar datos:', error);
    return {
      props: {
        countries: [],
      },
    };
  }
}
