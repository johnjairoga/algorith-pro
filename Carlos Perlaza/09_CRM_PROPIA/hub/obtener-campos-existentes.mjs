#!/usr/bin/env node

/**
 * Script para obtener campos personalizados existentes de GHL
 * y compararlos con la lista de campos definidos
 */

import dotenv from 'dotenv';
import axios from 'axios';
import fs from 'fs';

dotenv.config();

const locationId = process.env.GHL_LOCATION_ID;
const pitToken = process.env.GHL_PIT_TOKEN;
const apiUrl = process.env.GHL_API_URL;

const headers = {
  'Authorization': `Bearer ${pitToken}`,
  'Content-Type': 'application/json',
  'Version': '2021-07-28'
};

// Campos definidos que esperamos tener
const camposDefinidos = {
  contacts: [
    'op_aberta_nutricao',
    'op_aberta_onboarding',
    'op_aberta_fidelizacao',
    'op_aberta_comercial',
    'quantidade_de_followups',
    'proximo_retorno_estimado',
    'quantidade_de_procedimentos',
    'origem_do_lead',
    'data_entrada'
  ],
  opportunities: [
    'valor_restante_a_pagar',
    'valor_fechado',
    'valor_do_lead',
    'forecast_expected_close_date',
    'data_pagamento',
    'data_fim_programa',
    'data_inicio_programa',
    'format_expected_close_date',
    'data_agendamento',
    'origem',
    'source',
    'source_type',
    'source_ads',
    'utm_campaign',
    'utm_medium',
    'utm_source',
    'produtos_adquiridos',
    'programa_vendido',
    'renovacion',
    'forma_de_pagamento',
    'plataforma_checkout',
    'dia_da_semana_consulta',
    'horario_da_consulta',
    'numero_da_consulta',
    'canal_consulta',
    'dia_para_envio_do_checkin',
    'vendedor_responsavel',
    'assigned_to',
    'medico_de_perda',
    'motivo_de_perda',
    'forecast_probability'
  ]
};

