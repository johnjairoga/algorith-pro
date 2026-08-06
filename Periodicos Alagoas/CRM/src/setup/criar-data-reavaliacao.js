import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const LOCATION_ID = process.env.GHL_LOCATION_ID;
const PIT = process.env.GHL_PIT_TOKEN;
const API_BASE = 'https://services.leadconnectorhq.com';

async function criarDataReavaliacao() {
  try {
    console.log('\n🚀 CRIAR: Campo "Data de Reavaliação"\n');

    const headers = {
      Authorization: `Bearer ${PIT}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Version': '2021-07-28'
    };

    const payload = {
      name: 'Data de Reavaliação',
      dataType: 'DATE',
      model: 'opportunity',
      description: 'Próxima reavaliação trimestral do aluno',
      position: 0
    };

    console.log('📝 Criando campo...');
    console.log('Payload:', JSON.stringify(payload, null, 2));

    const response = await axios.post(
      `${API_BASE}/locations/${LOCATION_ID}/customFields`,
      payload,
      { headers }
    );

    console.log('\n✅ SUCESSO!\n');
    console.log('Campo criado:');
    console.log(JSON.stringify(response.data, null, 2));

    if (response.data.id) {
      console.log(`\n✅ ID do campo: ${response.data.id}`);
      console.log(`✅ Nome: ${response.data.name}`);
      console.log(`✅ Type: ${response.data.dataType}`);
    }

  } catch (error) {
    console.error('\n❌ ERRO ao criar campo:');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Dados:', JSON.stringify(error.response.data, null, 2));
    } else {
      console.error(error.message);
    }
    process.exit(1);
  }
}

criarDataReavaliacao();
