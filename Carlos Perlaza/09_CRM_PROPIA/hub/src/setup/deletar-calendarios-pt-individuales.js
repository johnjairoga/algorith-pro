import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const PIT = process.env.GHL_PIT_TOKEN;

// SOLO los 4 calendarios PT individuales creados hoy
// NO tocar: Evaluaciones, Aulas, Reavaliaciones
const calendarsToDelete = [
  { name: 'PT — João', id: 'h8GZhPvPqRyHXKPIabiB' },
  { name: 'PT — Maria', id: 'HnGnnLlZllfCgrderr7T' },
  { name: 'PT — Carlos', id: '3XsC7kvan4O3RLydnORH' },
  { name: 'PT — Ana', id: '0fs2ESaaY2EpFF0zPmQR' }
];

async function deletarCalendarios() {
  try {
    console.log('\n');
    console.log('█████████████████████████████████████████████████████');
    console.log('█                                                   █');
    console.log('█  🗑️  DELETAR: Calendarios PT Individuales 🗑️    █');
    console.log('█                                                   █');
    console.log('█████████████████████████████████████████████████████\n');

    console.log('⚠️  ADVERTENCIA: Solo se borrarán los 4 calendarios PT individuales');
    console.log('✅ NO se tocarán: Evaluaciones, Aulas, Reavaliaciones\n');

    const results = {
      deleted: [],
      failed: [],
      startTime: new Date()
    };

    console.log(`🗑️  Total a borrar: ${calendarsToDelete.length}\n`);

    for (const calendar of calendarsToDelete) {
      console.log(`   ${calendar.name} (ID: ${calendar.id})`);

      try {
        const response = await axios.delete(
          `https://services.leadconnectorhq.com/calendars/${calendar.id}`,
          {
            headers: {
              Authorization: `Bearer ${PIT}`,
              'Accept': 'application/json',
              'Version': '2021-07-28'
            }
          }
        );

        console.log(`   ✅ Borrado\n`);
        results.deleted.push(calendar.name);
      } catch (error) {
        console.log(`   ❌ Error: ${error.response?.data?.message || error.message}\n`);
        results.failed.push({
          name: calendar.name,
          error: error.response?.data?.message || error.message
        });
      }
    }

    console.log('═══════════════════════════════════════════════════════\n');
    console.log('📊 RESUMEN:\n');
    console.log(`✅ Borrados: ${results.deleted.length}`);
    console.log(`❌ Fallidos: ${results.failed.length}\n`);

    if (results.deleted.length > 0) {
      console.log('Borrados:');
      results.deleted.forEach(cal => {
        console.log(`  • ${cal}`);
      });
      console.log('');
    }

    if (results.failed.length > 0) {
      console.log('Fallidos:');
      results.failed.forEach(cal => {
        console.log(`  • ${cal.name}: ${cal.error}`);
      });
      console.log('');
    }

    results.endTime = new Date();
    results.duration = (results.endTime - results.startTime) / 1000;

    console.log(`⏱️  Duración: ${results.duration.toFixed(2)}s\n`);
    console.log('✅ Listos para crear: Personal Trainer Disponivel (round_robin)\n');

    return results;
  } catch (error) {
    console.error('❌ Error fatal:', error.message);
    process.exit(1);
  }
}

deletarCalendarios().then(() => {
  console.log('✅ Eliminación completada\n');
  process.exit(0);
});
