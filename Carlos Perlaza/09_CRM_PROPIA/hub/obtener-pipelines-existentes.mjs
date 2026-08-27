#!/usr/bin/env node
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const locationId = process.env.GHL_LOCATION_ID;
const pitToken = process.env.GHL_PIT_TOKEN;

const headers = {
  'Authorization': `Bearer ${pitToken}`,
  'Content-Type': 'application/json',
  'Version': '2021-07-28'
};

async function obtenerPipelines() {
  try {
    console.log('\n█████████████████████████████████████████████████████');
    console.log('█  📊 Obteniendo PIPELINES existentes...           █');
    console.log('█████████████████████████████████████████████████████\n');

    const res = await axios.get(
      `https://services.leadconnectorhq.com/locations/${locationId}/pipelines`,
      { headers }
    );

    const pipelines = res.data.pipelines || [];
    
    console.log(`✅ Encontradas ${pipelines.length} pipelines\n`);
    console.log('═════════════════════════════════════════════════════════\n');

    for (const pipeline of pipelines) {
      console.log(`📌 PIPELINE: ${pipeline.name}`);
      console.log(`   ID: ${pipeline.id}`);
      console.log(`   Stages: ${pipeline.stages?.length || 0}`);
      
      if (pipeline.stages && pipeline.stages.length > 0) {
        console.log(`   Stages:`);
        pipeline.stages.forEach((stage, idx) => {
          console.log(`     ${idx + 1}. ${stage.name} (ID: ${stage.id})`);
        });
      }
      console.log();
    }

    // Generar JSON para copiar
    console.log('═════════════════════════════════════════════════════════');
    console.log('\n📋 JSON PARA DOCUMENTAR:\n');
    
    const pipelineData = {};
    for (const pipeline of pipelines) {
      pipelineData[pipeline.name] = {
        id: pipeline.id,
        stages: pipeline.stages?.map(s => ({
          nombre: s.name,
          id: s.id
        })) || []
      };
    }

    console.log(JSON.stringify(pipelineData, null, 2));

    // Resumen
    console.log('\n═════════════════════════════════════════════════════════');
    console.log(`\n✅ RESUMEN:`);
    console.log(`   Total Pipelines: ${pipelines.length}`);
    console.log(`   Total Stages: ${pipelines.reduce((sum, p) => sum + (p.stages?.length || 0), 0)}`);
    console.log('\n');

  } catch (e) {
    console.error('❌ Error:', e.response?.data?.message || e.message);
    process.exit(1);
  }
}

obtenerPipelines();
