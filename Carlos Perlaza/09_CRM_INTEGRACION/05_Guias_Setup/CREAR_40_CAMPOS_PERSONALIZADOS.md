# 📋 GUÍA: CREAR 40 CAMPOS PERSONALIZADOS EN GHL

**Clínica:** Dermatológica Puebla - Carlos Perlaza  
**Fecha:** 14 de agosto de 2026  
**Total Campos:** 40 (9 Contactos + 31 Oportunidades)  
**Duración estimada:** 90-120 minutos  
**Requisitos:** Acceso GHL Console → Settings → Custom Fields

---

## ⚠️ IMPORTANTE LEER PRIMERO

### Orden de pasos

1. **Primero:** Asegúrate de haber creado las **15 carpetas (Custom Field Groups)** 
   - Guía: `CREAR_CUSTOM_FIELD_GROUPS.md`
   - Sin carpetas, los campos no tendrán dónde asignarse

2. **Segundo:** Crea los **40 campos personalizados** siguiendo esta guía

3. **Tercero:** Valida con el script:
   ```bash
   node obtener-campos-existentes.mjs
   ```

### Por qué no por API

GHL API v2.0 NO permite crear custom fields (restricción de permisos IAM). Deben crearse manualmente en la GUI de GHL Console.

---

## 🚀 PASO A PASO: CREAR CAMPOS

### ACCESO INICIAL

