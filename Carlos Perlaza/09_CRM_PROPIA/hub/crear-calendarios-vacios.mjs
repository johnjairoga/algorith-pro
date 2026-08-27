import axios from 'axios';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const PIT = process.env.GHL_PIT_TOKEN;
const LOCATION_ID = process.env.GHL_LOCATION_ID;
const API_URL = process.env.GHL_API_URL || 'https://services.leadconnectorhq.com';

// 8 calendarios
const CALENDARIOS = [
  { name: 'Cirugía Plástica Facial', slug: 'cirugia-plastica-facial', color: '#D32F2F', minutos: 210 },
  { name: 'Cirugía Plástica Corporal', slug: 'cirugia-plastica-corporal', color: '#C2185B', minutos: 270 },
  { name: 'Cirugía de Restauración Capilar', slug: 'cirugia-restauracion-capilar', color: '#7B1FA2', minutos: 390 },
  { name: 'Tratamiento de Restauración Capilar', slug: 'tratamiento-restauracion-capilar', color: '#512DA8', minutos: 60 },
  { name: 'Moldeo Corporal', slug: 'moldeo-corporal', color: '#1976D2', minutos: 90 },
  { name: 'Tratamientos Láser', slug: 'tratamientos-laser', color: '#F57F17', minutos: 60 },
  { name: 'Medicina Estética Antienvejecimiento', slug: 'medicina-estetica', color: '#388E3C', minutos: 45 },
  { name: 'Dermatología y Alergias', slug: 'dermatologia-alergias', color: '#00796B', minutos: 50 }
];

async function crearCalendarios() {
  try {
    console.log('\n📅 CREANDO 8 CALENDARIOS (VACIOS)...\n');

    const results = { success: [], failed: [], byCalendar: {} };

    for (let i = 0; i < CALENDARIOS.length; i++) {
      const cal = CALENDARIOS[i];
      console.log(`[${i + 1}/8] ${cal.name}`);

      try {
        const payload = {
          isActive: true,
          locationId: LOCATION_ID,
          name: cal.name,
          slug: cal.slug,
          widgetSlug: cal.slug,
          calendarType: 'round_robin',
          eventColor: cal.color,
          slotDuration: cal.minutos,
          slotDurationUnit: 'mins',
          slotInterval: cal.minutos,
          slotIntervalUnit: 'mins',
          slotBuffer: 15,
          slotBufferUnit: 'mins',
          preBuffer: 10,
          preBufferUnit: 'mins',
          appoinmentPerSlot: 1,
          appoinmentPerDay: Math.floor(480 / cal.minutos),
          allowBookingAfter: 2,
          allowBookingAfterUnit: 'days',
          allowBookingFor: 60,
          allowBookingForUnit: 'days'
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
        console.log(`   ✅ ID: ${calendarId}\n`);

        results.success.push(cal.name);
        results.byCalendar[cal.name] = { id: calendarId };

      } catch (error) {
        console.log(`   ❌ ${error.response?.data?.message || error.message}\n`);
        results.failed.push(cal.name);
      }

      await new Promise(resolve => setTimeout(resolve, 500));
    }

    console.log(`\n✅ Exitosos: ${results.success.length}/8`);
    console.log(`❌ Fallidos: ${results.failed.length}/8\n`);

    // Guardar
    fs.mkdirSync(path.resolve('./results'), { recursive: true });
    fs.writeFileSync(
      path.resolve('./results/calendarios-creados.json'),
      JSON.stringify(results, null, 2)
    );

    return results;

  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

crearCalendarios().then((results) => {
  if (results.success.length === 8) {
    console.log('🎉 ¡TODOS CREADOS! Ahora asigna médicos en GHL Console.\n');
  }
  process.exit(0);
});
