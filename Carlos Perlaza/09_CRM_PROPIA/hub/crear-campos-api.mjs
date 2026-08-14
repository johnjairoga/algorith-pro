#!/usr/bin/env node

/**
 * Script para crear todos los 40 campos personalizados en GHL usando API
 * Endpoint: POST /custom-fields/
 *
 * Este es el endpoint correcto que SÍ permite crear custom fields
 * A diferencia del endpoint de lectura que es solo-lectura
 */

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

// Definición de todos los campos a crear
const campos = [
  // OPORTUNIDADES - FINANCIERO
  {
    name: 'Valor Restante a Pagar',
    fieldKey: 'valor_restante_a_pagar',
    objectKey: 'custom_object.opportunity',
    dataType: 'CURRENCY',
    description: 'Saldo pendiente de pago de la oportunidad',
    showInForms: true
  },
  {
    name: 'Valor Fechado',
    fieldKey: 'valor_fechado',
    objectKey: 'opportunity',
    dataType: 'CURRENCY',
    description: 'Valor total cerrado de la oportunidad',
    showInForms: true
  },
  {
    name: 'Valor do Lead',
    fieldKey: 'valor_do_lead',
    objectKey: 'opportunity',
    dataType: 'CURRENCY',
    description: 'Valor inicial o estimado del lead',
    showInForms: true
  },

  // OPORTUNIDADES - FECHAS Y PROGRAMACIÓN
  {
    name: 'Previsão da Data de Fechamiento Esperada',
    fieldKey: 'forecast_expected_close_date',
    objectKey: 'opportunity',
    dataType: 'DATE',
    description: 'Fecha estimada de cierre de la oportunidad',
    showInForms: true
  },
  {
    name: 'Data Pagamento',
    fieldKey: 'data_pagamento',
    objectKey: 'opportunity',
    dataType: 'DATE',
    description: 'Fecha del pago realizado',
    showInForms: true
  },
  {
    name: 'Data Fim Programa',
    fieldKey: 'data_fim_programa',
    objectKey: 'opportunity',
    dataType: 'DATE',
    description: 'Fecha de finalización del programa',
    showInForms: true
  },
  {
    name: 'Data Inicio Programa',
    fieldKey: 'data_inicio_programa',
    objectKey: 'opportunity',
    dataType: 'DATE',
    description: 'Fecha de inicio del programa',
    showInForms: true
  },
  {
    name: 'Período da Data de Tratamiento Esperado',
    fieldKey: 'format_expected_close_date',
    objectKey: 'opportunity',
    dataType: 'DATE',
    description: 'Período esperado de tratamiento',
    showInForms: true
  },
  {
    name: 'Data Agendamiento',
    fieldKey: 'data_agendamento',
    objectKey: 'opportunity',
    dataType: 'DATE',
    description: 'Fecha del agendamiento',
    showInForms: true
  },

  // OPORTUNIDADES - ORIGEN Y TRACKING
  {
    name: 'Origen',
    fieldKey: 'origem',
    objectKey: 'opportunity',
    dataType: 'DROPDOWN',
    description: 'Origen de la oportunidad',
    showInForms: true,
    allowCustomOption: true
  },
  {
    name: 'Fonte da Oportunidade',
    fieldKey: 'source',
    objectKey: 'opportunity',
    dataType: 'TEXT',
    description: 'Fuente de la oportunidad',
    showInForms: true
  },
  {
    name: 'Source Type',
    fieldKey: 'source_type',
    objectKey: 'opportunity',
    dataType: 'DROPDOWN',
    description: 'Tipo de fuente',
    showInForms: true,
    allowCustomOption: true
  },
  {
    name: 'Source Ads',
    fieldKey: 'source_ads',
    objectKey: 'opportunity',
    dataType: 'DROPDOWN',
    description: 'Plataforma de publicidad',
    showInForms: true,
    allowCustomOption: true
  },
  {
    name: 'UTM Campaign',
    fieldKey: 'utm_campaign',
    objectKey: 'opportunity',
    dataType: 'DROPDOWN',
    description: 'Campaña UTM',
    showInForms: true,
    allowCustomOption: true
  },
  {
    name: 'UTM Medium',
    fieldKey: 'utm_medium',
    objectKey: 'opportunity',
    dataType: 'DROPDOWN',
    description: 'Medio UTM',
    showInForms: true,
    allowCustomOption: true
  },
  {
    name: 'UTM Source',
    fieldKey: 'utm_source',
    objectKey: 'opportunity',
    dataType: 'DROPDOWN',
    description: 'Fuente UTM',
    showInForms: true,
    allowCustomOption: true
  },

  // OPORTUNIDADES - PRODUCTOS Y SERVICIOS
  {
    name: 'Produtos Adquiridos',
    fieldKey: 'produtos_adquiridos',
    objectKey: 'opportunity',
    dataType: 'MULTI_SELECT',
    description: 'Productos adquiridos',
    showInForms: true
  },
  {
    name: 'Programa Vendido',
    fieldKey: 'programa_vendido',
    objectKey: 'opportunity',
    dataType: 'DROPDOWN',
    description: 'Programa vendido',
    showInForms: true,
    allowCustomOption: true
  },
  {
    name: 'Renovación',
    fieldKey: 'renovacion',
    objectKey: 'opportunity',
    dataType: 'MULTI_SELECT',
    description: 'Renovación del programa',
    showInForms: true
  },

  // OPORTUNIDADES - MÉTODOS DE PAGO
  {
    name: 'Forma de Pagamento',
    fieldKey: 'forma_de_pagamento',
    objectKey: 'opportunity',
    dataType: 'DROPDOWN',
    description: 'Forma de pago',
    showInForms: true,
    allowCustomOption: true
  },
  {
    name: 'Plataforma Checkout',
    fieldKey: 'plataforma_checkout',
    objectKey: 'opportunity',
    dataType: 'DROPDOWN',
    description: 'Plataforma de checkout',
    showInForms: true,
    allowCustomOption: true
  },

  // OPORTUNIDADES - CONSULTA Y ATENDIMIENTO
  {
    name: 'Día da Semana Consulta',
    fieldKey: 'dia_da_semana_consulta',
    objectKey: 'opportunity',
    dataType: 'DROPDOWN',
    description: 'Día de la semana de la consulta',
    showInForms: true,
    allowCustomOption: true
  },
  {
    name: 'Horário da Consulta',
    fieldKey: 'horario_da_consulta',
    objectKey: 'opportunity',
    dataType: 'TEXT',
    description: 'Hora de la consulta',
    showInForms: true
  },
  {
    name: 'Número da Consulta',
    fieldKey: 'numero_da_consulta',
    objectKey: 'opportunity',
    dataType: 'MULTI_SELECT',
    description: 'Número de consulta',
    showInForms: true
  },
  {
    name: 'Canal Consulta',
    fieldKey: 'canal_consulta',
    objectKey: 'opportunity',
    dataType: 'DROPDOWN',
    description: 'Canal de consulta',
    showInForms: true,
    allowCustomOption: true
  },
  {
    name: 'Día para Envio do Checkin',
    fieldKey: 'dia_para_envio_do_checkin',
    objectKey: 'opportunity',
    dataType: 'DROPDOWN',
    description: 'Día para envío del checkin',
    showInForms: true,
    allowCustomOption: true
  },

  // OPORTUNIDADES - EQUIPO Y RESPONSABLES
  {
    name: 'Vendedor Responsável',
    fieldKey: 'vendedor_responsavel',
    objectKey: 'opportunity',
    dataType: 'DROPDOWN',
    description: 'Vendedor responsable',
    showInForms: true
  },
  {
    name: 'Propriedário',
    fieldKey: 'assigned_to',
    objectKey: 'opportunity',
    dataType: 'DROPDOWN',
    description: 'Propietario/asignado a',
    showInForms: true
  },
  {
    name: 'Médico de Perda',
    fieldKey: 'medico_de_perda',
    objectKey: 'opportunity',
    dataType: 'DROPDOWN',
    description: 'Médico responsable en caso de pérdida',
    showInForms: true
  },

  // OPORTUNIDADES - PÉRDIDA Y ANÁLISIS
  {
    name: 'Motivo de Perda',
    fieldKey: 'motivo_de_perda',
    objectKey: 'opportunity',
    dataType: 'DROPDOWN',
    description: 'Motivo por el cual se perdió',
    showInForms: true,
    allowCustomOption: true
  },
  {
    name: 'Probabilidade de Previsão',
    fieldKey: 'forecast_probability',
    objectKey: 'opportunity',
    dataType: 'NUMBER',
    description: 'Probabilidad de previsión (%)',
    showInForms: true
  },

  // CONTACTOS - OPORTUNIDADES ABIERTAS
  {
    name: 'Op Abierta Nutrición',
    fieldKey: 'op_aberta_nutricao',
    objectKey: 'contact',
    dataType: 'DROPDOWN',
    description: 'Oportunidad abierta en nutrición',
    showInForms: true
  },
  {
    name: 'Op Abierta Onboarding',
    fieldKey: 'op_aberta_onboarding',
    objectKey: 'contact',
    dataType: 'DROPDOWN',
    description: 'Oportunidad abierta en onboarding',
    showInForms: true
  },
  {
    name: 'Op Abierta Fidelización',
    fieldKey: 'op_aberta_fidelizacao',
    objectKey: 'contact',
    dataType: 'DROPDOWN',
    description: 'Oportunidad abierta en fidelización',
    showInForms: true
  },
  {
    name: 'Op Abierta Comercial',
    fieldKey: 'op_aberta_comercial',
    objectKey: 'contact',
    dataType: 'DROPDOWN',
    description: 'Oportunidad abierta comercial',
    showInForms: true
  },

  // CONTACTOS - SEGUIMIENTO Y CONTROL
  {
    name: 'Cantidad de Follow-ups',
    fieldKey: 'quantidade_de_followups',
    objectKey: 'contact',
    dataType: 'NUMBER',
    description: 'Cantidad de follow-ups realizados',
    showInForms: true
  },
  {
    name: 'Próximo Retorno Estimado',
    fieldKey: 'proximo_retorno_estimado',
    objectKey: 'contact',
    dataType: 'DATE',
    description: 'Fecha estimada del próximo retorno',
    showInForms: true
  },
  {
    name: 'Cantidad de Procedimientos',
    fieldKey: 'quantidade_de_procedimentos',
    objectKey: 'contact',
    dataType: 'NUMBER',
    description: 'Cantidad de procedimientos realizados',
    showInForms: true
  },
  {
    name: 'Origen do Lead',
    fieldKey: 'origem_do_lead',
    objectKey: 'contact',
    dataType: 'DROPDOWN',
    description: 'Origen del lead',
    showInForms: true,
    allowCustomOption: true
  },
  {
    name: 'Data Entrada',
    fieldKey: 'data_entrada',
    objectKey: 'contact',
    dataType: 'DATE',
    description: 'Fecha de entrada al sistema',
    showInForms: true
  }
];

