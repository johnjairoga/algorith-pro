#!/usr/bin/env node
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const locationId = process.env.GHL_LOCATION_ID;
const pitToken = process.env.GHL_PIT_TOKEN;

const headers = {
  'Authorization': `Bearer ${pitToken}`,
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Version': '2021-07-28'
};

const campos = [
  // OPORTUNIDADES (31)
  { name: 'Valor Restante a Pagar', fieldKey: 'valor_restante_pagar', objectKey: 'custom_object.opportunity', dataType: 'NUMERICAL', description: 'Saldo pendiente de pago' },
  { name: 'Valor Fechado', fieldKey: 'valor_fechado', objectKey: 'custom_object.opportunity', dataType: 'NUMERICAL', description: 'Valor total cerrado' },
  { name: 'Valor do Lead', fieldKey: 'valor_lead', objectKey: 'custom_object.opportunity', dataType: 'NUMERICAL', description: 'Valor inicial' },
  { name: 'Fecha Esperada de Cierre', fieldKey: 'fecha_cierre', objectKey: 'custom_object.opportunity', dataType: 'DATE', description: 'Fecha estimada de cierre' },
  { name: 'Fecha de Pago', fieldKey: 'fecha_pago', objectKey: 'custom_object.opportunity', dataType: 'DATE', description: 'Fecha del pago' },
  { name: 'Fecha Fin del Programa', fieldKey: 'fecha_fin_programa', objectKey: 'custom_object.opportunity', dataType: 'DATE', description: 'Fecha de fin' },
  { name: 'Fecha Inicio del Programa', fieldKey: 'fecha_inicio_programa', objectKey: 'custom_object.opportunity', dataType: 'DATE', description: 'Fecha de inicio' },
  { name: 'Período Esperado de Tratamiento', fieldKey: 'periodo_tratamiento', objectKey: 'custom_object.opportunity', dataType: 'DATE', description: 'Período' },
  { name: 'Fecha de Agendamiento', fieldKey: 'fecha_agendamiento', objectKey: 'custom_object.opportunity', dataType: 'DATE', description: 'Agendamiento' },
  { name: 'Origen', fieldKey: 'origen', objectKey: 'custom_object.opportunity', dataType: 'SINGLE_OPTIONS', description: 'Origen', options: [{key:'meta',label:'Meta Ads'},{key:'google',label:'Google'},{key:'ref',label:'Referencia'}] },
  { name: 'Fuente de la Oportunidad', fieldKey: 'fuente', objectKey: 'custom_object.opportunity', dataType: 'TEXT', description: 'Fuente' },
  { name: 'Source Type', fieldKey: 'source_type', objectKey: 'custom_object.opportunity', dataType: 'SINGLE_OPTIONS', description: 'Tipo', options: [{key:'a',label:'Anuncio'},{key:'e',label:'Email'}] },
  { name: 'Source Ads', fieldKey: 'source_ads', objectKey: 'custom_object.opportunity', dataType: 'SINGLE_OPTIONS', description: 'Plataforma', options: [{key:'fb',label:'Facebook'},{key:'ig',label:'Instagram'}] },
  { name: 'UTM Campaign', fieldKey: 'utm_campaign', objectKey: 'custom_object.opportunity', dataType: 'TEXT', description: 'Campaña' },
  { name: 'UTM Medium', fieldKey: 'utm_medium', objectKey: 'custom_object.opportunity', dataType: 'TEXT', description: 'Medio' },
  { name: 'UTM Source', fieldKey: 'utm_source', objectKey: 'custom_object.opportunity', dataType: 'TEXT', description: 'Fuente' },
  { name: 'Productos Adquiridos', fieldKey: 'productos', objectKey: 'custom_object.opportunity', dataType: 'MULTIPLE_OPTIONS', description: 'Productos', options: [{key:'c',label:'Consulta'},{key:'a',label:'Aparatología'}] },
  { name: 'Programa Vendido', fieldKey: 'programa', objectKey: 'custom_object.opportunity', dataType: 'SINGLE_OPTIONS', description: 'Programa', options: [{key:'u',label:'Única'},{key:'p4',label:'Paquete 4'}] },
  { name: 'Renovación', fieldKey: 'renovacion', objectKey: 'custom_object.opportunity', dataType: 'MULTIPLE_OPTIONS', description: 'Renovación', options: [{key:'m',label:'Mensual'},{key:'a',label:'Anual'}] },
  { name: 'Forma de Pago', fieldKey: 'forma_pago', objectKey: 'custom_object.opportunity', dataType: 'SINGLE_OPTIONS', description: 'Forma', options: [{key:'s',label:'Stripe'},{key:'t',label:'Transferencia'}] },
  { name: 'Plataforma Checkout', fieldKey: 'plataforma_checkout', objectKey: 'custom_object.opportunity', dataType: 'SINGLE_OPTIONS', description: 'Plataforma', options: [{key:'s',label:'Stripe'},{key:'g',label:'GHL'}] },
  { name: 'Día de la Semana de la Consulta', fieldKey: 'dia_semana', objectKey: 'custom_object.opportunity', dataType: 'SINGLE_OPTIONS', description: 'Día', options: [{key:'l',label:'Lunes'},{key:'v',label:'Viernes'}] },
  { name: 'Hora de la Consulta', fieldKey: 'hora_consulta', objectKey: 'custom_object.opportunity', dataType: 'TEXT', description: 'Hora' },
  { name: 'Número de la Consulta', fieldKey: 'numero_consulta', objectKey: 'custom_object.opportunity', dataType: 'MULTIPLE_OPTIONS', description: 'Número', options: [{key:'1',label:'1'},{key:'2',label:'2'}] },
  { name: 'Canal de la Consulta', fieldKey: 'canal_consulta', objectKey: 'custom_object.opportunity', dataType: 'SINGLE_OPTIONS', description: 'Canal', options: [{key:'p',label:'Presencial'},{key:'t',label:'Telemedicina'}] },
  { name: 'Día para Envío del Checkin', fieldKey: 'dia_checkin', objectKey: 'custom_object.opportunity', dataType: 'SINGLE_OPTIONS', description: 'Checkin', options: [{key:'1d',label:'1 día'},{key:'1s',label:'1 semana'}] },
  { name: 'Vendedor Responsable', fieldKey: 'vendedor', objectKey: 'custom_object.opportunity', dataType: 'TEXT', description: 'Vendedor' },
  { name: 'Propietario', fieldKey: 'propietario', objectKey: 'custom_object.opportunity', dataType: 'TEXT', description: 'Propietario' },
  { name: 'Médico de la Pérdida', fieldKey: 'medico_perdida', objectKey: 'custom_object.opportunity', dataType: 'TEXT', description: 'Médico' },
  { name: 'Motivo de la Pérdida', fieldKey: 'motivo_perdida', objectKey: 'custom_object.opportunity', dataType: 'SINGLE_OPTIONS', description: 'Motivo', options: [{key:'p',label:'Precio'},{key:'c',label:'Competencia'}] },
  { name: 'Probabilidad de Previsión', fieldKey: 'probabilidad', objectKey: 'custom_object.opportunity', dataType: 'NUMERICAL', description: 'Probabilidad' },
  // CONTACTOS (8)
  { name: 'Op Abierta Nutrición', fieldKey: 'op_nutricion', objectKey: 'custom_object.contact', dataType: 'SINGLE_OPTIONS', description: 'Nutrición', options: [{key:'s',label:'Sí'},{key:'n',label:'No'}] },
  { name: 'Op Abierta Onboarding', fieldKey: 'op_onboarding', objectKey: 'custom_object.contact', dataType: 'SINGLE_OPTIONS', description: 'Onboarding', options: [{key:'s',label:'Sí'},{key:'n',label:'No'}] },
  { name: 'Op Abierta Fidelización', fieldKey: 'op_fidelizacion', objectKey: 'custom_object.contact', dataType: 'SINGLE_OPTIONS', description: 'Fidelización', options: [{key:'s',label:'Sí'},{key:'n',label:'No'}] },
  { name: 'Op Abierta Comercial', fieldKey: 'op_comercial', objectKey: 'custom_object.contact', dataType: 'SINGLE_OPTIONS', description: 'Comercial', options: [{key:'s',label:'Sí'},{key:'n',label:'No'}] },
  { name: 'Próximo Retorno Estimado', fieldKey: 'proximo_retorno', objectKey: 'custom_object.contact', dataType: 'DATE', description: 'Retorno' },
  { name: 'Cantidad de Procedimientos', fieldKey: 'cantidad_procedimientos', objectKey: 'custom_object.contact', dataType: 'NUMERICAL', description: 'Procedimientos' },
  { name: 'Origen del Lead', fieldKey: 'origen_lead', objectKey: 'custom_object.contact', dataType: 'SINGLE_OPTIONS', description: 'Origen', options: [{key:'m',label:'Meta'},{key:'g',label:'Google'}] },
  { name: 'Fecha de Entrada', fieldKey: 'fecha_entrada', objectKey: 'custom_object.contact', dataType: 'DATE', description: 'Entrada' }
];

