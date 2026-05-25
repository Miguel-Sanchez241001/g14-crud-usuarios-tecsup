import Swal from 'sweetalert2';

const Toast = Swal.mixin({
  toast: true,
  position: 'center',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
});

const alerta = {
  exito: (texto) => Toast.fire({ icon: 'success', title: texto }),
  error: (texto) => Toast.fire({ icon: 'error',   title: texto }),
  aviso: (texto) => Toast.fire({ icon: 'warning', title: texto }),

  confirmarEliminar: () =>
    Swal.fire({
      title: '¿Eliminar usuario?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e63946',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }),
};

export default alerta;
