#!/usr/bin/env node

/**
 * GHL SETUP SCRIPT
 * Fase 1: Configuración automatizada de GoHighLevel
 *
 * Funcionalidad:
 * - Valida conexión con GHL
 * - Crea 9 tags (3 revista, 3 cualificación, 3 timeline)
 * - Crea 3 pipelines (uno por revista)
 * - Crea 8 campos personalizados
 *
 * Uso: node ghl_setup.js
 */

require('dotenv').config();

const axios = require('axios');
const chalk = require('chalk');
const fs = require('fs');

// ============================================================================
// CONFIGURACIÓN
// ============================================================================

const GHL_API_TOKEN = process.env.GHL_API_TOKEN || 'pit-fa036e1b-49a8-442d-99ff-cd86cc3ec5d5';
const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID || 'XuChmr0YIHg823jqvZTN';
const GHL_API_URL = 'https://api.gohighlevel.com/v1';

const headers = {
  'Authorization': `Bearer ${GHL_API_TOKEN}`,
  'Content-Type': 'application/json',
  'Accept': 'application/json'
};

// ============================================================================
// ESTRUCTURA DE DATOS A CREAR
// ============================================================================

const TAGS_TO_CREATE = {
  revista: [
    { name: 'REPD', color: '#1E3A8A', description: 'Economia & Políticas Públicas' },
    { name: 'REVISTA_CIENCIA_AGRICOLA', color: '#10B981', description: 'Agronomía & Producción' },
    { name: 'REVISTA_CRITICA_HISTORICA', color: '#9333EA', description: 'Historia & Humanidades' }
  ],
  cualificacion: [
    { name: 'LEAD_QUENTE', color: '#EF4444', description: 'Artículo listo - WhatsApp 1h' },
    { name: 'LEAD_EDUCACIONAL', color: '#F97316', description: 'Estudiante explorando - Email 3d' },
    { name: 'LEAD_PARCIAL', color: '#9CA3AF', description: 'Solo datos básicos' }
  ],
  timeline: [
    { name: 'INTENT_30_DIAS', color: '#3B82F6', description: 'Próximos 30 días' },
    { name: 'INTENT_3_MESES', color: '#8B5CF6', description: 'Próximos 3 meses' },
    { name: 'INTENT_6_MESES', color: '#EC4899', description: 'Próximos 6 meses' },
    { name: 'INTENT_SIN_FECHA', color: '#64748B', description: 'Sin fecha definida' }
  ]
};

const PIPELINES_TO_CREATE = [
  {
    name: 'REPD — Economia & Políticas Públicas',
    stages: ['Nuevo Lead', 'Cualificado', 'En Contacto', 'Convertido'],
    tag: 'REPD'
  },
  {
    name: 'Revista Ciência Agrícola — Agronomía & Producción',
    stages: ['Nuevo Lead', 'Cualificado', 'En Contacto', 'Convertido'],
    tag: 'REVISTA_CIENCIA_AGRICOLA'
  },
  {
    name: 'Revista Crítica Histórica — Historia & Humanidades',
    stages: ['Nuevo Lead', 'Cualificado', 'En Contacto', 'Convertido'],
    tag: 'REVISTA_CRITICA_HISTORICA'
  }
];

const CUSTOM_FIELDS_TO_CREATE = [
  { name: 'Nombre', fieldType: 'text', required: true, description: 'Nombre completo del investigador' },
  { name: 'Email', fieldType: 'email', required: true, description: 'Email de contacto' },
  { name: 'WhatsApp', fieldType: 'phone', required: true, description: 'Número de WhatsApp' },
  { name: 'Área de Investigación', fieldType: 'select', required: true, description: 'Área principal de investigación', options: ['Economía, Desarrollo, Administración, Políticas Públicas', 'Agronomía, Ciencias del Suelo, Producción Animal/Vegetal', 'Historia, Historiografía, Estudios Históricos', 'Otras Ciencias Sociales Aplicadas'] },
  { name: 'Nivel Académico', fieldType: 'select', required: true, description: 'Nivel académico actual', options: ['Estudiante de grado', 'Estudiante de maestría/especialización', 'Estudiante de doctorado', 'Investigador/Profesor con posdoctorado', 'Investigador/Profesor establecido'] },
  { name: 'Artículo Listo', fieldType: 'select', required: true, description: 'Estado del artículo', options: ['Sí, tengo artículo pronto', 'No, pero estoy escribiendo', 'Aún no, solo explorando oportunidades'] },
  { name: 'Cuándo Publicar', fieldType: 'select', required: true, description: 'Timeline de publicación', options: ['Próximos 30 días', 'Próximos 3 meses', 'Próximos 6 meses', 'Sin fecha definida'] },
  { name: 'LGPD Aceptado', fieldType: 'checkbox', required: true, description: 'Consentimiento LGPD aceptado' }
];

// ============================================================================
// FUNCIONES DE UTILIDAD
// ============================================================================

