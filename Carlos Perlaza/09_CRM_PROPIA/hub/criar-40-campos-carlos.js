#!/usr/bin/env node

/**
 * Script para crear los 39 campos personalizados para Carlos Perlaza
 * Basado en endpoint funcional probado: POST /locations/{locationId}/customFields
 *
 * NOTA: Requiere que las 15 carpetas ya estén creadas en GHL
 * y sus IDs deben ser ingresados en este script
 *
 * CAMPOS REMOVIDOS: Cantidad de Follow-ups (se automatizará con workflows)
 */

import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const LOCATION_ID = process.env.GHL_LOCATION_ID;
const PIT = process.env.GHL_PIT_TOKEN;
const API_BASE = 'https://services.leadconnectorhq.com';

// IDs de las carpetas (deben ser obtenidos de GHL después de crearlas)
// TODO: Actualizar estos IDs después de crear las carpetas en GHL Console
const FOLDER_IDS = {
  // Oportunidades
  financiero: 'FOLDER_ID_FINANCIERO',
  fechas: 'FOLDER_ID_FECHAS_PROGRAMACION',
  origen: 'FOLDER_ID_ORIGEN_TRACKING',
  productos: 'FOLDER_ID_PRODUCTOS_SERVICIOS',
  metodos_pago: 'FOLDER_ID_METODOS_PAGO',
  consulta: 'FOLDER_ID_CONSULTA_ATENDIMIENTO',
  equipo: 'FOLDER_ID_EQUIPO_RESPONSABLES',
  perdida: 'FOLDER_ID_PERDIDA_ANALISIS',
  // Contactos
  oportunidades_abiertas: 'FOLDER_ID_OPORTUNIDADES_ABIERTAS',
  seguimiento: 'FOLDER_ID_SEGUIMIENTO_CONTROL'
};

