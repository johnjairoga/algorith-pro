# 📋 CAMPOS PERSONALIZADOS EN GHL
**Clínica Dermatológica Puebla - Carlos Perlaza**

**Fecha:** 14 de agosto de 2026  
**Versión:** 1.0  
**Estado:** Documentación Actual

---

## 🎯 OBJETIVO

Documentar todos los campos personalizados (Custom Fields) disponibles en GHL para:
- **Oportunidades (Opportunities)** - Seguimiento de ventas/tratamientos
- **Contactos (Contacts)** - Información de pacientes

---

# 📁 ESTRUCTURA DE CARPETAS (CUSTOM FIELD GROUPS)

En GHL, los campos personalizados deben organizarse en **Carpetas/Grupos** para que sean más fáciles de encontrar y gestionar.

## 🗂️ CARPETAS PARA OPORTUNIDADES

### 1. **Financiero** 💰
- Valor restante a pagar
- Valor Fechado
- Valor do lead

### 2. **Fechas y Programación** 📅
- Previsão da data de fechamiento esperada
- Data Pagamento
- Data Fin Programa
- Data Inicio Programa
- Período da data de tratamiento esperado
- Data Agendamiento

### 3. **Pipeline y Gestión** 🏷️
- Nome da oportunidade
- Pipeline
- Etapa
- Status

### 4. **Origen y Tracking** 🔗
- Origen
- Fonte da oportunidade
- Source Type
- Source Ads
- UTM Campaign
- UTM Medium
- UTM Source

### 5. **Productos y Servicios** 🛍️
- Produtos Adquiridos
- Programa Vendido
- Renovación

### 6. **Métodos de Pago** 💳
- Forma de Pagamento
- Plataforma Checkout

### 7. **Consulta y Atendimiento** 📞
- Día da Semana Consulta
- Horário da consulta
- Número da consulta
- Canal Consulta
- Día para envio do checkin

### 8. **Equipo y Responsables** 👤
- Vendedor Responsável
- Propriedário
- Médico de Perda

### 9. **Pérdida y Análisis** ❌
- Motivo de Perda
- Probabilidade de previsão

---

## 🗂️ CARPETAS PARA CONTACTOS

### 1. **Oportunidades Abiertas** 🔄
- Op Abierta Nutrición
- Op Abierta Onboarding
- Op Abierta Fidelización
- Op Abierta Comercial

### 2. **Seguimiento y Control** 📊
- Cantidad de Follow-ups
- Próximo Retorno Estimado
- Cantidad de Procedimientos
- Origen do Lead
- Data Entrada

### 3. **Información de Empresa** 🏢
- Nome comercial
- Website
- Fuso horário

### 4. **Dirección y Ubicación** 📍
- Rua
- Cidade
- Estado
- País
- Código postal

### 5. **Datos Personales** 👤
- Nome
- Sobrenome
- E-mail
- Telefone
- Data de nascimento

### 6. **Clasificación** 📌
- Fonte de contato
- Tipo de contato

---

## 📊 RESUMEN DE CARPETAS

| Carpeta | Entidad | Campos | Orden |
|---------|---------|--------|-------|
| Financiero | Opportunity | 3 | 1 |
| Fechas y Programación | Opportunity | 6 | 2 |
| Pipeline y Gestión | Opportunity | 4 | 3 |
| Origen y Tracking | Opportunity | 7 | 4 |
| Productos y Servicios | Opportunity | 3 | 5 |
| Métodos de Pago | Opportunity | 2 | 6 |
| Consulta y Atendimiento | Opportunity | 5 | 7 |
| Equipo y Responsables | Opportunity | 3 | 8 |
| Pérdida y Análisis | Opportunity | 2 | 9 |
| **Oportunidades Abiertas** | **Contact** | **4** | **1** |
| **Seguimiento y Control** | **Contact** | **5** | **2** |
| **Información de Empresa** | **Contact** | **3** | **3** |
| **Dirección y Ubicación** | **Contact** | **5** | **4** |
| **Datos Personales** | **Contact** | **5** | **5** |
| **Clasificación** | **Contact** | **2** | **6** |

**Total: 15 Carpetas | 50 Campos Personalizados**

---

# 📌 CAMPOS DE OPORTUNIDADES (Opportunities)

## 💰 CAMPOS FINANCIEROS

| Campo | Tipo | Variable GHL |
|-------|------|--------------|
| Valor restante a pagar | Monetário | `{{opportunity.valor_restante_a_pagar}}` |
| Valor Fechado | Monetário | `{{opportunity.valor_fechado}}` |
| Valor do lead | Monetário | `{{opportunity.valor_do_lead}}` |

---

## 📅 CAMPOS DE FECHAS

