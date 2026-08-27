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
  { name: 'Valor Restante a Pagar', fieldKey: 'valor_restante_pagar', dataType: 'NUMERICAL', description: 'Saldo pendiente de pago' },
  { name: 'Valor Fechado', fieldKey: 'valor_fechado', dataType: 'NUMERICAL', description: 'Valor total cerrado' },
  { name: 'Valor do Lead', fieldKey: 'valor_lead', dataType: 'NUMERICAL', description: 'Valor inicial estimado' },
  { name: 'Fecha Esperada de Cierre', fieldKey: 'fecha_cierre', dataType: 'DATE', description: 'Fecha estimada de cierre' },
  { name: 'Fecha de Pago', fieldKey: 'fecha_pago', dataType: 'DATE', description: 'Fecha del pago realizado' },
  { name: 'Fecha Fin del Programa', fieldKey: 'fecha_fin_programa', dataType: 'DATE', description: 'Fecha de finalización' },
  { name: 'Fecha Inicio del Programa', fieldKey: 'fecha_inicio_programa', dataType: 'DATE', description: 'Fecha de inicio' },
  { name: 'Período Esperado de Tratamiento', fieldKey: 'periodo_tratamiento', dataType: 'DATE', description: 'Período esperado' },
  { name: 'Fecha de Agendamiento', fieldKey: 'fecha_agendamiento', dataType: 'DATE', description: 'Fecha del agendamiento' },
  { name: 'Origen', fieldKey: 'origen', dataType: 'SINGLE_OPTIONS', description: 'Origen de la oportunidad', options: [{label: 'Meta Ads', value: 'meta'}, {label: 'Google Ads', value: 'google'}, {label: 'Referencia', value: 'ref'}, {label: 'Orgánico', value: 'org'}, {label: 'Otro', value: 'otro'}] },
  { name: 'Fuente de la Oportunidad', fieldKey: 'fuente', dataType: 'TEXT', description: 'Fuente de la oportunidad' },
  { name: 'Source Type', fieldKey: 'source_type', dataType: 'SINGLE_OPTIONS', description: 'Tipo de fuente', options: [{label: 'Anuncio', value: 'anuncio'}, {label: 'Email', value: 'email'}, {label: 'WhatsApp', value: 'wa'}, {label: 'Landing', value: 'landing'}, {label: 'Otro', value: 'otro'}] },
  { name: 'Source Ads', fieldKey: 'source_ads', dataType: 'SINGLE_OPTIONS', description: 'Plataforma de publicidad', options: [{label: 'Facebook', value: 'fb'}, {label: 'Instagram', value: 'ig'}, {label: 'Google', value: 'gg'}, {label: 'LinkedIn', value: 'li'}, {label: 'Otra', value: 'otra'}] },
  { name: 'UTM Campaign', fieldKey: 'utm_campaign', dataType: 'TEXT', description: 'Campaña UTM' },
  { name: 'UTM Medium', fieldKey: 'utm_medium', dataType: 'TEXT', description: 'Medio UTM' },
  { name: 'UTM Source', fieldKey: 'utm_source', dataType: 'TEXT', description: 'Fuente UTM' },
  { name: 'Productos Adquiridos', fieldKey: 'productos', dataType: 'MULTIPLE_OPTIONS', description: 'Productos adquiridos', options: [{label: 'Consulta', value: 'consulta'}, {label: 'Aparatología', value: 'aparat'}, {label: 'Paquete', value: 'paq'}, {label: 'Nutrición', value: 'nut'}] },
  { name: 'Programa Vendido', fieldKey: 'programa', dataType: 'SINGLE_OPTIONS', description: 'Programa vendido', options: [{label: 'Sesión única', value: 'unica'}, {label: 'Paquete 4', value: 'p4'}, {label: 'Paquete 8', value: 'p8'}, {label: 'Anual', value: 'anual'}] },
  { name: 'Renovación', fieldKey: 'renovacion', dataType: 'MULTIPLE_OPTIONS', description: 'Renovación del programa', options: [{label: 'Mensual', value: 'mes'}, {label: 'Trimestral', value: 'trim'}, {label: 'Semestral', value: 'sem'}, {label: 'Anual', value: 'anual'}] },
  { name: 'Forma de Pago', fieldKey: 'forma_pago', dataType: 'SINGLE_OPTIONS', description: 'Forma de pago', options: [{label: 'Stripe', value: 'stripe'}, {label: 'Transferencia', value: 'trans'}, {label: 'Efectivo', value: 'cash'}, {label: 'Otra', value: 'otra'}] },
  { name: 'Plataforma Checkout', fieldKey: 'plataforma_checkout', dataType: 'SINGLE_OPTIONS', description: 'Plataforma de checkout', options: [{label: 'Stripe', value: 'stripe'}, {label: 'GHL Payments', value: 'ghl'}, {label: 'Manual', value: 'manual'}] },
  { name: 'Día de la Semana de la Consulta', fieldKey: 'dia_semana', dataType: 'SINGLE_OPTIONS', description: 'Día de la semana', options: [{label: 'Lunes', value: 'lun'}, {label: 'Martes', value: 'mar'}, {label: 'Miércoles', value: 'mie'}, {label: 'Jueves', value: 'jue'}, {label: 'Viernes', value: 'vie'}, {label: 'Sábado', value: 'sab'}] },
  { name: 'Hora de la Consulta', fieldKey: 'hora_consulta', dataType: 'TEXT', description: 'Hora de la consulta' },
  { name: 'Número de la Consulta', fieldKey: 'numero_consulta', dataType: 'MULTIPLE_OPTIONS', description: 'Número de consulta', options: [{label: '1', value: '1'}, {label: '2', value: '2'}, {label: '3', value: '3'}, {label: '4', value: '4'}, {label: '5', value: '5'}] },
  { name: 'Canal de la Consulta', fieldKey: 'canal_consulta', dataType: 'SINGLE_OPTIONS', description: 'Canal de consulta', options: [{label: 'Presencial', value: 'pres'}, {label: 'Telemedicina', value: 'tele'}, {label: 'Híbrido', value: 'hib'}] },
  { name: 'Día para Envío del Checkin', fieldKey: 'dia_checkin', dataType: 'SINGLE_OPTIONS', description: 'Día para envío del checkin', options: [{label: '1 día antes', value: '1d'}, {label: '2 días antes', value: '2d'}, {label: '1 semana antes', value: '1s'}] },
  { name: 'Vendedor Responsable', fieldKey: 'vendedor', dataType: 'TEXT', description: 'Vendedor responsable' },
  { name: 'Propietario', fieldKey: 'propietario', dataType: 'TEXT', description: 'Propietario/asignado a' },
  { name: 'Médico de la Pérdida', fieldKey: 'medico_perdida', dataType: 'TEXT', description: 'Médico responsable' },
  { name: 'Motivo de la Pérdida', fieldKey: 'motivo_perdida', dataType: 'SINGLE_OPTIONS', description: 'Motivo de la pérdida', options: [{label: 'Precio', value: 'precio'}, {label: 'Competencia', value: 'comp'}, {label: 'Falta de tiempo', value: 'tiempo'}, {label: 'Otro', value: 'otro'}] },
  { name: 'Probabilidad de Previsión', fieldKey: 'probabilidad', dataType: 'NUMERICAL', description: 'Probabilidad (%)' },
  { name: 'Op Abierta Nutrición', fieldKey: 'op_nutricion', dataType: 'SINGLE_OPTIONS', description: 'Oportunidad abierta en nutrición', options: [{label: 'Sí', value: 'si'}, {label: 'No', value: 'no'}] },
  { name: 'Op Abierta Onboarding', fieldKey: 'op_onboarding', dataType: 'SINGLE_OPTIONS', description: 'Oportunidad abierta en onboarding', options: [{label: 'Sí', value: 'si'}, {label: 'No', value: 'no'}] },
  { name: 'Op Abierta Fidelización', fieldKey: 'op_fidelizacion', dataType: 'SINGLE_OPTIONS', description: 'Oportunidad abierta en fidelización', options: [{label: 'Sí', value: 'si'}, {label: 'No', value: 'no'}] },
  { name: 'Op Abierta Comercial', fieldKey: 'op_comercial', dataType: 'SINGLE_OPTIONS', description: 'Oportunidad abierta comercial', options: [{label: 'Sí', value: 'si'}, {label: 'No', value: 'no'}] },
  { name: 'Próximo Retorno Estimado', fieldKey: 'proximo_retorno', dataType: 'DATE', description: 'Fecha estimada del próximo retorno' },
  { name: 'Cantidad de Procedimientos', fieldKey: 'cantidad_procedimientos', dataType: 'NUMERICAL', description: 'Cantidad de procedimientos' },
  { name: 'Origen del Lead', fieldKey: 'origen_lead', dataType: 'SINGLE_OPTIONS', description: 'Origen del lead', options: [{label: 'Meta Ads', value: 'meta'}, {label: 'Google Ads', value: 'google'}, {label: 'Referencia', value: 'ref'}, {label: 'Orgánico', value: 'org'}] },
  { name: 'Fecha de Entrada', fieldKey: 'fecha_entrada', dataType: 'DATE', description: 'Fecha de entrada al sistema' }
];

