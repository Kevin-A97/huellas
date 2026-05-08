import { pill } from '../js/data.js';

// Renderiza la lista de servicios referidos
function renderReferredServices() {
  const container = document.getElementById('vetCards');
  if (!container) return;

  const referred = [
    { pet: "Bruno", service: "Cremación Individual", date: "12 Oct 2023", status: "Entregado" },
    { pet: "Luna", service: "Recolección Urgente", date: "14 Oct 2023", status: "En cremación" },
    { pet: "Max", service: "Cremación Comunitaria", date: "15 Oct 2023", status: "Pendiente" }
  ];

  container.innerHTML = referred.map(item => `
    <div class="grid gap-3 rounded-2xl border border-violet-100 p-4 md:grid-cols-[1fr_1.2fr_130px_120px] md:items-center">
      <div class="flex items-center gap-3">
        <div class="grid h-10 w-10 place-items-center rounded-full bg-soft font-extrabold text-brandDark">${item.pet.charAt(0)}</div>
        <strong>${item.pet}</strong>
      </div>
      <span class="text-sm text-muted">${item.service}</span>
      <span class="text-sm text-muted">${item.date}</span>
      ${pill(item.status)}
    </div>
  `).join('');
}

// Inicialización del módulo
export function initVeterinarias() {
  renderReferredServices();
}