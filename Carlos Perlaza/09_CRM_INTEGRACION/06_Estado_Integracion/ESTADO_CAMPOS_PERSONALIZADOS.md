# 📊 ESTADO: CAMPOS PERSONALIZADOS EN GHL

**Clínica:** Dermatológica Puebla - Carlos Perlaza  
**Fecha de Validación:** 14 de agosto de 2026  
**Validador:** obtener-campos-existentes.mjs  
**Estado General:** ⏳ PENDIENTE - 0% completado

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
| **TOTALES** | **40** | **0** | **40** | **100%** |

### Estado de Progreso

```
Etapa: 1 de 4 - PREPARACIÓN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ Conexión GHL validada
✅ Pipelines creados (4/4)
✅ Campos definidos documentalmente
✅ Validación ejecutada
❌ Campos personalizados AÚN SIN CREAR

Progreso: 20% → 25% (con validación)

PRÓXIMO HITO: Crear 40 campos + 15 carpetas
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

### Por qué se crean manualmente en GHL

1. **Limitación API v2.0:** Los endpoints de custom fields en GHL API v2.0 son **solo lectura** para la mayoría de casos (restricción IAM)
2. **Alternativa desechada:** Intentar crear por API retorna 401/403
3. **Solución:** Crear en GHL Console (UI) que tiene permisos completos
4. **Ventaja:** La GUI permite:
   - Asignar directamente a carpetas mientras se crean
   - Ver preview del campo inmediatamente
   - Configurar opciones avanzadas si es necesario
   - Exportar a archivo después si se necesita

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
**Responsable:** Claude Code (Algorith Pro)  
**Script de validación:** obtener-campos-existentes.mjs  
**Datos almacenados:** config/campos-existentes.json

