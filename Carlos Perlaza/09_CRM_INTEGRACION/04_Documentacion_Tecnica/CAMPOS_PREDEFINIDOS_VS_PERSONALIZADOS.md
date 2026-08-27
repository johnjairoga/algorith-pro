# 🔍 CAMPOS PREDEFINIDOS vs CAMPOS PERSONALIZADOS EN GHL

**Clínica:** Dermatológica Puebla - Carlos Perlaza  
**Fecha:** 14 de agosto de 2026  
**Objetivo:** Evitar crear campos duplicados innecesariamente

---

## 🎯 CONTEXTO

GHL ya viene con **campos predefinidos (default fields)** que NO necesitamos crear como campos personalizados. Es importante identificarlos para:

✅ No duplicar trabajo  
✅ No crear confusión en la interfaz  
✅ Usar los campos nativos de GHL directamente  
✅ Ser más eficientes en la configuración  

---

---

# 👥 CAMPOS DE CONTACTOS (CONTACTS)

## ✅ CAMPOS PREDEFINIDOS QUE YA EXISTEN EN GHL

Estos campos **NO necesitan ser creados como personalizados** porque ya vienen por defecto:

| Campo en Documento | Campo Nativo GHL | Tipo | Variable GHL |
|---|---|---|---|
| Nome | First Name | Línea única | `{{contact.first_name}}` |
| Sobrenome | Last Name | Línea única | `{{contact.last_name}}` |
| E-mail | Email | Email | `{{contact.email}}` |
| Telefone | Phone | Teléfono | `{{contact.phone}}` |
| Rua | Address 1 | Línea única | `{{contact.address1}}` |
| Cidade | City | Línea única | `{{contact.city}}` |
| Estado | State | Línea única | `{{contact.state}}` |
| País | Country | Dropdown | `{{contact.country}}` |
| Código postal | Postal Code | Línea única | `{{contact.postal_code}}` |
| Website | Website | URL | `{{contact.website}}` |
| Fuso horário | Timezone | Dropdown | `{{contact.timezone}}` |
| Data de nascimento | Date of Birth | Date Picker | `{{contact.date_of_birth}}` |
| Fonte de contato | Source | Línea única | `{{contact.source}}` |
| Tipo de contato | Type | Dropdown | `{{contact.type}}` |
| Nome comercial | Company Name | Línea única | `{{contact.company_name}}` |

**Total: 15 campos predefinidos - NO CREAR**

---

## 🆕 CAMPOS PERSONALIZADOS QUE SÍ NECESITAN CREARSE

Estos campos **SÍ necesitan ser creados como campos personalizados** porque NO vienen por defecto:

### 🔄 GRUPO: Oportunidades Abiertas (4 campos)

| Campo | Tipo | Carpeta Padre | Variable GHL |
|-------|------|---------------|--------------|
| Op Abierta Nutrición | Dropdown (única) | Oportunidades Abiertas | `{{contact.op_aberta_nutricao}}` |
| Op Abierta Onboarding | Dropdown (única) | Oportunidades Abiertas | `{{contact.op_aberta_onboarding}}` |
| Op Abierta Fidelización | Dropdown (única) | Oportunidades Abiertas | `{{contact.op_aberta_fidelizacao}}` |
| Op Abierta Comercial | Dropdown (única) | Oportunidades Abiertas | `{{contact.op_aberta_comercial}}` |

---

### 📊 GRUPO: Seguimiento y Control (5 campos)

| Campo | Tipo | Carpeta Padre | Variable GHL |
|-------|------|---------------|--------------|
| Cantidad de Follow-ups | Número | Seguimiento y Control | `{{contact.quantidade_de_followups}}` |
| Próximo Retorno Estimado | Date Picker | Seguimiento y Control | `{{contact.proximo_retorno_estimado}}` |
| Cantidad de Procedimientos | Número | Seguimiento y Control | `{{contact.quantidade_de_procedimentos}}` |
| Origen do Lead | Dropdown (única) | Seguimiento y Control | `{{contact.origem_do_lead}}` |
| Data Entrada | Date Picker | Seguimiento y Control | `{{contact.data_entrada}}` |

---

## 📊 RESUMEN - CONTACTOS

