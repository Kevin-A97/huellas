import { getService, selectedServiceId } from '../js/data.js';

function renderPortal() {
  const currentId = window.__selectedServiceId || selectedServiceId;
  const service = getService(currentId);
  if (!service) return;

  // Introducción
  const introEl = document.getElementById('portalIntro');
  if (introEl) {
    introEl.textContent = `${service.type} para ${service.pet}.`;
  }

  // Estado actual
  const statusEl = document.getElementById('portalStatus');
  if (statusEl) {
    statusEl.textContent = service.status;
  }

  // Timeline simple (4 pasos fijos para el cliente)
  const timelineItems = [
    'Recibimos a tu mascota',
    'Servicio en proceso',
    'Preparación de recuerdo',
    'Entrega'
  ];
  const timelineContainer = document.getElementById('portalTimeline');
  if (timelineContainer) {
    timelineContainer.innerHTML = timelineItems.map((item, index) => {
      // Se asume que los pasos 0 y 1 están actualizados, el resto pendientes
      const done = index < 2;
      return `
        <div class="rounded-2xl bg-soft p-4">
          <p class="font-extrabold">${item}</p>
          <p class="text-sm text-muted">${done ? 'Actualizado por nuestro equipo' : 'Siguiente paso'}</p>
        </div>
      `;
    }).join('');
  }

  // Cadena de custodia (datos de ejemplo)
  const custodyData = [
    ['09:20', 'Recepción confirmada', 'Daniela Ruiz'],
    ['10:05', 'Identificación y registro', 'Paola Medina'],
    ['12:40', 'Ingreso a proceso', service.staff],
    ['14:15', 'Control de calidad', 'Camila Torres']
  ];
  const custodyContainer = document.getElementById('custodyList');
  if (custodyContainer) {
    custodyContainer.innerHTML = custodyData.map(([time, label, staff]) => `
      <div class="grid grid-cols-[72px_minmax(0,1fr)] gap-3 rounded-2xl border border-violet-100 p-4">
        <strong>${time}</strong>
        <div>
          <p class="font-extrabold">${label}</p>
          <p class="text-sm text-muted">${staff}</p>
        </div>
      </div>
    `).join('');
  }
}

export function initPortalCliente() {
  renderPortal();
}