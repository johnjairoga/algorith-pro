#!/usr/bin/env node

/**
 * Script de Validación de Conexión con GHL
 * Clínica de Carlos Perlaza
 * Valida PIT Token y Location ID actuales
 */

require('dotenv').config();

const axios = require('axios');

async function validarConexion() {
  console.log('\n🔍 VALIDANDO CONEXIÓN CON GHL - CLÍNICA DE CARLOS PERLAZA\n');
  console.log('═'.repeat(60));

  // Datos del .env
  const locationId = process.env.GHL_LOCATION_ID;
  const pitToken = process.env.GHL_PIT_TOKEN;
  const apiUrl = process.env.GHL_API_URL;

  console.log('\n📋 CREDENCIALES CARGADAS:');
  console.log(`   Location ID: ${locationId}`);
  console.log(`   PIT Token: ${pitToken.substring(0, 20)}...`);
  console.log(`   API URL: ${apiUrl}`);

  if (!locationId || !pitToken) {
    console.error('\n❌ ERROR: Falta Location ID o PIT Token en .env');
    process.exit(1);
  }

  try {
    // Test 1: Obtener información de la ubicación
    console.log('\n\n🧪 TEST 1: Obtener información de la ubicación...');
    console.log('─'.repeat(60));

    const locationResponse = await axios.get(
      `${apiUrl}/locations/${locationId}`,
      {
        headers: {
          'Authorization': `Bearer ${pitToken}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const locationData = locationResponse.data?.location || {};
    console.log('✅ Conexión exitosa!\n');
    console.log(`   Nombre: ${locationData.name || 'N/A'}`);
    console.log(`   ID: ${locationData.id || 'N/A'}`);
    console.log(`   Email: ${locationData.email || 'N/A'}`);
    console.log(`   Teléfono: ${locationData.phone || 'N/A'}`);
    console.log(`   Dirección: ${locationData.address || 'N/A'}`);
    console.log(`   País: ${locationData.country || 'N/A'}`);

    // Test 2: Listar contactos
    console.log('\n\n🧪 TEST 2: Listar contactos recientes...');
    console.log('─'.repeat(60));

    const contactsResponse = await axios.get(
      `${apiUrl}/contacts?locationId=${locationId}&limit=5`,
      {
        headers: {
          'Authorization': `Bearer ${pitToken}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const contacts = contactsResponse.data?.contacts || [];
    console.log(`✅ Contactos encontrados: ${contacts.length}\n`);

    if (contacts.length > 0) {
      contacts.slice(0, 3).forEach((contact, index) => {
        console.log(`   [${index + 1}] ${contact.firstName} ${contact.lastName}`);
        console.log(`       Email: ${contact.email || 'N/A'}`);
        console.log(`       Teléfono: ${contact.phone || 'N/A'}`);
        console.log(`       Tags: ${contact.tags?.join(', ') || 'Sin tags'}\n`);
      });
    } else {
      console.log('   (Sin contactos aún)');
    }

    // Test 3: Listar pipelines
    console.log('\n\n🧪 TEST 3: Listar pipelines...');
    console.log('─'.repeat(60));

    const pipelinesResponse = await axios.get(
      `${apiUrl}/pipelines?locationId=${locationId}`,
      {
        headers: {
          'Authorization': `Bearer ${pitToken}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const pipelines = pipelinesResponse.data?.pipelines || [];
    console.log(`✅ Pipelines encontrados: ${pipelines.length}\n`);

    pipelines.forEach((pipeline, index) => {
      console.log(`   [${index + 1}] ${pipeline.name}`);
      console.log(`       ID: ${pipeline.id}`);
      console.log(`       Etapas: ${pipeline.stages?.length || 0}\n`);
    });

    // Test 4: Obtener custom fields
    console.log('\n\n🧪 TEST 4: Campos personalizados...');
    console.log('─'.repeat(60));

    const fieldsResponse = await axios.get(
      `${apiUrl}/locations/${locationId}/customFields`,
      {
        headers: {
          'Authorization': `Bearer ${pitToken}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const fields = fieldsResponse.data?.customFields || [];
    console.log(`✅ Campos personalizados: ${fields.length}\n`);

    fields.slice(0, 5).forEach((field, index) => {
      console.log(`   [${index + 1}] ${field.name}`);
      console.log(`       Tipo: ${field.fieldType}`);
      console.log(`       Obligatorio: ${field.isRequired ? 'Sí' : 'No'}\n`);
    });

    // RESUMEN FINAL
    console.log('\n\n' + '═'.repeat(60));
    console.log('✅ VALIDACIÓN EXITOSA');
    console.log('═'.repeat(60));
    console.log('\n📊 RESUMEN:');
    console.log(`   ✅ Ubicación: ${locationData.name || locationId}`);
    console.log(`   ✅ Contactos: ${contacts.length}`);
    console.log(`   ✅ Pipelines: ${pipelines.length}`);
    console.log(`   ✅ Campos: ${fields.length}`);
    console.log('\n✨ ¡La conexión con GHL está funcionando correctamente!');
    console.log('\n');

  } catch (error) {
    console.error('\n❌ ERROR EN LA CONEXIÓN\n');
    console.error(`Status: ${error.response?.status}`);
    console.error(`Mensaje: ${error.response?.data?.message || error.message}`);

    if (error.response?.status === 401) {
      console.error('\n⚠️  PROBLEMA COMÚN: Token inválido o expirado');
      console.error('   Soluciones:');
      console.error('   1. Verifica que el PIT Token es válido');
      console.error('   2. Verifica que el Location ID es correcto');
      console.error('   3. Regenera el token en GHL Console si es antiguo (>90 días)');
    } else if (error.response?.status === 404) {
      console.error('\n⚠️  PROBLEMA COMÚN: Location ID no existe');
      console.error('   Soluciones:');
      console.error('   1. Verifica el Location ID en GHL Settings → General');
      console.error('   2. Copia exactamente (sin espacios)');
    }

    console.error('\n');
    process.exit(1);
  }
}

validarConexion();
