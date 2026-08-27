#!/usr/bin/env node
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const LOCATION_ID = process.env.GHL_LOCATION_ID;
const PIT = process.env.GHL_PIT_TOKEN;
const API_BASE = 'https://services.leadconnectorhq.com';

async function extraerTodasCarpetas() {
  try {
    console.log('\n🔍 EXTRAYENDO TODAS las carpetas (incluyendo estándar)...\n');

    const headers = {
      'Authorization': `Bearer ${PIT}`,
      'Content-Type': 'application/json',
      'Version': '2021-07-28'
    };

    // Intento 1: Carpetas personalizadas
    const response1 = await axios.get(
      `${API_BASE}/locations/${LOCATION_ID}/customFields/search`,
      {
        headers,
        params: {
          skip: 0,
          limit: 100,
          documentType: 'folder'
        }
      }
    );

    // Intento 2: Obtener todos los campos para ver sus parentIds
    const response2 = await axios.get(
      `${API_BASE}/locations/${LOCATION_ID}/customFields`,
      {
        headers
      }
    );

    const carpetasCustom = response1.data.customFieldFolders || [];
    const campos = response2.data.customFields || [];

    const idMap = {};

    // Agregar carpetas personalizadas
    carpetasCustom.forEach(carpeta => {
      idMap[carpeta.name] = carpeta.id;
    });

    // Agregar IDs de las carpetas padre de los campos
    const parentIds = new Map();
    campos.forEach(campo => {
      if (campo.parentId && !parentIds.has(campo.parentId)) {
        parentIds.set(campo.parentId, {
          nombre: campo.model === 'opportunity' ? 'Opportunity Details' : 'Contact',
          campos: 1
        });
      } else if (campo.parentId) {
        parentIds.get(campo.parentId).campos++;
      }
    });

    // Agregar al mapa
    parentIds.forEach((info, id) => {
      if (!Object.values(idMap).includes(id)) {
        idMap[info.nombre] = id;
      }
    });

    console.log(`✅ Encontradas ${Object.keys(idMap).length} carpetas:\n`);

    for (const [nombre, id] of Object.entries(idMap)) {
      console.log(`📁 ${nombre}`);
      console.log(`   ID: ${id}\n`);
    }

    // Salida en JSON
    console.log('═══════════════════════════════════════════════════════\n');
    console.log('📋 MAPA COMPLETO DE IDs:\n');
    console.log(JSON.stringify(idMap, null, 2));
    console.log('\n═══════════════════════════════════════════════════════\n');

  } catch (error) {
    console.error('❌ ERROR:', error.response?.data || error.message);
    process.exit(1);
  }
}

extraerTodasCarpetas();
