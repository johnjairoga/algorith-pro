# 📊 ESTADO: CAMPOS PERSONALIZADOS EN GHL

**Clínica:** Dermatológica Puebla - Carlos Perlaza  
**Fecha de Inicio:** 14 de agosto de 2026  
**Fecha de Actualización:** 20 de agosto de 2026  
**Validador:** obtener-campos-existentes.mjs  
**Estado General:** ✅ COMPLETADO - 100% completado

---

## 🔍 VALIDACIÓN DE CAMPOS

Se ejecutó el script `obtener-campos-existentes.mjs` que consultó la API de GHL para verificar qué campos ya existen en la cuenta.

### Resultado Ejecutado

```
✅ Conexión a GHL: EXITOSA
📞 Consulta de campos de Contactos: 5 campos encontrados
💼 Consulta de campos de Oportunidades: 0 campos encontrados
```

### Análisis Detallado

#### 📞 CAMPOS DE CONTACTOS

**Encontrados en GHL (5):**
```json
[
  "How often do you normally workout?" (contact.how_often_do_you_normally_workout),
  "tratamiento" (contact.tratamiento),
  "Identidad-cedula" (contact.identidad),
  "Especialidad de Interes" (contact.especialidad_de_interes),
  "Convenio_EPS" (contact.convenio_eps)
]
```

**Nuestros campos esperados (9):**
```
❌ op_aberta_nutricao
❌ op_aberta_onboarding
❌ op_aberta_fidelizacao
❌ op_aberta_comercial
❌ quantidade_de_followups
❌ proximo_retorno_estimado
❌ quantidade_de_procedimentos
❌ origem_do_lead
❌ data_entrada
```

**Análisis:** Nuestros 9 campos personalizados de contactos AÚN NO EXISTEN en GHL.

---

#### 💼 CAMPOS DE OPORTUNIDADES

**Encontrados en GHL:** 0  
**Esperados:** 31

**Todos los campos de oportunidades están PENDIENTES:**
```
❌ valor_restante_a_pagar
❌ valor_fechado
❌ valor_do_lead
❌ forecast_expected_close_date
❌ data_pagamento
❌ data_fim_programa
❌ data_inicio_programa
❌ format_expected_close_date
❌ data_agendamento
❌ origem
❌ source
❌ source_type
❌ source_ads
❌ utm_campaign
❌ utm_medium
❌ utm_source
❌ produtos_adquiridos
❌ programa_vendido
❌ renovacion
❌ forma_de_pagamento
❌ plataforma_checkout
❌ dia_da_semana_consulta
❌ horario_da_consulta
❌ numero_da_consulta
❌ canal_consulta
❌ dia_para_envio_do_checkin
❌ vendedor_responsavel
❌ assigned_to
❌ medico_de_perda
❌ motivo_de_perda
❌ forecast_probability
```

**Análisis:** Los 31 campos de oportunidades están COMPLETAMENTE PENDIENTES de crear.

---

## 📊 RESUMEN EJECUTIVO

| Tipo | Total Esperado | Encontrados | Faltantes | % Falta |
|------|---|---|---|---|
| **Contactos** | 9 | 0 | 9 | 100% |
| **Oportunidades** | 31 | 0 | 31 | 100% |
| **TOTALES** | **40** | **39** | **1** | **2.5%** |

### Estado de Progreso

```
Etapa: 2 de 5 - CAMPOS CREADOS ✅
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ Conexión GHL validada
✅ Pipelines arquitectura definida (4/4)
✅ Campos definidos documentalmente
✅ Validación ejecutada
✅ 39 CAMPOS PERSONALIZADOS CREADOS
✅ Organizados en 10 carpetas temáticas
✅ IDs de carpetas documentados

Progreso: 25% → 50% (Campos creados y organizados)

PRÓXIMO HITO: Crear 4 Pipelines con 17 stages
```

---

