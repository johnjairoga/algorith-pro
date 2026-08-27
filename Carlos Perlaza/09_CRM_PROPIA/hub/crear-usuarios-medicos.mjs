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

async function crearUsuariosMedicos() {
  try {
    console.log('\n👨‍⚕️  CREANDO USUARIOS (MÉDICOS) EN GHL...\n');
    console.log(`📍 Location ID: ${LOCATION_ID}`);
    console.log(`👥 Médicos a crear: ${medicos.length}\n`);
    console.log('═══════════════════════════════════════════════════════\n');

    const results = {
      success: [],
      failed: [],
      byMedico: {},
      startTime: new Date(),
    };

    for (let i = 0; i < medicos.length; i++) {
      const medico = medicos[i];

      const [firstName, ...lastNameParts] = medico.nombre_completo.split(' ');
      const lastName = lastNameParts.join(' ');

      console.log(`[${i + 1}/${medicos.length}] 👨‍⚕️  ${medico.nombre_completo}`);
      console.log(`   Email: ${medico.email}`);
      console.log(`   Teléfono: ${medico.telefono_laboral}`);

      try {
        const payload = {
          firstName: firstName,
          lastName: lastName || 'Doctor',
          name: medico.nombre_completo,
          email: medico.email,
          phone: medico.telefono_laboral,
          locationId: LOCATION_ID,
          source: 'system_doctor',
          customFields: [
            {
              key: 'especialidades',
              fieldValue: medico.especialidades.join(', ')
            },
            {
              key: 'tipo_usuario',
              fieldValue: 'Doctor'
            }
          ]
        };

        const response = await axios.post(
          `${API_URL}/contacts/`,
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

        const userId = response.data?.contact?.id || response.data?.id;
        console.log(`   ✅ Usuario creado (ID: ${userId})\n`);

        results.success.push(medico.nombre_completo);
        results.byMedico[medico.nombre_completo] = {
          status: 'success',
          contact_id: userId,
          email: medico.email,
          telefono: medico.telefono_laboral,
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
      console.log('✅ USUARIOS CREADOS (MÉDICOS):\n');
      results.success.forEach(nombre => {
        const medico = results.byMedico[nombre];
        console.log(`  👨‍⚕️  ${nombre}`);
        console.log(`     Contact ID: ${medico.contact_id}`);
        console.log(`     Email: ${medico.email}`);
        console.log(`     Especialidades: ${medico.especialidades.join(', ')}\n`);
      });

      console.log('\n📌 GUARDA ESTOS IDS - Los necesitarás para vincular a calendarios:\n');
      const mapping = {};
      Object.entries(results.byMedico)
        .filter(([_, data]) => data.status === 'success')
        .forEach(([nombre, data]) => {
          console.log(`"${nombre}" → Contact ID: "${data.contact_id}"`);
          mapping[nombre] = data.contact_id;
        });

      // Guardar mapping
      const mappingPath = path.resolve('./config/medicos-ids-ghl.json');
      fs.writeFileSync(mappingPath, JSON.stringify(mapping, null, 2));
      console.log(`\n💾 Mapping guardado en: config/medicos-ids-ghl.json\n`);
    }

    if (results.failed.length > 0) {
      console.log('\n❌ USUARIOS QUE FALLARON:\n');
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
    const resultsPath = path.resolve('./results/fase4a-usuarios-medicos-creados.json');
    fs.mkdirSync(path.dirname(resultsPath), { recursive: true });
    fs.writeFileSync(resultsPath, JSON.stringify(results, null, 2));

    console.log(`📊 Resultados: results/fase4a-usuarios-medicos-creados.json\n`);

    return results;

  } catch (error) {
    console.error('\n❌ ERROR FATAL:\n');
    console.error(error.message);
    process.exit(1);
  }
}

crearUsuariosMedicos().then(() => {
  console.log('✅ Usuarios creados. Próximo: Crear calendarios vinculándolos a estos usuarios.\n');
  process.exit(0);
});
