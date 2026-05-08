// Los checkboxes de notificaciones no requieren lógica compleja,
// pero podemos añadir interacción para mostrar retroalimentación.

function setupNotifications() {
  const checkboxes = document.querySelectorAll('#configuracion input[type="checkbox"]');
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      const label = checkbox.closest('label')?.textContent?.trim() || 'Opción';
      const state = checkbox.checked ? 'activada' : 'desactivada';
      window.toast?.(`${label}: ${state}`);
    });
  });
}

export function initConfiguracion() {
  setupNotifications();
}