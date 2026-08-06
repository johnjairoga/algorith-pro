import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const LOCATION_ID = process.env.GHL_LOCATION_ID;
const PIT = process.env.GHL_PIT_TOKEN;
const API_BASE = 'https://services.leadconnectorhq.com';

async function listarTodosCampos() {
  try {
    console.log('\n📋 TODOS LOS CAMPOS PERSONALIZADOS\n');

    const headers = {
      Authorization: `Bearer ${PIT}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Version': '2021-07-28'
    };

    const response = await axios.get(
      `${API_BASE}/locations/${LOCATION_ID}/customFields`,
      { headers }
    );

    const campos = response.data.customFields || [];
    console.log(`✅ Total campos: ${campos.length}\n`);

    if (campos.length > 0) {
      console.log('CAMPOS EN RAÍZ (sin carpeta):');
      campos.filter(c => !c.parentId).forEach(c => {
        console.log(`  📌 ${c.name} | Key: ${c.fieldKey} | Type: ${c.dataType}`);
      });

      console.log('\nCAMPOS EN CARPETAS:');
      const carpetas = {};
      campos.filter(c => c.parentId).forEach(c => {
        if (!carpetas[c.parentId]) carpetas[c.parentId] = [];
        carpetas[c.parentId].push(c);
      });

      Object.entries(carpetas).forEach(([parentId, items]) => {
        console.log(`\n  📁 Carpeta (${parentId}):`);
        items.forEach(c => {
          console.log(`    📌 ${c.name} | Key: ${c.fieldKey} | Type: ${c.dataType}`);
        });
      });

      // Buscar reavaliacao
      console.log('\n\n🔍 BUSCANDO "reavaliacao":');
      const reavaliacao = campos.find(c =>
        c.name.toLowerCase().includes('reavaliacao') ||
        c.fieldKey?.toLowerCase().includes('reavaliacao')
      );
      if (reavaliacao) {
        console.log('✅ ENCONTRADO:');
        console.log(JSON.stringify(reavaliacao, null, 2));
      } else {
        console.log('❌ NO ENCONTRADO');
      }
    }

  } catch (error) {
    console.error('\n❌ ERRO:');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error(error.response.data);
    } else {
      console.error(error.message);
    }
    process.exit(1);
  }
}

listarTodosCampos();
