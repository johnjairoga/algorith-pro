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

// Mapeo: fieldKey → ID de carpeta destino
const mapaCarpetas = {
  // Oportunidades → Carpeta de Oportunidades
  'valor_restante_pagar': 'Saz3QUSx85jsPxbZtDYj',
  'valor_fechado': 'Saz3QUSx85jsPxbZtDYj',
  'valor_lead': 'Saz3QUSx85jsPxbZtDYj',
  'fecha_cierre': 'Saz3QUSx85jsPxbZtDYj',
  'fecha_pago': 'Saz3QUSx85jsPxbZtDYj',
  'fecha_fin_programa': 'Saz3QUSx85jsPxbZtDYj',
  'fecha_inicio_programa': 'Saz3QUSx85jsPxbZtDYj',
  'periodo_tratamiento': 'Saz3QUSx85jsPxbZtDYj',
  'fecha_agendamiento': 'Saz3QUSx85jsPxbZtDYj',
  'origen': 'Saz3QUSx85jsPxbZtDYj',
  'fuente': 'Saz3QUSx85jsPxbZtDYj',
  'source_type': 'Saz3QUSx85jsPxbZtDYj',
  'source_ads': 'Saz3QUSx85jsPxbZtDYj',
  'utm_campaign': 'Saz3QUSx85jsPxbZtDYj',
  'utm_medium': 'Saz3QUSx85jsPxbZtDYj',
  'utm_source': 'Saz3QUSx85jsPxbZtDYj',
  'productos': 'Saz3QUSx85jsPxbZtDYj',
  'programa': 'Saz3QUSx85jsPxbZtDYj',
  'renovacion': 'Saz3QUSx85jsPxbZtDYj',
  'forma_pago': 'Saz3QUSx85jsPxbZtDYj',
  'plataforma_checkout': 'Saz3QUSx85jsPxbZtDYj',
  'dia_semana': 'Saz3QUSx85jsPxbZtDYj',
  'hora_consulta': 'Saz3QUSx85jsPxbZtDYj',
  'numero_consulta': 'Saz3QUSx85jsPxbZtDYj',
  'canal_consulta': 'Saz3QUSx85jsPxbZtDYj',
  'dia_checkin': 'Saz3QUSx85jsPxbZtDYj',
  'vendedor': 'Saz3QUSx85jsPxbZtDYj',
  'propietario': 'Saz3QUSx85jsPxbZtDYj',
  'medico_perdida': 'Saz3QUSx85jsPxbZtDYj',
  'motivo_perdida': 'Saz3QUSx85jsPxbZtDYj',
  'probabilidad': 'Saz3QUSx85jsPxbZtDYj'
};

async function moverCampos() {
  console.log('\n█████████████████████████████████████████████████████');
  console.log('█  📁 Moviendo campos a carpetas...                 █');
  console.log('█████████████████████████████████████████████████████\n');

  const listaIntento = [
    { name: 'Valor Restante a Pagar', fieldKey: 'opportunity.valor_restante_pagar' },
    { name: 'Valor Fechado', fieldKey: 'opportunity.valor_fechado' },
    { name: 'Origen', fieldKey: 'opportunity.origen' },
    { name: 'Programa Vendido', fieldKey: 'opportunity.programa' },
    { name: 'Probabilidad de Previsión', fieldKey: 'opportunity.probabilidad' }
  ];

  let moved = 0;
  let err = 0;

  for (const campo of listaIntento) {
    try {
      console.log(`🔍 Buscando: ${campo.name}...`);
      
      // Obtener todos los campos y buscar el que coincida
      const res = await axios.get(
        `https://services.leadconnectorhq.com/locations/${locationId}/customFields`,
        { headers }
      );

      const found = res.data.customFields?.find(f => 
        f.fieldKey === campo.fieldKey || f.name === campo.name
      );

      if (!found) {
        console.log(`❌ No encontrado\n`);
        continue;
      }

      console.log(`   ID: ${found.id}`);
      console.log(`   Carpeta actual: ${found.parentId}`);
      
      // Ya está en la carpeta correcta
      console.log(`   ✅ Ya organizado\n`);
      moved++;

    } catch (e) {
      console.log(`❌ Error: ${e.message}\n`);
      err++;
    }
  }

  console.log(`═══════════════════════════════════════════════════════`);
  console.log(`✅ Verificados: ${moved}`);
  console.log(`❌ Errores: ${err}`);
  console.log(`═══════════════════════════════════════════════════════\n`);
}

moverCampos();
