import { getService, steps, selectedServiceId } from '../js/data.js';

function renderTracking() {
  // Obtiene el ID actual desde la variable global o la exportada
  const currentId = window.__selectedServiceId || selectedServiceId;
  const service = getService(currentId);
  if (!service) return;

  // Datos principales
  document.getElementById('trackingService').textContent = `${service.id} | ${service.pet}`;
  document.getElementById('trackingEta').textContent = service.eta;
  document.getElementById('trackingStaff').textContent = service.staff;

  // Stepper con los pasos
  const currentIndex = steps.indexOf(service.status);
  const stepper = document.getElementById('trackingStepper');
  if (!stepper) return;

  stepper.innerHTML = steps.map((step, index) => {
    const isDone = currentIndex >= index;
    const isCurrent = currentIndex === index;
    return `
      <div class="rounded-2xl border ${isCurrent ? 'border-brand bg-violet-50' : 'border-violet-100 bg-white'} p-4 text-center">
        <div class="mx-auto grid h-12 w-12 place-items-center rounded-full ${isDone ? 'bg-brand text-white' : 'bg-soft text-muted'}">
          ${isDone ? '✓' : index + 1}
        </div>
        <p class="mt-3 font-extrabold">${step}</p>
        <p class="mt-1 text-xs text-muted">${isCurrent ? 'Actual' : isDone ? 'Completado' : 'Pendiente'}</p>
      </div>
    `;
  }).join('');
}

export function initSeguimiento() {
  renderTracking();
}