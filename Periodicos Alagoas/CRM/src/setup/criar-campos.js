import axios from 'axios';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const LOCATION_ID = process.env.GHL_LOCATION_ID;
const PIT = process.env.GHL_PIT_TOKEN;
const API_BASE = 'https://services.leadconnectorhq.com';

async function criarCampos() {
  try {
    console.log('\n');
    console.log('█████████████████████████████████████████████████████');
    console.log('█                                                   █');
    console.log('█  🚀 CRIAR: 13 Campos Faltantes 🚀               █');
    console.log('█                                                   █');
    console.log('█████████████████████████████████████████████████████\n');

    const camposParaCriar = JSON.parse(
      fs.readFileSync(path.resolve('./src/setup/campos-para-crear.json'), 'utf-8')
    );

    const headers = {
      Authorization: `Bearer ${PIT}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Version': '2021-07-28'
    };

    // Primero: obtener campos existentes
    console.log('📋 Verificando campos existentes...\n');

    const searchResponse = await axios.get(
      `${API_BASE}/locations/${LOCATION_ID}/customFields/search`,
      {
        headers,
        params: {
          skip: 0,
          limit: 10000,
          documentType: 'folder',
          model: 'all',
          includeStandards: true
        }
      }
    );

    const camposExistentes = searchResponse.data.customFields || [];
    const nombresExistentes = new Set(
      camposExistentes.map(c => c.name || c.displayName)
    );

    console.log(`✅ Encontrados ${camposExistentes.length} campos existentes\n`);

    const resultados = {
      exitosos: [],
      errores: [],
      yaExisten: []
    };

    // Crear cada campo
    for (const campo of camposParaCriar.campos) {
      // Verificar si ya existe
      if (nombresExistentes.has(campo.displayName)) {
        console.log(`⏭️  EXISTE: ${campo.displayName}\n`);
        resultados.yaExisten.push(campo.displayName);
        continue;
      }

      try {
        console.log(`📝 Creando: ${campo.displayName}...`);

        // Generar fieldKey simple: oportunidade.{normalized}
        const normalized = campo.displayName
          .toLowerCase()
          .normalize('NFD')
          .replace(/[̀-ͯ]/g, '')           // Remover diacríticos
          .replace(/[^\w]/g, '_')          // Cualquier no-word → _
          .replace(/_+/g, '_')             // Múltiples _ → _
          .replace(/^_|_$/g, '');          // Trim _

        // Payload SIN fieldKey - dejar que GHL lo genere
        const payload = {
          locationId: LOCATION_ID,
          name: campo.displayName,
          description: campo.description || '',
          dataType: campo.dataType,
          objectKey: 'oportunidade',
          parentId: campo.parentId,
          showInForms: true
        };

        // Si tiene opciones, agregarlas con label y key
        if (campo.options && campo.options.length > 0) {
          payload.options = campo.options.map(opt => {
            const optKey = opt
              .toLowerCase()
              .normalize('NFD')
              .replace(/[̀-ͯ]/g, '')
              .replace(/[^\w]/g, '_')
              .replace(/_+/g, '_')
              .replace(/^_|_$/g, '');
            return {
              label: opt,
              key: optKey
            };
          });
        }

        const response = await axios.post(
          `${API_BASE}/custom-fields/`,
          payload,
          { headers, timeout: 15000 }
        );

        console.log(`   ✅ Creado: ${response.data?.id || 'OK'}\n`);
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
          error: errorMsg,
          status: error.response?.status
        });
      }
    }

    // RESUMEN
    console.log('═══════════════════════════════════════════════════════\n');
    console.log('📊 RESUMEN FINAL\n');

    console.log(`✅ Exitosos: ${resultados.exitosos.length}`);
    if (resultados.exitosos.length > 0) {
      resultados.exitosos.forEach(c => {
        console.log(`   ✅ ${c.nombre}`);
      });
    }

    console.log(`\n⏭️  Ya existen: ${resultados.yaExisten.length}`);
    if (resultados.yaExisten.length > 0) {
      resultados.yaExisten.forEach(nombre => {
        console.log(`   ⏭️  ${nombre}`);
      });
    }

    if (resultados.errores.length > 0) {
      console.log(`\n❌ Con errores: ${resultados.errores.length}`);
      resultados.errores.forEach(e => {
        console.log(`   ❌ ${e.nombre} (${e.status || 'unknown'})`);
        console.log(`      ${e.error}\n`);
      });
    }

    console.log('═══════════════════════════════════════════════════════\n');

    // Resumen por categoría
    console.log('📋 ESTADO POR CATEGORÍA:\n');

    const operacionales = camposParaCriar.campos.filter(c => c.categoria === 'operacional');
    const recrutamento = camposParaCriar.campos.filter(c => c.categoria === 'recrutamento');

    const opExitosos = resultados.exitosos.filter(e =>
      operacionales.some(o => o.displayName === e.nombre)
    ).length;
    console.log(`OPERACIONAL: ${opExitosos}/3 creados`);

    const recExitosos = resultados.exitosos.filter(e =>
      recrutamento.some(r => r.displayName === e.nombre)
    ).length;
    console.log(`RECRUTAMENTO: ${recExitosos}/10 creados`);

    console.log('\n═══════════════════════════════════════════════════════\n');

    if (resultados.errores.length === 0) {
      console.log('✅ FASE 2 COMPLETA - Todos los campos creados exitosamente!\n');
    }

  } catch (error) {
    console.error('\n❌ ERROR CRÍTICO:', error.message);
    process.exit(1);
  }
}

criarCampos();
