import fs from 'fs';
import path from 'path';
import GHLClient from '../lib/ghl-client.js';

const tagsConfig = JSON.parse(
  fs.readFileSync(path.resolve('./config/tags.json'), 'utf-8')
);

async function setupRecrutamentoTags() {
  try {
    console.log('\n🎯 SETUP: Tags de Recrutamiento en GHL\n');
    console.log('═══════════════════════════════════════════════════════\n');

    const ghl = new GHLClient();

    // Obtener solo las tags de recrutamiento
    const recrutamentoTags = tagsConfig.tags.recrutamiento || [];

    const results = {
      success: [],
      failed: [],
      startTime: new Date(),
    };

    console.log(`🏷️  Creando ${recrutamentoTags.length} tags de recrutamiento...\n`);

    for (const tagName of recrutamentoTags) {
      console.log(`🔤 ${tagName}`);

      try {
        await ghl.createTag(tagName);
        results.success.push(tagName);
        console.log(`   ✅ Creada exitosamente\n`);
      } catch (error) {
        results.failed.push({
          name: tagName,
          error: error.response?.data?.message || error.message,
        });
        console.error(`   ⚠️  Error: ${error.response?.data?.message || error.message}\n`);
      }
    }

    console.log('═══════════════════════════════════════════════════════\n');
    console.log('📊 RESUMEN\n');
    console.log(`✅ Exitosas: ${results.success.length}`);
    if (results.success.length > 0) {
      console.log('   Tags creadas:');
      results.success.forEach(t => console.log(`   - ${t}`));
    }

    if (results.failed.length > 0) {
      console.log(`\n❌ Con errores: ${results.failed.length}`);
      results.failed.forEach(t => console.log(`   - ${t.name}: ${t.error}`));
    } else {
      console.log('\n🎉 ¡TODAS LAS TAGS CREADAS SIN ERRORES!\n');
    }

    results.endTime = new Date();
    results.duration = results.endTime - results.startTime;

    return results;

  } catch (error) {
    console.error('\n❌ ERROR GENERAL:', error.message);
    process.exit(1);
  }
}

setupRecrutamentoTags();
