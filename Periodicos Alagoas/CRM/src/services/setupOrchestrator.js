import GHLClient from '../lib/ghl-client.js';
import PipelineService from './pipelineService.js';
import FieldService from './fieldService.js';
import TagService from './tagService.js';
import WorkflowService from './workflowService.js';

class SetupOrchestrator {
  constructor(ghlClient = null) {
    this.ghl = ghlClient || new GHLClient();

    // Inicializar servicios
    this.pipelines = new PipelineService(this.ghl);
    this.fields = new FieldService(this.ghl);
    this.tags = new TagService(this.ghl);
    this.workflows = new WorkflowService(this.ghl);
  }

  async verifyConnection() {
    console.log('📍 Verificando conexão com GHL...\n');
    const locationInfo = await this.ghl.getLocationInfo();
    console.log(`✅ Conectado a: ${locationInfo.name}\n`);
    return locationInfo;
  }

  async setupPhase1() {
    console.log('═══════════════════════════════════════════════════════\n');
    console.log('🚀 FASE 1: Setup de Pipelines e Campos\n');
    console.log('═══════════════════════════════════════════════════════\n');

    const results = {
      pipelines: null,
      fields: null,
      startTime: new Date(),
    };

    // Setup de pipelines
    console.log('--- PIPELINES ---\n');
    results.pipelines = await this.pipelines.setupAll();

    console.log('\n--- CAMPOS PERSONALIZADOS ---\n');
    results.fields = await this.fields.setupAll();

    results.endTime = new Date();
    results.duration = results.endTime - results.startTime;

    this.printPhase1Summary(results);
    return results;
  }

  async setupPhase1Step2() {
    console.log('═══════════════════════════════════════════════════════\n');
    console.log('🚀 FASE 1 (Continuação): Tags e Workflows\n');
    console.log('═══════════════════════════════════════════════════════\n');

    const results = {
      tags: null,
      workflows: null,
      startTime: new Date(),
    };

    // Setup de tags
    console.log('--- TAGS ---\n');
    results.tags = await this.tags.setupAll();

    console.log('\n--- WORKFLOWS ---\n');
    results.workflows = await this.workflows.setupSafeWorkflows();

    results.endTime = new Date();
    results.duration = results.endTime - results.startTime;

    this.printPhase1Step2Summary(results);
    return results;
  }

  async setupComplete() {
    console.log('\n✨ SETUP COMPLETO EM 4 ETAPAS:\n');

    const allResults = {
      connection: null,
      phase1: null,
      phase1_2: null,
      startTime: new Date(),
    };

    try {
      allResults.connection = await this.verifyConnection();

      allResults.phase1 = await this.setupPhase1();

      console.log('\nPressione ENTER para continuar com Tags e Workflows...');
      // Em CLI interativo, aguardar; em API, continuar
      allResults.phase1_2 = await this.setupPhase1Step2();

      allResults.endTime = new Date();
      allResults.duration = allResults.endTime - allResults.startTime;

      this.printFinalSummary(allResults);
    } catch (error) {
      console.error('❌ Erro durante setup:', error.message);
      throw error;
    }

    return allResults;
  }

  getStatus() {
    return {
      connection: '✅ Testável via verifyConnection()',
      phase1: {
        pipelines: this.pipelines.getPipelineConfig().length,
        fields: Object.keys(this.fields.getFieldConfig()).length,
      },
      phase2: {
        tags: this.tags.getAllTags().length,
        safeWorkflows: this.workflows.getSafeWorkflows().length,
        riskWorkflows: this.workflows.getRiskWorkflows().length,
      },
    };
  }

  // Utilities para resumos
  printPhase1Summary(results) {
    console.log('\n═══════════════════════════════════════════════════════\n');
    console.log('📊 RESUMO FASE 1\n');

    console.log(`Pipelines: ${results.pipelines.success.length} sucesso, ${results.pipelines.failed.length} erro`);
    console.log(`Campos: ${results.fields.success.length} sucesso, ${results.fields.failed.length} erro`);

    if (results.pipelines.failed.length > 0) {
      console.log('\n❌ Pipelines com erro:');
      results.pipelines.failed.forEach(p => {
        console.log(`   - ${p.name}: ${p.error}`);
      });
    }

    if (results.fields.failed.length > 0) {
      console.log('\n❌ Campos com erro:');
      results.fields.failed.forEach(f => {
        console.log(`   - ${f.name}: ${f.error}`);
      });
    }

    console.log(
      `\n⏱️  Tempo total: ${(results.duration / 1000).toFixed(2)}s\n`
    );
  }

  printPhase1Step2Summary(results) {
    console.log('\n═══════════════════════════════════════════════════════\n');
    console.log('📊 RESUMO FASE 1 (Continuação)\n');

    console.log(`Tags: ${results.tags.success.length} sucesso, ${results.tags.failed.length} erro`);

    if (results.tags.failed.length > 0) {
      console.log('\n❌ Tags com erro:');
      results.tags.failed.forEach(t => {
        console.log(`   - ${t.name}: ${t.error}`);
      });
    }

    console.log(`\nWorkflows revisados: ${this.workflows.getSafeWorkflows().length} seguros`);
    console.log(`Workflows de risco: ${this.workflows.getRiskWorkflows().length} (bloqueados por padrão)\n`);
  }

  printFinalSummary(allResults) {
    console.log('═══════════════════════════════════════════════════════\n');
    console.log('✨ SETUP COMPLETO!\n');
    console.log('✅ Pipelines criados');
    console.log('✅ Campos personalizados criados');
    console.log('✅ Tags de segmentação criadas');
    console.log('✅ Workflows seguros configurados');
    console.log('\n📌 Próximos passos:');
    console.log('   - Integração Instagram → WhatsApp');
    console.log('   - Conectar Google Agenda de cada trainer');
    console.log('   - Automação de contratos (Asaas + ZapSign)');
    console.log('   - Testes com contatos de teste\n');
    console.log(
      `⏱️  Tempo total: ${(allResults.duration / 1000).toFixed(2)}s\n`
    );
  }
}

export default SetupOrchestrator;
