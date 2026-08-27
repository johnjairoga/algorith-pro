#!/usr/bin/env node
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

// Mapa de carpetas (nombre → ID)
const carpetas = {
  'opportunity': 'tGExRU0UDHiqYAG9YeYE', // Opportunity Details
  'contact': 'gZO5OSMozOa1ZhhXrJbN'     // Contact Details
};

async function organizarCampos() {
  console.log('\n█████████████████████████████████████████████████████');
  console.log('█  📁 Organizando campos en carpetas...              █');
  console.log('█████████████████████████████████████████████████████\n');

  try {
    // Obtener todos los campos
    const res = await axios.get(
      `https://services.leadconnectorhq.com/locations/${locationId}/customFields`,
      { headers }
    );

    const campos = res.data.customFields || [];
    console.log(`📊 Total de campos: ${campos.length}\n`);

    let moved = 0;
    let err = 0;

    for (const campo of campos) {
      const expectedParentId = carpetas[campo.model];
      
      if (!expectedParentId) {
        console.log(`⚠️  ${campo.name} - modelo desconocido: ${campo.model}`);
        continue;
      }

      if (campo.parentId === expectedParentId) {
        console.log(`✅ ${campo.name} - ya en carpeta correcta`);
        continue;
      }

      // Mover campo a carpeta
      try {
        await axios.put(
          `https://services.leadconnectorhq.com/locations/${locationId}/customFields/${campo.id}`,
          { parentId: expectedParentId },
          { headers, timeout: 10000 }
        );
        console.log(`🔄 ${campo.name} - movido a carpeta ${campo.model}`);
        moved++;
      } catch (e) {
        console.log(`❌ ${campo.name} - error: ${e.response?.data?.message || e.message}`);
        err++;
      }
    }

    console.log(`\n═══════════════════════════════════════════════════════`);
    console.log(`✅ Movidos: ${moved}`);
    console.log(`❌ Errores: ${err}`);
    console.log(`═══════════════════════════════════════════════════════\n`);

    process.exit(err > 0 ? 1 : 0);
  } catch (e) {
    console.error(`Error: ${e.message}`);
    process.exit(1);
  }
}

organizarCampos();
