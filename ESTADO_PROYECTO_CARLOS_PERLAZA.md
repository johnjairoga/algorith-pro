# 📋 ESTADO PROYECTO: CARLOS PERLAZA GHL CRM

**Última actualización:** 2026-08-20  
**Estado:** 🟢 En Progreso  
**Progreso General:** 35% completado

---

## ✅ COMPLETADO

### 1. Arquitectura de Pipelines (100%)
- ✅ Diseño de 4 pipelines simplificadas
  - Consulta Inicial
  - Aparatología
  - Inactivos + Reactivación
  - Recurrencia
- ✅ Total: 17 stages distribuidas

### 2. Campos Personalizados (100%)
- ✅ 39 campos creados y organizados
- ✅ 31 campos de Oportunidades
- ✅ 8 campos de Contactos
- ✅ Organizados en 10 carpetas temáticas

**Desglose de Campos por Carpeta:**

| Carpeta | Cantidad | Campos |
|---------|----------|--------|
| 💰 Financiero | 3 | Valor Restante a Pagar, Valor Fechado, Valor do Lead |
| 📅 Fechas y Programación | 6 | Fechas de cierre, pago, inicio, fin, agendamiento, período |
| 🎯 Origen y Tracking | 7 | Origen, Fuente, Source Type, Source Ads, UTM Campaign/Medium/Source |
| 📦 Productos y Servicios | 3 | Productos Adquiridos, Programa Vendido, Renovación |
| 💳 Métodos de Pago | 2 | Forma de Pago, Plataforma Checkout |
| 👥 Consulta y Atendimiento | 5 | Día/Hora/Número/Canal de Consulta, Envío Checkin |
| 👔 Equipo y Responsables | 3 | Vendedor, Propietario, Médico de Pérdida |
| 📊 Pérdida y Análisis | 2 | Motivo de Pérdida, Probabilidad de Previsión |
| 🔓 Oportunidades Abiertas | 4 | Op Nutrición, Onboarding, Fidelización, Comercial (CONTACTO) |
| 📋 Seguimiento y Control | 4 | Próximo Retorno, Procedimientos, Origen Lead, Fecha Entrada (CONTACTO) |

### 3. Validaciones & Testing (100%)
- ✅ Script `obtener-campos-existentes.mjs` validó estructura
- ✅ Todos los 39 campos verificados en GHL Console
- ✅ Confirmado: 31 de Oportunidades + 8 de Contactos

---

## 🚀 PRÓXIMOS PASOS (En Orden)

### FASE 2: Configuración de Pipelines en GHL (PRÓXIMO)
**Estimado:** 2-3 horas
- [ ] Crear las 4 pipelines en GHL Console
- [ ] Asignar stages a cada pipeline
- [ ] Asignar campos personalizados a cada stage
- [ ] Configurar permisos por pipeline

**Archivos a crear:**
- `scripts/setup-pipelines.mjs` - Crear pipelines vía API
- `scripts/assign-fields-to-stages.mjs` - Mapear campos a stages

---

### FASE 3: Automaciones & Workflows (DESPUÉS DE FASE 2)
**Estimado:** 4-5 horas
- [ ] Crear automaciones para cambios de stage
- [ ] Workflows de notificación a equipo
- [ ] Auto-triggers basados en campos
- [ ] Tareas automáticas para seguimiento

**Automaciones clave:**
- Cuando oportunidad entra a "Aparatología" → enviar confirmación
- Cuando se completa consulta → crear tarea de seguimiento
- Cuando pasan 30 días sin actividad → mover a "Inactivos"
- Cuando cliente es inactivo por 90 días → reactivación campaign

---

### FASE 4: Webhooks & Integraciones (DESPUÉS DE FASE 3)
**Estimado:** 3-4 horas
- [ ] Webhooks para sincronización con sistemas externos
- [ ] API endpoints para datos de consultas
- [ ] Integración con sistema de pago (si aplica)
- [ ] Logs y auditoría

---

### FASE 5: Reportes & Dashboards (FINAL)
**Estimado:** 2-3 horas
- [ ] Dashboard de embudo de ventas
- [ ] Métricas de conversión por pipeline
- [ ] Reporte de revenue por procedimiento
- [ ] Analytics de seguimiento

---

## 📍 Ubicación de Archivos

```
Carlos Perlaza/09_CRM_PROPIA/hub/
├── crear-campos-sin-objectkey.mjs      ✅ Creación de campos
├── organizar-campos-finales.mjs        ✅ Organización en carpetas
├── extraer-ids-carpetas.mjs            ✅ Listado de carpetas
├── .env                                ✅ Credenciales (actualizado)
└── (Próximos scripts de Phase 2...)
```

---

## 🔑 Credenciales & IDs Importantes

```
Location ID: 1nQ7RropfSamHsRQbK8R
PIT Token: pit-14532034-8592-4409-b18e-a91d86368116

Carpetas Creadas (IDs):
- Financiero: DPFmK2NYkyTmvs9LsjGU
- Fechas y Programación: JlUDP5r4S4QJwlIm49Ix
- Origen y Tracking: DBIMfVDlnJaZT5nwSDVS
- Productos y Servicios: IIBRrf39LZen2caHxkmb
- Métodos de Pago: bwh3rvfVhlEjAeSPu6jj
- Consulta y Atendimiento: 5wolpAVZgBatChO2lup9
- Equipo y Responsables: xBVGEEbpT5nKLERUIBv3
- Pérdida y Análisis: gCdYlwQdRxOwChHHrbYS
- Oportunidades Abiertas: qdJuVVUwHO90Dum9WKtU
- Seguimiento y Control: X4rexPd19yPB6akvN4u8
```

---

## 📊 Estadísticas del Proyecto

| Métrica | Valor |
|---------|-------|
| Campos Personalizados | 39 |
| Carpetas de Organización | 10 |
| Pipelines Planeadas | 4 |
| Stages Totales | 17 |
| Estado | 🟢 En Construcción |
| Tiempo Invertido | ~8 horas |

---

## 🎯 Decisiones Importantes

1. **Simplificación de Pipelines:** Se redujo de 8 a 4 pipelines para mayor eficiencia operativa
2. **Categorización de Campos:** Organizados por funcionalidad (no por modelo) para mejor UX
3. **Uso de API v2.0:** Se descubrió que el endpoint correcto es `/locations/{ID}/customFields` con parámetro `model`
4. **Campos de Contactos:** Se mezclaron con carpetas de Oportunidades para vista integrada (Oportunidades Abiertas, Seguimiento y Control)

---

## ⚠️ Notas Importantes

- El endpoint `/custom-fields/` (v3) rechaza `objectKey: "opportunity"` → usar `/locations/{ID}/customFields` con `model: "opportunity"`
- Los campos de prueba fueron eliminados automáticamente
- Los IDs de carpetas son estables y pueden ser reutilizados en scripts
- Version header debe ser `2021-07-28` para compatibilidad

---

## 📞 Contacto

**Proyecto:** Carlos Perlaza - Clínica de Dermatología  
**Responsable:** [Usuario]  
**Email:** team@triadeflow.com.br
