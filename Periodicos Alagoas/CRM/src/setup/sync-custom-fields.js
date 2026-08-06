import axios from 'axios';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const LOCATION_ID = process.env.GHL_LOCATION_ID;
const PIT = process.env.GHL_PIT_TOKEN;
const API_BASE = 'https://services.leadconnectorhq.com';

const fieldsConfig = JSON.parse(
  fs.readFileSync(path.resolve('./config/custom-fields.json'), 'utf-8')
);

async function sincronizarCampos() {
  try {
    console.log('\n');
    console.log('█████████████████████████████████████████████████████');
    console.log('█                                                   █');
    console.log('█  🔄 SINCRONIZAR: Custom Fields em GHL 🔄         █');
    console.log('█                                                   █');
    console.log('█████████████████████████████████████████████████████\n');

    const headers = {
      Authorization: `Bearer ${PIT}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Version': '2021-07-28'
    };

    // PASO 1: Listar campos existentes en GHL
    console.log('📋 PASO 1: Listando campos existentes en GHL...\n');

    let existentesResponse;
    try {
      // Intentar con locationId como parámetro
      existentesResponse = await axios.get(
        `${API_BASE}/custom-fields`,
        {
          headers,
          params: { locationId: LOCATION_ID }
        }
      );
    } catch (error1) {
      console.log('Intentando endpoint alternativo...\n');
      // Si falla, intentar sin parámetros
      existentesResponse = await axios.get(
        `${API_BASE}/custom-fields`,
        { headers }
      );
    }

    const camposExistentes = existentesResponse.data.fields || existentesResponse.data || [];
    console.log(`✅ ${camposExistentes.length} campos encontrados en GHL\n`);

    // Crear mapa de campos existentes por nombre
    const mapaNombres = {};
    camposExistentes.forEach(campo => {
      const nombre = campo.name?.toLowerCase() || '';
      mapaNombres[nombre] = campo;
    });

    console.log('Campos existentes:');
    camposExistentes.forEach(campo => {
      console.log(`  ✅ ${campo.name} (${campo.dataType})`);
    });

    // PASO 2: Identificar campos que faltan
    console.log('\n═══════════════════════════════════════════════════════');
    console.log('\n📊 PASO 2: Identificando campos faltantes...\n');

    const todosCampos = [
      ...fieldsConfig.fields.comercial,
      ...fieldsConfig.fields.operacional,
      ...fieldsConfig.fields.recrutamento
    ];

    const faltantes = [];
    const existentes = [];

    todosCampos.forEach(campo => {
      const existe = mapaNombres[campo.displayName.toLowerCase()];
      if (existe) {
        existentes.push(campo);
      } else {
        faltantes.push(campo);
      }
    });

    console.log(`✅ Existentes: ${existentes.length}`);
    existentes.forEach(c => {
      console.log(`   ✅ ${c.displayName}`);
    });

    console.log(`\n❌ Faltantes: ${faltantes.length}`);
    faltantes.forEach(c => {
      console.log(`   ❌ ${c.displayName}`);
    });

    // PASO 3: Crear campos faltantes
    if (faltantes.length > 0) {
      console.log('\n═══════════════════════════════════════════════════════');
      console.log(`\n🚀 PASO 3: Creando ${faltantes.length} campos faltantes...\n`);

      const resultados = {
        exitosos: [],
        errores: []
      };

      for (const campo of faltantes) {
        try {
          const payload = {
            locationId: LOCATION_ID,
            name: campo.displayName,
            description: campo.description || '',
            dataType: campo.type.toUpperCase(),
            objectKey: 'opportunity',
            showInForms: true
          };

          // Agregar opciones si existen
          if (campo.options && campo.options.length > 0) {
            payload.options = campo.options.map(opt => ({
              label: opt,
              key: opt.toLowerCase().replace(/\s+/g, '_')
            }));
          }

          console.log(`📝 Creando: ${campo.displayName}...`);

          const response = await axios.post(
            `${API_BASE}/custom-fields/`,
            payload,
            { headers }
          );

          console.log(`   ✅ Creado exitosamente (ID: ${response.data.id || 'N/A'})\n`);
          resultados.exitosos.push(campo.displayName);

        } catch (error) {
          console.error(`   ❌ Error: ${error.response?.data?.message || error.message}\n`);
          resultados.errores.push({
            campo: campo.displayName,
            error: error.response?.data?.message || error.message
          });
        }
      }

      // Resumen
      console.log('\n═══════════════════════════════════════════════════════');
      console.log('\n📊 RESUMEN DE CREACIÓN\n');
      console.log(`✅ Exitosos: ${resultados.exitosos.length}`);
      resultados.exitosos.forEach(c => console.log(`   ✅ ${c}`));

      if (resultados.errores.length > 0) {
        console.log(`\n❌ Con errores: ${resultados.errores.length}`);
        resultados.errores.forEach(e => {
          console.log(`   ❌ ${e.campo}: ${e.error}`);
        });
      }

      console.log('\n═══════════════════════════════════════════════════════\n');
    } else {
      console.log('\n✅ ¡TODOS LOS CAMPOS YA EXISTEN EN GHL!\n');
      console.log('═══════════════════════════════════════════════════════\n');
    }

    // PASO 4: Resumen final
    console.log('📋 ESTADO FINAL:\n');
    console.log(`✅ COMERCIAL (7 campos): ${existentes.filter(c => fieldsConfig.fields.comercial.includes(c)).length}/7`);
    console.log(`✅ OPERACIONAL (6 campos): ${existentes.filter(c => fieldsConfig.fields.operacional.includes(c)).length}/6`);
    console.log(`✅ RECRUTAMIENTO (10 campos): ${existentes.filter(c => fieldsConfig.fields.recrutamento.includes(c)).length}/10`);
    console.log(`\n📊 TOTAL: ${existentes.length}/${todosCampos.length} campos\n`);

  } catch (error) {
    console.error('\n❌ ERROR:', error.message);
    if (error.response?.data) {
      console.error('Detalles:', error.response.data);
    }
    process.exit(1);
  }
}

sincronizarCampos();
