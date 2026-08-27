# Setup Inicial - Hub Triadeflow

Guia passo-a-passo para começar o desenvolvimento de integração com GHL.

## 1️⃣ Pré-requisitos

Antes de rodar qualquer coisa, você precisa coletar as credenciais no GHL:

### No Console do GHL (Go High Level):

1. Acessar a subconta "Personal Geronto" (já foi criada em 12/07/2026)
2. Ir para **Integrations → API & Webhooks**
3. Gerar um **PIT (Personal Integration Token)** com os scopes:
   - `contacts` (criar/editar/listar contatos)
   - `opportunities` (gerenciar pipelines e deals)
   - `calendars` (criar agendas e eventos)
   - `custom_fields` (criar campos personalizados)
   - `workflows` (criar e gerenciar automações)
   - `conversations` (WhatsApp/SMS/Email)

4. Copiar o **location_id** da subconta (encontrado em Settings → General)

## 2️⃣ Configurar Variáveis de Ambiente

```bash
# Duplicar o arquivo de exemplo
cp .env.example .env

# Editar .env e preencher com os dados coletados
# Nunca commitar .env! Está no .gitignore
```

**Arquivo .env final:**
```
GHL_LOCATION_ID=<cole aqui o location_id da subconta>
GHL_PIT_TOKEN=<cole aqui o Personal Integration Token>
GHL_API_URL=https://rest.gohighlevel.com/v1

GHL_AGENCY_ID=FH5mDYjA1Mi4JwnMeLrA
BUSINESS_NAME=Personal Geronto - Camila Brasileiro

WHATSAPP_PHONE=85 99872-4735
INSTAGRAM_HANDLE=@personalgeronto
INSTAGRAM_HANDLE_CAMILA=@camilabrasileiropersonal

NODE_ENV=development
LOG_LEVEL=info

DRY_RUN=true
MAX_CONTACTS_PER_BATCH=10
ALLOW_MASS_DISPATCH=false
```

## 3️⃣ Instalar Dependências

```bash
npm install
```

## 4️⃣ Testar Conexão

```bash
npm run dev
```

Se tudo está correto, você verá:
```
✅ Cliente GHL inicializado com sucesso!
✅ Conectado à localização: Personal Geronto
```

## 5️⃣ Executar Setup em Fases

### Fase 1: Pipelines (Funis)
```bash
npm run setup:pipelines
```

Cria os 6 pipelines:
1. Funil Comercial
2. Carteira de Alunos
3. Recorrência Trimestral
4. Nutrição de Não-Fechados
5. Recrutamento de Professores
6. B2B - Academia dos Aposentados

### Fase 2: Campos Personalizados
```bash
npm run setup:fields
```

Cria campos como:
- origem_lead
- regiao_atendimento
- condicao_saude
- personal_responsavel
- etc.

### Fase 3: Tags de Segmentação
```bash
npm run setup:tags
```

Cria tags para:
- Origem (Instagram, Indicação, etc)
- Status do aluno (Ativo, Pausado, Cancelado)
- Eventos (Aniversário, Reavaliação pendente)
- etc.

### Fase 4: Workflows e Automações
```bash
npm run setup:workflows
```

Define workflows "seguros" (individuais):
- Lead IG → WhatsApp
- Confirmação de avaliação (24h e 2h antes)
- Aniversário do aluno
- Follow-up inativo
- Onboarding pós-contrato
- Lembretes de reavaliação

## 🚨 Regra NO MASS DISPATCH

**CRÍTICO:** Base antiga de contatos pode não ter opt-in claro (LGPD).

Qualquer disparo em massa exige os 4 guardrails:
1. ✅ Limite máximo hardcoded com alerta
2. ✅ Dry-run sempre disponível (preview de quem receberia)
3. ✅ Feature flag desligada por padrão
4. ✅ Allowlist na fase de validação

Fluxo seguro:
1. Importar base antiga
2. Segmentar e validar
3. Testar com Camila e poucos contatos
4. Depois, considerar reativação com consentimento

## 📋 Checklist de Execução

- [ ] Coletar location_id e PIT do GHL
- [ ] Preencher .env com credenciais
- [ ] Rodar `npm install`
- [ ] Testar conexão com `npm run dev`
- [ ] Executar `npm run setup:pipelines`
- [ ] Executar `npm run setup:fields`
- [ ] Executar `npm run setup:tags`
- [ ] Executar `npm run setup:workflows`
- [ ] Validar em GHL que tudo foi criado
- [ ] Testar workflows com contato de teste
- [ ] Preparar para integração com Instagram/WhatsApp

## 📚 Referência

- GHL API Docs: https://docs.gohighlevel.com/
- Config dos Pipelines: `./config/pipelines.json`
- Config de Campos: `./config/custom-fields.json`
- Config de Tags: `./config/tags.json`
- Client GHL: `./src/lib/ghl-client.js`

## ❓ Troubleshooting

**"GHL_LOCATION_ID e GHL_PIT_TOKEN são obrigatórios"**
- Verifique se .env foi criado e tem as variáveis preenchidas
- Confirme que o .env está na raiz de hub-triadeflow/

**"Erro ao conectar na API"**
- Verifique se o PIT tem os scopes corretos
- Confirme que o location_id é da subconta correta
- Verifique se há internet e acesso a rest.gohighlevel.com

**"Pipeline já existe"**
- GHL pode ter criado pipelines anteriormente
- Use o console GHL para revisar ou deletar e tentar novamente

## Próximos Passos

Após completar o setup inicial:
1. Integração com Instagram (conectar conta @personalgeronto)
2. Integração com WhatsApp (85 99872-4735)
3. Conexão com Google Agenda (cada personal trainer)
4. Automação de contratos (Asaas + ZapSign)
5. Integrações de cobrança e split de professores
