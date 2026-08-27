import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const PIT = process.env.GHL_PIT_TOKEN;
const LOCATION_ID = process.env.GHL_LOCATION_ID;
const API_URL = process.env.GHL_API_URL || 'https://services.leadconnectorhq.com';

async function obtenerTeamMembers() {
  try {
    console.log('\n👥 OBTENIENDO TEAM MEMBERS (DOCTORES)...\n');

    const response = await axios.get(
      `${API_URL}/locations/${LOCATION_ID}/users`,
      {
        headers: {
          'Authorization': `Bearer ${PIT}`,
          'Accept': 'application/json',
          'Version': 'v3',
          'Content-Type': 'application/json'
        }
      }
    );

    const users = response.data?.users || [];

    console.log(`📋 Team Members encontrados: ${users.length}\n`);
    console.log('═══════════════════════════════════════════════════════\n');

    if (users.length === 0) {
      console.log('⚠️  No hay team members. Necesitas crear doctores primero.\n');
      return [];
    }

    users.forEach((user, index) => {
      console.log(`${index + 1}. ${user.name || user.firstName || 'Sin nombre'}`);
      console.log(`   ID: ${user.id}`);
      console.log(`   Email: ${user.email || 'N/A'}`);
      console.log(`   Role: ${user.role || 'N/A'}`);
      console.log(`   Activo: ${user.status === 'active' ? '🟢' : '🔴'}`);
      console.log('');
    });

    console.log('═══════════════════════════════════════════════════════\n');

    return users;

  } catch (error) {
    console.error('\n❌ ERROR:\n');
    console.error('Status:', error.response?.status);
    console.error('Mensaje:', error.response?.data?.message || error.message);
    console.error('Datos:', JSON.stringify(error.response?.data, null, 2));
    process.exit(1);
  }
}

obtenerTeamMembers().then(() => {
  console.log('✅ Completado\n');
  process.exit(0);
});
