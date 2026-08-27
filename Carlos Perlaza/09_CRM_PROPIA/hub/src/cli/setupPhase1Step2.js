import SetupOrchestrator from '../services/setupOrchestrator.js';

async function run() {
  try {
    const orchestrator = new SetupOrchestrator();
    await orchestrator.verifyConnection();
    await orchestrator.setupPhase1Step2();
  } catch (error) {
    console.error('❌ Erro:', error.message);
    process.exit(1);
  }
}

run();