async function crearCampos() {
  console.log('\n🔨 CREANDO 40 CAMPOS PERSONALIZADOS EN GHL VÍA API\n');
  console.log('═'.repeat(70));

  let exitosos = 0;
  let fallidos = 0;
  const errores = [];

  for (const campo of campos) {
    try {
      console.log(`\n📝 Creando: ${campo.name}`);
      console.log(`   Field Key: ${campo.fieldKey}`);
      console.log(`   Type: ${campo.dataType}`);
      console.log(`   Object: ${campo.objectKey}`);

      const payload = {
        locationId,
        name: campo.name,
        fieldKey: campo.fieldKey,
        objectKey: campo.objectKey,
        dataType: campo.dataType,
        description: campo.description || '',
        showInForms: campo.showInForms !== false
      };

      // Añadir opciones para dropdowns
      if (campo.allowCustomOption) {
        payload.allowCustomOption = true;
      }

      const response = await axios.post(
        'https://services.leadconnectorhq.com/custom-fields/',
        payload,
        { headers }
      );

      console.log(`   ✅ ÉXITO`);
      console.log(`   ID: ${response.data?.id || 'creado'}`);
      exitosos++;

    } catch (error) {
      console.log(`   ❌ ERROR`);
      console.log(`   Status: ${error.response?.status}`);
      console.log(`   Mensaje: ${error.response?.data?.message || error.message}`);
      fallidos++;
      errores.push({
        campo: campo.fieldKey,
        error: error.response?.data?.message || error.message
      });
    }
  }

  console.log('\n═'.repeat(70));
  console.log(`\n📊 RESUMEN`);
  console.log(`✅ Exitosos: ${exitosos}`);
  console.log(`❌ Fallidos: ${fallidos}`);
  console.log(`Total: ${campos.length}`);

  if (errores.length > 0 && errores.length <= 10) {
    console.log(`\n⚠️  ERRORES:`);
    errores.forEach(e => {
      console.log(`   - ${e.campo}: ${e.error}`);
    });
  }

  console.log('\n✨ Proceso completado\n');

  process.exit(fallidos > 0 ? 1 : 0);
}

crearCampos();