| Campo | Tipo | Variable GHL |
|-------|------|--------------|
| Previsão da data de fechamento esperada | Seletor de data | `{{opportunity.forecast_expected_close_date}}` |
| Data Pagamento | Seletor de data | `{{opportunity.data_pagamento}}` |
| Data Fim Programa | Seletor de data | `{{opportunity.data_fim_programa}}` |
| Data Inicio Programa | Seletor de data | `{{opportunity.data_inicio_programa}}` |
| Período da data de tratamiento esperado | Seletor de data | `{{opportunity.format_expected_close_date}}` |
| Data Agendamento | Seletor de data | `{{opportunity.data_agendamento}}` |

---

## 🏷️ CAMPOS DE OPORTUNIDAD/PIPELINE

| Campo | Tipo | Variable GHL |
|-------|------|--------------|
| Nome da oportunidade | Linha única | `{{opportunity.name}}` |
| Pipeline | Lista suspensa (única) | `{{opportunity.pipeline_id}}` |
| Etapa | Lista suspensa (única) | `{{opportunity.pipeline_stage_id}}` |
| Status | Lista suspensa (única) | `{{opportunity.status}}` |

---

## 🔗 CAMPOS DE ORIGEN/FONTE

| Campo | Tipo | Variable GHL |
|-------|------|--------------|
| Origen | Lista suspensa (única) | `{{opportunity.origem}}` |
| Fonte da oportunidade | Linha única | `{{opportunity.source}}` |
| Source Type | Lista suspensa (única) | `{{opportunity.source_type}}` |
| Source Ads | Lista suspensa (única) | `{{opportunity.source_ads}}` |
| UTM Campaign | Lista suspensa (única) | `{{opportunity.utm_campaign}}` |
| UTM Medium | Lista suspensa (única) | `{{opportunity.utm_medium}}` |
| UTM Source | Lista suspensa (única) | `{{opportunity.utm_source}}` |

---

## 🛍️ CAMPOS DE PRODUCTOS Y SERVICIOS

| Campo | Tipo | Variable GHL |
|-------|------|--------------|
| Produtos Adquiridos | Lista suspensa (múltipla) | `{{opportunity.produtos_adquiridos}}` |
| Programa Vendido | Lista suspensa (única) | `{{opportunity.programa_vendido}}` |
| Renovación | Lista suspensa (múltipla) | `{{opportunity.renovacion}}` |

---

## 💳 CAMPOS DE PAGO

| Campo | Tipo | Variable GHL |
|-------|------|--------------|
| Forma de Pagamento | Lista suspensa (única) | `{{opportunity.forma_de_pagamento}}` |
| Plataforma Checkout | Lista suspensa (única) | `{{opportunity.plataforma_checkout}}` |

---

## 📞 CAMPOS DE CONSULTA/ATENDIMIENTO

| Campo | Tipo | Variable GHL |
|-------|------|--------------|
| Día da Semana Consulta | Lista suspensa (única) | `{{opportunity.dia_da_semana_consulta}}` |
| Horário da consulta | Lista única | `{{opportunity.horario_da_consulta}}` |
| Número da consulta | Lista suspensa (múltipla) | `{{opportunity.numero_da_consulta}}` |
| Canal Consulta | Lista suspensa (única) | `{{opportunity.canal_consulta}}` |
| Día para envio do checkin | Lista suspensa (única) | `{{opportunity.dia_para_envio_do_checkin}}` |

---

## 👤 CAMPOS DE PERSONAS/RESPONSABLES

| Campo | Tipo | Variable GHL |
|-------|------|--------------|
| Vendedor Responsável | Lista suspensa (única) | `{{opportunity.vendedor_responsavel}}` |
| Propriedário | Lista suspensa (única) | `{{opportunity.assigned_to}}` |
| Médico de Perda | Lista suspensa (única) | `{{opportunity.medico_de_perda}}` |

---

## ❌ CAMPOS DE PÉRDIDA/CANCELACIÓN

| Campo | Tipo | Variable GHL |
|-------|------|--------------|
| Motivo de Perda | Lista suspensa (única) | `{{opportunity.motivo_de_perda}}` |

---

## 📊 CAMPOS DE ANÁLISIS

| Campo | Tipo | Variable GHL |
|-------|------|--------------|
| Probabilidade de previsão | Número | `{{opportunity.forecast_probability}}` |

---

## 📊 RESUMEN - OPORTUNIDADES

| Tipo de Campo | Cantidad |
|---|---|
| Lista suspensa (única) | 15 |
| Seletor de data | 6 |
| Monetário | 3 |
| Linha única | 2 |
| Número | 2 |
| Lista suspensa (múltipla) | 3 |
| **TOTAL CAMPOS** | **31** |

---

---

# 👥 CAMPOS DE CONTACTOS (Contacts)

## 🔄 CAMPOS DE OPORTUNIDADES ABIERTAS

