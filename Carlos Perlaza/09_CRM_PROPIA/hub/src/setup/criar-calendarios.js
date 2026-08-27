import fs from 'fs';
import path from 'path';
import GHLClient from '../lib/ghl-client.js';

const calendariosConfig = JSON.parse(
  fs.readFileSync(path.resolve('./config/calendarios.json'), 'utf-8')
);

async function criarCalendarios() {
  try {
    console.log('\n');
    console.log('█████████████████████████████████████████████████████');
    console.log('█                                                   █');
    console.log('█  📅 FASE 4A: Calendarios en GHL 📅              █');
    console.log('█                                                   █');
    console.log('█████████████████████████████████████████████████████\n');

    const ghl = new GHLClient();

    const results = {
      success: [],
      failed: [],
      byCalendar: {},
      startTime: new Date(),
    };

    const calendarios = calendariosConfig.calendarios;
    const totalCalendarios = Object.keys(calendarios).length;

    console.log(`📅 Total de calendarios para crear: ${totalCalendarios}\n`);
    console.log('Calendarios:');
    Object.entries(calendarios).forEach(([key, cal]) => {
      if (key === 'personal_trainers') {
        console.log(`  • ${cal.name}: ${cal.count} calendarios (${cal.trainers.map(t => t.name).join(', ')})`);
      } else {
        console.log(`  • ${cal.name}`);
      }
    });
    console.log('');

    console.log('═══════════════════════════════════════════════════════\n');
    console.log('Creando calendarios:\n');

    // Crear Calendario Evaluaciones
    if (calendarios.evaluaciones) {
      console.log(`📅 EVALUACIONES\n`);
      console.log(`   Nombre: ${calendarios.evaluaciones.name}`);
      console.log(`   Tipo: ${calendarios.evaluaciones.type}`);
      console.log(`   Duración: ${calendarios.evaluaciones.duration} minutos`);
      console.log(`   Horario: ${calendarios.evaluaciones.businessHours.start}-${calendarios.evaluaciones.businessHours.end}`);
      console.log(`   Descripción: ${calendarios.evaluaciones.description}\n`);

      try {
        const response = await ghl.createCalendar({
          name: calendarios.evaluaciones.name,
          description: calendarios.evaluaciones.description,
          type: 'event',
          duration: calendarios.evaluaciones.duration,
          color: calendarios.evaluaciones.color,
          businessHours: calendarios.evaluaciones.businessHours,
          bufferTime: calendarios.evaluaciones.bufferTime,
        });

        const calendarId = response.data?.calendar?.id || response.calendar?.id || response.id;
        console.log(`   ✅ Calendario creado`);
        console.log(`   ID: ${calendarId}\n`);

        results.success.push('evaluaciones');
        results.byCalendar['evaluaciones'] = {
          status: 'success',
          id: calendarId,
          name: calendarios.evaluaciones.name,
        };
      } catch (error) {
        console.log(`   ❌ Error: ${error.message}\n`);
        results.failed.push('evaluaciones');
        results.byCalendar['evaluaciones'] = {
          status: 'failed',
          error: error.message,
        };
      }
    }

    // Crear Calendario Aulas
    if (calendarios.aulas) {
      console.log(`📅 AULAS\n`);
      console.log(`   Nombre: ${calendarios.aulas.name}`);
      console.log(`   Tipo: ${calendarios.aulas.type}`);
      console.log(`   Duración: ${calendarios.aulas.duration} minutos`);
      console.log(`   Sync Google: ${calendarios.aulas.syncWithGoogle}`);
      console.log(`   Descripción: ${calendarios.aulas.description}\n`);

      try {
        const response = await ghl.createCalendar({
          name: calendarios.aulas.name,
          description: calendarios.aulas.description,
          type: 'round_robin',
          duration: calendarios.aulas.duration,
          color: calendarios.aulas.color,
          businessHours: calendarios.aulas.businessHours,
          syncWithGoogle: calendarios.aulas.syncWithGoogle,
          teamMembers: [{
            userId: '1EMr48bl5VZHEgvPixx8',
            isPrimary: true,
            priority: 1,
            locationConfigurations: [{ kind: 'custom' }]
          }, {
            userId: 'CrjEKyAnFPG1MP1Ux1NO',
            isPrimary: false,
            priority: 0.5,
            locationConfigurations: [{ kind: 'custom' }]
          }]
        });

        const calendarId = response.data?.calendar?.id || response.calendar?.id || response.id;
        console.log(`   ✅ Calendario creado`);
        console.log(`   ID: ${calendarId}\n`);

        results.success.push('aulas');
        results.byCalendar['aulas'] = {
          status: 'success',
          id: calendarId,
          name: calendarios.aulas.name,
        };
      } catch (error) {
        console.log(`   ❌ Error: ${error.message}\n`);
        results.failed.push('aulas');
        results.byCalendar['aulas'] = {
          status: 'failed',
          error: error.message,
        };
      }
    }

    // Crear Calendarios Personal Trainers (x4)
    if (calendarios.personal_trainers) {
      console.log(`📅 PERSONAL TRAINERS (${calendarios.personal_trainers.count})\n`);

      for (const trainer of calendarios.personal_trainers.trainers) {
        console.log(`   🏋️  ${trainer.name}`);
        console.log(`       Email: ${trainer.contactEmail}`);
        console.log(`       Servicios: ${trainer.services.join(', ')}`);
        console.log(`       Horario: ${trainer.businessHours.start}-${trainer.businessHours.end}`);

        try {
          const response = await ghl.createCalendar({
            name: trainer.name,
            description: `Calendario de disponibilidad de ${trainer.name.replace('PT — ', '')}. Sincroniza automáticamente con Google Calendar.`,
            type: 'personal',
            color: trainer.color,
            businessHours: trainer.businessHours,
            breaks: trainer.breaks,
            syncWithGoogle: true,
            googleCalendarEmail: trainer.contactEmail,
            teamMembers: [{
              userId: process.env.GHL_LOCATION_ID,
              isPrimary: true,
              priority: 1,
              locationConfigurations: [{ kind: 'custom' }]
            }]
          });

          const trainerId = response.data?.calendar?.id || response.calendar?.id || response.id;
          console.log(`       ✅ Creado (ID: ${trainerId})\n`);

          results.success.push(`pt-${trainer.name.toLowerCase().replace(' ', '-')}`);
          results.byCalendar[trainer.name] = {
            status: 'success',
            id: trainerId,
            email: trainer.contactEmail,
          };
        } catch (error) {
          console.log(`       ❌ Error: ${error.message}\n`);
          results.failed.push(`pt-${trainer.name.toLowerCase().replace(' ', '-')}`);
          results.byCalendar[trainer.name] = {
            status: 'failed',
            error: error.message,
          };
        }
      }
    }

    // Crear Calendario Reavaliaciones
    if (calendarios.reavaliaciones) {
      console.log(`📅 REAVALIACIONES\n`);
      console.log(`   Nombre: ${calendarios.reavaliaciones.name}`);
      console.log(`   Tipo: ${calendarios.reavaliaciones.type}`);
      console.log(`   Duración: ${calendarios.reavaliaciones.duration} minutos`);
      console.log(`   Auto-schedule: Cada ${calendarios.reavaliaciones.autoScheduling.intervalDays} días`);
      console.log(`   Descripción: ${calendarios.reavaliaciones.description}\n`);

      try {
        const response = await ghl.createCalendar({
          name: calendarios.reavaliaciones.name,
          description: calendarios.reavaliaciones.description,
          type: 'round_robin',
          duration: calendarios.reavaliaciones.duration,
          color: calendarios.reavaliaciones.color,
          businessHours: calendarios.reavaliaciones.businessHours,
          autoScheduling: calendarios.reavaliaciones.autoScheduling,
          teamMembers: [{
            userId: '1EMr48bl5VZHEgvPixx8',
            isPrimary: true,
            priority: 1,
            locationConfigurations: [{ kind: 'custom' }]
          }, {
            userId: 'CrjEKyAnFPG1MP1Ux1NO',
            isPrimary: false,
            priority: 0.5,
            locationConfigurations: [{ kind: 'custom' }]
          }]
        });

        const calendarId = response.data?.calendar?.id || response.calendar?.id || response.id;
        console.log(`   ✅ Calendario creado`);
        console.log(`   ID: ${calendarId}\n`);

        results.success.push('reavaliaciones');
        results.byCalendar['reavaliaciones'] = {
          status: 'success',
          id: calendarId,
          name: calendarios.reavaliaciones.name,
        };
      } catch (error) {
        console.log(`   ❌ Error: ${error.message}\n`);
        results.failed.push('reavaliaciones');
        results.byCalendar['reavaliaciones'] = {
          status: 'failed',
          error: error.message,
        };
      }
    }

    console.log('═══════════════════════════════════════════════════════\n');
    console.log('📊 RESUMEN:\n');
    console.log(`✅ Exitosos: ${results.success.length}`);
    console.log(`❌ Fallidos: ${results.failed.length}`);
    console.log('');

    if (results.failed.length > 0) {
      console.log('Fallidos:');
      results.failed.forEach(cal => {
        const details = results.byCalendar[cal];
        console.log(`  • ${cal}: ${details.error}`);
      });
      console.log('');
    }

    results.endTime = new Date();
    results.duration = (results.endTime - results.startTime) / 1000;

    console.log(`Duración: ${results.duration.toFixed(2)}s\n`);

    // Guardar resultados
    const resultsPath = path.resolve('./results/fase4a-calendarios.json');
    fs.mkdirSync(path.dirname(resultsPath), { recursive: true });
    fs.writeFileSync(resultsPath, JSON.stringify(results, null, 2));

    console.log(`✅ Resultados guardados en: results/fase4a-calendarios.json\n`);

    return results;
  } catch (error) {
    console.error('❌ Error fatal:', error.message);
    process.exit(1);
  }
}

criarCalendarios().then(() => {
  console.log('✅ Creación de calendarios completada\n');
  process.exit(0);
});