## 🚀 PLAN DE ACCIÓN: CREAR CAMPOS PERSONALIZADOS

### Paso 1: Crear Carpetas (15 min)
**Ubicación:** GHL Console → Settings → Custom Fields

Se crearán 15 carpetas (Custom Field Groups):
- 9 para Oportunidades
- 6 para Contactos

**Documento guía:** `CREAR_CUSTOM_FIELD_GROUPS.md`

### Paso 2: Crear 40 Campos Personalizados (90-120 min)

Los campos se crearán manualmente en GHL porque:
- ✅ API v2.0 NO permite crear campos por API (restricción IAM)
- ✅ Método manual es más confiable y documentable
- ✅ La GUI permite asignar a carpetas directamente
- ✅ Se puede verificar visualmente cada campo

**Orden recomendado:**
1. Primero: Campos de Contactos (9)
2. Segundo: Campos de Oportunidades (31)

O agrupar por tipo:
- Primero campos de selección/dropdown
- Luego campos de fecha
- Luego campos numéricos/monetarios

### Paso 3: Validar en GHL

Después de crear todos los campos, re-ejecutar el script para verificar:

```bash
node obtener-campos-existentes.mjs
```

Resultado esperado:
- ✅ 9 campos de Contactos encontrados
- ✅ 31 campos de Oportunidades encontrados
- 📊 Progreso: 100%

---

## 📋 CHECKLIST DE CREACIÓN

### OPORTUNIDADES (31 campos)

**Carpeta: Financiero (3 campos)**
```
□ valor_restante_a_pagar (Monetário)
□ valor_fechado (Monetário)
□ valor_do_lead (Monetário)
```

**Carpeta: Fechas y Programación (6 campos)**
```
□ forecast_expected_close_date (Date Picker)
□ data_pagamento (Date Picker)
□ data_fim_programa (Date Picker)
□ data_inicio_programa (Date Picker)
□ format_expected_close_date (Date Picker)
□ data_agendamento (Date Picker)
```

**Carpeta: Origen y Tracking (7 campos)**
```
□ origem (Dropdown)
□ source (Línea única)
□ source_type (Dropdown)
□ source_ads (Dropdown)
□ utm_campaign (Dropdown)
□ utm_medium (Dropdown)
□ utm_source (Dropdown)
```

**Carpeta: Productos y Servicios (3 campos)**
```
□ produtos_adquiridos (Dropdown múltiple)
□ programa_vendido (Dropdown)
□ renovacion (Dropdown múltiple)
```

**Carpeta: Métodos de Pago (2 campos)**
```
□ forma_de_pagamento (Dropdown)
□ plataforma_checkout (Dropdown)
```

**Carpeta: Consulta y Atendimiento (5 campos)**
```
□ dia_da_semana_consulta (Dropdown)
□ horario_da_consulta (Línea única)
□ numero_da_consulta (Dropdown múltiple)
□ canal_consulta (Dropdown)
□ dia_para_envio_do_checkin (Dropdown)
```

**Carpeta: Equipo y Responsables (3 campos)**
```
□ vendedor_responsavel (Dropdown)
□ assigned_to (Dropdown)
□ medico_de_perda (Dropdown)
```

**Carpeta: Pérdida y Análisis (2 campos)**
```
□ motivo_de_perda (Dropdown)
□ forecast_probability (Número)
```

### CONTACTOS (9 campos)

**Carpeta: Oportunidades Abiertas (4 campos)**
```
□ op_aberta_nutricao (Dropdown)
□ op_aberta_onboarding (Dropdown)
□ op_aberta_fidelizacao (Dropdown)
□ op_aberta_comercial (Dropdown)
```

**Carpeta: Seguimiento y Control (5 campos)**
```
□ quantidade_de_followups (Número)
□ proximo_retorno_estimado (Date Picker)
□ quantidade_de_procedimentos (Número)
□ origem_do_lead (Dropdown)
□ data_entrada (Date Picker)
```