1. Inicia sesión en [GHL Console](https://app.gohighlevel.com)
2. Ve a **Settings** (⚙️ icono abajo a la izquierda)
3. Selecciona **Custom Fields**
4. Verás dos pestañas: **Opportunities** | **Contacts**

---

## 💼 CREAR CAMPOS DE OPORTUNIDADES (31 campos)

### CARPETA 1: FINANCIERO 💰

**Total campos en esta carpeta:** 3  
**Duración:** ~5 minutos

---

#### Campo 1.1: Valor Restante a Pagar

1. Haz clic en **+ Add Field** (dentro de la carpeta Financiero)
2. **Nombre del campo:** `Valor Restante a Pagar`
3. **Field Type:** `Monetary` (Monetário)
4. **Field Key (automático):** `valor_restante_a_pagar` (comprueba que coincida)
5. **Carpeta/Group:** Financiero
6. **Descripción (opcional):** `Saldo pendiente de pago de la oportunidad`
7. Haz clic en **Save Field**

**Resultado esperado:**
- Campo visible en formularios de oportunidades
- Tipo: entrada de dinero
- Ubicación: Carpeta "Financiero"

---

#### Campo 1.2: Valor Fechado

1. Haz clic en **+ Add Field**
2. **Nombre:** `Valor Fechado`
3. **Type:** `Monetary`
4. **Field Key:** `valor_fechado`
5. **Carpeta:** Financiero
6. **Descripción:** `Valor total cerrado de la oportunidad`
7. **Save**

---

#### Campo 1.3: Valor do Lead

1. Haz clic en **+ Add Field**
2. **Nombre:** `Valor do Lead`
3. **Type:** `Monetary`
4. **Field Key:** `valor_do_lead`
5. **Carpeta:** Financiero
6. **Descripción:** `Valor inicial o estimado del lead`
7. **Save**

✅ **Carpeta Financiero completada: 3/3 campos**

---

### CARPETA 2: FECHAS Y PROGRAMACIÓN 📅

**Total campos en esta carpeta:** 6  
**Duración:** ~10 minutos

---

#### Campo 2.1: Previsão da Data de Fechamiento Esperada

1. **Nombre:** `Previsão da Data de Fechamiento Esperada`
2. **Type:** `Date Picker` (Seletor de data)
3. **Field Key:** `forecast_expected_close_date`
4. **Carpeta:** Fechas y Programación
5. **Descripción:** `Fecha estimada de cierre de la oportunidad`
6. **Save**

---

#### Campo 2.2: Data Pagamento

1. **Nombre:** `Data Pagamento`
2. **Type:** `Date Picker`
3. **Field Key:** `data_pagamento`
4. **Carpeta:** Fechas y Programación
5. **Descripción:** `Fecha del pago realizado`
6. **Save**

---

#### Campo 2.3: Data Fim Programa

1. **Nombre:** `Data Fim Programa`
2. **Type:** `Date Picker`
3. **Field Key:** `data_fim_programa`
4. **Carpeta:** Fechas y Programación
5. **Save**

---

#### Campo 2.4: Data Inicio Programa

1. **Nombre:** `Data Inicio Programa`
2. **Type:** `Date Picker`
3. **Field Key:** `data_inicio_programa`
4. **Carpeta:** Fechas y Programación
5. **Save**

---

#### Campo 2.5: Período da Data de Tratamiento Esperado

1. **Nombre:** `Período da Data de Tratamiento Esperado`
2. **Type:** `Date Picker`
3. **Field Key:** `format_expected_close_date`
4. **Carpeta:** Fechas y Programación
5. **Save**

---

#### Campo 2.6: Data Agendamiento

1. **Nombre:** `Data Agendamiento`
2. **Type:** `Date Picker`
3. **Field Key:** `data_agendamento`
4. **Carpeta:** Fechas y Programación
5. **Save**

✅ **Carpeta Fechas y Programación completada: 6/6 campos**

---

### CARPETA 3: ORIGEN Y TRACKING 🔗

**Total campos en esta carpeta:** 7  
**Duración:** ~12 minutos

Todos estos son **Dropdown (Single Select)** — los parámetros son iguales excepto el nombre.

---

#### Campo 3.1: Origen

1. **Nombre:** `Origen`
2. **Type:** `Dropdown` (Single Select)
3. **Field Key:** `origen`
4. **Carpeta:** Origen y Tracking
5. **Opciones (leave empty, se llenarán después si es necesario)**
6. **Save**

---

#### Campo 3.2: Fonte da Oportunidade

1. **Nombre:** `Fonte da Oportunidade`
2. **Type:** `Text` (Línea única)
3. **Field Key:** `source`
4. **Carpeta:** Origen y Tracking
5. **Save**

---

#### Campo 3.3: Source Type

1. **Nombre:** `Source Type`
2. **Type:** `Dropdown`
3. **Field Key:** `source_type`
4. **Carpeta:** Origen y Tracking
5. **Save**

---

#### Campo 3.4: Source Ads

1. **Nombre:** `Source Ads`
2. **Type:** `Dropdown`
3. **Field Key:** `source_ads`
4. **Carpeta:** Origen y Tracking
5. **Save**

---

#### Campo 3.5: UTM Campaign

1. **Nombre:** `UTM Campaign`
2. **Type:** `Dropdown`
3. **Field Key:** `utm_campaign`
4. **Carpeta:** Origen y Tracking
5. **Save**

---

#### Campo 3.6: UTM Medium

1. **Nombre:** `UTM Medium`
2. **Type:** `Dropdown`
3. **Field Key:** `utm_medium`
4. **Carpeta:** Origen y Tracking
5. **Save**

---

#### Campo 3.7: UTM Source

1. **Nombre:** `UTM Source`
2. **Type:** `Dropdown`
3. **Field Key:** `utm_source`
4. **Carpeta:** Origen y Tracking
5. **Save**

✅ **Carpeta Origen y Tracking completada: 7/7 campos**

---

### CARPETA 4: PRODUCTOS Y SERVICIOS 🛍️

**Total campos:** 3  
**Duración:** ~5 minutos

---

#### Campo 4.1: Produtos Adquiridos

1. **Nombre:** `Produtos Adquiridos`
2. **Type:** `Dropdown` (Multiple Select)
3. **Field Key:** `produtos_adquiridos`
4. **Carpeta:** Productos y Servicios
5. **Save**

---

#### Campo 4.2: Programa Vendido

1. **Nombre:** `Programa Vendido`
2. **Type:** `Dropdown`
3. **Field Key:** `programa_vendido`
4. **Carpeta:** Productos y Servicios
5. **Save**

---

#### Campo 4.3: Renovación

1. **Nombre:** `Renovación`
2. **Type:** `Dropdown` (Multiple Select)
3. **Field Key:** `renovacion`
4. **Carpeta:** Productos y Servicios
5. **Save**

✅ **Carpeta Productos y Servicios completada: 3/3 campos**

---

### CARPETA 5: MÉTODOS DE PAGO 💳

**Total campos:** 2  
**Duración:** ~3 minutos

---

#### Campo 5.1: Forma de Pagamento

1. **Nombre:** `Forma de Pagamento`
2. **Type:** `Dropdown`
3. **Field Key:** `forma_de_pagamento`
4. **Carpeta:** Métodos de Pago
5. **Save**

---

#### Campo 5.2: Plataforma Checkout

1. **Nombre:** `Plataforma Checkout`
2. **Type:** `Dropdown`
3. **Field Key:** `plataforma_checkout`
4. **Carpeta:** Métodos de Pago
5. **Save**

✅ **Carpeta Métodos de Pago completada: 2/2 campos**

---

### CARPETA 6: CONSULTA Y ATENDIMIENTO 📞

**Total campos:** 5  
**Duración:** ~8 minutos

---

#### Campo 6.1: Día da Semana Consulta

1. **Nombre:** `Día da Semana Consulta`
2. **Type:** `Dropdown`
3. **Field Key:** `dia_da_semana_consulta`
4. **Carpeta:** Consulta y Atendimiento
5. **Save**

---

#### Campo 6.2: Horário da Consulta

1. **Nombre:** `Horário da Consulta`
2. **Type:** `Text`
3. **Field Key:** `horario_da_consulta`
4. **Carpeta:** Consulta y Atendimiento
5. **Save**

---

#### Campo 6.3: Número da Consulta

1. **Nombre:** `Número da Consulta`
2. **Type:** `Dropdown` (Multiple Select)
3. **Field Key:** `numero_da_consulta`
4. **Carpeta:** Consulta y Atendimiento
5. **Save**

---

#### Campo 6.4: Canal Consulta

1. **Nombre:** `Canal Consulta`
2. **Type:** `Dropdown`
3. **Field Key:** `canal_consulta`
4. **Carpeta:** Consulta y Atendimiento
5. **Save**

---

#### Campo 6.5: Día para Envio do Checkin

1. **Nombre:** `Día para Envio do Checkin`
2. **Type:** `Dropdown`
3. **Field Key:** `dia_para_envio_do_checkin`
4. **Carpeta:** Consulta y Atendimiento
5. **Save**

✅ **Carpeta Consulta y Atendimiento completada: 5/5 campos**

---

### CARPETA 7: EQUIPO Y RESPONSABLES 👤

**Total campos:** 3  
**Duración:** ~5 minutos

---

#### Campo 7.1: Vendedor Responsavel

1. **Nombre:** `Vendedor Responsável`
2. **Type:** `Dropdown`
3. **Field Key:** `vendedor_responsavel`
4. **Carpeta:** Equipo y Responsables
5. **Save**

---

#### Campo 7.2: Propriedário (Assigned To)

1. **Nombre:** `Propriedário`
2. **Type:** `Dropdown`
3. **Field Key:** `assigned_to`
4. **Carpeta:** Equipo y Responsables
5. **Save**

---

#### Campo 7.3: Médico de Perda

1. **Nombre:** `Médico de Perda`
2. **Type:** `Dropdown`
3. **Field Key:** `medico_de_perda`
4. **Carpeta:** Equipo y Responsables
5. **Save**

✅ **Carpeta Equipo y Responsables completada: 3/3 campos**

---

### CARPETA 8: PÉRDIDA Y ANÁLISIS ❌

**Total campos:** 2  
**Duración:** ~3 minutos

---

#### Campo 8.1: Motivo de Perda

1. **Nombre:** `Motivo de Perda`
2. **Type:** `Dropdown`
3. **Field Key:** `motivo_de_perda`
4. **Carpeta:** Pérdida y Análisis
5. **Save**

---

#### Campo 8.2: Probabilidade de Previsão

1. **Nombre:** `Probabilidade de Previsão`
2. **Type:** `Number` (Número)
3. **Field Key:** `forecast_probability`
4. **Carpeta:** Pérdida y Análisis
5. **Save**

✅ **Carpeta Pérdida y Análisis completada: 2/2 campos**

✅ **OPORTUNIDADES COMPLETADAS: 31/31 campos**

---

## 👥 CREAR CAMPOS DE CONTACTOS (9 campos)

### CARPETA 1: OPORTUNIDADES ABIERTAS 🔄

**Total campos:** 4  
**Duración:** ~5 minutos

**Importante:** Cambia a pestaña **CONTACTS** en Custom Fields

---

#### Campo C1.1: Op Abierta Nutrición

1. **Nombre:** `Op Abierta Nutrición`
2. **Type:** `Dropdown`
3. **Field Key:** `op_aberta_nutricao`
4. **Carpeta:** Oportunidades Abiertas
5. **Save**

---

#### Campo C1.2: Op Abierta Onboarding

1. **Nombre:** `Op Abierta Onboarding`
2. **Type:** `Dropdown`
3. **Field Key:** `op_aberta_onboarding`
4. **Carpeta:** Oportunidades Abiertas
5. **Save**

---

#### Campo C1.3: Op Abierta Fidelización

1. **Nombre:** `Op Abierta Fidelización`
2. **Type:** `Dropdown`
3. **Field Key:** `op_aberta_fidelizacao`
4. **Carpeta:** Oportunidades Abiertas
5. **Save**

---

#### Campo C1.4: Op Abierta Comercial

1. **Nombre:** `Op Abierta Comercial`
2. **Type:** `Dropdown`
3. **Field Key:** `op_aberta_comercial`
4. **Carpeta:** Oportunidades Abiertas
5. **Save**

✅ **Carpeta Oportunidades Abiertas completada: 4/4 campos**

---

### CARPETA 2: SEGUIMIENTO Y CONTROL 📊

**Total campos:** 5  
**Duración:** ~8 minutos

---

#### Campo C2.1: Cantidad de Follow-ups

1. **Nombre:** `Cantidad de Follow-ups`
2. **Type:** `Number`
3. **Field Key:** `quantidade_de_followups`
4. **Carpeta:** Seguimiento y Control
5. **Save**

---

#### Campo C2.2: Próximo Retorno Estimado

1. **Nombre:** `Próximo Retorno Estimado`
2. **Type:** `Date Picker`
3. **Field Key:** `proximo_retorno_estimado`
4. **Carpeta:** Seguimiento y Control
5. **Save**

---

#### Campo C2.3: Cantidad de Procedimientos

1. **Nombre:** `Cantidad de Procedimientos`
2. **Type:** `Number`
3. **Field Key:** `quantidade_de_procedimentos`
4. **Carpeta:** Seguimiento y Control
5. **Save**

---

#### Campo C2.4: Origen do Lead

1. **Nombre:** `Origen do Lead`
2. **Type:** `Dropdown`
3. **Field Key:** `origem_do_lead`
4. **Carpeta:** Seguimiento y Control
5. **Save**

---

#### Campo C2.5: Data Entrada

1. **Nombre:** `Data Entrada`
2. **Type:** `Date Picker`
3. **Field Key:** `data_entrada`
4. **Carpeta:** Seguimiento y Control
5. **Save**

✅ **Carpeta Seguimiento y Control completada: 5/5 campos**

✅ **CONTACTOS COMPLETADOS: 9/9 campos**

---

## ✅ VERIFICACIÓN FINAL

### Checklist de Creación

**Oportunidades (31 campos):**
```
□ Financiero (3): valor_restante_a_pagar, valor_fechado, valor_do_lead
□ Fechas (6): forecast_expected_close_date, data_pagamento, data_fim_programa, 
             data_inicio_programa, format_expected_close_date, data_agendamento
□ Origen (7): origen, source, source_type, source_ads, utm_campaign, 
             utm_medium, utm_source
□ Productos (3): produtos_adquiridos, programa_vendido, renovacion
□ Métodos (2): forma_de_pagamento, plataforma_checkout
□ Consulta (5): dia_da_semana_consulta, horario_da_consulta, numero_da_consulta,
               canal_consulta, dia_para_envio_do_checkin
□ Equipo (3): vendedor_responsavel, assigned_to, medico_de_perda
□ Pérdida (2): motivo_de_perda, forecast_probability
```

**Contactos (9 campos):**
```
□ Oportunidades Abiertas (4): op_aberta_nutricao, op_aberta_onboarding,
                              op_aberta_fidelizacao, op_aberta_comercial
□ Seguimiento (5): quantidade_de_followups, proximo_retorno_estimado,
                   quantidade_de_procedimentos, origem_do_lead, data_entrada
```

### Después de crear todos los campos

1. Recarga GHL Console (F5)
2. Ve a cualquier Oportunidad o Contacto
3. Deberías ver las carpetas expandibles con los nuevos campos
4. Ejecuta el script de validación:

```bash
cd "c:/Users/John/Desktop/John Jairo/Clientes/algorith-pro/Carlos Perlaza/09_CRM_PROPIA/hub"
node obtener-campos-existentes.mjs
```

**Resultado esperado:**
```
📊 TOTALES:
   ✅ Total Existentes: 40
   ❌ Total Faltantes: 0
   📊 Progreso: 100%
```

---

## ⏱️ RESUMEN TEMPORAL

| Etapa | Duración |
|-------|----------|
| Carpeta 1: Financiero | 5 min |
| Carpeta 2: Fechas | 10 min |
| Carpeta 3: Origen | 12 min |
| Carpeta 4: Productos | 5 min |
| Carpeta 5: Métodos | 3 min |
| Carpeta 6: Consulta | 8 min |
| Carpeta 7: Equipo | 5 min |
| Carpeta 8: Pérdida | 3 min |
| Carpeta 9: Oportunidades Abiertas (Contactos) | 5 min |
| Carpeta 10: Seguimiento (Contactos) | 8 min |
| **TOTAL** | **~64 minutos** |

**Tiempo total estimado con pequeños descansos:** 90-120 minutos

---

## 💡 TIPS Y TROUBLESHOOTING

### Si un campo no se guarda

**Problema:** Click en Save pero el campo no aparece  
**Solución:**
1. Revisa que el Field Key NO tenga espacios ni caracteres especiales
2. Revisa que hayas seleccionado la carpeta correcta
3. Intenta refrescar la página (F5) y prueba de nuevo

### Si olvidaste asignar a carpeta

**Problema:** Creaste un campo sin carpeta  
**Solución:**
1. Edita el campo (click en el nombre)
2. Selecciona la carpeta correcta en "Group" o "Folder"
3. Save

### Si necesitas cambiar el tipo

**Problema:** Creaste un Dropdown pero debería ser Date Picker  
**Solución:**
1. Edita el campo
2. Cambia el Field Type
3. Save
4. Aviso: Los datos existentes pueden perderse si cambias tipos incompatibles

---

## 🎯 PRÓXIMOS PASOS

Cuando termines de crear los 40 campos:

1. ✅ Validar con script: `node obtener-campos-existentes.mjs`
2. ⏳ Configurar automaciones (workflows) que usen estos campos
3. ⏳ Crear tags/etiquetas para el sistema
4. ⏳ Testear flujos end-to-end
5. ⏳ Capacitar al equipo

---

**Duración total recomendada:** 90-120 minutos en una sesión de trabajo concentrada  
**Mejor hora:** Fuera de horario de operaciones del negocio (temprano en la mañana o tarde)  
**Persona recomendada:** Cualquiera con acceso GHL admin (idealmente quien hace setup)

---

**Documento generado:** 14 de agosto de 2026  
**Responsable:** Claude Code (Algorith Pro)  
**Referencia:** CAMPOS_PERSONALIZADOS_GHL.md, CAMPO_PREDEFINIDOS_VS_PERSONALIZADOS.md

