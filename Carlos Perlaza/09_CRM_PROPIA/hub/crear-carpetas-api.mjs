#!/usr/bin/env node

/**
 * Script para crear carpetas de custom fields en GHL usando API
 * Endpoint: POST /custom-fields/folder
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

// Carpetas a crear (10 total para proyecto Carlos Perlaza)
const carpetas = {
  opportunities: [
    { name: 'Financiero', objectKey: 'custom_object.opportunity', key: 'financiero' },
    { name: 'Fechas y Programación', objectKey: 'custom_object.opportunity', key: 'fechas' },
    { name: 'Origen y Tracking', objectKey: 'custom_object.opportunity', key: 'origen' },
    { name: 'Productos y Servicios', objectKey: 'custom_object.opportunity', key: 'productos' },
    { name: 'Métodos de Pago', objectKey: 'custom_object.opportunity', key: 'metodos_pago' },
    { name: 'Consulta y Atendimiento', objectKey: 'custom_object.opportunity', key: 'consulta' },
    { name: 'Equipo y Responsables', objectKey: 'custom_object.opportunity', key: 'equipo' },
    { name: 'Pérdida y Análisis', objectKey: 'custom_object.opportunity', key: 'perdida' }
  ],
  contacts: [
    { name: 'Oportunidades Abiertas', objectKey: 'custom_object.contact', key: 'oportunidades_abiertas' },
    { name: 'Seguimiento y Control', objectKey: 'custom_object.contact', key: 'seguimiento' }
  ]
};

async function crearCarpetas() {
  console.log('\n');
  console.log('█████████████████████████████████████████████████████');
  console.log('█                                                   █');
  console.log('█  🚀 CREAR: 10 Carpetas Personalizadas Carlos      █');
  console.log('█                                                   █');
  console.log('█████████████████████████████████████████████████████\n');

  const todas = [...carpetas.opportunities, ...carpetas.contacts];
  const carpetasCreadas = {};
  let exitosas = 0;
  let fallidas = 0;

  for (const carpeta of todas) {
    try {
      console.log(`📁 Creando: ${carpeta.name} (${carpeta.objectKey})`);

      const payload = {
        objectKey: carpeta.objectKey,
        name: carpeta.name,
        locationId: locationId
      };

      const response = await axios.post(
        'https://services.leadconnectorhq.com/custom-fields/folder',
        payload,
        { headers }
      );

      const folderId = response.data?.id || response.data?._id;
      console.log(`   ✅ ID: ${folderId}\n`);

      carpetasCreadas[carpeta.key] = folderId;
      exitosas++;

    } catch (error) {
      console.log(`   ❌ Error: ${error.response?.data?.message || error.message}\n`);
      fallidas++;

      if (error.response?.status === 401) {
        console.log(`   💡 Verifica que GHL_PIT_TOKEN sea válido\n`);
      }
    }
  }

  console.log('═══════════════════════════════════════════════════════\n');
  console.log('📊 RESUMEN FINAL\n');
  console.log(`✅ Exitosas: ${exitosas}/10`);
  console.log(`❌ Fallidas: ${fallidas}/10\n`);

  if (exitosas > 0) {
    console.log('📋 IDs de carpetas creadas:\n');
    console.log(JSON.stringify(carpetasCreadas, null, 2));
    console.log('\n✅ Guarda estos IDs para usar en crear-40-campos-carlos.js\n');
  }

  if (fallidas === 0 && exitosas === 10) {
    console.log('✅ ¡TODAS LAS 10 CARPETAS CREADAS EXITOSAMENTE!\n');
  }

  console.log('═══════════════════════════════════════════════════════\n');

  process.exit(fallidas > 0 ? 1 : 0);
}

crearCarpetas();
