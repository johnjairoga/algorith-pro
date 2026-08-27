# Hub Triadeflow - Personal Geronto

Integração com GHL (Go High Level) para Personal Geronto. Desenvolvimento de pipelines, automações, campos personalizados e integrações.

## Arquitetura: Hybrid + Gradual

**Fase 1:** Servicios (lógica reutilizable) + API Endpoints (interface rápida)
**Fase 2:** Agregar Jobs (operaciones escalables con reintentos)

Esta arquitectura permite:
- ✅ Setup inicial simple vía endpoint
- ✅ Lógica preparada para reutilizar en otras subcuentas
- ✅ Escalabilidad futura sin refactorear
- ✅ Reintentos automáticos para operaciones críticas

## Status

✅ **Fase 1 (Servicios)** - Implementada
⏳ **Fase 1 (API Endpoints)** - En progreso
📅 **Fase 2 (Jobs/Queue)** - Estructurado, no implementado aún

## Estructura

```
hub-triadeflow/
├── src/
│   ├── lib/
│   │   └── ghl-client.js              # Cliente da API GHL (bajo nivel)
│   │
│   ├── services/                      # 🎯 FASE 1: Lógica reutilizable
│   │   ├── pipelineService.js         # Crear pipelines
│   │   ├── fieldService.js            # Crear campos personalizados
│   │   ├── tagService.js              # Crear tags
│   │   ├── workflowService.js         # Workflows seguros + riesgo
│   │   └── setupOrchestrator.js       # Orquestador (coordina todo)
│   │
│   ├── api/                           # 🔄 FASE 1: Endpoints (futuro)
│   │   └── setupRoutes.js             # POST /api/setup/phase1, etc
│   │
│   ├── cli/                           # CLI para ejecutar fases
│   │   ├── setupPhase1.js             # npm run setup:phase1
│   │   ├── setupPhase1Step2.js        # npm run setup:phase1-2
│   │   └── setupComplete.js           # npm run setup:all
│   │
│   ├── jobs/                          # 📅 FASE 2: Operaciones escalables
│   │   ├── importContactsJob.js       # Importar base (con reintentos)
│   │   ├── reactivateBaseJob.js       # Reactivar base (con guardrails)
│   │   ├── broadcastJob.js            # Disparos en masa (con dry-run)
│   │   └── README.md                  # Documentación
│   │
│   └── index.js                       # Entry point
│
├── config/
│   ├── pipelines.json                 # 6 funis
│   ├── custom-fields.json             # Campos comercial, operacional, recrutamiento
│   └── tags.json                      # Tags de segmentación
│
├── .env.example                       # Plantilla de variables
├── .gitignore                         # Excluir .env, node_modules
├── SETUP.md                           # Guía paso-a-paso
└── package.json
```

## Fluxo Fase 1: Servicios + Endpoints

### 1️⃣ Configuración Inicial

```bash
# Duplicar template de variables
cp .env.example .env

# Llenar .env con credenciales de GHL
GHL_LOCATION_ID=<de GHL Settings>
GHL_PIT_TOKEN=<generado en GHL API>
```

### 2️⃣ Instalar

```bash
npm install
```

### 3️⃣ Rodar Fase 1

**Opción A: Todo de una vez**
```bash
npm run setup:all
```

**Opción B: Por fases**
```bash
# Pipelines + Campos
npm run setup:phase1

# Tags + Workflows
npm run setup:phase1-2
```

**Opción C: Solo testear conexión**
```bash
npm run dev
```

## Fluxo Fase 2: Jobs (Futuro)

Cuando necesites importar base antigua o disparos en masa:

```bash
# Será algo como:
npm run queue:import-contacts -- --file base.csv --dry-run
npm run queue:broadcast -- --segment alunos-ativo --message "Promoção"
```

(Implementación pendiente - ver `src/jobs/README.md`)

## Servicios Disponibles

Puedes importar directamente en tu código:

```javascript
import SetupOrchestrator from './src/services/setupOrchestrator.js';
import PipelineService from './src/services/pipelineService.js';

const orchestrator = new SetupOrchestrator();
await orchestrator.setupPhase1();

const pipelines = new PipelineService();
const config = pipelines.getPipelineConfig();
```

## Seguridad - Regla NO MASS DISPATCH

⚠️ **Crítico:** Base antigua sin opt-in explícito (LGPD).

Cualquier disparo en masa exige:
1. ✅ Límite máximo hardcoded
2. ✅ Dry-run preview
3. ✅ Feature flag desligada por default
4. ✅ Allowlist para validar con Camila

Los workflows de riesgo están **BLOQUEADOS POR DEFECTO** en `workflowService.js`.

## Escalabilidad: Replicar en Otra Subcuenta

Mismo código, solo cambiar 1 variable:

```bash
# Para Academia dos Aposentados
GHL_LOCATION_ID=<otra-subcuenta-id>
npm run setup:all
```

¿Ves? La arquitectura con Servicios permite reutilizar sin modificar lógica.

## 📚 Documentación

- **[CONEXION-GHL.md](./CONEXION-GHL.md)** ← **Lee esto primero** para conectar a GHL
- **[PROMPT-REPLICA.md](./PROMPT-REPLICA.md)** ← Prompts para pedir ayuda
- **[SETUP.md](./SETUP.md)** - Setup antiguo (ver CONEXION-GHL.md en su lugar)
- **[README.md](./README.md)** - Este archivo
- Documentación GHL: `../PLANO-HUB.md`
- Briefing: `../BRIEFING-AS-IS.md`

## Próximos pasos

**Fase 1:**
- [ ] Configurar .env
- [ ] Instalar dependencias
- [ ] npm run setup:all
- [ ] Validar en GHL que se creó todo

**Fase 2:**
- [ ] Implementar API Endpoints
- [ ] Crear Jobs para importar base
- [ ] Agregar dry-run y guardrails
- [ ] Integraciones (IG, WhatsApp, Google Calendar)
