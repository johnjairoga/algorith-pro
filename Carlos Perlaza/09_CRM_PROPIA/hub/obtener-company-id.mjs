import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const PIT = process.env.GHL_PIT_TOKEN;
const LOCATION_ID = process.env.GHL_LOCATION_ID;
const API_URL = process.env.GHL_API_URL || 'https://services.leadconnectorhq.com';

async function obtenerCompanyId() {
  try {
    console.log('\n📍 OBTENIENDO COMPANY ID...\n');
    console.log(`Location ID: ${LOCATION_ID}\n`);

    // Intento 1: Obtener información de la location
    try {
      console.log('Intento 1: GET /locations/{locationId}\n');
      const response = await axios.get(
        `${API_URL}/locations/${LOCATION_ID}`,
        {
          headers: {
            'Authorization': `Bearer ${PIT}`,
            'Accept': 'application/json',
            'Version': 'v3'
          }
        }
      );

      const companyId = response.data?.location?.companyId || response.data?.companyId;
      if (companyId) {
        console.log(`✅ Company ID encontrado: ${companyId}\n`);
        return companyId;
      }
    } catch (error1) {
      console.log(`ℹ️  Endpoint 1 no funcionó, intento 2...\n`);
    }

    // Intento 2: Obtener información de la empresa directamente
    try {
      console.log('Intento 2: GET /companies/{locationId}\n');
      const response = await axios.get(
        `${API_URL}/companies/${LOCATION_ID}`,
        {
          headers: {
            'Authorization': `Bearer ${PIT}`,
            'Accept': 'application/json'
          }
        }
      );

      const companyId = response.data?.company?.id || response.data?.id || LOCATION_ID;
      console.log(`✅ Company ID: ${companyId}\n`);
      return companyId;
    } catch (error2) {
      console.log(`ℹ️  Endpoint 2 no funcionó\n`);
    }

    // Fallback: Usar location ID como company ID
    console.log(`⚠️  Usando Location ID como Company ID: ${LOCATION_ID}\n`);
    return LOCATION_ID;

  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

obtenerCompanyId().then((companyId) => {
  console.log(`\n✅ Company ID a usar: ${companyId}\n`);
  process.exit(0);
});
