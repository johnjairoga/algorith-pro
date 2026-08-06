import fs from 'fs';
import path from 'path';
import GHLClient from '../lib/ghl-client.js';

const fieldsConfig = JSON.parse(
  fs.readFileSync(path.resolve('./config/custom-fields.json'), 'utf-8')
);

async function setupCamposComerciais() {
  try {
    console.log('\n');
    console.log('█████████████████████████████████████████████████████');
    console.log('█                                                   █');
    console.log('█  📋 FASE 2: Campos Comerciais em GHL 📋         █');
    console.log('█                                                   █');
    console.log('█████████████████████████████████████████████████████\n');

    const ghl = new GHLClient();

    const camposComerciais = fieldsConfig.fields.comercial || [];

    const results = {
      success: [],
      failed: [],
      startTime: new Date(),
    };

    console.log(`📝 Criando ${camposComerciais.length} campos comerciais...\n`);

    for (const field of camposComerciais) {
      console.log(`📊 ${field.displayName}`);
      console.log(`   └─ Tipo: ${field.type}`);

      try {
        await ghl.createCustomField(field);
        results.success.push(field.displayName);
        console.log(`   ✅ Criado com sucesso\n`);
      } catch (error) {
        results.failed.push({
          name: field.displayName,
          error: error.response?.data?.message || error.message,
        });
        console.error(`   ⚠️  Erro: ${error.response?.data?.message || error.message}\n`);
      }
    }

    console.log('═══════════════════════════════════════════════════════\n');
    console.log('📊 RESUMO\n');
    console.log(`✅ Criados com sucesso: ${results.success.length}`);
    if (results.success.length > 0) {
      console.log('   Campos criados:');
      results.success.forEach(f => console.log(`   ✓ ${f}`));
    }

    if (results.failed.length > 0) {
      console.log(`\n❌ Com erros: ${results.failed.length}`);
      results.failed.forEach(f => console.log(`   ✗ ${f.name}: ${f.error}`));
    } else {
      console.log('\n🎉 TODOS OS CAMPOS CRIADOS SEM ERROS!\n');
    }

    results.endTime = new Date();
    results.duration = results.endTime - results.startTime;

    return results;

  } catch (error) {
    console.error('\n❌ ERROR GENERAL:', error.message);
    process.exit(1);
  }
}

setupCamposComerciais();
