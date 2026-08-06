# PROMPT PARA GOHIGHLEVEL AI STUDIO — Landing Page + Formulário Inteligente
## Captação de Pesquisadores — Periódicos UFAL/FAPEAL

---

## 🎯 OBJETIVO GERAL

Criar uma **Landing Page única + Formulário de qualificação one-step** integrado no GoHighLevel que permita a pesquisadores/investigadores:
1. Identificar rapidamente se seu perfil corresponde a um periódico
2. Ser qualificados automaticamente em máximo 4 perguntas (uma por vez)
3. Ser redirecionados ao grupo WhatsApp e periódico correto (REPD / Revista Ciência Agrícola / Revista Crítica Histórica)

**Estilo:** Profissional, minimalista, dinâmico. Design limpo sem elementos desnecessários. Cores corporativas UFAL/acadêmicas. **Tom de voz:** Convidativo, claro, direto. **Para:** Pesquisadores, professores, doutorandos, mestrandos de qualquer área.

---

## 📐 ESTRUTURA DA LP

### Seção 1: Hero (Cabeçalho)
**Headline Principal:** 
"Publique sua Pesquisa em Revistas de Excelência da UFAL"

**Subheadline:**
"Descubra qual revista é perfeita para seu trabalho em menos de 2 minutos. Atendemos economia, agronomia, história e ciências sociais aplicadas."

**CTA Principal:** 
Botão grande (azul acadêmico) - "Começar a Qualificação"

**Visual:** 
Ícono ou ilustração minimalista (pesquisadores, livros, artigos acadêmicos)

---

## 📋 FORMULÁRIO DE QUALIFICAÇÃO — ONE-STEP FLOW

**Estrutura:** Uma pergunta por vez. Máximo 4 perguntas + dados básicos.
**Formato:** Radio buttons / Select dropdown (depende da pergunta)
**Experiência:** Após cada resposta, próxima pergunta aparece imediatamente (transição suave)

### DADOS BÁSICOS (Nome + Email + WhatsApp)
**Tipo de campo:** Três campos textuais
- Nome completo (obrigatório, min. 3 caracteres)
- Email (obrigatório, validação de formato)
- WhatsApp (obrigatório, com código de país +55)

**Placeholder/Exemplo:**
- "Digite seu nome completo"
- "seu.email@exemplo.com"
- "+55 (85) 99999-9999"

**Mensagem após preencher:** "Perfeito! Agora vamos às perguntas de qualificação"

---

### PERGUNTA 1 — Área de Investigação
**Pergunta exata:** "Qual é sua área principal de investigação?"

**Opções:**
- [ ] Economia, Desenvolvimento Econômico, Administração ou Políticas Públicas
- [ ] Engenharia Agrícola, Agronomia, Ciências do Solo ou Produção Animal/Vegetal
- [ ] História, Historiografia ou Estudos Históricos
- [ ] Outras Ciências Sociais Aplicadas
- [ ] Outra área (especificar)

**Tipo de campo:** Radio buttons (5 opções)
**Lógica:** Armazena em tag GHL: `area_[OPÇÃO_SELECIONADA]`

---

### PERGUNTA 2 — Nível Acadêmico
**Pergunta exata:** "Qual é seu nível acadêmico atual?"

**Opções:**
- [ ] Estudante de graduação
- [ ] Estudante de mestrado/especialização
- [ ] Estudante de doutorado
- [ ] Pesquisador/Professor com pós-doutorado
- [ ] Pesquisador/Professor estabelecido

**Tipo de campo:** Radio buttons (máx 5 opções)
**Lógica:** Armazena em tag GHL: `nivel_academico_[OPÇÃO]`

---

### PERGUNTA 3 — Artigo Pronto
**Pergunta exata:** "Você já tem um artigo/manuscrito pronto para submeter?"

**Opções:**
- [ ] Sim, tenho artigo pronto
- [ ] Não, mas estou escrevendo
- [ ] Ainda não, só explorando oportunidades

**Tipo de campo:** Radio buttons (3 opções)
**Lógica:** Armazena em tag GHL: `artigo_status_[OPÇÃO]`

---

## 🔄 LÓGICA DE ROTEAMENTO E QUALIFICAÇÃO