function log(level, message, data = null) {
  const timestamp = new Date().toLocaleTimeString('es-ES');
  const prefix = `[${timestamp}]`;

  switch (level) {
    case 'success':
      console.log(chalk.green(`${prefix} ✅ ${message}`), data ? chalk.gray(JSON.stringify(data, null, 2)) : '');
      break;
    case 'error':
      console.log(chalk.red(`${prefix} ❌ ${message}`), data ? chalk.gray(JSON.stringify(data, null, 2)) : '');
      break;
    case 'info':
      console.log(chalk.blue(`${prefix} ℹ️  ${message}`), data ? chalk.gray(JSON.stringify(data, null, 2)) : '');
      break;
    case 'warn':
      console.log(chalk.yellow(`${prefix} ⚠️  ${message}`), data ? chalk.gray(JSON.stringify(data, null, 2)) : '');
      break;
  }
}

async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ============================================================================
// CONEXIÓN Y VALIDACIÓN
// ============================================================================

async function validateConnection() {
  log('info', 'Validando conexión con GHL...');

  try {
    const response = await axios.get(
      `${GHL_API_URL}/locations/${GHL_LOCATION_ID}`,
      { headers }
    );

    log('success', 'Conexión exitosa con GHL');
    log('info', `Ubicación: ${response.data.location?.name || 'N/A'}`);
    log('info', `ID de Ubicación: ${GHL_LOCATION_ID}`);

    return true;
  } catch (error) {
    log('error', 'Error de conexión con GHL');
    log('error', error.response?.data?.message || error.message);
    return false;
  }
}

// ============================================================================
// CREACIÓN DE TAGS
// ============================================================================

async function createTag(tagName, color, description) {
  try {
    const response = await axios.post(
      `${GHL_API_URL}/locations/${GHL_LOCATION_ID}/tags`,
      {
        name: tagName,
        color: color,
        description: description
      },
      { headers }
    );

    log('success', `Tag creado: ${tagName}`, { id: response.data.tag?.id });
    return response.data.tag;
  } catch (error) {
    if (error.response?.status === 409) {
      log('warn', `Tag ya existe: ${tagName}`);
      return { name: tagName };
    }
    log('error', `Error creando tag ${tagName}`, error.response?.data?.message || error.message);
    return null;
  }
}

