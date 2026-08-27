# 📋 GUÍA: CREAR 4 PIPELINES EN GHL (MANUAL)

**Clínica:** Dermatológica Puebla  
**Fecha:** 14 de agosto de 2026  
**Duración estimada:** 15-20 minutos para los 4 pipelines  
**Requisitos:** Acceso a GHL Console (Settings → Pipelines)

---

## ⚠️ IMPORTANTE

La **API v2.0 (Private Integration) de GHL NO permite crear pipelines automáticamente** por razones de seguridad. 

**SOLUCIÓN:** Crear manualmente desde la interfaz de GHL Console.

---

## 🎯 PIPELINES A CREAR

| # | Nombre | Etapas | Tiempo |
|---|--------|--------|--------|
| 1️⃣ | CONSULTA INICIAL | 6 | 5 min |
| 2️⃣ | APARATOLOGÍA | 5 | 5 min |
| 3️⃣ | INACTIVOS + REACTIVACIÓN | 3 | 3 min |
| 4️⃣ | RECURRENCIA | 3 | 3 min |

---

## 🚀 PASO A PASO

### **PASO 1: Acceder a Pipelines en GHL Console**

1. Inicia sesión en [GHL Console](https://app.gohighlevel.com)
2. Ve a **Settings** (⚙️ ícono abajo a la izquierda)
3. Selecciona **Pipelines**
4. Haz clic en **+ New Pipeline** (botón azul)

```
GHL Console
└─ Settings (⚙️)
   └─ Pipelines
      └─ + New Pipeline
```

---

### **PIPELINE 1: CONSULTA INICIAL**

#### Paso 1.1: Crear Pipeline Base

1. **Name:** `CONSULTA INICIAL`
2. **Description (opcional):** `Conversión de leads en pacientes (tratamientos generales)`
3. Haz clic en **Create**

#### Paso 1.2: Agregar las 6 Etapas

Dentro del pipeline, verás opción **+ Add Stage**. Agrega estas 6 etapas **EN ESTE ORDEN**:

| # | Nombre Etapa | Descripción |
|---|---|---|
| 1 | **LEAD CAPTURADO** | Lead llega por formulario web, WhatsApp o Instagram |
| 2 | **LEAD CUALIFICADO** | Secretaria valida interés y capacidad de pago |
| 3 | **CITA AGENDADA** | Paciente selecciona fecha/hora en calendario |
| 4 | **CONSULTA REALIZADA** | Doctor completa consulta y genera notas médicas |
| 5 | **CONVERTIDO** | Paciente contrata servicios |
| 6 | **PERDIDO** | Paciente no contrató - se mueve a Inactivos |

**Proceso:**
```
Adentro del pipeline → + Add Stage
├─ Escribir nombre: "LEAD CAPTURADO"
├─ Clic en Add
├─ Repetir para etapa 2
├─ Repetir para etapa 3
├─ Repetir para etapa 4
├─ Repetir para etapa 5
└─ Repetir para etapa 6
```

✅ **Resultado esperado:** 6 etapas listadas en orden

---

### **PIPELINE 2: APARATOLOGÍA**

#### Paso 2.1: Crear Pipeline Base

1. Vuelve a **+ New Pipeline** (en Pipelines general)
2. **Name:** `APARATOLOGÍA`
3. **Description:** `Gestión de sesiones con máquinas láser (21 máquinas)`
4. Haz clic en **Create**

#### Paso 2.2: Agregar las 5 Etapas

| # | Nombre Etapa | Descripción |
|---|---|---|
| 1 | **CONSULTA / EVALUACIÓN** | Lead interesado en máquina láser específica |
| 2 | **CANDIDATO APROBADO** | Doctor evalúa en consulta y aprueba candidatura |
| 3 | **PRIMERA SESIÓN** | Paciente paga primera sesión y se atiende |
| 4 | **SESIONES 2-X** | Sesiones en progreso (ciclo de tratamiento) |
| 5 | **CICLO COMPLETADO** | Paciente completó todas las sesiones del plan |

✅ **Resultado esperado:** 5 etapas listadas en orden

---

### **PIPELINE 3: INACTIVOS + REACTIVACIÓN**

#### Paso 3.1: Crear Pipeline Base

1. Vuelve a **+ New Pipeline**
2. **Name:** `INACTIVOS + REACTIVACIÓN`
3. **Description:** `Pacientes sin contacto >30 días + estrategias de re-engagement`
4. Haz clic en **Create**

#### Paso 3.2: Agregar las 3 Etapas

| # | Nombre Etapa | Descripción |
|---|---|---|
| 1 | **INACTIVO DETECTADO** | Sistema detecta automáticamente >30 días sin contacto |
| 2 | **RAZÓN IDENTIFICADA** | Se determina por qué el paciente desapareció |
| 3 | **REACTIVADO / PERDIDO** | Paciente regresa o se archiva permanentemente |

✅ **Resultado esperado:** 3 etapas listadas en orden

---

### **PIPELINE 4: RECURRENCIA**

#### Paso 4.1: Crear Pipeline Base

1. Vuelve a **+ New Pipeline**
2. **Name:** `RECURRENCIA`
3. **Description:** `Ciclos periódicos (30d, 60d, 90d, trimestral, semestral)`
4. Haz clic en **Create**

#### Paso 4.2: Agregar las 3 Etapas

| # | Nombre Etapa | Descripción |
|---|---|---|
| 1 | **EN RECURRENCIA** | Paciente en ciclo activo (30/60/90d/trimestral/semestral) |
| 2 | **SESIÓN COMPLETADA** | Doctor completa tratamiento recurrente |
| 3 | **PAUSADO / CANCELADO** | Paciente pausa o cancela permanentemente |

✅ **Resultado esperado:** 3 etapas listadas en orden

---

## ✅ VERIFICACIÓN FINAL

Después de crear los 4 pipelines, verifica que en GHL Console → Pipelines veas:

```
✅ CONSULTA INICIAL (6 etapas)
✅ APARATOLOGÍA (5 etapas)
✅ INACTIVOS + REACTIVACIÓN (3 etapas)
✅ RECURRENCIA (3 etapas)

Total: 4 Pipelines, 17 Etapas
```

---

## 📝 PRÓXIMOS PASOS (DESPUÉS DE CREAR PIPELINES)

Una vez creados los 4 pipelines:

1. **Crear Etiquetas (Tags)**
   - Ir a: Settings → Custom Tags
   - Crear todas las tags definidas en cada pipeline
   - Ejemplo: `Lead_Capturado`, `Pagó`, `Cliente_Activo`, etc.

2. **Crear Campos Personalizados**
   - Ir a: Settings → Custom Fields
   - Crear: Tipo de Máquina, Razón de Inactividad, Ciclo de Recurrencia, etc.

3. **Configurar Automaciones (Workflows)**
   - Ir a: Automation → Workflows
   - Crear automaciones para recordatorios, cambios de etapa, etc.

4. **Integrar WhatsApp API**
   - Settings → Integrations → WhatsApp
   - Conectar número con API oficial

5. **Integrar Stripe**
   - Settings → Integrations → Stripe
   - Conectar cuenta Stripe para pagos

---

## 🎯 CHECKLIST DE CREACIÓN

```
Fecha: __________
Responsable: __________

□ Pipeline 1: CONSULTA INICIAL (6 etapas)
  □ LEAD CAPTURADO
  □ LEAD CUALIFICADO
  □ CITA AGENDADA
  □ CONSULTA REALIZADA
  □ CONVERTIDO
  □ PERDIDO

□ Pipeline 2: APARATOLOGÍA (5 etapas)
  □ CONSULTA / EVALUACIÓN
  □ CANDIDATO APROBADO
  □ PRIMERA SESIÓN
  □ SESIONES 2-X
  □ CICLO COMPLETADO

□ Pipeline 3: INACTIVOS + REACTIVACIÓN (3 etapas)
  □ INACTIVO DETECTADO
  □ RAZÓN IDENTIFICADA
  □ REACTIVADO / PERDIDO

□ Pipeline 4: RECURRENCIA (3 etapas)
  □ EN RECURRENCIA
  □ SESIÓN COMPLETADA
  □ PAUSADO / CANCELADO

□ Todos los pipelines están visibles en GHL Console
□ El orden de etapas es correcto en cada pipeline
```

---

## 💡 TIPS IMPORTANTES

✅ **Nombres exactos:** Copiar exactamente de este documento (mayúsculas/minúsculas)  
✅ **Orden correcto:** Las etapas deben estar en el orden especificado  
✅ **Sin símbolos especiales:** Evitar emojis o caracteres especiales en nombres  
✅ **Guardar después de cada pipeline:** GHL guarda automáticamente  
✅ **Recargar página:** Si no ves los cambios, recarga GHL Console (F5)

---

## ⚠️ SOLUCIÓN DE PROBLEMAS

### **Problema: No veo botón "+ New Pipeline"**
**Solución:** Asegúrate de estar en Settings → Pipelines (no en otra sección)

### **Problema: No puedo agregar etapas**
**Solución:** Primero debes crear el pipeline base, LUEGO agregar etapas adentro

### **Problema: Cometí un error en el nombre de una etapa**
**Solución:** 
1. Haz clic en los 3 puntos (...) de la etapa
2. Selecciona "Edit"
3. Corrige el nombre
4. Guarda

### **Problema: Quiero borrar una etapa por error**
**Solución:**
1. Haz clic en los 3 puntos (...) de la etapa
2. Selecciona "Delete"
3. Confirma

---

## 📞 SOPORTE

Si tienes dudas durante la creación:

**Documentación:** Ver archivo `PIPELINES-DEFINICION.json` en carpeta `config/`  
**Contacto:** [Tu email/teléfono]  
**Tiempo estimado:** 15-20 minutos para los 4 pipelines

---

**¡Listo! Después de completar esto, los 4 pipelines están listos para configurar automaciones, integraciones y campos personalizados.** ✨
