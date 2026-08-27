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

async function listarCarpetas() {
  console.log('\n🔍 Listando carpetas de custom fields...\n');

  try {
    const response = await axios.get(
      `https://services.leadconnectorhq.com/custom-fields/folder?locationId=${LOCATION_ID}`,
      { headers }
    );

    console.log(JSON.stringify(response.data, null, 2));

  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
  }
}

listarCarpetas();
