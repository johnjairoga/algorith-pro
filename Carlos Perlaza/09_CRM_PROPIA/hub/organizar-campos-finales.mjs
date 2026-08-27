#!/usr/bin/env node
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const locationId = process.env.GHL_LOCATION_ID;
const pitToken = process.env.GHL_PIT_TOKEN;

const headers = {
  'Authorization': `Bearer ${pitToken}`,
  'Content-Type': 'application/json',
  'Version': '2021-07-28'
};

// Mapeo de nombres de campos a carpetas
const mapeoSegúnNombresCampo = {
  // Financiero (3 campos)
  'Valor Restante a Pagar': 'DPFmK2NYkyTmvs9LsjGU',
  'Valor Fechado': 'DPFmK2NYkyTmvs9LsjGU',
  'Valor do Lead': 'DPFmK2NYkyTmvs9LsjGU',

  // Fechas y Programación (6 campos)
  'Fecha Esperada de Cierre': 'JlUDP5r4S4QJwlIm49Ix',
  'Fecha de Pago': 'JlUDP5r4S4QJwlIm49Ix',
  'Fecha Fin del Programa': 'JlUDP5r4S4QJwlIm49Ix',
  'Fecha Inicio del Programa': 'JlUDP5r4S4QJwlIm49Ix',
  'Período Esperado de Tratamiento': 'JlUDP5r4S4QJwlIm49Ix',
  'Fecha de Agendamiento': 'JlUDP5r4S4QJwlIm49Ix',

  // Origen y Tracking (7 campos)
  'Origen': 'DBIMfVDlnJaZT5nwSDVS',
  'Fuente de la Oportunidad': 'DBIMfVDlnJaZT5nwSDVS',
  'Source Type': 'DBIMfVDlnJaZT5nwSDVS',
  'Source Ads': 'DBIMfVDlnJaZT5nwSDVS',
  'UTM Campaign': 'DBIMfVDlnJaZT5nwSDVS',
  'UTM Medium': 'DBIMfVDlnJaZT5nwSDVS',
  'UTM Source': 'DBIMfVDlnJaZT5nwSDVS',

  // Productos y Servicios (3 campos)
  'Productos Adquiridos': 'IIBRrf39LZen2caHxkmb',
  'Programa Vendido': 'IIBRrf39LZen2caHxkmb',
  'Renovación': 'IIBRrf39LZen2caHxkmb',

  // Métodos de Pago (2 campos)
  'Forma de Pago': 'bwh3rvfVhlEjAeSPu6jj',
  'Plataforma Checkout': 'bwh3rvfVhlEjAeSPu6jj',

  // Consulta y Atendimiento (5 campos)
  'Día de la Semana de la Consulta': '5wolpAVZgBatChO2lup9',
  'Hora de la Consulta': '5wolpAVZgBatChO2lup9',
  'Número de la Consulta': '5wolpAVZgBatChO2lup9',
  'Canal de la Consulta': '5wolpAVZgBatChO2lup9',
  'Día para Envío del Checkin': '5wolpAVZgBatChO2lup9',

  // Equipo y Responsables (3 campos)
  'Vendedor Responsable': 'xBVGEEbpT5nKLERUIBv3',
  'Propietario': 'xBVGEEbpT5nKLERUIBv3',
  'Médico de la Pérdida': 'xBVGEEbpT5nKLERUIBv3',

  // Pérdida y Análisis (2 campos)
  'Motivo de la Pérdida': 'gCdYlwQdRxOwChHHrbYS',
  'Probabilidad de Previsión': 'gCdYlwQdRxOwChHHrbYS'
};

async function organizarCampos() {
  console.log('\n█████████████████████████████████████████████████████');
  console.log('█  📁 Organizando TODOS los 39+ campos             █');
  console.log('█████████████████████████████████████████████████████\n');

  try {
    // Obtener campos de opportunity
    const resOpp = await axios.get(
      `https://services.leadconnectorhq.com/locations/${locationId}/customFields/search`,
      {
        headers,
        params: { model: 'opportunity', skip: 0, limit: 100 }
      }
    );

    // Obtener campos de contact
    const resCon = await axios.get(
      `https://services.leadconnectorhq.com/locations/${locationId}/customFields/search`,
      {
        headers,
        params: { model: 'contact', skip: 0, limit: 100 }
      }
    );

    const todosLosCampos = [
      ...(resOpp.data.customFields || []),
      ...(resCon.data.customFields || [])
    ];

    console.log(`📊 Total de campos encontrados: ${todosLosCampos.length}\n`);

    let movidos = 0;
    let yaOK = 0;
    let sinMapeo = 0;
    let errores = 0;

    for (const campo of todosLosCampos) {
      const carpetaDestino = mapeoSegúnNombresCampo[campo.name];

      if (!carpetaDestino) {
        console.log(`⚠️  ${campo.name} - Sin mapeo a carpeta`);
        sinMapeo++;
        continue;
      }

      if (campo.parentId === carpetaDestino) {
        console.log(`✅ ${campo.name}`);
        yaOK++;
        continue;
      }

      try {
        await axios.put(
          `https://services.leadconnectorhq.com/locations/${locationId}/customFields/${campo.id}`,
          { parentId: carpetaDestino },
          { headers, timeout: 10000 }
        );
        console.log(`🔄 ${campo.name} - ✅ Movido`);
        movidos++;
      } catch (e) {
        console.log(`❌ ${campo.name} - Error: ${e.response?.data?.message || e.message}`);
        errores++;
      }
    }

    console.log(`\n═══════════════════════════════════════════════════════`);
    console.log(`✅ Ya organizados: ${yaOK}`);
    console.log(`🔄 Movidos: ${movidos}`);
    console.log(`⚠️  Sin mapeo: ${sinMapeo}`);
    console.log(`❌ Errores: ${errores}`);
    console.log(`═══════════════════════════════════════════════════════\n`);

  } catch (e) {
    console.error('Error:', e.response?.data?.message || e.message);
  }
}

organizarCampos();
