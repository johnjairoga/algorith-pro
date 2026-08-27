import fs from 'fs';
import path from 'path';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const LOCATION_ID = process.env.GHL_LOCATION_ID;
const PIT = process.env.GHL_PIT_TOKEN;
const API_BASE = process.env.GHL_API_URL;

const pipelinesConfig = JSON.parse(
  fs.readFileSync(path.resolve('./config/pipelines.json'), 'utf-8')
);

async function actualizarFunilComercial() {
  try {
    console.log('\n');
    console.log('█████████████████████████████████████████████████████');
    console.log('█                                                   █');
    console.log('█  🔄 ATUALIZAR: Funil Comercial (10 etapas) 🔄   █');
    console.log('█                                                   █');
    console.log('█████████████████████████████████████████████████████\n');

    if (!LOCATION_ID || !PIT) {
      throw new Error('Faltam variáveis de ambiente: GHL_LOCATION_ID ou GHL_PIT');
    }

    // Obter o pipeline "Funil Comercial" do config
    const funilComercialConfig = pipelinesConfig.pipelines.find(
      p => p.name === 'Funil Comercial'
    );

    if (!funilComercialConfig) {
      throw new Error('Pipeline "Funil Comercial" não encontrado no config');
    }

    console.log(`📋 Configuração carregada: ${funilComercialConfig.stages.length} etapas\n`);
    console.log('Etapas que serão criadas:');
    funilComercialConfig.stages.forEach((stage, idx) => {
      console.log(`  ${idx + 1}. ${stage.name}`);
    });
    console.log('');

    // Obter lista de pipelines existentes
    console.log('🔍 Buscando pipeline existente em GHL...\n');

    const pipelinesResponse = await axios.get(
      `${API_BASE}/opportunities/pipelines`,
      {
        headers: {
          Authorization: `Bearer ${PIT}`,
          Version: '2021-07-28',
        },
        params: {
          locationId: LOCATION_ID
        }
      }
    );

    const existingPipeline = pipelinesResponse.data.pipelines?.find(
      p => p.name === 'Funil Comercial'
    );

    if (!existingPipeline) {
      console.log('⚠️  Pipeline "Funil Comercial" não encontrado em GHL');
      console.log('Criando novo pipeline com 10 etapas...\n');

      // Criar novo pipeline
      const createResponse = await axios.post(
        `${API_BASE}/opportunities/pipelines`,
        {
          name: funilComercialConfig.name,
          locationId: LOCATION_ID,
          stages: funilComercialConfig.stages.map(stage => ({
            name: stage.name,
            description: stage.description,
          })),
        },
        {
          headers: {
            Authorization: `Bearer ${PIT}`,
            Version: '2021-07-28',
          },
        }
      );

      console.log('✅ Pipeline criado com sucesso!\n');
      console.log(`ID: ${createResponse.data.id}`);
      console.log(`Nome: ${createResponse.data.name}`);
      console.log(`Etapas: ${createResponse.data.stages?.length || 0}`);

      return createResponse.data;
    }

    // Se existe, tentar atualizar com PUT
    console.log(`✅ Pipeline encontrado: ${existingPipeline.id}`);
    console.log(`   Etapas atuais: ${existingPipeline.stages?.length || 0}`);
    console.log(`   Etapas esperadas: ${funilComercialConfig.stages.length}\n`);

    console.log('🔄 Tentando atualizar pipeline com PUT...\n');

    try {
      const updateResponse = await axios.put(
        `${API_BASE}/opportunities/pipelines/${existingPipeline.id}`,
        {
          name: funilComercialConfig.name,
          stages: funilComercialConfig.stages.map(stage => ({
            name: stage.name,
            description: stage.description,
          })),
        },
        {
          headers: {
            Authorization: `Bearer ${PIT}`,
            Version: '2021-07-28',
          },
        }
      );

      console.log('✅ Pipeline atualizado com sucesso!\n');
      console.log(`Nome: ${updateResponse.data.name}`);
      console.log(`Etapas: ${updateResponse.data.stages?.length || 0}`);
      console.log('\nEtapas criadas:');
      updateResponse.data.stages?.forEach((stage, idx) => {
        console.log(`  ${idx + 1}. ${stage.name}`);
      });

      return updateResponse.data;

    } catch (updateError) {
      console.log('⚠️  PUT não funcionou. Tentando PATCH...\n');

      try {
        const patchResponse = await axios.patch(
          `${API_BASE}/opportunities/pipelines/${existingPipeline.id}`,
          {
            stages: funilComercialConfig.stages.map(stage => ({
              name: stage.name,
              description: stage.description,
            })),
          },
          {
            headers: {
              Authorization: `Bearer ${PIT}`,
              Version: '2021-07-28',
            },
          }
        );

        console.log('✅ Pipeline atualizado com PATCH!\n');
        console.log(`Etapas: ${patchResponse.data.stages?.length || 0}`);
        return patchResponse.data;

      } catch (patchError) {
        console.log('❌ Atualização não suportada via API em GHL\n');
        console.log('📌 Solução manual (5 minutos):\n');
        console.log('   1. Abra: https://app.gohighlevel.com/');
        console.log('   2. Vá para: Opportunities → Pipelines → Funil Comercial');
        console.log('   3. Clique em "Edit Pipeline"');
        console.log('   4. Atualize as etapas para:\n');

        funilComercialConfig.stages.forEach((stage, idx) => {
          console.log(`      ${idx + 1}. ${stage.name}`);
        });

        console.log('\n   5. Salve as mudanças\n');
        console.log('   Arquivo config já foi atualizado automaticamente ✅');

        return existingPipeline;
      }
    }

  } catch (error) {
    console.error('\n❌ ERRO:', error.message);
    if (error.response?.data) {
      console.error('Resposta GHL:', error.response.data);
    }
    process.exit(1);
  }
}

actualizarFunilComercial();
