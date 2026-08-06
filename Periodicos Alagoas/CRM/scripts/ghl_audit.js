#!/usr/bin/env node

/**
 * GHL AUDIT SCRIPT
 * Obtiene información completa de la cuenta de GHL
 *
 * Funcionalidad:
 * - Conecta con GHL API
 * - Obtiene información de la ubicación
 * - Lista todos los tags
 * - Lista todos los pipelines
 * - Lista todos los campos personalizados
 * - Genera reporte detallado
 *
 * Uso: node ghl_audit.js
 */

require('dotenv').config();

const axios = require('axios');
const chalk = require('chalk');
const fs = require('fs');

// ============================================================================
// CONFIGURACIÓN
// ============================================================================

const GHL_API_TOKEN = process.env.GHL_PIT_TOKEN || 'pit-fa036e1b-49a8-442d-99ff-cd86cc3ec5d5';
const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID || 'XuChmr0YIHg823jqvZTN';
const GHL_API_URL = 'https://services.leadconnectorhq.com/v1';

const headers = {
  'Authorization': `Bearer ${GHL_API_TOKEN}`,
  'Content-Type': 'application/json',
  'Accept': 'application/json'
};

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
    case 'header':
      console.log(chalk.bold.cyan(`\n${prefix} ${message}\n`));
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
  log('info', 'Conectando con GHL...');

  try {
    const response = await axios.get(
      `${GHL_API_URL}/locations/${GHL_LOCATION_ID}`,
      { headers }
    );

    const location = response.data.location || {};

    log('success', 'Conexión exitosa');

    return {
      id: location.id,
      name: location.name || 'N/A',
      email: location.email || 'N/A',
      address: location.address || 'N/A',
      timezone: location.timezone || 'N/A',
      status: 'Connected'
    };
  } catch (error) {
    log('error', 'Error de conexión', error.response?.data?.message || error.message);
    return null;
  }
}

// ============================================================================
// OBTENER TAGS
// ============================================================================

async function getTags() {
  log('info', 'Obteniendo tags...');

  try {
    const response = await axios.get(
      `${GHL_API_URL}/locations/${GHL_LOCATION_ID}/tags`,
      { headers }
    );

    const tags = response.data.tags || [];

    log('success', `${tags.length} tags encontrados`);

    return tags.map(tag => ({
      id: tag.id,
      name: tag.name,
      color: tag.color || '#000000',
      description: tag.description || 'N/A'
    }));
  } catch (error) {
    log('warn', 'No se pudieron obtener tags', error.response?.data?.message || error.message);
    return [];
  }
}

// ============================================================================
// OBTENER PIPELINES
// ============================================================================

async function getPipelines() {
  log('info', 'Obteniendo pipelines...');

  try {
    const response = await axios.get(
      `${GHL_API_URL}/locations/${GHL_LOCATION_ID}/pipelines`,
      { headers }
    );

    const pipelines = response.data.pipelines || [];

    log('success', `${pipelines.length} pipelines encontrados`);

    return pipelines.map(pipeline => ({
      id: pipeline.id,
      name: pipeline.name,
      stages: (pipeline.stages || []).map(stage => ({
        id: stage.id,
        name: stage.name
      })),
      stageCount: pipeline.stages ? pipeline.stages.length : 0
    }));
  } catch (error) {
    log('warn', 'No se pudieron obtener pipelines', error.response?.data?.message || error.message);
    return [];
  }
}

// ============================================================================
// OBTENER CAMPOS PERSONALIZADOS
// ============================================================================

async function getCustomFields() {
  log('info', 'Obteniendo campos personalizados...');

  try {
    const response = await axios.get(
      `${GHL_API_URL}/locations/${GHL_LOCATION_ID}/custom-fields`,
      { headers }
    );

    const fields = response.data.customFields || [];

    log('success', `${fields.length} campos encontrados`);

    return fields.map(field => ({
      id: field.id,
      name: field.name,
      fieldType: field.fieldType || field.type,
      required: field.required || false,
      options: field.options || []
    }));
  } catch (error) {
    log('warn', 'No se pudieron obtener campos personalizados', error.response?.data?.message || error.message);
    return [];
  }
}

// ============================================================================
// OBTENER CONTACTOS (MUESTRA)
// ============================================================================

async function getContactsSample() {
  log('info', 'Obteniendo muestra de contactos...');

  try {
    const response = await axios.get(
      `${GHL_API_URL}/locations/${GHL_LOCATION_ID}/contacts?limit=5`,
      { headers }
    );

    const contacts = response.data.contacts || [];

    log('success', `Muestra: ${contacts.length} contactos`);

    return {
      totalInDatabase: response.data.meta?.total || 'N/A',
      sampleSize: contacts.length,
      contacts: contacts.map(contact => ({
        id: contact.id,
        firstName: contact.firstName || 'N/A',
        lastName: contact.lastName || 'N/A',
        email: contact.email || 'N/A',
        phone: contact.phone || 'N/A',
        tags: contact.tags || []
      }))
    };
  } catch (error) {
    log('warn', 'No se pudieron obtener contactos', error.response?.data?.message || error.message);
    return { totalInDatabase: 0, sampleSize: 0, contacts: [] };
  }
}

