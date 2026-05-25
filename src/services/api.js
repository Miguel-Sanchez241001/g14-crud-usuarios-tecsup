// URL base configurada en .env.local — ver README.md sección "Configurar la URL del backend"
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const JSON_HEADERS = { 'Content-Type': 'application/json' };

async function handleResponse(res) {
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Error ${res.status}`);
  }
}

export async function getUsuarios() {
  const res = await fetch(`${BASE_URL}/usuarios`);
  await handleResponse(res);
  return res.json();
}

export async function createUsuario(data) {
  const res = await fetch(`${BASE_URL}/usuarios`, {
    method: 'POST',
    headers: JSON_HEADERS,
    body: JSON.stringify(data),
  });
  await handleResponse(res);
}

export async function updateUsuario(id, data) {
  const res = await fetch(`${BASE_URL}/usuarios/${id}`, {
    method: 'PUT',
    headers: JSON_HEADERS,
    body: JSON.stringify(data),
  });
  await handleResponse(res);
}

export async function deleteUsuario(id) {
  const res = await fetch(`${BASE_URL}/usuarios/${id}`, { method: 'DELETE' });
  await handleResponse(res);
}
