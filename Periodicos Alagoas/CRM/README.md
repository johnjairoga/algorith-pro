# 🎯 INTEGRACIÓN GHL + GENERACIÓN DE PESQUISADORES
## Proyecto Conecta Pesquisadores UFAL

**Carpeta:** `Periodicos Alagoas/CRM/`  
**Período:** 6 Agosto — 6 Septiembre 2026  
**Responsable:** John Jairo Garcia Arcentales  
**Estado:** 🔴 POR INICIAR

---

## 📚 DOCUMENTACIÓN

### 🚀 PUNTO DE ENTRADA

| Documento | Descripción | Audiencia | Cuándo leer |
|-----------|-----------|-----------|-----------|
| **[RESUMEN_EJECUTIVO.md](RESUMEN_EJECUTIVO.md)** | Vista ejecutiva: timeline, tareas, estructura GHL, métricas | Todos | **PRIMERO** |
| **[PDR_INTEGRACION_GHL_GENERACION_PESQUISADORES.md](PDR_INTEGRACION_GHL_GENERACION_PESQUISADORES.md)** | Plan detallado: 5 fases, tareas específicas, checklists | John + Ronaldo | Plan completo |
| **[TRACKING_PROGRESO.md](TRACKING_PROGRESO.md)** | Seguimiento diario: progreso, blockers, métricas | John | Actualizar diariamente |

---

### 📋 ARCHIVOS POR FASE

#### FASE 1: Configuración GHL (Semana 1)

| Archivo | Descripción | Status |
|---------|-----------|--------|
| `GHL_SETUP.md` | Instrucciones para configurar GHL (tags, pipelines, campos) | 🔴 Por crear |
| `GHL_STRUCTURE.json` | Exportación de la estructura configurada en GHL | 🔴 Por crear |
| `GHL_API_REFERENCE.md` | Referencia técnica de la API de GHL | 🔴 Por crear |

#### FASE 2: Integración API (Semana 2)

| Archivo | Descripción | Status |
|---------|-----------|--------|
| `API_INTEGRATION.md` | Documentación de integración: autenticación, endpoints, ejemplos | 🔴 Por crear |
| `enviar_lead_ghl.js` | Script de integración (Node.js) | 🔴 Por crear |
| `enviar_lead_ghl.py` | Script de integración (Python) | 🔴 Por crear |
| `TEST_RESULTS.md` | Resultados de 5+ tests de integración | 🔴 Por crear |

#### FASE 3: Automatizaciones (Semana 3)

| Archivo | Descripción | Status |
|---------|-----------|--------|
| `AUTOMATIONS_DOCUMENTATION.md` | Documentación de los 4 workflows en GHL | 🔴 Por crear |
| `workflows_GHL.json` | Exportación de workflows desde GHL | 🔴 Por crear |

#### FASE 4: Anuncios y Go-Live (Semana 4-5)

| Archivo | Descripción | Status |
|---------|-----------|--------|
| `ANUNCIOS_BRIEF.md` | Briefs de anuncios para las 3 revistas | 🔴 Por crear |
| `ANUNCIOS_CREATIVOS.md` | Descripción de creativos, imágenes y variantes | 🔴 Por crear |
| `META_ADS_SETUP.md` | Configuración de campañas en Meta Ads Manager | 🔴 Por crear |

#### FASE 5: Operación Continua

| Archivo | Descripción | Status |
|---------|-----------|--------|
| `MONITORING_DASHBOARD.md` | Dashboard de seguimiento de leads en tiempo real | 🔴 Por crear |
| `MONTHLY_REPORTS/` | Carpeta con reportes mensuales | 🔴 Por crear |
| `OPERATIONAL_GUIDE.md` | Guía operacional: escalaciones, troubleshooting | 🔴 Por crear |

---

### 🔐 CREDENCIALES Y CONFIGURACIÓN

| Archivo | Descripción | Acceso | Status |
|---------|-----------|--------|--------|
| `.env` | Credenciales de GHL (privado) | Solo John | ✅ Disponible |
| `credentials_backup.md` | Backup encriptado de credenciales (privado) | Solo John | 🔴 Por crear |

---

## 📈 PLAN DE 5 SEMANAS

```
SEMANA 1 (6-10 Ago)   ← ESTA SEMANA
└─ FASE 1: Configuración GHL
   • 4 horas de trabajo
   • Entregables: GHL_SETUP.md + GHL_STRUCTURE.json
   • Go-No-Go: GHL accesible con tags/pipelines/campos creados

SEMANA 2 (11-16 Ago)
└─ FASE 2: Integración API
   • 7.5 horas de trabajo
   • Entregables: enviar_lead_ghl.js + API_INTEGRATION.md + TEST_RESULTS.md
   • Go-No-Go: 5 tests exitosos, API funcionando con GHL real

SEMANA 3 (17-23 Ago)
└─ FASE 3: Automatizaciones
   • 8.5 horas de trabajo
   • Entregables: 4 workflows en GHL + AUTOMATIONS_DOCUMENTATION.md
   • Go-No-Go: Todos los workflows testeados end-to-end

SEMANA 4-5 (24 Ago - 6 Sep)
└─ FASE 4: Anuncios & Go-Live
   • 9 horas de trabajo
   • Entregables: 3 campañas Meta + briefs + creativos
   • Go-No-Go: ANUNCIOS EN VIVO, primeros leads llegando a GHL

META: 20+ leads/mes por revista (60+ total)
```

