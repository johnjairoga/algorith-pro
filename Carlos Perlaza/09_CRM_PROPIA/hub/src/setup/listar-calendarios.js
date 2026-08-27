import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const PIT = process.env.GHL_PIT_TOKEN;
const LOCATION_ID = process.env.GHL_LOCATION_ID;

async function listarCalendarios() {
  try {
    console.log('\n📅 Listando calendarios en GHL...\n');

    const response = await axios.get(
      'https://services.leadconnectorhq.com/calendars',
      {
        headers: {
          Authorization: `Bearer ${PIT}`,
          'Accept': 'application/json',
          'Version': '2021-07-28'
        }
      }
    );

    console.log('📋 Calendarios encontrados:\n');
    if (response.data?.calendars) {
      response.data.calendars.forEach(cal => {
        console.log(`  • ${cal.name}`);
        console.log(`    ID: ${cal.id}`);
        console.log(`    Tipo: ${cal.calendarType}`);
        console.log(`    Activo: ${cal.isActive}`);
        console.log('');
      });
    } else {
      console.log('No calendars found');
    }
  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
    process.exit(1);
  }
}

listarCalendarios();
