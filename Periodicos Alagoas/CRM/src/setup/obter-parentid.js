import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const LOCATION_ID = process.env.GHL_LOCATION_ID;
const PIT = process.env.GHL_PIT_TOKEN;
const API_BASE = 'https://services.leadconnectorhq.com';

async function obterParentId() {
  try {
    console.log('\n');
    console.log('█████████████████████████████████████████████████████');
    console.log('█                                                   █');
    console.log('█  🔍 OBTENER: ParentId de Campo Existente 🔍      █');
    console.log('█                                                   █');
    console.log('█████████████████████████████████████████████████████\n');

    const headers = {
      Authorization: `Bearer ${PIT}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Version': '2021-07-28'
    };

    console.log('🔍 Intentando obtener parentId de campos existentes...\n');

    // Intentar obtener todos los custom fields
    let campos = [];

    try {
      console.log('Método 1: GET /custom-fields (sin parámetros)');
      const response = await axios.get(
        `${API_BASE}/custom-fields`,
        { headers }
      );
      campos = response.data.fields || response.data.customFields || response.data || [];
      console.log(`✅ Encontrados ${campos.length} campos\n`);
    } catch (error1) {
      console.log(`❌ Falló: ${error1.response?.data?.message || error1.message}\n`);

      try {
        console.log('Método 2: GET /custom-fields con locationId');
        const response = await axios.get(
          `${API_BASE}/custom-fields`,
          {
            headers,
            params: { locationId: LOCATION_ID }
          }
        );
        campos = response.data.fields || response.data.customFields || response.data || [];
        console.log(`✅ Encontrados ${campos.length} campos\n`);
      } catch (error2) {
        console.log(`❌ Falló: ${error2.response?.data?.message || error2.message}\n`);
      }
    }

    if (campos.length === 0) {
      console.log('❌ No se encontraron campos existentes\n');
      console.log('═══════════════════════════════════════════════════════\n');
      console.log('⚠️  SOLUCIÓN ALTERNATIVA:\n');
      console.log('Para obtener el parentId manualmente:\n');
      console.log('1. Abre GHL Console: https://app.gohighlevel.com/');
      console.log('2. Ve a: Opportunities → Settings → Custom Fields');
      console.log('3. Haz clic en un campo existente (ej: "Ticket / Pacote")');
      console.log('4. Abre Inspector (F12)');
      console.log('5. En Network o Console, busca "parentId"');
      console.log('6. Copia ese valor\n');
      console.log('Luego ejecuta:\n');
      console.log('export GHL_PARENT_ID="valor-copiado"');
      console.log('node criar-campos-faltantes.js\n');
      return null;
    }

    console.log('📋 CAMPOS ENCONTRADOS:\n');

    const parentIds = new Set();

    campos.forEach((campo, idx) => {
      const nombre = campo.name || campo.displayName || 'Unknown';
      const parentId = campo.parentId || campo.parent_id || 'N/A';

      console.log(`${idx + 1}. ${nombre}`);
      console.log(`   parentId: ${parentId}`);

      if (parentId && parentId !== 'N/A') {
        parentIds.add(parentId);
      }

      if (campo.objectKey) {
        console.log(`   objectKey: ${campo.objectKey}`);
      }
      console.log('');
    });

    console.log('═══════════════════════════════════════════════════════\n');

    if (parentIds.size > 0) {
      console.log('✅ PARENT IDS ENCONTRADOS:\n');
      const parentIdArray = Array.from(parentIds);
      parentIdArray.forEach((id, idx) => {
        console.log(`  ${idx + 1}. ${id}`);
      });

      console.log('\n✅ USA ESTE PARENT_ID:\n');
      console.log(`export GHL_PARENT_ID="${parentIdArray[0]}"`);
      console.log('\nO modifica el archivo .env:\n');
      console.log(`GHL_PARENT_ID=${parentIdArray[0]}\n`);

      return parentIdArray[0];
    }

    return null;

  } catch (error) {
    console.error('\n❌ ERROR:', error.message);
    process.exit(1);
  }
}

obterParentId();
