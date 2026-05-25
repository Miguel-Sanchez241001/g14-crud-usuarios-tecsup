import { useState, useEffect } from 'react';
import alerta from '../utils/alerta';

const FORM_VACIO = {
  nombre: '',
  apellido: '',
  email: '',
  contrasena: '',
  telefono: '',
  activo: true,
};

// Reglas: mín 8 chars, al menos 1 mayúscula, 1 minúscula, 1 dígito
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
// Teléfono peruano: 9 dígitos comenzando con 9
const TELEFONO_PERU_REGEX = /^9\d{8}$/;

function validar(form) {
  if (!form.nombre.trim())   return 'El nombre es obligatorio.';
  if (!form.apellido.trim()) return 'El apellido es obligatorio.';
  if (!form.email.trim())    return 'El email es obligatorio.';
  if (!/\S+@\S+\.\S+/.test(form.email)) return 'El email no tiene un formato válido.';
  if (!form.contrasena.trim()) return 'La contraseña es obligatoria.';
  if (!PASSWORD_REGEX.test(form.contrasena))
    return 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número.';
  if (form.telefono.trim() && !TELEFONO_PERU_REGEX.test(form.telefono.trim()))
    return 'El teléfono debe ser un número peruano válido (9 dígitos, empieza con 9).';
  return null;
}

function UserForm({ editingUser, onSubmit, onCancelar }) {
  const [form, setForm] = useState(FORM_VACIO);
  const [camposError, setCamposError] = useState({});
  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    setForm(
      editingUser
        ? {
            nombre:    editingUser.nombre,
            apellido:  editingUser.apellido,
            email:     editingUser.email,
            contrasena: editingUser.contrasena,
            telefono:  editingUser.telefono || '',
            activo:    editingUser.activo,
          }
        : FORM_VACIO
    );
    setCamposError({});
  }, [editingUser]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    // Limpiar el error del campo al escribir
    if (camposError[name]) setCamposError((prev) => ({ ...prev, [name]: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const mensajeError = validar(form);
    if (mensajeError) {
      // Marcar campo problemático
      const camposMarcados = {};
      if (mensajeError.includes('nombre'))     camposMarcados.nombre = true;
      if (mensajeError.includes('apellido'))   camposMarcados.apellido = true;
      if (mensajeError.includes('email'))      camposMarcados.email = true;
      if (mensajeError.includes('contraseña')) camposMarcados.contrasena = true;
      if (mensajeError.includes('teléfono'))   camposMarcados.telefono = true;
      setCamposError(camposMarcados);
      alerta.aviso(mensajeError);
      return;
    }

    setCamposError({});
    setGuardando(true);
    try {
      await onSubmit(form);
    } catch (err) {
      alerta.error(err.message);
    } finally {
      setGuardando(false);
    }
  };

  const campo = (name) => ({
    name,
    value: form[name],
    onChange: handleChange,
    className: camposError[name] ? 'input-error' : undefined,
  });

  return (
    <div className="form-contenedor">
      <h2 className="form-titulo">
        {editingUser ? `Editar usuario #${editingUser.id}` : 'Nuevo usuario'}
      </h2>

      <form onSubmit={handleSubmit} className="form" noValidate>
        <div className="form-fila">
          <div className="form-grupo">
            <label htmlFor="nombre">Nombre *</label>
            <input id="nombre" type="text" placeholder="Ej: Juan" {...campo('nombre')} />
          </div>
          <div className="form-grupo">
            <label htmlFor="apellido">Apellido *</label>
            <input id="apellido" type="text" placeholder="Ej: Pérez" {...campo('apellido')} />
          </div>
        </div>

        <div className="form-grupo">
          <label htmlFor="email">Email *</label>
          <input id="email" type="email" placeholder="Ej: juan.perez@gmail.com" {...campo('email')} />
        </div>

        <div className="form-grupo">
          <label htmlFor="contrasena">
            Contraseña *
            <span className="label-hint"> (8+ chars, mayúscula, minúscula, número)</span>
          </label>
          <input id="contrasena" type="password" placeholder="Ej: Clave123" {...campo('contrasena')} />
        </div>

        <div className="form-grupo">
          <label htmlFor="telefono">
            Teléfono
            <span className="label-hint"> (opcional — número peruano, ej: 987654321)</span>
          </label>
          <input id="telefono" type="tel" placeholder="Ej: 987654321" {...campo('telefono')} />
        </div>

        <div className="form-grupo form-grupo-checkbox">
          <label>
            <input
              name="activo"
              type="checkbox"
              checked={form.activo}
              onChange={handleChange}
            />
            Usuario activo
          </label>
        </div>

        <div className="form-acciones">
          <button type="button" className="btn btn-secundario" onClick={onCancelar} disabled={guardando}>
            Cancelar
          </button>
          <button type="submit" className="btn btn-primario" disabled={guardando}>
            {guardando ? 'Guardando...' : editingUser ? 'Actualizar' : 'Crear usuario'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserForm;
