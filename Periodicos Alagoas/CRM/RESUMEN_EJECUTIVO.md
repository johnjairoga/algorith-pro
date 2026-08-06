# 📊 RESUMEN EJECUTIVO
## Plan de Integración GHL + Generación de Pesquisadores
**Proyecto:** Conecta Pesquisadores UFAL  
**Período:** 6 de Agosto — 6 de Septiembre 2026  
**Responsable:** John Jairo Garcia Arcentales

---

## 🎯 OBJETIVO

Implementar un **sistema automatizado de captura de pesquisadores** que:
- ✅ Recibe leads de 3 revistas (REPD, Ciência Agrícola, Crítica Histórica)
- ✅ Califica automáticamente por área y nivel académico
- ✅ Rota inteligentemente a la revista correcta
- ✅ Automatiza bienvenida, seguimiento y educación
- ✅ Genera **20+ leads calificados/mes por revista**

**Estado:** 🔴 POR INICIAR (Semana del 6 de agosto)

---

## ⏱️ TIMELINE DE 5 SEMANAS

```
SEMANA 1 (6-10 ago)  ← ESTA SEMANA
└─ FASE 1: Configuración GHL
   • Crear tags (9)
   • Crear pipelines (3)
   • Crear campos personalizados (8)
   • Testing básico
   ✅ Entregable: GHL listo para recibir leads

SEMANA 2 (11-16 ago)
└─ FASE 2: Integración API
   • Script de envío a GHL
   • Lógica de routing (área → revista)
   • Lógica de tags automáticos
   • Testing de API
   ✅ Entregable: API funcional entre formulario ↔ GHL

SEMANA 3 (17-23 ago)
└─ FASE 3: Automatizaciones
   • Workflow: Lead Quente (WhatsApp 1h)
   • Workflow: Lead Educacional (Email sequence 3d)
   • Workflow: Bienvenida Universal (WhatsApp 24h)
   • Workflow: Notificación Interna (Email inmediato)
   ✅ Entregable: 4 workflows automáticos validados

SEMANA 4-5 (24 ago - 6 sep)
└─ FASE 4: Anuncios y Go-Live
   • Briefs de anuncios (3 revistas)
   • Creativos/imágenes (9 variantes)
   • Campañas Meta Ads (3 campañas)
   • Testing pre-lanzamiento
   • GO-LIVE
   ✅ Entregable: Anuncios en vivo, primeros leads llegando
```

---

## 📋 TAREAS POR FASE

### FASE 1: Configuración GHL (Semana 1)

| Tarea | Plazo | Duración | Status |
|-------|-------|----------|--------|
| 1.1 Acceso y validación GHL | 6 ago | 30 min | 🔴 |
| 1.2 Crear tags (9 totales) | 6 ago | 45 min | 🔴 |
| 1.3 Crear pipelines (3) | 7 ago | 30 min | 🔴 |
| 1.4 Crear campos personalizados (8) | 7 ago | 45 min | 🔴 |
| 1.5 Crear contacto de prueba | 7 ago | 10 min | 🔴 |
| 1.6 Validar API básica | 8 ago | 1 hora | 🔴 |
| 1.7 Documentar estructura | 8 ago | 1 hora | 🔴 |

**Total Fase 1:** ~4 horas  
**Entregables:** `GHL_SETUP.md` + `GHL_STRUCTURE.json`

---

### FASE 2: Integración API (Semana 2)

| Tarea | Plazo | Duración | Status |
|-------|-------|----------|--------|
| 2.1 Script de envío a GHL | 12 ago | 2 horas | 🔴 |
| 2.2 Lógica de routing | 12 ago | 1 hora | 🔴 |
| 2.3 Lógica de tags automáticos | 12 ago | 1 hora | 🔴 |
| 2.4 Testing (5 escenarios) | 13 ago | 1.5 horas | 🔴 |
| 2.5 Documentación API | 14 ago | 1 hora | 🔴 |
| 2.6 Validación final | 14 ago | 1 hora | 🔴 |

**Total Fase 2:** ~7.5 horas  
**Entregables:** Script funcional + `API_INTEGRATION.md` + `TEST_RESULTS.md`

---

### FASE 3: Automatizaciones (Semana 3)