**Após completar as 4 perguntas, o sistema calcula automaticamente:**

```
SE (Área = "Economia, Desenvolvimento Econômico, Administração ou Políticas Públicas")
  → Periódico Recomendado: "REPD — Revista Economia Política do Desenvolvimento"
  → Tag GHL: [REPD]
  → Descrição: Publica em português, espanhol e inglês. Qualis Economia. Semestral (jan/jul)
  → Grupo WhatsApp: [Link do grupo REPD]

SE (Área = "Engenharia Agrícola, Agronomia, Ciências do Solo ou Produção")
  → Periódico Recomendado: "Revista Ciência Agrícola"
  → Tag GHL: [REVISTA_CIENCIA_AGRICOLA]
  → Descrição: Engenharia florestal, solos, proteção de plantas, produção vegetal/animal
  → Grupo WhatsApp: [Link do grupo Ciência Agrícola]

SE (Área = "História, Historiografia ou Estudos Históricos")
  → Periódico Recomendado: "Revista Crítica Histórica"
  → Tag GHL: [REVISTA_CRITICA_HISTORICA]
  → Descrição: Qualis A2. Foco em historiografia e pesquisas originais
  → Grupo WhatsApp: [Link do grupo Crítica Histórica]

SE (Nível Acadêmico < Mestrado E Artigo Status = "Ainda não")
  → Adicionar Tag GHL: [LEAD_EDUCACIONAL] (para nutrir depois)

SE (Artigo Status = "Sim, tenho artigo pronto")
  → Adicionar Tag GHL: [LEAD_QUENTE] (prioridade alta)
```

---

## 📱 TELA FINAL — RESULTADO DA QUALIFICAÇÃO

**Layout:** Mensagem personalizada com base na qualificação

**Mensagens exemplo:**

**Para REPD:**
```
✅ PERFEITO! SUA PESQUISA ENCAIXA AQUI

Com base em suas respostas, seu perfil se alinha perfeitamente com a
REPD — Revista Economia Política do Desenvolvimento

📋 Detalhes:
• Publica em português, espanhol e inglês
• Qualis Economia (CAPES)
• Fluxo contínuo | Edições em janeiro e julho

👉 PRÓXIMOS PASSOS:
1. Você receberá um WhatsApp em 24h com mais detalhes
2. Entre em nossa comunidade de pesquisadores
3. Envie seu artigo e acompanhe o processo de revisão

[BOTÃO] Entrar na Comunidade agora
[BOTÃO] Voltar ao início
```

**Para Revista Ciência Agrícola:**
```
✅ PERFEITO! SUA PESQUISA ENCAIXA AQUI

Com base em suas respostas, seu perfil se alinha perfeitamente com a
Revista Ciência Agrícola

📋 Detalhes:
• ISSN: 2447-3383 | Desde 1991
• Foco: Engenharia agrícola, agronomia, ciências do solo e produção
• Acesso livre e contínuo

👉 PRÓXIMOS PASSOS:
1. Você receberá um WhatsApp em 24h com mais detalhes
2. Entre em nossa comunidade de pesquisadores
3. Envie seu artigo e acompanhe o processo de revisão

[BOTÃO] Entrar na Comunidade agora
[BOTÃO] Voltar ao início
```

**Para Revista Crítica Histórica:**
```
✅ PERFEITO! SUA PESQUISA ENCAIXA AQUI

Com base em suas respostas, seu perfil se alinha perfeitamente com a
Revista Crítica Histórica

📋 Detalhes:
• ISSN: 2177-9961 | Qualis A2
• Foco: Historiografia, pesquisas originais e temas históricos
• Semestral | Publicação de artigos e dossiês temáticos

👉 PRÓXIMOS PASSOS:
1. Você receberá um WhatsApp em 24h com mais detalhes
2. Entre em nossa comunidade de pesquisadores
3. Envie seu artigo e acompanhe o processo de revisão

[BOTÃO] Entrar na Comunidade agora
[BOTÃO] Voltar ao início
```

**CTAs finais:**
- Botão primário (azul): "Entrar na Comunidade" → redireciona para grupo WhatsApp (link público) ou página de confirmação
- Botão secundário (transparente): "Voltar ao início" → recarrega a LP

