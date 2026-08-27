import axios from 'axios';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const PIT = process.env.GHL_PIT_TOKEN;
const LOCATION_ID = process.env.GHL_LOCATION_ID;
const API_URL = process.env.GHL_API_URL || 'https://services.leadconnectorhq.com';

// Cargar IDs de médicos
const medicosIds = JSON.parse(
  fs.readFileSync(path.resolve('./config/medicos-ids-ghl.json'), 'utf-8')
);

console.log('📊 Médicos IDs cargados:');
console.log(medicosIds);
console.log('\n');

// Configuración de los 8 calendarios - FORMATO CORRECTO
const CALENDARIOS = [
  {
    name: 'Cirugía Plástica Facial',
    slug: 'cirugia-plastica-facial',
    description: 'Procedimientos quirúrgicos faciales (rinoplastia, blepharoplastia, lifting). Duración: 180-210 min.',
    slotDuration: 210,
    eventColor: '#D32F2F',
    pipeline: 'Consulta Inicial',
    medicos_ids: [
      medicosIds['Dra. Anja Arellano M.'],
      medicosIds['Dr. Aristides Arellano Huacuja']
    ],
    notes: 'Cirugías faciales'
  },
  {
    name: 'Cirugía Plástica Corporal',
    slug: 'cirugia-plastica-corporal',
    description: 'Procedimientos quirúrgicos corporales (abdominoplastia, liposucción, aumento de senos). Duración: 210-270 min.',
    slotDuration: 270,
    eventColor: '#C2185B',
    pipeline: 'Consulta Inicial',
    medicos_ids: [
      medicosIds['Dra. Anja Arellano M.'],
      medicosIds['Dr. Aristides Arellano Huacuja']
    ],
    notes: 'Cirugías corporales'
  },
  {
    name: 'Cirugía de Restauración Capilar',
    slug: 'cirugia-restauracion-capilar',
    description: 'Injertos de cabello (FUE, FUT) y trasplante capilar. Duración: 300-390 min.',
    slotDuration: 390,
    eventColor: '#7B1FA2',
    pipeline: 'Consulta Inicial',
    medicos_ids: [
      medicosIds['Dra. Anja Arellano M.']
    ],
    notes: 'Cirugía capilar especializada'
  },
  {
    name: 'Tratamiento de Restauración Capilar',
    slug: 'tratamiento-restauracion-capilar',
    description: 'PRP capilar, mesoterapia, láser baja potencia. Duración: 60 min. Sesiones múltiples cada 3-4 semanas.',
    slotDuration: 60,
    eventColor: '#512DA8',
    pipeline: 'Recurrencia',
    medicos_ids: [
      medicosIds['Dra. Anja Arellano M.'],
      medicosIds['Dr. Aristides Arellano Huacuja']
    ],
    notes: 'Tratamiento recurrente'
  },
  {
    name: 'Moldeo Corporal',
    slug: 'moldeo-corporal-servicios',
    description: 'CoolSculpting, radiofrecuencia, ultrasonido cavitacional. Duración: 75-105 min.',
    slotDuration: 90,
    eventColor: '#1976D2',
    pipeline: 'Aparatología',
    medicos_ids: [
      medicosIds['Dra. Dafne Arellano Montalvo']
    ],
    notes: 'Tratamiento con máquinas'
  },
  {
    name: 'Tratamientos Láser',
    slug: 'tratamientos-laser-servicios',
    description: 'Depilación láser, resurfacing, remoción de cicatrices, rejuvenecimiento. Duración: 45-75 min.',
    slotDuration: 60,
    eventColor: '#F57F17',
    pipeline: 'Aparatología',
    medicos_ids: [
      medicosIds['Dra. Anja Arellano M.']
    ],
    notes: 'Especialista Dra. Anja'
  },
  {
    name: 'Medicina Estética Antienvejecimiento',
    slug: 'medicina-estetica-antienvejecimiento-servicios',
    description: 'Botox, fillers, PRP y otros inyectables anti-envejecimiento. Duración: 30-55 min.',
    slotDuration: 45,
    eventColor: '#388E3C',
    pipeline: 'Recurrencia',
    medicos_ids: [
      medicosIds['Dr. Aristides Arellano Huacuja'],
      medicosIds['Dra. Dafne Arellano Montalvo']
    ],
    notes: 'Cliente VIP recurrente'
  },
  {
    name: 'Dermatología y Alergias',
    slug: 'dermatologia-alergias-servicios',
    description: 'Consulta dermatológica general, tratamiento de acné/rosácea, pruebas de alergia. Duración: 40-55 min.',
    slotDuration: 50,
    eventColor: '#00796B',
    pipeline: 'Consulta Inicial',
    medicos_ids: [
      medicosIds['Dr. Aristides Arellano Huacuja'],
      medicosIds['Dra. Dafne Arellano Montalvo']
    ],
    notes: 'Consulta general dermatológica'
  }
];

