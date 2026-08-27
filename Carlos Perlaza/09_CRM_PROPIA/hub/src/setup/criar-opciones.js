import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const LOCATION_ID = process.env.GHL_LOCATION_ID;
const PIT = process.env.GHL_PIT_TOKEN;
const API_BASE = 'https://services.leadconnectorhq.com';

const headers = {
  Authorization: `Bearer ${PIT}`,
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Version': '2021-07-28'
};

// Los 3 campos que todavía faltan (con opciones)
const camposComOpciones = [
  {
    displayName: 'Vaga Aplicada',
    description: 'Qual posição o candidato está se candidatando',
    dataType: 'SINGLE_OPTIONS',
    options: [
      'Personal Trainer Domiciliar',
      'Personal Trainer Academia',
      'Trainer Presencial',
      'Outro'
    ]
  },
  {
    displayName: 'Experiência (Anos)',
    description: 'Anos de experiência como personal trainer (para scoring automático)',
    dataType: 'SINGLE_OPTIONS',
    options: [
      'Menos de 2 anos',
      '2-5 anos',
      '5-10 anos',
      'Mais de 10 anos'
    ]
  },
  {
    displayName: 'Certificações',
    description: 'Certificações profissionais relevantes',
    dataType: 'SINGLE_OPTIONS',
    options: [
      'CREF ativo',
      'CREF vencido',
      'Sem CREF',
      'Outras certificações'
    ]
  }
];

async function criarOpcoes() {
  console.log('\n');
  console.log('█████████████████████████████████████████████████████');
  console.log('█                                                   █');
  console.log('█  🚀 CRIAR: 3 Campos Select com Opciones         █');
  console.log('█                                                   █');
  console.log('█████████████████████████████████████████████████████\n');

  let exitosos = 0;
  let errores = 0;

  for (const campo of camposComOpciones) {
    try {
      console.log(`📝 Creando: ${campo.displayName}...`);

      const payload = {
        name: campo.displayName,
        dataType: campo.dataType,
        model: 'opportunity',
        position: 0,
        options: campo.options.map(opt => opt.trim())
      };

      console.log(`   Opciones: ${JSON.stringify(payload.options)}`);

      const response = await axios.post(
        `${API_BASE}/locations/${LOCATION_ID}/customFields`,
        payload,
        { headers, timeout: 15000 }
      );

      console.log(`   ✅ Creado exitosamente!\n`);
      exitosos++;

    } catch (error) {
      const errorMsg = error.response?.data?.message ||
                      error.response?.data?.error ||
                      error.message;
      console.error(`   ❌ Error: ${errorMsg}\n`);
      errores++;
    }
  }

  console.log('═══════════════════════════════════════════════════════\n');
  console.log('📊 RESUMEN\n');
  console.log(`✅ Exitosos: ${exitosos}`);
  console.log(`❌ Errores: ${errores}`);
  console.log('\n═══════════════════════════════════════════════════════\n');

  if (errores === 0) {
    console.log('✅ FASE 2 COMPLETA - Todos los 13 campos creados!\n');
  }
}

criarOpcoes();
