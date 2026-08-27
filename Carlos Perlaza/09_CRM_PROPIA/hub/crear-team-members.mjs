import axios from 'axios';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

const PIT = process.env.GHL_PIT_TOKEN;
const LOCATION_ID = process.env.GHL_LOCATION_ID;
const API_URL = process.env.GHL_API_URL || 'https://services.leadconnectorhq.com';

const MEDICOS = [
  {
    nombre: 'Dra. Anja Arellano M.',
    email: 'anja.arellano@clinicapuebla.com',
    telefono: '81 46 82 32 89'
  },
  {
    nombre: 'Dr. Aristides Arellano Huacuja',
    email: 'aristides.arellano@clinicapuebla.com',
    telefono: '22 23 23 09 72'
  },
  {
    nombre: 'Dra. Dafne Arellano Montalvo',
    email: 'dafne.arellano@clinicapuebla.com',
    telefono: '81 45 67 89 01'
  }
];

async function crearTeamMembers() {
  try {
    console.log('\n👥 CREANDO TEAM MEMBERS (STAFF)...\n');

    const results = {
      success: [],
      failed: [],
      byMedico: {}
    };

    for (const medico of MEDICOS) {
      const [firstName, ...lastNameParts] = medico.nombre.split(' ');
      const lastName = lastNameParts.join(' ');

      console.log(`👨‍⚕️  ${medico.nombre}`);
      console.log(`   Email: ${medico.email}`);

      try {
        // Intento 1: Endpoint de team members
        const payload = {
          firstName: firstName,
          lastName: lastName,
          email: medico.email,
          phone: medico.telefono,
          locationId: LOCATION_ID,
          role: 'staff'
        };

        let response;
        let staffId;

        // Intentar POST /team-members/
        try {
          response = await axios.post(
            `${API_URL}/team-members/`,
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
          staffId = response.data?.teamMember?.id || response.data?.id;
          console.log(`   ✅ Team Member creado (ID: ${staffId})\n`);
        } catch (error1) {
          // Intento 2: Endpoint alternativo
          if (error1.response?.status === 404) {
            console.log(`   ℹ️  Intento endpoint alternativo...`);
            response = await axios.post(
              `${API_URL}/locations/${LOCATION_ID}/team-members`,
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
            staffId = response.data?.teamMember?.id || response.data?.id;
            console.log(`   ✅ Team Member creado (ID: ${staffId})\n`);
          } else {
            throw error1;
          }
        }

        results.success.push(medico.nombre);
        results.byMedico[medico.nombre] = {
          status: 'success',
          staff_id: staffId,
          email: medico.email
        };

      } catch (error) {
        console.log(`   ❌ Error: ${error.response?.data?.message || error.message}\n`);
        results.failed.push(medico.nombre);
        results.byMedico[medico.nombre] = {
          status: 'failed',
          error: error.response?.data?.message || error.message
        };
      }

      await new Promise(resolve => setTimeout(resolve, 500));
    }

    console.log(`\n✅ Exitosos: ${results.success.length}/3`);
    console.log(`❌ Fallidos: ${results.failed.length}/3\n`);

    if (results.success.length > 0) {
      console.log('📌 STAFF IDS (Guarda estos para crear calendarios):\n');
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

    return results;

  } catch (error) {
    console.error('Error fatal:', error.message);
    process.exit(1);
  }
}

crearTeamMembers().then((results) => {
  process.exit(0);
});
