function UserList({ usuarios, loading, onEditar, onEliminar }) {
  if (loading) {
    return <div className="estado-carga">Cargando usuarios...</div>;
  }

  if (usuarios.length === 0) {
    return (
      <div className="estado-vacio">
        <p>No hay usuarios registrados. Crea el primero.</p>
      </div>
    );
  }

  return (
    <div className="tabla-wrapper">
      <table className="tabla">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Contraseña</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.nombre}</td>
              <td>{u.apellido}</td>
              <td>{u.email}</td>
              <td>{u.telefono || '—'}</td>
              <td className="celda-contrasena">••••••</td>
              <td>
                <span className={`badge ${u.activo ? 'badge-activo' : 'badge-inactivo'}`}>
                  {u.activo ? 'Activo' : 'Inactivo'}
                </span>
              </td>
              <td className="celda-acciones">
                <button className="btn btn-editar" onClick={() => onEditar(u)}>
                  Editar
                </button>
                <button className="btn btn-eliminar" onClick={() => onEliminar(u.id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;
