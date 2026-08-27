#!/usr/bin/env node
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config({ path: '/c/Users/John/Desktop/John Jairo/Clientes/algorith-pro/Carlos Perlaza/09_CRM_PROPIA/hub/.env' });

const locationId = process.env.GHL_LOCATION_ID;
const pitToken = process.env.GHL_PIT_TOKEN;

const headers = {
  'Authorization': `Bearer ${pitToken}`,
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Version': '2021-07-28'
};

const campos = [
  { name: 'Valor Restante a Pagar', fieldKey: 'valor_restante_pagar', dataType: 'NUMERICAL' },
  { name: 'Valor Fechado', fieldKey: 'valor_fechado', dataType: 'NUMERICAL' },
  { name: 'Valor do Lead', fieldKey: 'valor_lead', dataType: 'NUMERICAL' },
  { name: 'Fecha Esperada de Cierre', fieldKey: 'fecha_cierre', dataType: 'DATE' },
  { name: 'Fecha de Pago', fieldKey: 'fecha_pago', dataType: 'DATE' },
  { name: 'Fecha Fin del Programa', fieldKey: 'fecha_fin_programa', dataType: 'DATE' },
  { name: 'Fecha Inicio del Programa', fieldKey: 'fecha_inicio_programa', dataType: 'DATE' },
  { name: 'Período Esperado de Tratamiento', fieldKey: 'periodo_tratamiento', dataType: 'DATE' },
  { name: 'Fecha de Agendamiento', fieldKey: 'fecha_agendamiento', dataType: 'DATE' },
  { name: 'Origen', fieldKey: 'origen', dataType: 'SINGLE_OPTIONS' },
  { name: 'Fuente de la Oportunidad', fieldKey: 'fuente', dataType: 'TEXT' },
  { name: 'Source Type', fieldKey: 'source_type', dataType: 'SINGLE_OPTIONS' },
  { name: 'Source Ads', fieldKey: 'source_ads', dataType: 'SINGLE_OPTIONS' },
  { name: 'UTM Campaign', fieldKey: 'utm_campaign', dataType: 'TEXT' },
  { name: 'UTM Medium', fieldKey: 'utm_medium', dataType: 'TEXT' },
  { name: 'UTM Source', fieldKey: 'utm_source', dataType: 'TEXT' },
  { name: 'Productos Adquiridos', fieldKey: 'productos', dataType: 'MULTIPLE_OPTIONS' },
  { name: 'Programa Vendido', fieldKey: 'programa', dataType: 'SINGLE_OPTIONS' },
  { name: 'Renovación', fieldKey: 'renovacion', dataType: 'MULTIPLE_OPTIONS' },
  { name: 'Forma de Pago', fieldKey: 'forma_pago', dataType: 'SINGLE_OPTIONS' },
  { name: 'Plataforma Checkout', fieldKey: 'plataforma_checkout', dataType: 'SINGLE_OPTIONS' },
  { name: 'Día de la Semana de la Consulta', fieldKey: 'dia_semana', dataType: 'SINGLE_OPTIONS' },
  { name: 'Hora de la Consulta', fieldKey: 'hora_consulta', dataType: 'TEXT' },
  { name: 'Número de la Consulta', fieldKey: 'numero_consulta', dataType: 'MULTIPLE_OPTIONS' },
  { name: 'Canal de la Consulta', fieldKey: 'canal_consulta', dataType: 'SINGLE_OPTIONS' },
  { name: 'Día para Envío del Checkin', fieldKey: 'dia_checkin', dataType: 'SINGLE_OPTIONS' },
  { name: 'Vendedor Responsable', fieldKey: 'vendedor', dataType: 'TEXT' },
  { name: 'Propietario', fieldKey: 'propietario', dataType: 'TEXT' },
  { name: 'Médico de la Pérdida', fieldKey: 'medico_perdida', dataType: 'TEXT' },
  { name: 'Motivo de la Pérdida', fieldKey: 'motivo_perdida', dataType: 'SINGLE_OPTIONS' },
  { name: 'Probabilidad de Previsión', fieldKey: 'probabilidad', dataType: 'NUMERICAL' },
  { name: 'Op Abierta Nutrición', fieldKey: 'op_nutricion', dataType: 'SINGLE_OPTIONS' },
  { name: 'Op Abierta Onboarding', fieldKey: 'op_onboarding', dataType: 'SINGLE_OPTIONS' },
  { name: 'Op Abierta Fidelización', fieldKey: 'op_fidelizacion', dataType: 'SINGLE_OPTIONS' },
  { name: 'Op Abierta Comercial', fieldKey: 'op_comercial', dataType: 'SINGLE_OPTIONS' },
  { name: 'Próximo Retorno Estimado', fieldKey: 'proximo_retorno', dataType: 'DATE' },
  { name: 'Cantidad de Procedimientos', fieldKey: 'cantidad_procedimientos', dataType: 'NUMERICAL' },
  { name: 'Origen del Lead', fieldKey: 'origen_lead', dataType: 'SINGLE_OPTIONS' },
  { name: 'Fecha de Entrada', fieldKey: 'fecha_entrada', dataType: 'DATE' }
];

async function crear() {
  console.log('\n🚀 CREAR 39 CAMPOS\n');
  let ok = 0, err = 0;

  for (const c of campos) {
    try {
      console.log(`📝 ${c.name}...`);
      const res = await axios.post('https://services.leadconnectorhq.com/custom-fields/', 
        { locationId, name: c.name, fieldKey: c.fieldKey, dataType: c.dataType },
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