async function createAllTags() {
  log('info', '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  log('info', 'FASE 1.2: Creando Tags (9 totales)');
  log('info', '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  const tagsCreated = {};

  // Tags de Revista
  log('info', 'Creando tags de revista...');
  tagsCreated.revista = {};
  for (const tag of TAGS_TO_CREATE.revista) {
    tagsCreated.revista[tag.name] = await createTag(tag.name, tag.color, tag.description);
    await delay(300);
  }

  // Tags de Cualificación
  log('info', 'Creando tags de cualificación...');
  tagsCreated.cualificacion = {};
  for (const tag of TAGS_TO_CREATE.cualificacion) {
    tagsCreated.cualificacion[tag.name] = await createTag(tag.name, tag.color, tag.description);
    await delay(300);
  }

  // Tags de Timeline
  log('info', 'Creando tags de timeline...');
  tagsCreated.timeline = {};
  for (const tag of TAGS_TO_CREATE.timeline) {
    tagsCreated.timeline[tag.name] = await createTag(tag.name, tag.color, tag.description);
    await delay(300);
  }

  log('success', `Total de tags creados: ${Object.keys(tagsCreated.revista).length + Object.keys(tagsCreated.cualificacion).length + Object.keys(tagsCreated.timeline).length}`);

  return tagsCreated;
}

// ============================================================================
// CREACIÓN DE PIPELINES
// ============================================================================

async function createPipeline(pipelineData) {
  try {
    const response = await axios.post(
      `${GHL_API_URL}/locations/${GHL_LOCATION_ID}/pipelines`,
      {
        name: pipelineData.name,
        stages: pipelineData.stages.map(stage => ({ name: stage })),
        defaultTag: pipelineData.tag
      },
      { headers }
    );

    log('success', `Pipeline creado: ${pipelineData.name}`, { id: response.data.pipeline?.id });
    return response.data.pipeline;
  } catch (error) {
    if (error.response?.status === 409) {
      log('warn', `Pipeline ya existe: ${pipelineData.name}`);
      return { name: pipelineData.name };
    }
    log('error', `Error creando pipeline ${pipelineData.name}`, error.response?.data?.message || error.message);
    return null;
  }
}

async function createAllPipelines() {
  log('info', '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  log('info', 'FASE 1.3: Creando Pipelines (3 totales)');
  log('info', '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  const pipelinesCreated = {};

  for (const pipeline of PIPELINES_TO_CREATE) {
    pipelinesCreated[pipeline.tag] = await createPipeline(pipeline);
    await delay(300);
  }

  log('success', `Total de pipelines creados: ${Object.keys(pipelinesCreated).length}`);

  return pipelinesCreated;
}

// ============================================================================
// CREACIÓN DE CAMPOS PERSONALIZADOS
// ============================================================================

async function createCustomField(fieldData) {
  try {
    const response = await axios.post(
      `${GHL_API_URL}/locations/${GHL_LOCATION_ID}/custom-fields`,
      {
        name: fieldData.name,
        fieldType: fieldData.fieldType,
        required: fieldData.required,
        description: fieldData.description,
        options: fieldData.options || null
      },
      { headers }
    );

    log('success', `Campo personalizado creado: ${fieldData.name}`, { id: response.data.field?.id });
    return response.data.field;
  } catch (error) {
    if (error.response?.status === 409) {
      log('warn', `Campo ya existe: ${fieldData.name}`);
      return { name: fieldData.name };
    }
    log('error', `Error creando campo ${fieldData.name}`, error.response?.data?.message || error.message);
    return null;
  }
}

async function createAllCustomFields() {
  log('info', '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  log('info', 'FASE 1.4: Creando Campos Personalizados (8 totales)');
  log('info', '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  const fieldsCreated = {};

  for (const field of CUSTOM_FIELDS_TO_CREATE) {
    fieldsCreated[field.name] = await createCustomField(field);
    await delay(300);
  }

  log('success', `Total de campos creados: ${Object.keys(fieldsCreated).length}`);

  return fieldsCreated;
}

// ============================================================================
// GENERACIÓN DE REPORTES
// ============================================================================

function generateReport(results) {
  const report = {
    timestamp: new Date().toISOString(),
    ghlLocationId: GHL_LOCATION_ID,
    tagsCreated: results.tags,
    pipelinesCreated: results.pipelines,
    customFieldsCreated: results.customFields,
    summary: {
      totalTagsCreated: (Object.keys(results.tags.revista || {}).length +
                        Object.keys(results.tags.cualificacion || {}).length +
                        Object.keys(results.tags.timeline || {}).length),
      totalPipelinesCreated: Object.keys(results.pipelines || {}).length,
      totalCustomFieldsCreated: Object.keys(results.customFields || {}).length
    }
  };

  // Guardar reporte en JSON
  const reportPath = `${__dirname}/../GHL_SETUP_REPORT.json`;
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

  log('success', `Reporte guardado en: ${reportPath}`);

  return report;
}

// ============================================================================
// EJECUCIÓN PRINCIPAL
// ============================================================================

async function main() {
  console.log('\n');
  console.log(chalk.bold.blue('╔════════════════════════════════════════════════════════════════╗'));
  console.log(chalk.bold.blue('║                    GHL SETUP - FASE 1                         ║'));
  console.log(chalk.bold.blue('║        Integración GoHighLevel para Conecta Pesquisadores    ║'));
  console.log(chalk.bold.blue('╚════════════════════════════════════════════════════════════════╝'));
  console.log('\n');

  try {
    // 1. Validar conexión
    log('info', '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    log('info', 'FASE 1.1: Validando Conexión con GHL');
    log('info', '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    const isConnected = await validateConnection();
    if (!isConnected) {
      log('error', 'No se pudo conectar con GHL. Abortando...');
      process.exit(1);
    }

    await delay(1000);

    // 2. Crear tags
    const tagsResults = await createAllTags();
    await delay(1000);

    // 3. Crear pipelines
    const pipelinesResults = await createAllPipelines();
    await delay(1000);

    // 4. Crear campos personalizados
    const customFieldsResults = await createAllCustomFields();
    await delay(1000);

    // 5. Generar reporte
    log('info', '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    log('info', 'Generando Reporte Final');
    log('info', '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    const finalReport = generateReport({
      tags: tagsResults,
      pipelines: pipelinesResults,
      customFields: customFieldsResults
    });

    // 6. Resumen final
    console.log('\n');
    console.log(chalk.bold.green('╔════════════════════════════════════════════════════════════════╗'));
    console.log(chalk.bold.green('║                    ✅ FASE 1 COMPLETADA                       ║'));
    console.log(chalk.bold.green('╚════════════════════════════════════════════════════════════════╝'));
    console.log('\n');

    log('success', `Tags creados: ${finalReport.summary.totalTagsCreated}`);
    log('success', `Pipelines creados: ${finalReport.summary.totalPipelinesCreated}`);
    log('success', `Campos personalizados creados: ${finalReport.summary.totalCustomFieldsCreated}`);

    console.log('\n');
    log('info', 'Próximos pasos:');
    log('info', '1. Revisar GHL_SETUP_REPORT.json para verificar IDs');
    log('info', '2. Crear contacto de prueba en GHL');
    log('info', '3. Validar que la estructura está correcta');
    log('info', '4. Proceder a Fase 2: API Integration');
    console.log('\n');

  } catch (error) {
    log('error', 'Error inesperado en ejecución principal');
    log('error', error.message);
    process.exit(1);
  }
}

// Ejecutar
main();
