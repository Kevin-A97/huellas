import { services, pill } from '../js/data.js';

// Renderiza la lista de transacciones a partir de los servicios
function renderPayments() {
  const container = document.getElementById('paymentsList');
  if (!container) return;

  const amounts = [450, 820, 290, 180];
  const methods = ["Transferencia Bancaria", "Tarjeta de Crédito", "Efectivo", "Transferencia"];

  container.innerHTML = services.map((service, index) => {
    const amount = amounts[index] || 0;
    const method = methods[index] || "Transferencia";
    const status = index === 0 ? "Pendiente" : "Pagado";
    const initials = service.client.replace("Familia ", "").charAt(0);

    return `
      <div class="grid gap-4 border-t border-violet-100 p-6 md:grid-cols-[120px_1fr_120px_150px_120px] md:items-center">
        <p class="font-extrabold text-brandDark">#HM-2024-${882 - index}</p>
        <div class="flex items-center gap-4">
          <span class="grid h-11 w-11 place-items-center rounded-full bg-violet-100 text-sm font-extrabold text-brandDark">${initials}</span>
          <div>
            <p class="font-extrabold">${service.client.replace("Familia ", "")}</p>
            <p class="text-xs text-muted">${service.client.toLowerCase().replace(/\s+/g, ".")}@email.com</p>
          </div>
        </div>
        <p class="font-extrabold">$${amount}.00</p>
        <p class="text-muted">${method}</p>
        ${pill(status)}
      </div>
    `;
  }).join('');
}

// Configura botones del panel de detalle y encabezado
function setupPaymentActions() {
  // Usamos querySelectorAll y buscamos por texto (alternativa nativa a :contains)
  const allButtons = document.querySelectorAll('#pagos button');
  
  allButtons.forEach(btn => {
    const text = btn.textContent || '';

    if (text.includes('Marcar como Pagado')) {
      btn.addEventListener('click', () => window.toast?.('Pago marcado como completado'));
    }
    if (text.includes('Rechazar Pago')) {
      btn.addEventListener('click', () => window.toast?.('Pago rechazado'));
    }
    if (text.includes('Exportar CSV')) {
      btn.addEventListener('click', () => window.toast?.('Exportando CSV...'));
    }
    if (text.includes('Nuevo Pago')) {
      btn.addEventListener('click', () => window.toast?.('Formulario de nuevo pago próximamente'));
    }
  });
}

export function initPagos() {
  renderPayments();
  setupPaymentActions();
}