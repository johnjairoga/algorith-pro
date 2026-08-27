# Jobs - Fase 2 (Futuro)

Esta carpeta contendrá jobs para operaciones escalables y con reintentos automáticos.

## Usar cuando:
- Importar base antigua de contactos (reintentos si falla a mitad)
- Disparos en masa (con dry-run y guardrails)
- Sincronización de datos de múltiples fuentes
- Replicar setup en otras subcuentas

## Jobs Planificados:

### 1. `importContactsJob.js`
Importar contactos de CSV/API con:
- ✅ Reintentos automáticos
- ✅ Dry-run preview
- ✅ Progreso y checkpoint
- ✅ Log de erros

### 2. `reactivateBaseJob.js`
Reactivar base antigua con:
- ✅ Límite máximo hardcoded
- ✅ Allowlist para validar con Camila
- ✅ Feature flag desligada por padrão
- ✅ Mensaje de conformidad LGPD

### 3. `broadcastJob.js`
Disparar mensaje en masa a:
- ✅ Segmento específico (ej: alunos-ativos)
- ✅ Dry-run de quién recibiría
- ✅ Rate limiting por canal

### 4. `syncDataJob.js`
Sincronizar cambios de otra fuente:
- ✅ Identificar cambios
- ✅ Actualizar en GHL
- ✅ Reportar resultados

## Cómo será usado:

```javascript
// Vía Orchestrator en Fase 2
const job = await orchestrator.queueJob('importContacts', {
  file: 'base-antiga.csv',
  dryRun: true,
  maxContacts: 50
});

// Monitored
job.on('progress', percent => console.log(`${percent}%`));
job.on('complete', results => console.log('✅ Done!');
```

## Stack planeado:
- Bull (job queue)
- Redis (persistencia)
- Retry logic automática
