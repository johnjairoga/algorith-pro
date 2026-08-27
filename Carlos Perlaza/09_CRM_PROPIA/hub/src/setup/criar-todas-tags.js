import fs from 'fs';
import path from 'path';
import GHLClient from '../lib/ghl-client.js';

const tagsConfig = JSON.parse(
  fs.readFileSync(path.resolve('./config/tags.json'), 'utf-8')
);

async function criarTodasTags() {
  try {
    console.log('\n');
    console.log('█████████████████████████████████████████████████████');
    console.log('█                                                   █');
    console.log('█  🏷️  FASE 2: Todas as Tags em GHL 🏷️            █');
    console.log('█                                                   █');
    console.log('█████████████████████████████████████████████████████\n');

    const ghl = new GHLClient();

    const allTags = Object.values(tagsConfig.tags).flat();
    const tagsByCategory = tagsConfig.tags;

    const results = {
      success: [],
      failed: [],
      byCategory: {},
      startTime: new Date(),
    };

    console.log(`🏷️  Total de tags para criar: ${allTags.length}\n`);
    console.log('Categorias:');
    Object.entries(tagsByCategory).forEach(([category, tags]) => {
      console.log(`  • ${category}: ${tags.length} tags`);
    });
    console.log('');

    console.log('═══════════════════════════════════════════════════════\n');
    console.log('Criando tags por categoria:\n');

    for (const [category, tags] of Object.entries(tagsByCategory)) {
      console.log(`📂 ${category.toUpperCase()} (${tags.length} tags)\n`);
      results.byCategory[category] = { success: [], failed: [] };

      for (const tagName of tags) {
        console.log(`   🏷️  ${tagName}`);

        try {
          await ghl.createTag(tagName);
          results.success.push(tagName);
          results.byCategory[category].success.push(tagName);
          console.log(`      ✅ Criada com sucesso\n`);
        } catch (error) {
          const errorMsg = error.response?.data?.message || error.message;
          results.failed.push({
            name: tagName,
            category,
            error: errorMsg,
          });
          results.byCategory[category].failed.push({ name: tagName, error: errorMsg });
          console.error(`      ⚠️  Erro: ${errorMsg}\n`);
        }
      }
    }

    console.log('═══════════════════════════════════════════════════════\n');
    console.log('📊 RESUMO GERAL\n');
    console.log(`✅ Total criadas com sucesso: ${results.success.length}`);
    console.log(`❌ Total com erros: ${results.failed.length}\n`);

    console.log('RESUMO POR CATEGORIA:\n');
    for (const [category, data] of Object.entries(results.byCategory)) {
      console.log(`📂 ${category}`);
      console.log(`   ✅ ${data.success.length} criadas`);
      if (data.failed.length > 0) {
        console.log(`   ❌ ${data.failed.length} com erros`);
      }
      console.log('');
    }

    if (results.failed.length === 0) {
      console.log('🎉 TODAS AS TAGS CRIADAS SEM ERROS!\n');
    } else {
      console.log(`⚠️  ${results.failed.length} tags tiveram erros e não foram criadas\n`);
    }

    results.endTime = new Date();
    results.duration = results.endTime - results.startTime;
    console.log(`⏱️  Tempo total: ${results.duration}ms\n`);

    return results;

  } catch (error) {
    console.error('\n❌ ERRO GERAL:', error.message);
    process.exit(1);
  }
}

criarTodasTags();
