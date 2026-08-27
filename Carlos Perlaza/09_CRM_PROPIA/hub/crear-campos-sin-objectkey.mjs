#!/usr/bin/env node
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const locationId = process.env.GHL_LOCATION_ID;
const pitToken = process.env.GHL_PIT_TOKEN;
const parentId = 'tGExRU0UDHiqYAG9YeYE';

const headers = {
  'Authorization': `Bearer ${pitToken}`,
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Version': '2021-07-28'
};

const campos = [
  // OPORTUNIDADES (31)
  { name: 'Valor Restante a Pagar', model: 'opportunity', dataType: 'NUMERICAL', description: 'Saldo pendiente de pago' },
  { name: 'Valor Fechado', model: 'opportunity', dataType: 'NUMERICAL', description: 'Valor total cerrado' },
  { name: 'Valor do Lead', model: 'opportunity', dataType: 'NUMERICAL', description: 'Valor inicial' },
  { name: 'Fecha Esperada de Cierre', model: 'opportunity', dataType: 'DATE', description: 'Fecha estimada de cierre' },
  { name: 'Fecha de Pago', model: 'opportunity', dataType: 'DATE', description: 'Fecha del pago' },
  { name: 'Fecha Fin del Programa', model: 'opportunity', dataType: 'DATE', description: 'Fecha de fin' },
  { name: 'Fecha Inicio del Programa', model: 'opportunity', dataType: 'DATE', description: 'Fecha de inicio' },
  { name: 'Período Esperado de Tratamiento', model: 'opportunity', dataType: 'DATE', description: 'Período' },
  { name: 'Fecha de Agendamiento', model: 'opportunity', dataType: 'DATE', description: 'Agendamiento' },
  { name: 'Origen', model: 'opportunity', dataType: 'SINGLE_OPTIONS', description: 'Origen', options: ['Meta Ads', 'Google', 'Referencia'] },
  { name: 'Fuente de la Oportunidad', model: 'opportunity', dataType: 'TEXT', description: 'Fuente' },
  { name: 'Source Type', model: 'opportunity', dataType: 'SINGLE_OPTIONS', description: 'Tipo', options: ['Anuncio', 'Email'] },
  { name: 'Source Ads', model: 'opportunity', dataType: 'SINGLE_OPTIONS', description: 'Plataforma', options: ['Facebook', 'Instagram'] },
  { name: 'UTM Campaign', model: 'opportunity', dataType: 'TEXT', description: 'Campaña' },
  { name: 'UTM Medium', model: 'opportunity', dataType: 'TEXT', description: 'Medio' },
  { name: 'UTM Source', model: 'opportunity', dataType: 'TEXT', description: 'Fuente' },
  { name: 'Productos Adquiridos', model: 'opportunity', dataType: 'MULTIPLE_OPTIONS', description: 'Productos', options: ['Consulta', 'Aparatología'] },
  { name: 'Programa Vendido', model: 'opportunity', dataType: 'SINGLE_OPTIONS', description: 'Programa', options: ['Única', 'Paquete 4'] },
  { name: 'Renovación', model: 'opportunity', dataType: 'MULTIPLE_OPTIONS', description: 'Renovación', options: ['Mensual', 'Anual'] },
  { name: 'Forma de Pago', model: 'opportunity', dataType: 'SINGLE_OPTIONS', description: 'Forma', options: ['Stripe', 'Transferencia'] },
  { name: 'Plataforma Checkout', model: 'opportunity', dataType: 'SINGLE_OPTIONS', description: 'Plataforma', options: ['Stripe', 'GHL'] },
  { name: 'Día de la Semana de la Consulta', model: 'opportunity', dataType: 'SINGLE_OPTIONS', description: 'Día', options: ['Lunes', 'Viernes'] },
  { name: 'Hora de la Consulta', model: 'opportunity', dataType: 'TEXT', description: 'Hora' },
  { name: 'Número de la Consulta', model: 'opportunity', dataType: 'MULTIPLE_OPTIONS', description: 'Número', options: ['1', '2'] },
  { name: 'Canal de la Consulta', model: 'opportunity', dataType: 'SINGLE_OPTIONS', description: 'Canal', options: ['Presencial', 'Telemedicina'] },
  { name: 'Día para Envío del Checkin', model: 'opportunity', dataType: 'SINGLE_OPTIONS', description: 'Checkin', options: ['1 día', '1 semana'] },
  { name: 'Vendedor Responsable', model: 'opportunity', dataType: 'TEXT', description: 'Vendedor' },
  { name: 'Propietario', model: 'opportunity', dataType: 'TEXT', description: 'Propietario' },
  { name: 'Médico de la Pérdida', model: 'opportunity', dataType: 'TEXT', description: 'Médico' },
  { name: 'Motivo de la Pérdida', model: 'opportunity', dataType: 'SINGLE_OPTIONS', description: 'Motivo', options: ['Precio', 'Competencia'] },
  { name: 'Probabilidad de Previsión', model: 'opportunity', dataType: 'NUMERICAL', description: 'Probabilidad' },

  // CONTACTOS (8)
  { name: 'Op Abierta Nutrición', model: 'contact', dataType: 'SINGLE_OPTIONS', description: 'Nutrición', options: ['Sí', 'No'] },
  { name: 'Op Abierta Onboarding', model: 'contact', dataType: 'SINGLE_OPTIONS', description: 'Onboarding', options: ['Sí', 'No'] },
  { name: 'Op Abierta Fidelización', model: 'contact', dataType: 'SINGLE_OPTIONS', description: 'Fidelización', options: ['Sí', 'No'] },
  { name: 'Op Abierta Comercial', model: 'contact', dataType: 'SINGLE_OPTIONS', description: 'Comercial', options: ['Sí', 'No'] },
  { name: 'Próximo Retorno Estimado', model: 'contact', dataType: 'DATE', description: 'Retorno' },
  { name: 'Cantidad de Procedimientos', model: 'contact', dataType: 'NUMERICAL', description: 'Procedimientos' },
  { name: 'Origen del Lead', model: 'contact', dataType: 'SINGLE_OPTIONS', description: 'Origen', options: ['Meta', 'Google'] },
  { name: 'Fecha de Entrada', model: 'contact', dataType: 'DATE', description: 'Entrada' }
];

