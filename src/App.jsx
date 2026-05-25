import { useState, useEffect } from 'react';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import alerta from './utils/alerta';
import { getUsuarios, createUsuario, updateUsuario, deleteUsuario } from './services/api';

function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const cargarUsuarios = async () => {
    try {
      setLoading(true);
      const data = await getUsuarios();
      setUsuarios(data);
    } catch (err) {
      alerta.error('No se pudo conectar con el servidor.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const handleNuevo = () => {
    setEditingUser(null);
    setShowForm(true);
  };

  const handleEditar = (usuario) => {
    setEditingUser(usuario);
    setShowForm(true);
  };

  const handleEliminar = async (id) => {
    const resultado = await alerta.confirmarEliminar();

    if (!resultado.isConfirmed) return;

    try {
      await deleteUsuario(id);
      await cargarUsuarios();
      alerta.exito('Usuario eliminado correctamente.');
    } catch (err) {
      alerta.error(err.message);
    }
  };

  const handleSubmit = async (data) => {
    if (editingUser) {
      await updateUsuario(editingUser.id, data);
      alerta.exito('Usuario actualizado correctamente.');
    } else {
      await createUsuario(data);
      alerta.exito('Usuario creado correctamente.');
    }
    setShowForm(false);
    setEditingUser(null);
    await cargarUsuarios();
  };

  const handleCancelar = () => {
    setShowForm(false);
    setEditingUser(null);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Gestión de Usuarios</h1>
        <p className="app-subtitulo">API CRUD — Examen Final Tecsup</p>
      </header>

      <main className="app-main">
        {showForm ? (
          <UserForm
            editingUser={editingUser}
            onSubmit={handleSubmit}
            onCancelar={handleCancelar}
          />
        ) : (
          <>
            <div className="barra-herramientas">
              <h2 className="conteo">
                {loading ? 'Cargando...' : `${usuarios.length} usuario(s) registrado(s)`}
              </h2>
              <button className="btn btn-primario" onClick={handleNuevo}>
                + Nuevo usuario
              </button>
            </div>
            <UserList
              usuarios={usuarios}
              loading={loading}
              onEditar={handleEditar}
              onEliminar={handleEliminar}
            />
          </>
        )}
      </main>
    </div>
  );
}

export default App;