---

## ✅ CHECKLIST RÁPIDO

### Requisitos Previos
- [ ] ✅ Credenciales de GHL en `.env`
- [ ] ✅ Acceso a Meta Ads Manager
- [ ] ✅ 3 grupos WhatsApp creados (o listos para crear)
- [ ] ✅ Landing page y formulario desarrollados
- [ ] ✅ Aprobación de Ronaldo (UFAL) en PDR

### FASE 1 (Esta Semana)
- [ ] Acceder a GHL
- [ ] Crear 9 tags
- [ ] Crear 3 pipelines
- [ ] Crear 8 campos personalizados
- [ ] Documentar estructura
- [ ] ✅ Completar y hacer push a git

### FASE 2 (Próxima Semana)
- [ ] Crear script de envío a GHL
- [ ] Implementar lógica de routing
- [ ] Implementar asignación de tags
- [ ] Testear 5+ escenarios
- [ ] Documentar API

### FASE 3 (Semana 3)
- [ ] Crear workflow Lead Quente
- [ ] Crear workflow Lead Educacional (3 emails)
- [ ] Crear workflow Bienvenida
- [ ] Crear workflow Notificación Interna
- [ ] Testear todos los workflows

### FASE 4 (Semana 4-5)
- [ ] Crear briefs de anuncios
- [ ] Diseñar creativos (9 variantes)
- [ ] Crear campañas Meta Ads
- [ ] Testear pre-lanzamiento
- [ ] **GO-LIVE** 🚀

---

## 🎯 ESTRUCTURA GHL (ACTUALIZADA 6 AGO 2026)

### Tags Creados (8) — NUEVA ESTRUCTURA

**Por Revista (3):**
- `REPD` → Economia & Políticas Públicas
- `REVISTA_CIENCIA_AGRICOLA` → Agronomía & Producción
- `REVISTA_CRITICA_HISTORICA` → Historia & Humanidades

**Por Timeline + Calificación (4) — Reemplaza LEAD_QUENTE/EDUCACIONAL/PARCIAL:**
- `INTENT_30_DIAS` → Publicar nos próximos 30 dias (Alta urgência)
- `INTENT_3_MESES` → Publicar nos próximos 3 meses (Urgência média)
- `INTENT_6_MESES` → Publicar nos próximos 6 meses (Urgência baixa)
- `INTENT_SIN_FECHA` → Sem data definida (Exploração)

**Por Origen/Origem (4) — Renombrado de lead-* a aluno-*:**
- `aluno-landing-page` → Origen landing page
- `aluno-meta-ads` → Origen Meta Ads
- `aluno-google-ads` → Origen Google Ads
- `aluno-importacao` → Importación manual

### Pipelines Creados (3) — 5 ETAPAS NUEVA JORNADA DEL ALUNO

**Estructura común para los 3 pipelines:**
1. **Aluno Cadastrado** — Aluno preencheu o formulário do anúncio
2. **Dados Confirmados** — Aluno recebeu mensagem confirmando os dados
3. **Convite do Grupo Enviado** — Aluno recebeu convite para o grupo WhatsApp
4. **No Grupo — Em Aquecimento** — Aluno dentro do grupo, sendo aquecido para submeter
5. **Convertido — Artigo Submetido** — Aluno submeteu seu artigo à revista

Cada pipeline aplica a los 3 temas:
- Pipeline REPD — Economia & Políticas Públicas
- Pipeline Revista Ciência Agrícola — Agronomía & Producción
- Pipeline Revista Crítica Histórica — Historia & Humanidades

### Campos Personalizados (8)

- Nombre (Text)
- Email (Email)
- WhatsApp (Phone)
- Área de Investigación (Select)
- Nivel Académico (Select)
- Artículo Listo (Select)
- Cuándo Publicar (Select)
- LGPD Aceptado (Checkbox)

---

## 🤖 AUTOMATIZACIONES (6+ workflows) — REDISEÑADAS PARA NUEVA JORNADA

| # | Nombre | Trigger | Delay | Acción |
|---|--------|---------|-------|--------|
| 1 | Aluno Cadastrado → Msg Bienvenida | Ingresa "Aluno Cadastrado" | 30 min | WhatsApp confirmación datos |
| 2 | Alta Urgência → Invitación Prioritaria | Tag INTENT_30_DIAS | 1-2h | WhatsApp urgente |
| 3 | Invitación a Grupo WhatsApp | Ingresa "Convite do Grupo Enviado" | Inmediato | Link WhatsApp por revista |
| 4 | Secuencia de Aquecimiento | Ingresa "No Grupo — Em Aquecimento" | Diario | Dicas + históricos + checklist |
| 5 | Notificación Interna | Nuevo aluno completado | Inmediato | Email al equipo UFAL |
| 6 | Recordatorio de Submisión | 2d antes vencimiento INTENT_* | -2d | WhatsApp recordatorio |