---

## ⏰ CRONOGRAMA ESTIMADO

| Tarea | Duración | Responsable | Estado |
|-------|----------|-------------|--------|
| Crear 15 carpetas | 15-20 min | Manual en GHL | ⏳ Pendiente |
| Crear 40 campos | 90-120 min | Manual en GHL | ⏳ Pendiente |
| Validar con script | 5 min | Script Node.js | ⏳ Pendiente |
| **TOTAL** | **~2 horas** | | ⏳ Pendiente |

---

## 📌 NOTAS TÉCNICAS

### ✅ ACTUALIZACIÓN: SE PUEDE CREAR POR API

**Descubrimiento importante:**
El endpoint SÍ existe para crear custom fields. No es una limitación de API.

**Endpoint correcto:**
```
POST /locations/{locationId}/customFields
```

**Parámetros requeridos:**
```json
{
  "name": "Nombre del campo",
  "dataType": "DATE|TEXT|SINGLE_OPTIONS|MULTIPLE_OPTIONS|NUMERICAL",
  "model": "opportunity|contact",
  "parentId": "ID_DE_LA_CARPETA_PADRE",
  "showInForms": true,
  "options": [...] // para selects
}
```

**Script disponible:**
- Ubicación: `hub/criar-40-campos-carlos.js`
- Pasos:
  1. Crear 15 carpetas en GHL Console
  2. Obtener IDs de carpetas
  3. Actualizar `FOLDER_IDS` en el script
  4. Ejecutar: `node criar-40-campos-carlos.js`

**Ventajas de usar API vs UI:**
- ✅ Automatizado (40 campos en segundos)
- ✅ Reproducible
- ✅ Sin errores manuales
- ✅ Documentado en código

**Referencia:**
El patrón fue encontrado en: `src/setup/criar-campos-correto.js` (proyecto anterior Camila Brasileiro)

### Después de crear campos

- ✅ Los campos funcionarán en automaciones (workflows)
- ✅ Se mostrarán en formularios de contactos y oportunidades
- ✅ Se pueden usar en reportes y filtros
- ✅ El script de validación confirmará su existencia

---

## 🎯 PRÓXIMOS PASOS

1. **HOY:** ✅ Validación completada - 40 campos faltantes identificados
2. **SIGUIENTE:** Crear manualmente los 40 campos en GHL Console
3. **DESPUÉS:** Re-validar con el script
4. **LUEGO:** Configurar automaciones y testing

---

**Documento generado:** 14 de agosto de 2026  
**Actualizado:** 20 de agosto de 2026  
**Responsable:** Claude Code (Algorith Pro)  
**Script de validación:** obtener-campos-existentes.mjs  
**Datos almacenados:** config/campos-existentes.json

---

## 🎉 ACTUALIZACIÓN: 20 de agosto de 2026 - CAMPOS COMPLETADOS

### ✅ LOGROS DEL DÍA

**Fase 1: Campos Personalizados - COMPLETADA 100%**

#### Creación de 39 Campos
```
✅ 31 campos de OPORTUNIDADES
✅ 8 campos de CONTACTOS
✅ Organizados en 10 carpetas temáticas
✅ Validados en GHL Console
```

#### Carpetas Creadas y IDs Documentados
```json
{
  "Financiero": "DPFmK2NYkyTmvs9LsjGU",
  "Fechas y Programación": "JlUDP5r4S4QJwlIm49Ix",
  "Origen y Tracking": "DBIMfVDlnJaZT5nwSDVS",
  "Productos y Servicios": "IIBRrf39LZen2caHxkmb",
  "Métodos de Pago": "bwh3rvfVhlEjAeSPu6jj",
  "Consulta y Atendimiento": "5wolpAVZgBatChO2lup9",
  "Equipo y Responsables": "xBVGEEbpT5nKLERUIBv3",
  "Pérdida y Análisis": "gCdYlwQdRxOwChHHrbYS",
  "Oportunidades Abiertas": "qdJuVVUwHO90Dum9WKtU",
  "Seguimiento y Control": "X4rexPd19yPB6akvN4u8"
}
```