async function crear() {
  console.log('\n🚀 CREAR 39 CAMPOS\n');
  let ok = 0, err = 0;
  const errores = [];

  for (const c of campos) {
    try {
      console.log(`📝 ${c.name}...`);

      const payload = {
        locationId,
        name: c.name,
        fieldKey: c.fieldKey,
        objectKey: c.objectKey,
        dataType: c.dataType,
        description: c.description,
        showInForms: true,
        parentId: 'tGExRU0UDHiqYAG9YeYE'
      };

      if (c.options && Array.isArray(c.options) && c.options.length > 0) {
        payload.options = c.options;
      }

      const res = await axios.post('https://services.leadconnectorhq.com/custom-fields/', payload, { headers, timeout: 15000 });
      console.log(`   ✅\n`);
      ok++;
    } catch (e) {
      const msg = e.response?.data?.message || e.message;
      console.log(`   ❌ ${msg}\n`);
      err++;
      errores.push({ nombre: c.name, error: msg });
    }
  }

  console.log(`\n✅ ${ok}/39 | ❌ ${err}/39\n`);

  if (err > 0 && err <= 5) {
    console.log('ERRORES:');
    errores.forEach(e => console.log(`  - ${e.nombre}: ${e.error}`));
  }

  process.exit(err > 0 ? 1 : 0);
}

crear();
