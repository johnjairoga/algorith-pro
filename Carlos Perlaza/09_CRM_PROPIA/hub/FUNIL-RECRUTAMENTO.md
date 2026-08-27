# Funil de Recrutamiento y Selección de Professores

**Cliente:** Personal Geronto (Camila Brasileiro)  
**Objetivo:** Estructurar el reclutamiento de personales trainers con triagem automática y entrevista con Camila  
**Estado:** 🚧 En construcción  
**Fecha inicio:** 29/07/2026

---

## 📊 VISIÓN GENERAL

```
CANDIDATO SE INSCRIBE
        ↓
[FORMULARIO WEB]
        ↓
DATOS ENVIADOS A GHL
        ↓
[WORKFLOW TRIAGEM AUTOMÁTICA]
├─ Calcula SCORE (experiencia + certificaciones + disponibilidad)
├─ Agrega TAGS automáticas
├─ Completa CAMPOS
└─ Envía confirmación por WhatsApp
        ↓
GHL PIPELINE: "Recrutamiento de Professores"
└─ Estado: "Triagem realizada"
        ↓
[DASHBOARD PARA CAMILA]
├─ Ve candidatos pendientes
├─ Califica y comenta
└─ Agenda entrevistas
        ↓
ENTREVISTA CON CAMILA
        ↓
APROBACIÓN O RECHAZO
        ↓
[ONBOARDING O NOTIFICACIÓN]
```

---

## 🎯 PIPELINE EN GHL: "Recrutamiento de Professores"

**ID en GHL:** `Nj8K1Cc6sLMtmFIQioG9`

### Estágios:

| # | Estado | Descripción |
|---|--------|-------------|
| 1 | Candidato inscrito | Lead del anuncio (Facebook, Instagram, etc) |
| 2 | Triagem realizada | Scoring automático completado |
| 3 | Entrevista agendada | Cita con Camila confirmada |
| 4 | Entrevista realizada | Conversa con Camila finalizada |
| 5 | Aprobado | Contratado, onboarding iniciado |
| 6 | Reprobado | No seleccionado |

---

## 📋 CAMPOS PERSONALIZADOS NECESARIOS

### Para el Formulario de Inscripción:

```
CAMPOS DE ENTRADA (que llena el candidato):
├── vaga_aplicada: "Personal Trainer Domiciliar" (select)
├── experiencia_anos: "5-10 años" (select)
├── certificacoes: "CREF ativo" (select)
└── disponibilidade: "Flexible (mañana + tarde)" (text)

CAMPOS GENERADOS AUTOMÁTICAMENTE (por workflow):
├── score_triagem: 85 (number) ← Calculado automáticamente
├── resumo_candidato: "10 años XP, CREF ativo..." (text) ← Auto-generado
├── data_triagem: 29/07/2026 (date) ← Fecha automática
├── data_entrevista: (date) ← Llenado por Camila
├── notas_entrevista: (text) ← Llenado por Camila
└── motivo_rechazo: (text) ← Si es rechazado
```

### Opciones de Select:

**vaga_aplicada:**
- Personal Trainer Domiciliar
- Personal Trainer Academia
- Trainer Presencial
- Otro

**experiencia_anos:**
- Menos de 2 años
- 2-5 años
- 5-10 años
- Más de 10 años

**certificacoes:**
- CREF ativo
- CREF vencido
- Sin CREF
- Otras certificaciones

---

## 🏷️ TAGS NECESARIAS

### Para segmentación de candidatos:

```
candidato-personal          (tag base para todos los candidatos)
pendiente-triagem           (aún no evaluados)
candidato-aprobado-preliminar (score >= 80)
candidato-score-medio       (score 60-79)
candidato-score-bajo        (score < 60)
candidato-aprobado          (aprobado por Camila)
candidato-reprobado         (rechazado)
entrevista-agendada         (cita confirmada)
entrevista-realizada        (conversa completada)
onboarding-iniciado         (contratado, en formación)
```

---

## ⚙️ WORKFLOW DE TRIAGEM AUTOMÁTICA

**Nombre:** "Triagem Automática de Candidatos"  
**Trigger:** Nuevo contacto creado en estado "Candidato inscrito"

