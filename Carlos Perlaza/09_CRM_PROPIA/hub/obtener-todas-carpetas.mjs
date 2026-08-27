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

async function obtenerCarpetas() {
  console.log('\n🔍 Intentando obtener todas las carpetas...\n');

  // Intento 1: Sin filtros
  try {
    console.log('Intento 1: GET /custom-fields/?locationId=...\n');
    const response1 = await axios.get(
      `https://services.leadconnectorhq.com/custom-fields/?locationId=${LOCATION_ID}`,
      { headers, timeout: 10000 }
    );
    console.log(JSON.stringify(response1.data, null, 2));
    return;
  } catch (error) {
    console.log(`Error: ${error.message}\n`);
  }

  // Intento 2: GET /custom-fields/folder
  try {
    console.log('Intento 2: GET /custom-fields/folder?locationId=...\n');
    const response2 = await axios.get(
      `https://services.leadconnectorhq.com/custom-fields/folder?locationId=${LOCATION_ID}`,
      { headers, timeout: 10000 }
    );
    console.log(JSON.stringify(response2.data, null, 2));
    return;
  } catch (error) {
    console.log(`Error: ${error.message}\n`);
  }

  // Intento 3: GET /custom-fields/folders
  try {
    console.log('Intento 3: GET /custom-fields/folders?locationId=...\n');
    const response3 = await axios.get(
      `https://services.leadconnectorhq.com/custom-fields/folders?locationId=${LOCATION_ID}`,
      { headers, timeout: 10000 }
    );
    console.log(JSON.stringify(response3.data, null, 2));
    return;
  } catch (error) {
    console.log(`Error: ${error.message}\n`);
  }

  // Intento 4: GET /locations/{locationId}/customFields/folders
  try {
    console.log('Intento 4: GET /locations/{locationId}/customFields/folders\n');
    const response4 = await axios.get(
      `https://services.leadconnectorhq.com/locations/${LOCATION_ID}/customFields/folders`,
      { headers, timeout: 10000 }
    );
    console.log(JSON.stringify(response4.data, null, 2));
    return;
  } catch (error) {
    console.log(`Error: ${error.message}\n`);
  }

  console.log('❌ Ningún endpoint funcionó');
}

obtenerCarpetas();