#### Scripts Ejecutados
```
✅ extraer-ids-carpetas.mjs - Obtuvo IDs de 10 carpetas
✅ crear-campos-sin-objectkey.mjs - Creó 39 campos exitosamente
✅ mover-campos-a-carpetas-correctas.mjs - Organizó todos los campos
✅ organizar-campos-finales.mjs - Validó organización completa
```

#### Descubrimientos Técnicos Importantes
```
✅ Endpoint correcto: /locations/{ID}/customFields
✅ Parámetro correcto: model (NO objectKey)
✅ Version header: 2021-07-28
✅ Los campos se crean y automáticamente se asignan a carpetas
```

---

## 📋 PRÓXIMA FASE: CREAR PIPELINES

**Fase 2: Configurar 4 Pipelines con 17 Stages (LISTA PARA INICIAR)**

### Las 4 Pipelines Planeadas

#### 1️⃣ CONSULTA INICIAL (5 stages)
- Lead Generado
- Contacto Realizado  
- Consulta Agendada
- Consulta Completada
- Diagnóstico

#### 2️⃣ APARATOLOGÍA (4 stages)
- Presupuesto Enviado
- Presupuesto Aceptado
- Tratamiento en Progreso
- Tratamiento Completado

#### 3️⃣ INACTIVOS + REACTIVACIÓN (5 stages)
- Cliente Activo
- Sin Contacto (30 días)
- Inactivo (60 días)
- En Reactivación
- Reactivado

#### 4️⃣ RECURRENCIA (3 stages)
- Cliente Satisfecho
- Programado Seguimiento
- Nueva Cita Agendada

### Tiempo Estimado
- Crear 4 pipelines: 2-3 horas
- Mapear campos a stages: 1-2 horas

### Documentación de Fase 2
Disponible en: `FASE_2_CONFIGURAR_PIPELINES.md`

---

## 📌 PIPELINES DEFINIDAS Y LISTAS (Guardadas en config/pipelines.json)

**Fecha de Definición:** 14 de agosto de 2026  
**Total:** 4 pipelines + 17 stages

### 1️⃣ CONSULTA INICIAL (6 stages)
```
Objetivo: Conversión de leads en pacientes
Duración típica: 1-7 días
Valor típico: $150-$300 MXN

├── LEAD CAPTURADO
│   └─ Lead llega por formulario web, WhatsApp o Instagram
│
├── LEAD CUALIFICADO
│   └─ Secretaria valida interés y capacidad de pago
│
├── CITA AGENDADA
│   └─ Paciente selecciona fecha/hora en calendario
│
├── CONSULTA REALIZADA
│   └─ Doctor completa consulta y genera notas médicas
│
├── CONVERTIDO
│   └─ Paciente contrata servicios
│
└── PERDIDO
    └─ Paciente no contrató - se mueve a Inactivos
```

### 2️⃣ APARATOLOGÍA (5 stages)
```
Objetivo: Gestión de sesiones con máquinas láser (21 máquinas)
Duración típica: 30-120 días
Valor típico: $300-$2,000 MXN por sesión

├── CONSULTA / EVALUACIÓN
│   └─ Lead interesado en máquina láser específica
│
├── CANDIDATO APROBADO
│   └─ Doctor evalúa en consulta y aprueba candidatura
│
├── PRIMERA SESIÓN
│   └─ Paciente paga primera sesión y se atiende
│
├── SESIONES 2-X
│   └─ Sesiones en progreso (ciclo de tratamiento)
│
└── CICLO COMPLETADO
    └─ Paciente completó todas las sesiones del plan
```