// Definición de todos los 40 campos
const CAMPOS_A_CREAR = [
  // ===== OPORTUNIDADES =====

  // Financiero (3)
  {
    displayName: 'Valor Restante a Pagar',
    dataType: 'NUMERICAL',
    type: 'number',
    description: 'Saldo pendiente de pago de la oportunidad',
    model: 'opportunity',
    parentId: FOLDER_IDS.financiero,
    showInForms: true
  },
  {
    displayName: 'Valor Fechado',
    dataType: 'NUMERICAL',
    type: 'number',
    description: 'Valor total cerrado de la oportunidad',
    model: 'opportunity',
    parentId: FOLDER_IDS.financiero,
    showInForms: true
  },
  {
    displayName: 'Valor do Lead',
    dataType: 'NUMERICAL',
    type: 'number',
    description: 'Valor inicial o estimado del lead',
    model: 'opportunity',
    parentId: FOLDER_IDS.financiero,
    showInForms: true
  },

  // Fechas y Programación (6)
  {
    displayName: 'Fecha Esperada de Cierre',
    dataType: 'DATE',
    type: 'date',
    description: 'Fecha estimada de cierre de la oportunidad',
    model: 'opportunity',
    parentId: FOLDER_IDS.fechas,
    showInForms: true
  },
  {
    displayName: 'Fecha de Pago',
    dataType: 'DATE',
    type: 'date',
    description: 'Fecha del pago realizado',
    model: 'opportunity',
    parentId: FOLDER_IDS.fechas,
    showInForms: true
  },
  {
    displayName: 'Fecha Fin del Programa',
    dataType: 'DATE',
    type: 'date',
    description: 'Fecha de finalización del programa',
    model: 'opportunity',
    parentId: FOLDER_IDS.fechas,
    showInForms: true
  },
  {
    displayName: 'Fecha Inicio del Programa',
    dataType: 'DATE',
    type: 'date',
    description: 'Fecha de inicio del programa',
    model: 'opportunity',
    parentId: FOLDER_IDS.fechas,
    showInForms: true
  },
  {
    displayName: 'Período Esperado de Tratamiento',
    dataType: 'DATE',
    type: 'date',
    description: 'Período esperado de tratamiento',
    model: 'opportunity',
    parentId: FOLDER_IDS.fechas,
    showInForms: true
  },
  {
    displayName: 'Fecha de Agendamiento',
    dataType: 'DATE',
    type: 'date',
    description: 'Fecha del agendamiento',
    model: 'opportunity',
    parentId: FOLDER_IDS.fechas,
    showInForms: true
  },

  // Origen y Tracking (7)
  {
    displayName: 'Origen',
    dataType: 'SINGLE_OPTIONS',
    type: 'select',
    description: 'Origen de la oportunidad',
    model: 'opportunity',
    parentId: FOLDER_IDS.origen,
    options: ['Meta Ads', 'Google Ads', 'Referencia', 'Orgánico', 'Otro'],
    showInForms: true
  },
  {
    displayName: 'Fuente de la Oportunidad',
    dataType: 'TEXT',
    type: 'text',
    description: 'Fuente de la oportunidad',
    model: 'opportunity',
    parentId: FOLDER_IDS.origen,
    showInForms: true
  },
  {
    displayName: 'Source Type',
    dataType: 'SINGLE_OPTIONS',
    type: 'select',
    description: 'Tipo de fuente',
    model: 'opportunity',
    parentId: FOLDER_IDS.origen,
    options: ['Anuncio', 'Email', 'WhatsApp', 'Landing', 'Otro'],
    showInForms: true
  },
  {
    displayName: 'Source Ads',
    dataType: 'SINGLE_OPTIONS',
    type: 'select',
    description: 'Plataforma de publicidad',
    model: 'opportunity',
    parentId: FOLDER_IDS.origen,
    options: ['Facebook', 'Instagram', 'Google', 'LinkedIn', 'Otra'],
    showInForms: true
  },
  {
    displayName: 'UTM Campaign',
    dataType: 'TEXT',
    type: 'text',
    description: 'Campaña UTM',
    model: 'opportunity',
    parentId: FOLDER_IDS.origen,
    showInForms: true
  },
  {
    displayName: 'UTM Medium',
    dataType: 'TEXT',
    type: 'text',
    description: 'Medio UTM',
    model: 'opportunity',
    parentId: FOLDER_IDS.origen,
    showInForms: true
  },
  {
    displayName: 'UTM Source',
    dataType: 'TEXT',
    type: 'text',
    description: 'Fuente UTM',
    model: 'opportunity',
    parentId: FOLDER_IDS.origen,
    showInForms: true
  },

  // Productos y Servicios (3)
  {
    displayName: 'Productos Adquiridos',
    dataType: 'MULTIPLE_OPTIONS',
    type: 'select',
    description: 'Productos adquiridos',
    model: 'opportunity',
    parentId: FOLDER_IDS.productos,
    options: ['Consulta', 'Aparatología', 'Paquete', 'Nutrición'],
    showInForms: true
  },
  {
    displayName: 'Programa Vendido',
    dataType: 'SINGLE_OPTIONS',
    type: 'select',
    description: 'Programa vendido',
    model: 'opportunity',
    parentId: FOLDER_IDS.productos,
    options: ['Sesión única', 'Paquete 4 sesiones', 'Paquete 8 sesiones', 'Anual'],
    showInForms: true
  },
  {
    displayName: 'Renovación',
    dataType: 'MULTIPLE_OPTIONS',
    type: 'select',
    description: 'Renovación del programa',
    model: 'opportunity',
    parentId: FOLDER_IDS.productos,
    options: ['Mensual', 'Trimestral', 'Semestral', 'Anual'],
    showInForms: true
  },

  // Métodos de Pago (2)
  {
    displayName: 'Forma de Pago',
    dataType: 'SINGLE_OPTIONS',
    type: 'select',
    description: 'Forma de pago',
    model: 'opportunity',
    parentId: FOLDER_IDS.metodos_pago,
    options: ['Stripe', 'Transferencia', 'Efectivo', 'Otra'],
    showInForms: true
  },
  {
    displayName: 'Plataforma Checkout',
    dataType: 'SINGLE_OPTIONS',
    type: 'select',
    description: 'Plataforma de checkout',
    model: 'opportunity',
    parentId: FOLDER_IDS.metodos_pago,
    options: ['Stripe', 'GHL Payments', 'Manual'],
    showInForms: true
  },

  // Consulta y Atendimiento (5)
  {
    displayName: 'Día de la Semana de la Consulta',
    dataType: 'SINGLE_OPTIONS',
    type: 'select',
    description: 'Día de la semana de la consulta',
    model: 'opportunity',
    parentId: FOLDER_IDS.consulta,
    options: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
    showInForms: true
  },
  {
    displayName: 'Hora de la Consulta',
    dataType: 'TEXT',
    type: 'text',
    description: 'Hora de la consulta',
    model: 'opportunity',
    parentId: FOLDER_IDS.consulta,
    showInForms: true
  },
  {
    displayName: 'Número de la Consulta',
    dataType: 'MULTIPLE_OPTIONS',
    type: 'select',
    description: 'Número de consulta',
    model: 'opportunity',
    parentId: FOLDER_IDS.consulta,
    options: ['1', '2', '3', '4', '5'],
    showInForms: true
  },
  {
    displayName: 'Canal de la Consulta',
    dataType: 'SINGLE_OPTIONS',
    type: 'select',
    description: 'Canal de consulta',
    model: 'opportunity',
    parentId: FOLDER_IDS.consulta,
    options: ['Presencial', 'Telemedicina', 'Híbrido'],
    showInForms: true
  },
  {
    displayName: 'Día para Envío del Checkin',
    dataType: 'SINGLE_OPTIONS',
    type: 'select',
    description: 'Día para envío del checkin',
    model: 'opportunity',
    parentId: FOLDER_IDS.consulta,
    options: ['1 día antes', '2 días antes', '1 semana antes'],
    showInForms: true
  },

  // Equipo y Responsables (3)
  {
    displayName: 'Vendedor Responsable',
    dataType: 'TEXT',
    type: 'text',
    description: 'Vendedor responsable',
    model: 'opportunity',
    parentId: FOLDER_IDS.equipo,
    showInForms: true
  },
  {
    displayName: 'Propietario',
    dataType: 'TEXT',
    type: 'text',
    description: 'Propietario/asignado a',
    model: 'opportunity',
    parentId: FOLDER_IDS.equipo,
    showInForms: true
  },
  {
    displayName: 'Médico de la Pérdida',
    dataType: 'TEXT',
    type: 'text',
    description: 'Médico responsable en caso de pérdida',
    model: 'opportunity',
    parentId: FOLDER_IDS.equipo,
    showInForms: true
  },

  // Pérdida y Análisis (2)
  {
    displayName: 'Motivo de la Pérdida',
    dataType: 'SINGLE_OPTIONS',
    type: 'select',
    description: 'Motivo por el cual se perdió',
    model: 'opportunity',
    parentId: FOLDER_IDS.perdida,
    options: ['Precio', 'Competencia', 'Falta de tiempo', 'Otro'],
    showInForms: true
  },
  {
    displayName: 'Probabilidad de Previsión',
    dataType: 'NUMERICAL',
    type: 'number',
    description: 'Probabilidad de previsión (%)',
    model: 'opportunity',
    parentId: FOLDER_IDS.perdida,
    showInForms: true
  },

  // ===== CONTACTOS =====

  // Oportunidades Abiertas (4)
  {
    displayName: 'Op Abierta Nutrición',
    dataType: 'SINGLE_OPTIONS',
    type: 'select',
    description: 'Oportunidad abierta en nutrición',
    model: 'contact',
    parentId: FOLDER_IDS.oportunidades_abiertas,
    options: ['Sí', 'No'],
    showInForms: true
  },
  {
    displayName: 'Op Abierta Onboarding',
    dataType: 'SINGLE_OPTIONS',
    type: 'select',
    description: 'Oportunidad abierta en onboarding',
    model: 'contact',
    parentId: FOLDER_IDS.oportunidades_abiertas,
    options: ['Sí', 'No'],
    showInForms: true
  },
  {
    displayName: 'Op Abierta Fidelización',
    dataType: 'SINGLE_OPTIONS',
    type: 'select',
    description: 'Oportunidad abierta en fidelización',
    model: 'contact',
    parentId: FOLDER_IDS.oportunidades_abiertas,
    options: ['Sí', 'No'],
    showInForms: true
  },
  {
    displayName: 'Op Abierta Comercial',
    dataType: 'SINGLE_OPTIONS',
    type: 'select',
    description: 'Oportunidad abierta comercial',
    model: 'contact',
    parentId: FOLDER_IDS.oportunidades_abiertas,
    options: ['Sí', 'No'],
    showInForms: true
  },

  // Seguimiento y Control (4)
  {
    displayName: 'Próximo Retorno Estimado',
    dataType: 'DATE',
    type: 'date',
    description: 'Fecha estimada del próximo retorno',
    model: 'contact',
    parentId: FOLDER_IDS.seguimiento,
    showInForms: true
  },
  {
    displayName: 'Cantidad de Procedimientos',
    dataType: 'NUMERICAL',
    type: 'number',
    description: 'Cantidad de procedimientos realizados',
    model: 'contact',
    parentId: FOLDER_IDS.seguimiento,
    showInForms: true
  },
  {
    displayName: 'Origen del Lead',
    dataType: 'SINGLE_OPTIONS',
    type: 'select',
    description: 'Origen del lead',
    model: 'contact',
    parentId: FOLDER_IDS.seguimiento,
    options: ['Meta Ads', 'Google Ads', 'Referencia', 'Orgánico'],
    showInForms: true
  },
  {
    displayName: 'Fecha de Entrada',
    dataType: 'DATE',
    type: 'date',
    description: 'Fecha de entrada al sistema',
    model: 'contact',
    parentId: FOLDER_IDS.seguimiento,
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

  // Validar que los folder IDs estén configurados
  const carpetasNoConfiguradas = Object.entries(FOLDER_IDS)
    .filter(([_, id]) => id.includes('FOLDER_ID_'))
    .map(([nombre]) => nombre);

  if (carpetasNoConfiguradas.length > 0) {
    console.error('\n❌ ERROR: Las siguientes carpetas no tienen IDs configurados:');
    carpetasNoConfiguradas.forEach(c => console.error(`   - ${c}`));
    console.error('\n📝 SOLUCIÓN:');
    console.error('   1. Crear las 15 carpetas en GHL Console');
    console.error('   2. Obtener los IDs de cada carpeta');
    console.error('   3. Actualizar la variable FOLDER_IDS en este script\n');
    process.exit(1);
  }

  const headers = {
    Authorization: `Bearer ${PIT}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Version': '2021-07-28'
  };

  const resultados = {
    exitosos: [],
    errores: []
  };

  // Crear cada campo
  for (const campo of CAMPOS_A_CREAR) {
    try {
      console.log(`📝 Creando: ${campo.displayName}...`);

      const payload = {
        name: campo.displayName,
        dataType: campo.dataType,
        description: campo.description || undefined,
        model: campo.model,
        position: 0,
        parentId: campo.parentId,
        showInForms: campo.showInForms !== false
      };

      // Agregar options si tiene (para select)
      if (campo.options && Array.isArray(campo.options) && campo.options.length > 0) {
        payload.options = campo.options
          .filter(opt => opt && typeof opt === 'string')
          .map((opt) => {
            const trimmed = opt.trim();
            return {
              label: trimmed,
              value: trimmed.toLowerCase().replace(/\s+/g, '_')
            };
          });
      }

      // Remover undefined
      Object.keys(payload).forEach(key =>
        payload[key] === undefined && delete payload[key]
      );

      const response = await axios.post(
        `${API_BASE}/locations/${LOCATION_ID}/customFields`,
        payload,
        { headers, timeout: 15000 }
      );

      console.log(`   ✅ Creado: ${response.data?.id || 'OK'}\n`);
      resultados.exitosos.push({
        nombre: campo.displayName,
        id: response.data?.id || 'N/A',
        model: campo.model
      });

    } catch (error) {
      const errorMsg = error.response?.data?.message ||
                      error.response?.data?.error ||
                      error.message;
      console.error(`   ❌ Error: ${errorMsg}\n`);
      resultados.errores.push({
        nombre: campo.displayName,
        error: errorMsg,
        status: error.response?.status,
        model: campo.model
      });
    }
  }

  // RESUMEN
  console.log('═══════════════════════════════════════════════════════\n');
  console.log('📊 RESUMEN FINAL\n');

  console.log(`✅ Exitosos: ${resultados.exitosos.length}/39`);
  if (resultados.exitosos.length > 0 && resultados.exitosos.length <= 20) {
    resultados.exitosos.forEach(c => {
      console.log(`   ✅ ${c.nombre} (${c.model})`);
    });
  }

  if (resultados.errores.length > 0) {
    console.log(`\n❌ Con errores: ${resultados.errores.length}/40`);
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