| Campo | Tipo | Variable GHL |
|-------|------|--------------|
| Op Abierta Nutrición | Lista suspensa (única) | `{{contact.op_aberta_nutricao}}` |
| Op Abierta Onboarding | Lista suspensa (única) | `{{contact.op_aberta_onboarding}}` |
| Op Abierta Fidelización | Lista suspensa (única) | `{{contact.op_aberta_fidelizacao}}` |
| Op Abierta Comercial | Lista suspensa (única) | `{{contact.op_aberta_comercial}}` |

---

## 📊 CAMPOS DE SEGUIMIENTO

| Campo | Tipo | Variable GHL |
|-------|------|--------------|
| Cantidad de Follow-ups | Número | `{{contact.quantidade_de_followups}}` |
| Próximo Retorno Estimado | Seletor de data | `{{contact.proximo_retorno_estimado}}` |
| Cantidad de Procedimientos | Número | `{{contact.quantidade_de_procedimentos}}` |
| Origen do Lead | Lista suspensa (única) | `{{contact.origem_do_lead}}` |
| Data Entrada | Seletor de data | `{{contact.data_entrada}}` |

---

## 🏢 CAMPOS DE EMPRESA

| Campo | Tipo | Variable GHL |
|-------|------|--------------|
| Nome comercial | Linha única | `{{contact.company_name}}` |
| Website | Linha única | `{{contact.website}}` |
| Fuso horário | Lista suspensa (única) | `{{contact.timezone}}` |

---

## 📍 CAMPOS DE DIRECCIÓN

| Campo | Tipo | Variable GHL |
|-------|------|--------------|
| Rua | Linha única | `{{contact.address1}}` |
| Cidade | Linha única | `{{contact.city}}` |
| Estado | Linha única | `{{contact.state}}` |
| País | Lista suspensa (única) | `{{contact.country}}` |
| Código postal | Linha única | `{{contact.postal_code}}` |

---

## 👤 CAMPOS PERSONALES

| Campo | Tipo | Variable GHL |
|-------|------|--------------|
| Nome | Linha única | `{{contact.first_name}}` |
| Sobrenome | Linha única | `{{contact.last_name}}` |
| E-mail | Linha única | `{{contact.email}}` |
| Telefone | Telefone | `{{contact.phone}}` |
| Data de nascimento | Seletor de data | `{{contact.date_of_birth}}` |

---

## 📌 CAMPOS DE CLASIFICACIÓN

| Campo | Tipo | Variable GHL |
|-------|------|--------------|
| Fonte de contato | Linha única | `{{contact.source}}` |
| Tipo de contato | Lista suspensa (única) | `{{contact.type}}` |

---

## 📊 RESUMEN - CONTACTOS

| Tipo de Campo | Cantidad |
|---|---|
| Lista suspensa (única) | 6 |
| Seletor de data | 3 |
| Linha única | 7 |
| Número | 2 |
| Telefone | 1 |
| **TOTAL CAMPOS** | **19** |

---

---

# 📈 RESUMEN GENERAL

## Campos Personalizados Totales en GHL

| Entidad | Total | Estado |
|---------|-------|--------|
| **Oportunidades** | 31 | ✅ Documentado |
| **Contactos** | 19 | ✅ Documentado |
| **TOTAL** | **50** | ✅ Documentado |

---

## 🔄 RELACIÓN ENTRE OPORTUNIDADES Y CONTACTOS

```
CONTACTO (Contact)
├─ Nombre: Juan García
├─ Email: juan@email.com
├─ Teléfono: +56 987654321
├─ Op_aberta_comercial: ID-123
│
└─ OPORTUNIDAD (Opportunity) - ID-123
   ├─ Nome: Consulta Inicial - Botox
   ├─ Pipeline: APARATOLOGÍA
   ├─ Etapa: PRIMERA SESIÓN
   ├─ Valor Fechado: $300 MXN
   ├─ Forma de Pagamento: Stripe
   └─ Data Agendamento: 2026-08-20
```

---

## 💡 NOTAS IMPORTANTES

✅ **Campos de Oportunidades:** Siguen el patrón `{{opportunity.field_name}}`  
✅ **Campos de Contactos:** Siguen el patrón `{{contact.field_name}}`  
✅ **Duplicados Removidos:**
   - ~~Origen / Origen do Lead~~ → Kept: "Origen" (opportunity), "Origen do Lead" (contact)
   - ~~Motivo de Perda / Motivo da perda~~ → Kept: "Motivo de Perda" (only one)
   - ~~Forma de Pagamento / Forma de Pagamiento~~ → Kept: "Forma de Pagamento" (only one)

---

## 🎯 PRÓXIMAS ACCIONES

1. ✅ Crear campos de Oportunidades en GHL
2. ✅ Crear campos de Contactos en GHL
3. ⏳ Configurar relaciones entre Oportunidades y Contactos
4. ⏳ Crear automaciones que usen estos campos
5. ⏳ Testear que todos los campos funcionen correctamente

---

**Documento generado:** 14 de agosto de 2026  
**Responsable:** Claude Code (Algorith Pro)  
**Versión:** 1.0
