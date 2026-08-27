#!/usr/bin/env node
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const LOCATION_ID = process.env.GHL_LOCATION_ID;
const PIT = process.env.GHL_PIT_TOKEN;

async function diagnostico() {
  try {
    console.log('\n');
    console.log('█████████████████████████████████████████████████████');
    console.log('█  🔍 DIAGNÓSTICO: Estado actual de GHL            █');
    console.log('█████████████████████████████████████████████████████\n');

    const headers = {
      'Authorization': `Bearer ${PIT}`,
      'Content-Type': 'application/json'
    };

    // TEST 1: Verificar Location
    console.log('TEST 1: ¿Existe la ubicación?\n');
    try {
      const locationResp = await axios.get(
        `https://rest.gohighlevel.com/v1/locations/${LOCATION_ID}`,
        { headers }
      );
      console.log('✅ Ubicación encontrada');
      console.log(`   Nombre: ${locationResp.data.location?.name || 'N/A'}\n`);
    } catch (err) {
      console.log(`❌ Ubicación NO encontrada: ${err.response?.status}\n`);
      return;
    }

    // TEST 2: Verificar Pipelines
    console.log('TEST 2: ¿Existen pipelines?\n');
    try {
      const pipelineResp = await axios.get(
        'https://rest.gohighlevel.com/v1/opportunities/pipelines',
        { headers, params: { locationId: LOCATION_ID } }
      );
      const pipelines = pipelineResp.data.pipelines || [];
      console.log(`✅ Encontradas ${pipelines.length} pipelines`);
      pipelines.forEach(p => console.log(`   📊 ${p.name} (${p.stages?.length || 0} stages)`));
      console.log('');
    } catch (err) {
      if (err.response?.status === 404) {
        console.log('❌ NO hay pipelines (404 Not Found)');
        console.log('   → Las pipelines deben crearse MANUALMENTE en GHL Console\n');
      } else {
        console.log(`❌ Error: ${err.response?.data?.msg || err.message}\n`);
      }
    }

    // TEST 3: Verificar Custom Fields (Oportunidades)
    console.log('TEST 3: ¿Existen campos personalizados (Oportunidades)?\n');
    try {
      const fieldsResp = await axios.get(
        `https://services.leadconnectorhq.com/locations/${LOCATION_ID}/customFields/search`,
        {
          headers: {
            ...headers,
            'Version': '2021-07-28'
          },
          params: {
            skip: 0,
            limit: 100,
            documentType: 'field',
            model: 'opportunity'
          }
        }
      );
      const fields = fieldsResp.data.customFields || [];
      console.log(`✅ Encontrados ${fields.length} campos de oportunidades`);
      if (fields.length > 0) {
        fields.slice(0, 5).forEach(f => console.log(`   🔧 ${f.name}`));
        if (fields.length > 5) console.log(`   ... y ${fields.length - 5} más`);
      }
      console.log('');
    } catch (err) {
      console.log(`❌ Error: ${err.response?.data?.message || err.message}\n`);
    }

    // TEST 4: Verificar Carpetas
    console.log('TEST 4: ¿Existen carpetas de campos?\n');
    try {
      const foldersResp = await axios.get(
        `https://services.leadconnectorhq.com/locations/${LOCATION_ID}/customFields/search`,
        {
          headers: {
            ...headers,
            'Version': '2021-07-28'
          },
          params: {
            skip: 0,
            limit: 100,
            documentType: 'folder',
            model: 'all'
          }
        }
      );
      const folders = foldersResp.data.customFieldFolders || [];
      console.log(`✅ Encontradas ${folders.length} carpetas`);
      folders.forEach(f => console.log(`   📁 ${f.name}`));
      console.log('');
    } catch (err) {
      console.log(`❌ Error: ${err.response?.data?.message || err.message}\n`);
    }

    console.log('═══════════════════════════════════════════════════════\n');
    console.log('📋 CONCLUSIÓN:\n');
    console.log('Estado actual del proyecto:\n');
    console.log('1️⃣  Campos Personalizados: VERIFICAR en TEST 3 arriba');
    console.log('2️⃣  Pipelines: Si ves ❌, necesitas crear manualmente en GHL');
    console.log('3️⃣  Carpetas: VERIFICAR en TEST 4 arriba\n');

  } catch (error) {
    console.error('\n❌ ERROR GENERAL:', error.message);
  }
}

diagnostico();
