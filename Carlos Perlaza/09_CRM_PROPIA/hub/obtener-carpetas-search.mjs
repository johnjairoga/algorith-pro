#!/usr/bin/env node

import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const LOCATION_ID = process.env.GHL_LOCATION_ID;
const PIT = process.env.GHL_PIT_TOKEN;
const API_BASE = process.env.GHL_API_URL;

const headers = {
  'Authorization': `Bearer ${PIT}`,
  'Accept': 'application/json',
  'Version': '2021-07-28'
};

const CARPETAS_BUSCADAS = {
  'Financiero': 'financiero',
  'Fechas y Programación': 'fechas',
  'Origen y Tracking': 'origen',
  'Productos y Servicios': 'productos',
  'Métodos de Pago': 'metodos_pago',
  'Consulta y Atendimiento': 'consulta',
  'Equipo y Responsables': 'equipo',
  'Pérdida y Análisis': 'perdida',
  'Oportunidades Abiertas': 'oportunidades_abiertas',
  'Seguimiento y Control': 'seguimiento'
};

async function obtenerCarpetas() {
  console.log('\n');
  console.log('█████████████████████████████████████████████████████');
  console.log('█                                                   █');
  console.log('█  🚀 OBTENER: IDs de Carpetas (Search Endpoint)   █');
  console.log('█                                                   █');
  console.log('█████████████████████████████████████████████████████\n');

  try {
    console.log('📁 Buscando todas las carpetas...\n');

    const response = await axios.get(
      `${API_BASE}/locations/${LOCATION_ID}/customFields/search`,
      { headers, timeout: 15000 }
    );

    const carpetas = response.data?.folders || response.data?.customFields || [];

    console.log(`✅ Carpetas encontradas: ${carpetas.length}\n`);

    if (carpetas.length === 0) {
      console.log('⚠️  No se encontraron carpetas');
      console.log(JSON.stringify(response.data, null, 2));
      process.exit(1);
    }

    // Mostrar todas las carpetas
    console.log('📋 TODAS LAS CARPETAS:\n');
    carpetas.forEach(c => {
      console.log(`  ${c.name || c.displayName}: ${c.id || c._id}`);
    });

    console.log('\n═══════════════════════════════════════════════════════\n');

    // Buscar las que nos interesan
    const resultado = {};
    const encontradas = [];
    const noEncontradas = [];

    Object.entries(CARPETAS_BUSCADAS).forEach(([nombreBuscado, clave]) => {
      const carpeta = carpetas.find(c =>
        (c.name === nombreBuscado) ||
        (c.displayName === nombreBuscado) ||
        (c.title === nombreBuscado)
      );

      if (carpeta) {
        const id = carpeta.id || carpeta._id;
        resultado[clave] = id;
        encontradas.push(`✅ ${nombreBuscado}: ${id}`);
      } else {
        noEncontradas.push(`❌ ${nombreBuscado}: No encontrada`);
      }
    });

    console.log('🎯 CARPETAS DEL PROYECTO CARLOS:\n');
    encontradas.forEach(msg => console.log(msg));
    noEncontradas.forEach(msg => console.log(msg));

    if (Object.keys(resultado).length > 0) {
      console.log('\n═══════════════════════════════════════════════════════\n');
      console.log('📋 CONFIGURACIÓN PARA EL SCRIPT:\n');
      console.log('const FOLDER_IDS = {');
      Object.entries(resultado).forEach(([clave, id]) => {
        console.log(`  ${clave}: '${id}',`);
      });
      console.log('};\n');
    }

  } catch (error) {
    console.error('\n❌ ERROR:\n');
    console.error(`Status: ${error.response?.status}`);
    console.error(`Mensaje: ${error.response?.data?.message || error.message}`);
    console.error(`\nURL: ${API_BASE}/locations/${LOCATION_ID}/customFields/search`);
    process.exit(1);
  }
}

obtenerCarpetas();
