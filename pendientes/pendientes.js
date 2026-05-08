import { tasks, pill } from '../js/data.js';

let currentFilter = 'todas'; // 'todas', 'pendientes', 'completadas'

// Renderiza las tareas según el filtro activo
function renderTasks() {
  const container = document.getElementById('tasksList');
  if (!container) return;

  // Filtrar según estado
  const filtered = tasks.filter(task => {
    if (currentFilter === 'todas') return true;
    if (currentFilter === 'pendientes') return task.status === 'Pendiente';
    if (currentFilter === 'completadas') return task.status === 'Completado';
    return true;
  });

  container.innerHTML = filtered.map((task, index) => {
    // Buscar el índice real en el array original para la acción de completar
    const realIndex = tasks.indexOf(task);
    const priorityClass = task.priority === 'Alta' ? 'border-red-100' : task.priority === 'Media' ? 'border-amber-100' : 'border-blue-100';
    const statusColor = task.status === 'Completado' ? 'text-emerald-700' : 'text-red-600';
    const buttonDisabled = task.status === 'Completado' ? 'disabled' : '';
    const buttonClass = task.status === 'Completado' 
      ? 'bg-emerald-50 text-emerald-700 opacity-80 cursor-not-allowed' 
      : 'bg-brand text-white shadow-soft hover:bg-brandDark';

    // Descripciones extendidas de ejemplo
    const descriptions = [
      "El cliente solicitó retiro a domicilio a las 18:00 pero no ha confirmado la dirección exacta ni el contacto de recepción.",
      "Se requiere tomar la fotografía protocolar del altar conmemorativo antes de proceder con el empaque final.",
      "Se envió el catálogo de urnas premium por WhatsApp. Hacer seguimiento si no hay respuesta al finalizar el turno.",
      "Inventario semanal de mortajas biodegradables y kits de huellas conmemorativas finalizado."
    ];

    return `
      <article class="grid gap-6 rounded-3xl border ${priorityClass} bg-white p-7 shadow-card xl:grid-cols-[1fr_360px] xl:items-center">
        <div>
          <div class="flex flex-wrap items-center gap-4 text-sm">
            ${pill(task.priority)}
            <span class="font-bold text-muted"># ${task.service}</span>
            <span class="ml-auto text-muted">Hace ${realIndex + 2} horas</span>
          </div>
          <h3 class="mt-5 text-2xl font-extrabold ${task.status === 'Completado' ? 'line-through text-muted' : ''}">${task.description}</h3>
          <p class="mt-3 max-w-3xl text-lg leading-8 text-muted">${descriptions[realIndex] || ''}</p>
          <p class="mt-4 text-sm font-extrabold ${statusColor}">${task.status}</p>
        </div>
        <button data-complete="${realIndex}" class="rounded-xl px-5 py-4 text-lg font-extrabold ${buttonClass}" ${buttonDisabled}>
          ${task.status === 'Completado' ? 'Finalizado' : 'Marcar como completado'}
        </button>
      </article>
    `;
  }).join('');

  // Adjuntar eventos a los botones de completar
  container.querySelectorAll('[data-complete]').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.dataset.complete, 10);
      if (tasks[idx]) {
        tasks[idx].status = 'Completado';
        renderTasks();
        window.toast?.('Pendiente marcado como completado');
      }
    });
  });
}

// Configura los botones de filtro
function setupFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      currentFilter = btn.dataset.filter;
      // Actualizar estilos
      filterBtns.forEach(b => {
        b.classList.remove('bg-white', 'text-brandDark', 'border', 'border-brand');
        b.classList.add('bg-[#f8f7fb]', 'text-muted');
      });
      btn.classList.add('bg-white', 'text-brandDark', 'border', 'border-brand');
      btn.classList.remove('bg-[#f8f7fb]', 'text-muted');
      renderTasks();
    });
  });
}

// Botón "Nueva tarea"
function setupNewTaskButton() {
  document.getElementById('newTaskBtn')?.addEventListener('click', () => {
    window.toast?.('Formulario de nueva tarea próximamente');
  });
}

export function initPendientes() {
  renderTasks();
  setupFilters();
  setupNewTaskButton();
}