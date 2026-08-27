#!/usr/bin/env node
import axios from 'axios';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const LOCATION_ID = process.env.GHL_LOCATION_ID;
const PIT = process.env.GHL_PIT_TOKEN;

async function extraerPipelines() {
  try {
    console.log('\n🔍 EXTRAYENDO IDs DE PIPELINES...\n');

    const headers = {
      'Authorization': `Bearer ${PIT}`,
      'Content-Type': 'application/json'
    };

    const response = await axios.get(
      'https://rest.gohighlevel.com/v1/opportunities/pipelines',
      {
        headers,
        params: { locationId: LOCATION_ID }
      }
    );

    const pipelines = response.data.pipelines || [];

    console.log(`✅ Encontrados ${pipelines.length} pipelines:\n`);

    const idMap = {};

    pipelines.forEach(pipeline => {
      console.log(`📊 ${pipeline.name}`);
      console.log(`   ID: ${pipeline.id}`);
      console.log(`   Etapas: ${pipeline.stages?.length || 0}`);
      
      if (pipeline.stages && pipeline.stages.length > 0) {
        pipeline.stages.forEach(stage => {
          console.log(`      → ${stage.name} (${stage.id})`);
        });
      }
      console.log('');
      
      idMap[pipeline.name] = {
        id: pipeline.id,
        stages: (pipeline.stages || []).map(s => ({
          name: s.name,
          id: s.id
        }))
      };
    });

    // Guardar en archivo
    const archivoSalida = './config/pipelines-ids.json';
    fs.writeFileSync(archivoSalida, JSON.stringify(idMap, null, 2));
    console.log(`✅ Guardado en: ${archivoSalida}\n`);

    // Salida en JSON
    console.log('═══════════════════════════════════════════════════════\n');
    console.log('📋 JSON PARA COPIAR A TU CONFIG:\n');
    console.log(JSON.stringify(idMap, null, 2));
    console.log('\n═══════════════════════════════════════════════════════\n');

    return idMap;

  } catch (error) {
    console.error('❌ ERROR:', error.response?.data || error.message);
    process.exit(1);
  }
}

extraerPipelines();
