# ✅ CHECKLIST PROYECTO CARLOS PERLAZA - GHL CRM

**Última actualización:** 2026-08-20  
**Progreso General:** 50% completado

---

## 🟢 COMPLETADO

### FASE 1: Campos Personalizados (100% ✅)
- [x] Crear 39 campos personalizados
- [x] Organizar en 10 carpetas temáticas
- [x] Validar estructura (31 Opp + 8 Contact)
- [x] Verificar en GHL Console

**Campos por Carpeta:**
- [x] Financiero (3)
- [x] Fechas y Programación (6)
- [x] Origen y Tracking (7)
- [x] Productos y Servicios (3)
- [x] Métodos de Pago (2)
- [x] Consulta y Atendimiento (5)
- [x] Equipo y Responsables (3)
- [x] Pérdida y Análisis (2)
- [x] Oportunidades Abiertas (4)
- [x] Seguimiento y Control (4)

### FASE 2: Pipelines & Stages (100% ✅)
- [x] Crear 4 pipelines en GHL Console
- [x] Crear 18 stages totales
- [x] Extraer IDs de pipelines y stages
- [x] Guardar en config/pipelines-ids-completo.json

**Pipelines Creadas:**
- [x] CONSULTA INICIAL (6 stages)
- [x] APARATOLOGÍA (5 stages)
- [x] RECURRENCIA (4 stages)
- [x] INACTIVOS (3 stages)

### FASE 2.5: Tags/Etiquetas (100% ✅)
- [x] Limpiar tags innecesarios (11 eliminados)
- [x] Renombrar con estándar guión (-) (32 renombrados)
- [x] Crear tag "primer-contacto"
- [x] Total final: 33 tags

---

## 🟡 EN PROGRESO

### FASE 3: Mapeo Campos → Stages (PRÓXIMO)
- [ ] Mapear 39 campos a 18 stages
- [ ] Documentar asignación campo-stage
- [ ] Crear script para asignar campos a stages
- [ ] Validar en GHL Console
- [ ] Guardar mapeo en config/campo-stage-mapping.json

**Mapeo Sugerido por Stage:**

#### Pipeline: CONSULTA INICIAL
```
├── LEAD CAPTURADO
│   └─ Campos: Origen, Source Type, Source Ads, UTM Campaign/Medium/Source, Fecha Entrada
├── LEAD CUALIFICADO
│   └─ Campos: Día de Agendamiento, Canal de Consulta
├── CITA AGENDADA
│   └─ Campos: Hora de Consulta, Período de Tratamiento
├── CONSULTA REALIZADA
│   └─ Campos: Número de Consulta, Hora de Consulta, Día de la Semana
├── CONVERTIDO
│   └─ Campos: Productos Adquiridos, Programa Vendido, Valor do Lead, Forma de Pago
└── PERDIDO
    └─ Campos: Motivo de Pérdida, Médico de la Pérdida, Probabilidad
```

#### Pipeline: APARATOLOGÍA
```
├── CONSULTA / EVALUACIÓN
│   └─ Campos: Productos Adquiridos, Programa Vendido
├── CANDIDATO APROBADO
│   └─ Campos: Forma de Pago, Plataforma Checkout, Valor Fechado
├── PRIMERA SESIÓN
│   └─ Campos: Fecha Inicio Programa, Cantidad de Procedimientos
├── SESIONES 2-X
│   └─ Campos: Renovación
└── CICLO COMPLETADO
    └─ Campos: Próximo Retorno Estimado, Fecha Fin Programa
```

#### Pipeline: RECURRENCIA
```
├── EN RECURRENCIA
│   └─ Campos: Período de Tratamiento
├── SESIÓN COMPLETADA
│   └─ Campos: Cantidad de Procedimientos
├── PAUSADO
│   └─ Campos: Motivo de Pérdida
└── CANCELADO
    └─ Campos: Motivo de Pérdida
```

#### Pipeline: INACTIVOS
```
├── INACTIVOS
│   └─ Campos: (tracking de inactividad)
├── REACTIVACION
│   └─ Campos: Op Nutrición, Op Onboarding, Op Fidelización, Op Comercial
└── RESPONDEÓ
    └─ Campos: Fecha Entrada, Canal de Consulta
```

---

## 🔴 POR HACER

