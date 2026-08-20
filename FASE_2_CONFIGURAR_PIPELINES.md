# 🚀 FASE 2: Configuración de Pipelines en GHL

**Estado:** 🔴 No iniciado  
**Duración Estimada:** 2-3 horas  
**Dependencias:** FASE 1 (COMPLETADA ✅)

---

## 📋 Tareas de FASE 2

### 1️⃣ Crear las 4 Pipelines (Manual o Script)

#### Opción A: Manual (GHL Console)
1. Ir a **Settings → Pipelines**
2. Click en **"New Pipeline"**
3. Crear cada pipeline con sus stages

#### Opción B: Script (API) - RECOMENDADO
```bash
cd "Carlos Perlaza/09_CRM_PROPIA/hub"
node crear-pipelines.mjs
```

**Pipelines a Crear:**

#### Pipeline 1: CONSULTA INICIAL
```
Stages (5):
├── Lead Generado
├── Contacto Realizado
├── Consulta Agendada
├── Consulta Completada
└── Diagnóstico
```

#### Pipeline 2: APARATOLOGÍA
```
Stages (4):
├── Presupuesto Enviado
├── Presupuesto Aceptado
├── Tratamiento en Progreso
└── Tratamiento Completado
```

#### Pipeline 3: INACTIVOS + REACTIVACIÓN
```
Stages (5):
├── Cliente Activo
├── Sin Contacto (30 días)
├── Inactivo (60 días)
├── En Reactivación
└── Reactivado
```

#### Pipeline 4: RECURRENCIA
```
Stages (3):
├── Cliente Satisfecho
├── Programado Seguimiento
└── Nueva Cita Agendada
```

**Total: 17 stages**

---

### 2️⃣ Asignar Campos a Stages

**Campos por Stage:**

| Stage | Campos Aplicables |
|-------|-------------------|
| **Lead Generado** | Origen, Source Type, Source Ads, UTM Campaign/Medium/Source |
| **Contacto Realizado** | Fecha de Entrada, Canal de Consulta, Hora de Consulta |
| **Consulta Agendada** | Día de Agendamiento, Periodo de Tratamiento, Día para Envío Checkin |
| **Consulta Completada** | Número de Consulta, Hora de Consulta, Día de la Semana |
| **Diagnóstico** | Productos Adquiridos, Programa Vendido, Valor do Lead |
| **Presupuesto Enviado** | Forma de Pago, Plataforma Checkout, Valor Fechado |
| **Presupuesto Aceptado** | Valor Restante a Pagar, Renovación |
| **Tratamiento en Progreso** | Fecha Inicio Programa, Fecha Fin Programa |
| **Tratamiento Completado** | Cantidad de Procedimientos, Próximo Retorno Estimado |
| **Motivo Pérdida** | Motivo de la Pérdida, Médico de la Pérdida, Probabilidad |
| **En Reactivación** | Op Abierta (Nutrición, Onboarding, Fidelización, Comercial) |

---

### 3️⃣ Script para Crear Pipelines (Crear archivo)

**Archivo:** `crear-pipelines.mjs`

```javascript
#!/usr/bin/env node
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const locationId = process.env.GHL_LOCATION_ID;
const pitToken = process.env.GHL_PIT_TOKEN;

const headers = {
  'Authorization': `Bearer ${pitToken}`,
  'Content-Type': 'application/json',
  'Version': '2021-07-28'
};

const pipelines = [
  {
    name: 'Consulta Inicial',
    stages: [
      'Lead Generado',
      'Contacto Realizado',
      'Consulta Agendada',
      'Consulta Completada',
      'Diagnóstico'
    ]
  },
  {
    name: 'Aparatología',
    stages: [
      'Presupuesto Enviado',
      'Presupuesto Aceptado',
      'Tratamiento en Progreso',
      'Tratamiento Completado'
    ]
  },
  {
    name: 'Inactivos + Reactivación',
    stages: [
      'Cliente Activo',
      'Sin Contacto (30 días)',
      'Inactivo (60 días)',
      'En Reactivación',
      'Reactivado'
    ]
  },
  {
    name: 'Recurrencia',
    stages: [
      'Cliente Satisfecho',
      'Programado Seguimiento',
      'Nueva Cita Agendada'
    ]
  }
];

async function crearPipelines() {
  console.log('\n🚀 CREANDO 4 PIPELINES CON 17 STAGES...\n');
  
  let creadas = 0;
  let errores = 0;

  for (const pipeline of pipelines) {
    try {
      console.log(`📌 ${pipeline.name}...`);

      const res = await axios.post(
        `https://services.leadconnectorhq.com/locations/${locationId}/pipelines`,
        {
          name: pipeline.name,
          stages: pipeline.stages.map((stage, idx) => ({
            name: stage,
            position: idx
          }))
        },
        { headers, timeout: 15000 }
      );

      console.log(`   ✅ Creada (ID: ${res.data.pipeline.id})\n`);
      creadas++;
    } catch (e) {
      console.log(`   ❌ Error: ${e.response?.data?.message || e.message}\n`);
      errores++;
    }
  }

  console.log(`═════════════════════════════════════════════════════`);
  console.log(`✅ Creadas: ${creadas}/4`);
  console.log(`❌ Errores: ${errores}/4`);
  console.log(`═════════════════════════════════════════════════════\n`);
}

crearPipelines();
```

---

### 4️⃣ Validar Creación

**Script:** `validar-pipelines.mjs`

```bash
node validar-pipelines.mjs
```

Verificará:
- ✅ 4 pipelines creadas
- ✅ 17 stages totales
- ✅ Nombres correctos
- ✅ IDs de pipelines guardados

---

## 📝 Checklist

- [ ] Revisar las 4 pipelines en GHL Console
- [ ] Confirmar que todos los stages aparecen
- [ ] Anotar los IDs de pipelines (para próximas fases)
- [ ] Probar mover una oportunidad entre stages

---

## 🔄 Flujo de Trabajo Esperado

```
Cliente llega
    ↓
Lead Generado (Pipeline: Consulta Inicial)
    ↓
Contacto Realizado
    ↓
Consulta Agendada
    ↓
Consulta Completada (+ Diagnóstico)
    ↓
¿Necesita Aparatología?
    ├─ SÍ → Presupuesto Enviado (Pipeline: Aparatología)
    │       ↓
    │       Presupuesto Aceptado
    │       ↓
    │       Tratamiento en Progreso (6-8 semanas)
    │       ↓
    │       Tratamiento Completado
    │       ↓
    │       Cliente Satisfecho (Pipeline: Recurrencia)
    │
    └─ NO → Cliente Satisfecho (Pipeline: Recurrencia)
                ↓
                Programado Seguimiento
                ↓
                Nueva Cita Agendada
```

---

## 📞 Siguientes Fases (Después de FASE 2)

- **FASE 3:** Automaciones & Workflows
- **FASE 4:** Webhooks & Integraciones
- **FASE 5:** Reportes & Dashboards

---

## 💾 Archivos a Guardar Después

```
Carlos Perlaza/09_CRM_PROPIA/hub/
└── pipelines-ids.json     ← GUARDAR LOS IDs DE PIPELINES
```

Ejemplo:
```json
{
  "Consulta Inicial": "pipeline-id-123",
  "Aparatología": "pipeline-id-456",
  "Inactivos + Reactivación": "pipeline-id-789",
  "Recurrencia": "pipeline-id-012"
}
```

---

**¿Listo para empezar FASE 2? Responde "iniciar fase 2" cuando quieras comenzar.**
