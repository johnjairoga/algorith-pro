import axios from 'axios';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const PIT = process.env.GHL_PIT_TOKEN;
const LOCATION_ID = process.env.GHL_LOCATION_ID;
const API_URL = process.env.GHL_API_URL || 'https://services.leadconnectorhq.com';

// Cargar IDs de médicos creados
const medicosIds = JSON.parse(
  fs.readFileSync(path.resolve('./config/medicos-ids-ghl.json'), 'utf-8')
);

// Configuración de los 8 calendarios CON IDs DE USUARIOS
const CALENDARIOS = [
  {
    name: 'Cirugía Plástica Facial',
    slug: 'cirugia-plastica-facial',
    description: 'Procedimientos quirúrgicos faciales (rinoplastia, blepharoplastia, lifting). Duración: 180-210 min.',
    slotDuration: 210,
    eventColor: '#D32F2F',
    pipeline: 'Consulta Inicial',
    medicos_asignados: ['Dra. Anja Arellano M.', 'Dr. Aristides Arellano Huacuja'],
    notes: 'Cirugías faciales. Buffer: 30 min para limpiar quirófano.'
  },
  {
    name: 'Cirugía Plástica Corporal',
    slug: 'cirugia-plastica-corporal',
    description: 'Procedimientos quirúrgicos corporales (abdominoplastia, liposucción, aumento de senos). Duración: 210-270 min.',
    slotDuration: 270,
    eventColor: '#C2185B',
    pipeline: 'Consulta Inicial',
    medicos_asignados: ['Dra. Anja Arellano M.', 'Dr. Aristides Arellano Huacuja'],
    notes: 'Cirugías corporales. Buffer: 30 min para limpieza.'
  },
  {
    name: 'Cirugía de Restauración Capilar',
    slug: 'cirugia-restauracion-capilar',
    description: 'Injertos de cabello (FUE, FUT) y trasplante capilar. Duración: 300-390 min.',
    slotDuration: 390,
    eventColor: '#7B1FA2',
    pipeline: 'Consulta Inicial',
    medicos_asignados: ['Dra. Anja Arellano M.'],
    notes: 'Cirugía capilar. Máximo 2 citas por día. Resultados: 3-6 meses.'
  },
  {
    name: 'Tratamiento de Restauración Capilar',
    slug: 'tratamiento-restauracion-capilar',
    description: 'PRP capilar, mesoterapia, láser baja potencia. Duración: 60 min. Sesiones múltiples cada 3-4 semanas.',
    slotDuration: 60,
    eventColor: '#512DA8',
    pipeline: 'Recurrencia',
    medicos_asignados: ['Dra. Anja Arellano M.', 'Dr. Aristides Arellano Huacuja'],
    notes: 'Tratamiento recurrente. 4-6 sesiones. Ciclo: cada 3-4 semanas.'
  },
  {
    name: 'Moldeo Corporal',
    slug: 'moldeo-corporal-servicios',
    description: 'CoolSculpting, radiofrecuencia, ultrasonido cavitacional. Duración: 75-105 min.',
    slotDuration: 90,
    eventColor: '#1976D2',
    pipeline: 'Aparatología',
    medicos_asignados: ['Dra. Dafne Arellano Montalvo'],
    notes: 'Tratamiento con máquinas. 2-4 sesiones. Ciclo: cada 4-6 semanas.'
  },
  {
    name: 'Tratamientos Láser',
    slug: 'tratamientos-laser-servicios',
    description: 'Depilación láser, resurfacing, remoción de cicatrices, rejuvenecimiento. Duración: 45-75 min.',
    slotDuration: 60,
    eventColor: '#F57F17',
    pipeline: 'Aparatología',
    medicos_asignados: ['Dra. Anja Arellano M.'],
    notes: 'Requiere consulta previa. Ciclo: 4-8 sesiones cada 4-6 semanas. NO sol 2 semanas.'
  },
  {
    name: 'Medicina Estética Antienvejecimiento',
    slug: 'medicina-estetica-antienvejecimiento-servicios',
    description: 'Botox, fillers, PRP y otros inyectables anti-envejecimiento. Duración: 30-55 min.',
    slotDuration: 45,
    eventColor: '#388E3C',
    pipeline: 'Recurrencia',
    medicos_asignados: ['Dr. Aristides Arellano Huacuja', 'Dra. Dafne Arellano Montalvo'],
    notes: 'Cliente VIP. Botox: cada 90 días. Fillers: cada 6-12 meses.'
  },
  {
    name: 'Dermatología y Alergias',
    slug: 'dermatologia-alergias-servicios',
    description: 'Consulta dermatológica general, tratamiento de acné/rosácea, pruebas de alergia. Duración: 40-55 min.',
    slotDuration: 50,
    eventColor: '#00796B',
    pipeline: 'Consulta Inicial',
    medicos_asignados: ['Dr. Aristides Arellano Huacuja', 'Dra. Dafne Arellano Montalvo'],
    notes: 'No requiere consulta previa (es la consulta). Puede derivar a otros servicios.'
  }
];