### FASE 4: Automaciones & Workflows
- [ ] Crear automaciones para cambios de stage
- [ ] Workflows de notificación a equipo
- [ ] Auto-triggers basados en cambios de campo
- [ ] Tareas automáticas para seguimiento
- [ ] Notificaciones por SMS/Email

**Automaciones Clave:**
- [ ] Cuando oportunidad entra a "Aparatología" → enviar confirmación
- [ ] Cuando se completa consulta → crear tarea de seguimiento
- [ ] Cuando pasan 30 días sin actividad → mover a "Inactivos"
- [ ] Cuando cliente es inactivo 90 días → reactivación campaign
- [ ] Cuando se completa ciclo Aparatología → mover a Recurrencia

### FASE 5: Webhooks & Integraciones
- [ ] Configurar webhooks para eventos importantes
- [ ] API endpoints para sincronización
- [ ] Integración con sistema de pago (si aplica)
- [ ] Integración con sistema de agenda/calendario
- [ ] Logs y auditoría

### FASE 6: Reportes & Dashboards
- [ ] Dashboard de embudo de ventas (conversion funnel)
- [ ] Métricas de conversión por pipeline
- [ ] Reporte de revenue por procedimiento
- [ ] Analytics de seguimiento (lead source, tiempo en stages)
- [ ] Reporte de especialidades más vendidas
- [ ] KPIs de tasa de inactividad y reactivación

---

## 📋 ARCHIVOS CRÍTICOS

```
Carlos Perlaza/09_CRM_PROPIA/hub/
├── .env                              ✅ Credenciales
├── config/
│   ├── pipelines.json               ✅ Estructura de pipelines
│   ├── pipelines-ids-completo.json  ✅ IDs de pipelines/stages
│   └── campo-stage-mapping.json     ⏳ PRÓXIMO
├── scripts/
│   ├── crear-campos-sin-objectkey.mjs      ✅
│   ├── organizar-campos-finales.mjs        ✅
│   ├── extraer-ids-carpetas.mjs            ✅
│   ├── actualizar-tags.mjs                 ✅
│   ├── mapear-campos-a-stages.mjs          ⏳ PRÓXIMO
│   └── crear-automaciones.mjs              ⏳ TODO
└── DOCUMENTACION/
    ├── ESTADO_CAMPOS_PERSONALIZADOS.md   ✅
    └── ESTADO_PROYECTO_CARLOS_PERLAZA.md ✅
```

---

## 🎯 PRÓXIMOS PASOS INMEDIATOS

### 1. FASE 3: Mapeo Campos → Stages (2-3 horas)
```bash
# Crear script para mapear campos
node scripts/mapear-campos-a-stages.mjs

# Validar en GHL Console
# Guardar en config/campo-stage-mapping.json
```

### 2. FASE 4: Automaciones (4-5 horas)
```bash
# Crear automaciones en GHL Console
# O usar API para crearlas via script
node scripts/crear-automaciones.mjs
```

### 3. FASE 5: Webhooks (3-4 horas)
```bash
# Configurar webhooks
# Crear endpoints de sincronización
```

### 4. FASE 6: Reportes (2-3 horas)
```bash
# Crear dashboards
# Configurar métricas
```

---

## 📊 ESTIMADO DE TIEMPO

| Fase | Tarea | Estado | Duración |
|------|-------|--------|----------|
| 1 | Campos Personalizados | ✅ DONE | 6h |
| 2 | Pipelines & Stages | ✅ DONE | 3h |
| 2.5 | Tags/Etiquetas | ✅ DONE | 1h |
| 3 | Mapeo Campos-Stages | 🟡 NEXT | 2-3h |
| 4 | Automaciones | 🔴 TODO | 4-5h |
| 5 | Webhooks | 🔴 TODO | 3-4h |
| 6 | Reportes | 🔴 TODO | 2-3h |
| **TOTAL** | | | ~22h |

---

## 📞 NOTAS

- **Pipelines verificadas:** CONSULTA INICIAL, APARATOLOGÍA, RECURRENCIA, INACTIVOS
- **Campos validados:** 31 Opportunities + 8 Contacts = 39 total
- **Tags actuales:** 33 (33% más limpios que antes)
- **Estado general:** 50% del proyecto completado