**Cambio clave:** Las automatizaciones anteriores basadas en LEAD_QUENTE/EDUCACIONAL/PARCIAL han sido reemplazadas por un sistema que se alinea con:
- **Pipeline stages** (etapas específicas de la jornada)
- **INTENT_* tags** (urgencia real = timeline de publicación)

---

## 📊 MÉTRICAS DE ÉXITO

**Meta mensual:** 20+ leads por revista (60+ total)

| Métrica | Target | Actual |
|---------|--------|--------|
| Leads capturados | 60+ | - |
| Tasa cualificación | 70%+ | - |
| Custo por lead | < R$ 50 | - |
| Automaciones disparadas | 90%+ | - |
| Conversión formulario | 30%+ | - |

---

## 🚀 PRÓXIMOS PASOS INMEDIATOS

### HOY (6 Agosto)

1. **08:00 AM** - Acceder a GHL con `.env`
2. **09:00 AM** - Crear 9 tags
3. **10:30 AM** - Crear 3 pipelines
4. **11:30 AM** - Documentar estructura
5. **12:00 PM** - Push a git

### MAÑANA (7 Agosto)

1. Crear 8 campos personalizados
2. Crear contacto de prueba
3. Validar API básica
4. Documentar en `GHL_SETUP.md`

### FIN DE SEMANA (8-10 Agosto)

- Finalizar documentación
- Revisar con Ronaldo
- Listo para Fase 2

---

## 📞 CONTACTOS

| Rol | Nombre | Email | WhatsApp |
|-----|--------|-------|----------|
| **Lead Técnico** | John Jairo | john@artificialctrl.com.br | +55 85 9XXXX-XXXX |
| **Coordinador** | Ronaldo Ferreira | ronaldo.ferreira@ufal.edu.br | +55 82 9XXXX-XXXX |

---

## 📁 ESTRUCTURA DE CARPETAS

```
Periodicos Alagoas/
├─ CRM/
│  ├─ README.md ← Estás aquí
│  ├─ .env (credenciales)
│  ├─ RESUMEN_EJECUTIVO.md
│  ├─ PDR_INTEGRACION_GHL_GENERACION_PESQUISADORES.md
│  ├─ TRACKING_PROGRESO.md
│  │
│  ├─ [FASE 1]
│  │  ├─ GHL_SETUP.md (Por crear)
│  │  ├─ GHL_STRUCTURE.json (Por crear)
│  │  └─ GHL_API_REFERENCE.md (Por crear)
│  │
│  ├─ [FASE 2]
│  │  ├─ API_INTEGRATION.md (Por crear)
│  │  ├─ enviar_lead_ghl.js (Por crear)
│  │  ├─ enviar_lead_ghl.py (Por crear)
│  │  └─ TEST_RESULTS.md (Por crear)
│  │
│  ├─ [FASE 3]
│  │  ├─ AUTOMATIONS_DOCUMENTATION.md (Por crear)
│  │  └─ workflows_GHL.json (Por crear)
│  │
│  ├─ [FASE 4]
│  │  ├─ ANUNCIOS_BRIEF.md (Por crear)
│  │  ├─ ANUNCIOS_CREATIVOS.md (Por crear)
│  │  └─ META_ADS_SETUP.md (Por crear)
│  │
│  ├─ [FASE 5]
│  │  ├─ MONITORING_DASHBOARD.md (Por crear)
│  │  ├─ OPERATIONAL_GUIDE.md (Por crear)
│  │  └─ MONTHLY_REPORTS/ (Por crear)
│  │
│  └─ scripts/
│     ├─ enviar_lead_ghl.js (Por crear)
│     └─ enviar_lead_ghl.py (Por crear)
│
├─ _CONTEXTO_PROYECTO/
│  ├─ PROJECT_CONECTA_PESQUISADORES.md
│  ├─ PDR_Plano_Implementacao.md
│  └─ ...
│
└─ documentos/
   └─ ...
```

---

## 🎓 RECURSOS

- **GHL Documentation:** https://docs.gohighlevel.com
- **Meta Ads API:** https://developers.facebook.com/docs/marketing-apis
- **LGPD Brasil:** https://www.gov.br/cidadania/pt-br/acesso-a-informacao/lgpd

---

## ✍️ NOTAS

- Todos los documentos son colaborativos — actualizar conforme avance
- El archivo `TRACKING_PROGRESO.md` debe actualizarse diariamente
- Hacer commit a git después de cambios significativos
- Las credenciales en `.env` nunca hacerlas push (ya está en `.gitignore`)

---

## 📝 VERSIONADO

| Versión | Fecha | Cambios |
|---------|-------|---------|
| 1.0 | 6 ago 2026 | Creación inicial |

---

**Última actualización:** 6 Agosto 2026  
**Responsable:** John Jairo Garcia Arcentales  
**Estado:** 🔴 INICIANDO FASE 1

🚀 **¡Listo para comenzar!**