async function crearCampos() {
  console.log('\n');
  console.log('█████████████████████████████████████████████████████');
  console.log('█                                                   █');
  console.log('█  🚀 CREAR: 39 Campos Personalizados Carlos       █');
  console.log('█                                                   █');
  console.log('█████████████████████████████████████████████████████\n');

  let exitosos = 0;
  let fallidos = 0;

  for (const campo of campos) {
    try {
      console.log(`📝 ${campo.name}...`);

      const payload = {
        locationId,
        name: campo.name,
        fieldKey: campo.fieldKey,
        dataType: campo.dataType,
        description: campo.description,
        showInForms: true
      };

      if (campo.options && Array.isArray(campo.options) && campo.options.length > 0) {
        payload.options = campo.options;
      }

      const response = await axios.post(
        'https://services.leadconnectorhq.com/custom-fields/',
        payload,
        { headers, timeout: 15000 }
      );

      console.log(`   ✅\n`);
      exitosos++;

    } catch (error) {
      console.log(`   ❌ ${error.response?.data?.message || error.message}\n`);
      fallidos++;
    }
  }

  console.log('═══════════════════════════════════════════════════════\n');
  console.log(`✅ Exitosos: ${exitosos}/39`);
  console.log(`❌ Fallidos: ${fallidos}/39\n`);

  if (fallidos === 0) {
    console.log('✅ ¡39 CAMPOS CREADOS!\n');
  }

  process.exit(fallidos > 0 ? 1 : 0);
}

crearCampos();
