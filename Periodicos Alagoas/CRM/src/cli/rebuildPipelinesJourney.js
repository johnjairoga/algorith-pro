import GHLClient from '../lib/ghl-client.js';
import PipelineService from '../services/pipelineService.js';
import TagService from '../services/tagService.js';

class PipelineJourneyRebuild {
  constructor() {
    this.ghl = new GHLClient();
    this.pipelines = new PipelineService(this.ghl);
    this.tags = new TagService(this.ghl);

    this.pipelinesToDelete = [
      'REPD — Economia & Políticas Públicas',
      'Revista Ciência Agrícola — Agronomía & Producción',
      'Revista Crítica Histórica — Historia & Humanidades'
    ];

    this.tagsToDelete = [
      'LEAD_QUENTE',
      'LEAD_EDUCACIONAL',
      'LEAD_PARCIAL',
      'lead-landing-page',
      'lead-meta-ads',
      'lead-google-ads',
      'lead-importacao'
    ];

    this.tagsToCreate = [
      'aluno-landing-page',
      'aluno-meta-ads',
      'aluno-google-ads',
      'aluno-importacao'
    ];
  }

  async deletePipelines() {
    console.log('\n🗑️  DELETANDO PIPELINES VIEJOS...\n');
    const results = {
      success: [],
      failed: []
    };

    try {
      const pipelinesResponse = await this.ghl.getPipelines();
      const existingPipelines = pipelinesResponse.pipelines || pipelinesResponse.data || [];

      for (const oldPipelineName of this.pipelinesToDelete) {
        const pipeline = existingPipelines.find(p => p.name === oldPipelineName);
        if (pipeline) {
          try {
            await this.ghl.deletePipeline(pipeline.id);
            results.success.push(oldPipelineName);
          } catch (error) {
            results.failed.push({ name: oldPipelineName, error: error.message });
          }
        } else {
          console.log(`⚠️  Pipeline no encontrado: ${oldPipelineName}`);
        }
      }
    } catch (error) {
      console.error('❌ Error obtendo pipelines:', error.message);
      throw error;
    }

    return results;
  }

  async recreatePipelines() {
    console.log('\n🔨 RECREANDO PIPELINES CON NUEVA JORNADA...\n');
    return await this.pipelines.setupAll();
  }

  async deleteTags() {
    console.log('\n🗑️  DELETANDO TAGS OBSOLETOS...\n');
    const results = {
      success: [],
      failed: []
    };

    try {
      const tagsResponse = await this.ghl.getTags();
      const existingTags = tagsResponse.tags || tagsResponse.data || [];

      for (const tagName of this.tagsToDelete) {
        const tag = existingTags.find(t => t.name === tagName);
        if (tag) {
          try {
            await this.ghl.deleteTag(tag.id);
            results.success.push(tagName);
          } catch (error) {
            results.failed.push({ name: tagName, error: error.message });
          }
        } else {
          console.log(`⚠️  Tag no encontrado: ${tagName}`);
        }
      }
    } catch (error) {
      console.error('❌ Error obtendo tags:', error.message);
      throw error;
    }

    return results;
  }

  async createNewTags() {
    console.log('\n✨ CREANDO NUEVOS TAGS ALUNO-*...\n');
    const results = {
      success: [],
      failed: []
    };

    for (const tagName of this.tagsToCreate) {
      try {
        await this.tags.createTag(tagName);
        results.success.push(tagName);
      } catch (error) {
        results.failed.push({ name: tagName, error: error.message });
      }
    }

    return results;
  }

  printSummary(deleteResults, recreateResults, deletedTagsResults, createdTagsResults) {
    console.log('\n═══════════════════════════════════════════════════════\n');
    console.log('📊 RESUMEN DE MIGRACIÓN\n');

    console.log('PIPELINES DELETADOS:');
    console.log(`  ✅ ${deleteResults.success.length} exitosos`);
    deleteResults.success.forEach(name => console.log(`     - ${name}`));
    if (deleteResults.failed.length > 0) {
      console.log(`  ❌ ${deleteResults.failed.length} errores`);
      deleteResults.failed.forEach(item => console.log(`     - ${item.name}: ${item.error}`));
    }

    console.log('\nPIPELINES RECREADOS:');
    console.log(`  ✅ ${recreateResults.success.length} exitosos (con 5 etapas nuevas)`);
    recreateResults.success.forEach(name => console.log(`     - ${name}`));
    if (recreateResults.failed.length > 0) {
      console.log(`  ❌ ${recreateResults.failed.length} errores`);
      recreateResults.failed.forEach(item => console.log(`     - ${item.name}: ${item.error}`));
    }

    console.log('\nTAGS DELETADOS:');
    console.log(`  ✅ ${deletedTagsResults.success.length} exitosos`);
    deletedTagsResults.success.forEach(name => console.log(`     - ${name}`));
    if (deletedTagsResults.failed.length > 0) {
      console.log(`  ❌ ${deletedTagsResults.failed.length} errores`);
      deletedTagsResults.failed.forEach(item => console.log(`     - ${item.name}: ${item.error}`));
    }

    console.log('\nTAGS NUEVOS CREADOS:');
    console.log(`  ✅ ${createdTagsResults.success.length} exitosos`);
    createdTagsResults.success.forEach(name => console.log(`     - ${name}`));
    if (createdTagsResults.failed.length > 0) {
      console.log(`  ❌ ${createdTagsResults.failed.length} errores`);
      createdTagsResults.failed.forEach(item => console.log(`     - ${item.name}: ${item.error}`));
    }

    console.log('\n═══════════════════════════════════════════════════════\n');
    console.log('✨ MIGRACIÓN COMPLETADA\n');
    console.log('📋 Próximos pasos:');
    console.log('   1. Ejecutar: node scripts/ghl_audit.js');
    console.log('   2. Verificar en GHL que los pipelines y tags estén correctos');
    console.log('   3. Actualizar documentación si es necesario\n');
  }

  async run() {
    try {
      console.log('═══════════════════════════════════════════════════════\n');
      console.log('🚀 RECONSTRUYENDO PIPELINES CON JORNADA DEL ALUNO\n');
      console.log('═══════════════════════════════════════════════════════\n');

      const deleteResults = await this.deletePipelines();
      const recreateResults = await this.recreatePipelines();
      const deletedTagsResults = await this.deleteTags();
      const createdTagsResults = await this.createNewTags();

      this.printSummary(deleteResults, recreateResults, deletedTagsResults, createdTagsResults);
    } catch (error) {
      console.error('❌ Error fatal:', error.message);
      process.exit(1);
    }
  }
}

async function main() {
  const rebuild = new PipelineJourneyRebuild();
  await rebuild.run();
}

main();
