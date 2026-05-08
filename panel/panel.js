import { services, pill } from '../js/data.js';

// Renderiza la lista de servicios recientes en el panel
function renderRecentServices() {
  const container = document.getElementById('recentServices');
  if (!container) return;

  container.innerHTML = services.slice(0, 4).map(service => `
    <button data-service="${service.id}" class="service-open grid gap-2 rounded-2xl border border-violet-100 p-4 text-left transition hover:border-brand hover:bg-soft">
      <div class="flex items-center justify-between gap-3">
        <strong>${service.id} | ${service.pet}</strong>
        ${pill(service.status)}
      </div>
      <p class="text-sm text-muted">${service.client} - ${service.type}</p>
    </button>
  `).join('');
}

// Función de inicialización que se ejecuta después de cargar el HTML
export function initPanel() {
  renderRecentServices();
}