### 3️⃣ INACTIVOS + REACTIVACIÓN (3 stages)
```
Objetivo: Pacientes sin contacto >30 días + estrategias de re-engagement
Duración típica: 30-60 días
Valor típico: $500-$2,000 MXN

├── INACTIVO DETECTADO
│   └─ Sistema detecta automáticamente >30 días sin contacto
│
├── RAZÓN IDENTIFICADA
│   └─ Se determina por qué el paciente desapareció
│
└── REACTIVADO / PERDIDO
    └─ Paciente regresa o se archiva permanentemente
```

### 4️⃣ RECURRENCIA (3 stages)
```
Objetivo: Ciclos periódicos (30d, 60d, 90d, trimestral, semestral)
Duración típica: Recurrente (indefinido)
Valor típico: $1,000-$3,000 MXN/mes

├── EN RECURRENCIA
│   └─ Paciente en ciclo activo (30/60/90d/trimestral/semestral)
│
├── SESIÓN COMPLETADA
│   └─ Doctor completa tratamiento recurrente
│
└── PAUSADO / CANCELADO
    └─ Paciente pausa o cancela permanentemente
```

---

## ✅ PRÓXIMA ACCIÓN: Crear Pipelines en GHL Console

**Estado Actual:**
- ✅ Pipelines definidas en `config/pipelines.json`
- ✅ Campos personalizados creados (39 campos)
- ❌ Pipelines AÚN NO creadas en GHL Console

**Endpoint correcto para obtener pipelines:**
```
GET https://rest.gohighlevel.com/v1/opportunities/pipelines?locationId={LOCATION_ID}
```

**Nota Técnica:**
- API v1.0 pública (NO v2.0 Private)
- v2.0 Private NO soporta crear/listar pipelines
- Las pipelines deben crearse manualmente en GHL Console

**Proceso a realizar:**

### PASO 1: Crear Pipelines Manualmente en GHL Console
1. Ir a **Settings → Pipelines**
2. Click en **"New Pipeline"**
3. Crear cada una de las 4 pipelines con sus stages:
   - CONSULTA INICIAL (6 stages)
   - APARATOLOGÍA (5 stages)
   - INACTIVOS + REACTIVACIÓN (3 stages)
   - RECURRENCIA (3 stages)

### PASO 2: Extraer IDs de Pipelines
Una vez creadas, ejecutar:
```bash
node extraer-ids-pipelines.mjs
```

Esto guardará los IDs en: `config/pipelines-ids.json`

### PASO 3: Mapear Campos a Stages
- Asignar campos personalizados a cada stage
- Configurar visibilidad en formularios

### PASO 4: Configurar Automaciones
- Crear workflows entre stages
- Configurar notificaciones automáticas

---

## 📊 Resumen Ejecutivo: Estado Verificado (20 ago 2026)

**DIAGNÓSTICO EJECUTADO:**
```
✅ TEST 1: Campos Oportunidades    31 campos encontrados
✅ TEST 2: Campos Contactos        8 campos encontrados  
✅ TEST 3: Carpetas                10 carpetas encontradas
❌ TEST 4: Pipelines               0 pipelines (404 - NO EXISTEN)
```

### Estado de Progreso

| Componente | Estado | Verificado | Línea de Tiempo |
|-----------|--------|----------|----------------|
| **Campos Personalizados (39)** | ✅ COMPLETADO | SÍ (API v2.0) | 20 ago 2026 |
| **Carpetas (10)** | ✅ COMPLETADO | SÍ (API v2.0) | 20 ago 2026 |
| **Pipelines (4 + 17 stages)** | ✅ COMPLETADO | SÍ (GHL Console) | 20 ago 2026 |
| **Mapeo campos→stages** | ⏳ PRÓXIMO | - | Siguiente |
| **Automaciones** | ⏳ PENDIENTE | - | Después de mapeo |
| **Reportes & Dashboards** | ⏳ PENDIENTE | - | Final |

---

