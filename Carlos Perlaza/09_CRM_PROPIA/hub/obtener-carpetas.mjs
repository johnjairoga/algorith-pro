#!/usr/bin/env node

import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const LOCATION_ID = process.env.GHL_LOCATION_ID;
const PIT = process.env.GHL_PIT_TOKEN;

const headers = {
  'Authorization': `Bearer ${PIT}`,
  'Accept': 'application/json',
  'Version': '2021-07-28'
};

const CARPETAS_ESPERADAS = {
  opportunities: ['Financiero', 'Fechas y Programación', 'Origen y Tracking', 'Productos y Servicios', 'Métodos de Pago', 'Consulta y Atendimiento', 'Equipo y Responsables', 'Pérdida y Análisis'],
  contacts: ['Oportunidades Abiertas', 'Seguimiento y Control']
};

async function obtenerCarpetas() {
  console.log('\n');
  console.log('█████████████████████████████████████████████████████');
  console.log('█                                                   █');
  console.log('█  🚀 OBTENER: IDs de Carpetas Personalizadas       █');
  console.log('█                                                   █');
  console.log('█████████████████████████████████████████████████████\n');

  const resultado = {
    opportunities: {},
    contacts: {}
  };

  try {
    // OBTENER CARPETAS DE OPPORTUNITIES
    console.log('📁 Obteniendo carpetas de OPORTUNIDADES...\n');

    const opportunitiesUrl = `https://services.leadconnectorhq.com/custom-fields/object-key/custom_objects.opportunity?locationId=${LOCATION_ID}`;

    const oppResponse = await axios.get(opportunitiesUrl, { headers });
    const oppFolders = oppResponse.data?.folders || oppResponse.data || [];

    console.log(`✅ Carpetas encontradas: ${Array.isArray(oppFolders) ? oppFolders.length : 'N/A'}\n`);

    if (Array.isArray(oppFolders)) {
      oppFolders.forEach(folder => {
        console.log(`  📂 ${folder.name}: ${folder.id}`);
        resultado.opportunities[folder.name] = folder.id;
      });
    } else if (typeof oppFolders === 'object') {
      Object.entries(oppFolders).forEach(([key, value]) => {
        if (value?.id && value?.name) {
          console.log(`  📂 ${value.name}: ${value.id}`);
          resultado.opportunities[value.name] = value.id;
        }
      });
    }

    console.log('\n');

    // OBTENER CARPETAS DE CONTACTS
    console.log('📁 Obteniendo carpetas de CONTACTOS...\n');

    const contactsUrl = `https://services.leadconnectorhq.com/custom-fields/object-key/custom_objects.contact?locationId=${LOCATION_ID}`;

    const contactResponse = await axios.get(contactsUrl, { headers });
    const contactFolders = contactResponse.data?.folders || contactResponse.data || [];

    console.log(`✅ Carpetas encontradas: ${Array.isArray(contactFolders) ? contactFolders.length : 'N/A'}\n`);

    if (Array.isArray(contactFolders)) {
      contactFolders.forEach(folder => {
        console.log(`  📂 ${folder.name}: ${folder.id}`);
        resultado.contacts[folder.name] = folder.id;
      });
    } else if (typeof contactFolders === 'object') {
      Object.entries(contactFolders).forEach(([key, value]) => {
        if (value?.id && value?.name) {
          console.log(`  📂 ${value.name}: ${value.id}`);
          resultado.contacts[value.name] = value.id;
        }
      });
    }

    console.log('\n═══════════════════════════════════════════════════════\n');
    console.log('📋 FORMATO PARA ACTUALIZAR EL SCRIPT:\n');

    const mapeo = {
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

    const configScript = {
      opportunities: {},
      contacts: {}
    };

    Object.entries(resultado.opportunities).forEach(([nombre, id]) => {
      const clave = mapeo[nombre];
      if (clave) configScript.opportunities[clave] = id;
    });

    Object.entries(resultado.contacts).forEach(([nombre, id]) => {
      const clave = mapeo[nombre];
      if (clave) configScript.contacts[clave] = id;
    });

    console.log('const FOLDER_IDS = {');
    console.log('  // Oportunidades');
    Object.entries(configScript.opportunities).forEach(([clave, id]) => {
      console.log(`  ${clave}: '${id}',`);
    });
    console.log('  // Contactos');
    Object.entries(configScript.contacts).forEach(([clave, id]) => {
      console.log(`  ${clave}: '${id}',`);
    });
    console.log('};\n');

    console.log('═══════════════════════════════════════════════════════\n');

  } catch (error) {
    console.error('\n❌ ERROR AL OBTENER CARPETAS\n');
    console.error(`Status: ${error.response?.status}`);
    console.error(`Mensaje: ${error.response?.data?.message || error.message}`);
    console.error('\nResponse:', JSON.stringify(error.response?.data, null, 2));
    process.exit(1);
  }
}

obtenerCarpetas();