### LÓGICA DEL SCORING:

```
SCORE TOTAL = (Exp × 0.4) + (Cert × 0.3) + (Disp × 0.3)

EXPERIENCIA (40%):
├─ Menos de 2 años → 20 puntos
├─ 2-5 años → 50 puntos
├─ 5-10 años → 75 puntos
└─ Más de 10 años → 100 puntos

CERTIFICACIONES (30%):
├─ Sin CREF → 0 puntos
├─ CREF vencido → 30 puntos
├─ Otras certificaciones → 50 puntos
└─ CREF ativo → 100 puntos

DISPONIBILIDAD (30%):
├─ Solo fines de semana → 30 puntos
├─ Solo tarde/noche → 60 puntos
├─ Flexible (mañana + tarde) → 100 puntos
└─ Full-time → 100 puntos
```

### ACCIONES DEL WORKFLOW:

1. **Leer datos del formulario**
   - experiencia_anos
   - certificacoes
   - disponibilidade

2. **Calcular score** (según fórmula arriba)
   - Guardar en campo `score_triagem`

3. **Agregar tags automáticas**
   - `candidato-personal` (siempre)
   - `candidato-aprobado-preliminar` si score >= 80
   - `candidato-score-medio` si score 60-79
   - `candidato-score-bajo` si score < 60

4. **Generar resumen automático**
   - Llenar `resumo_candidato` con datos formateados
   - Ej: "10 años XP, CREF ativo, disponible flexible"

5. **Registrar fecha de triagem**
   - Guardar `data_triagem` = hoy

6. **Cambiar estado**
   - Mover a estado "Triagem realizada"

7. **Notificar al candidato**
   - Enviar WhatsApp:
     ```
     ✅ Recibimos tu CV!
     📊 Tu Score: 85/100
     ⏱️ Próxima etapa: Entrevista con Camila
     📞 Te contactaremos pronto para agendar
     ```

8. **Notificar a Camila**
   - Email: "Nuevo candidato (Score: 85) listo para entrevista"
   - Dashboard en tiempo real

---

## 📝 FORMULARIO DE INSCRIPCIÓN

### Ubicación: 
`https://personalgeronto.triadeflow.com.br/recrutamento`

### Campos Visibles:

```
Buscamos Personales Trainers
═════════════════════════════

Información Personal:
┌─────────────────────────────┐
│ Nombre Completo: [_________] │
│ Email: [_____@__________]    │
│ Teléfono: [(85) 9_____-___] │
└─────────────────────────────┘

Posición:
┌─────────────────────────────┐
│ ¿Qué posición te interesa?  │
│ ○ Personal Domiciliar       │
│ ○ Personal Academia         │
│ ○ Trainer Presencial        │
│ ○ Otro                      │
└─────────────────────────────┘

Experiência:
┌─────────────────────────────┐
│ ¿Cuántos años de experiencia│
│ como personal trainer?       │
│ ○ Menos de 2 años           │
│ ○ 2-5 años                  │
│ ○ 5-10 años                 │
│ ○ Más de 10 años            │
└─────────────────────────────┘

Certificaciones:
┌─────────────────────────────┐
│ ¿Tienes CREF?              │
│ ○ Sí, CREF ativo (Nº: [__])│
│ ○ Sí, pero vencido          │
│ ○ No tengo CREF            │
│ ○ Tengo otras certifics    │
└─────────────────────────────┘

Disponibilidad:
┌─────────────────────────────┐
│ ¿Cuándo puedes trabajar?   │
│ ☑ Mañana (9h-12h)           │
│ ☑ Tarde (14h-18h)           │
│ ☐ Noche (19h-22h)           │
│ ☐ Fines de semana           │
│ → Resultado: "Flexible"     │
└─────────────────────────────┘

[ENVIAR CANDIDATURA]
```

### Integración con GHL:
- Form enviado → webhook → GHL crea contacto
- Datos guardados en campos personalizados
- Workflow se dispara automáticamente

---

## 📊 DASHBOARD PARA CAMILA

### Vista en GHL:

