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
  'Accept': 'application/json'
};

// Carpetas a crear
const carpetas = {
  opportunities: [
    { name: 'Financiero', objectKey: 'opportunity' },
    { name: 'Fechas y Programación', objectKey: 'opportunity' },
    { name: 'Origen y Tracking', objectKey: 'opportunity' },
    { name: 'Productos y Servicios', objectKey: 'opportunity' },
    { name: 'Métodos de Pago', objectKey: 'opportunity' },
    { name: 'Consulta y Atendimiento', objectKey: 'opportunity' },
    { name: 'Equipo y Responsables', objectKey: 'opportunity' },
    { name: 'Pérdida y Análisis', objectKey: 'opportunity' }
  ],
  contacts: [
    { name: 'Oportunidades Abiertas', objectKey: 'contact' },
    { name: 'Seguimiento y Control', objectKey: 'contact' },
    { name: 'Información de Empresa', objectKey: 'contact' },
    { name: 'Dirección y Ubicación', objectKey: 'contact' },
    { name: 'Datos Personales', objectKey: 'contact' },
    { name: 'Clasificación', objectKey: 'contact' }
  ]
};

async function crearCarpetas() {
  console.log('\n🔨 CREANDO CARPETAS DE CUSTOM FIELDS EN GHL\n');
  console.log('═'.repeat(70));

  const todas = [...carpetas.opportunities, ...carpetas.contacts];
  let exitosas = 0;
  let fallidas = 0;

  for (const carpeta of todas) {
    try {
      console.log(`\n📁 Creando: ${carpeta.name} (${carpeta.objectKey})`);

      const payload = {
        objectKey: carpeta.objectKey,
        name: carpeta.name,
        locationId: locationId
      };

      console.log(`   Payload: ${JSON.stringify(payload)}`);

      const response = await axios.post(
        'https://services.leadconnectorhq.com/custom-fields/folder',
        payload,
        { headers }
      );

      console.log(`   ✅ ÉXITO`);
      console.log(`   ID: ${response.data?.id || 'N/A'}`);
      console.log(`   Status: ${response.status}`);
      exitosas++;

    } catch (error) {
      console.log(`   ❌ ERROR`);
      console.log(`   Status: ${error.response?.status}`);
      console.log(`   Mensaje: ${error.response?.data?.message || error.message}`);
      fallidas++;

      // Si es error 401, probablemente sea el token
      if (error.response?.status === 401) {
        console.log(`   💡 Consejo: Verifica que el token GHL_PIT_TOKEN sea válido`);
      }

      // Si es error 404, probablemente el endpoint no existe con ese objectKey
      if (error.response?.status === 404) {
        console.log(`   💡 Consejo: El objectKey podría ser incorrecto`);
        console.log(`   💡 Intenta con: custom_object.contact o solo contact`);
      }
    }
  }

  console.log('\n═'.repeat(70));
  console.log(`\n📊 RESUMEN`);
  console.log(`✅ Exitosas: ${exitosas}`);
  console.log(`❌ Fallidas: ${fallidas}`);
  console.log(`Total: ${todas.length}`);
  console.log(`\n`);

  if (fallidas > 0) {
    console.log('⚠️  NOTA: Si todas fallaron, el endpoint podría requerir:');
    console.log('   - objectKey diferente: custom_object.contact, custom_object.opportunity');
    console.log('   - O usar un endpoint completamente diferente');
    console.log('   - Verificar documentación de GHL API');
  }

  process.exit(fallidas > 0 ? 1 : 0);
}

crearCarpetas();