---

## 📊 INTEGRAÇÃO GOHIGHLEVEL

### Dados Capturados e Armazenados no GHL:

| Campo | Tipo GHL | Uso |
|-------|----------|-----|
| Nome | Text | Contato lead |
| Email | Email | Comunicação principal |
| WhatsApp | Phone | Automação WhatsApp |
| Área Investigação | Tag | Segmentação de leads |
| Nível Acadêmico | Tag | Segmentação de leads |
| Artigo Status | Tag | Qualidade lead (quente/morno) |
| Periódico Atribuído | Tag | Roteamento automático |
| Data/Hora | Auto | Tracking |

### Automações GHL a Configurar:

**Automação 1 — Lead Quente (Artigo Pronto)**
- Trigger: Tag `[LEAD_QUENTE]`
- Ação: Enviar WhatsApp em 1 hora com mensagem personalizada
- Conteúdo: "Ótimo! Vi que você tem um artigo pronto. Vamos agendar uma ligação?"

**Automação 2 — Lead Morno (Explorando)**
- Trigger: Tag `[LEAD_EDUCACIONAL]`
- Ação: Enviar sequência de e-mails em 3 dias (série de 3 e-mails informativos)
- Conteúdo: Dicas de escrita, estrutura de artigos, cronograma de submissão

**Automação 3 — Entrada Grupo WhatsApp**
- Trigger: Form preenchido com sucesso
- Ação: Enviar link do grupo WhatsApp + mensagem de boas-vindas
- Delay: Imediato ou 24h (conforme decisão)

**Automação 4 — Notificação Interna**
- Trigger: Form preenchido
- Ação: Enviar notificação internamente (email/SMS) para equipe de acompanhamento
- Conteúdo: Nome, email, periódico, nível acadêmico

---

## 🎨 DESIGN E UX

