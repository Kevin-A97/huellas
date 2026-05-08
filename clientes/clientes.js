import { clients, vets, services, pill, badgeClass } from '../js/data.js';

// Renderiza las tablas de clientes y veterinarias según la pestaña activa
function renderCrmTables() {
  // Tabla de clientes
  const clientsTbody = document.getElementById('crmClientsTable');
  if (clientsTbody) {
    clientsTbody.innerHTML = clients.map((client, index) => `
      <tr data-open-client-detail="${index}" class="cursor-pointer hover:bg-soft">
        <td class="px-6 py-5 font-extrabold">${client.name}</td>
        <td class="py-5">${client.pet}</td>
        <td class="py-5">${pill(client.status)}</td>
        <td class="py-5">${index === 0 ? "Servicio memorial completo" : index === 1 ? "Cremación individual" : "Plan preventivo"}</td>
        <td class="py-5 text-muted">${client.contact}</td>
      </tr>
    `).join('');
  }

  // Tabla de veterinarias
  const vetsTbody = document.getElementById('crmVetsTable');
  if (vetsTbody) {
    vetsTbody.innerHTML = vets.map(vet => `
      <tr data-open-vet-detail="${vet.name}" class="cursor-pointer hover:bg-soft">
        <td class="px-6 py-5 font-extrabold">${vet.name}</td>
        <td class="py-5">${vet.contact}</td>
        <td class="py-5 text-muted">${vet.location}</td>
        <td class="py-5 font-extrabold">${vet.sent}</td>
        <td class="py-5">${pill(vet.status)}</td>
      </tr>
    `).join('');
  }
}

// Rellena el historial de servicios en la ficha de detalle
function renderClientHistory() {
  const tbody = document.getElementById('clientsTable');
  if (!tbody) return;
  const history = [
    { id: "#HM-9821", pet: "Max", type: "Servicio Funerario (Completo)", date: "Oct 24, 2023", status: "Entregado" },
    { id: "#HM-7740", pet: "Luna", type: "Cremación Ecológica", date: "May 12, 2022", status: "Archivado" }
  ];
  tbody.innerHTML = history.map(item => `
    <tr>
      <td class="px-6 py-6 text-lg font-extrabold text-brandDark">${item.id}</td>
      <td class="py-6 font-bold">${item.pet}</td>
      <td class="py-6 text-lg">${item.type}</td>
      <td class="py-6 text-lg text-muted">${item.date}</td>
      <td class="py-6">${pill(item.status)}</td>
    </tr>
  `).join('');
}

// Muestra las mascotas en la ficha de detalle
function renderClientPets() {
  const container = document.getElementById('clientDetailPets');
  if (!container) return;
  container.innerHTML = [
    { name: "Max", species: "DOG", breed: "Golden Retriever", note: "He loves water and balls.", emoji: "🐕" },
    { name: "Luna", species: "CAT", breed: "Siamese", note: "Very calm, likes heights.", emoji: "🐈" }
  ].map(pet => `
    <article class="flex gap-5 rounded-2xl border border-[#dedbea] bg-white p-5 shadow-card">
      <div class="grid h-28 w-28 place-items-center rounded-3xl bg-[#151923] text-4xl">${pet.emoji}</div>
      <div>
        <h4 class="text-2xl font-extrabold">
          ${pet.name}
          <span class="rounded-full bg-violet-100 px-3 py-1 text-xs text-brandDark">${pet.species}</span>
        </h4>
        <p class="text-muted">${pet.breed}</p>
        <p class="mt-2 text-sm italic text-muted">"${pet.note}"</p>
      </div>
    </article>
  `).join('');
}

// Cambia entre las pestañas Clientes / Veterinarias
function setTab(tab) {
  const clientList = document.getElementById('crmClientList');
  const vetList = document.getElementById('crmVetList');
  const tabs = document.querySelectorAll('[data-crm-tab-btn]');
  const backBtn = document.querySelector('[data-back-crm]');

  if (tab === 'clients') {
    clientList?.classList.remove('hidden');
    vetList?.classList.add('hidden');
  } else {
    clientList?.classList.add('hidden');
    vetList?.classList.remove('hidden');
  }

  tabs.forEach(btn => {
    const isActive = btn.dataset.crmTabBtn === tab;
    btn.classList.toggle('bg-white', isActive);
    btn.classList.toggle('border', isActive);
    btn.classList.toggle('border-brand', isActive);
    btn.classList.toggle('text-brandDark', isActive);
    btn.classList.toggle('bg-[#f8f7fb]', !isActive);
    btn.classList.toggle('text-muted', !isActive);
  });

  // Asegura que el detalle esté oculto
  document.getElementById('clientDetail')?.classList.add('hidden');
  document.getElementById('crmLists')?.classList.remove('hidden');
}

