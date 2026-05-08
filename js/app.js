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

  setupMobileSidebar();
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

function setupMobileSidebar() {
  const sidebar = document.getElementById("sidebar");
  const menuBtn = document.getElementById("menuBtn");
  const overlay = document.getElementById("sidebarOverlay");

  if (!sidebar || !menuBtn || !overlay) {
    console.error("Elementos del sidebar no encontrados");
    return;
  }

  // Forzar estilos iniciales (sin depender de clases CSS)
  sidebar.style.transition = "transform 0.3s ease-in-out";
  sidebar.style.transform = "translateX(-100%)"; // Oculta al inicio en móvil
  sidebar.style.position = "fixed";
  sidebar.style.zIndex = "60";

  function openSidebar() {
    sidebar.style.transform = "translateX(0)";
    overlay.classList.remove("hidden");
    document.body.style.overflow = "hidden"; // evita scroll detrás
    console.log("Sidebar abierto");
  }

  function closeSidebar() {
    sidebar.style.transform = "translateX(-100%)";
    overlay.classList.add("hidden");
    document.body.style.overflow = "";
    console.log("Sidebar cerrado");
  }

  // Evento del botón hamburguesa
  menuBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = sidebar.style.transform === "translateX(0)";
    if (isOpen) {
      closeSidebar();
    } else {
      openSidebar();
    }
  });

  // Cerrar al hacer clic en el overlay
  overlay.addEventListener("click", closeSidebar);

  // Cerrar automáticamente al hacer clic en un ítem del menú (en móvil)
  document.querySelectorAll("#sidebarNav .nav-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      if (window.innerWidth < 1024) {
        closeSidebar();
      }
    });
  });

  // Cuando la ventana se redimensione a más de 1024px, mostrar el sidebar fijo
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 1024) {
      sidebar.style.transform = "translateX(0)";
      overlay.classList.add("hidden");
      document.body.style.overflow = "";
    } else {
      // En móvil, si no está abierto manualmente, lo dejamos cerrado
      if (sidebar.style.transform !== "translateX(0)") {
        sidebar.style.transform = "translateX(-100%)";
      }
    }
  });

  // Ejecutar al inicio para ajustar según el ancho actual
  if (window.innerWidth >= 1024) {
    sidebar.style.transform = "translateX(0)";
  } else {
    sidebar.style.transform = "translateX(-100%)";
  }
}

// Iniciar aplicación
init().catch(err => console.error('Error al iniciar la app:', err));