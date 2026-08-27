#!/usr/bin/env node

/**
 * Script para crear los 39 campos personalizados para Carlos Perlaza
 * Endpoint: POST /custom-fields/
 *
 * CAMPOS REMOVIDOS: Cantidad de Follow-ups (se automatizará con workflows)
 */

import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const LOCATION_ID = process.env.GHL_LOCATION_ID;
const PIT = process.env.GHL_PIT_TOKEN;
const API_BASE = 'https://services.leadconnectorhq.com';

const headers = {
  'Authorization': `Bearer ${PIT}`,
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Version': '2021-07-28'
};

// Definición de todos los 39 campos
const CAMPOS_A_CREAR = [
  // ===== OPORTUNIDADES (31) =====

  // Financiero (3)
  {
    name: 'Valor Restante a Pagar',
    description: 'Saldo pendiente de pago de la oportunidad',
    dataType: 'NUMERICAL',
    objectKey: 'custom_object.opportunity',
    fieldKey: 'custom_object.opportunity.valor_restante_pagar',
    showInForms: true
  },
  {
    name: 'Valor Fechado',
    description: 'Valor total cerrado de la oportunidad',
    dataType: 'NUMERICAL',
    objectKey: 'custom_object.opportunity',
    fieldKey: 'custom_object.opportunity.valor_fechado',
    showInForms: true
  },
  {
    name: 'Valor do Lead',
    description: 'Valor inicial o estimado del lead',
    dataType: 'NUMERICAL',
    objectKey: 'custom_object.opportunity',
    fieldKey: 'custom_object.opportunity.valor_lead',
    showInForms: true
  },

  // Fechas y Programación (6)
  {
    name: 'Fecha Esperada de Cierre',
    description: 'Fecha estimada de cierre de la oportunidad',
    dataType: 'DATE',
    objectKey: 'custom_object.opportunity',
    fieldKey: 'custom_object.opportunity.fecha_cierre',
    showInForms: true
  },
  {
    name: 'Fecha de Pago',
    description: 'Fecha del pago realizado',
    dataType: 'DATE',
    objectKey: 'custom_object.opportunity',
    fieldKey: 'custom_object.opportunity.fecha_pago',
    showInForms: true
  },
  {
    name: 'Fecha Fin del Programa',
    description: 'Fecha de finalización del programa',
    dataType: 'DATE',
    objectKey: 'custom_object.opportunity',
    fieldKey: 'custom_object.opportunity.fecha_fin_programa',
    showInForms: true
  },
  {
    name: 'Fecha Inicio del Programa',
    description: 'Fecha de inicio del programa',
    dataType: 'DATE',
    objectKey: 'custom_object.opportunity',
    fieldKey: 'custom_object.opportunity.fecha_inicio_programa',
    showInForms: true
  },
  {
    name: 'Período Esperado de Tratamiento',
    description: 'Período esperado de tratamiento',
    dataType: 'DATE',
    objectKey: 'custom_object.opportunity',
    fieldKey: 'custom_object.opportunity.periodo_tratamiento',
    showInForms: true
  },
  {
    name: 'Fecha de Agendamiento',
    description: 'Fecha del agendamiento',
    dataType: 'DATE',
    objectKey: 'custom_object.opportunity',
    fieldKey: 'custom_object.opportunity.fecha_agendamiento',
    showInForms: true
  },

  // Origen y Tracking (7)
  {
    name: 'Origen',
    description: 'Origen de la oportunidad',
    dataType: 'SINGLE_OPTIONS',
    objectKey: 'custom_object.opportunity',
    fieldKey: 'custom_object.opportunity.origen',
    options: [
      { label: 'Meta Ads', key: 'meta_ads' },
      { label: 'Google Ads', key: 'google_ads' },
      { label: 'Referencia', key: 'referencia' },
      { label: 'Orgánico', key: 'organico' },
      { label: 'Otro', key: 'otro' }
    ],
    showInForms: true
  },
  {
    name: 'Fuente de la Oportunidad',
    description: 'Fuente de la oportunidad',
    dataType: 'TEXT',
    objectKey: 'custom_object.opportunity',
    fieldKey: 'custom_object.opportunity.fuente',
    showInForms: true
  },
  {
    name: 'Source Type',
    description: 'Tipo de fuente',
    dataType: 'SINGLE_OPTIONS',
    objectKey: 'custom_object.opportunity',
    fieldKey: 'custom_object.opportunity.source_type',
    options: [
      { label: 'Anuncio', key: 'anuncio' },
      { label: 'Email', key: 'email' },
      { label: 'WhatsApp', key: 'whatsapp' },
      { label: 'Landing', key: 'landing' },
      { label: 'Otro', key: 'otro' }
    ],
    showInForms: true
  },
  {
    name: 'Source Ads',
    description: 'Plataforma de publicidad',
    dataType: 'SINGLE_OPTIONS',
    objectKey: 'custom_object.opportunity',
    fieldKey: 'custom_object.opportunity.source_ads',
    options: [
      { label: 'Facebook', key: 'facebook' },
      { label: 'Instagram', key: 'instagram' },
      { label: 'Google', key: 'google' },
      { label: 'LinkedIn', key: 'linkedin' },
      { label: 'Otra', key: 'otra' }
    ],
    showInForms: true
  },
  {
    name: 'UTM Campaign',
    description: 'Campaña UTM',
    dataType: 'TEXT',
    objectKey: 'custom_object.opportunity',
    fieldKey: 'custom_object.opportunity.utm_campaign',
    showInForms: true
  },
  {
    name: 'UTM Medium',
    description: 'Medio UTM',
    dataType: 'TEXT',
    objectKey: 'custom_object.opportunity',
    fieldKey: 'custom_object.opportunity.utm_medium',
    showInForms: true
  },
  {
    name: 'UTM Source',
    description: 'Fuente UTM',
    dataType: 'TEXT',
    objectKey: 'custom_object.opportunity',
    fieldKey: 'custom_object.opportunity.utm_source',
    showInForms: true
  },

  // Productos y Servicios (3)
  {
    name: 'Productos Adquiridos',
    description: 'Productos adquiridos',
    dataType: 'MULTIPLE_OPTIONS',
    objectKey: 'custom_object.opportunity',
    fieldKey: 'custom_object.opportunity.productos',
    options: [
      { label: 'Consulta', key: 'consulta' },
      { label: 'Aparatología', key: 'aparatologia' },
      { label: 'Paquete', key: 'paquete' },
      { label: 'Nutrición', key: 'nutricion' }
    ],
    showInForms: true
  },
  {
    name: 'Programa Vendido',
    description: 'Programa vendido',
    dataType: 'SINGLE_OPTIONS',
    objectKey: 'custom_object.opportunity',
    fieldKey: 'custom_object.opportunity.programa',
    options: [
      { label: 'Sesión única', key: 'sesion_unica' },
      { label: 'Paquete 4 sesiones', key: 'paquete_4' },
      { label: 'Paquete 8 sesiones', key: 'paquete_8' },
      { label: 'Anual', key: 'anual' }
    ],
    showInForms: true
  },
  {
    name: 'Renovación',
    description: 'Renovación del programa',
    dataType: 'MULTIPLE_OPTIONS',
    objectKey: 'custom_object.opportunity',
    fieldKey: 'custom_object.opportunity.renovacion',
    options: [
      { label: 'Mensual', key: 'mensual' },
      { label: 'Trimestral', key: 'trimestral' },
      { label: 'Semestral', key: 'semestral' },
      { label: 'Anual', key: 'anual' }
    ],
    showInForms: true
  },

  // Métodos de Pago (2)
  {
    name: 'Forma de Pago',
    description: 'Forma de pago',
    dataType: 'SINGLE_OPTIONS',
    objectKey: 'custom_object.opportunity',
    fieldKey: 'custom_object.opportunity.forma_pago',
    options: [
      { label: 'Stripe', key: 'stripe' },
      { label: 'Transferencia', key: 'transferencia' },
      { label: 'Efectivo', key: 'efectivo' },
      { label: 'Otra', key: 'otra' }
    ],
    showInForms: true
  },
  {
    name: 'Plataforma Checkout',
    description: 'Plataforma de checkout',
    dataType: 'SINGLE_OPTIONS',
    objectKey: 'custom_object.opportunity',
    fieldKey: 'custom_object.opportunity.plataforma_checkout',
    options: [
      { label: 'Stripe', key: 'stripe' },
      { label: 'GHL Payments', key: 'ghl_payments' },
      { label: 'Manual', key: 'manual' }
    ],
    showInForms: true
  },

  // Consulta y Atendimiento (5)
  {
    name: 'Día de la Semana de la Consulta',
    description: 'Día de la semana de la consulta',
    dataType: 'SINGLE_OPTIONS',
    objectKey: 'custom_object.opportunity',
    fieldKey: 'custom_object.opportunity.dia_semana',
    options: [
      { label: 'Lunes', key: 'lunes' },
      { label: 'Martes', key: 'martes' },
      { label: 'Miércoles', key: 'miercoles' },
      { label: 'Jueves', key: 'jueves' },
      { label: 'Viernes', key: 'viernes' },
      { label: 'Sábado', key: 'sabado' }
    ],
    showInForms: true
  },
  {
    name: 'Hora de la Consulta',
    description: 'Hora de la consulta',
    dataType: 'TEXT',
    objectKey: 'custom_object.opportunity',
    fieldKey: 'custom_object.opportunity.hora_consulta',
    showInForms: true
  },
  {
    name: 'Número de la Consulta',
    description: 'Número de consulta',
    dataType: 'MULTIPLE_OPTIONS',
    objectKey: 'custom_object.opportunity',
    fieldKey: 'custom_object.opportunity.numero_consulta',
    options: [
      { label: '1', key: '1' },
      { label: '2', key: '2' },
      { label: '3', key: '3' },
      { label: '4', key: '4' },
      { label: '5', key: '5' }
    ],
    showInForms: true
  },
  {
    name: 'Canal de la Consulta',
    description: 'Canal de consulta',
    dataType: 'SINGLE_OPTIONS',
    objectKey: 'custom_object.opportunity',
    fieldKey: 'custom_object.opportunity.canal_consulta',
    options: [
      { label: 'Presencial', key: 'presencial' },
      { label: 'Telemedicina', key: 'telemedicina' },
      { label: 'Híbrido', key: 'hibrido' }
    ],
    showInForms: true
  },
  {
    name: 'Día para Envío del Checkin',
    description: 'Día para envío del checkin',
    dataType: 'SINGLE_OPTIONS',
    objectKey: 'custom_object.opportunity',
    fieldKey: 'custom_object.opportunity.dia_checkin',
    options: [
      { label: '1 día antes', key: '1_dia' },
      { label: '2 días antes', key: '2_dias' },
      { label: '1 semana antes', key: '1_semana' }
    ],
    showInForms: true
  },

  // Equipo y Responsables (3)
  {
    name: 'Vendedor Responsable',
    description: 'Vendedor responsable',
    dataType: 'TEXT',
    objectKey: 'custom_object.opportunity',
    fieldKey: 'custom_object.opportunity.vendedor',
    showInForms: true
  },
  {
    name: 'Propietario',
    description: 'Propietario/asignado a',
    dataType: 'TEXT',
    objectKey: 'custom_object.opportunity',
    fieldKey: 'custom_object.opportunity.propietario',
    showInForms: true
  },
  {
    name: 'Médico de la Pérdida',
    description: 'Médico responsable en caso de pérdida',
    dataType: 'TEXT',
    objectKey: 'custom_object.opportunity',
    fieldKey: 'custom_object.opportunity.medico_perdida',
    showInForms: true
  },

  // Pérdida y Análisis (2)
  {
    name: 'Motivo de la Pérdida',
    description: 'Motivo por el cual se perdió',
    dataType: 'SINGLE_OPTIONS',
    objectKey: 'custom_object.opportunity',
    fieldKey: 'custom_object.opportunity.motivo_perdida',
    options: [
      { label: 'Precio', key: 'precio' },
      { label: 'Competencia', key: 'competencia' },
      { label: 'Falta de tiempo', key: 'falta_tiempo' },
      { label: 'Otro', key: 'otro' }
    ],
    showInForms: true
  },
  {
    name: 'Probabilidad de Previsión',
    description: 'Probabilidad de previsión (%)',
    dataType: 'NUMERICAL',
    objectKey: 'custom_object.opportunity',
    fieldKey: 'custom_object.opportunity.probabilidad',
    showInForms: true
  },

  // ===== CONTACTOS (8) =====

  // Oportunidades Abiertas (4)
  {
    name: 'Op Abierta Nutrición',
    description: 'Oportunidad abierta en nutrición',
    dataType: 'SINGLE_OPTIONS',
    objectKey: 'custom_object.contact',
    fieldKey: 'custom_object.contact.op_nutricion',
    options: [
      { label: 'Sí', key: 'si' },
      { label: 'No', key: 'no' }
    ],
    showInForms: true
  },
  {
    name: 'Op Abierta Onboarding',
    description: 'Oportunidad abierta en onboarding',
    dataType: 'SINGLE_OPTIONS',
    objectKey: 'custom_object.contact',
    fieldKey: 'custom_object.contact.op_onboarding',
    options: [
      { label: 'Sí', key: 'si' },
      { label: 'No', key: 'no' }
    ],
    showInForms: true
  },
  {
    name: 'Op Abierta Fidelización',
    description: 'Oportunidad abierta en fidelización',
    dataType: 'SINGLE_OPTIONS',
    objectKey: 'custom_object.contact',
    fieldKey: 'custom_object.contact.op_fidelizacion',
    options: [
      { label: 'Sí', key: 'si' },
      { label: 'No', key: 'no' }
    ],
    showInForms: true
  },
  {
    name: 'Op Abierta Comercial',
    description: 'Oportunidad abierta comercial',
    dataType: 'SINGLE_OPTIONS',
    objectKey: 'custom_object.contact',
    fieldKey: 'custom_object.contact.op_comercial',
    options: [
      { label: 'Sí', key: 'si' },
      { label: 'No', key: 'no' }
    ],
    showInForms: true
  },

  // Seguimiento y Control (4)
  {
    name: 'Próximo Retorno Estimado',
    description: 'Fecha estimada del próximo retorno',
    dataType: 'DATE',
    objectKey: 'custom_object.contact',
    fieldKey: 'custom_object.contact.proximo_retorno',
    showInForms: true
  },
  {
    name: 'Cantidad de Procedimientos',
    description: 'Cantidad de procedimientos realizados',
    dataType: 'NUMERICAL',
    objectKey: 'custom_object.contact',
    fieldKey: 'custom_object.contact.cantidad_procedimientos',
    showInForms: true
  },
  {
    name: 'Origen del Lead',
    description: 'Origen del lead',
    dataType: 'SINGLE_OPTIONS',
    objectKey: 'custom_object.contact',
    fieldKey: 'custom_object.contact.origen_lead',
    options: [
      { label: 'Meta Ads', key: 'meta_ads' },
      { label: 'Google Ads', key: 'google_ads' },
      { label: 'Referencia', key: 'referencia' },
      { label: 'Orgánico', key: 'organico' }
    ],
    showInForms: true
  },
  {
    name: 'Fecha de Entrada',
    description: 'Fecha de entrada al sistema',
    dataType: 'DATE',
    objectKey: 'custom_object.contact',
    fieldKey: 'custom_object.contact.fecha_entrada',
    showInForms: true
  }
];

