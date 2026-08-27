#!/usr/bin/env node

/**
 * Script: Verificar Campos Personalizados Reales en GHL
 *
 * Usa el endpoint correcto para traer custom fields de Contact y Opportunity.
 *
 * Uso: node src/cli/verificar-campos-reales.js
 *
 * Requisito: .env con GHL_LOCATION_ID y GHL_PIT_TOKEN
 */

import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const locationId = process.env.GHL_LOCATION_ID;
const pitToken = process.env.GHL_PIT_TOKEN;

if (!locationId || !pitToken) {
  console.error('❌ Error: GHL_LOCATION_ID y GHL_PIT_TOKEN requeridos en .env');
  process.exit(1);
}

const client = axios.create({
  headers: {
    'Accept': 'application/json',
    'Authorization': `Bearer ${pitToken}`,
    'Version': '2021-07-28'
  }
});

console.log('📋 Verificando campos personalizados en GHL...\n');
console.log(`📍 Location ID: ${locationId}\n`);

// ============================================================================
// TRAER CAMPOS DE CONTACT
// ============================================================================
async function getContactFields() {
  console.log('🔍 Trayendo campos de CONTACT...');
  try {
    const url = `https://services.leadconnectorhq.com/locations/${locationId}/customFields?model=contact`;
    const response = await client.get(url);

    const fields = response.data?.customFields || response.data || [];
    console.log(`   ✅ Encontrados ${fields.length} campos\n`);
    return fields;
  } catch (error) {
    console.error(`   ❌ Error:`, error.response?.data || error.message);
    return [];
  }
}

// ============================================================================
// TRAER CAMPOS DE OPPORTUNITY
// ============================================================================
async function getOpportunityFields() {
  console.log('🔍 Trayendo campos de OPPORTUNITY...');
  try {
    const url = `https://services.leadconnectorhq.com/locations/${locationId}/customFields?model=opportunity`;
    const response = await client.get(url);

    const fields = response.data?.customFields || response.data || [];
    console.log(`   ✅ Encontrados ${fields.length} campos\n`);
    return fields;
  } catch (error) {
    console.error(`   ❌ Error:`, error.response?.data || error.message);
    return [];
  }
}

// ============================================================================
// GENERAR REPORTE
// ============================================================================
async function main() {
  const contactFields = await getContactFields();
  const opportunityFields = await getOpportunityFields();

  console.log('\n' + '='.repeat(80));
  console.log('📊 CAMPOS PERSONALIZADOS EN GHL');
  console.log('='.repeat(80) + '\n');

  // ========== CAMPOS DE CONTACT ==========
  console.log('## 📌 CAMPOS DE CONTACT\n');

  if (contactFields.length === 0) {
    console.log('❌ No hay campos en Contact\n');
  } else {
    contactFields.forEach(f => {
      const name = f.name || f.displayName || 'unknown';
      const type = f.dataType || f.type || 'unknown';
      console.log(`  ✅ ${name}`);
      console.log(`     Tipo: ${type}`);
      console.log(`     ID: ${f.id || 'N/A'}`);
      if (f.description) console.log(`     Descripción: ${f.description}`);
      console.log('');
    });
  }

  // ========== CAMPOS DE OPPORTUNITY ==========
  console.log('## 📌 CAMPOS DE OPPORTUNITY\n');

  if (opportunityFields.length === 0) {
    console.log('❌ No hay campos en Opportunity\n');
  } else {
    opportunityFields.forEach(f => {
      const name = f.name || f.displayName || 'unknown';
      const type = f.dataType || f.type || 'unknown';
      console.log(`  ✅ ${name}`);
      console.log(`     Tipo: ${type}`);
      console.log(`     ID: ${f.id || 'N/A'}`);
      if (f.description) console.log(`     Descripción: ${f.description}`);
      console.log('');
    });
  }

  // ========== VERIFICACIONES ESPECÍFICAS ==========
  console.log('\n' + '='.repeat(80));
  console.log('🔍 VERIFICACIONES DE CAMBIOS REPORTADOS');
  console.log('='.repeat(80) + '\n');

  // Verificar campos de cobranza
  console.log('### Campos de Cobranza (¿existen?)');
  const cobFieldNames = ['CPF', 'ID Cliente Asaas', 'Plano Contratado', 'Valor do Repasse', 'ID Assinatura Asaas', 'Status do Pagamento'];

  cobFieldNames.forEach(fieldName => {
    const existsInContact = contactFields.some(f =>
      (f.name || f.displayName || '').toLowerCase().includes(fieldName.toLowerCase())
    );
    const existsInOpp = opportunityFields.some(f =>
      (f.name || f.displayName || '').toLowerCase().includes(fieldName.toLowerCase())
    );

    if (existsInContact) {
      console.log(`  ✅ ${fieldName} (Contact)`);
    } else if (existsInOpp) {
      console.log(`  ✅ ${fieldName} (Opportunity)`);
    } else {
      console.log(`  ❌ ${fieldName} (NO encontrado)`);
    }
  });

  // Verificar cambios de nombre
  console.log('\n### Cambios de Nombre de Campos');
  const origenField = [...contactFields, ...opportunityFields].find(f =>
    (f.name || f.displayName || '').includes('origem') || (f.name || f.displayName || '').includes('origen')
  );
  if (origenField) {
    console.log(`  ✅ Campo "Origen": ${origenField.displayName || origenField.name}`);
  } else {
    console.log(`  ❌ Campo "Origen" NO encontrado`);
  }

  console.log('\n' + '='.repeat(80) + '\n');
  console.log('✅ Verificación completada.\n');

  // ========== RESUMEN ==========
  console.log('## 📊 RESUMEN\n');
  console.log(`Total campos Contact: ${contactFields.length}`);
  console.log(`Total campos Opportunity: ${opportunityFields.length}`);
  console.log(`Total campos: ${contactFields.length + opportunityFields.length}\n`);
}

main().catch(err => {
  console.error('❌ Error fatal:', err.message);
  process.exit(1);
});
