import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const LOCATION_ID = process.env.GHL_LOCATION_ID;
const PIT = process.env.GHL_PIT_TOKEN;

async function criarCalendarioRoundRobin() {
  try {
    console.log('\n');
    console.log('█████████████████████████████████████████████████████');
    console.log('█                                                   █');
    console.log('█  📅 CRIAR: Personal Trainer Disponível 📅        █');
    console.log('█                                                   █');
    console.log('█████████████████████████████████████████████████████\n');

    const payload = {
      isActive: true,
      locationId: LOCATION_ID,
      name: "Personal Trainer Disponível",
      description: "Calendário centralizado round-robin para distribuição automática de aulas entre personal trainers. Agrega usuários de PT quando estiverem criados em GHL.",
      calendarType: "round_robin",
      eventType: "RoundRobin_OptimizeForAvailability",
      eventColor: "#2196F3",
      eventTitle: "Aula - {{contact.name}}",
      widgetType: "classic",
      slotDuration: 60,
      slotDurationUnit: "mins",
      slotInterval: 60,
      slotIntervalUnit: "mins",
      slotBuffer: 0,
      slotBufferUnit: "mins",
      preBuffer: 0,
      preBufferUnit: "mins",
      appoinmentPerSlot: 1,
      appoinmentPerDay: 0,
      allowBookingAfter: 0,
      allowBookingAfterUnit: "days",
      allowBookingFor: 0,
      allowBookingForUnit: "days",
      enableRecurring: false,
      autoConfirm: true,
      allowReschedule: true,
      allowCancellation: true,
      googleInvitationEmails: false,
      teamMembers: [
        {
          userId: '1EMr48bl5VZHEgvPixx8',
          isPrimary: true,
          priority: 1,
          locationConfigurations: [{ kind: 'custom' }]
        },
        {
          userId: 'CrjEKyAnFPG1MP1Ux1NO',
          isPrimary: false,
          priority: 0.5,
          locationConfigurations: [{ kind: 'custom' }]
        }
      ]
    };

    console.log('📋 Configuração:');
    console.log(`   Nome: ${payload.name}`);
    console.log(`   Tipo: ${payload.calendarType}`);
    console.log(`   Distribuição: Round-Robin (rotativo)`);
    console.log(`   Duração aula: ${payload.slotDuration} minutos`);
    console.log(`   Team members: [Vazio - adicionar depois]\n`);

    const ghlClient = axios.create({
      baseURL: 'https://services.leadconnectorhq.com',
      headers: {
        Authorization: `Bearer ${PIT}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Version': '2021-07-28'
      }
    });

    console.log('📡 POST https://services.leadconnectorhq.com/calendars/');
    const response = await ghlClient.post(`/calendars/`, payload);

    const calendarId = response.data?.calendar?.id || response.calendar?.id;

    console.log(`\n✅ Calendário criado com sucesso`);
    console.log(`   ID: ${calendarId}`);
    console.log(`   Nome: Personal Trainer Disponível`);
    console.log(`   Tipo: round_robin`);
    console.log(`\n📌 PRÓXIMO PASSO:`);
    console.log(`   1. Criar usuários de PT em GHL (staff members)`);
    console.log(`   2. Adicionar ao time do calendário com IDs de usuário reais`);
    console.log(`   3. Cada PT sincroniza seu Google Calendar\n`);

    return calendarId;
  } catch (error) {
    console.error('❌ Erro:', error.response?.data || error.message);
    process.exit(1);
  }
}

criarCalendarioRoundRobin().then(() => {
  process.exit(0);
});