| Categoría | Cantidad | Acción |
|-----------|----------|--------|
| **Campos Predefinidos** | 15 | ✅ YA EXISTEN - No crear |
| **Campos Personalizados** | 9 | 🆕 CREAR |
| **TOTAL** | 24 | - |

---

---

# 💼 CAMPOS DE OPORTUNIDADES (OPPORTUNITIES)

## ✅ CAMPOS PREDEFINIDOS QUE YA EXISTEN EN GHL

Estos campos **NO necesitan ser creados como personalizados**:

| Campo en Documento | Campo Nativo GHL | Tipo | Variable GHL |
|---|---|---|---|
| Nome da oportunidade | Name | Línea única | `{{opportunity.name}}` |
| Pipeline | Pipeline | Dropdown | `{{opportunity.pipeline_id}}` |
| Etapa | Stage | Dropdown | `{{opportunity.pipeline_stage_id}}` |
| Status | Status | Dropdown | `{{opportunity.status}}` |

**Total: 4 campos predefinidos - NO CREAR**

---

## 🆕 CAMPOS PERSONALIZADOS QUE SÍ NECESITAN CREARSE

Estos campos **SÍ necesitan ser creados como campos personalizados**:

### 💰 GRUPO: Financiero (3 campos)

| Campo | Tipo | Carpeta Padre | Variable GHL |
|-------|------|---------------|--------------|
| Valor restante a pagar | Monetário | Financiero | `{{opportunity.valor_restante_a_pagar}}` |
| Valor Fechado | Monetário | Financiero | `{{opportunity.valor_fechado}}` |
| Valor do lead | Monetário | Financiero | `{{opportunity.valor_do_lead}}` |

---

### 📅 GRUPO: Fechas y Programación (6 campos)

| Campo | Tipo | Carpeta Padre | Variable GHL |
|-------|------|---------------|--------------|
| Previsão da data de fechamiento esperada | Date Picker | Fechas y Programación | `{{opportunity.forecast_expected_close_date}}` |
| Data Pagamento | Date Picker | Fechas y Programación | `{{opportunity.data_pagamento}}` |
| Data Fin Programa | Date Picker | Fechas y Programación | `{{opportunity.data_fim_programa}}` |
| Data Inicio Programa | Date Picker | Fechas y Programación | `{{opportunity.data_inicio_programa}}` |
| Período da data de tratamiento esperado | Date Picker | Fechas y Programación | `{{opportunity.format_expected_close_date}}` |
| Data Agendamiento | Date Picker | Fechas y Programación | `{{opportunity.data_agendamiento}}` |

---

### 🔗 GRUPO: Origen y Tracking (7 campos)

| Campo | Tipo | Carpeta Padre | Variable GHL |
|-------|------|---------------|--------------|
| Origen | Dropdown (única) | Origen y Tracking | `{{opportunity.origen}}` |
| Fonte da oportunidade | Línea única | Origen y Tracking | `{{opportunity.source}}` |
| Source Type | Dropdown (única) | Origen y Tracking | `{{opportunity.source_type}}` |
| Source Ads | Dropdown (única) | Origen y Tracking | `{{opportunity.source_ads}}` |
| UTM Campaign | Dropdown (única) | Origen y Tracking | `{{opportunity.utm_campaign}}` |
| UTM Medium | Dropdown (única) | Origen y Tracking | `{{opportunity.utm_medium}}` |
| UTM Source | Dropdown (única) | Origen y Tracking | `{{opportunity.utm_source}}` |

---

### 🛍️ GRUPO: Productos y Servicios (3 campos)

| Campo | Tipo | Carpeta Padre | Variable GHL |
|-------|------|---------------|--------------|
| Produtos Adquiridos | Dropdown (múltiple) | Productos y Servicios | `{{opportunity.produtos_adquiridos}}` |
| Programa Vendido | Dropdown (única) | Productos y Servicios | `{{opportunity.programa_vendido}}` |
| Renovación | Dropdown (múltiple) | Productos y Servicios | `{{opportunity.renovacion}}` |

---

### 💳 GRUPO: Métodos de Pago (2 campos)

| Campo | Tipo | Carpeta Padre | Variable GHL |
|-------|------|---------------|--------------|
| Forma de Pagamento | Dropdown (única) | Métodos de Pago | `{{opportunity.forma_de_pagamento}}` |
| Plataforma Checkout | Dropdown (única) | Métodos de Pago | `{{opportunity.plataforma_checkout}}` |

