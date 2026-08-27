#!/usr/bin/env node

/**
 * Script para crear los 4 Pipelines definidos para la Clínica de Carlos Perlaza
 * Con todas sus sub-etapas específicas
 *
 * Pipelines a crear:
 * 1. CONSULTA INICIAL (6 etapas)
 * 2. APARATOLOGÍA (5 etapas)
 * 3. INACTIVOS + REACTIVACIÓN (3 etapas)
 * 4. RECURRENCIA (3 etapas)
 */

import dotenv from 'dotenv';
import axios from 'axios';
import fs from 'fs';

dotenv.config();

const locationId = process.env.GHL_LOCATION_ID;
const pitToken = process.env.GHL_PIT_TOKEN;
const apiUrl = process.env.GHL_API_URL;

const headers = {
  'Authorization': `Bearer ${pitToken}`,
  'Content-Type': 'application/json',
  'Version': '2021-07-28'
};

// Definición de pipelines y sus etapas
const pipelinesDefinicion = [
  {
    name: 'CONSULTA INICIAL',
    description: 'Conversión de leads en pacientes (tratamientos generales)',
    color: '#3498db',
    stages: [
      { name: 'LEAD CAPTURADO', description: 'Lead llega por formulario, WhatsApp o Instagram' },
      { name: 'LEAD CUALIFICADO', description: 'Secretaria valida interés y capacidad de pago' },
      { name: 'CITA AGENDADA', description: 'Paciente selecciona fecha/hora y confirma' },
      { name: 'CONSULTA REALIZADA', description: 'Doctor completa consulta y genera notas' },
      { name: 'CONVERTIDO', description: 'Paciente contrata servicios' },
      { name: 'PERDIDO', description: 'Paciente no contrató - move a Inactivos' }
    ]
  },
  {
    name: 'APARATOLOGÍA',
    description: 'Gestión de sesiones con máquinas láser (21 máquinas)',
    color: '#e74c3c',
    stages: [
      { name: 'CONSULTA / EVALUACIÓN', description: 'Lead interesado en máquina específica' },
      { name: 'CANDIDATO APROBADO', description: 'Doctor evalúa y aprueba candidatura' },
      { name: 'PRIMERA SESIÓN', description: 'Paciente paga y completa primera sesión' },
      { name: 'SESIONES 2-X', description: 'Sesiones en progreso (ciclo de tratamiento)' },
      { name: 'CICLO COMPLETADO', description: 'Paciente completó todas las sesiones del plan' }
    ]
  },
  {
    name: 'INACTIVOS + REACTIVACIÓN',
    description: 'Pacientes sin contacto >30 días + estrategias de re-engagement',
    color: '#f39c12',
    stages: [
      { name: 'INACTIVO DETECTADO', description: 'Sistema detecta >30 días sin contacto' },
      { name: 'RAZÓN IDENTIFICADA', description: 'Paciente responde o secretaria investiga' },
      { name: 'REACTIVADO / PERDIDO', description: 'Paciente regresa o se archiva permanentemente' }
    ]
  },
  {
    name: 'RECURRENCIA',
    description: 'Ciclos periódicos (30d, 60d, 90d, trimestral, semestral)',
    color: '#27ae60',
    stages: [
      { name: 'EN RECURRENCIA', description: 'Paciente en ciclo activo (30/60/90d/trim/sem)' },
      { name: 'SESIÓN COMPLETADA', description: 'Doctor completa tratamiento recurrente' },
      { name: 'PRÓXIMA RECURRENCIA', description: 'Sistema calcula próxima fecha automáticamente' }
    ]
  }
];

