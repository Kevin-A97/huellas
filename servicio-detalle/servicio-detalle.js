import { getService, steps, selectedServiceId } from '../js/data.js';
import { showView } from '../js/router.js';

// Renderiza la ficha de detalle según el servicio seleccionado
function renderServiceDetail() {
  const service = getService(window.__selectedServiceId || selectedServiceId);
  if (!service) return;

  // Título
  document.getElementById('detailTitle').textContent = `Servicio ${service.id}`;
  document.getElementById('detailClient').textContent = service.client;
  document.getElementById('detailPet').textContent = service.pet;
  document.getElementById('detailStatus').textContent = service.status;

  // Progreso
  const currentIndex = steps.indexOf(service.status);
  const progress = Math.max(20, Math.round(((currentIndex + 1) / steps.length) * 100));
  document.getElementById('detailProgressLabel').textContent = `${progress}%`;
  document.getElementById('detailProgressBar').style.width = `${progress}%`;

  // Timeline
  const timelineContainer = document.getElementById('detailTimeline');
  if (timelineContainer) {
    timelineContainer.innerHTML = steps.map((step, index) => {
      const done = currentIndex >= index;
      const current = currentIndex === index;
      return `
        <div class="flex gap-4 rounded-2xl ${current ? "bg-violet-50" : "bg-white"} p-4">
          <div class="grid h-9 w-9 shrink-0 place-items-center rounded-full ${done ? "bg-brand text-white" : "bg-soft text-muted"}">
            ${done ? "✓" : index + 1}
          </div>
          <div>
            <p class="font-extrabold">${step}</p>
            <p class="text-sm text-muted">
              ${current ? "Etapa actual del servicio" : done ? "Completado por el equipo" : "Pendiente"}
            </p>
          </div>
        </div>
      `;
    }).join('');
  }
}

// Configura los botones de acción
function setupButtons() {
  document.getElementById('detailEditBtn')?.addEventListener('click', () => {
    document.dispatchEvent(new CustomEvent('open-edit-modal', {
      detail: { id: window.__selectedServiceId || selectedServiceId }
    }));
  });

  document.getElementById('detailTrackingBtn')?.addEventListener('click', () => {
    showView('seguimiento');
  });

  document.getElementById('portalFromDetail')?.addEventListener('click', () => {
    showView('portalCliente');
  });
}

// Inicialización del módulo
export function initServicioDetalle() {
  renderServiceDetail();
  setupButtons();
}