// ============================================================================
// GENERAR REPORTE
// ============================================================================

function generateReport(data) {
  const report = {
    timestamp: new Date().toISOString(),
    ghlLocationId: GHL_LOCATION_ID,
    account: data.account,
    summary: {
      totalTags: data.tags.length,
      totalPipelines: data.pipelines.length,
      totalCustomFields: data.customFields.length,
      totalContacts: data.contacts.totalInDatabase
    },
    data: {
      tags: data.tags,
      pipelines: data.pipelines,
      customFields: data.customFields,
      contactsSample: data.contacts
    }
  };

  // Guardar reporte en JSON
  const reportPath = `${__dirname}/../reports/ghl_audit_${new Date().toISOString().split('T')[0]}.json`;

  // Crear carpeta reports si no existe
  const reportsDir = `${__dirname}/../reports`;
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }

  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

  log('success', `Reporte guardado: ${reportPath}`);

  return report;
}

// ============================================================================
// GENERAR MARKDOWN REPORT
// ============================================================================

function generateMarkdownReport(report) {
  const md = `# 📊 REPORTE DE AUDITORÍA GHL
## Periodicos Alagoas - Cuenta de GHL

**Generado:** ${new Date(report.timestamp).toLocaleString('es-ES')}
**Location ID:** \`${report.ghlLocationId}\`

---

## 📍 INFORMACIÓN DE LA CUENTA

| Campo | Valor |
|-------|-------|
| **Nombre** | ${report.account.name} |
| **Email** | ${report.account.email} |
| **Dirección** | ${report.account.address} |
| **Zona Horaria** | ${report.account.timezone} |
| **Estado** | ${report.account.status} |

---

## 📊 RESUMEN GENERAL

| Elemento | Cantidad |
|----------|----------|
| **Tags** | ${report.summary.totalTags} |
| **Pipelines** | ${report.summary.totalPipelines} |
| **Campos Personalizados** | ${report.summary.totalCustomFields} |
| **Contactos en Base de Datos** | ${report.summary.totalContacts} |

---

## 🏷️ TAGS (${report.summary.totalTags} totales)

\`\`\`
${report.data.tags.map(tag => `• ${tag.name} (Color: ${tag.color})`).join('\n')}
\`\`\`

${report.data.tags.length === 0 ? '⚠️ **No hay tags creados aún**' : ''}

---

## 📋 PIPELINES (${report.summary.totalPipelines} totales)

${report.data.pipelines.map((pipeline, idx) => `
### ${idx + 1}. ${pipeline.name}

**Etapas:** ${pipeline.stageCount}

\`\`\`
${pipeline.stages.map(stage => \`• \${stage.name}\`).join('\n')}
\`\`\`
`).join('\n')}

${report.data.pipelines.length === 0 ? '⚠️ **No hay pipelines creados aún**' : ''}

---

## 📝 CAMPOS PERSONALIZADOS (${report.summary.totalCustomFields} totales)

${report.data.customFields.map((field, idx) => `
### ${idx + 1}. ${field.name}

| Propiedad | Valor |
|-----------|-------|
| **Tipo** | \`${field.fieldType}\` |
| **Requerido** | ${field.required ? '✅ Sí' : '❌ No'} |
| **Opciones** | ${field.options.length > 0 ? field.options.join(', ') : 'N/A'} |
`).join('\n')}

${report.data.customFields.length === 0 ? '⚠️ **No hay campos personalizados creados aún**' : ''}

---

## 👥 MUESTRA DE CONTACTOS

**Total de contactos en base de datos:** ${report.data.contactsSample.totalInDatabase}

${report.data.contactsSample.contacts.length > 0 ? `
**Primeros ${report.data.contactsSample.sampleSize} contactos:**

${report.data.contactsSample.contacts.map((contact, idx) => `
### ${idx + 1}. ${contact.firstName} ${contact.lastName}

| Campo | Valor |
|-------|-------|
| **Email** | ${contact.email} |
| **Teléfono** | ${contact.phone} |
| **Tags** | ${contact.tags.length > 0 ? contact.tags.join(', ') : 'Sin tags'} |
`).join('\n')}
` : '⚠️ **No hay contactos en la base de datos**'}

---

## ✅ ESTADO DE LA CUENTA

### Verificación de Configuración Requerida

- [${report.summary.totalTags === 9 ? 'x' : ' '}] 9 tags creados (Fase 1)
- [${report.summary.totalPipelines === 3 ? 'x' : ' '}] 3 pipelines creados (Fase 1)
- [${report.summary.totalCustomFields === 8 ? 'x' : ' '}] 8 campos personalizados creados (Fase 1)
- [${report.summary.totalContacts > 0 ? 'x' : ' '}] Contactos siendo capturados

