import { showView } from './router.js';
import { services, getService, selectedServiceId } from './data.js';
import { openModal, closeModal, initModals } from '../modales/modales.js';

// Al cargar la página: insertar modales en el DOM y mostrar panel
async function init() {
  // Cargar HTML de modales e inicializar sus listeners
  await initModals();
  
  // Vista inicial
  await showView('panel');

  // Delegación de eventos globales
  setupGlobalEvents();
}

function setupGlobalEvents() {
  // Clic en navegación lateral
  document.getElementById('sidebarNav').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-view]');
    if (!btn) return;
    const view = btn.dataset.view;
    const crmTab = btn.dataset.crmTab;
    showView(view, crmTab || undefined);
  });

  // Clic en botones que cambian de vista (dentro del main)
  document.getElementById('app-main').addEventListener('click', (e) => {
    const goBtn = e.target.closest('.go-view');
    if (goBtn) {
      const targetView = goBtn.dataset.viewTarget;
      if (targetView) showView(targetView);
    }

    // Abrir detalle de servicio desde cualquier lugar
    const serviceOpen = e.target.closest('.service-open');
    if (serviceOpen) {
      const id = serviceOpen.dataset.service;
      // selectedServiceId se actualiza en data, pero necesitamos una forma de hacerlo mutable
      window.selectedServiceId = id; // usaremos un setter simple
      showView('servicioDetalle');
    }

    // Abrir modal de edición
    const editBtn = e.target.closest('[data-edit]');
    if (editBtn) {
      const id = editBtn.dataset.edit;
      window.selectedServiceId = id;
      // Disparar apertura de modal de edición desde modales
      document.dispatchEvent(new CustomEvent('open-edit-modal', { detail: { id } }));
    }
  });

  // Búsqueda global
  document.getElementById('globalSearch').addEventListener('input', (e) => {
    const value = e.target.value.trim().toLowerCase();
    if (!value) return;
    const match = services.find(s => 
      `${s.id} ${s.client} ${s.pet}`.toLowerCase().includes(value)
    );
    if (match) {
      window.selectedServiceId = match.id;
      showView('servicioDetalle');
    }
  });

  // Notificaciones
  document.getElementById('notificationBtn').addEventListener('click', () => {
    document.getElementById('notificationDot').textContent = '0';
    window.toast?.('Notificaciones revisadas');
  });
}

// Hacer accesible globalmente selectedServiceId (para simplificar)
Object.defineProperty(window, 'selectedServiceId', {
  get() { return selectedServiceId; },
  set(val) { window.__selectedServiceId = val; } // necesitamos un setter real
});
// Parche: Como selectedServiceId se exporta como variable, para escribirla desde fuera usaremos un helper
import { getService as getSv } from './data.js';
window.getService = (id) => getSv(id || window.__selectedServiceId);

// Iniciar aplicación
init().catch(err => console.error('Error al iniciar la app:', err));