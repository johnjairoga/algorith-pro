import fs from 'fs';
import path from 'path';
import GHLClient from '../lib/ghl-client.js';

const fieldsConfig = JSON.parse(
  fs.readFileSync(path.resolve('./config/custom-fields.json'), 'utf-8')
);

async function setupRecrutamentoFields() {
  try {
    console.log('\n🎯 SETUP: Campos de Recrutamiento en GHL\n');
    console.log('═══════════════════════════════════════════════════════\n');

    const ghl = new GHLClient();

    // Obtener solo los campos de recrutamiento
    const recrutamentoFields = fieldsConfig.fields.recrutamento;

    const results = {
      success: [],
      failed: [],
      startTime: new Date(),
    };

    console.log(`📋 Creando ${recrutamentoFields.length} campos de recrutamiento...\n`);

    for (const field of recrutamentoFields) {
      console.log(`📝 ${field.displayName}`);

      try {
        await ghl.createCustomField(field);
        results.success.push(field.displayName);
        console.log(`   ✅ Creado exitosamente\n`);
      } catch (error) {
        results.failed.push({
          name: field.displayName,
          error: error.response?.data?.message || error.message,
        });
        console.error(`   ⚠️  Error: ${error.response?.data?.message || error.message}\n`);
      }
    }

    console.log('═══════════════════════════════════════════════════════\n');
    console.log('📊 RESUMEN\n');
    console.log(`✅ Exitosos: ${results.success.length}`);
    if (results.success.length > 0) {
      results.success.forEach(f => console.log(`   - ${f}`));
    }

    if (results.failed.length > 0) {
      console.log(`\n❌ Con errores: ${results.failed.length}`);
      results.failed.forEach(f => console.log(`   - ${f.name}: ${f.error}`));
    } else {
      console.log('\n🎉 ¡TODOS LOS CAMPOS CREADOS SIN ERRORES!\n');
      console.log('Campos disponibles en GHL:');
      console.log('├─ vaga_aplicada');
      console.log('├─ experiencia_anos');
      console.log('├─ certificacoes');
      console.log('├─ disponibilidade');
      console.log('├─ score_triagem');
      console.log('├─ resumo_candidato');
      console.log('├─ data_triagem');
      console.log('├─ data_entrevista');
      console.log('├─ notas_entrevista');
      console.log('└─ motivo_rechazo\n');
    }

    results.endTime = new Date();
    results.duration = results.endTime - results.startTime;

    return results;

  } catch (error) {
    console.error('\n❌ ERROR GENERAL:', error.message);
    process.exit(1);
  }
}

setupRecrutamentoFields();