---

### 📞 GRUPO: Consulta y Atendimiento (5 campos)

| Campo | Tipo | Carpeta Padre | Variable GHL |
|-------|------|---------------|--------------|
| Día da Semana Consulta | Dropdown (única) | Consulta y Atendimiento | `{{opportunity.dia_da_semana_consulta}}` |
| Horário da consulta | Línea única | Consulta y Atendimiento | `{{opportunity.horario_da_consulta}}` |
| Número da consulta | Dropdown (múltiple) | Consulta y Atendimiento | `{{opportunity.numero_da_consulta}}` |
| Canal Consulta | Dropdown (única) | Consulta y Atendimiento | `{{opportunity.canal_consulta}}` |
| Día para envio do checkin | Dropdown (única) | Consulta y Atendimiento | `{{opportunity.dia_para_envio_do_checkin}}` |

---

### 👤 GRUPO: Equipo y Responsables (3 campos)

| Campo | Tipo | Carpeta Padre | Variable GHL |
|-------|------|---------------|--------------|
| Vendedor Responsável | Dropdown (única) | Equipo y Responsables | `{{opportunity.vendedor_responsavel}}` |
| Propriedário | Dropdown (única) | Equipo y Responsables | `{{opportunity.assigned_to}}` |
| Médico de Perda | Dropdown (única) | Equipo y Responsables | `{{opportunity.medico_de_perda}}` |

---

### ❌ GRUPO: Pérdida y Análisis (2 campos)

| Campo | Tipo | Carpeta Padre | Variable GHL |
|-------|------|---------------|--------------|
| Motivo de Perda | Dropdown (única) | Pérdida y Análisis | `{{opportunity.motivo_de_perda}}` |
| Probabilidade de previsão | Número | Pérdida y Análisis | `{{opportunity.forecast_probability}}` |

---

## 📊 RESUMEN - OPORTUNIDADES

| Categoría | Cantidad | Acción |
|-----------|----------|--------|
| **Campos Predefinidos** | 4 | ✅ YA EXISTEN - No crear |
| **Campos Personalizados** | 31 | 🆕 CREAR |
| **TOTAL** | 35 | - |

---

---

# 📊 RESUMEN GENERAL

## ¿CUÁNTOS CAMPOS REALMENTE NECESITAMOS CREAR?

| Entidad | Predefinidos | Personalizados | Total |
|---------|--------------|----------------|-------|
| **Contactos** | 15 ✅ | 9 🆕 | 24 |
| **Oportunidades** | 4 ✅ | 31 🆕 | 35 |
| **TOTAL** | **19** | **40** | **59** |

### ✨ CONCLUSIÓN

```
De los 59 campos documentados:

✅ 19 YA EXISTEN en GHL por defecto
   └─ No necesitan ser creados

🆕 40 NECESITAN SER CREADOS como campos personalizados
   └─ Organizados en 15 carpetas (Custom Field Groups)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CARGA DE TRABAJO REAL: Crear 40 campos + 15 carpetas
```

---

## 🗓️ CRONOGRAMA DE CREACIÓN

| Semana | Tarea | Campos | Carpetas |
|--------|-------|--------|----------|
| **Semana 3** | Crear carpetas en GHL | - | 15 |
| **Semana 3** | Crear campos personalizados | 40 | - |
| **Semana 4** | Verificación y testing | - | - |

**Tiempo estimado:** 3-4 horas

---

## 📋 CHECKLIST ANTES DE CREAR

```
□ Revisar lista de campos predefinidos en GHL
  └─ Confirmar que first_name, email, phone, etc. ya existen

□ Crear 15 carpetas (Custom Field Groups)
  └─ 9 para Oportunidades
  └─ 6 para Contactos

□ Crear 40 campos personalizados
  └─ 31 para Oportunidades
  └─ 9 para Contactos

□ Verificar que cada campo esté en la carpeta correcta

□ Testear que los campos funcionen en automaciones
```

---

**Documento generado:** 14 de agosto de 2026  
**Responsable:** Claude Code (Algorith Pro)  
**Impacto:** Reduce carga de trabajo en 32% (no crear 19 campos que ya existen)
