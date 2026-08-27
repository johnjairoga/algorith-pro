#!/usr/bin/env node

/**
 * Script: Verificar Estado Actual en GHL
 *
 * Trae información de GHL y compara con lo documentado en código.
 * Genera reporte de qué está en GHL vs qué está en código.
 *
 * Uso: node src/cli/verificar-estado-ghl.js
 *
 * Requisito: .env con GHL_LOCATION_ID y GHL_PIT_TOKEN
 */

import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const locationId = process.env.GHL_LOCATION_ID;
const pitToken = process.env.GHL_PIT_TOKEN;
const apiUrl = process.env.GHL_API_URL || 'https://rest.gohighlevel.com/v1';

if (!locationId || !pitToken) {
  console.error('❌ Error: GHL_LOCATION_ID y GHL_PIT_TOKEN requeridos en .env');
  process.exit(1);
}

const client = axios.create({
  baseURL: apiUrl,
  headers: {
    Authorization: `Bearer ${pitToken}`,
    'Content-Type': 'application/json',
    'Version': '2021-07-28'
  }
});

console.log('📋 Verificando estado actual en GHL...\n');

// ============================================================================
// 1. TRAER CAMPOS PERSONALIZADOS
// ============================================================================
async function getCustomFields() {
  console.log('🔍 Trayendo campos personalizados...');
  try {
    const response = await client.get(`/locations/${locationId}/custom-fields`);
    const fields = response.data?.customFields || response.data || [];

    console.log(`   ✅ Encontrados ${fields.length} campos\n`);
    return fields;
  } catch (error) {
    console.error(`   ❌ Error:`, error.response?.data || error.message);
    return [];
  }
}

// ============================================================================
// 2. TRAER PIPELINES/FUNIS
// ============================================================================
async function getPipelines() {
  console.log('🔍 Trayendo funis (pipelines)...');
  try {
    const response = await client.get(`/opportunities/pipelines`);
    const pipelines = response.data?.pipelines || response.data || [];

    console.log(`   ✅ Encontrados ${pipelines.length} funis\n`);
    return pipelines;
  } catch (error) {
    console.error(`   ❌ Error:`, error.response?.data || error.message);
    return [];
  }
}

// ============================================================================
// 3. TRAER TAGS
// ============================================================================
async function getTags() {
  console.log('🔍 Trayendo tags...');
  try {
    const response = await client.get(`/locations/${locationId}/tags`);
    const tags = response.data?.tags || response.data || [];

    console.log(`   ✅ Encontradas ${tags.length} tags\n`);
    return tags;
  } catch (error) {
    console.error(`   ❌ Error:`, error.response?.data || error.message);
    return [];
  }
}

// ============================================================================
// 4. TRAER CALENDARIOS
// ============================================================================
async function getCalendars() {
  console.log('🔍 Trayendo calendarios...');
  try {
    const response = await client.get(`/calendars`);
    const calendars = response.data?.calendars || response.data || [];

    console.log(`   ✅ Encontrados ${calendars.length} calendarios\n`);
    return calendars;
  } catch (error) {
    console.error(`   ❌ Error:`, error.response?.data || error.message);
    return [];
  }
}

// ============================================================================
// 5. TRAER WORKFLOWS
// ============================================================================
async function getWorkflows() {
  console.log('🔍 Trayendo workflows (automatizaciones)...');
  try {
    const response = await client.get(`/locations/${locationId}/workflows`);
    const workflows = response.data?.workflows || response.data || [];

    console.log(`   ✅ Encontrados ${workflows.length} workflows\n`);
    return workflows;
  } catch (error) {
    console.error(`   ❌ Error:`, error.response?.data || error.message);
    return [];
  }
}

