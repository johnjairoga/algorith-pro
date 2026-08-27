import SetupOrchestrator from './services/setupOrchestrator.js';

async function main() {
  try {
    console.log('🚀 Iniciando Personal Geronto Hub Setup...\n');

    const orchestrator = new SetupOrchestrator();

    // Verificar conexão
    await orchestrator.verifyConnection();

    // Mostrar status
    const status = orchestrator.getStatus();
    console.log('📊 Status do projeto:\n');
    console.log(`Pipelines: ${status.phase1.pipelines}`);
    console.log(`Campos: ${status.phase1.fields}`);
    console.log(`Tags: ${status.phase2.tags}`);
    console.log(`Workflows seguros: ${status.phase2.safeWorkflows}`);
    console.log(`Workflows de risco (bloqueados): ${status.phase2.riskWorkflows}\n`);

    console.log('✨ Opções disponíveis:\n');
    console.log('   Fase 1: npm run setup:phase1');
    console.log('   Fase 1 (cont.): npm run setup:phase1-2');
    console.log('   Completo: npm run setup:all\n');

  } catch (error) {
    console.error('❌ Erro na inicialização:', error.message);
    process.exit(1);
  }
}

main();
