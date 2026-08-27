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

const carpetasNecesarias = [
  'Company Info',
  'Contact',
  'Opportunity Details',
  'General Info',
  'Additional Info',
  'Financiero',
  'Fechas y Programación',
  'Origen y Tracking',
  'Productos y Servicios',
  'Métodos de Pago',
  'Consulta y Atendimiento',
  'Equipo y Responsables',
  'Pérdida y Análisis',
  'Oportunidades Abiertas',
  'Seguimiento y Control'
];

async function buscarCarpetas() {
  console.log('\n█████████████████████████████████████████████████████');
  console.log('█  🔍 Buscando IDs de carpetas por nombre           █');
  console.log('█████████████████████████████████████████████████████\n');

  const resultados = {};

  for (const nombre of carpetasNecesarias) {
    try {
      const res = await axios.get(
        `https://services.leadconnectorhq.com/locations/${locationId}/customFields`,
        { headers }
      );

      const campos = res.data.customFields || [];
      
      // Buscar en los IDs de carpetas de todos los campos
      let carpetaIdEncontrada = null;
      
      // Estrategia: intentar crear un campo con el nombre de la carpeta y ver a qué carpeta va
      // O buscar entre los parentId existentes
      
      // Por ahora, mostrar lo que tenemos
      const parentIds = [...new Set(campos.map(c => c.parentId))];
      
      resultados[nombre] = {
        encontrada: false,
        id: null,
        campos: 0
      };

    } catch (e) {
      console.error(`Error al buscar ${nombre}:`, e.message);
    }
  }

  // Mostrar tabla
  console.log('NOMBRE CARPETA | ID | ESTADO');
  console.log('─'.repeat(60));
  for (const nombre of carpetasNecesarias) {
    const info = resultados[nombre];
    const estado = info.encontrada ? '✅' : '❌';
    const id = info.id || 'NO ENCONTRADO';
    console.log(`${nombre.padEnd(30)} | ${id.padEnd(20)} | ${estado}`);
  }

  console.log('\n⚠️  Los IDs no se pueden obtener por nombre directamente.');
  console.log('Necesitas hacer clic en cada carpeta en GHL Console para copiar el ID.\n');
}

buscarCarpetas();