### Cores (Palheta Acadêmica Neutra)
- **Fundo:** Branco (#FFFFFF) ou cinza muito claro (#F8F9FA)
- **Primário (CTAs):** Azul acadêmico (#1E3A8A ou azul UFAL)
- **Acentos:** Cinza escuro (#374151) para textos
- **Sucesso (Resultado):** Verde (#10B981)
- **Erro/Validação:** Vermelho (#EF4444)

*Substituir com identidade visual UFAL se fornecida*

### Tipografia
- **Títulos:** Sans-serif moderna (Inter, Poppins, Roboto Flex) — bold 32-48px
- **Subtítulos:** 18-20px, regular
- **Corpo:** 16px em mobile, 16-18px em desktop
- **CTAs:** Bold 16px, maiúsculas ou título case

### Responsividade
- **Desktop:** Hero + formulário lado a lado (opcional)
- **Tablet:** Stacked, full width
- **Mobile:** Formulário 100% width, perguntas com espaçamento generoso (80px altura mín. por pergunta)

### Animações
- Transição entre perguntas: fade-in suave (300ms)
- Focus em campos: mudança de cor + underline
- Confirmação após envio: checkmark animado + mensagem de sucesso
- Nenhuma animação pesada (evitar parallax ou efeitos complexos em mobile)

---

## ✅ VALIDAÇÕES E TRATAMENTO DE ERROS

| Campo | Validação | Mensagem de Erro |
|-------|-----------|------------------|
| Nome | Mín. 3 caracteres, máx. 100 | "Nome deve ter entre 3 e 100 caracteres" |
| Email | Formato válido (regex) | "Por favor, insira um e-mail válido" |
| WhatsApp | Apenas números, +55 obrigatório | "Insira seu WhatsApp no formato: +55 (XX) 9XXXX-XXXX" |
| Área/Nível/Artigo | Seleção obrigatória | "Por favor, selecione uma opção" |

**Exibição:** Mensagens em vermelho (#EF4444), logo abaixo do campo problemático. Fade-in rápido (200ms).

---

## 📝 FLUXO DE USUÁRIO COMPLETO

```
1️⃣ Usuário clica em anúncio (Meta/Instagram)
   ↓
2️⃣ Chega na LP — vê headline + subheadline + CTA "Começar"
   ↓
3️⃣ Clica "Começar" → scroll para formulário
   ↓
4️⃣ Preenche dados básicos (Nome, Email, WhatsApp)
   ↓
5️⃣ Clica "Próximo" → Pergunta 1: Área de investigação
   ↓
6️⃣ Seleciona opção → transição suave
   ↓
7️⃣ Pergunta 2: Nível Acadêmico (mesmo padrão)
   ↓
8️⃣ Pergunta 3: Artigo pronto? (mesmo padrão)
   ↓
9️⃣ Sistema processa respostas
   ↓
🔟 Tela de resultado: "Sua pesquisa encaixa em [PERIÓDICO]"
   ↓
1️⃣1️⃣ Lead recebe WhatsApp em 24h com boas-vindas + link do grupo
   ↓
1️⃣2️⃣ Lead entra na comunidade de pesquisadores
   ↓
1️⃣3️⃣ Dados registrados em GHL para acompanhamento
```

---

## 🚀 CHECKLIST DE IMPLEMENTAÇÃO NO GHL AI STUDIO

- [ ] Landing page criada com seção hero completa
- [ ] Formulário one-step capturando 4 perguntas + dados básicos
- [ ] Validações ativas (formato email, WhatsApp, seleções obrigatórias)
- [ ] Sistema de roteamento calculando periódico correto
- [ ] Tags GHL criadas e associadas automaticamente
- [ ] Automações WhatsApp configuradas (boas-vindas em 24h)
- [ ] Automações de e-mail para leads educacionais
- [ ] Notificações internas ativas (equipe recebe novo lead)
- [ ] Design responsivo testado em mobile/tablet/desktop
- [ ] Links de grupos WhatsApp validados e funcionando
- [ ] Integração GHL ↔ painel de métricas confirmada
- [ ] Teste end-to-end completo (preenchimento → WhatsApp → painel)
- [ ] Sem erros de console/JavaScript
- [ ] Cores e tipografia seguem identidade UFAL

---

## 📧 RODAPÉ DA LP

```
Logo UFAL + FAPEAL (pequeno, alinhado à esquerda)

Texto: "Programa Permanente de Captação de Pesquisadores | UFAL"

Contato: info@artificialctrl.com | +55 (XX) XXXX-XXXX

© 2024-2026 UFAL. Todos os direitos reservados.
```

---

## 🎯 INSTRUÇÕES PARA O AI STUDIO DO GOHIGHLEVEL

**Copie este prompt no GoHighLevel → AI Studio → Criar Nova Landing Page**

Ele deve gerar:
1. Uma LP profissional + responsiva
2. Formulário com lógica condicional (one-step)
3. Integração com automações GHL
4. Tags automáticas por periódico
5. Roteamento inteligente baseado em respostas

**Não esqueça de:**
- Substituir [Link do grupo] pelos links reais dos grupos WhatsApp
- Configurar as automações após criar a LP
- Testar o roteamento antes de publicar

---

## ⚡ INFORMAÇÕES AINDA NECESSÁRIAS (para finalizar)

Antes de colar o prompt no AI Studio, **você precisa fornecer:**

1. **Links dos grupos WhatsApp** (onde os leads serão redirecionados após qualificação):
   - Link grupo REPD: `https://chat.whatsapp.com/XXXXX`
   - Link grupo Revista Ciência Agrícola: `https://chat.whatsapp.com/XXXXX`
   - Link grupo Revista Crítica Histórica: `https://chat.whatsapp.com/XXXXX`

2. **Email para notificações internas** (quem recebe alerta de novo lead):
   - Ex: `john@triadeflow.com.br` ou equipe interna

3. **Sequência de e-mails** (para leads educacionais que não têm artigo pronto):
   - Dica 1: "Como estruturar um artigo científico"
   - Dica 2: "Cronograma de submissão 2026"
   - Dica 3: "Checklist antes de enviar"

---

*Prompt versão 2.0 — Otimizado para GoHighLevel AI Studio*
*Data: Agosto 2026 | Projeto: Captação de Pesquisadores UFAL/FAPEAL*
*Status: Pronto para usar | Áreas das revistas: ✅ Configuradas*
