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

async function listar() {
  try {
    const res = await axios.get(
      `https://services.leadconnectorhq.com/locations/${locationId}/customFields`,
      { headers }
    );

    const campos = res.data.customFields || [];
    const carpetas = {};

    for (const c of campos) {
      const pid = c.parentId;
      if (!carpetas[pid]) {
        carpetas[pid] = { model: c.model, count: 0, nombres: [] };
      }
      carpetas[pid].count++;
      if (carpetas[pid].nombres.length < 3) {
        carpetas[pid].nombres.push(c.name);
      }
    }

    console.log('\n📁 CARPETAS EN EL PROYECTO:\n');
    for (const [id, info] of Object.entries(carpetas)) {
      console.log(`  ID: ${id}`);
      console.log(`  Modelo: ${info.model}`);
      console.log(`  Campos: ${info.count}`);
      console.log(`  Ejemplos: ${info.nombres.join(', ')}`);
      console.log();
    }
  } catch (e) {
    console.error('Error:', e.response?.data?.message || e.message);
  }
}

listar();