async function crearCalendariosConUsuarios() {
  try {
    console.log('\n📅 CREANDO 8 CALENDARIOS VINCULADOS CON MÉDICOS...\n');
    console.log(`📍 Location ID: ${LOCATION_ID}`);
    console.log(`👥 Médicos vinculados: ${Object.keys(medicosIds).length}`);
    console.log(`📊 Calendarios: ${CALENDARIOS.length}\n`);
    console.log('═══════════════════════════════════════════════════════\n');

    const results = {
      success: [],
      failed: [],
      byCalendar: {},
      startTime: new Date(),
    };

    for (let i = 0; i < CALENDARIOS.length; i++) {
      const cal = CALENDARIOS[i];
      const medicosDelCal = cal.medicos_asignados.map(nombre => ({
        nombre,
        id: medicosIds[nombre]
      }));

      console.log(`[${i + 1}/${CALENDARIOS.length}] 📅 ${cal.name}`);
      console.log(`   Duración: ${cal.slotDuration} min | Pipeline: ${cal.pipeline}`);
      console.log(`   Médicos: ${medicosDelCal.map(m => m.nombre).join(', ')}`);

      try {
        const payload = {
          isActive: true,
          locationId: LOCATION_ID,
          teamMembers: medicosDelCal.map((m, idx) => ({
            userId: m.id,
            priority: idx === 0 ? 1 : 0.5,
            isPrimary: idx === 0,
            locationConfigurations: [{ kind: 'custom', location: 'Clínica Dermatológica Puebla' }]
          })),
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
          consentLabel: 'Confirmo que deseo recibir información de la clínica.'
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
          medicos: medicosDelCal.map(m => ({ nombre: m.nombre, id: m.id }))
        };

      } catch (error) {
        const errorMsg = error.response?.data?.message || error.message;
        console.log(`   ❌ Error: ${errorMsg}\n`);
        results.failed.push(cal.name);
        results.byCalendar[cal.name] = {
          status: 'failed',
          error: errorMsg,
          medicos: medicosDelCal
        };
      }

      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    console.log('═══════════════════════════════════════════════════════\n');
    console.log('📊 RESUMEN FINAL:\n');
    console.log(`✅ Exitosos: ${results.success.length}`);
    console.log(`❌ Fallidos: ${results.failed.length}\n`);

    if (results.success.length > 0) {
      console.log('✅ CALENDARIOS CREADOS Y VINCULADOS:\n');
      results.success.forEach(name => {
        const cal = results.byCalendar[name];
        console.log(`  📅 ${name}`);
        console.log(`     ID: ${cal.id}`);
        console.log(`     Pipeline: ${cal.pipeline}`);
        console.log(`     Médicos asignados: ${cal.medicos.map(m => m.nombre).join(', ')}\n`);
      });
    }

    if (results.failed.length > 0) {
      console.log('\n❌ Calendarios que fallaron:\n');
      results.failed.forEach(name => {
        const cal = results.byCalendar[name];
        console.log(`  ❌ ${name}: ${cal.error}\n`);
      });
    }

    results.endTime = new Date();
    results.duration = (results.endTime - results.startTime) / 1000;

    console.log(`⏱️  Duración total: ${results.duration.toFixed(2)}s\n`);

    // Guardar resultados
    const resultsPath = path.resolve('./results/fase4b-calendarios-vinculados.json');
    fs.mkdirSync(path.dirname(resultsPath), { recursive: true });
    fs.writeFileSync(resultsPath, JSON.stringify(results, null, 2));

    console.log(`📊 Resultados: results/fase4b-calendarios-vinculados.json\n`);

    if (results.failed.length === 0) {
      console.log('🎉 ¡ESTRUCTURA COMPLETADA!\n');
      console.log('✅ 3 Médicos creados');
      console.log('✅ 8 Calendarios creados y vinculados');
      console.log('✅ Listos para vincular con Servicios y Pipelines\n');
    }

    return results;

  } catch (error) {
    console.error('\n❌ ERROR FATAL:\n');
    console.error(error.message);
    process.exit(1);
  }
}

crearCalendariosConUsuarios().then(() => {
  console.log('✅ Estructura de calendarios completada\n');
  process.exit(0);
});
