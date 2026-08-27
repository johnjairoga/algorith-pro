#!/usr/bin/env node
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const LOCATION_ID = process.env.GHL_LOCATION_ID;
const PIT = process.env.GHL_PIT_TOKEN;
const API_BASE = 'https://services.leadconnectorhq.com';

async function extraerCarpetas() {
  try {
    console.log('\n🔍 EXTRAYENDO IDs DE CARPETAS...\n');

    const headers = {
      'Authorization': `Bearer ${PIT}`,
      'Content-Type': 'application/json',
      'Version': '2021-07-28'
    };

    const response = await axios.get(
      `${API_BASE}/locations/${LOCATION_ID}/customFields/search`,
      {
        headers,
        params: {
          skip: 0,
          limit: 100,
          documentType: 'folder',
          model: 'all'
        }
      }
    );

    const carpetas = response.data.customFieldFolders || [];

    console.log(`✅ Encontradas ${carpetas.length} carpetas:\n`);

    const idMap = {};

    carpetas.forEach(carpeta => {
      console.log(`📁 ${carpeta.name}`);
      console.log(`   ID: ${carpeta.id}`);
      console.log(`   Campos: ${carpeta.totalFields || 0}\n`);
      idMap[carpeta.name] = carpeta.id;
    });

    // Salida en JSON para copiar fácilmente
    console.log('═══════════════════════════════════════════════════════\n');
    console.log('📋 JSON PARA COPIAR A TU CONFIG:\n');
    console.log(JSON.stringify(idMap, null, 2));
    console.log('\n═══════════════════════════════════════════════════════\n');

    return idMap;

  } catch (error) {
    console.error('❌ ERROR:', error.response?.data || error.message);
    process.exit(1);
  }
}

extraerCarpetas();
