// pages/colabora.js
import { useState } from 'react';

export default function Colabora() {
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes conectar con un formulario real (Google Forms, Typeform, etc.)
    setMensaje('Gracias por tu interés. Nos contactaremos contigo pronto.');
    e.target.reset();
  };

  return (
    <div style={{ padding: '40px 20px', fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto', backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      <h1 style={{ textAlign: 'center', color: '#0D47A1' }}>🤝 Únete a e-migrar</h1>
      <p style={{ textAlign: 'center', fontSize: '18px', marginBottom: '30px' }}>
        ¿Eres abogado, migrante, ONG o profesional que quiere ayudar? Tu conocimiento puede cambiar vidas.
      </p>

      <h2>¿Cómo puedes colaborar?</h2>
      <ul>
        <li><strong>Abogados de inmigración:</strong> Ayuda a verificar trámites y requisitos.</li>
        <li><strong>Migrantes:</strong> Comparte tu experiencia real.</li>
        <li><strong>ONGs:</strong> Colabora con información y recursos.</li>
        <li><strong>Traductores:</strong> Ayuda a traducir el sitio a más idiomas.</li>
      </ul>

      <h2>Envíanos un mensaje</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input
          type="text"
          placeholder="Tu nombre"
          required
          style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <input
          type="email"
          placeholder="Tu correo"
          required
          style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <select
          required
          style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
        >
          <option value="">¿Qué ofreces?</option>
          <option value="abogado">Asesoría legal</option>
          <option value="migrante">Experiencia personal</option>
          <option value="ong">Apoyo institucional</option>
          <option value="traductor">Traducción</option>
          <option value="otro">Otro</option>
        </select>
        <textarea
          placeholder="Tu mensaje"
          rows="5"
          style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
        ></textarea>
        <button
          type="submit"
          style={{ padding: '12px', backgroundColor: '#0D47A1', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Enviar
        </button>
      </form>

      {mensaje && <p style={{ marginTop: '20px', color: 'green', fontWeight: 'bold' }}>{mensaje}</p>}

      <p style={{ marginTop: '40px', fontSize: '14px', color: '#666', textAlign: 'center' }}>
        © 2025 e-migrar.org. Tu ayuda es voluntaria y será reconocida como colaborador oficial.
      </p>
    </div>
  );
}
