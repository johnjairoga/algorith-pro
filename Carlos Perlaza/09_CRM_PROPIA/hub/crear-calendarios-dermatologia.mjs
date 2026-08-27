import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const PIT = process.env.GHL_PIT_TOKEN;
const LOCATION_ID = process.env.GHL_LOCATION_ID;
const API_URL = process.env.GHL_API_URL || 'https://services.leadconnectorhq.com';

// Configuración de los 8 calendarios de dermatología
const CALENDARIOS_DERMATOLOGIA = [
  {
    name: 'Cirugía Plástica Facial',
    slug: 'cirugia-plastica-facial',
    description: 'Procedimientos quirúrgicos faciales (rinoplastia, blepharoplastia, lifting). Duración: 180-210 min.',
    slotDuration: 210,
    eventColor: '#D32F2F',
    pipeline: 'Consulta Inicial',
    notes: 'Requiere consulta previa. Período de recuperación: 3-5 días.'
  },
  {
    name: 'Cirugía Plástica Corporal',
    slug: 'cirugia-plastica-corporal',
    description: 'Procedimientos quirúrgicos corporales (abdominoplastia, liposucción, aumento de senos). Duración: 210-270 min.',
    slotDuration: 270,
    eventColor: '#C2185B',
    pipeline: 'Consulta Inicial',
    notes: 'Requiere consulta previa. Período de recuperación: 5-7 días.'
  },
  {
    name: 'Cirugía de Restauración Capilar',
    slug: 'cirugia-restauracion-capilar',
    description: 'Injertos de cabello (FUE, FUT) y trasplante capilar. Duración: 300-390 min.',
    slotDuration: 390,
    eventColor: '#7B1FA2',
    pipeline: 'Consulta Inicial',
    notes: 'Requiere evaluación de zona donante/receptora. Resultados: 3-6 meses.'
  },
  {
    name: 'Tratamiento de Restauración Capilar',
    slug: 'tratamiento-restauracion-capilar',
    description: 'PRP capilar, mesoterapia, láser de baja potencia. Duración: 60 min. Sesiones múltiples cada 3-4 semanas.',
    slotDuration: 60,
    eventColor: '#512DA8',
    pipeline: 'Recurrencia',
    notes: 'Tratamiento recurrente (4-6 sesiones). Ciclo: cada 3-4 semanas.'
  },
  {
    name: 'Moldeo Corporal',
    slug: 'moldeo-corporal',
    description: 'CoolSculpting, radiofrecuencia, ultrasonido cavitacional. Duración: 75-105 min. Sesiones múltiples cada 4-6 semanas.',
    slotDuration: 90,
    eventColor: '#1976D2',
    pipeline: 'Aparatología',
    notes: 'Tratamiento con máquinas. Sesiones múltiples (2-4). Ciclo: cada 4-6 semanas.'
  },
  {
    name: 'Tratamientos Láser',
    slug: 'tratamientos-laser',
    description: 'Depilación láser, resurfacing, remoción de cicatrices, rejuvenecimiento. Duración: 45-75 min. Sesiones múltiples.',
    slotDuration: 60,
    eventColor: '#F57F17',
    pipeline: 'Aparatología',
    notes: 'Requiere consulta previa. Ciclo: 4-8 sesiones cada 4-6 semanas. NO sol 2 semanas antes/después.'
  },
  {
    name: 'Medicina Estética Antienvejecimiento',
    slug: 'medicina-estetica-antienvejecimiento',
    description: 'Botox, fillers, PRP y otros inyectables anti-envejecimiento. Duración: 30-55 min. Recurrente cada 3-12 meses.',
    slotDuration: 45,
    eventColor: '#388E3C',
    pipeline: 'Recurrencia',
    notes: 'Cliente VIP recurrente. Botox: cada 90 días. Fillers: cada 6-12 meses.'
  },
  {
    name: 'Dermatología y Alergias',
    slug: 'dermatologia-alergias',
    description: 'Consulta dermatológica general, tratamiento de acné/rosácea, pruebas de alergia. Duración: 40-55 min.',
    slotDuration: 50,
    eventColor: '#00796B',
    pipeline: 'Consulta Inicial',
    notes: 'No requiere consulta previa (es la consulta misma). Puede derivar a otros servicios.'
  }
];

