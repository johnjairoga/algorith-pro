import axios from 'axios';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const PIT = process.env.GHL_PIT_TOKEN;
const LOCATION_ID = process.env.GHL_LOCATION_ID;
const API_URL = process.env.GHL_API_URL || 'https://services.leadconnectorhq.com';

// Cargar IDs de médicos y calendarios
const medicosIds = JSON.parse(
  fs.readFileSync(path.resolve('./config/medicos-ids-ghl.json'), 'utf-8')
);

const calendarioIds = JSON.parse(
  fs.readFileSync(path.resolve('./results/fase4b-calendarios-vinculados.json'), 'utf-8')
);

// 8 Servicios a crear
const SERVICIOS = [
  {
    name: 'Cirugía Plástica Facial',
    slug: 'cirugia-plastica-facial',
    description: 'Procedimientos quirúrgicos faciales (rinoplastia, blepharoplastia, lifting). Consulta previa requerida.',
    eventColor: '#D32F2F',
    serviceDuration: 210,
    staff: ['Dra. Anja Arellano M.', 'Dr. Aristides Arellano Huacuja']
  },
  {
    name: 'Cirugía Plástica Corporal',
    slug: 'cirugia-plastica-corporal',
    description: 'Procedimientos quirúrgicos corporales (abdominoplastia, liposucción, aumento de senos).',
    eventColor: '#C2185B',
    serviceDuration: 270,
    staff: ['Dra. Anja Arellano M.', 'Dr. Aristides Arellano Huacuja']
  },
  {
    name: 'Cirugía de Restauración Capilar',
    slug: 'cirugia-restauracion-capilar',
    description: 'Injertos de cabello (FUE, FUT) y trasplante capilar. Procedimiento largo.',
    eventColor: '#7B1FA2',
    serviceDuration: 390,
    staff: ['Dra. Anja Arellano M.']
  },
  {
    name: 'Tratamiento de Restauración Capilar',
    slug: 'tratamiento-restauracion-capilar',
    description: 'PRP capilar, mesoterapia, láser baja potencia. Sesiones múltiples cada 3-4 semanas.',
    eventColor: '#512DA8',
    serviceDuration: 60,
    staff: ['Dra. Anja Arellano M.', 'Dr. Aristides Arellano Huacuja']
  },
  {
    name: 'Moldeo Corporal',
    slug: 'moldeo-corporal',
    description: 'CoolSculpting, radiofrecuencia, ultrasonido cavitacional. Sesiones múltiples cada 4-6 semanas.',
    eventColor: '#1976D2',
    serviceDuration: 90,
    staff: ['Dra. Dafne Arellano Montalvo']
  },
  {
    name: 'Tratamientos Láser',
    slug: 'tratamientos-laser',
    description: 'Depilación láser, resurfacing, remoción de cicatrices, rejuvenecimiento. Sesiones múltiples.',
    eventColor: '#F57F17',
    serviceDuration: 60,
    staff: ['Dra. Anja Arellano M.']
  },
  {
    name: 'Medicina Estética Antienvejecimiento',
    slug: 'medicina-estetica-antienvejecimiento',
    description: 'Botox, fillers, PRP y otros inyectables anti-envejecimiento. Cliente VIP recurrente.',
    eventColor: '#388E3C',
    serviceDuration: 45,
    staff: ['Dr. Aristides Arellano Huacuja', 'Dra. Dafne Arellano Montalvo']
  },
  {
    name: 'Dermatología y Alergias',
    slug: 'dermatologia-alergias',
    description: 'Consulta dermatológica general, tratamiento de acné/rosácea, pruebas de alergia.',
    eventColor: '#00796B',
    serviceDuration: 50,
    staff: ['Dr. Aristides Arellano Huacuja', 'Dra. Dafne Arellano Montalvo']
  }
];

