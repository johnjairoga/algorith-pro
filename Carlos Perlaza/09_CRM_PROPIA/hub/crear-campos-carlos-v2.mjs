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
  // OPORTUNIDADES - FINANCIERO (3)
  { name: 'Valor Restante a Pagar', fieldKey: 'valor_restante_pagar', model: 'opportunity', dataType: 'NUMERICAL', description: 'Saldo pendiente de pago' },
  { name: 'Valor Fechado', fieldKey: 'valor_fechado', model: 'opportunity', dataType: 'NUMERICAL', description: 'Valor total cerrado' },
  { name: 'Valor do Lead', fieldKey: 'valor_lead', model: 'opportunity', dataType: 'NUMERICAL', description: 'Valor inicial estimado' },

  // OPORTUNIDADES - FECHAS Y PROGRAMACIÓN (6)
  { name: 'Fecha Esperada de Cierre', fieldKey: 'fecha_cierre', model: 'opportunity', dataType: 'DATE', description: 'Fecha estimada de cierre' },
  { name: 'Fecha de Pago', fieldKey: 'fecha_pago', model: 'opportunity', dataType: 'DATE', description: 'Fecha del pago realizado' },
  { name: 'Fecha Fin del Programa', fieldKey: 'fecha_fin_programa', model: 'opportunity', dataType: 'DATE', description: 'Fecha de finalización' },
  { name: 'Fecha Inicio del Programa', fieldKey: 'fecha_inicio_programa', model: 'opportunity', dataType: 'DATE', description: 'Fecha de inicio' },
  { name: 'Período Esperado de Tratamiento', fieldKey: 'periodo_tratamiento', model: 'opportunity', dataType: 'DATE', description: 'Período esperado' },
  { name: 'Fecha de Agendamiento', fieldKey: 'fecha_agendamiento', model: 'opportunity', dataType: 'DATE', description: 'Fecha del agendamiento' },

  // OPORTUNIDADES - ORIGEN Y TRACKING (7)
  { name: 'Origen', fieldKey: 'origen', model: 'opportunity', dataType: 'SINGLE_OPTIONS', description: 'Origen de la oportunidad' },
  { name: 'Fuente de la Oportunidad', fieldKey: 'fuente', model: 'opportunity', dataType: 'TEXT', description: 'Fuente de la oportunidad' },
  { name: 'Source Type', fieldKey: 'source_type', model: 'opportunity', dataType: 'SINGLE_OPTIONS', description: 'Tipo de fuente' },
  { name: 'Source Ads', fieldKey: 'source_ads', model: 'opportunity', dataType: 'SINGLE_OPTIONS', description: 'Plataforma de publicidad' },
  { name: 'UTM Campaign', fieldKey: 'utm_campaign', model: 'opportunity', dataType: 'TEXT', description: 'Campaña UTM' },
  { name: 'UTM Medium', fieldKey: 'utm_medium', model: 'opportunity', dataType: 'TEXT', description: 'Medio UTM' },
  { name: 'UTM Source', fieldKey: 'utm_source', model: 'opportunity', dataType: 'TEXT', description: 'Fuente UTM' },

  // OPORTUNIDADES - PRODUCTOS Y SERVICIOS (3)
  { name: 'Productos Adquiridos', fieldKey: 'productos', model: 'opportunity', dataType: 'MULTIPLE_OPTIONS', description: 'Productos adquiridos' },
  { name: 'Programa Vendido', fieldKey: 'programa', model: 'opportunity', dataType: 'SINGLE_OPTIONS', description: 'Programa vendido' },
  { name: 'Renovación', fieldKey: 'renovacion', model: 'opportunity', dataType: 'MULTIPLE_OPTIONS', description: 'Renovación del programa' },

  // OPORTUNIDADES - MÉTODOS DE PAGO (2)
  { name: 'Forma de Pago', fieldKey: 'forma_pago', model: 'opportunity', dataType: 'SINGLE_OPTIONS', description: 'Forma de pago' },
  { name: 'Plataforma Checkout', fieldKey: 'plataforma_checkout', model: 'opportunity', dataType: 'SINGLE_OPTIONS', description: 'Plataforma de checkout' },

  // OPORTUNIDADES - CONSULTA Y ATENDIMIENTO (5)
  { name: 'Día de la Semana de la Consulta', fieldKey: 'dia_semana', model: 'opportunity', dataType: 'SINGLE_OPTIONS', description: 'Día de la semana' },
  { name: 'Hora de la Consulta', fieldKey: 'hora_consulta', model: 'opportunity', dataType: 'TEXT', description: 'Hora de la consulta' },
  { name: 'Número de la Consulta', fieldKey: 'numero_consulta', model: 'opportunity', dataType: 'MULTIPLE_OPTIONS', description: 'Número de consulta' },
  { name: 'Canal de la Consulta', fieldKey: 'canal_consulta', model: 'opportunity', dataType: 'SINGLE_OPTIONS', description: 'Canal de consulta' },
  { name: 'Día para Envío del Checkin', fieldKey: 'dia_checkin', model: 'opportunity', dataType: 'SINGLE_OPTIONS', description: 'Día para envío del checkin' },

  // OPORTUNIDADES - EQUIPO Y RESPONSABLES (3)
  { name: 'Vendedor Responsable', fieldKey: 'vendedor', model: 'opportunity', dataType: 'TEXT', description: 'Vendedor responsable' },
  { name: 'Propietario', fieldKey: 'propietario', model: 'opportunity', dataType: 'TEXT', description: 'Propietario/asignado a' },
  { name: 'Médico de la Pérdida', fieldKey: 'medico_perdida', model: 'opportunity', dataType: 'TEXT', description: 'Médico responsable' },

  // OPORTUNIDADES - PÉRDIDA Y ANÁLISIS (2)
  { name: 'Motivo de la Pérdida', fieldKey: 'motivo_perdida', model: 'opportunity', dataType: 'SINGLE_OPTIONS', description: 'Motivo de la pérdida' },
  { name: 'Probabilidad de Previsión', fieldKey: 'probabilidad', model: 'opportunity', dataType: 'NUMERICAL', description: 'Probabilidad (%)' },

  // CONTACTOS - OPORTUNIDADES ABIERTAS (4)
  { name: 'Op Abierta Nutrición', fieldKey: 'op_nutricion', model: 'contact', dataType: 'SINGLE_OPTIONS', description: 'Oportunidad abierta en nutrición' },
  { name: 'Op Abierta Onboarding', fieldKey: 'op_onboarding', model: 'contact', dataType: 'SINGLE_OPTIONS', description: 'Oportunidad abierta en onboarding' },
  { name: 'Op Abierta Fidelización', fieldKey: 'op_fidelizacion', model: 'contact', dataType: 'SINGLE_OPTIONS', description: 'Oportunidad abierta en fidelización' },
  { name: 'Op Abierta Comercial', fieldKey: 'op_comercial', model: 'contact', dataType: 'SINGLE_OPTIONS', description: 'Oportunidad abierta comercial' },

  // CONTACTOS - SEGUIMIENTO Y CONTROL (4)
  { name: 'Próximo Retorno Estimado', fieldKey: 'proximo_retorno', model: 'contact', dataType: 'DATE', description: 'Fecha estimada del próximo retorno' },
  { name: 'Cantidad de Procedimientos', fieldKey: 'cantidad_procedimientos', model: 'contact', dataType: 'NUMERICAL', description: 'Cantidad de procedimientos' },
  { name: 'Origen del Lead', fieldKey: 'origen_lead', model: 'contact', dataType: 'SINGLE_OPTIONS', description: 'Origen del lead' },
  { name: 'Fecha de Entrada', fieldKey: 'fecha_entrada', model: 'contact', dataType: 'DATE', description: 'Fecha de entrada al sistema' }
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
  const errores = [];

  for (const campo of campos) {
    try {
      console.log(`📝 Creando: ${campo.name}...`);

      const payload = {
        locationId,
        name: campo.name,
        fieldKey: campo.fieldKey,
        model: campo.model,
        dataType: campo.dataType,
        description: campo.description,
        showInForms: true
      };

      const response = await axios.post(
        'https://services.leadconnectorhq.com/custom-fields/',
        payload,
        { headers, timeout: 15000 }
      );

      console.log(`   ✅ ID: ${response.data?.id || 'OK'}\n`);
      exitosos++;

    } catch (error) {
      console.log(`   ❌ Error: ${error.response?.data?.message || error.message}\n`);
      fallidos++;
      errores.push({
        nombre: campo.name,
        error: error.response?.data?.message || error.message
      });
    }
  }

  console.log('═══════════════════════════════════════════════════════\n');
  console.log('📊 RESUMEN FINAL\n');
  console.log(`✅ Exitosos: ${exitosos}/39`);
  console.log(`❌ Fallidos: ${fallidos}/39\n`);

  if (errores.length > 0 && errores.length <= 15) {
    console.log('⚠️  ERRORES:\n');
    errores.forEach(e => {
      console.log(`   ❌ ${e.nombre}`);
      console.log(`      ${e.error}\n`);
    });
  }

  console.log('═══════════════════════════════════════════════════════\n');

  if (fallidos === 0) {
    console.log('✅ ¡TODOS LOS 39 CAMPOS CREADOS EXITOSAMENTE!\n');
  }

  process.exit(fallidos > 0 ? 1 : 0);
}

crearCampos();