```
RECRUTAMIENTO → Candidatos Pendientes
════════════════════════════════════════

[Filter por Score] [Filter por Status]

📌 João Silva              Score: 85/100 ✅
   └─ 10 años XP, CREF ativo, flexible
   └─ Triagem: 29/07/2026
   └─ [AGENDAR ENTREVISTA] [VER DETALLES]

📌 Maria Santos            Score: 62/100 ⚠️
   └─ 5 años XP, CREF pendiente
   └─ Triagem: 29/07/2026
   └─ [AGENDAR ENTREVISTA] [VER DETALLES]

📌 Carlos Oliveira         Score: 35/100 ❌
   └─ Sin experiencia
   └─ Triagem: 29/07/2026
   └─ [AGENDAR ENTREVISTA] [RECHAZAR]

═══════════════════════════════════════════

ESTADÍSTICAS:
├─ Candidatos pendientes: 3
├─ Score promedio: 61/100
├─ Aprobados preliminar (80+): 1
├─ Entrevistas agendadas: 0
└─ Aprobados finales: 0
```

---

## 📞 FLUJO DE ENTREVISTA

### Paso 1: Agendar

```
Camila en Dashboard:
├─ Click: [AGENDAR ENTREVISTA]
├─ Elige fecha/hora
└─ AUTOMÁTICO:
   ├─ Candidato recibe confirmación WhatsApp
   ├─ Recordatorio 24h antes
   ├─ Estado en GHL: "Entrevista agendada"
   └─ Tag agregada: "entrevista-agendada"
```

### Paso 2: Entrevista

```
Camila entrevista al candidato
├─ Presencial o virtual (Meet)
├─ Evalúa: experiencia, didáctica, valores
└─ Documenta en GHL:
   ├─ Notas de entrevista
   ├─ Evaluación (comentarios)
   └─ Decisión: [APROBAR] o [RECHAZAR]
```

### Paso 3: Aprobación

**SI APROBADO:**
```
Camila: [APROBAR]
        ↓
AUTOMÁTICO:
├─ Estado → "Aprobado"
├─ Tags: +candidato-aprobado, -pendiente
├─ Move a pipeline: "Onboarding Professores"
├─ Envía WhatsApp:
│   "🎉 ¡Felicidades! Fuiste seleccionado!
│    📋 Próximos pasos:
│    1. Firma de contrato (ZapSign)
│    2. Datos bancarios (para comisión)
│    3. Onboarding"
└─ Notifica a Camila
```

**SI REPROBADO:**
```
Camila: [RECHAZAR]
        ↓
AUTOMÁTICO:
├─ Estado → "Reprobado"
├─ Tags: +candidato-reprobado, -pendiente
├─ Opción: guardar motivo en "motivo_rechazo"
├─ Envía WhatsApp:
│   "Gracias por candidatar! 👋
│    Infelizmente no podemos continuar.
│    ¡Éxito en tu carrera! 🍀"
└─ Archivo: guardado para futuro
```

---

## 🚀 PRÓXIMOS PASOS (IMPLEMENTACIÓN)

### Fase 1: Setup en GHL (HOY)
- [ ] Crear campos personalizados vía API
- [ ] Crear tags vía API
- [ ] Crear Workflow de triagem automática

### Fase 2: Frontend (Formulario)
- [ ] Crear formulario HTML en site
- [ ] Integrar con webhook de GHL
- [ ] Testear envío de datos

### Fase 3: Testing
- [ ] Test completo: Formulario → Score → Dashboard
- [ ] Validar cálculo de scoring
- [ ] Verificar automaciones

### Fase 4: Go Live
- [ ] Compartir link con candidatos
- [ ] Monitorear primeros candidatos
- [ ] Ajustar según feedback de Camila

---

## 📞 REFERENCIAS

- Pipeline GHL: Recrutamiento de Professores (ID: Nj8K1Cc6sLMtmFIQioG9)
- Campos config: `hub-triadeflow/config/custom-fields.json`
- Tags config: `hub-triadeflow/config/tags.json`
- Cliente GHL: `hub-triadeflow/src/lib/ghl-client.js`

---

**Estado:** 🚧 En construcción  
**Último update:** 29/07/2026
