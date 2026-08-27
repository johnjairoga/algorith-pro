import axios from 'axios';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const PIT = process.env.GHL_PIT_TOKEN;
const LOCATION_ID = process.env.GHL_LOCATION_ID;
const API_URL = process.env.GHL_API_URL || 'https://services.leadconnectorhq.com';

// Cargar perfiles de médicos
const medicosData = JSON.parse(
  fs.readFileSync(path.resolve('./config/medicos-perfiles.json'), 'utf-8')
);

const medicos = medicosData.medicos;

async function crearTeamMembers() {
  try {
    console.log('\n👥 CREANDO TEAM MEMBERS (MÉDICOS) EN GHL...\n');
    console.log(`📍 Location ID: ${LOCATION_ID}`);
    console.log(`👨‍⚕️  Médicos a crear: ${medicos.length}\n`);
    console.log('═══════════════════════════════════════════════════════\n');

    const results = {
      success: [],
      failed: [],
      byMedico: {},
      startTime: new Date(),
    };

    for (let i = 0; i < medicos.length; i++) {
      const medico = medicos[i];
      console.log(`[${i + 1}/${medicos.length}] 👨‍⚕️  ${medico.nombre_completo}`);
      console.log(`   Email: ${medico.email}`);
      console.log(`   Especialidades: ${medico.especialidades.join(', ')}`);

      try {
        const payload = {
          firstName: medico.nombre_completo.split(' ')[0],
          lastName: medico.nombre_completo.substring(medico.nombre_completo.indexOf(' ') + 1),
          email: medico.email,
          phone: medico.telefono_laboral,
          role: 'staff',
          title: 'Doctor',
          locationId: LOCATION_ID,
          isActive: true,
          permissions: ['calendar-view', 'calendar-manage', 'contact-view']
        };

        const response = await axios.post(
          `${API_URL}/locations/${LOCATION_ID}/users`,
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

        const userId = response.data?.user?.id || response.data?.id;
        console.log(`   ✅ Creado con ID: ${userId}\n`);

        results.success.push(medico.nombre_completo);
        results.byMedico[medico.nombre_completo] = {
          status: 'success',
          ghl_id: userId,
          email: medico.email,
          especialidades: medico.especialidades,
          original_id: medico.id
        };

      } catch (error) {
        const errorMsg = error.response?.data?.message || error.message;
        console.log(`   ❌ Error: ${errorMsg}\n`);
        results.failed.push(medico.nombre_completo);
        results.byMedico[medico.nombre_completo] = {
          status: 'failed',
          error: errorMsg,
          email: medico.email
        };
      }

      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    console.log('═══════════════════════════════════════════════════════\n');
    console.log('📊 RESUMEN:\n');
    console.log(`✅ Exitosos: ${results.success.length}`);
    console.log(`❌ Fallidos: ${results.failed.length}\n`);

    if (results.success.length > 0) {
      console.log('✅ Team Members creados:\n');
      results.success.forEach(nombre => {
        const medico = results.byMedico[nombre];
        console.log(`  👨‍⚕️  ${nombre}`);
        console.log(`     GHL ID: ${medico.ghl_id}`);
        console.log(`     Email: ${medico.email}\n`);
      });

      console.log('\n📌 GUARDA ESTOS IDS - Los necesitarás para los calendarios:\n');
      Object.entries(results.byMedico)
        .filter(([_, data]) => data.status === 'success')
        .forEach(([nombre, data]) => {
          console.log(`"${nombre}" → "${data.ghl_id}"`);
        });
    }

    if (results.failed.length > 0) {
      console.log('\n❌ Team Members que fallaron:\n');
      results.failed.forEach(nombre => {
        const medico = results.byMedico[nombre];
        console.log(`  ❌ ${nombre}`);
        console.log(`     Error: ${medico.error}\n`);
      });
    }

    results.endTime = new Date();
    results.duration = (results.endTime - results.startTime) / 1000;

    console.log(`⏱️  Duración total: ${results.duration.toFixed(2)}s\n`);

    // Guardar resultados
    const resultsPath = path.resolve('./results/fase4a-team-members-creados.json');
    fs.mkdirSync(path.dirname(resultsPath), { recursive: true });
    fs.writeFileSync(resultsPath, JSON.stringify(results, null, 2));

    console.log(`📊 Resultados guardados en: results/fase4a-team-members-creados.json\n`);

    return results;

  } catch (error) {
    console.error('\n❌ ERROR FATAL:\n');
    console.error(error.message);
    process.exit(1);
  }
}

crearTeamMembers().then(() => {
  console.log('✅ Proceso completado\n');
  process.exit(0);
});
