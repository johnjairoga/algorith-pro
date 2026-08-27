#!/usr/bin/env node
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const LOCATION_ID = process.env.GHL_LOCATION_ID;
const PIT = process.env.GHL_PIT_TOKEN;

const headersV2 = {
  'Authorization': `Bearer ${PIT}`,
  'Content-Type': 'application/json',
  'Version': '2021-07-28'
};

// Tags a eliminar
const TAGS_ELIMINAR = [
  'ia_activa',
  'ia_desactivada',
  'ia_deshabilitado',
  'ia_en_conversacion',
  'ia_esperando_humano',
  'ia_transferida_humano',
  'diagnostico_agendada',
  'diagnostico_cancelada',
  'diagnostico_confirmada',
  'diagnostico_no_asistio',
  'diagnostico_reagendar'
];

// Tags existentes a renombrar (cambiar _ por -)
const TAGS_RENOMBRAR = {
  'consulta_agendada': 'consulta-agendada',
  'consulta_confirmada': 'consulta-confirmada',
  'consulta_no_asistio': 'consulta-no-asistio',
  'consulta_pendiente': 'consulta-pendiente',
  'consulta_reagendar': 'consulta-reagendar',
  'esp_cirugia_oral': 'esp-cirugia-oral',
  'esp_endodoncia': 'esp-endodoncia',
  'esp_estetica': 'esp-estetica',
  'esp_higiene_oral': 'esp-higiene-oral',
  'esp_implantes': 'esp-implantes',
  'esp_implantologia': 'esp-implantologia',
  'esp_multidisciplinar': 'esp-multidisciplinar',
  'esp_odontologia_general': 'esp-odontologia-general',
  'esp_ortodoncia': 'esp-ortodoncia',
  'esp_periodoncia': 'esp-periodoncia',
  'esp_rehabilitacion_oral': 'esp-rehabilitacion-oral',
  'lead_agendado': 'lead-agendado',
  'lead_calificado': 'lead-calificado',
  'lead_interesado': 'lead-interesado',
  'lead_no_calificado': 'lead-no-calificado',
  'lead_nuevo': 'lead-nuevo',
  'paciente_activo': 'paciente-activo',
  'paciente_en_tratamiento': 'paciente-en-tratamiento',
  'paciente_nuevo': 'paciente-nuevo',
  'paciente_recurrente': 'paciente-recurrente',
  'link clicked google review': 'link-clicked-google-review',
  'negative feelback': 'negative-feedback',
  'past-clients-g-review': 'past-clients-g-review',
  'follow-up': 'follow-up',
  'humano_requerido': 'humano-requerido',
  'i_deshabilitado': 'i-deshabilitado',
  'registro_completos': 'registro-completos'
};

// Nueva tag a crear
const TAG_NUEVA = 'primer-contacto';

async function obtenerTodosLosTags() {
  console.log('\n📋 Obteniendo todos los tags actuales...\n');

  try {
    const res = await axios.get(
      `https://services.leadconnectorhq.com/locations/${LOCATION_ID}/tags`,
      { headers: headersV2, timeout: 10000 }
    );

    return res.data.tags || [];
  } catch (e) {
    console.error('❌ Error al obtener tags:', e.message);
    return [];
  }
}

async function eliminarTag(tagId, tagName) {
  try {
    await axios.delete(
      `https://services.leadconnectorhq.com/locations/${LOCATION_ID}/tags/${tagId}`,
      { headers: headersV2, timeout: 10000 }
    );
    console.log(`✅ Eliminado: ${tagName}`);
    return true;
  } catch (e) {
    console.error(`❌ Error eliminando ${tagName}:`, e.response?.data?.message || e.message);
    return false;
  }
}

async function renombrarTag(tagId, tagName, newName) {
  try {
    await axios.put(
      `https://services.leadconnectorhq.com/locations/${LOCATION_ID}/tags/${tagId}`,
      { name: newName },
      { headers: headersV2, timeout: 10000 }
    );
    console.log(`✅ Renombrado: ${tagName} → ${newName}`);
    return true;
  } catch (e) {
    console.error(`❌ Error renombrando ${tagName}:`, e.response?.data?.message || e.message);
    return false;
  }
}

async function crearTag(tagName) {
  try {
    await axios.post(
      `https://services.leadconnectorhq.com/locations/${LOCATION_ID}/tags`,
      { name: tagName },
      { headers: headersV2, timeout: 10000 }
    );
    console.log(`✅ Creado: ${tagName}`);
    return true;
  } catch (e) {
    console.error(`❌ Error creando ${tagName}:`, e.response?.data?.message || e.message);
    return false;
  }
}

async function procesarActualizaciones() {
  console.log('═'.repeat(70));
  console.log('🔄 ACTUALIZANDO TAGS DEL PROYECTO');
  console.log('═'.repeat(70));

  const tags = await obtenerTodosLosTags();

  if (tags.length === 0) {
    console.log('❌ No se pudieron obtener los tags');
    return;
  }

  // Crear mapa de tags actuales
  const tagMap = {};
  tags.forEach(tag => {
    tagMap[tag.name] = tag.id;
  });

  let eliminados = 0;
  let renombrados = 0;
  let creados = 0;

  // 1️⃣ ELIMINAR TAGS
  console.log('\n\n1️⃣ ELIMINANDO TAGS (11 tags)...\n');
  for (const tagName of TAGS_ELIMINAR) {
    if (tagMap[tagName]) {
      const success = await eliminarTag(tagMap[tagName], tagName);
      if (success) eliminados++;
    } else {
      console.log(`⚠️  No encontrado: ${tagName}`);
    }
  }

  // 2️⃣ RENOMBRAR TAGS (cambiar _ por -)
  console.log('\n\n2️⃣ RENOMBRANDO TAGS (cambiar _ por -)...\n');
  for (const [oldName, newName] of Object.entries(TAGS_RENOMBRAR)) {
    if (tagMap[oldName]) {
      const success = await renombrarTag(tagMap[oldName], oldName, newName);
      if (success) renombrados++;
    } else {
      console.log(`⚠️  No encontrado: ${oldName}`);
    }
  }

  // 3️⃣ CREAR NUEVA TAG
  console.log('\n\n3️⃣ CREANDO NUEVA TAG...\n');
  const successNew = await crearTag(TAG_NUEVA);
  if (successNew) creados++;

  // RESUMEN
  console.log('\n\n═'.repeat(70));
  console.log('📊 RESUMEN DE CAMBIOS');
  console.log('═'.repeat(70));
  console.log(`✅ Eliminados:   ${eliminados}/11`);
  console.log(`✅ Renombrados:  ${renombrados}/${Object.keys(TAGS_RENOMBRAR).length}`);
  console.log(`✅ Creados:      ${creados}/1`);
  console.log('═'.repeat(70));
  console.log('\n');
}

procesarActualizaciones();
