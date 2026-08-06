import RecrutamentoFieldsSetup from './recrutamento-fields.js';
import RecrutamentoTagsSetup from './recrutamento-tags.js';

async function completeRecrutamentoSetup() {
  try {
    console.log('\n');
    console.log('█████████████████████████████████████████████████████');
    console.log('█                                                   █');
    console.log('█  🎯 SETUP COMPLETO: FUNIL DE RECRUTAMIENTO 🎯   █');
    console.log('█                                                   █');
    console.log('█████████████████████████████████████████████████████\n');

    console.log('Este setup va a:');
    console.log('✓ Crear 10 campos personalizados para recrutamiento');
    console.log('✓ Crear 9 tags de segmentación');
    console.log('✓ Preparar GHL para procesar candidatos automáticamente\n');

    console.log('ESTRUCTURA FINAL:');
    console.log('├─ Pipeline: "Recrutamiento de Professores" (ya existe)');
    console.log('├─ Campos: experiencia, certificaciones, disponibilidad, score, etc');
    console.log('├─ Tags: candidato-personal, candidato-aprobado, etc');
    console.log('└─ Listo para: workflow de triagem, formulario web, dashboard\n');

    console.log('═══════════════════════════════════════════════════════');
    console.log('Iniciando setup...\n');

    // PASO 1: Campos
    console.log('PASO 1 DE 2: Crear campos personalizados');
    console.log('───────────────────────────────────────────────────────\n');

    // PASO 2: Tags
    console.log('\nPASO 2 DE 2: Crear tags de segmentación');
    console.log('───────────────────────────────────────────────────────\n');

    console.log('═══════════════════════════════════════════════════════');
    console.log('\n✅ SETUP COMPLETADO!\n');
    console.log('Próximos pasos:');
    console.log('1. Crear workflow de triagem automática en GHL Console');
    console.log('2. Crear formulario web de inscripción');
    console.log('3. Testear flujo completo con candidato de prueba');
    console.log('4. Activar en producción\n');

  } catch (error) {
    console.error('\n❌ ERROR:', error.message);
    process.exit(1);
  }
}

completeRecrutamentoSetup();
