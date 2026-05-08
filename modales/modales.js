import { getService, services, clients } from '../js/data.js';
import { showView } from '../js/router.js';

// Función para mostrar el toast
export function toast(message, duration = 2200) {
  const el = document.getElementById('toast');
  if (!el) return;
  el.textContent = message;
  el.classList.remove('hidden');
  el.classList.add('show');
  setTimeout(() => {
    el.classList.add('hidden');
    el.classList.remove('show');
  }, duration);
}

// Exponer toast globalmente para que otros módulos lo usen sin importar
window.toast = toast;

// Abrir modal
export function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
}

// Cerrar modal
export function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

// Precarga los datos del servicio en el modal de edición
function openEditModal(serviceId) {
  const service = getService(serviceId);
  if (!service) return;
  document.getElementById('editModalService').textContent = `${service.id} | ${service.pet}`;
  document.getElementById('editType').value = service.type;
  document.getElementById('editUrn').value = service.urn;
  document.getElementById('editStatus').value = service.status;
  document.getElementById('editNotes').value = service.notes || '';
  openModal('editModal');
}

// Configurar eventos de los modales
function setupModalEvents() {
  // Botones de cierre
  document.querySelectorAll('[data-close-modal]').forEach(btn => {
    btn.addEventListener('click', () => closeModal(btn.dataset.closeModal));
  });

  // Cerrar al hacer clic fuera del contenido (opcional, solo si se desea)
  document.getElementById('editModal')?.addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeModal('editModal');
  });
  document.getElementById('clientModal')?.addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeModal('clientModal');
  });

  // Guardar cambios en servicio
  document.getElementById('saveServiceBtn')?.addEventListener('click', () => {
    const currentId = window.__selectedServiceId;
    const service = getService(currentId);
    if (service) {
      service.type = document.getElementById('editType').value;
      service.urn = document.getElementById('editUrn').value;
      service.status = document.getElementById('editStatus').value;
      service.notes = document.getElementById('editNotes').value;
      closeModal('editModal');
      toast('Servicio actualizado correctamente');
      // Si estamos en la vista de detalle o servicios, refrescar
      if (document.getElementById('serviceDetail') && !document.getElementById('serviceDetail').classList.contains('hidden')) {
        showView('servicioDetalle');
      } else if (document.getElementById('servicios') && !document.getElementById('servicios').classList.contains('hidden')) {
        showView('servicios');
      } else if (document.getElementById('panel') && !document.getElementById('panel').classList.contains('hidden')) {
        showView('panel');
      }
    }
  });

  // Guardar nuevo cliente
  document.getElementById('saveClientBtn')?.addEventListener('click', () => {
    const name = document.getElementById('newClientName').value.trim() || 'Familia Nueva';
    const pet = document.getElementById('newClientPet').value.trim() || 'Mascota';
    const status = document.getElementById('newClientStatus').value;
    clients.unshift({ name, pet, status, contact: 'Sin contacto' });
    closeModal('clientModal');
    document.getElementById('newClientName').value = '';
    document.getElementById('newClientPet').value = '';
    toast('Cliente agregado al sistema');
    // Refrescar vista de clientes si está activa
    if (document.getElementById('clientes') && !document.getElementById('clientes').classList.contains('hidden')) {
      showView('clientes');
    }
  });

  // Escuchar evento global para abrir el modal de edición
  document.addEventListener('open-edit-modal', (e) => {
    openEditModal(e.detail.id);
  });

  // Escuchar evento para abrir modal de nuevo cliente
  document.addEventListener('open-client-modal', () => {
    openModal('clientModal');
  });
}

export async function initModals() {
  // Cargar el HTML de los modales e insertarlo en el body
  const response = await fetch('modales/modales.html');
  if (response.ok) {
    const html = await response.text();
    const container = document.createElement('div');
    container.innerHTML = html;
    document.body.appendChild(container);
  }
  setupModalEvents();
}