| Tarea | Plazo | Duración | Status |
|-------|-------|----------|--------|
| 3.1 Workflow Lead Quente | 17 ago | 1 hora | 🔴 |
| 3.2 Workflow Lead Educacional | 18 ago | 2 horas | 🔴 |
| 3.3 Workflow Bienvenida Universal | 18 ago | 1.5 horas | 🔴 |
| 3.4 Workflow Notificación Interna | 19 ago | 1 hora | 🔴 |
| 3.5 Validación end-to-end | 19 ago | 2 horas | 🔴 |
| 3.6 Documentación workflows | 20 ago | 1 hora | 🔴 |

**Total Fase 3:** ~8.5 horas  
**Entregables:** 4 workflows en GHL + `AUTOMATIONS_DOCUMENTATION.md`

---

### FASE 4: Anuncios y Go-Live (Semana 4-5)

| Tarea | Plazo | Duración | Status |
|-------|-------|----------|--------|
| 4.1 Briefs de anuncios (3) | 24 ago | 2 horas | 🔴 |
| 4.2 Creativos/imágenes (9) | 25 ago | 2 horas | 🔴 |
| 4.3 Campañas Meta Ads (3) | 25-26 ago | 2 horas | 🔴 |
| 4.4 Testing pre-lanzamiento | 26 ago | 2 horas | 🔴 |
| 4.5 Aprobación y Go-Live | 27 ago | 1 hora | 🔴 |

**Total Fase 4:** ~9 horas  
**Entregables:** Anuncios en vivo + `ANUNCIOS_BRIEF.md` + `ANUNCIOS_CREATIVOS.md`

---

## 🎯 ESTRUCTURA EN GHL

### Tags Creados (8 totales)

**Por Revista (3):**
```
📍 REPD — Economia & Políticas Públicas
📍 REVISTA_CIENCIA_AGRICOLA — Agronomía & Producción
📍 REVISTA_CRITICA_HISTORICA — Historia & Humanidades
```

**Por Timeline + Calificación (4):**
```
⚡ INTENT_30_DIAS — Publicar nos próximos 30 dias (Alta urgência)
⚡ INTENT_3_MESES — Publicar nos próximos 3 meses (Urgência média)
⚡ INTENT_6_MESES — Publicar nos próximos 6 meses (Urgência baixa)
⚡ INTENT_SIN_FECHA — Sem data definida (Exploração)
```

**Por Origen/Origem (4):**
```
🌐 aluno-landing-page
🌐 aluno-meta-ads
🌐 aluno-google-ads
🌐 aluno-importacao
```

**Eliminados (deprecated):**
```
❌ LEAD_QUENTE (substituído por INTENT_30_DIAS)
❌ LEAD_EDUCACIONAL (substituído por INTENT_3_MESES + INTENT_6_MESES)
❌ LEAD_PARCIAL (substituído por INTENT_SIN_FECHA)
❌ lead-landing-page, lead-meta-ads, lead-google-ads, lead-importacao (renomeados para aluno-*)
```

### Pipelines Creados (3 totales) — NUEVA JORNADA DEL ALUNO

```
1️⃣ REPD — Economia & Políticas Públicas
   ├─ Aluno Cadastrado (Aluno preencheu o formulário)
   ├─ Dados Confirmados (Aluno recebeu confirmação de dados)
   ├─ Convite do Grupo Enviado (Aluno recebeu convite WhatsApp)
   ├─ No Grupo — Em Aquecimento (Aluno sendo aquecido continuamente)
   └─ Convertido — Artigo Submetido (Aluno submeteu artigo à revista)

2️⃣ REVISTA_CIENCIA_AGRICOLA — Agronomía & Producción
   ├─ Aluno Cadastrado
   ├─ Dados Confirmados
   ├─ Convite do Grupo Enviado
   ├─ No Grupo — Em Aquecimento
   └─ Convertido — Artigo Submetido

3️⃣ REVISTA_CRITICA_HISTORICA — Historia & Humanidades
   ├─ Aluno Cadastrado
   ├─ Dados Confirmados
   ├─ Convite do Grupo Enviado
   ├─ No Grupo — Em Aquecimento
   └─ Convertido — Artigo Submetido
```

**Cambio de modelo:** Los pipelines anteriores tenían 4 etapas genéricas de venta (Nuevo Lead, Cualificado, En Contacto, Convertido). Se han rediseñado con **5 etapas específicas para la jornada del alumno**, reflejando el flujo real:
1. Captura desde anuncio → 2. Confirmación de datos → 3. Invitación a grupo WhatsApp → 4. Aquecimiento/Nurturing en grupo → 5. Conversión (artículo submetido)

