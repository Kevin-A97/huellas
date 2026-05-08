import { getService, selectedServiceId, steps } from './data.js';

// Módulos que se cargarán dinámicamente (las funciones init se llamarán tras insertar el HTML)
const viewModules = {
  panel:        () => import('../panel/panel.js'),
  servicios:    () => import('../servicios/servicios.js'),
  clientes:     () => import('../clientes/clientes.js'),
  veterinarias: () => import('../veterinarias/veterinarias.js'),
  servicioDetalle: () => import('../servicio-detalle/servicio-detalle.js'),
  seguimiento:  () => import('../seguimiento/seguimiento.js'),
  portalCliente:() => import('../portal-cliente/portal-cliente.js'),
  pagos:        () => import('../pagos/pagos.js'),
  pendientes:   () => import('../pendientes/pendientes.js'),
  configuracion:() => import('../configuracion/configuracion.js')
};

// Títulos que se muestran en el header
const viewTitles = {
  panel: "Panel",
  servicios: "Servicios",
  clientes: "Clientes",
  veterinarias: "Veterinarias",
  servicioDetalle: "Detalle del servicio",
  seguimiento: "Seguimiento",
  portalCliente: "Portal cliente",
  pagos: "Pagos",
  pendientes: "Pendientes",
  configuracion: "Configuración"
};

// Variable para controlar la pestaña activa dentro de clientes (clients / vets)
export let activeCrmTab = "clients";

export function setActiveCrmTab(tab) {
  activeCrmTab = tab;
}

// Navegación principal
export async function showView(viewId, crmTab = null) {
  // Si se especifica una pestaña CRM, la guardamos
  if (crmTab) setActiveCrmTab(crmTab);

  // Cargar HTML del módulo
  const htmlPath = `${viewId}/${viewId}.html`;
  const response = await fetch(htmlPath);
  if (!response.ok) throw new Error(`No se pudo cargar ${htmlPath}`);
  const html = await response.text();
  document.getElementById('app-main').innerHTML = html;

  // Actualizar título
  document.getElementById('pageTitle').textContent = viewTitles[viewId] || "Huellas Memorables";

  // Importar e inicializar el módulo JS
  if (viewModules[viewId]) {
    const module = await viewModules[viewId]();
    const initFnName = `init${viewId.charAt(0).toUpperCase() + viewId.slice(1)}`;
    if (typeof module[initFnName] === 'function') {
      module[initFnName]();
    }
    // Si el módulo es cliente, pasar la pestaña activa
    if (viewId === 'clientes' && typeof module.initClientes === 'function') {
      module.initClientes(activeCrmTab);
    }
  }

  // Actualizar estilos del menú lateral
  document.querySelectorAll('.nav-btn').forEach(btn => {
    const btnView = btn.dataset.view;
    const btnCrmTab = btn.dataset.crmTab;
    let active = false;
    if (btnView === viewId) {
      if (viewId === 'clientes') {
        active = btnCrmTab === activeCrmTab || (!btnCrmTab && activeCrmTab === 'clients' && btn.dataset.crmTab === undefined);
      } else {
        active = true;
      }
    }
    if (active) {
      btn.classList.add('active', 'bg-white', 'text-ink');
      btn.classList.remove('text-muted');
    } else {
      btn.classList.remove('active', 'bg-white', 'text-ink');
      btn.classList.add('text-muted');
    }
  });
}