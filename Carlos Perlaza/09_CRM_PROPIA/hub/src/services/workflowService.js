import GHLClient from '../lib/ghl-client.js';

class WorkflowService {
  constructor(ghlClient = null) {
    this.ghl = ghlClient || new GHLClient();
  }

  // Workflows "seguros" (disparados por evento individual, nunca em massa)
  getSafeWorkflows() {
    return [
      {
        name: 'Lead IG para WhatsApp',
        description: 'Novo lead do Instagram é redirecionado para WhatsApp',
        trigger: 'novo_lead_instagram',
        type: 'safe',
        actions: [
          {
            type: 'enviar_mensagem',
            canal: 'whatsapp',
            template: 'boas_vindas',
          },
        ],
      },
      {
        name: 'Confirmação de Avaliação',
        description: 'Confirma agendamento de avaliação 24h e 2h antes',
        trigger: 'avaliacao_agendada',
        type: 'safe',
        actions: [
          { type: 'delay', minutos: 1440 }, // 24h
          {
            type: 'enviar_mensagem',
            canal: 'whatsapp',
            template: 'confirmacao_24h',
          },
          { type: 'delay', minutos: 120 }, // 2h
          {
            type: 'enviar_mensagem',
            canal: 'whatsapp',
            template: 'lembrete_2h',
          },
        ],
      },
      {
        name: 'Aniversário do Aluno',
        description: 'Parabéns automático no dia de nascimento',
        trigger: 'data_aniversario',
        type: 'safe',
        actions: [
          {
            type: 'enviar_mensagem',
            canal: 'whatsapp',
            template: 'parabens',
          },
        ],
        guardrails: ['individual_only'],
      },
      {
        name: 'Follow-up Aluno Inativo',
        description: 'Contato automático quando aluno fica inativo',
        trigger: 'aluno_inativo_30dias',
        type: 'safe',
        actions: [
          {
            type: 'enviar_mensagem',
            canal: 'whatsapp',
            template: 'falta_na_aula',
          },
          { type: 'adicionar_tag', tag: 'inativo-30dias' },
        ],
        guardrails: ['individual_only'],
      },
      {
        name: 'Onboarding Pós-Contrato',
        description: 'Sequência de boas-vindas após assinar contrato',
        trigger: 'contrato_assinado',
        type: 'safe',
        actions: [
          {
            type: 'enviar_mensagem',
            canal: 'whatsapp',
            template: 'boas_vindas_aluno',
          },
          { type: 'criar_calendario', tipo: 'primeira_aula' },
          { type: 'adicionar_tag', tag: 'aluno-ativo' },
        ],
        guardrails: ['individual_only'],
      },
      {
        name: 'Lembrete de Reavaliação',
        description: 'Notifica aluno quando vence prazo de 3 meses',
        trigger: 'reavaliacao_trimestral_vencida',
        type: 'safe',
        actions: [
          {
            type: 'enviar_mensagem',
            canal: 'whatsapp',
            template: 'hora_reavaliacao',
          },
          { type: 'adicionar_tag', tag: 'reavaliacao-pendente' },
        ],
        guardrails: ['individual_only'],
      },
    ];
  }

  // Workflows de RISCO (exigem 4 guardrails)
  getRiskWorkflows() {
    return [
      {
        name: 'Reativação Base Antiga',
        description: 'Importar contatos e ativar da base histórica',
        trigger: 'manual_reativacao_base',
        type: 'risk',
        actions: [
          {
            type: 'importar_contatos',
            fonte: 'base_antiga',
            adicionar_tag: 'origem-base-antiga',
          },
          {
            type: 'enviar_mensagem',
            canal: 'whatsapp',
            template: 'reativacao',
          },
        ],
        guardrails: [
          'max_contacts_hardcoded',
          'dry_run_disponivel',
          'feature_flag_desligada',
          'allowlist_validacao',
        ],
        status: 'BLOQUEADO POR PADRÃO',
        note: 'Exigir validação com Camila e poucos contatos antes de ativar em massa',
      },
      {
        name: 'Broadcast - Promoção',
        description: 'Disparo em massa para todos os alunos ativos',
        trigger: 'manual_broadcast',
        type: 'risk',
        actions: [
          { type: 'filtrar', condicao: 'aluno-ativo' },
          {
            type: 'enviar_mensagem',
            canal: 'whatsapp',
            template: 'broadcast_template',
          },
        ],
        guardrails: [
          'max_contacts_hardcoded',
          'dry_run_disponivel',
          'feature_flag_desligada',
          'allowlist_validacao',
        ],
        status: 'BLOQUEADO POR PADRÃO',
        note: 'Primeira fase: importar, segmentar e validar',
      },
    ];
  }

  async setupSafeWorkflows() {
    console.log('🔧 Iniciando setup de workflows seguros...\n');

    const results = {
      success: [],
      failed: [],
      startTime: new Date(),
    };

    const safeWorkflows = this.getSafeWorkflows();

    for (const workflow of safeWorkflows) {
      try {
        console.log(`📬 ${workflow.name}`);
        console.log(`   ${workflow.description}\n`);

        // TODO: Implementar criação via API GHL
        // await this.ghl.createWorkflow(workflow);

        results.success.push(workflow.name);
      } catch (error) {
        results.failed.push({
          name: workflow.name,
          error: error.message,
        });
        console.error(`❌ ${workflow.name}: ${error.message}\n`);
      }
    }

    results.endTime = new Date();
    results.duration = results.endTime - results.startTime;

    return results;
  }

  getWorkflowSummary() {
    const safe = this.getSafeWorkflows();
    const risk = this.getRiskWorkflows();

    return {
      safe: {
        count: safe.length,
        workflows: safe.map(w => ({
          name: w.name,
          trigger: w.trigger,
          actions: w.actions.length,
        })),
      },
      risk: {
        count: risk.length,
        status: 'BLOQUEADO POR PADRÃO',
        workflows: risk.map(w => ({
          name: w.name,
          trigger: w.trigger,
          guardrails: w.guardrails,
        })),
      },
    };
  }
}

export default WorkflowService;
