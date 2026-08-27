import SetupOrchestrator from '../services/setupOrchestrator.js';

async function run() {
  try {
    const orchestrator = new SetupOrchestrator();
    await orchestrator.setupComplete();
  } catch (error) {
    console.error('❌ Erro:', error.message);
    process.exit(1);
  }
}

run();
