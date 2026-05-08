import { services, pill, selectedServiceId } from '../js/data.js';

// Renderiza la tabla de servicios
function renderServicesTable() {
  const tbody = document.getElementById('servicesTable');
  if (!tbody) return;

  tbody.innerHTML = services.map(service => `
    <tr class="cursor-pointer hover:bg-soft" data-service-row="${service.id}">
      <td class="px-5 py-4 font-extrabold">${service.id}</td>
      <td class="px-5 py-4">${service.client}</td>
      <td class="px-5 py-4">${service.pet}</td>
      <td class="px-5 py-4">${service.type}</td>
      <td class="px-5 py-4">${pill(service.status)}</td>
      <td class="px-5 py-4">${service.delivery}</td>
      <td class="px-5 py-4">
        <button data-edit="${service.id}" class="rounded-xl border border-violet-100 px-3 py-2 text-xs font-bold">Editar</button>
      </td>
    </tr>
  `).join('');
}

// Configura el botón "Editar servicio seleccionado"
function setupEditButton() {
  const btn = document.getElementById('openEditFromModule');
  if (!btn) return;

  btn.addEventListener('click', () => {
    // Dispara un evento para que el módulo de modales abra el editor
    document.dispatchEvent(new CustomEvent('open-edit-modal', {
      detail: { id: window.__selectedServiceId || selectedServiceId }
    }));
  });
}

// Inicialización del módulo
export function initServicios() {
  renderServicesTable();
  setupEditButton();
}