async function obtenerCampos() {
  console.log('\n🔍 OBTENIENDO CAMPOS PERSONALIZADOS EXISTENTES EN GHL\n');
  console.log('═'.repeat(70));

  const resultado = {
    fecha: new Date().toISOString(),
    ubicacion: locationId,
    campos_existentes: {
      contacts: [],
      opportunities: []
    },
    comparacion: {
      contacts: {
        existentes: [],
        faltantes: []
      },
      opportunities: {
        existentes: [],
        faltantes: []
      }
    }
  };

  try {
    // OBTENER CAMPOS DE CONTACTOS
    console.log('\n📞 OBTENIENDO CAMPOS DE CONTACTOS...\n');

    const contactsResponse = await axios.get(
      `${apiUrl}/locations/${locationId}/customFields?model=contact`,
      { headers }
    );

    const contactFields = contactsResponse.data?.customFields || [];
    console.log(`✅ Campos de Contacto encontrados: ${contactFields.length}\n`);

    contactFields.forEach((field) => {
      resultado.campos_existentes.contacts.push({
        id: field.id,
        name: field.name,
        fieldKey: field.fieldKey,
        fieldType: field.fieldType,
        createdAt: field.dateAdded
      });

      // Comparar con lista definida
      if (camposDefinidos.contacts.includes(field.fieldKey)) {
        resultado.comparacion.contacts.existentes.push({
          nombre: field.name,
          fieldKey: field.fieldKey,
          tipo: field.fieldType,
          estado: '✅ EXISTE'
        });
        console.log(`✅ ${field.name} (${field.fieldKey})`);
      }
    });

    // OBTENER CAMPOS DE OPORTUNIDADES
    console.log('\n\n💼 OBTENIENDO CAMPOS DE OPORTUNIDADES...\n');

    const opportunitiesResponse = await axios.get(
      `${apiUrl}/locations/${locationId}/customFields?model=opportunity`,
      { headers }
    );

    const opportunityFields = opportunitiesResponse.data?.customFields || [];
    console.log(`✅ Campos de Oportunidad encontrados: ${opportunityFields.length}\n`);

    opportunityFields.forEach((field) => {
      resultado.campos_existentes.opportunities.push({
        id: field.id,
        name: field.name,
        fieldKey: field.fieldKey,
        fieldType: field.fieldType,
        createdAt: field.dateAdded
      });

      // Comparar con lista definida
      if (camposDefinidos.opportunities.includes(field.fieldKey)) {
        resultado.comparacion.opportunities.existentes.push({
          nombre: field.name,
          fieldKey: field.fieldKey,
          tipo: field.fieldType,
          estado: '✅ EXISTE'
        });
        console.log(`✅ ${field.name} (${field.fieldKey})`);
      }
    });

    // IDENTIFICAR CAMPOS FALTANTES
    console.log('\n\n' + '═'.repeat(70));
    console.log('\n❓ IDENTIFICANDO CAMPOS FALTANTES...\n');

    // Contactos faltantes
    const contactsExistentes = resultado.campos_existentes.contacts.map(c => c.fieldKey);
    const contactsFaltantes = camposDefinidos.contacts.filter(campo => !contactsExistentes.includes(campo));

    console.log(`\n📞 CONTACTOS - Faltantes: ${contactsFaltantes.length}`);
    contactsFaltantes.forEach(campo => {
      resultado.comparacion.contacts.faltantes.push({
        fieldKey: campo,
        estado: '❌ FALTA CREAR'
      });
      console.log(`   ❌ ${campo}`);
    });

    // Oportunidades faltantes
    const opportunitiesExistentes = resultado.campos_existentes.opportunities.map(o => o.fieldKey);
    const opportunitiesFaltantes = camposDefinidos.opportunities.filter(campo => !opportunitiesExistentes.includes(campo));

    console.log(`\n💼 OPORTUNIDADES - Faltantes: ${opportunitiesFaltantes.length}`);
    opportunitiesFaltantes.forEach(campo => {
      resultado.comparacion.opportunities.faltantes.push({
        fieldKey: campo,
        estado: '❌ FALTA CREAR'
      });
      console.log(`   ❌ ${campo}`);
    });

    // RESUMEN
    console.log('\n\n' + '═'.repeat(70));
    console.log('\n📊 RESUMEN\n');

    const contactosExisten = resultado.comparacion.contacts.existentes.length;
    const contactosFaltan = resultado.comparacion.contacts.faltantes.length;
    const oportunidadesExisten = resultado.comparacion.opportunities.existentes.length;
    const oportunidadesFaltan = resultado.comparacion.opportunities.faltantes.length;

    console.log(`📞 CONTACTOS:`);
    console.log(`   ✅ Existentes: ${contactosExisten}`);
    console.log(`   ❌ Faltantes: ${contactosFaltan}`);
    console.log(`   ➖ Total esperado: ${camposDefinidos.contacts.length}`);

    console.log(`\n💼 OPORTUNIDADES:`);
    console.log(`   ✅ Existentes: ${oportunidadesExisten}`);
    console.log(`   ❌ Faltantes: ${oportunidadesFaltan}`);
    console.log(`   ➖ Total esperado: ${camposDefinidos.opportunities.length}`);

    console.log(`\n📈 TOTALES:`);
    console.log(`   ✅ Total Existentes: ${contactosExisten + oportunidadesExisten}`);
    console.log(`   ❌ Total Faltantes: ${contactosFaltan + oportunidadesFaltan}`);
    console.log(`   ➖ Total Esperado: ${camposDefinidos.contacts.length + camposDefinidos.opportunities.length}`);

    const porcentajeCompleto = Math.round(((contactosExisten + oportunidadesExisten) / (camposDefinidos.contacts.length + camposDefinidos.opportunities.length)) * 100);
    console.log(`\n📊 Progreso: ${porcentajeCompleto}%`);

    // GUARDAR RESULTADO
    console.log('\n\n' + '═'.repeat(70));
    console.log('\n💾 GUARDANDO RESULTADO...\n');

    const archivoSalida = './config/campos-existentes.json';
    fs.writeFileSync(archivoSalida, JSON.stringify(resultado, null, 2));
    console.log(`✅ Resultado guardado en: ${archivoSalida}`);

    console.log('\n✨ Proceso completado\n');

    return resultado;

  } catch (error) {
    console.error('\n❌ ERROR EN LA OBTENCIÓN DE CAMPOS\n');
    console.error(`Status: ${error.response?.status}`);
    console.error(`Mensaje: ${error.response?.data?.message || error.message}`);

    if (error.response?.status === 401) {
      console.error('\n⚠️  Token inválido o expirado. Verifica el .env');
    }

    process.exit(1);
  }
}

// Ejecutar
obtenerCampos();
