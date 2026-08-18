import GHLClient from '../lib/ghl-client.js';

async function cleanupOldPipeline() {
  const ghl = new GHLClient();

  try {
    console.log('🔍 Buscando pipelines viejos...\n');

    const pipelinesResponse = await ghl.getPipelines();
    const pipelines = pipelinesResponse.pipelines || pipelinesResponse.data || [];

    console.log(`Total de pipelines encontrados: ${pipelines.length}\n`);

    const pipelinesToDelete = [
      'Revista Crítica Histórica — Historia & Humanidades'
    ];

    for (const pipeline of pipelines) {
      console.log(`Pipeline: ${pipeline.name} (ID: ${pipeline.id})`);
      console.log(`  Etapas: ${pipeline.stages?.length || 0}`);

      if (pipelinesToDelete.includes(pipeline.name)) {
        console.log(`  ✅ Intentando deletar...\n`);
        try {
          await ghl.deletePipeline(pipeline.id);
          console.log(`  ✅ Deletado exitosamente\n`);
        } catch (error) {
          console.log(`  ❌ Error al deletar: ${error.message}\n`);
        }
      } else {
        console.log(`  ⏭️  Saltado\n`);
      }
    }

    console.log('✨ Cleanup completado\n');
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

cleanupOldPipeline();
