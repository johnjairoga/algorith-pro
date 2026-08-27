import fs from 'fs';
import path from 'path';
import GHLClient from '../lib/ghl-client.js';

const pipelinesConfig = JSON.parse(
  fs.readFileSync(path.resolve('./config/pipelines.json'), 'utf-8')
);

async function criarFunilComercialNovo() {
  try {
    console.log('\n');
    console.log('█████████████████████████████████████████████████████');
    console.log('█                                                   █');
    console.log('█  ✨ CRIAR: Funil Comercial NOVO (10 etapas) ✨   █');
    console.log('█                                                   █');
    console.log('█████████████████████████████████████████████████████\n');

    const ghl = new GHLClient();

    // Obter o pipeline "Funil Comercial" do config
    const funilComercialConfig = pipelinesConfig.pipelines.find(
      p => p.name === 'Funil Comercial'
    );

    if (!funilComercialConfig) {
      throw new Error('Pipeline "Funil Comercial" não encontrado no config');
    }

    console.log(`📋 Carregando configuração...\n`);
    console.log(`Nome: ${funilComercialConfig.name}`);
    console.log(`Descrição: ${funilComercialConfig.description}`);
    console.log(`Etapas: ${funilComercialConfig.stages.length}\n`);

    console.log('Estrutura que será criada:\n');
    funilComercialConfig.stages.forEach((stage, idx) => {
      console.log(`${idx + 1}. ${stage.name}`);
      console.log(`   └─ ${stage.description}\n`);
    });

    console.log('═══════════════════════════════════════════════════════');
    console.log('🚀 Criando pipeline em GHL...\n');

    const pipelineData = {
      name: 'Funil Comercial - Novo',
      stages: funilComercialConfig.stages.map((stage, idx) => ({
        name: stage.name,
        position: idx
      }))
    };

    const response = await ghl.createPipeline(pipelineData);

    const pipeline = response.pipeline || response;

    console.log('\n═══════════════════════════════════════════════════════');
    console.log('\n✅ PIPELINE CRIADO COM SUCESSO!\n');
    console.log(`ID do Pipeline: ${pipeline.id}`);
    console.log(`Nome: ${pipeline.name}`);
    console.log(`Total de etapas: ${pipeline.stages?.length || 10}\n`);

    if (pipeline.stages && pipeline.stages.length > 0) {
      console.log('Etapas criadas:');
      pipeline.stages.forEach((stage, idx) => {
        console.log(`  ${idx + 1}. ${stage.name} (Probabilidade: ${stage.stageWinProbability}%)`);
      });
    }

    console.log('\n═══════════════════════════════════════════════════════');
    console.log('\n📌 Próximos passos:\n');
    console.log('1. ✅ Novo pipeline "Funil Comercial - Novo" criado em GHL');
    console.log('2. ⏳ Opções:');
    console.log('   a) Testar o novo pipeline');
    console.log('   b) Renomear o pipeline antigo para "Funil Comercial - Legado"');
    console.log('   c) Renomear este novo para "Funil Comercial"');
    console.log('   d) Migrar oportunidades existentes (se houver)\n');
    console.log('3. Para referência futura:\n');
    console.log(`   Pipeline ID: ${pipeline.id}`);
    console.log(`   Nome em GHL: ${pipeline.name}\n`);

    return response;

  } catch (error) {
    console.error('\n❌ ERRO:', error.message);
    if (error.response?.data) {
      console.error('Detalhes:', error.response.data);
    }
    process.exit(1);
  }
}

criarFunilComercialNovo();