async function crearPipelines() {
  console.log('\n🚀 CREANDO PIPELINES PARA CLÍNICA DE CARLOS PERLAZA\n');
  console.log('═'.repeat(70));

  const pipelinesCreados = [];
  let contador = 0;

  for (const pipelineDef of pipelinesDefinicion) {
    contador++;
    console.log(`\n[${contador}/${pipelinesDefinicion.length}] Creando: ${pipelineDef.name}`);
    console.log('─'.repeat(70));

    try {
      // Crear pipeline
      console.log('  📝 Creando pipeline base...');
      const pipelineResponse = await axios.post(
        `${apiUrl}/pipelines`,
        {
          name: pipelineDef.name,
          locationId: locationId
        },
        { headers }
      );

      const pipelineId = pipelineResponse.data?.pipeline?.id;
      console.log(`  ✅ Pipeline creado: ${pipelineId}`);

      // Crear etapas
      console.log(`  📊 Creando ${pipelineDef.stages.length} etapas...`);
      const stagesCreadas = [];

      for (let i = 0; i < pipelineDef.stages.length; i++) {
        const stage = pipelineDef.stages[i];

        try {
          const stageResponse = await axios.post(
            `${apiUrl}/pipelines/${pipelineId}/stages`,
            {
              name: stage.name,
              position: i + 1
            },
            { headers }
          );

          const stageId = stageResponse.data?.stage?.id || stageResponse.data?.id;
          stagesCreadas.push({
            id: stageId,
            name: stage.name,
            position: i + 1,
            description: stage.description
          });

          console.log(`     ✅ Etapa ${i + 1}: ${stage.name}`);
        } catch (stageError) {
          console.log(`     ⚠️  Etapa ${i + 1}: ${stage.name} (posible que ya exista)`);
          stagesCreadas.push({
            name: stage.name,
            position: i + 1,
            description: stage.description,
            error: stageError.response?.data?.message
          });
        }
      }

      // Guardar información del pipeline creado
      pipelinesCreados.push({
        nombre: pipelineDef.name,
        descripcion: pipelineDef.description,
        id: pipelineId,
        etapas: stagesCreadas,
        fechaCreacion: new Date().toISOString(),
        color: pipelineDef.color
      });

      console.log(`  ✨ Pipeline completado: ${pipelineDef.name} (${stagesCreadas.length} etapas)`);

    } catch (error) {
      console.error(`  ❌ Error creando pipeline: ${error.response?.data?.message || error.message}`);
    }
  }

  // GUARDAR RESULTADO EN JSON
  console.log('\n\n' + '═'.repeat(70));
  console.log('📁 GUARDANDO CONFIGURACIÓN\n');

  const resultado = {
    ubicacion: locationId,
    fecha: new Date().toISOString(),
    pipelinesCreados: pipelinesCreados.length,
    pipelines: pipelinesCreados
  };

  const archivoSalida = './config/pipelines-creados.json';

  try {
    fs.writeFileSync(archivoSalida, JSON.stringify(resultado, null, 2));
    console.log(`✅ Configuración guardada en: ${archivoSalida}`);
  } catch (error) {
    console.log(`⚠️  No se pudo guardar archivo: ${error.message}`);
  }

  // RESUMEN FINAL
  console.log('\n\n' + '═'.repeat(70));
  console.log('✅ RESUMEN FINAL\n');

  pipelinesCreados.forEach((pipeline, index) => {
    console.log(`[${index + 1}] ${pipeline.nombre}`);
    console.log(`    ID: ${pipeline.id}`);
    console.log(`    Etapas: ${pipeline.etapas.length}`);
    console.log(`    └─ ${pipeline.etapas.map(e => e.name).join(' → ')}`);
    console.log('');
  });

  console.log('═'.repeat(70));
  console.log('\n📊 ESTADÍSTICAS:');
  console.log(`   Total de pipelines creados: ${pipelinesCreados.length}`);
  console.log(`   Total de etapas creadas: ${pipelinesCreados.reduce((sum, p) => sum + p.etapas.length, 0)}`);
  console.log('\n✨ ¡Pipelines listos para usar en GHL!\n');

  // Mostrar comandos de próximos pasos
  console.log('🎯 PRÓXIMOS PASOS:\n');
  console.log('1. Revisar los pipelines en GHL Console (Settings → Pipelines)');
  console.log('2. Configurar etiquetas (Tags) automáticas');
  console.log('3. Crear campos personalizados (Custom Fields)');
  console.log('4. Configurar automaciones (Workflows)');
  console.log('5. Integrar WhatsApp API');
  console.log('6. Integrar Stripe para pagos\n');

  return resultado;
}

// Ejecutar
try {
  const resultado = await crearPipelines();
  process.exit(0);
} catch (error) {
  console.error('❌ Error fatal:', error.message);
  process.exit(1);
}