async function crearCalendarios() {
  try {
    console.log('\n📅 CREANDO 8 CALENDARIOS (FORMATO CORRECTO)...\n');
    console.log(`📍 Location ID: ${LOCATION_ID}\n`);

    const results = {
      success: [],
      failed: [],
      byCalendar: {},
      startTime: new Date(),
    };

    for (let i = 0; i < CALENDARIOS.length; i++) {
      const cal = CALENDARIOS[i];

      console.log(`[${i + 1}/${CALENDARIOS.length}] 📅 ${cal.name}`);

      try {
        // PAYLOAD - FORMATO DEL ENDPOINT COMPARTIDO
        const payload = {
          isActive: true,
          locationId: LOCATION_ID,
          name: cal.name,
          description: cal.description,
          slug: cal.slug,
          widgetSlug: cal.slug,
          calendarType: 'round_robin',
          widgetType: 'classic',
          eventTitle: '{{contact.name}} - ' + cal.name,
          eventColor: cal.eventColor,
          slotDuration: cal.slotDuration,
          slotDurationUnit: 'mins',
          slotInterval: cal.slotDuration,
          slotIntervalUnit: 'mins',
          slotBuffer: 15,
          slotBufferUnit: 'mins',
          preBuffer: 10,
          preBufferUnit: 'mins',
          appoinmentPerSlot: 1,
          appoinmentPerDay: Math.floor(480 / cal.slotDuration),
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
          consentLabel: 'Confirmo que deseo recibir información de la clínica.',
          // Team members - FORMATO CORRECTO
          teamMembers: cal.medicos_ids.map((id, idx) => ({
            userId: id,
            priority: idx === 0 ? 1 : 0.5,
            isPrimary: idx === 0
          }))
        };

        const response = await axios.post(
          `${API_URL}/calendars/`,
          payload,
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
          pipeline: cal.pipeline,
          medicos_ids: cal.medicos_ids
        };

      } catch (error) {
        const errorMsg = error.response?.data?.message || error.message;
        console.log(`   ❌ Error: ${errorMsg}\n`);
        results.failed.push(cal.name);
        results.byCalendar[cal.name] = {
          status: 'failed',
          error: errorMsg
        };
      }

      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    console.log('═══════════════════════════════════════════════════════\n');
    console.log(`✅ Exitosos: ${results.success.length}`);
    console.log(`❌ Fallidos: ${results.failed.length}\n`);

    if (results.success.length > 0) {
      console.log('✅ CALENDARIOS CREADOS:\n');
      Object.entries(results.byCalendar)
        .filter(([_, cal]) => cal.status === 'success')
        .forEach(([name, cal]) => {
          console.log(`  📅 ${name}: ${cal.id}\n`);
        });
    }

    results.endTime = new Date();
    results.duration = (results.endTime - results.startTime) / 1000;

    // Guardar resultados
    const resultsPath = path.resolve('./results/fase4c-calendarios-final.json');
    fs.mkdirSync(path.dirname(resultsPath), { recursive: true });
    fs.writeFileSync(resultsPath, JSON.stringify(results, null, 2));

    console.log(`⏱️  Duración: ${results.duration.toFixed(2)}s`);
    console.log(`📊 Guardado: results/fase4c-calendarios-final.json\n`);

    if (results.success.length === CALENDARIOS.length) {
      console.log('🎉 ¡TODOS LOS CALENDARIOS CREADOS CON ÉXITO!\n');
    }

    return results;

  } catch (error) {
    console.error('\n❌ ERROR:\n', error.message);
    process.exit(1);
  }
}

crearCalendarios().then(() => {
  console.log('✅ Completado\n');
  process.exit(0);
});
