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
    console.log('█  🚀 CRIAR: 13 Campos Faltantes (Endpoint Correto) █');
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

    const resultados = {
      exitosos: [],
      errores: []
    };

    // Crear cada campo
    for (const campo of camposParaCriar.campos) {
      try {
        console.log(`📝 Creando: ${campo.displayName}...`);

        // Payload correcto según el endpoint /locations/:locationId/customFields
        const payload = {
          name: campo.displayName,
          dataType: campo.dataType,
          placeholder: campo.type === 'text' ? `Ingresa ${campo.displayName.toLowerCase()}` : undefined,
          model: 'opportunity',
          position: 0
        };

        // Agregar options si tiene opciones (para select)
        if (campo.options && Array.isArray(campo.options) && campo.options.length > 0) {
          payload.options = campo.options
            .filter(opt => opt && typeof opt === 'string')
            .map((opt) => {
              const trimmed = opt.trim();
              return {
                label: trimmed,
                value: trimmed.toLowerCase().replace(/\s+/g, '_')
              };
            });
        }

        // Remover undefined
        Object.keys(payload).forEach(key =>
          payload[key] === undefined && delete payload[key]
        );

        const response = await axios.post(
          `${API_BASE}/locations/${LOCATION_ID}/customFields`,
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

    const operacionales = camposParaCriar.campos.filter(c => c.categoria === 'operacional');
    const recrutamento = camposParaCriar.campos.filter(c => c.categoria === 'recrutamento');

    const opExitosos = resultados.exitosos.filter(e =>
      operacionales.some(o => o.displayName === e.nombre)
    ).length;
    console.log(`OPERACIONAL: ${opExitosos}/${operacionales.length} creados`);

    const recExitosos = resultados.exitosos.filter(e =>
      recrutamento.some(r => r.displayName === e.nombre)
    ).length;
    console.log(`RECRUTAMENTO: ${recExitosos}/${recrutamento.length} creados`);

    console.log('\n═══════════════════════════════════════════════════════\n');

    if (resultados.errores.length === 0) {
      console.log('✅ FASE 2 COMPLETA - Todos los campos creados exitosamente!\n');
      return true;
    }

    return false;

  } catch (error) {
    console.error('\n❌ ERROR CRÍTICO:', error.message);
    process.exit(1);
  }
}

criarCampos();
