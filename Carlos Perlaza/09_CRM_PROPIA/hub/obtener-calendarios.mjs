import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const PIT = process.env.GHL_PIT_TOKEN;
const LOCATION_ID = process.env.GHL_LOCATION_ID;
const API_URL = process.env.GHL_API_URL || 'https://services.leadconnectorhq.com';

async function obtenerCalendarios() {
  try {
    console.log('\n📅 OBTENIENDO CALENDARIOS ACTUALES EN GHL...\n');
    console.log(`📍 Location ID: ${LOCATION_ID}`);
    console.log(`🔗 API URL: ${API_URL}\n`);

    // Opción 1: Sin groupId (más general)
    const response = await axios.get(
      `${API_URL}/calendars/`,
      {
        params: {
          locationId: LOCATION_ID,
          showDrafted: true
        },
        headers: {
          'Authorization': `Bearer ${PIT}`,
          'Accept': 'application/json',
          'Version': 'v3',
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('═══════════════════════════════════════════════════════\n');

    const calendars = response.data?.calendars || response.data || [];

    if (!calendars || calendars.length === 0) {
      console.log('✅ NO HAY CALENDARIOS ACTUALES EN GHL\n');
      console.log('Estado: Cuenta limpia, lista para crear nuevos calendarios\n');
      return [];
    }

    console.log(`📋 CALENDARIOS ENCONTRADOS: ${calendars.length}\n`);
    console.log('═══════════════════════════════════════════════════════\n');

    const calendarList = [];

    calendars.forEach((cal, index) => {
      console.log(`${index + 1}. ${cal.name || cal.slug || 'Sin nombre'}`);
      console.log(`   ID: ${cal.id}`);
      console.log(`   Tipo: ${cal.calendarType || 'No especificado'}`);
      console.log(`   Estado: ${cal.isActive ? '🟢 Activo' : '🔴 Inactivo'}`);
      console.log(`   Slug: ${cal.slug || 'N/A'}`);
      console.log(`   Descripción: ${cal.description || 'Sin descripción'}`);
      console.log('');

      calendarList.push({
        name: cal.name || cal.slug,
        id: cal.id,
        type: cal.calendarType,
        isActive: cal.isActive,
        slug: cal.slug
      });
    });

    console.log('═══════════════════════════════════════════════════════\n');
    console.log('🗑️  CALENDARIOS A ELIMINAR:\n');

    calendarList.forEach((cal, index) => {
      console.log(`${index + 1}. ${cal.name}`);
      console.log(`   curl -X DELETE '${API_URL}/calendars/${cal.id}' \\`);
      console.log(`   -H 'Authorization: Bearer <TU_PIT_TOKEN>' \\`);
      console.log(`   -H 'Accept: application/json' \\`);
      console.log(`   -H 'Version: v3'\n`);
    });

    console.log('═══════════════════════════════════════════════════════\n');
    console.log('📊 RESUMEN:\n');
    console.log(`Total calendarios: ${calendarList.length}`);
    console.log(`Activos: ${calendarList.filter(c => c.isActive).length}`);
    console.log(`Inactivos: ${calendarList.filter(c => !c.isActive).length}`);

    // Guardar resultado
    const result = {
      totalCalendars: calendarList.length,
      calendars: calendarList,
      timestamp: new Date().toISOString()
    };

    console.log('\n✅ Datos guardados en obtener-calendarios-result.json\n');

    return result;

  } catch (error) {
    console.error('\n❌ ERROR AL OBTENER CALENDARIOS:\n');
    console.error('Status:', error.response?.status);
    console.error('Mensaje:', error.response?.data?.message || error.message);
    console.error('Datos completos:', JSON.stringify(error.response?.data, null, 2));
    process.exit(1);
  }
}

obtenerCalendarios().then((result) => {
  console.log('✅ Proceso completado\n');
  process.exit(0);
});
