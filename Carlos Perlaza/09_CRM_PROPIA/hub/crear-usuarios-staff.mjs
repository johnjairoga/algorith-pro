import axios from 'axios';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

const PIT = process.env.GHL_PIT_TOKEN;
const LOCATION_ID = process.env.GHL_LOCATION_ID;
const COMPANY_ID = 'IvLvw1g0KNixpUKWhT5Y'; // Company ID obtenido
const API_URL = process.env.GHL_API_URL || 'https://services.leadconnectorhq.com';

const MEDICOS = [
  {
    nombre: 'Dra. Anja Arellano M.',
    firstName: 'Anja',
    lastName: 'Arellano M.',
    email: 'anja.arellano@clinicapuebla.com',
    phone: '81 46 82 32 89',
    password: 'DraAnja2026@Clinic'
  },
  {
    nombre: 'Dr. Aristides Arellano Huacuja',
    firstName: 'Aristides',
    lastName: 'Arellano Huacuja',
    email: 'aristides.arellano@clinicapuebla.com',
    phone: '22 23 23 09 72',
    password: 'DrAristides2026@Clinic'
  },
  {
    nombre: 'Dra. Dafne Arellano Montalvo',
    firstName: 'Dafne',
    lastName: 'Arellano Montalvo',
    email: 'dafne.arellano@clinicapuebla.com',
    phone: '81 45 67 89 01',
    password: 'DraDafne2026@Clinic'
  }
];

async function crearUsuariosStaff() {
  try {
    console.log('\n👥 CREANDO USUARIOS STAFF (MÉDICOS)...\n');
    console.log(`📍 Location ID: ${LOCATION_ID}\n`);

    const results = {
      success: [],
      failed: [],
      byMedico: {},
      startTime: new Date()
    };

    for (const medico of MEDICOS) {
      console.log(`👨‍⚕️  ${medico.nombre}`);
      console.log(`   Email: ${medico.email}`);
      console.log(`   Teléfono: ${medico.phone}`);

      try {
        const payload = {
          companyId: COMPANY_ID,
          email: medico.email,
          password: medico.password,
          phone: medico.phone,
          type: 'account',
          role: 'user',
          locationIds: [LOCATION_ID],
          firstName: medico.firstName,
          lastName: medico.lastName,
          permissions: {
            appointmentsEnabled: true,
            contactsEnabled: true,
            conversationsEnabled: true,
            reviewsEnabled: true
          }
        };

        const response = await axios.post(
          `${API_URL}/users/`,
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
        console.log(`   ✅ Usuario Staff creado (ID: ${userId})\n`);

        results.success.push(medico.nombre);
        results.byMedico[medico.nombre] = {
          status: 'success',
          user_id: userId,
          staff_id: userId,
          email: medico.email
        };

      } catch (error) {
        const errorMsg = error.response?.data?.message || error.message;
        console.log(`   ❌ Error: ${errorMsg}\n`);
        results.failed.push(medico.nombre);
        results.byMedico[medico.nombre] = {
          status: 'failed',
          error: errorMsg,
          email: medico.email
        };
      }

      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    console.log('═══════════════════════════════════════════════════════\n');
    console.log(`✅ Exitosos: ${results.success.length}/3`);
    console.log(`❌ Fallidos: ${results.failed.length}/3\n`);

    if (results.success.length > 0) {
      console.log('📌 STAFF USER IDS (Para crear calendarios):\n');
      Object.entries(results.byMedico)
        .filter(([_, data]) => data.status === 'success')
        .forEach(([nombre, data]) => {
          console.log(`"${nombre}" → "${data.staff_id}"`);
        });

      // Guardar mapping
      const mapping = {};
      Object.entries(results.byMedico)
        .filter(([_, data]) => data.status === 'success')
        .forEach(([nombre, data]) => {
          mapping[nombre] = data.staff_id;
        });

      fs.mkdirSync(path.resolve('./config'), { recursive: true });
      fs.writeFileSync(
        path.resolve('./config/staff-ids-ghl.json'),
        JSON.stringify(mapping, null, 2)
      );
      console.log(`\n💾 Guardado en: config/staff-ids-ghl.json\n`);
    }

    if (results.failed.length > 0) {
      console.log('\n❌ Usuarios que fallaron:\n');
      Object.entries(results.byMedico)
        .filter(([_, data]) => data.status === 'failed')
        .forEach(([nombre, data]) => {
          console.log(`❌ ${nombre}: ${data.error}\n`);
        });
    }

    results.endTime = new Date();
    results.duration = (results.endTime - results.startTime) / 1000;

    // Guardar resultados
    fs.mkdirSync(path.resolve('./results'), { recursive: true });
    fs.writeFileSync(
      path.resolve('./results/usuarios-staff-creados.json'),
      JSON.stringify(results, null, 2)
    );

    console.log(`⏱️  Duración: ${results.duration.toFixed(2)}s\n`);

    return results;

  } catch (error) {
    console.error('❌ Error fatal:', error.message);
    process.exit(1);
  }
}

crearUsuariosStaff().then((results) => {
  if (results.success.length === 3) {
    console.log('🎉 ¡TODOS LOS USUARIOS STAFF CREADOS!\n');
    console.log('Próximo: Crear 8 calendarios vinculados a estos usuarios.\n');
  }
  process.exit(0);
});
