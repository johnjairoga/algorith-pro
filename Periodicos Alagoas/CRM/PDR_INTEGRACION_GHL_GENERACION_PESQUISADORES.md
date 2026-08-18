# PDR — INTEGRACIÓN GHL + GENERACIÓN DE PESQUISADORES
## Plan de Ejecución — Periodicos Alagoas / UFAL
### Sistema de Captura y Automatización de Investigadores

---

**Proyecto:** Conecta Pesquisadores UFAL  
**Período:** Agosto 2026 — Diciembre 2026  
**Responsable Principal:** John Jairo Garcia Arcentales  
**Coordinador Cliente:** Ronaldo Ferreira de Araujo (UFAL)  
**Estado:** 🔴 POR INICIAR  

---

## 📋 CONTENIDO DEL DOCUMENTO

1. [Objetivo General](#objetivo-general)
2. [Estructura de Fases](#estructura-de-fases)
3. [Fase 1: Configuración GHL](#fase-1-configuración-ghl)
4. [Fase 2: Integración API](#fase-2-integración-api)
5. [Fase 3: Automatizaciones](#fase-3-automatizaciones)
6. [Fase 4: Anuncios y Captura](#fase-4-anuncios-y-captura)
7. [Checklists y Validaciones](#checklists-y-validaciones)
8. [Dashboard de Seguimiento](#dashboard-de-seguimiento)
9. [Riesgos y Mitigaciones](#riesgos-y-mitigaciones)

---

## 🎯 OBJETIVO GENERAL

Implementar un sistema completo de captura y automatización de pesquisadores mediante:

✅ **Integración con GoHighLevel (GHL)** para gestión centralizada de leads  
✅ **Automatizaciones inteligentes** basadas en cualificación y comportamiento  
✅ **Campañas Meta Ads** dirigidas a investigadores por área  
✅ **Seguimiento en tiempo real** de conversiones y métricas  

**Meta:** Capturar **20+ leads calificados/mes por revista** con automatización de bienvenida y segmentación

---

## 🏗️ ESTRUCTURA DE FASES

| Fase | Período | Duración | Status | Entregables |
|------|---------|----------|--------|-------------|
| **Fase 1** | Semana 1 (6-10 ago) | 4 días | 🔴 Por iniciar | Tags, Pipelines, Estructura GHL |
| **Fase 2** | Semana 2 (11-16 ago) | 4 días | ⏳ Bloqueado | API Integration, Scripts, Testing |
| **Fase 3** | Semana 3 (17-23 ago) | 4 días | ⏳ Bloqueado | Automaciones, Workflows, Validación |
| **Fase 4** | Semana 4-5 (24 ago - 6 sep) | 8 días | ⏳ Bloqueado | Anuncios, Landing Page, Go-Live |
| **Fase 5** | Semana 6+ (Sep en adelante) | Continua | ⏳ Bloqueado | Operación, Monitoreo, Reportes |

---

## 📌 FASE 1: CONFIGURACIÓN GHL
**Período:** Semana 1 (6-10 de Agosto)  
**Duración:** 4 días  
**Responsable:** John Jairo (Técnica)  
**Prerequisitos:** ✅ Credenciales GHL disponibles en `.env`

### 🎯 Objetivo de Fase 1
Crear la estructura completa en GHL: tags, pipelines, contactos y configuración base para que el sistema esté listo para recibir leads.

---

### ✅ TAREAS

#### 1.1 - Acceso y Validación de GHL
- [ ] Acceder a GHL con credenciales de `.env`
- [ ] Validar que la cuenta sea la correcta (Conecta Pesquisadores)
- [ ] Confirmar permisos: Admin/Full Access
- [ ] Documentar URL de acceso: _______________
- [ ] **Responsable:** John  
- **Plazo:** 6 de agosto  
- **Tiempo estimado:** 30 min  

#### 1.2 - Crear Estructura de Tags (GHL)

**Tags por Revista:**
```
✅ REPD
✅ REVISTA_CIENCIA_AGRICOLA
✅ REVISTA_CRITICA_HISTORICA
```

- [ ] Crear tag `REPD` con color Azul UFAL (#1E3A8A)
- [ ] Crear tag `REVISTA_CIENCIA_AGRICOLA` con color Verde (#10B981)
- [ ] Crear tag `REVISTA_CRITICA_HISTORICA` con color Púrpura (#9333EA)
- **Responsable:** John  
- **Plazo:** 6 de agosto  
- **Tiempo estimado:** 20 min  

**Tags de Cualificación:**
```
✅ LEAD_QUENTE (Artículo listo)
✅ LEAD_EDUCACIONAL (Estudiante explorando)
✅ LEAD_PARCIAL (Solo datos básicos)
```

- [ ] Crear tag `LEAD_QUENTE` — Color rojo (#EF4444)
- [ ] Crear tag `LEAD_EDUCACIONAL` — Color naranja (#F97316)
- [ ] Crear tag `LEAD_PARCIAL` — Color gris (#9CA3AF)
- **Responsable:** John  
- **Plazo:** 6 de agosto  
- **Tiempo estimado:** 15 min  

**Tags de Timeline:**
```
✅ INTENT_30_DIAS
✅ INTENT_3_MESES
✅ INTENT_6_MESES
✅ INTENT_SIN_FECHA
```

- [ ] Crear 4 tags de timeline con colores diferenciados
- **Responsable:** John  
- **Plazo:** 6 de agosto  
- **Tiempo estimado:** 10 min  

#### 1.3 - Crear Pipelines por Revista

**Pipeline 1: REPD**
- [ ] Nombre: "REPD — Economia & Políticas Públicas"
- [ ] Etapas: `Nuevo Lead` → `Cualificado` → `En Contacto` → `Convertido`
- [ ] Asignar tag automático: `REPD`

**Pipeline 2: Revista Ciência Agrícola**
- [ ] Nombre: "Ciência Agrícola — Agronomía & Producción"
- [ ] Etapas: `Nuevo Lead` → `Cualificado` → `En Contacto` → `Convertido`
- [ ] Asignar tag automático: `REVISTA_CIENCIA_AGRICOLA`

**Pipeline 3: Revista Crítica Histórica**
- [ ] Nombre: "Crítica Histórica — Historia & Humanidades"
- [ ] Etapas: `Nuevo Lead` → `Cualificado` → `En Contacto` → `Convertido`
- [ ] Asignar tag automático: `REVISTA_CRITICA_HISTORICA`

- **Responsable:** John  
- **Plazo:** 7 de agosto  
- **Tiempo estimado:** 30 min  

#### 1.4 - Crear Campos Personalizados (Custom Fields)

Campos que GHL debe recopilar en cada lead:

```
Campo Básico:
□ Nombre (Text) — Requerido
□ Email (Email) — Requerido
□ WhatsApp (Phone) — Requerido

Campo de Cualificación:
□ Área de Investigación (Select) — Requerido
  • Economía, Desarrollo, Administración, Políticas Públicas
  • Agronomía, Ciencias del Suelo, Producción Animal/Vegetal
  • Historia, Historiografía, Estudios Históricos
  • Otras Ciencias Sociales Aplicadas

□ Nivel Académico (Select) — Requerido
  • Estudiante de grado
  • Estudiante de maestría/especialización
  • Estudiante de doctorado
  • Investigador/Profesor con posdoctorado
  • Investigador/Profesor establecido

□ Artículo Listo (Select) — Requerido
  • Sí, tengo artículo pronto
  • No, pero estoy escribiendo
  • Aún no, solo explorando oportunidades

□ Cuándo Publicar (Select) — Requerido
  • Próximos 30 días
  • Próximos 3 meses
  • Próximos 6 meses
  • Sin fecha definida

Campo de Consentimiento:
□ LGPD Aceptado (Checkbox) — Requerido
□ Newsletter Suscrito (Checkbox) — Opcional
□ Revista Asignada (Text) — Auto-rellenado por sistema
```

- [ ] Crear todos los campos en GHL
- [ ] Validar que sean requeridos donde corresponda
- [ ] Documentar IDs de campos para integración API
- **Responsable:** John  
- **Plazo:** 7 de agosto  
- **Tiempo estimado:** 45 min  

#### 1.5 - Crear Contacto de Prueba

- [ ] Crear un contacto test: "Juan Prueba (Test)"
- [ ] Email: test@artificialctrl.com.br
- [ ] WhatsApp: +55 82 98875-3884
- [ ] Asignar a Pipeline REPD
- [ ] Verificar que el contacto aparece en dashboard
- **Responsable:** John  
- **Plazo:** 7 de agosto  
- **Tiempo estimado:** 10 min  

#### 1.6 - Integración básica (Sin automaciones aún)

- [ ] Validar que GHL acepta datos via Webhook/API
- [ ] Documentar endpoint de recepción de leads
- [ ] Documentar formato esperado de datos (JSON)
- [ ] Crear archivo `GHL_API_REFERENCE.md` en carpeta CRM
- **Responsable:** John  
- **Plazo:** 8 de agosto  
- **Tiempo estimado:** 1 hora  

#### 1.7 - Documentación y Handover

- [ ] Crear archivo `GHL_SETUP.md` con:
  - URLs de acceso a GHL
  - Lista de tags creadas (con IDs)
  - Lista de pipelines (con IDs)
  - Campos personalizados (con IDs y tipos)
  - Instrucciones para soporte
  
- [ ] Crear archivo `GHL_STRUCTURE.json` con configuración exportada
- [ ] Revisar documentación con Ronaldo (UFAL)
- **Responsable:** John  
- **Plazo:** 8 de agosto  
- **Tiempo estimado:** 1 hora  

---

### ✅ CHECKLIST FINAL FASE 1

- [ ] ✅ GHL accesible y funcional
- [ ] ✅ Todos los tags creados (9 totales)
- [ ] ✅ Todos los pipelines creados (3 totales)
- [ ] ✅ Campos personalizados configurados (8 totales)
- [ ] ✅ Contacto test creado exitosamente
- [ ] ✅ API/Webhook validado
- [ ] ✅ Documentación completada
- [ ] ✅ Sin errores técnicos no resueltos

**Estado:** 🔴 Por completar  
**Fecha Estimada de Finalización:** 8 de agosto  

---

## 🔌 FASE 2: INTEGRACIÓN API
**Período:** Semana 2 (11-16 de Agosto)  
**Duración:** 4 días  
**Responsable:** John Jairo (Técnica)  
**Prerequisitos:** ✅ Fase 1 completada

### 🎯 Objetivo de Fase 2
Crear y validar scripts/API que conecten el formulario de pesquisadores con GHL, incluyendo lógica de routing automático según área de investigación.

---

### ✅ TAREAS

#### 2.1 - Crear Script de Envío a GHL

**Archivo:** `scripts/enviar_lead_ghl.js` (o Python equivalente)

**Funcionalidad:**
- Recibir datos del formulario (JSON)
- Validar campos requeridos
- Mapear área de investigación → revista
- Asignar tags automáticos
- Enviar a GHL via API
- Retornar confirmación

```javascript
// Pseudocódigo
function enviarLeadGHL(formularioData) {
  // 1. Validar
  validarDatos(formularioData)
  
  // 2. Mapear revista
  revista = mapearRevista(formularioData.areaInvestigacion)
  
  // 3. Asignar tags
  tags = asignarTags(revista, formularioData.nivelAcademico, formularioData.articuloListo, formularioData.cuandoPublicar)
  
  // 4. Enviar a GHL
  respuesta = ghl.contacts.create({
    nombre: formularioData.nombre,
    email: formularioData.email,
    whatsapp: formularioData.whatsapp,
    tags: tags,
    campos_personalizados: formularioData,
    pipeline: revista.pipelineId
  })
  
  // 5. Retornar
  return {
    exito: true,
    leadId: respuesta.id,
    revista: revista.nombre
  }
}
```

- [ ] Crear archivo `enviar_lead_ghl.js`
- [ ] Implementar validación de datos
- [ ] Implementar lógica de mapeo (área → revista)
- [ ] Implementar lógica de tags automáticos
- [ ] Integrar con API de GHL (credenciales de `.env`)
- [ ] Testing local (sin GHL)
- **Responsable:** John  
- **Plazo:** 12 de agosto  
- **Tiempo estimado:** 2 horas  

#### 2.2 - Crear Lógica de Routing

**Mapeo Automático:**

```javascript
const routingMap = {
  "economia": {
    revista: "REPD",
    tag: "REPD",
    pipelineId: "[ID_DE_GHLREPD]"
  },
  "agronomia": {
    revista: "REVISTA_CIENCIA_AGRICOLA",
    tag: "REVISTA_CIENCIA_AGRICOLA",
    pipelineId: "[ID_AGRICOLA]"
  },
  "historia": {
    revista: "REVISTA_CRITICA_HISTORICA",
    tag: "REVISTA_CRITICA_HISTORICA",
    pipelineId: "[ID_HISTORICA]"
  },
  "other": {
    revista: "SUGERENCIA_POR_SIMILITUD",
    tag: "LEAD_PARCIAL",
    pipelineId: "[ID_PARCIAL]"
  }
}
```

- [ ] Crear función `mapearRevista(area)`
- [ ] Validar con las 3 revistas correctas
- [ ] Documentar lógica en archivo
- [ ] Testing con cada área (3 escenarios)
- **Responsable:** John  
- **Plazo:** 12 de agosto  
- **Tiempo estimado:** 1 hora  

#### 2.3 - Crear Lógica de Tags Automáticos

**Lógica de Tags:**

```
Tag Revista: Según área (REPD, REVISTA_CIENCIA_AGRICOLA, REVISTA_CRITICA_HISTORICA)

Tag Cualificación:
  IF articuloListo == "Sí, tengo artículo pronto"
    → LEAD_QUENTE
  ELSE IF nivelAcademico < Maestría AND articuloListo == "Aún no, solo explorando"
    → LEAD_EDUCACIONAL
  ELSE
    → LEAD_PARCIAL

Tag Timeline (según cuandoPublicar):
  "Próximos 30 días" → INTENT_30_DIAS
  "Próximos 3 meses" → INTENT_3_MESES
  "Próximos 6 meses" → INTENT_6_MESES
  "Sin fecha definida" → INTENT_SIN_FECHA
```

- [ ] Crear función `asignarTags(revista, nivelAcademico, articuloListo, cuandoPublicar)`
- [ ] Testing con 5+ combinaciones diferentes
- [ ] Validar que GHL recibe los tags correctos
- **Responsable:** John  
- **Plazo:** 12 de agosto  
- **Tiempo estimado:** 1 hora  

#### 2.4 - Testing de Integración

**Escenarios de Test:**

| Escenario | Entrada | Tag Esperado | Revista |
|-----------|---------|--------------|---------|
| Test 1 | Economía + Doctorado + Artículo Listo + 30 días | REPD, LEAD_QUENTE, INTENT_30_DIAS | REPD |
| Test 2 | Agronomía + Grado + Escribiendo + 3 meses | REVISTA_CIENCIA_AGRICOLA, LEAD_EDUCACIONAL, INTENT_3_MESES | Ciência Agrícola |
| Test 3 | Historia + Maestría + Explorando + 6 meses | REVISTA_CRITICA_HISTORICA, LEAD_PARCIAL, INTENT_6_MESES | Crítica Histórica |
| Test 4 | Otra área + Profesor + Artículo Listo + Sin fecha | LEAD_PARCIAL (sugerencia), LEAD_QUENTE, INTENT_SIN_FECHA | Sugerencia |
| Test 5 | Verificar validación | Error de validación | N/A |

- [ ] Ejecutar Test 1 → Verificar en GHL
- [ ] Ejecutar Test 2 → Verificar en GHL
- [ ] Ejecutar Test 3 → Verificar en GHL
- [ ] Ejecutar Test 4 → Verificar en GHL
- [ ] Ejecutar Test 5 → Verificar error
- [ ] Documentar resultados en `TEST_RESULTS.md`
- **Responsable:** John  
- **Plazo:** 13 de agosto  
- **Tiempo estimado:** 1.5 horas  

#### 2.5 - Crear Documentación API

**Archivo:** `CRM/API_INTEGRATION.md`

Debe incluir:
- Descripción general
- Autenticación (tokens, keys)
- Endpoints disponibles
- Formato de datos (JSON)
- Ejemplos de request/response
- Códigos de error
- Rate limiting
- Testing

- [ ] Crear archivo `API_INTEGRATION.md`
- [ ] Documentar todos los endpoints
- [ ] Incluir ejemplos prácticos
- [ ] Incluir guía de troubleshooting
- **Responsable:** John  
- **Plazo:** 14 de agosto  
- **Tiempo estimado:** 1 hora  

#### 2.6 - Validación Final

- [ ] Revisar código con estándares de seguridad
- [ ] Validar que no hay credenciales en código
- [ ] Testing de edge cases (datos vacíos, caracteres especiales, etc.)
- [ ] Validación de performance (tiempos de respuesta)
- [ ] Documentación completada y clara
- **Responsable:** John  
- **Plazo:** 14 de agosto  
- **Tiempo estimado:** 1 hora  

---

### ✅ CHECKLIST FINAL FASE 2

- [ ] ✅ Script de envío a GHL creado y funcional
- [ ] ✅ Lógica de routing implementada y testeada (3 escenarios)
- [ ] ✅ Lógica de tags automáticos implementada (5+ combinaciones)
- [ ] ✅ Integración API validada con GHL real
- [ ] ✅ 5 tests ejecutados exitosamente
- [ ] ✅ Documentación API completada
- [ ] ✅ Código revisado (seguridad, performance)
- [ ] ✅ Sin errores técnicos

**Estado:** 🔴 Por completar  
**Fecha Estimada de Finalización:** 14 de agosto  

---

## 🤖 FASE 3: AUTOMATIZACIONES
**Período:** Semana 3 (17-23 de Agosto)  
**Duración:** 4 días  
**Responsable:** John Jairo (Técnica) + Ronaldo (Contenido)  
**Prerequisitos:** ✅ Fase 1 + 2 completadas

### 🎯 Objetivo de Fase 3
Crear workflows automáticos en GHL que se disparen según el tipo de lead (LEAD_QUENTE, LEAD_EDUCACIONAL, etc.), incluyendo mensajes de WhatsApp, emails de bienvenida y notificaciones internas.

---

### ✅ TAREAS

#### 3.1 - Workflow: Lead Quente (Artículo Listo)

**Trigger:** Lead recibe tag `LEAD_QUENTE`  
**Delay:** 1 hora después de recibir tag  
**Acción:** Enviar WhatsApp personalizado

**Mensaje WhatsApp:**
```
Olá [Nombre]! 👋

Ótimo! Vi que você tem um artigo pronto para publicar. 🎯

Vamos agendar uma ligação com nossos especialistas para revisar seu trabalho e encontrar a revista perfeita?

[BOTÓN] Agendar Chamada
```

- [ ] Crear workflow en GHL
- [ ] Nombre: "Automation: Lead Quente → WhatsApp 1h"
- [ ] Trigger: Tag = LEAD_QUENTE
- [ ] Delay: 1 hora
- [ ] Acción: Enviar WhatsApp con template personalizado
- [ ] Testing: Crear lead de prueba con LEAD_QUENTE
- [ ] Verificar que WhatsApp llega después de 1 hora
- **Responsable:** John (setup) + Ronaldo (validar mensaje)  
- **Plazo:** 17 de agosto  
- **Tiempo estimado:** 1 hora  

#### 3.2 - Workflow: Lead Educacional (Estudiante Explorando)

**Trigger:** Lead recibe tag `LEAD_EDUCACIONAL`  
**Delay:** 1 día después  
**Acción:** Email Sequence (3 emails en 3 días)

**Email 1 (Día 1):**
```
Asunto: Publicar tu primera investigación 📚

Olá [Nombre],

Entendo que está explorando oportunidades de publicación. 

Abajo te compartí un guía práctico: "Como estruturar um artigo científico"

[BOTÓN] Descargar Guía PDF
```

**Email 2 (Día 2):**
```
Asunto: Cronograma de Submissão 2026 📅

Olá [Nombre],

Aquí está el cronograma completo de las 3 revistas para el 2026.

[BOTÓN] Ver Cronograma
```

**Email 3 (Día 3):**
```
Asunto: Checklist Antes de Enviar ✅

Olá [Nombre],

Antes de enviar tu artículo, revisa este checklist para evitar rechazos.

[BOTÓN] Descargar Checklist
```

- [ ] Crear workflow en GHL
- [ ] Nombre: "Automation: Lead Educacional → Email Sequence"
- [ ] Trigger: Tag = LEAD_EDUCACIONAL
- [ ] Delay inicial: 1 día
- [ ] Crear 3 emails con delays de 24h
- [ ] Enlazar a recursos (PDFs, documentos)
- [ ] Testing: Crear lead de prueba
- [ ] Verificar que emails llegan en los tiempos correctos
- **Responsable:** John (setup) + Ronaldo (contenido/recursos)  
- **Plazo:** 18 de agosto  
- **Tiempo estimado:** 2 horas  

#### 3.3 - Workflow: Bienvenida Universal

**Trigger:** Cualquier nuevo lead completado  
**Delay:** 24 horas después  
**Acción:** Enviar WhatsApp de bienvenida personalizado por revista

**Mensaje (Personalizado por revista):**

*Para REPD:*
```
Bem-vindo à REPD! 🎓

Você foi designado para nossa revista de Economía, Desenvolvimento e Políticas Públicas.

Nossos especialistas estão analisando seu perfil. Em breve entraremos em contato!

[BOTÓN] Acessar Comunidade
```

*Para Ciência Agrícola:*
```
Bem-vindo à Revista Ciência Agrícola! 🌾

Você foi designado para nossa revista de Agronomía e Ciências do Solo.

Nossos especialistas estão analisando seu perfil. Em breve entraremos em contato!

[BOTÓN] Acessar Comunidade
```

*Para Crítica Histórica:*
```
Bem-vindo à Revista Crítica Histórica! 📖

Você foi designado para nossa revista de Historia e Humanidades.

Nossos especialistas estão analisando seu perfil. Em breve entraremos em contato!

[BOTÓN] Acessar Comunidade
```

- [ ] Crear workflow en GHL
- [ ] Nombre: "Automation: Bienvenida → WhatsApp 24h"
- [ ] Trigger: Lead completado + Tags de revista asignadas
- [ ] Delay: 24 horas
- [ ] Acción: Enviar WhatsApp personalizado según revista (REPD, Agrícola, Histórica)
- [ ] Usar condicionales para cambiar mensaje según tag de revista
- [ ] Testing: Crear 3 leads de prueba (uno por revista)
- [ ] Verificar que cada uno recibe mensaje correcto
- **Responsable:** John (setup) + Ronaldo (validar mensajes)  
- **Plazo:** 18 de agosto  
- **Tiempo estimado:** 1.5 horas  

#### 3.4 - Workflow: Notificación Interna

**Trigger:** Nuevo lead completado  
**Delay:** Inmediato  
**Acción:** Email interno al equipo de UFAL

**Mensaje Email Interno:**
```
Asunto: 🆕 Novo Lead Capturado - [Revista] - [Nombre Lead]

---

Novo Lead Capturado!

📊 DADOS DO LEAD:
├─ Nombre: [Nombre]
├─ Email: [Email]
├─ WhatsApp: [WhatsApp]
├─ Revista: [Revista Asignada]
├─ Área: [Área de Investigación]
├─ Nível Acadêmico: [Nível]
├─ Artículo: [Sí/Escribiendo/Explorando]
└─ Publicar em: [30d/3m/6m/Sin fecha]

🏷️ TAGS AUTOMÁTICOS:
└─ [Lista de tags]

🔗 LINK PARA VER NO GHL:
[URL del contacto en GHL]

---

Acción recomendada: Revisar en GHL y hacer follow-up según tipo de lead.

---
```

**Destinatarios:** ronaldo.ferreira@ufal.edu.br + john@artificialctrl.com.br

- [ ] Crear workflow en GHL
- [ ] Nombre: "Automation: Notificación Interna → Email"
- [ ] Trigger: Lead completado
- [ ] Acción: Enviar email con datos del lead
- [ ] Destinatarios: [Ronaldo] + [John]
- [ ] Incluir link directo a GHL
- [ ] Testing: Crear lead de prueba
- [ ] Verificar que email llega correctamente
- **Responsable:** John  
- **Plazo:** 19 de agosto  
- **Tiempo estimado:** 1 hora  

#### 3.5 - Validación de Automaciones

- [ ] Testing end-to-end: Lead quente → 1h → WhatsApp
- [ ] Testing end-to-end: Lead educacional → 1d → Email 1 → 1d → Email 2 → 1d → Email 3
- [ ] Testing end-to-end: Cualquier lead → 24h → Bienvenida WhatsApp
- [ ] Testing end-to-end: Nuevo lead → Inmediato → Email interno
- [ ] Verificar que no hay duplicación de mensajes
- [ ] Verificar que delays funcionan correctamente
- **Responsable:** John + Ronaldo (QA)  
- **Plazo:** 19 de agosto  
- **Tiempo estimado:** 2 horas  

#### 3.6 - Documentación de Workflows

**Archivo:** `CRM/AUTOMATIONS_DOCUMENTATION.md`

Debe incluir:
- Descripción de cada workflow
- Triggers y condiciones
- Secuencia de acciones
- Delays
- Mensajes exactos
- Screenshots de GHL
- Instrucciones para editar

- [ ] Documentar todos los workflows
- [ ] Incluir screenshots
- [ ] Incluir instrucciones de edición
- **Responsable:** John  
- **Plazo:** 20 de agosto  
- **Tiempo estimado:** 1 hora  

---

### ✅ CHECKLIST FINAL FASE 3

- [ ] ✅ Workflow Lead Quente creado y testeado
- [ ] ✅ Workflow Lead Educacional (3 emails) creado y testeado
- [ ] ✅ Workflow Bienvenida Universal (3 variantes por revista) creado y testeado
- [ ] ✅ Workflow Notificación Interna creado y testeado
- [ ] ✅ End-to-end testing completado (todos los workflows)
- [ ] ✅ No hay errores en delays o triggers
- [ ] ✅ Documentación completada
- [ ] ✅ Ronaldo validó mensajes (español/portugués correcto)

**Estado:** 🔴 Por completar  
**Fecha Estimada de Finalización:** 20 de agosto  

---

## 📢 FASE 4: ANUNCIOS Y CAPTURA
**Período:** Semana 4-5 (24 ago - 6 sep)  
**Duración:** 8 días  
**Responsable:** John (Ads) + Ronaldo (Aprobaciones)  
**Prerequisitos:** ✅ Fases 1-3 completadas

### 🎯 Objetivo de Fase 4
Crear y lanzar campañas de Meta Ads para capturar pesquisadores de las 3 revistas, dirigidas a públicos específicos por área de investigación.

---

### ✅ TAREAS

#### 4.1 - Brief de Anuncios por Revista

**Revista 1: REPD**

| Elemento | Contenido |
|----------|-----------|
| **Público-objetivo** | Economistas, investigadores en desarrollo, funcionarios públicos, profesores de economía |
| **Edad** | 22-65 años |
| **Ubicación** | Brasil + Países iberoamericanos |
| **Intereses** | Economia, desarrollo, políticas públicas, educación superior |
| **Headline** | "Publica tu investigación en REPD — La revista de referencia en Economía" |
| **Descripción** | "Llega a miles de profesionales. Proceso rápido y especialistas expertos en cada área." |
| **CTA** | "Comienza Ahora" |
| **Creativo** | Imagen: Gráficos de crecimiento + Logo REPD |
| **Budget estimado** | R$ 500-800/mes |

**Revista 2: Ciência Agrícola**

| Elemento | Contenido |
|----------|-----------|
| **Público-objetivo** | Agronomistas, veterinarios, investigadores de suelos, productores, profesores agrícola |
| **Edad** | 22-65 años |
| **Ubicación** | Brasil + Latinoamérica (foco en zonas agrícolas) |
| **Intereses** | Agronomía, producción animal, ciencias del suelo, ganadería |
| **Headline** | "Publica tu investigación agrícola en la Revista Ciência Agrícola" |
| **Descripción** | "Alcance nacional e internacional. Para profesionales del campo y academia." |
| **CTA** | "Comienza Ahora" |
| **Creativo** | Imagen: Campo/plantas + Logo revista |
| **Budget estimado** | R$ 500-800/mes |

**Revista 3: Crítica Histórica**

| Elemento | Contenido |
|----------|-----------|
| **Público-objetivo** | Historiadores, archivistas, profesores de historia, humanidades, investigadores de patrimonio |
| **Edad** | 22-65 años |
| **Ubicación** | Brasil + Países de habla hispana |
| **Intereses** | Historia, historiografía, patrimonio, estudios culturales |
| **Headline** | "Publica tus estudios históricos en Revista Crítica Histórica" |
| **Descripción** | "Comunidad de investigadores históricos. Rigor académico y divulgación." |
| **CTA** | "Comienza Ahora" |
| **Creativo** | Imagen: Documentos históricos + Logo revista |
| **Budget estimado** | R$ 500-800/mes |

- [ ] Crear brief para REPD
- [ ] Crear brief para Ciência Agrícola
- [ ] Crear brief para Crítica Histórica
- [ ] Revisar y validar briefs con Ronaldo (UFAL)
- [ ] Documentar en archivo `CRM/ANUNCIOS_BRIEF.md`
- **Responsable:** John (drafts) + Ronaldo (aprobaciones)  
- **Plazo:** 24 de agosto  
- **Tiempo estimado:** 2 horas  

#### 4.2 - Crear Creativos (Imágenes/Textos)

**Para cada revista:**
- [ ] Crear 3 variantes de headlines
- [ ] Crear 3 variantes de descripciones
- [ ] Crear 2-3 variantes de imágenes
- [ ] Testing A/B setup

**Ejemplo de variantes (REPD):**

| Variante | Headline | Descripción | Imagen |
|----------|----------|-------------|--------|
| A | "Publica en REPD — La revista #1 en Economía" | "Alcanza a profesionales de toda América Latina" | Gráficos + datos |
| B | "Tu investigación merece una buena revista" | "REPD es la plataforma que los economistas buscan" | Profesionales trabajando |
| C | "¿Tienes un artículo listo? REPD te está buscando" | "Publicación rápida. Proceso especializado. Comunidad global." | Portadas de revista |

- [ ] Diseñar/obtener imágenes para REPD (3 variantes)
- [ ] Diseñar/obtener imágenes para Ciência Agrícola (3 variantes)
- [ ] Diseñar/obtener imágenes para Crítica Histórica (3 variantes)
- [ ] Validar que todas las imágenes cumplen políticas de Meta
- [ ] Documentar en `CRM/ANUNCIOS_CREATIVOS.md`
- **Responsable:** John + Editor (si hay)  
- **Plazo:** 25 de agosto  
- **Tiempo estimado:** 2 horas  

#### 4.3 - Configurar Campañas en Meta Ads Manager

**Para cada revista:**

- [ ] Crear campaña: "REPD — Lead Generation 2026"
- [ ] Configurar objetivo: **Lead Generation**
- [ ] Budget: R$ 500-800/mes (o según presupuesto cliente)
- [ ] Público: Segmentación por área de investigación
- [ ] Placements: Facebook + Instagram (excepto REPD: solo Facebook)
- [ ] UTM tags: `?utm_source=meta&utm_medium=cpc&utm_campaign=repd`
- [ ] Pixel de seguimiento: Instalar en landing page
- [ ] Frecuencia cap: 3-4 impresiones/persona/día

**Repetir para:**
- [ ] Ciência Agrícola
- [ ] Crítica Histórica

- [ ] Crear todas las campañas en Meta Ads Manager
- [ ] Validar segmentación de públicos
- [ ] Revisar UTM tags en URLs
- [ ] Verificar que pixel está instalado
- [ ] Validar que presupuesto está asignado correctamente
- **Responsable:** John  
- **Plazo:** 25-26 de agosto  
- **Tiempo estimado:** 2 horas  

#### 4.4 - Testing Pre-Lanzamiento

**Testing:**
- [ ] Crear 3 leads de prueba via Meta Ads (1 por revista)
- [ ] Verificar que los datos llegan completos a GHL
- [ ] Verificar que los leads reciben automaciones correctas
- [ ] Revisar conversión end-to-end
- [ ] Validar tiempos de respuesta
- [ ] Revisar que no hay errores de tracking

**Checklist:**
- [ ] Ads se ven correctamente en Facebook/Instagram
- [ ] Links funcionan sin errores
- [ ] Datos se capturan en GHL
- [ ] Tags automáticos se aplican
- [ ] Workflows se disparan correctamente
- [ ] Pixel registra conversiones

- [ ] Ejecutar testing
- [ ] Documentar resultados en `CRM/TEST_ADS.md`
- [ ] Resolver cualquier error encontrado
- **Responsable:** John + Ronaldo (QA)  
- **Plazo:** 26 de agosto  
- **Tiempo estimado:** 2 horas  

#### 4.5 - Aprobación Final y Go-Live

- [ ] Revisar todos los elementos (ads, landing page, formulario, automaciones)
- [ ] Obtener aprobación de Ronaldo (UFAL)
- [ ] Verificar compliance con LGPD
- [ ] Activar campañas en Meta Ads
- [ ] Monitorear primeras 24 horas
- [ ] Documentar fecha/hora de lanzamiento
- **Responsable:** John + Ronaldo (aprobaciones)  
- **Plazo:** 27 de agosto  
- **Tiempo estimado:** 1 hora  

---

### ✅ CHECKLIST FINAL FASE 4

- [ ] ✅ Briefs completados y aprobados (3 revistas)
- [ ] ✅ Creativos diseñados y aprobados (9 variantes totales)
- [ ] ✅ Campañas Meta creadas (3 campañas)
- [ ] ✅ Segmentación configurada correctamente
- [ ] ✅ UTM tags implementados
- [ ] ✅ Pixel de Meta instalado
- [ ] ✅ Testing pre-lanzamiento exitoso
- [ ] ✅ Aprobación de Ronaldo obtenida
- [ ] ✅ Go-Live completado
- [ ] ✅ Primeros leads llegando a GHL

**Estado:** 🔴 Por completar  
**Fecha Estimada de Finalización:** 27 de agosto  

---

## 📊 CHECKLISTS Y VALIDACIONES

### ✅ Checklist General Pre-Lanzamiento

- [ ] GHL configurado y funcional
- [ ] API Integration testeada (5+ escenarios)
- [ ] Automaciones creadas y validadas (4 workflows)
- [ ] Ads en Meta funcionando
- [ ] Landing page responsiva y sin errores
- [ ] Formulario capturando datos correctamente
- [ ] Grupos WhatsApp creados (3)
- [ ] Documentación completada
- [ ] LGPD compliance validado
- [ ] Performance aceptable (< 2s load time)
- [ ] No hay errores JavaScript en console
- [ ] Tracking Google Tag Manager funcionando
- [ ] Backup de configuración realizado
- [ ] Plan de escalamiento documentado

### ✅ Checklist de Seguridad

- [ ] Credenciales de GHL no están en código
- [ ] Tokens de API están en `.env`
- [ ] HTTPS activo en todas las URLs
- [ ] Validación de entrada en formulario
- [ ] No hay inyección SQL o XSS posible
- [ ] LGPD: consentimiento capturado y respetado
- [ ] Datos de contacto encriptados en tránsito
- [ ] Backup automático de leads
- [ ] Logs de acceso disponibles

### ✅ Checklist de Funcionalidad

- [ ] Formulario valida campos requeridos
- [ ] Mensajes de error claros
- [ ] Routing automático a revista correcta
- [ ] Tags se asignan correctamente
- [ ] Workflows disparan en tiempos correctos
- [ ] WhatsApps se envían sin errores
- [ ] Emails se entregan correctamente
- [ ] Links de botones funcionan
- [ ] Redirecciones sin 404s
- [ ] Responsive en mobile/tablet/desktop

---

## 📈 DASHBOARD DE SEGUIMIENTO

### Seguimiento Semanal

```
SEMANA 1 (6-10 Agosto) — FASE 1: Configuración GHL

Tareas Completadas:
□ _____ / 7 tareas

Hitos Alcanzados:
□ GHL accesible
□ Tags creados
□ Pipelines creados
□ Campos personalizados
□ Contacto test
□ API validada
□ Documentación

Blockers:
□ Ninguno
□ [Describir]

Próximos Pasos:
→ Comenzar Fase 2
```

### Seguimiento Mensual

```
MES: AGOSTO 2026

REPD
├─ Leads capturados: _____
├─ Custo/lead: R$ _____
├─ Tags LEAD_QUENTE: _____
├─ Tags LEAD_EDUCACIONAL: _____
└─ Tags LEAD_PARCIAL: _____

Revista Ciência Agrícola
├─ Leads capturados: _____
├─ Custo/lead: R$ _____
├─ Tags LEAD_QUENTE: _____
├─ Tags LEAD_EDUCACIONAL: _____
└─ Tags LEAD_PARCIAL: _____

Revista Crítica Histórica
├─ Leads capturados: _____
├─ Custo/lead: R$ _____
├─ Tags LEAD_QUENTE: _____
├─ Tags LEAD_EDUCACIONAL: _____
└─ Tags LEAD_PARCIAL: _____

TOTAL MÊS
├─ Leads: _____ (Meta: 20/revista)
├─ Custo médio/lead: R$ _____
├─ Taxa conversão: ____%
└─ Status: ✅ OK / ⚠️ Atenção / ❌ Crítico

INCIDENTS/ISSUES
□ [Describir]

NEXT MONTH PLAN
→ [Describir acciones]
```

---

## ⚠️ RIESGOS Y MITIGACIONES

| Risco | Probabilidad | Impacto | Mitigación | Responsable |
|-------|--------------|--------|-----------|-------------|
| GHL API throttling (límite de requests) | Media | Alto | Implementar queue de envíos + retry logic | John |
| Meta Ads política violada (rechaza anuncio) | Media | Alto | Revisar policy docs, tener creativos alternativos listos | John |
| Dominio paralelo no disponible | Baja | Alto | Solicitar acceso DNS oficial anticipadamente a Ronaldo | Ronaldo |
| Número WhatsApp API suspendido | Baja | Crítico | Planificar migración a oficial WhatsApp Business API | John |
| Delays de automaciones no funcionan | Media | Medio | Testing intensivo pre-lanzamiento | John |
| Emails no llegan (SPAM) | Baja | Medio | Validar SPF/DKIM, usar template validados | John |
| Bajo volume de leads | Media | Medio | Optimizar segmentación, ajustar presupuesto, probar creativos nuevos | John |
| LGPD compliance violation | Muy baja | Crítico | Auditar política privacidad, obtener consentimientos explícitos | Ronaldo + John |

---

## 🚀 PRÓXIMOS PASOS POST-LANZAMIENTO (FASE 5)

**Operación Contínua (Semanas 6+):**

- [ ] Monitoreo diario de leads y conversiones
- [ ] Reportes semanales de performance
- [ ] Optimización de ads según CTR/CPC
- [ ] Publicación de contenido en grupos WhatsApp (2-3x/semana)
- [ ] Follow-up de leads educacionales
- [ ] Reuniones mensuales con Ronaldo
- [ ] Ajuste de presupuesto según ROI

---

## 📝 APROBACIONES Y FIRMAS

**Este documento requiere aprobación de:**

- [ ] John Jairo Garcia Arcentales (Técnica)  
  *Fecha:* _______________  
  *Firma:* _______________

- [ ] Ronaldo Ferreira de Araujo (UFAL)  
  *Fecha:* _______________  
  *Firma:* _______________

---

## 📞 CONTACTOS Y ESCALACIONES

| Rol | Nombre | Email | WhatsApp | Disponibilidad |
|-----|--------|-------|----------|-----------------|
| **Lead Técnico** | John Jairo | john@artificialctrl.com.br | +55 85 9XXXX-XXXX | Lun-Vie 8h-18h |
| **Coordinador Cliente** | Ronaldo Ferreira | ronaldo.ferreira@ufal.edu.br | +55 82 9XXXX-XXXX | Lun-Vie 8h-17h |
| **Soporte GHL** | [A designar] | support@ghl.com | - | 24/7 |

---

**Versión del Documento:** 1.0  
**Fecha de Creación:** 6 de Agosto de 2026  
**Última Actualización:** 6 de Agosto de 2026  
**Estado:** 🔴 POR INICIAR  

---

*Documento: PDR — Integración GHL + Generación de Pesquisadores*  
*Proyecto: Conecta Pesquisadores UFAL*  
*Contrato: FAPEAL Protocolo 60030.0000001814/2024*