// ============================================================================
// GENERAR REPORTE
// ============================================================================
async function main() {
  const fields = await getCustomFields();
  const pipelines = await getPipelines();
  const tags = await getTags();
  const calendars = await getCalendars();
  const workflows = await getWorkflows();

  console.log('\n' + '='.repeat(80));
  console.log('📊 REPORTE DE ESTADO EN GHL');
  console.log('='.repeat(80) + '\n');

  // ========== CAMPOS PERSONALIZADOS ==========
  console.log('## 1️⃣ CAMPOS PERSONALIZADOS (Contact + Opportunity)\n');

  const contactFields = fields.filter(f => f.model === 'contact' || f.entityType === 'CONTACT');
  const opportunityFields = fields.filter(f => f.model === 'opportunity' || f.entityType === 'OPPORTUNITY');

  console.log(`**En Contact:** ${contactFields.length} campos`);
  contactFields.forEach(f => {
    const displayName = f.displayName || f.name;
    console.log(`  - ${displayName} (${f.dataType || f.type})`);
  });

  console.log(`\n**En Opportunity:** ${opportunityFields.length} campos`);
  opportunityFields.forEach(f => {
    const displayName = f.displayName || f.name;
    console.log(`  - ${displayName} (${f.dataType || f.type})`);
  });

  console.log(`\n**Total campos:** ${fields.length}\n`);

  // ========== FUNIS ==========
  console.log('\n## 2️⃣ FUNIS (PIPELINES)\n');
  pipelines.forEach(p => {
    console.log(`📌 ${p.name || p.displayName}`);
    const stages = p.stages || [];
    stages.forEach(s => {
      console.log(`   - ${s.name || s.label}`);
    });
  });
  console.log(`\n**Total funis:** ${pipelines.length}\n`);

  // ========== TAGS ==========
  console.log('\n## 3️⃣ TAGS\n');
  tags.forEach(t => {
    console.log(`  - ${t.name || t.tag}`);
  });
  console.log(`\n**Total tags:** ${tags.length}\n`);

  // ========== CALENDARIOS ==========
  console.log('\n## 4️⃣ CALENDARIOS\n');
  calendars.forEach(c => {
    const type = c.calendarType || c.type || 'unknown';
    const members = c.teamMembers || c.eventAssignees || [];
    console.log(`📅 ${c.name}`);
    console.log(`   Tipo: ${type}`);
    console.log(`   Miembros: ${members.length}`);
  });
  console.log(`\n**Total calendarios:** ${calendars.length}\n`);

  // ========== WORKFLOWS ==========
  console.log('\n## 5️⃣ WORKFLOWS (AUTOMATIZACIONES)\n');
  workflows.forEach(w => {
    const status = w.isActive || w.status === 'active' ? '✅' : '⏸️';
    console.log(`${status} ${w.name}`);
  });
  console.log(`\n**Total workflows:** ${workflows.length}\n`);

  // ========== VERIFICACIONES ESPECÍFICAS ==========
  console.log('\n' + '='.repeat(80));
  console.log('🔍 VERIFICACIONES ESPECÍFICAS');
  console.log('='.repeat(80) + '\n');

  // Verificar campos de cobranza
  console.log('### Campos de Cobranza (nuevos hoy?)');
  const cobFields = ['CPF', 'ID Cliente Asaas', 'Plano Contratado', 'Valor do Repasse', 'ID Assinatura Asaas', 'Status do Pagamento'];
  cobFields.forEach(fieldName => {
    const exists = fields.some(f => (f.displayName || f.name).includes(fieldName));
    const marker = exists ? '✅' : '❌';
    console.log(`${marker} ${fieldName}`);
  });

  // Verificar etágio "Conversa por áudio"
  console.log('\n### Etágio "Conversa por áudio" en Funil Comercial');
  const comercialPipeline = pipelines.find(p => (p.name || '').includes('Comercial'));
  if (comercialPipeline) {
    const stages = comercialPipeline.stages || [];
    const audioStage = stages.find(s => (s.name || s.label || '').includes('áudio'));
    if (audioStage) {
      console.log(`✅ Encontrado: "${audioStage.name || audioStage.label}"`);
      console.log(`   → Necesita renombrar a: "Ligação/Reunião"`);
    } else {
      console.log(`❌ No encontrado`);
    }
  }

  // Verificar calendarios round-robin
  console.log('\n### Calendario "Personal Trainer Disponível"');
  const ptCalendar = calendars.find(c => c.name.includes('Personal Trainer Disponível'));
  if (ptCalendar) {
    console.log(`✅ Existe`);
    console.log(`   Tipo: ${ptCalendar.calendarType || ptCalendar.type}`);
    const members = ptCalendar.teamMembers || [];
    console.log(`   Miembros: ${members.length}`);
    if (members.length > 0) {
      console.log(`   IDs: ${members.map(m => m.userId || m.id).join(', ')}`);
    }
  } else {
    console.log(`❌ No encontrado`);
  }

  // Verificar workflows en borrador
  console.log('\n### Estado de Workflows');
  const draftWorkflows = workflows.filter(w => !w.isActive && w.status !== 'active');
  console.log(`En borrador: ${draftWorkflows.length}`);
  draftWorkflows.forEach(w => console.log(`  ⏸️ ${w.name}`));

  console.log('\n' + '='.repeat(80) + '\n');
  console.log('✅ Verificación completada.\n');
}

main().catch(err => {
  console.error('❌ Error fatal:', err.message);
  process.exit(1);
});