### Campos Personalizados (8 totales)

```
✅ Nombre (Text, requerido)
✅ Email (Email, requerido)
✅ WhatsApp (Phone, requerido)
✅ Área de Investigación (Select, requerido)
✅ Nivel Académico (Select, requerido)
✅ Artículo Listo (Select, requerido)
✅ Cuándo Publicar (Select, requerido)
✅ LGPD Aceptado (Checkbox, requerido)
```

---

## 🤖 AUTOMATIZACIONES CREADAS (6+ totales, en revisión)

### 1️⃣ Automation: Aluno Cadastrado → Mensaje de Bienvenida

```
TRIGGER: Aluno ingresa a "Aluno Cadastrado" en cualquier pipeline
DELAY: Inmediato (o 30 min)
ACCIÓN: WhatsApp personalizado con datos del aluno

Mensaje:
"Olá [Nombre]! 👋 Recebemos seus dados! 
Já está na nossa revista de [Área]. Aguarde novidades..."
```

### 2️⃣ Automation: Transición a "Datos Confirmados"

```
TRIGGER: Tag = INTENT_30_DIAS (alta urgência)
DELAY: 1-2 horas
ACCIÓN: Enviar WhatsApp confirmando los datos

Mensaje:
"Perfeito! 🎉 Confirmamos que você tem um artigo pronto.
Vamos te colocar no grupo de especialistas..."
```

### 3️⃣ Automation: Invitación a Grupo WhatsApp

```
TRIGGER: Transición a "Convite do Grupo Enviado"
DELAY: Inmediato
ACCIÓN: Enviar link de invitación al grupo WhatsApp por revista

Ejemplos:
  REPD: "https://chat.whatsapp.com/REPD..."
  Agrícola: "https://chat.whatsapp.com/AGRICOLA..."
  Histórica: "https://chat.whatsapp.com/HISTORICA..."
```

### 4️⃣ Automation: Secuencia de Aquecimiento en Grupo

```
TRIGGER: Aluno ingresa a "No Grupo — Em Aquecimento"
DELAY: Diario (variación según engagement)
ACCIONES:
  • Día 1: "Dica: Estrutura de Artigo Científico"
  • Día 3: "Histórico: Artigos aceitos en nuestra revista"
  • Día 7: "Checklist: Antes de submeter"
  • Día 14: "Contacto personal: Resolvemos dudas"
```

### 5️⃣ Automation: Notificación Interna

```
TRIGGER: Nuevo aluno completado
DELAY: Inmediato
ACCIÓN: Email al equipo de UFAL

Información:
  • Datos del aluno (Nombre, Email, WhatsApp)
  • Revista asignada
  • Área de investigación
  • Timeline de publicación (INTENT_*)
  • Link directo en GHL para seguimiento
```

### 6️⃣ Automation: Recordatorio de Submisión

```
TRIGGER: 2 días antes del vencimiento de INTENT_* tags
DELAY: 2 días antes
ACCIÓN: WhatsApp recordatorio personalizado

Ejemplos:
  INTENT_30_DIAS: "¿Listo para someter? Solo 2 días..."
  INTENT_3_MESES: "¿Cómo va tu artículo? Estamos aquí para ayudar"
```

**Nota:** Las automatizaciones relacionadas con LEAD_QUENTE/EDUCACIONAL/PARCIAL han sido **reemplazadas** por un sistema basado en **INTENT_* tags** + **pipeline stages** para una mejor alineación con la jornada del aluno.

---

## 📢 ANUNCIOS (4 campañas Meta Ads)

```
REPD
└─ Headline: "Publica tu investigación en REPD"
└─ Público: Economistas, investigadores desarrollo
└─ Budget: R$ 500-800/mes
└─ Placements: Facebook (sin Instagram)

REVISTA CIÊNCIA AGRÍCOLA
└─ Headline: "Publica tu investigación agrícola"
└─ Público: Agronomistas, veterinarios, productores
└─ Budget: R$ 500-800/mes
└─ Placements: Facebook + Instagram

REVISTA CRÍTICA HISTÓRICA
└─ Headline: "Publica tus estudios históricos"
└─ Público: Historiadores, profesores de historia
└─ Budget: R$ 500-800/mes
└─ Placements: Facebook + Instagram
```

