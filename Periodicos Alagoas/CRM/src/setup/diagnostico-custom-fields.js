import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const LOCATION_ID = process.env.GHL_LOCATION_ID;
const PIT = process.env.GHL_PIT_TOKEN;
const API_BASE = process.env.GHL_API_URL;

async function diagnosticar() {
  try {
    console.log('\n');
    console.log('█████████████████████████████████████████████████████');
    console.log('█                                                   █');
    console.log('█  🔍 DIAGNÓSTICO: Custom Fields em GHL v2.0 🔍    █');
    console.log('█                                                   █');
    console.log('█████████████████████████████████████████████████████\n');

    console.log('📋 Verificando configuração...\n');
    console.log(`Location ID: ${LOCATION_ID}`);
    console.log(`API Base: ${API_BASE}`);
    console.log(`PIT: ${PIT.substring(0, 10)}...\n`);

    const headers = {
      Authorization: `Bearer ${PIT}`,
      Version: '2021-07-28',
      'Content-Type': 'application/json'
    };

    // Teste 1: Verificar se o location está acessível
    console.log('═══════════════════════════════════════════════════════');
    console.log('Teste 1: Verificar localização\n');

    try {
      const locationResponse = await axios.get(
        `${API_BASE}/locations/${LOCATION_ID}`,
        { headers }
      );
      console.log('✅ Localização acessível');
      console.log(`   Nome: ${locationResponse.data.location?.name || locationResponse.data.name}\n`);
    } catch (error) {
      console.log('❌ Erro ao acessar localização');
      console.log(`   ${error.response?.data?.message || error.message}\n`);
    }

    // Teste 2: Tentar endpoint v1
    console.log('═══════════════════════════════════════════════════════');
    console.log('Teste 2: Endpoint v1 (legacy)\n');

    try {
      const v1Response = await axios.post(
        `${API_BASE}/locations/${LOCATION_ID}/custom-fields`,
        {
          name: 'test_field_v1',
          displayName: 'Test Field V1',
          type: 'text'
        },
        { headers }
      );
      console.log('✅ Endpoint v1 funciona!');
      console.log(`   ID: ${v1Response.data.id || v1Response.data.customField?.id}\n`);
    } catch (error) {
      console.log('❌ Endpoint v1 não funciona');
      console.log(`   ${error.response?.data?.message || error.message}\n`);
    }

    // Teste 3: Tentar endpoint opportunities
    console.log('═══════════════════════════════════════════════════════');
    console.log('Teste 3: Endpoint opportunities\n');

    try {
      const oppResponse = await axios.post(
        `${API_BASE}/opportunities/custom-fields`,
        {
          name: 'test_field_opp',
          displayName: 'Test Field Opportunity',
          type: 'text',
          locationId: LOCATION_ID
        },
        { headers }
      );
      console.log('✅ Endpoint opportunities funciona!');
      console.log(`   ID: ${oppResponse.data.id || oppResponse.data.customField?.id}\n`);
    } catch (error) {
      console.log('❌ Endpoint opportunities não funciona');
      console.log(`   ${error.response?.data?.message || error.message}\n`);
    }

    // Teste 4: Tentar endpoint contacts
    console.log('═══════════════════════════════════════════════════════');
    console.log('Teste 4: Endpoint contacts\n');

    try {
      const contactResponse = await axios.post(
        `${API_BASE}/contacts/custom-fields`,
        {
          name: 'test_field_contact',
          displayName: 'Test Field Contact',
          type: 'text',
          locationId: LOCATION_ID
        },
        { headers }
      );
      console.log('✅ Endpoint contacts funciona!');
      console.log(`   ID: ${contactResponse.data.id || contactResponse.data.customField?.id}\n`);
    } catch (error) {
      console.log('❌ Endpoint contacts não funciona');
      console.log(`   ${error.response?.data?.message || error.message}\n`);
    }

    console.log('═══════════════════════════════════════════════════════\n');
    console.log('📌 PRÓXIMOS PASSOS:\n');
    console.log('Se algum teste passou, use esse endpoint para criar campos.\n');

  } catch (error) {
    console.error('\n❌ ERRO GERAL:', error.message);
    process.exit(1);
  }
}

diagnosticar();
