import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import { getUsuarios, createUsuario, updateUsuario, deleteUsuario } from './services/api';

// Configuración base de SweetAlert2 para toasts
const Toast = Swal.mixin({
  toast: true,
  position: 'bottom-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
});

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
      Toast.fire({ icon: 'error', title: 'No se pudo conectar con el servidor.' });
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
    const resultado = await Swal.fire({
      title: '¿Eliminar usuario?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e63946',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    });

    if (!resultado.isConfirmed) return;

    try {
      await deleteUsuario(id);
      await cargarUsuarios();
      Toast.fire({ icon: 'success', title: 'Usuario eliminado correctamente.' });
    } catch (err) {
      Toast.fire({ icon: 'error', title: err.message });
    }
  };

  const handleSubmit = async (data) => {
    if (editingUser) {
      await updateUsuario(editingUser.id, data);
      Toast.fire({ icon: 'success', title: 'Usuario actualizado correctamente.' });
    } else {
      await createUsuario(data);
      Toast.fire({ icon: 'success', title: 'Usuario creado correctamente.' });
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