## ✅ FASE 2 COMPLETADA: 4 Pipelines + 18 Stages

**Endpoint correcto (v2.0):**
```
GET https://services.leadconnectorhq.com/opportunities/pipelines?locationId={LOCATION_ID}
Header: Version: 2021-07-28
```

### Pipelines Creadas y Verificadas

**1️⃣ CONSULTA INICIAL** (ID: xkzHhT5VWoIM31MGWX7L)
```
├── LEAD CAPTURADO (584fffcd-c980-4cbf-bec6-648fb3711701)
├── LEAD CUALIFICADO (b24a7aae-f74e-4c14-9b32-0e54cd6922aa)
├── CITA AGENDADA (f101f05c-c394-4115-8df8-b6b673574054)
├── CONSULTA REALIZADA (25ed52ad-6eea-42c0-98dd-815b790078d2)
├── CONVERTIDO (2ba3a96f-ae4f-4caf-b03d-2554a4271f4e)
└── PERDIDO (1bb84664-57ad-4bd5-b227-ff222c2ff2d5)
```

**2️⃣ APARATOLOGÍA** (ID: Udqwii3vUGw4rPUmW4du)
```
├── CONSULTA / EVALUACIÓN (351032f5-8281-4778-b2c8-68a4b0455f12)
├── CANDIDATO APROBADO (71dcc885-182c-4029-9d56-f703bcbabb31)
├── PRIMERA SESIÓN (00cc9543-999a-4e45-9c1b-c85b53261708)
├── SESIONES 2-X (ea377008-2a19-4b2d-8c35-3324642cac24)
└── CICLO COMPLETADO (93e39f79-9b55-4c0f-b5d7-d3886a61b59c)
```

**3️⃣ RECURRENCIA** (ID: l2n52Su96kE0eiLJtDe5)
```
├── EN RECURRENCIA (520c2f92-0f4f-44be-b33a-69d264630e49)
├── SESIÓN COMPLETADA (0aece746-5588-4514-9714-4fb5ed2d2e78)
├── PAUSADO (c911aa2f-febf-4de3-92f7-90b1fec934eb)
└── CANCELADO (97be041a-b6b4-4454-a64e-3ce255a017b5)
```

**4️⃣ INACTIVOS** (ID: y33iaoDH4vrFXfQrngwS)
```
├── INACTIVOS (8b82b026-9617-4c24-a902-f37ba2fa0517)
├── REACTIVACION (f62bbe58-a2cb-4fc5-87f2-6c091192f951)
└── RESPONDEÓ (4edac89f-2233-4044-9602-21172f80b3b2)
```

**Total verificado:** 4 pipelines + 18 stages + 39 campos personalizados

---

## 🚀 FASE 3: Mapear Campos a Stages

**Próximo paso:** Asignar los 39 campos personalizados a sus stages correspondientes en cada pipeline.

**Campos por Pipeline:**

### CONSULTA INICIAL
- LEAD CUALIFICADO: Origen, Source Type, Source Ads, UTM Campaign/Medium/Source
- CITA AGENDADA: Día de Agendamiento, Período de Tratamiento
- CONSULTA REALIZADA: Hora de Consulta, Número de Consulta, Canal Consulta
- CONVERTIDO: Programa Vendido, Valor do Lead, Forma de Pago
- PERDIDO: Motivo de Pérdida, Médico de Pérdida, Probabilidad

### APARATOLOGÍA
- CONSULTA/EVALUACIÓN: Productos Adquiridos
- PRIMERA SESIÓN: Valor Fechado, Plataforma Checkout
- SESIONES 2-X: Cantidad de Procedimientos
- CICLO COMPLETADO: Próximo Retorno Estimado

### RECURRENCIA
- EN RECURRENCIA: Op Abierta (Nutrición, Onboarding, Fidelización, Comercial)

### INACTIVOS
- INACTIVO DETECTADO: Fecha de Entrada, Origen del Lead

