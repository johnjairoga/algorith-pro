import axios from 'axios';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const PIT = process.env.GHL_PIT_TOKEN;
const LOCATION_ID = process.env.GHL_LOCATION_ID;
const API_URL = process.env.GHL_API_URL || 'https://services.leadconnectorhq.com';

// Configuración de los 8 calendarios (SIN team members en payload)
const CALENDARIOS = [
  {
    name: 'Cirugía Plástica Facial',
    slug: 'cirugia-plastica-facial',
    description: 'Procedimientos quirúrgicos faciales (rinoplastia, blepharoplastia, lifting). Duración: 180-210 min.',
    slotDuration: 210,
    eventColor: '#D32F2F',
    pipeline: 'Consulta Inicial',
    medicos: ['Dra. Anja Arellano M.', 'Dr. Aristides Arellano Huacuja']
  },
  {
    name: 'Cirugía Plástica Corporal',
    slug: 'cirugia-plastica-corporal',
    description: 'Procedimientos quirúrgicos corporales (abdominoplastia, liposucción, aumento de senos). Duración: 210-270 min.',
    slotDuration: 270,
    eventColor: '#C2185B',
    pipeline: 'Consulta Inicial',
    medicos: ['Dra. Anja Arellano M.', 'Dr. Aristides Arellano Huacuja']
  },
  {
    name: 'Cirugía de Restauración Capilar',
    slug: 'cirugia-restauracion-capilar',
    description: 'Injertos de cabello (FUE, FUT) y trasplante capilar. Duración: 300-390 min.',
    slotDuration: 390,
    eventColor: '#7B1FA2',
    pipeline: 'Consulta Inicial',
    medicos: ['Dra. Anja Arellano M.']
  },
  {
    name: 'Tratamiento de Restauración Capilar',
    slug: 'tratamiento-restauracion-capilar',
    description: 'PRP capilar, mesoterapia, láser baja potencia. Duración: 60 min. Sesiones múltiples cada 3-4 semanas.',
    slotDuration: 60,
    eventColor: '#512DA8',
    pipeline: 'Recurrencia',
    medicos: ['Dra. Anja Arellano M.', 'Dr. Aristides Arellano Huacuja']
  },
  {
    name: 'Moldeo Corporal',
    slug: 'moldeo-corporal-servicios',
    description: 'CoolSculpting, radiofrecuencia, ultrasonido cavitacional. Duración: 75-105 min. Sesiones múltiples cada 4-6 semanas.',
    slotDuration: 90,
    eventColor: '#1976D2',
    pipeline: 'Aparatología',
    medicos: ['Dra. Dafne Arellano Montalvo']
  },
  {
    name: 'Tratamientos Láser',
    slug: 'tratamientos-laser-servicios',
    description: 'Depilación láser, resurfacing, remoción de cicatrices, rejuvenecimiento. Duración: 45-75 min.',
    slotDuration: 60,
    eventColor: '#F57F17',
    pipeline: 'Aparatología',
    medicos: ['Dra. Anja Arellano M.']
  },
  {
    name: 'Medicina Estética Antienvejecimiento',
    slug: 'medicina-estetica-antienvejecimiento-servicios',
    description: 'Botox, fillers, PRP y otros inyectables anti-envejecimiento. Duración: 30-55 min. Cliente VIP recurrente.',
    slotDuration: 45,
    eventColor: '#388E3C',
    pipeline: 'Recurrencia',
    medicos: ['Dr. Aristides Arellano Huacuja', 'Dra. Dafne Arellano Montalvo']
  },
  {
    name: 'Dermatología y Alergias',
    slug: 'dermatologia-alergias-servicios',
    description: 'Consulta dermatológica general, tratamiento de acné/rosácea, pruebas de alergia. Duración: 40-55 min.',
    slotDuration: 50,
    eventColor: '#00796B',
    pipeline: 'Consulta Inicial',
    medicos: ['Dr. Aristides Arellano Huacuja', 'Dra. Dafne Arellano Montalvo']
  }
];

async function crearCalendarios() {
  try {
    console.log('\n📅 CREANDO 8 CALENDARIOS (ESTRUCTURA BASE)...\n');
    console.log(`📍 Location ID: ${LOCATION_ID}`);
    console.log(`📊 Calendarios: ${CALENDARIOS.length}\n`);
    console.log('═══════════════════════════════════════════════════════\n');

    const results = {
      success: [],
      failed: [],
      byCalendar: {},
      medicos_por_calendario: {},
      startTime: new Date(),
    };

    for (let i = 0; i < CALENDARIOS.length; i++) {
      const cal = CALENDARIOS[i];

      console.log(`[${i + 1}/${CALENDARIOS.length}] 📅 ${cal.name}`);
      console.log(`   Duración: ${cal.slotDuration} min | Pipeline: ${cal.pipeline}`);
      console.log(`   Médicos a asignar: ${cal.medicos.join(', ')}`);

      try {
        // Payload SIMPLE - sin team members
        const payload = {
          isActive: true,
          locationId: LOCATION_ID,
          name: cal.name,
          description: cal.description,
          slug: cal.slug,
          widgetSlug: cal.slug,
          calendarType: 'appointment',
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
          autoConfirm: true,
          allowReschedule: true,
          allowCancellation: true,
          notes: `Servicio: ${cal.name} | Pipeline: ${cal.pipeline}`
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
          pipeline: cal.pipeline
        };

        results.medicos_por_calendario[cal.name] = cal.medicos;

      } catch (error) {
        const errorMsg = error.response?.data?.message || error.message;
        console.log(`   ❌ Error: ${errorMsg}\n`);
        results.failed.push(cal.name);
        results.byCalendar[cal.name] = {
          status: 'failed',
          error: errorMsg
        };
        results.medicos_por_calendario[cal.name] = cal.medicos;
      }

      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    console.log('═══════════════════════════════════════════════════════\n');
    console.log('📊 RESUMEN DE CREACIÓN:\n');
    console.log(`✅ Exitosos: ${results.success.length}`);
    console.log(`❌ Fallidos: ${results.failed.length}\n`);

    if (results.success.length > 0) {
      console.log('✅ CALENDARIOS CREADOS:\n');
      results.success.forEach(name => {
        const cal = results.byCalendar[name];
        const medicos = results.medicos_por_calendario[name];
        console.log(`  📅 ${name}`);
        console.log(`     ID GHL: ${cal.id}`);
        console.log(`     Pipeline: ${cal.pipeline}`);
        console.log(`     ➜ Asignar médicos: ${medicos.join(', ')}\n`);
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
    const resultsPath = path.resolve('./results/fase4c-calendarios-base.json');
    fs.mkdirSync(path.dirname(resultsPath), { recursive: true });
    fs.writeFileSync(resultsPath, JSON.stringify(results, null, 2));

    console.log(`📊 Resultados: results/fase4c-calendarios-base.json\n`);

    return results;

  } catch (error) {
    console.error('\n❌ ERROR FATAL:\n');
    console.error(error.message);
    process.exit(1);
  }
}

crearCalendarios().then(() => {
  console.log('✅ Listo para asignar médicos\n');
  process.exit(0);
});
