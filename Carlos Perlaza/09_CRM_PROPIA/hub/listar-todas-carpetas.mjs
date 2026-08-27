#!/usr/bin/env node
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const locationId = process.env.GHL_LOCATION_ID;
const pitToken = process.env.GHL_PIT_TOKEN;

const headers = {
  'Authorization': `Bearer ${pitToken}`,
  'Content-Type': 'application/json',
  'Version': '2021-07-28'
};

async function listarCarpetas() {
  console.log('\n█████████████████████████████████████████████████████');
  console.log('█  📁 Listando TODAS las carpetas de campos         █');
  console.log('█████████████████████████████████████████████████████\n');

  try {
    const res = await axios.get(
      `https://services.leadconnectorhq.com/locations/${locationId}/customFields`,
      { headers }
    );

    const campos = res.data.customFields || [];
    const carpetas = new Map();

    // Agrupar por carpeta
    for (const campo of campos) {
      const carpetaId = campo.parentId || 'SIN_CARPETA';
      if (!carpetas.has(carpetaId)) {
        carpetas.set(carpetaId, {
          id: carpetaId,
          campos: [],
          modelos: new Set()
        });
      }
      carpetas.get(carpetaId).campos.push({
        nombre: campo.name,
        modelo: campo.model,
        fieldKey: campo.fieldKey
      });
      carpetas.get(carpetaId).modelos.add(campo.model);
    }

    // Mostrar carpetas
    console.log(`Total de carpetas: ${carpetas.size}\n`);

    for (const [id, info] of carpetas.entries()) {
      console.log(`📁 CARPETA ID: ${id}`);
      console.log(`   Modelos: ${Array.from(info.modelos).join(', ')}`);
      console.log(`   Total campos: ${info.campos.length}`);
      console.log(`   Campos:`);
      for (const c of info.campos.slice(0, 5)) {
        console.log(`     - ${c.nombre} (${c.modelo})`);
      }
      if (info.campos.length > 5) {
        console.log(`     ... y ${info.campos.length - 5} más`);
      }
      console.log();
    }

    // Generar tabla copeable
    console.log('\n═══════════════════════════════════════════════════════');
    console.log('TABLA PARA COPIAR:\n');
    console.log('ID CARPETA | MODELO | CANTIDAD');
    console.log('─────────────────────────────────────');
    for (const [id, info] of carpetas.entries()) {
      const modelos = Array.from(info.modelos).join('+');
      console.log(`${id} | ${modelos} | ${info.campos.length}`);
    }

  } catch (e) {
    console.error('❌ Error:', e.response?.data?.message || e.message);
  }
}

listarCarpetas();
