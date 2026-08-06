import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const LOCATION_ID = process.env.GHL_LOCATION_ID;
const PIT = process.env.GHL_PIT_TOKEN;
const API_BASE = 'https://services.leadconnectorhq.com';

async function listarCampos() {
  try {
    console.log('\n🔍 BUSCANDO: Campo "Data de Reavaliação"\n');

    const headers = {
      Authorization: `Bearer ${PIT}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Version': '2021-07-28'
    };

    // Listar TODOS los campos
    const response = await axios.get(
      `${API_BASE}/locations/${LOCATION_ID}/customFields`,
      { headers }
    );

    const campos = response.data.customFields || [];

    // Buscar el campo de reavaliacao
    const reavaliacao = campos.find(c =>
      c.name.toLowerCase().includes('reavaliacao') ||
      c.fieldKey?.toLowerCase().includes('reavaliacao')
    );

    if (reavaliacao) {
      console.log('✅ ENCONTRADO!\n');
      console.log(JSON.stringify(reavaliacao, null, 2));
      console.log('\n📋 Detalles:');
      console.log(`  ID: ${reavaliacao.id}`);
      console.log(`  Name: ${reavaliacao.name}`);
      console.log(`  Field Key: ${reavaliacao.fieldKey}`);
      console.log(`  Data Type: ${reavaliacao.dataType}`);
      console.log(`  Parent ID: ${reavaliacao.parentId || 'NINGUNO (raíz)'}`);
      console.log(`  Position: ${reavaliacao.position}`);
    } else {
      console.log('❌ Campo NO encontrado en la lista.');
      console.log('\n📋 Campos encontrados con "data":');
      campos.filter(c => c.name.toLowerCase().includes('data')).forEach(c => {
        console.log(`  - ${c.name} (${c.fieldKey}) | Parent: ${c.parentId || 'raíz'}`);
      });
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

listarCampos();