async function criarCampos() {
  console.log('\n');
  console.log('█████████████████████████████████████████████████████');
  console.log('█                                                   █');
  console.log('█  🚀 CREAR: 39 Campos Personalizados Carlos Perlaza █');
  console.log('█                                                   █');
  console.log('█████████████████████████████████████████████████████\n');

  const resultados = {
    exitosos: [],
    errores: []
  };

  for (const campo of CAMPOS_A_CREAR) {
    try {
      console.log(`📝 Creando: ${campo.name}...`);

      const payload = {
        locationId: LOCATION_ID,
        name: campo.name,
        dataType: campo.dataType,
        description: campo.description,
        objectKey: campo.objectKey,
        fieldKey: campo.fieldKey,
        showInForms: campo.showInForms
      };

      if (campo.options && Array.isArray(campo.options) && campo.options.length > 0) {
        payload.options = campo.options;
      }

      const response = await axios.post(
        `${API_BASE}/custom-fields/`,
        payload,
        { headers, timeout: 15000 }
      );

      console.log(`   ✅ Creado: ${response.data?.id || 'OK'}\n`);
      resultados.exitosos.push({
        nombre: campo.name,
        id: response.data?.id || 'N/A',
        objectKey: campo.objectKey
      });

    } catch (error) {
      const errorMsg = error.response?.data?.message ||
                      error.response?.data?.error ||
                      error.message;
      console.error(`   ❌ Error: ${errorMsg}\n`);
      resultados.errores.push({
        nombre: campo.name,
        error: errorMsg,
        status: error.response?.status,
        objectKey: campo.objectKey
      });
    }
  }

  console.log('═══════════════════════════════════════════════════════\n');
  console.log('📊 RESUMEN FINAL\n');

  console.log(`✅ Exitosos: ${resultados.exitosos.length}/39`);
  if (resultados.exitosos.length > 0 && resultados.exitosos.length <= 20) {
    resultados.exitosos.forEach(c => {
      console.log(`   ✅ ${c.nombre}`);
    });
  }

  if (resultados.errores.length > 0) {
    console.log(`\n❌ Con errores: ${resultados.errores.length}/39`);
    if (resultados.errores.length <= 10) {
      resultados.errores.forEach(e => {
        console.log(`   ❌ ${e.nombre}`);
        console.log(`      ${e.error}\n`);
      });
    }
  }

  console.log('═══════════════════════════════════════════════════════\n');

  if (resultados.errores.length === 0) {
    console.log('✅ ¡TODOS LOS 39 CAMPOS CREADOS EXITOSAMENTE!\n');
    process.exit(0);
  } else {
    console.log(`⚠️  ${resultados.errores.length} campos con error\n`);
    process.exit(1);
  }
}

criarCampos();