async function crear() {
  console.log('\n█████████████████████████████████████████████████████');
  console.log('█                                                   █');
  console.log('█  🚀 CREAR: 39 Campos Personalizados Carlos       █');
  console.log('█  model: opportunity (31) + contact (8)           █');
  console.log('█                                                   █');
  console.log('█████████████████████████████████████████████████████\n');

  let ok = 0, err = 0;
  const errores = [];

  for (const c of campos) {
    try {
      console.log(`📝 ${c.name}...`);

      const payload = {
        name: c.name,
        dataType: c.dataType,
        model: c.model,
        position: 0
      };

      if (c.options && Array.isArray(c.options) && c.options.length > 0) {
        payload.options = c.options;
      }

      const res = await axios.post(
        `https://services.leadconnectorhq.com/locations/${locationId}/customFields`,
        payload,
        { headers, timeout: 15000 }
      );
      console.log(`   ✅\n`);
      ok++;
    } catch (e) {
      const msg = e.response?.data?.message || e.message;
      console.log(`   ❌ ${msg}\n`);
      err++;
      errores.push({ nombre: c.name, error: msg });
    }
  }

  console.log(`\n═══════════════════════════════════════════════════════`);
  console.log(`✅ ${ok}/39 | ❌ ${err}/39`);

  if (err > 0 && err <= 15) {
    console.log('\nERRORES:');
    errores.forEach(e => console.log(`  - ${e.nombre}: ${e.error}`));
  }

  console.log(`═══════════════════════════════════════════════════════\n`);

  process.exit(err > 0 ? 1 : 0);
}

crear();