---

## ✅ CHECKLIST DE GO-LIVE

**Antes de lanzar, validar:**

- [ ] GHL: Todos los tags, pipelines y campos creados
- [ ] API: Script de integración testeado (5+ escenarios)
- [ ] Automaciones: 4 workflows creados y validados
- [ ] Ads: 3 campañas en Meta Ads Manager
- [ ] Landing Page: Responsiva, sin errores
- [ ] Formulario: Captura datos completos
- [ ] WhatsApp: Grupos creados (3)
- [ ] Documentación: Completada y clara
- [ ] LGPD: Compliance validado
- [ ] Testing end-to-end: Exitoso
- [ ] Aprobación de Ronaldo (UFAL): Obtenida

---

## 📊 MÉTRICAS DE ÉXITO

**Durante 1er mes (Septiembre):**

| Métrica | Meta | Actual | Status |
|---------|------|--------|--------|
| Leads totales capturados | 60+ | - | 🔴 |
| Leads por revista | 20+ cada | - | 🔴 |
| Tasa de cualificación | 70%+ | - | 🔴 |
| Custo por lead | < R$ 50 | - | 🔴 |
| Automaciones disparadas | 90%+ | - | 🔴 |
| Conversión formulario | 30%+ | - | 🔴 |

---

## 📁 ARCHIVOS CLAVE EN `Periodicos Alagoas/CRM/`

```
CRM/
├─ PDR_INTEGRACION_GHL_GENERACION_PESQUISADORES.md  ← Plan detallado
├─ RESUMEN_EJECUTIVO.md  ← Este archivo
├─ .env  ← Credenciales GHL
│
├─ [FASE 1]
│  ├─ GHL_SETUP.md
│  └─ GHL_STRUCTURE.json
│
├─ [FASE 2]
│  ├─ API_INTEGRATION.md
│  ├─ enviar_lead_ghl.js (o .py)
│  └─ TEST_RESULTS.md
│
├─ [FASE 3]
│  ├─ AUTOMATIONS_DOCUMENTATION.md
│  └─ workflows_GHL.json (exportación)
│
├─ [FASE 4]
│  ├─ ANUNCIOS_BRIEF.md
│  └─ ANUNCIOS_CREATIVOS.md
│
└─ [FASE 5 - Operación]
   ├─ MONITORING_DASHBOARD.md
   └─ MONTHLY_REPORTS/
      └─ Agosto_2026.md
```

---

## 🚀 PRÓXIMOS PASOS (AHORA)

**✅ ESTA SEMANA (6-10 de Agosto):**

1. [ ] Acceder a GHL con credenciales de `.env`
2. [ ] Crear 9 tags (3 por revista, 3 cualificación, 3 timeline)
3. [ ] Crear 3 pipelines (uno por revista)
4. [ ] Crear 8 campos personalizados
5. [ ] Testear con contacto de prueba
6. [ ] Documentar estructura en `GHL_SETUP.md`

**SEMANA SIGUIENTE (11-16 Agosto):**
→ Comenzar Fase 2: Script de API Integration

---

## 📞 CONTACTOS

| Rol | Persona | Email | WhatsApp |
|-----|---------|-------|----------|
| **Lead Técnico** | John Jairo | john@artificialctrl.com.br | +55 85 9XXXX-XXXX |
| **Coordinador** | Ronaldo Ferreira | ronaldo.ferreira@ufal.edu.br | +55 82 9XXXX-XXXX |

---

## 📝 ESTADO ACTUAL

```
🔴 POR INICIAR (6 de Agosto 2026)

Fase 1: ░░░░░░░░░░░░░░░░░░░░  0%
Fase 2: ░░░░░░░░░░░░░░░░░░░░  0%
Fase 3: ░░░░░░░░░░░░░░░░░░░░  0%
Fase 4: ░░░░░░░░░░░░░░░░░░░░  0%

TOTAL:  ░░░░░░░░░░░░░░░░░░░░  0%

Fecha Estimada de Go-Live: 27 de Agosto 2026
Días hasta lanzamiento: 21 días
```

---

**Documento:** Resumen Ejecutivo  
**Versión:** 1.0  
**Última actualización:** 6 de Agosto 2026  
**Estado:** 🟡 PENDIENTE INICIO  

*Para detalles completos, consultar: `PDR_INTEGRACION_GHL_GENERACION_PESQUISADORES.md`*
