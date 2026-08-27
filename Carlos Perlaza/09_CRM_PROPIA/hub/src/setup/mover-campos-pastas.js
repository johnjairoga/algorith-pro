import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const LOCATION_ID = process.env.GHL_LOCATION_ID;
const PIT = process.env.GHL_PIT_TOKEN;
const API_BASE = 'https://services.leadconnectorhq.com';

const headers = {
  Authorization: `Bearer ${PIT}`,
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Version': '2021-07-28'
};

async function moverCampos() {
  try {
    console.log('\n');
    console.log('█████████████████████████████████████████████████████');
    console.log('█                                                   █');
    console.log('█  🚀 ORGANIZAR: Campos en sus Pastas              █');
    console.log('█                                                   █');
    console.log('█████████████████████████████████████████████████████\n');

    // Paso 1: Obtener todas las carpetas
    console.log('📋 Obteniendo carpetas...\n');

    const carpetasResponse = await axios.get(
      `${API_BASE}/locations/${LOCATION_ID}/customFields/search`,
      {
        headers,
        params: {
          skip: 0,
          limit: 100,
          documentType: 'folder',
          model: 'all'
        }
      }
    );

    const carpetas = carpetasResponse.data.customFieldFolders || [];
    const foldersMap = {};

    carpetas.forEach(folder => {
      foldersMap[folder.name] = {
        id: folder.id,
        name: folder.name
      };
      console.log(`   📁 ${folder.name} (ID: ${folder.id})`);
    });

    console.log('\n═══════════════════════════════════════════════════════\n');

    // Paso 1.5: Carpeta Campos Recrutamento
    let recrutamentoId = foldersMap['Campos Recrutamento']?.id;

    if (!recrutamentoId) {
      // Fallback al ID conocido
      recrutamentoId = 'FtbUvChV3QA3GAvBqPWu';
      console.log(`📁 Usando ID de Campos Recrutamento: ${recrutamentoId}\n`);
    }

    // Paso 2: Obtener todos los campos
    console.log('📋 Obteniendo campos personalizados...\n');

    const camposResponse = await axios.get(
      `${API_BASE}/locations/${LOCATION_ID}/customFields/search`,
      {
        headers,
        params: {
          skip: 0,
          limit: 10000,
          documentType: 'field',
          model: 'opportunity',
          includeStandards: false
        }
      }
    );

    const campos = camposResponse.data.customFields || [];

    // Mapeo de campos a carpetas
    const camposAMover = {
      'Campos Operacionales': [
        'Aniversário',
        'Data da Primeira Aula',
        'Observações de Saúde'
      ],
      'Campos Recrutamento': [
        'Vaga Aplicada',
        'Experiência (Anos)',
        'Certificações',
        'Disponibilidade',
        'Score de Triagem',
        'Resumo do Candidato',
        'Data de Triagem',
        'Data de Entrevista',
        'Notas de Entrevista',
        'Motivo da Rejeição'
      ]
    };

    console.log('📊 CAMPOS A MOVER:\n');

    const movimientos = [];

    for (const [nombreCarpeta, nombresCampos] of Object.entries(camposAMover)) {
      let carpetaId = foldersMap[nombreCarpeta]?.id;

      // Fallback para Campos Recrutamento
      if (nombreCarpeta === 'Campos Recrutamento' && !carpetaId) {
        carpetaId = recrutamentoId;
      }

      if (!carpetaId) {
        console.log(`❌ No encontrada carpeta: ${nombreCarpeta}\n`);
        continue;
      }

      console.log(`📁 ${nombreCarpeta} (${carpetaId}):`);

      for (const nombreCampo of nombresCampos) {
        const campo = campos.find(c => c.name === nombreCampo);

        if (campo) {
          console.log(`   ✅ ${nombreCampo} (ID: ${campo.id})`);
          movimientos.push({
            fieldId: campo.id,
            carpetaId: carpetaId,
            nombreCampo: nombreCampo,
            nombreCarpeta: nombreCarpeta
          });
        } else {
          console.log(`   ❌ Campo no encontrado: ${nombreCampo}`);
        }
      }
      console.log('');
    }

    console.log('═══════════════════════════════════════════════════════\n');

    if (movimientos.length === 0) {
      console.log('⚠️  No hay campos para mover\n');
      return;
    }

    console.log(`\n🔄 MOVIENDO ${movimientos.length} CAMPOS...\n`);

    // Paso 3: Mover campos
    let exitosos = 0;
    let errores = 0;

    for (const mov of movimientos) {
      try {
        console.log(`📝 Moviendo: ${mov.nombreCampo} → ${mov.nombreCarpeta}...`);

        const payload = {
          parentId: mov.carpetaId
        };

        await axios.put(
          `${API_BASE}/locations/${LOCATION_ID}/customFields/${mov.fieldId}`,
          payload,
          { headers, timeout: 10000 }
        );

        console.log(`   ✅ Movido!\n`);
        exitosos++;

      } catch (error) {
        const errorMsg = error.response?.data?.message ||
                        error.response?.data?.error ||
                        error.message;
        console.error(`   ❌ ${errorMsg}\n`);
        errores++;
      }
    }

    console.log('═══════════════════════════════════════════════════════\n');
    console.log('📊 RESUMEN\n');
    console.log(`✅ Movidos: ${exitosos}/${movimientos.length}`);
    if (errores > 0) console.log(`❌ Errores: ${errores}`);
    console.log('\n═══════════════════════════════════════════════════════\n');

  } catch (error) {
    console.error('\n❌ ERROR:', error.message);
    if (error.response?.data) {
      console.error('Detalle:', error.response.data);
    }
    process.exit(1);
  }
}

moverCampos();