async function crearServicios() {
  try {
    console.log('\n📋 CREANDO 8 SERVICIOS...\n');
    console.log(`📍 Location ID: ${LOCATION_ID}\n`);

    const results = {
      success: [],
      failed: [],
      byServicio: {},
      startTime: new Date()
    };

    for (let i = 0; i < SERVICIOS.length; i++) {
      const servicio = SERVICIOS[i];
      const calendario = calendarioIds.byCalendar[servicio.name];

      console.log(`[${i + 1}/8] 📋 ${servicio.name}`);
      console.log(`   Duración: ${servicio.serviceDuration} min`);
      console.log(`   Personal: ${servicio.staff.join(', ')}`);

      try {
        // Obtener los IDs de staff para este servicio
        const staffIds = servicio.staff.map(nombre => ({
          id: medicosIds[nombre]
        }));

        const payload = {
          locationId: LOCATION_ID,
          name: servicio.name,
          slug: servicio.slug,
          description: servicio.description,
          eventColor: servicio.eventColor,
          staff: staffIds,
          serviceDuration: servicio.serviceDuration,
          serviceDurationUnit: 'mins',
          preBuffer: 10,
          preBufferUnit: 'mins',
          postBuffer: 15,
          postBufferUnit: 'mins',
          isPrivate: false
        };

        const response = await axios.post(
          `${API_URL}/calendars/services/catalog`,
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

        const servicioId = response.data?.service?.id || response.data?.id;
        console.log(`   ✅ Servicio creado (ID: ${servicioId})\n`);

        results.success.push(servicio.name);
        results.byServicio[servicio.name] = {
          status: 'success',
          service_id: servicioId,
          slug: servicio.slug,
          calendar_id: calendario?.id,
          staff: staffIds.map(s => s.id)
        };

      } catch (error) {
        const errorMsg = error.response?.data?.message || error.message;
        console.log(`   ❌ Error: ${errorMsg}\n`);
        results.failed.push(servicio.name);
        results.byServicio[servicio.name] = {
          status: 'failed',
          error: errorMsg,
          calendar_id: calendario?.id
        };
      }

      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    console.log('═══════════════════════════════════════════════════════\n');
    console.log(`✅ Exitosos: ${results.success.length}/8`);
    console.log(`❌ Fallidos: ${results.failed.length}/8\n`);

    if (results.success.length > 0) {
      console.log('📋 SERVICIOS CREADOS:\n');
      Object.entries(results.byServicio)
        .filter(([_, s]) => s.status === 'success')
        .forEach(([nombre, s]) => {
          console.log(`  ✅ ${nombre}`);
          console.log(`     Service ID: ${s.service_id}`);
          console.log(`     Calendar ID: ${s.calendar_id}`);
          console.log(`     Staff: ${s.staff.join(', ')}\n`);
        });
    }

    if (results.failed.length > 0) {
      console.log('\n❌ Servicios que fallaron:\n');
      Object.entries(results.byServicio)
        .filter(([_, s]) => s.status === 'failed')
        .forEach(([nombre, s]) => {
          console.log(`  ❌ ${nombre}: ${s.error}\n`);
        });
    }

    results.endTime = new Date();
    results.duration = (results.endTime - results.startTime) / 1000;

    // Guardar resultados
    fs.mkdirSync(path.resolve('./results'), { recursive: true });
    fs.writeFileSync(
      path.resolve('./results/fase4c-servicios-creados.json'),
      JSON.stringify(results, null, 2)
    );

    console.log(`⏱️  Duración: ${results.duration.toFixed(2)}s\n`);
    console.log(`📊 Resultados: results/fase4c-servicios-creados.json\n`);

    if (results.success.length === 8) {
      console.log('🎉 ¡ESTRUCTURA COMPLETA!\n');
      console.log('✅ 3 Staff Users creados');
      console.log('✅ 8 Calendarios creados');
      console.log('✅ 8 Servicios creados y vinculados\n');
      console.log('📁 Todo guardado en scripts para replicar.\n');
    }

    return results;

  } catch (error) {
    console.error('❌ Error fatal:', error.message);
    process.exit(1);
  }
}

crearServicios().then(() => {
  console.log('✅ Servicios completados\n');
  process.exit(0);
});
