import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const LOCATION_ID = process.env.GHL_LOCATION_ID;
const PIT = process.env.GHL_PIT_TOKEN;
const API_BASE = 'https://services.leadconnectorhq.com';

async function extraerParentIdV2() {
  try {
    console.log('\n');
    console.log('█████████████████████████████████████████████████████');
    console.log('█                                                   █');
    console.log('█  🔍 EXTRAER: ParentId via CustomValues 🔍        █');
    console.log('█                                                   █');
    console.log('█████████████████████████████████████████████████████\n');

    const headers = {
      Authorization: `Bearer ${PIT}`,
      'Accept': 'application/json',
      'Version': '2021-04-15'
    };

    console.log(`🔍 Llamando endpoint: /locations/${LOCATION_ID}/customValues\n`);

    const response = await axios.get(
      `${API_BASE}/locations/${LOCATION_ID}/customValues`,
      { headers }
    );

    console.log('✅ Respuesta recibida!\n');

    const data = response.data;
    console.log('📋 ESTRUCTURA DE RESPUESTA:\n');
    console.log(JSON.stringify(data, null, 2));

    console.log('\n═══════════════════════════════════════════════════════\n');

    // Intentar extraer parentIds de diferentes estructuras
    if (data.customFields && Array.isArray(data.customFields)) {
      console.log('✅ CUSTOM FIELDS ENCONTRADOS:\n');
      const parentIds = new Set();

      data.customFields.forEach(field => {
        console.log(`- ${field.name || field.displayName || 'Unknown'}`);
        if (field.parentId) {
          console.log(`  parentId: ${field.parentId}`);
          parentIds.add(field.parentId);
        }
        if (field.id) {
          console.log(`  id: ${field.id}`);
        }
      });

      if (parentIds.size > 0) {
        console.log('\n✅ PARENT IDS EXTRAÍDOS:\n');
        const parentIdArray = Array.from(parentIds);
        parentIdArray.forEach((id, idx) => {
          console.log(`${idx + 1}. ${id}`);
        });

        console.log('\n═══════════════════════════════════════════════════════');
        console.log('\n✅ USA ESTE EN TU .env:\n');
        console.log(`GHL_PARENT_ID=${parentIdArray[0]}\n`);
        return parentIdArray[0];
      }
    }

    if (data.folders && Array.isArray(data.folders)) {
      console.log('✅ FOLDERS ENCONTRADOS:\n');
      data.folders.forEach(folder => {
        console.log(`- ${folder.name || folder.folderName || 'Unknown'}`);
        if (folder.id) {
          console.log(`  id: ${folder.id}`);
        }
      });
    }

    console.log('\n═══════════════════════════════════════════════════════\n');
    console.log('⚠️  Si no encontraste parentId, intenta:\n');
    console.log('1. Copiar el ID de un folder si existe');
    console.log('2. O el ID de un campo existente\n');

    return null;

  } catch (error) {
    console.error('\n❌ ERROR:', error.message);
    if (error.response?.data) {
      console.error('Detalle:', error.response.data);
    }
    process.exit(1);
  }
}

extraerParentIdV2();