async function crearCalendariosDermatologia() {
  try {
    console.log('\n📅 CREANDO 8 CALENDARIOS DE DERMATOLOGÍA...\n');
    console.log(`📍 Location ID: ${LOCATION_ID}`);
    console.log(`📊 Total a crear: ${CALENDARIOS_DERMATOLOGIA.length}\n`);
    console.log('═══════════════════════════════════════════════════════\n');

    const results = {
      success: [],
      failed: [],
      byCalendar: {},
      startTime: new Date(),
    };

    for (let i = 0; i < CALENDARIOS_DERMATOLOGIA.length; i++) {
      const cal = CALENDARIOS_DERMATOLOGIA[i];
      console.log(`[${i + 1}/${CALENDARIOS_DERMATOLOGIA.length}] ${cal.name}`);
      console.log(`   Duración: ${cal.slotDuration} min | Pipeline: ${cal.pipeline}`);

      try {
        const response = await axios.post(
          `${API_URL}/calendars/`,
          {
            isActive: true,
            locationId: LOCATION_ID,
            teamMembers: [
              {
                userId: LOCATION_ID,
                priority: 1,
                isPrimary: true
              }
            ],
            eventType: 'RoundRobin_OptimizeForAvailability',
            name: cal.name,
            description: cal.description,
            slug: cal.slug,
            widgetSlug: cal.slug,
            calendarType: 'round_robin',
            widgetType: 'classic',
            eventTitle: '{{contact.name}} - ' + cal.name,
            eventColor: cal.eventColor,
            locationConfigurations: [
              {
                kind: 'custom',
                location: 'Clínica Dermatológica Puebla'
              }
            ],
            slotDuration: cal.slotDuration,
            slotDurationUnit: 'mins',
            slotInterval: cal.slotDuration,
            slotIntervalUnit: 'mins',
            slotBuffer: 15,
            slotBufferUnit: 'mins',
            preBuffer: 10,
            preBufferUnit: 'mins',
            appoinmentPerSlot: 1,
            appoinmentPerDay: Math.floor(480 / cal.slotDuration), // 8 horas de operación
            allowBookingAfter: 2,
            allowBookingAfterUnit: 'days',
            allowBookingFor: 60,
            allowBookingForUnit: 'days',
            enableRecurring: false,
            autoConfirm: true,
            shouldSendAlertEmailsToAssignedMember: false,
            allowReschedule: true,
            allowCancellation: true,
            shouldAssignContactToTeamMember: true,
            notes: cal.notes,
            googleInvitationEmails: true,
            consentLabel: 'Confirmo que deseo recibir información de la clínica.'
          },
          {
            headers: {
              'Authorization': `Bearer ${PIT}`,
              'Accept': 'application/json',
              'Version': 'v3',
              'Content-Type': 'application/json'
            }
          }
        );

        const calendarId = response.data?.calendar?.id || response.data?.id;
        console.log(`   ✅ Creado (ID: ${calendarId})\n`);

        results.success.push(cal.name);
        results.byCalendar[cal.name] = {
          status: 'success',
          id: calendarId,
          slug: cal.slug,
          pipeline: cal.pipeline
        };

      } catch (error) {
        console.log(`   ❌ Error: ${error.response?.data?.message || error.message}\n`);
        results.failed.push(cal.name);
        results.byCalendar[cal.name] = {
          status: 'failed',
          error: error.response?.data?.message || error.message
        };
      }

      // Delay entre requests
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    console.log('═══════════════════════════════════════════════════════\n');
    console.log('📊 RESUMEN DE CREACIÓN:\n');
    console.log(`✅ Exitosos: ${results.success.length}`);
    console.log(`❌ Fallidos: ${results.failed.length}\n`);

    if (results.success.length > 0) {
      console.log('Calendarios creados:');
      results.success.forEach(name => {
        const cal = results.byCalendar[name];
        console.log(`  ✅ ${name}`);
        console.log(`     ID: ${cal.id}`);
        console.log(`     Pipeline: ${cal.pipeline}\n`);
      });
    }

    if (results.failed.length > 0) {
      console.log('\nCalendarios que fallaron:');
      results.failed.forEach(name => {
        const cal = results.byCalendar[name];
        console.log(`  ❌ ${name}`);
        console.log(`     Error: ${cal.error}\n`);
      });
    }

    results.endTime = new Date();
    results.duration = (results.endTime - results.startTime) / 1000;

    console.log(`⏱️  Duración total: ${results.duration.toFixed(2)}s\n`);

    if (results.failed.length === 0) {
      console.log('🎉 ¡TODOS LOS CALENDARIOS DE DERMATOLOGÍA FUERON CREADOS!\n');
    }

    return results;

  } catch (error) {
    console.error('\n❌ ERROR FATAL:\n');
    console.error(error.message);
    process.exit(1);
  }
}

crearCalendariosDermatologia().then(() => {
  console.log('✅ Proceso completado\n');
  process.exit(0);
});
