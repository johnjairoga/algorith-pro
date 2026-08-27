import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const PIT = process.env.GHL_PIT_TOKEN;
const LOCATION_ID = process.env.GHL_LOCATION_ID;
const API_URL = process.env.GHL_API_URL || 'https://services.leadconnectorhq.com';

// IDs de los calendarios a eliminar (del proyecto anterior)
const CALENDARIOS_A_ELIMINAR = [
  { name: 'Consulta de Periodoncia - Dr. Waverley Torres Cartagena', id: '8Q83bBMvH7qEi1fKeMFk' },
  { name: 'Consulta Endodoncia - Dr. Carlos Univio', id: '9Cb5radXh0uB4KBvOWXD' },
  { name: 'Consulta de Ortodoncia - Dra. Leslie Barreto', id: 'HVVCT5NerzG0tszgYjHt' },
  { name: 'Consulta de Ortodoncia - Dra. Lorena Gomez', id: 'NoY2OiKAlG7AxnGz2jiy' },
  { name: 'Consulta de diagnostico', id: 'PHfQMzSlDO6QU9k10GV0' },
  { name: 'Consulta de Ortodoncia - Dr. Elvis Mauricio', id: 'WIJa37avXg3P19lK3opN' },
  { name: 'Consulta de Ortodoncia - Manutención', id: 'WRiYyjxHXTJEvJV8emZT' },
  { name: 'Consulta de Odontologia General - Dra. Camila Castro', id: 'Wc80YQt8fSEphjDttj2Z' },
  { name: 'Consulta de Odontologia General - Dra. Catalina Gutierrez', id: 'XbUT1RvdfIFwYw4JIa6D' },
  { name: 'Consulta de Cirugía - Dra. Magda Morales', id: 'dJtI4UK9oI4tsBAS8HO7' },
  { name: 'Consulta Endodoncia - Dr. Jesus Ahumada', id: 'dmqM0kVvuh9I3jKsZrDf' },
  { name: 'Consulta de Odontologia General - Dra. Natalia Rueda', id: 'e28X3cXGwr7WS4yReYGz' },
  { name: 'Consulta de Odontologia General - Dra. Natalia Navarro', id: 'fxoH937BuzeD3YXZHbgN' },
  { name: 'Consulta de Ortodoncia - Dr. Maurio Rodriguez', id: 'ggn4qQ9c8i685V6iBTQp' },
  { name: 'Consulta de Cirugía - Dra. Natalia Gomez Garcia', id: 'izUcH0rozLp34wYQK3AI' },
  { name: 'Consulta de Ortodoncia - Dra. Karolay Montero', id: 'l954m4x60BheVG6hvu37' },
  { name: 'Consulta Rehabilitacion Oral - Dra. Ana Manrique', id: 'vXHVubKFjrgXtd0EdJEt' }
];

async function eliminarCalendarios() {
  try {
    console.log('\n🗑️  ELIMINANDO CALENDARIOS DEL PROYECTO ANTERIOR...\n');
    console.log(`📍 Location ID: ${LOCATION_ID}`);
    console.log(`📊 Total a eliminar: ${CALENDARIOS_A_ELIMINAR.length}\n`);
    console.log('═══════════════════════════════════════════════════════\n');

    const results = {
      success: [],
      failed: [],
      byCalendar: {},
      startTime: new Date(),
    };

    for (let i = 0; i < CALENDARIOS_A_ELIMINAR.length; i++) {
      const cal = CALENDARIOS_A_ELIMINAR[i];
      console.log(`[${i + 1}/${CALENDARIOS_A_ELIMINAR.length}] Eliminando: ${cal.name}`);

      try {
        await axios.delete(
          `${API_URL}/calendars/${cal.id}`,
          {
            headers: {
              'Authorization': `Bearer ${PIT}`,
              'Accept': 'application/json',
              'Version': 'v3',
              'Content-Type': 'application/json'
            }
          }
        );

        console.log(`         ✅ Eliminado\n`);
        results.success.push(cal.id);
        results.byCalendar[cal.id] = {
          status: 'success',
          name: cal.name
        };

      } catch (error) {
        console.log(`         ❌ Error: ${error.response?.data?.message || error.message}\n`);
        results.failed.push(cal.id);
        results.byCalendar[cal.id] = {
          status: 'failed',
          name: cal.name,
          error: error.response?.data?.message || error.message
        };
      }

      // Delay pequeño entre requests para evitar rate limit
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    console.log('═══════════════════════════════════════════════════════\n');
    console.log('📊 RESUMEN DE ELIMINACIÓN:\n');
    console.log(`✅ Eliminados exitosamente: ${results.success.length}`);
    console.log(`❌ Fallidos: ${results.failed.length}\n`);

    if (results.failed.length > 0) {
      console.log('Calendarios que fallaron:');
      results.failed.forEach(id => {
        const cal = results.byCalendar[id];
        console.log(`  • ${cal.name}`);
        console.log(`    Error: ${cal.error}\n`);
      });
    }

    results.endTime = new Date();
    results.duration = (results.endTime - results.startTime) / 1000;

    console.log(`⏱️  Duración total: ${results.duration.toFixed(2)}s\n`);

    if (results.failed.length === 0) {
      console.log('🎉 ¡TODOS LOS CALENDARIOS FUERON ELIMINADOS CORRECTAMENTE!\n');
      console.log('✅ Cuenta limpia. Lista para crear los nuevos calendarios de dermatología.\n');
    }

    return results;

  } catch (error) {
    console.error('\n❌ ERROR FATAL:\n');
    console.error(error.message);
    process.exit(1);
  }
}

eliminarCalendarios().then(() => {
  console.log('✅ Proceso completado\n');
  process.exit(0);
});