// Abre la ficha de un cliente (datos estáticos de ejemplo)
function openClientDetail(index) {
  const client = clients[index];
  if (!client) return;
  document.getElementById('crmLists').classList.add('hidden');
  document.getElementById('clientDetail').classList.remove('hidden');
  // Rellenar datos básicos (simulación)
  document.getElementById('detailClientName').textContent = client.name.replace('Familia ', '');
  document.getElementById('detailClientLevel').textContent = index === 0 ? 'Miembro Platino desde 2022' : 'Miembro Oro desde 2023';
  document.getElementById('detailClientEmail').textContent = `${client.name.toLowerCase().replace(/\s+/g, '.')}@email.com`;
  document.getElementById('detailClientPhone').textContent = client.contact;
  document.getElementById('detailClientPets').textContent = index === 0 ? '2' : '1';
  document.getElementById('detailClientServices').textContent = index === 0 ? '3' : '2';
  document.getElementById('detailClientReliability').textContent = index === 0 ? '100%' : '95%';
  document.getElementById('detailClientReliabilityBar').style.width = index === 0 ? '100%' : '95%';
  renderClientPets();
  renderClientHistory();
}

// Configuración de eventos delegados para el módulo
function setupEvents() {
  // Cambio de pestaña
  document.querySelectorAll('[data-crm-tab-btn]').forEach(btn => {
    btn.addEventListener('click', () => setTab(btn.dataset.crmTabBtn));
  });

  // Clic en fila de cliente -> ver detalle
  document.getElementById('crmClientsTable')?.addEventListener('click', (e) => {
    const row = e.target.closest('[data-open-client-detail]');
    if (row) openClientDetail(Number(row.dataset.openClientDetail));
  });

  // Clic en fila de veterinaria -> podría navegar a módulo veterinarias (opcional)
  document.getElementById('crmVetsTable')?.addEventListener('click', (e) => {
    const row = e.target.closest('[data-open-vet-detail]');
    if (row) {
      // Por ahora solo muestra un toast, luego se puede enlazar con módulo veterinarias
      window.toast?.(`Veterinaria seleccionada: ${row.dataset.openVetDetail}`);
    }
  });

  // Botón volver atrás desde detalle
  document.querySelector('[data-back-crm]')?.addEventListener('click', () => {
    document.getElementById('clientDetail').classList.add('hidden');
    document.getElementById('crmLists').classList.remove('hidden');
  });

  // Botón "Editar perfil" (placeholder)
  document.querySelector('#clientes .rounded-xl.border.border-\\[\\#a49ab8\\]')?.addEventListener('click', () => {
    window.toast?.('Funcionalidad de editar perfil en desarrollo');
  });

  // Botón "+ Nuevo cliente" y "+ Nueva veterinaria" (placeholder)
  document.querySelectorAll('#clientes button').forEach(btn => {
    if (btn.textContent.includes('Nuevo cliente') || btn.textContent.includes('Nueva veterinaria')) {
      btn.addEventListener('click', () => {
        window.toast?.('Formulario de creación próximamente');
      });
    }
  });

  // Botón "+ Nuevo servicio" del encabezado CRM
  document.getElementById('openClientModal')?.addEventListener('click', () => {
    // Dispara la apertura del modal de nuevo cliente (modulo modales)
    document.dispatchEvent(new CustomEvent('open-client-modal'));
  });
}

// Inicialización del módulo (recibe la pestaña activa)
export function initClientes(tab = 'clients') {
  renderCrmTables();
  setTab(tab);
  setupEvents();
  // Si se abre desde otra vista, aseguramos que se muestre la lista y no el detalle
  document.getElementById('clientDetail')?.classList.add('hidden');
  document.getElementById('crmLists')?.classList.remove('hidden');
}