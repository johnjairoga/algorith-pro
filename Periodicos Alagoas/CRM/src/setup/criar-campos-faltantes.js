import axios from 'axios';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const LOCATION_ID = process.env.GHL_LOCATION_ID;
const PIT = process.env.GHL_PIT_TOKEN;
const API_BASE = 'https://services.leadconnectorhq.com';
const PARENT_ID = process.env.GHL_PARENT_ID;

const fieldsConfig = JSON.parse(
  fs.readFileSync(path.resolve('./config/custom-fields.json'), 'utf-8')
);

// Campos que YA existen (no crear)
const CAMPOS_EXISTENTES = [
  'Origem do Lead',
  'Região de Atendimento',
  'Condição de Saúde',
  'Responsável Familiar',
  'Modalidade',
  'Frequência Semanal',
  'Ticket / Pacote',
  'Personal Responsável',
  'Data de Avaliação',
  'Data de Reavaliação'
];

async function criarCamposFaltantes() {
  try {
    console.log('\n');
    console.log('█████████████████████████████████████████████████████');
    console.log('█                                                   █');
    console.log('█  🚀 CRIAR: Campos Faltantes en GHL 🚀            █');
    console.log('█                                                   █');
    console.log('█████████████████████████████████████████████████████\n');

    const headers = {
      Authorization: `Bearer ${PIT}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Version': '2021-07-28'
    };

    // Obtener todos los campos del config
    const todosCampos = [
      ...fieldsConfig.fields.comercial,
      ...fieldsConfig.fields.operacional,
      ...fieldsConfig.fields.recrutamento
    ];

    // Filtrar solo los que NO existen
    const camposFaltantes = todosCampos.filter(
      campo => !CAMPOS_EXISTENTES.includes(campo.displayName)
    );

    if (!PARENT_ID) {
      console.log('❌ FALTA: GHL_PARENT_ID en .env\n');
      console.log('Solución: Edita .env y agrega:\n');
      console.log('GHL_PARENT_ID=oportunidade\n');
      console.log('O el ID correcto de GHL Console\n');
      process.exit(1);
    }

    console.log(`📋 Total de campos para crear: ${camposFaltantes.length}`);
    console.log(`📌 Parent ID: ${PARENT_ID}\n`);
    console.log('Campos a crear:');
    camposFaltantes.forEach(c => {
      console.log(`  • ${c.displayName} (${c.type})`);
    });
    console.log('\n═══════════════════════════════════════════════════════\n');

    const resultados = {
      exitosos: [],
      errores: []
    };

    // Mapeo de tipos de datos GHL v2.0
    const mapeoDataTypes = {
      'text': 'TEXT',
      'date': 'DATE',
      'number': 'NUMERICAL',
      'select': 'SINGLE_OPTIONS',
      'multiple': 'MULTIPLE_OPTIONS'
    };

    // Crear cada campo
    for (const campo of camposFaltantes) {
      try {
        console.log(`📝 Creando: ${campo.displayName}...`);

        // Generar fieldKey automáticamente
        const fieldKeySuffix = campo.displayName
          .toLowerCase()
          .normalize('NFD')
          .replace(/[̀-ͯ]/g, '') // Quitar acentos
          .replace(/[^a-z0-9]/g, '_')
          .replace(/_+/g, '_')
          .replace(/^_|_$/g, '');

        const fieldKey = `opportunity.${fieldKeySuffix}`;

        // Mapear dataType correctamente
        const dataTypeOriginal = campo.type.toLowerCase();
        const dataTypeMapeado = mapeoDataTypes[dataTypeOriginal] || campo.type.toUpperCase();

        const payload = {
          locationId: LOCATION_ID,
          name: campo.displayName,
          description: campo.description || '',
          dataType: dataTypeMapeado,
          objectKey: 'oportunidade',
          fieldKey: fieldKey,
          showInForms: true
          // parentId omitido - GHL lo asigna automáticamente
        };

        // Agregar opciones si existen
        if (campo.options && campo.options.length > 0) {
          payload.options = campo.options.map(opt => ({
            label: opt,
            key: opt
              .toLowerCase()
              .normalize('NFD')
              .replace(/[̀-ͯ]/g, '')
              .replace(/[^a-z0-9]/g, '_')
              .replace(/_+/g, '_')
              .replace(/^_|_$/g, '')
          }));
        }

        console.log(`   fieldKey: ${fieldKey}`);

        const response = await axios.post(
          `${API_BASE}/custom-fields/`,
          payload,
          { headers, timeout: 10000 }
        );

        console.log(`   ✅ Creado exitosamente!\n`);
        resultados.exitosos.push({
          nombre: campo.displayName,
          id: response.data?.id || 'N/A',
          tipo: campo.type
        });

      } catch (error) {
        const errorMsg = error.response?.data?.message ||
                        error.response?.data?.error ||
                        error.message;
        console.error(`   ❌ Error: ${errorMsg}\n`);
        resultados.errores.push({
          nombre: campo.displayName,
          error: errorMsg
        });
      }
    }

    // RESUMEN
    console.log('═══════════════════════════════════════════════════════\n');
    console.log('📊 RESUMEN FINAL\n');

    console.log(`✅ Exitosos: ${resultados.exitosos.length}`);
    if (resultados.exitosos.length > 0) {
      resultados.exitosos.forEach(c => {
        console.log(`   ✅ ${c.nombre} (${c.tipo})`);
      });
    }

    if (resultados.errores.length > 0) {
      console.log(`\n❌ Con errores: ${resultados.errores.length}`);
      resultados.errores.forEach(e => {
        console.log(`   ❌ ${e.nombre}`);
        console.log(`      ${e.error}\n`);
      });
    }

    console.log('═══════════════════════════════════════════════════════\n');

    // Resumen por categoría
    console.log('📋 ESTADO POR CATEGORÍA:\n');

    const comercialesFaltantes = camposFaltantes.filter(c =>
      fieldsConfig.fields.comercial.includes(c)
    );
    console.log(`COMERCIAL: ${comercialesFaltantes.length}/7 faltaban (todos ya existen ✅)`);

    const operacionalesFaltantes = camposFaltantes.filter(c =>
      fieldsConfig.fields.operacional.includes(c)
    );
    console.log(`OPERACIONAL: ${operacionalesFaltantes.length}/6 a crear`);
    operacionalesFaltantes.forEach(c => console.log(`   • ${c.displayName}`));

    const recrutamentofaltantes = camposFaltantes.filter(c =>
      fieldsConfig.fields.recrutamento.includes(c)
    );
    console.log(`\nRECRUTAMIENTO: ${recrutamentofaltantes.length}/10 a crear`);
    recrutamentofaltantes.forEach(c => console.log(`   • ${c.displayName}`));

    console.log('\n═══════════════════════════════════════════════════════\n');

  } catch (error) {
    console.error('\n❌ ERROR:', error.message);
    process.exit(1);
  }
}

criarCamposFaltantes();
