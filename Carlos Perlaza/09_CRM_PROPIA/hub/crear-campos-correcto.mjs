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
  // OPORTUNIDADES
  { name: 'Valor Restante a Pagar', fieldKey: 'valor_restante_pagar', dataType: 'NUMERICAL', objectKey: 'custom_objects.opportunity' },
  { name: 'Valor Fechado', fieldKey: 'valor_fechado', dataType: 'NUMERICAL', objectKey: 'custom_objects.opportunity' },
  { name: 'Valor do Lead', fieldKey: 'valor_lead', dataType: 'NUMERICAL', objectKey: 'custom_objects.opportunity' },
  { name: 'Fecha Esperada de Cierre', fieldKey: 'fecha_cierre', dataType: 'DATE', objectKey: 'custom_objects.opportunity' },
  { name: 'Fecha de Pago', fieldKey: 'fecha_pago', dataType: 'DATE', objectKey: 'custom_objects.opportunity' },
  { name: 'Fecha Fin del Programa', fieldKey: 'fecha_fin_programa', dataType: 'DATE', objectKey: 'custom_objects.opportunity' },
  { name: 'Fecha Inicio del Programa', fieldKey: 'fecha_inicio_programa', dataType: 'DATE', objectKey: 'custom_objects.opportunity' },
  { name: 'Período Esperado de Tratamiento', fieldKey: 'periodo_tratamiento', dataType: 'DATE', objectKey: 'custom_objects.opportunity' },
  { name: 'Fecha de Agendamiento', fieldKey: 'fecha_agendamiento', dataType: 'DATE', objectKey: 'custom_objects.opportunity' },
  { name: 'Origen', fieldKey: 'origen', dataType: 'SINGLE_OPTIONS', objectKey: 'custom_objects.opportunity' },
  { name: 'Fuente de la Oportunidad', fieldKey: 'fuente', dataType: 'TEXT', objectKey: 'custom_objects.opportunity' },
  { name: 'Source Type', fieldKey: 'source_type', dataType: 'SINGLE_OPTIONS', objectKey: 'custom_objects.opportunity' },
  { name: 'Source Ads', fieldKey: 'source_ads', dataType: 'SINGLE_OPTIONS', objectKey: 'custom_objects.opportunity' },
  { name: 'UTM Campaign', fieldKey: 'utm_campaign', dataType: 'TEXT', objectKey: 'custom_objects.opportunity' },
  { name: 'UTM Medium', fieldKey: 'utm_medium', dataType: 'TEXT', objectKey: 'custom_objects.opportunity' },
  { name: 'UTM Source', fieldKey: 'utm_source', dataType: 'TEXT', objectKey: 'custom_objects.opportunity' },
  { name: 'Productos Adquiridos', fieldKey: 'productos', dataType: 'MULTIPLE_OPTIONS', objectKey: 'custom_objects.opportunity' },
  { name: 'Programa Vendido', fieldKey: 'programa', dataType: 'SINGLE_OPTIONS', objectKey: 'custom_objects.opportunity' },
  { name: 'Renovación', fieldKey: 'renovacion', dataType: 'MULTIPLE_OPTIONS', objectKey: 'custom_objects.opportunity' },
  { name: 'Forma de Pago', fieldKey: 'forma_pago', dataType: 'SINGLE_OPTIONS', objectKey: 'custom_objects.opportunity' },
  { name: 'Plataforma Checkout', fieldKey: 'plataforma_checkout', dataType: 'SINGLE_OPTIONS', objectKey: 'custom_objects.opportunity' },
  { name: 'Día de la Semana de la Consulta', fieldKey: 'dia_semana', dataType: 'SINGLE_OPTIONS', objectKey: 'custom_objects.opportunity' },
  { name: 'Hora de la Consulta', fieldKey: 'hora_consulta', dataType: 'TEXT', objectKey: 'custom_objects.opportunity' },
  { name: 'Número de la Consulta', fieldKey: 'numero_consulta', dataType: 'MULTIPLE_OPTIONS', objectKey: 'custom_objects.opportunity' },
  { name: 'Canal de la Consulta', fieldKey: 'canal_consulta', dataType: 'SINGLE_OPTIONS', objectKey: 'custom_objects.opportunity' },
  { name: 'Día para Envío del Checkin', fieldKey: 'dia_checkin', dataType: 'SINGLE_OPTIONS', objectKey: 'custom_objects.opportunity' },
  { name: 'Vendedor Responsable', fieldKey: 'vendedor', dataType: 'TEXT', objectKey: 'custom_objects.opportunity' },
  { name: 'Propietario', fieldKey: 'propietario', dataType: 'TEXT', objectKey: 'custom_objects.opportunity' },
  { name: 'Médico de la Pérdida', fieldKey: 'medico_perdida', dataType: 'TEXT', objectKey: 'custom_objects.opportunity' },
  { name: 'Motivo de la Pérdida', fieldKey: 'motivo_perdida', dataType: 'SINGLE_OPTIONS', objectKey: 'custom_objects.opportunity' },
  { name: 'Probabilidad de Previsión', fieldKey: 'probabilidad', dataType: 'NUMERICAL', objectKey: 'custom_objects.opportunity' },
  // CONTACTOS
  { name: 'Op Abierta Nutrición', fieldKey: 'op_nutricion', dataType: 'SINGLE_OPTIONS', objectKey: 'custom_objects.contact' },
  { name: 'Op Abierta Onboarding', fieldKey: 'op_onboarding', dataType: 'SINGLE_OPTIONS', objectKey: 'custom_objects.contact' },
  { name: 'Op Abierta Fidelización', fieldKey: 'op_fidelizacion', dataType: 'SINGLE_OPTIONS', objectKey: 'custom_objects.contact' },
  { name: 'Op Abierta Comercial', fieldKey: 'op_comercial', dataType: 'SINGLE_OPTIONS', objectKey: 'custom_objects.contact' },
  { name: 'Próximo Retorno Estimado', fieldKey: 'proximo_retorno', dataType: 'DATE', objectKey: 'custom_objects.contact' },
  { name: 'Cantidad de Procedimientos', fieldKey: 'cantidad_procedimientos', dataType: 'NUMERICAL', objectKey: 'custom_objects.contact' },
  { name: 'Origen del Lead', fieldKey: 'origen_lead', dataType: 'SINGLE_OPTIONS', objectKey: 'custom_objects.contact' },
  { name: 'Fecha de Entrada', fieldKey: 'fecha_entrada', dataType: 'DATE', objectKey: 'custom_objects.contact' }
];

async function crear() {
  console.log('\n🚀 CREAR 39 CAMPOS\n');
  let ok = 0, err = 0;

  for (const c of campos) {
    try {
      console.log(`📝 ${c.name}...`);
      const res = await axios.post('https://services.leadconnectorhq.com/custom-fields/', 
        { locationId, name: c.name, fieldKey: c.fieldKey, dataType: c.dataType, objectKey: c.objectKey },
        { headers, timeout: 15000 });
      console.log(`   ✅\n`);
      ok++;
    } catch (e) {
      console.log(`   ❌ ${e.response?.data?.message || e.message}\n`);
      err++;
    }
  }

  console.log(`✅ ${ok}/39 | ❌ ${err}/39\n`);
  process.exit(err > 0 ? 1 : 0);
}

crear();
