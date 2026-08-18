import GHLClient from '../lib/ghl-client.js';

async function createMissingPipeline() {
  const ghl = new GHLClient();

  try {
    console.log('🔨 Creando pipeline faltante...\n');

    const pipelineData = {
      name: 'Revista Crítica Histórica — Historia & Humanidades',
      stages: [
        { name: 'Aluno Cadastrado', position: 1 },
        { name: 'Dados Confirmados', position: 2 },
        { name: 'Convite do Grupo Enviado', position: 3 },
        { name: 'No Grupo — Em Aquecimento', position: 4 },
        { name: 'Convertido — Artigo Submetido', position: 5 }
      ]
    };

    const response = await ghl.createPipeline(pipelineData);
    console.log('✅ Pipeline criado com sucesso!\n');
    console.log(`Pipeline ID: ${response.pipeline.id}`);
    console.log(`Etapas: ${response.pipeline.stages.length}\n`);

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

createMissingPipeline();
