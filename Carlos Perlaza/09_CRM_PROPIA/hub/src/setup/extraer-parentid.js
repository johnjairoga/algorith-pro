import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const LOCATION_ID = process.env.GHL_LOCATION_ID;
const PIT = process.env.GHL_PIT_TOKEN;
const API_BASE = 'https://services.leadconnectorhq.com';

async function extraerParentId() {
  try {
    console.log('\n');
    console.log('█████████████████████████████████████████████████████');
    console.log('█                                                   █');
    console.log('█  🔍 EXTRAER: ParentId del Endpoint Correcto 🔍   █');
    console.log('█                                                   █');
    console.log('█████████████████████████████████████████████████████\n');

    const headers = {
      Authorization: `Bearer ${PIT}`,
      'Accept': 'application/json',
      'Version': 'v3'
    };

    console.log('🔍 Intentando obtener campos via endpoint correcto...\n');

    // Intentar diferentes variantes de objectKey
    const objectKeys = [
      'opportunity',
      'OPPORTUNITY',
      'Opportunity',
      'opportunities',
      'custom_objects.opportunity'
    ];

    let campos = null;
    let objectKeyUsado = null;

    for (const objKey of objectKeys) {
      try {
        console.log(`Intentando objectKey: "${objKey}"...`);

        const response = await axios.get(
          `${API_BASE}/custom-fields/object-key/${objKey}`,
          {
            headers,
            params: { locationId: LOCATION_ID }
          }
        );

        campos = response.data.fields || [];
        objectKeyUsado = objKey;
        console.log(`✅ Éxito! Encontrados ${campos.length} campos\n`);
        break;

      } catch (error) {
        const msg = error.response?.data?.message || error.message;
        console.log(`   ❌ Falló: ${msg}\n`);
      }
    }

    if (!campos || campos.length === 0) {
      console.log('❌ No se encontraron campos con ninguna variante\n');
      console.log('═══════════════════════════════════════════════════════\n');
      console.log('⚠️  Nota: El endpoint solo soporta Custom Objects y Company hoy');
      console.log('   Será extendido a otros Standard Objects en el futuro.\n');
      return null;
    }

    console.log('═══════════════════════════════════════════════════════\n');
    console.log(`✅ CAMPOS ENCONTRADOS (objectKey: "${objectKeyUsado}")\n`);

    // Extraer parentIds únicos
    const parentIds = new Set();
    const camposPorParentId = {};

    campos.forEach((campo, idx) => {
      const nombre = campo.name || 'Unknown';
      const parentId = campo.parentId || 'sin-parentId';
      const dataType = campo.dataType || 'unknown';

      console.log(`${idx + 1}. ${nombre}`);
      console.log(`   parentId: ${parentId}`);
      console.log(`   dataType: ${dataType}`);
      console.log(`   fieldKey: ${campo.fieldKey}\n`);

      if (parentId && parentId !== 'sin-parentId') {
        parentIds.add(parentId);
        if (!camposPorParentId[parentId]) {
          camposPorParentId[parentId] = [];
        }
        camposPorParentId[parentId].push(nombre);
      }
    });

    console.log('═══════════════════════════════════════════════════════\n');

    if (parentIds.size > 0) {
      console.log('✅ PARENT IDS EXTRAÍDOS:\n');
      const parentIdArray = Array.from(parentIds);

      parentIdArray.forEach((id, idx) => {
        console.log(`${idx + 1}. ${id}`);
        console.log(`   Campos: ${camposPorParentId[id].join(', ')}\n`);
      });

      console.log('═══════════════════════════════════════════════════════\n');
      console.log('✅ ACTUALIZA TU .env:\n');
      console.log(`GHL_PARENT_ID=${parentIdArray[0]}\n`);
      console.log('Luego ejecuta:\n');
      console.log('node criar-campos-faltantes.js\n');

      return parentIdArray[0];
    }

    console.log('❌ No se encontraron parentIds válidos\n');
    return null;

  } catch (error) {
    console.error('\n❌ ERROR:', error.message);
    process.exit(1);
  }
}

extraerParentId();