---

## 🎯 PRÓXIMOS PASOS

${report.summary.totalTags === 0 ? `
1. ❌ **Fase 1 No Completada**
   - Falta crear los tags
   - Falta crear los pipelines
   - Falta crear los campos personalizados

   **Acción:** Ejecutar \`npm run setup\` o \`run_setup.bat\`
` : `
1. ✅ **Fase 1 Completada**
   - Tags creados: ${report.summary.totalTags}
   - Pipelines creados: ${report.summary.totalPipelines}
   - Campos creados: ${report.summary.totalCustomFields}

   **Acción:** Proceder a Fase 2 (Integración API)
`}

---

**Reporte generado automáticamente por GHL Audit Script**
*Conecta Pesquisadores UFAL — Agosto 2026*
`;

  // Guardar markdown
  const mdPath = `${__dirname}/../reports/ghl_audit_${new Date().toISOString().split('T')[0]}.md`;
  fs.writeFileSync(mdPath, md);

  log('success', `Reporte Markdown guardado: ${mdPath}`);

  return md;
}

// ============================================================================
// EJECUCIÓN PRINCIPAL
// ============================================================================

async function main() {
  console.log('\n');
  console.log(chalk.bold.blue('╔════════════════════════════════════════════════════════════════╗'));
  console.log(chalk.bold.blue('║                    GHL AUDIT - REPORTE DE CUENTA              ║'));
  console.log(chalk.bold.blue('║              Periodicos Alagoas - Conecta Pesquisadores      ║'));
  console.log(chalk.bold.blue('╚════════════════════════════════════════════════════════════════╝'));
  console.log('\n');

  try {
    log('header', 'PASO 1: VALIDANDO CONEXIÓN');
    const account = await validateConnection();
    if (!account) {
      log('error', 'No se pudo conectar con GHL. Abortando...');
      process.exit(1);
    }

    await delay(500);

    log('header', 'PASO 2: OBTENIENDO INFORMACIÓN');

    const tags = await getTags();
    await delay(300);

    const pipelines = await getPipelines();
    await delay(300);

    const customFields = await getCustomFields();
    await delay(300);

    const contacts = await getContactsSample();
    await delay(300);

    // Generar reporte
    log('header', 'PASO 3: GENERANDO REPORTES');

    const report = generateReport({
      account,
      tags,
      pipelines,
      customFields,
      contacts
    });

    const md = generateMarkdownReport(report);

    // Mostrar resumen en consola
    log('header', 'RESUMEN DE LA CUENTA');

    console.log(chalk.bold.cyan('\n📊 DATOS GENERALES'));
    console.log(`   Nombre: ${account.name}`);
    console.log(`   Email: ${account.email}`);
    console.log(`   Zona Horaria: ${account.timezone}`);

    console.log(chalk.bold.cyan('\n📈 ESTADÍSTICAS'));
    console.log(`   Tags: ${tags.length}`);
    console.log(`   Pipelines: ${pipelines.length}`);
    console.log(`   Campos Personalizados: ${customFields.length}`);
    console.log(`   Contactos: ${contacts.totalInDatabase}`);

    if (tags.length > 0) {
      console.log(chalk.bold.cyan('\n🏷️  TAGS'));
      tags.forEach(tag => {
        console.log(`   • ${tag.name} (${tag.color})`);
      });
    }

    if (pipelines.length > 0) {
      console.log(chalk.bold.cyan('\n📋 PIPELINES'));
      pipelines.forEach((pipeline, idx) => {
        console.log(`   ${idx + 1}. ${pipeline.name} (${pipeline.stageCount} etapas)`);
      });
    }

    if (customFields.length > 0) {
      console.log(chalk.bold.cyan('\n📝 CAMPOS PERSONALIZADOS'));
      customFields.forEach((field, idx) => {
        console.log(`   ${idx + 1}. ${field.name} (${field.fieldType})${field.required ? ' *' : ''}`);
      });
    }

    console.log('\n');
    console.log(chalk.bold.green('╔════════════════════════════════════════════════════════════════╗'));
    console.log(chalk.bold.green('║                    ✅ AUDITORÍA COMPLETADA                   ║'));
    console.log(chalk.bold.green('╚════════════════════════════════════════════════════════════════╝'));
    console.log('\n');

    log('info', 'Reportes generados en carpeta: reports/');
    log('info', '  • Formato JSON: ghl_audit_YYYY-MM-DD.json');
    log('info', '  • Formato Markdown: ghl_audit_YYYY-MM-DD.md');

    console.log('\n');

  } catch (error) {
    log('error', 'Error inesperado');
    console.error(error);
    process.exit(1);
  }
}

// Ejecutar
main();
