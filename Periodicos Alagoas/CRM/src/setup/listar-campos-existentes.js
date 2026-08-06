import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const LOCATION_ID = process.env.GHL_LOCATION_ID;
const PIT = process.env.GHL_PIT_TOKEN;
const API_BASE = process.env.GHL_API_URL;

async function listarCamposExistentes() {
  try {
    console.log('\n');
    console.log('█████████████████████████████████████████████████████');
    console.log('█                                                   █');
    console.log('█  📋 LISTAR: Campos Personalizados em GHL 📋      █');
    console.log('█                                                   █');
    console.log('█████████████████████████████████████████████████████\n');

    const headers = {
      Authorization: `Bearer ${PIT}`,
      Version: '2021-07-28',
      'Content-Type': 'application/json'
    };

    console.log('🔍 Buscando custom fields em GHL...\n');

    // Tentar diferentes endpoints
    let campos = [];
    let endpoint = '';

    // Opción 1: Endpoint opportunities/custom-fields
    try {
      console.log('Tentando: GET /opportunities/custom-fields...');
      const response = await axios.get(
        `${API_BASE}/opportunities/custom-fields`,
        {
          headers,
          params: { locationId: LOCATION_ID }
        }
      );
      campos = response.data.customFields || response.data.fields || response.data;
      endpoint = '/opportunities/custom-fields';
      console.log('✅ Sucesso!\n');
    } catch (error1) {
      console.log(`❌ Falhou: ${error1.response?.data?.message || error1.message}\n`);

      // Opción 2: Endpoint contacts/custom-fields
      try {
        console.log('Tentando: GET /contacts/custom-fields...');
        const response = await axios.get(
          `${API_BASE}/contacts/custom-fields`,
          {
            headers,
            params: { locationId: LOCATION_ID }
          }
        );
        campos = response.data.customFields || response.data.fields || response.data;
        endpoint = '/contacts/custom-fields';
        console.log('✅ Sucesso!\n');
      } catch (error2) {
        console.log(`❌ Falhou: ${error2.response?.data?.message || error2.message}\n`);

        // Opción 3: Endpoint locations/custom-fields
        try {
          console.log('Tentando: GET /locations/{id}/custom-fields...');
          const response = await axios.get(
            `${API_BASE}/locations/${LOCATION_ID}/custom-fields`,
            { headers }
          );
          campos = response.data.customFields || response.data.fields || response.data;
          endpoint = `/locations/${LOCATION_ID}/custom-fields`;
          console.log('✅ Sucesso!\n');
        } catch (error3) {
          console.log(`❌ Falhou: ${error3.response?.data?.message || error3.message}\n`);
          throw new Error('Nenhum endpoint funcionou para listar custom fields');
        }
      }
    }

    console.log('═══════════════════════════════════════════════════════');
    console.log(`\n📊 CAMPOS PERSONALIZADOS ENCONTRADOS (${campos.length})\n`);
    console.log(`Endpoint usado: ${endpoint}\n`);

    if (campos.length === 0) {
      console.log('❌ Nenhum campo encontrado em GHL\n');
      return [];
    }

    // Organizar por tipo/categoría
    const porTipo = {};

    campos.forEach(campo => {
      const nome = campo.name || campo.displayName || campo.fieldName || 'Unknown';
      const tipo = campo.dataType || campo.type || 'unknown';
      const categoria = campo.category || 'sin-categoria';

      if (!porTipo[tipo]) {
        porTipo[tipo] = [];
      }
      porTipo[tipo].push({
        nome,
        tipo,
        categoria,
        original: campo
      });
    });

    // Mostrar por tipo
    Object.entries(porTipo).forEach(([tipo, campos]) => {
      console.log(`\n📌 Tipo: ${tipo} (${campos.length} campos)`);
      console.log('─'.repeat(50));
      campos.forEach((campo, idx) => {
        console.log(`${idx + 1}. ${campo.nome}`);
        if (campo.categoria && campo.categoria !== 'sin-categoria') {
          console.log(`   └─ Categoría: ${campo.categoria}`);
        }
      });
    });

    console.log('\n═══════════════════════════════════════════════════════');
    console.log('\n📋 CAMPOS ESPERADOS (de config/custom-fields.json)\n');

    const esperados = {
      comercial: [
        'Origem do Lead',
        'Região de Atendimento',
        'Condição de Saúde',
        'Responsável Familiar',
        'Modalidade',
        'Frequência Semanal',
        'Ticket / Pacote'
      ],
      operacional: [
        'Personal Responsável',
        'Data de Avaliação',
        'Data de Reavaliação',
        'Aniversário',
        'Data da Primeira Aula',
        'Observações de Saúde'
      ],
      recrutamento: [
        'Vaga Aplicada',
        'Experiência (Anos)',
        'Certificações',
        'Disponibilidade',
        'Score de Triagem',
        'Resumo do Candidato',
        'Data de Triagem',
        'Data de Entrevista',
        'Notas de Entrevista',
        'Motivo da Rejeição'
      ]
    };

    console.log('✅ COMERCIAL (7 campos):');
    esperados.comercial.forEach(campo => {
      const existe = campos.some(c =>
        c.nome.toLowerCase().includes(campo.toLowerCase())
      );
      console.log(`   ${existe ? '✅' : '❌'} ${campo}`);
    });

    console.log('\n⚙️  OPERACIONAL (6 campos):');
    esperados.operacional.forEach(campo => {
      const existe = campos.some(c =>
        c.nome.toLowerCase().includes(campo.toLowerCase())
      );
      console.log(`   ${existe ? '✅' : '❌'} ${campo}`);
    });

    console.log('\n👤 RECRUTAMENTO (10 campos):');
    esperados.recrutamento.forEach(campo => {
      const existe = campos.some(c =>
        c.nome.toLowerCase().includes(campo.toLowerCase())
      );
      console.log(`   ${existe ? '✅' : '❌'} ${campo}`);
    });

    console.log('\n═══════════════════════════════════════════════════════\n');

    return campos;

  } catch (error) {
    console.error('\n❌ ERRO:', error.message);
    console.error('Stack:', error.stack);
    process.exit(1);
  }
}

listarCamposExistentes();
