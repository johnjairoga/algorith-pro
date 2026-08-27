#!/usr/bin/env node
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const LOCATION_ID = process.env.GHL_LOCATION_ID;
const PIT = process.env.GHL_PIT_TOKEN;

async function diagnostico() {
  console.log('\n███████████████████████████████████████████');
  console.log('█  🔍 DIAGNÓSTICO: Estado de GHL         █');
  console.log('███████████████████████████████████████████\n');

  const headersV2 = {
    'Authorization': `Bearer ${PIT}`,
    'Content-Type': 'application/json',
    'Version': '2021-07-28'
  };

  // TEST 1: Custom Fields de Oportunidades
  console.log('TEST 1: Campos Personalizados (Oportunidades)\n');
  try {
    const res = await axios.get(
      `https://services.leadconnectorhq.com/locations/${LOCATION_ID}/customFields/search`,
      { headers: headersV2, params: { skip: 0, limit: 100, documentType: 'field', model: 'opportunity' } }
    );
    const fields = res.data.customFields || [];
    console.log(`✅ ${fields.length} campos encontrados`);
    if (fields.length > 0) {
      console.log(`   Ejemplos: ${fields.slice(0, 3).map(f => f.name).join(', ')}`);
    }
  } catch (e) {
    console.log(`❌ Error: ${e.response?.status} - ${e.response?.data?.message || e.message}`);
  }
  console.log('');

  // TEST 2: Custom Fields de Contactos
  console.log('TEST 2: Campos Personalizados (Contactos)\n');
  try {
    const res = await axios.get(
      `https://services.leadconnectorhq.com/locations/${LOCATION_ID}/customFields/search`,
      { headers: headersV2, params: { skip: 0, limit: 100, documentType: 'field', model: 'contact' } }
    );
    const fields = res.data.customFields || [];
    console.log(`✅ ${fields.length} campos encontrados`);
    if (fields.length > 0) {
      console.log(`   Ejemplos: ${fields.slice(0, 3).map(f => f.name).join(', ')}`);
    }
  } catch (e) {
    console.log(`❌ Error: ${e.response?.status} - ${e.response?.data?.message || e.message}`);
  }
  console.log('');

  // TEST 3: Carpetas
  console.log('TEST 3: Carpetas de Campos\n');
  try {
    const res = await axios.get(
      `https://services.leadconnectorhq.com/locations/${LOCATION_ID}/customFields/search`,
      { headers: headersV2, params: { skip: 0, limit: 100, documentType: 'folder', model: 'all' } }
    );
    const folders = res.data.customFieldFolders || [];
    console.log(`✅ ${folders.length} carpetas encontradas`);
    folders.forEach(f => console.log(`   📁 ${f.name}`));
  } catch (e) {
    console.log(`❌ Error: ${e.response?.status} - ${e.response?.data?.message || e.message}`);
  }
  console.log('');

  // TEST 4: Pipelines
  console.log('TEST 4: Pipelines en GHL\n');
  try {
    const res = await axios.get(
      'https://rest.gohighlevel.com/v1/opportunities/pipelines',
      { headers: headersV2, params: { locationId: LOCATION_ID } }
    );
    const pipelines = res.data.pipelines || [];
    console.log(`✅ ${pipelines.length} pipelines encontradas`);
    pipelines.forEach(p => console.log(`   📊 ${p.name} (${p.stages?.length || 0} stages)`));
  } catch (e) {
    if (e.response?.status === 404) {
      console.log('❌ NO hay pipelines (404)');
      console.log('   → Necesitas crearlas manualmente en GHL Console');
    } else {
      console.log(`❌ Error: ${e.response?.status} - ${e.response?.data?.msg || e.message}`);
    }
  }
  console.log('');

  console.log('═════════════════════════════════════════════');
  console.log('\n📊 RESUMEN EJECUTIVO:\n');
}

diagnostico();
