// Datos de ejemplo para la aplicación
export const services = [
  {
    id: "HM-1048",
    client: "Familia Andrade",
    pet: "Luna",
    type: "Cremación Individual",
    urn: "Cedro clara",
    status: "En cremación",
    eta: "1h 20m",
    staff: "Marco Silva",
    delivery: "Hoy 5:30 pm",
    notes: "Familia solicita certificado impreso."
  },
  {
    id: "HM-1047",
    client: "Familia Rosales",
    pet: "Milo",
    type: "Cremación Individual",
    urn: "Blanca mármol",
    status: "Listo",
    eta: "Entrega 2:00 pm",
    staff: "Daniela Ruiz",
    delivery: "Hoy 2:00 pm",
    notes: "Incluir recuerdo con huella."
  },
  {
    id: "HM-1046",
    client: "Familia Vera",
    pet: "Nala",
    type: "Plan Preventivo Exequial",
    urn: "No aplica",
    status: "Recibido",
    eta: "3h 10m",
    staff: "Paola Medina",
    delivery: "Mañana",
    notes: "Validar autorización final."
  },
  {
    id: "HM-1045",
    client: "Familia Molina",
    pet: "Toby",
    type: "Cremación Individual",
    urn: "Nogal oscuro",
    status: "Recolección",
    eta: "45m",
    staff: "Sofia Perez",
    delivery: "Jueves",
    notes: "Retiro en veterinaria aliada."
  }
];

export const clients = [
  { name: "Familia Andrade", pet: "Luna", status: "Activo", contact: "+593 99 245 8801" },
  { name: "Familia Rosales", pet: "Milo", status: "Entrega", contact: "+593 98 112 3040" },
  { name: "Familia Vera", pet: "Nala", status: "Documentación", contact: "+593 97 430 1600" }
];

export const vets = [
  { name: "Vida Animal Norte", contact: "Dra. Elena Ortiz", location: "Quito Norte", sent: 24, status: "Activa" },
  { name: "PetCare Centro", contact: "Dr. Mateo Rios", location: "Centro", sent: 18, status: "Convenio" },
  { name: "Huellitas Sur", contact: "Lcda. Sara Paz", location: "Sur", sent: 9, status: "Activa" },
  { name: "Clinica San Pablo", contact: "Dr. Hugo Leon", location: "Cumbaya", sent: 3, status: "Inactiva" }
];

export const tasks = [
  { description: "Confirmar datos de urna con Familia Vera", service: "HM-1046", priority: "Alta", status: "Pendiente" },
  { description: "Emitir certificado de Milo", service: "HM-1047", priority: "Media", status: "Pendiente" },
  { description: "Enviar enlace de portal a Familia Andrade", service: "HM-1048", priority: "Alta", status: "Pendiente" },
  { description: "Coordinar retiro en Vida Animal Norte", service: "HM-1045", priority: "Baja", status: "Pendiente" }
];

export const steps = ["Recolección", "Recibido", "En cremación", "Listo", "Entregado"];

// Servicio seleccionado actualmente
export let selectedServiceId = "HM-1048";

// Función helper para obtener el servicio actual
export function getService(id = selectedServiceId) {
  return services.find(s => s.id === id) || services[0];
}

// Mapa de clases para badges de estado
export function badgeClass(status) {
  const map = {
    "Recolección": "bg-blue-100 text-blue-700",
    "Recibido": "bg-sky-100 text-sky-700",
    "En cremación": "bg-violet-100 text-violet-700",
    "Listo": "bg-emerald-100 text-emerald-700",
    "Entregado": "bg-emerald-100 text-emerald-700",
    "Activo": "bg-violet-100 text-violet-700",
    "Entrega": "bg-emerald-100 text-emerald-700",
    "Documentación": "bg-amber-100 text-amber-700",
    "Pendiente": "bg-amber-100 text-amber-700",
    "Pagado": "bg-emerald-100 text-emerald-700",
    "Archivado": "bg-slate-100 text-slate-500",
    "Alta": "bg-red-100 text-red-700",
    "Media": "bg-amber-100 text-amber-700",
    "Baja": "bg-slate-100 text-slate-700",
    "Activa": "bg-emerald-100 text-emerald-700",
    "Convenio": "bg-violet-100 text-violet-700",
    "Inactiva": "bg-slate-100 text-slate-600"
  };
  return map[status] || "bg-slate-100 text-slate-700";
}

// Genera un span con estilo de "pill" según el estado
export function pill(text) {
  return `<span class="inline-flex rounded-full px-3 py-1 text-xs font-extrabold ${badgeClass(text)}">${text}</span>`;
}