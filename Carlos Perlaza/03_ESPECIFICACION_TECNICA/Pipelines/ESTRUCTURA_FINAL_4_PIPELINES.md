# ESTRUCTURA FINAL - 4 PIPELINES SIMPLIFICADOS
**Proyecto:** Clínica Dermatológica - Carlos Perlaza  
**Fecha:** 14 de agosto de 2026  
**Versión:** FINAL (Tercera Llamada - Decisión Confirmada)  
**Estado:** LISTO PARA CONSTRUIR EN GHL

---

## 🎯 VISIÓN GENERAL

En lugar de 8 pipelines complejos, construiremos **4 pipelines simples** que se adaptan a todos los 72 servicios (51 servicios + 21 máquinas) mediante:
- **Pipelines base:** Estructura fija
- **Filtros por tratamiento:** Cada contacto se filtra por servicio específico dentro del pipeline

**Ventaja:** Metrificación clara + simplicidad operativa + menos confusión para secretarias

---

---

## 📋 PIPELINE 1: CONSULTA INICIAL (Tratamientos Generales)

### 🎯 Objetivo
Convertir un **Lead cualquiera** (de cualquier tratamiento) en **Paciente que paga y se atiende**.

### 📊 Duración
1-7 días (desde que llega lead hasta que se realiza consulta)

### 💰 Valor Típico
$150-$300 MXN (solo consulta inicial, sin procedimiento)

### 🔀 Flujo Visual
```
┌─────────────────────────────────────────────────────────────┐
│ PIPELINE 1: CONSULTA INICIAL (TRATAMIENTOS)                 │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ETAPA 1: LEAD CAPTURADO                                   │
│  ├─ Trigger: Formulario web + WhatsApp + Instagram          │
│  ├─ Datos: Nombre, teléfono, email, servicio interesado     │
│  ├─ Acción Auto: Bienvenida WhatsApp (5 min)                │
│  ├─ Acción Auto: Enviar catálogo de servicios (1h)          │
│  ├─ Tarea Manual: Secretaria llama en <2h                   │
│  └─ Etiquetas: "Lead_Capturado", "No_Contactado"            │
│                                                              │
│  ↓ (Secretaria contacta y cualifica)                        │
│                                                              │
│  ETAPA 2: LEAD CUALIFICADO                                  │
│  ├─ Trigger: Secretaria confirma interés + capacidad pago   │
│  ├─ Datos: Servicio específico, presupuesto, disponibilidad  │
│  ├─ Acción Auto: Enviar opciones de cita                    │
│  ├─ Acción Auto: Enviar link de pago para reserva (opcional)│
│  ├─ Tarea Manual: Secretaria registra notas de llamada      │
│  └─ Etiquetas: "Lead_Cualificado", "Servicio_[X]"           │
│                                                              │
│  ↓ (Paciente selecciona fecha y hora)                       │
│                                                              │
│  ETAPA 3: CITA AGENDADA                                     │
│  ├─ Trigger: Paciente elige fecha/hora en calendario        │
│  ├─ Datos: Fecha cita, doctor asignado, monto pagado (si)   │
│  ├─ Acción Auto: Confirmación por WhatsApp                  │
│  ├─ Acción Auto: Instrucciones pre-consulta                 │
│  ├─ Acción Auto: Recordatorio 24h antes                     │
│  ├─ Acción Auto: Recordatorio 8h antes                      │
│  ├─ Acción Auto: Recordatorio 4h antes                      │
│  ├─ Acción Auto: Recordatorio 1h antes                      │
│  ├─ Acción Auto: Recordatorio 15 min antes                  │
│  ├─ Acción Auto: Recordatorio 5 min antes                   │
│  ├─ Tarea Manual: Preparar expediente médico                │
│  └─ Etiquetas: "Cita_Agendada", "Pre_Consulta"              │
│                                                              │
│  ↓ (Doctor completa la consulta)                            │
│                                                              │
│  ETAPA 4: CONSULTA REALIZADA                                │
│  ├─ Trigger: Doctor marca cita como completada              │
│  ├─ Datos: Notas médicas, diagnóstico, presupuesto plan     │
│  ├─ Acción Auto: Enviar notas de consulta por email         │
│  ├─ Acción Auto: Enviar opciones de tratamientos            │
│  ├─ Acción Auto: Formulario médico (historial/ayuda técnica)│
│  ├─ Tarea Manual: Seguimiento para próximo paso             │
│  └─ Etiquetas: "Consulta_Realizada", "Pendiente_Conversion" │
│                                                              │
│  ↓ (Paciente decide si continúa con tratamiento)            │
│                                                              │
│  ETAPA 5: CONVERTIDO (o PERDIDO)                            │
│  ├─ CONVERTIDO: Paciente contrata servicios                 │
│  │  ├─ Si es tratamiento recurrente → Move a Pipeline 4     │
│  │  ├─ Si es aparatología → Move a Pipeline 2               │
│  │  ├─ Si es procedimiento único → Stay en Consulta Inicial │
│  │  └─ Etiquetas: "Pagó", "Cliente_Activo"                  │
│  │                                                           │
│  └─ PERDIDO: Paciente no contrata                           │
│     ├─ Motivo registrado en notas                           │
│     ├─ Move a Pipeline 3 (Inactivos) después 30 días        │
│     └─ Etiquetas: "No_Convertido", "Inactivo"               │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 📋 TABLA DE ETAPAS

| Etapa | Qué pasa | Quién actúa | Datos clave | Acciones automáticas | Tareas manuales | Tiempo en etapa |
|-------|----------|-------------|------------|----------------------|-----------------|-----------------|
| 1. LEAD CAPTURADO | Lead llega por cualquier canal | Sistema | Nombre, teléfono, email, servicio | Bienvenida (5min) + Catálogo (1h) | Llamar <2h | 0-2h |
| 2. LEAD CUALIFICADO | Secretaria valida interés | Secretaria | Presupuesto, disponibilidad | Enviar opciones | Notas de llamada | 2h-1d |
| 3. CITA AGENDADA | Paciente selecciona fecha/hora | Paciente | Fecha, hora, doctor | 6 recordatorios automáticos | Preparar expediente | 1-7 días |
| 4. CONSULTA REALIZADA | Doctor atiende y completa | Doctor | Notas médicas, diagnóstico | Enviar resultados + opciones | Seguimiento próximo paso | 1-2h |
| 5. CONVERTIDO/PERDIDO | Paciente decide continuar o no | Paciente/Doctor | Estado final | Move a otro pipeline o inactividad | Registrar motivo si perdido | Final |

### 🏷️ Etiquetas (Tags) para este Pipeline

```
Automatizadas (Sistema):
- Lead_Capturado (al llegar)
- Lead_Cualificado (cuando secretaria valida)
- Cita_Agendada (cuando paciente elige fecha)
- Consulta_Realizada (cuando doctor termina)
- Pagó (cuando pago confirma en Stripe)
- Pre_Consulta (antes de cita)
- Post_Consulta (después de cita)
- No_Convertido (si no contrató)
- Cliente_Activo (si contrató y está en seguimiento)

Por Tratamiento (Filtro - Ejemplo):
- Servicio_Botox
- Servicio_Limpieza_Facial
- Servicio_Láser_Depilación
- etc.

Por Doctor (Filtro):
- Doctor_Maria
- Doctor_Carlos
- Doctor_Laura

Por Campaña (Filtro - Creado por John):
- Campaña_Facebook_Mayo
- Campaña_Instagram_Madres
- Campaña_Google_Ads
```

### 🤖 Automaciones Clave

| Automatización | Cuándo se ejecuta | Qué hace | Canal |
|---|---|---|---|
| Bienvenida | 5 min después de captura | Envía mensaje de bienvenida personalizado | WhatsApp |
| Catálogo | 1h después de captura | Envía catálogo de servicios | Email/WhatsApp |
| Recordatorio 24h | 24 horas antes de cita | Confirma si sigue en pie | WhatsApp |
| Recordatorio 8h | 8 horas antes de cita | Recuerda detalles importantes | WhatsApp |
| Recordatorio 4h | 4 horas antes de cita | Última confirmación | WhatsApp |
| Recordatorio 1h | 1 hora antes de cita | Ya está por llegar | WhatsApp |
| Recordatorio 15min | 15 min antes de cita | Ya debería estar aquí | WhatsApp |
| Recordatorio 5min | 5 min antes de cita | Está aquí? | WhatsApp |
| Envío de resultados | 30 min después de cita | Envía notas médicas | Email |
| Opciones de tratamiento | 2h después de cita | Muestra opciones del plan | Email/WhatsApp |

---

---

## 📋 PIPELINE 2: APARATOLOGÍA

### 🎯 Objetivo
Gestionar pacientes que compran **sesiones con máquinas/aparatos** (todos tratamientos recurrentes de corta duración).

### 📊 Características
- **72 máquinas láser diferentes** en la clínica
- **Todos son ambulatorios** (sin quirófano)
- **Sesiones cortas** (15-45 minutos típicamente)
- **Tratamientos recurrentes** (cada 30-90 días según máquina)

### 💰 Valor Típico
$300-$2,000 MXN por sesión (depende de máquina y área tratada)

### 🔀 Flujo Visual
```
┌──────────────────────────────────────────────────────────────┐
│ PIPELINE 2: APARATOLOGÍA (Máquinas Láser)                    │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│  ETAPA 1: CONSULTA / EVALUACIÓN                              │
│  ├─ Trigger: Lead interesado en tratamiento láser/máquina     │
│  ├─ Datos: Tipo de máquina, área a tratar, tipo de piel      │
│  ├─ Acción Auto: Enviar antes/después de la máquina          │
│  ├─ Acción Auto: Enviar plan típico de sesiones             │
│  ├─ Acción Auto: Enviar pricing (sesión vs paquete)         │
│  ├─ Tarea Manual: Agendar consulta con especialista         │
│  └─ Etiquetas: "Aparatologia_Consulta", "Maquina_[Tipo]"     │
│                                                               │
│  ↓ (Doctor evalúa candidato)                                 │
│                                                               │
│  ETAPA 2: CANDIDATO APROBADO (O RECHAZADO)                  │
│  ├─ Trigger: Doctor evalúa en consulta                       │
│  ├─ Datos: Tipo de piel, fotoclasificación, contraindicaciones│
│  ├─ Acción Auto: Enviar plan personalizado                   │
│  ├─ Acción Auto: Cuidados pre-tratamiento (24h antes)        │
│  ├─ Acción Auto: Ofrecer paquete con descuento               │
│  ├─ Tarea Manual: Validar comprensión de paciente            │
│  └─ Etiquetas: "Candidato_Aprobado", "Listo_Primera_Sesion"  │
│                                                               │
│  ↓ (Paciente contrata y paga)                                │
│                                                               │
│  ETAPA 3: PRIMERA SESIÓN                                     │
│  ├─ Trigger: Paciente paga primera sesión                    │
│  ├─ Datos: Fecha sesión, máquina, parámetros usados         │
│  ├─ Acción Auto: Confirmación de cita                        │
│  ├─ Acción Auto: Instrucciones post-tratamiento (protector solar)│
│  ├─ Acción Auto: Encuesta post-sesión (24h después)          │
│  ├─ Tarea Manual: Monitoreo durante tratamiento              │
│  └─ Etiquetas: "Primera_Sesion", "En_Tratamiento"            │
│                                                               │
│  ↓ (Paciente completa sesiones)                              │
│                                                               │
│  ETAPA 4: SESIONES 2-X (SEGUIMIENTO)                         │
│  ├─ Trigger: Cada sesión completada                          │
│  ├─ Datos: Progreso visible, cambios en parámetros, reacciones│
│  ├─ Acción Auto: Recordatorio próxima sesión (7-10 días)     │
│  ├─ Acción Auto: Cuidados post-sesión específicos            │
│  ├─ Acción Auto: Foto de progreso (si autoriza)              │
│  ├─ Tarea Manual: Evaluar si ajustar parámetros              │
│  └─ Etiquetas: "Sesion_[Numero]", "Progreso_Visible"         │
│                                                               │
│  ↓ (Paciente completa todas las sesiones del plan)           │
│                                                               │
│  ETAPA 5: CICLO COMPLETADO / OFERTA DE MANTENIMIENTO        │
│  ├─ Trigger: Paciente completó plan de X sesiones            │
│  ├─ Datos: Antes/después final, satisfacción, resultados     │
│  ├─ Acción Auto: Enviar galería de resultados                │
│  ├─ Acción Auto: Encuesta de satisfacción completa           │
│  ├─ Acción Auto: Ofrecer sesiones de mantenimiento           │
│  ├─ Acción Auto: Ofrecer otros tratamientos complementarios   │
│  ├─ Tarea Manual: Archivar resultados para portfolio          │
│  └─ Etiquetas: "Ciclo_Completado", "Listo_Mantenimiento"     │
│                                                               │
│  ↓                                                            │
│                                                               │
│  → Si contrata mantenimiento: Move a PIPELINE 4 (RECURRENCIA)│
│  → Si no responde: Move a PIPELINE 3 (INACTIVOS)             │
│                                                               │
└──────────────────────────────────────────────────────────────┘
```

### 📋 TABLA DE ETAPAS

| Etapa | Qué pasa | Quién actúa | Datos clave | Acciones automáticas | Tareas manuales | Duración |
|-------|----------|-------------|------------|----------------------|-----------------|----------|
| 1. CONSULTA | Lead elige máquina específica | Doctor | Tipo piel, área | Antes/después + plan + pricing | Agendar consulta | 1-3 días |
| 2. CANDIDATO APROBADO | Doctor valida que sea candidato | Doctor | Fotoclasificación | Plan personalizado + cuidados | Validar comprensión | 1-2 días |
| 3. PRIMERA SESIÓN | Paciente paga y se atiende | Paciente/Técnico | Parámetros de máquina | Instrucciones post + encuesta | Monitoreo | 1-2h |
| 4. SESIONES 2-X | Pacientes en sesiones recurrentes | Paciente/Técnico | Progreso, reacciones | Recordatorio próxima (7-10 días) | Ajuste parámetros | 30-90 días |
| 5. CICLO COMPLETADO | Paciente termina plan de sesiones | Paciente | Resultados finales | Galería + encuesta + oferta | Archivar resultados | 1 sesión |

### 🏷️ Etiquetas para este Pipeline

```
Automatizadas:
- Aparatologia_Consulta
- Candidato_Aprobado
- Primera_Sesion
- En_Tratamiento
- Sesion_[Numero]
- Progreso_Visible
- Ciclo_Completado
- Listo_Mantenimiento
- Pagó

Por Máquina (Filtro - EJEMPLOS):
- Maquina_Laser_Depilacion
- Maquina_Resurfacing
- Maquina_Radiofrequencia
- Maquina_LPG
- etc. (21 máquinas totales)

Por Doctor:
- Doctor_Maria
- Doctor_Carlos
- Doctor_Laura
```

### 🤖 Automaciones Clave

| Automatización | Cuándo se ejecuta | Qué hace | Canal |
|---|---|---|---|
| Envío antes/después | Al crear contacto | Muestra resultados de otros pacientes con esa máquina | Email/WhatsApp |
| Plan personalizado | Después de consulta | Envía plan de sesiones recomendado | Email |
| Cuidados pre | 24h antes de sesión | Recuerda qué hacer antes (no sol, no depilación, etc.) | WhatsApp |
| Confirmación sesión | 1h antes de sesión | Confirma que viene | WhatsApp |
| Cuidados post | 30min después de sesión | Instrucciones post-tratamiento (protector solar, etc.) | WhatsApp |
| Encuesta progreso | 48h después de sesión | ¿Qué tal quedó? ¿Reacciones? | WhatsApp |
| Recordatorio próxima | 7-10 días después | Es hora de tu próxima sesión | WhatsApp |
| Oferta mantenimiento | Después de ciclo | Sesiones de retoque cada 3-6 meses | Email/WhatsApp |

---

---

## 📋 PIPELINE 3: INACTIVOS + REACTIVACIÓN

### 🎯 Objetivo
**Detectar automáticamente** pacientes que desaparecen y **traerlos de vuelta** con estrategias personalizadas.

### 📊 Características
- Detección automática de inactividad (>30 días sin contacto)
- Segmentación por razón de inactividad
- Estrategias personalizadas de re-engagement

### 💰 Valor Típico
$500-$2,000 MXN (servicios de reactivación)

### 🔀 Flujo Visual
```
┌──────────────────────────────────────────────────────────────┐
│ PIPELINE 3: INACTIVOS + REACTIVACIÓN                         │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│  ETAPA 1: INACTIVO DETECTADO                                 │
│  ├─ Trigger: Sistema detecta >30 días sin contacto           │
│  │          (AUTOMÁTICO - NO REQUIERE ACCIÓN MANUAL)         │
│  ├─ Datos: Última interacción, servicios contratados antes    │
│  ├─ Acción Auto: "Te extrañamos!" - Mensaje amable           │
│  ├─ Acción Auto: Encuesta: ¿Cómo te fue con tratamiento?     │
│  ├─ Acción Auto: Fotos inspiradoras de nuevos tratamientos   │
│  ├─ Tarea Manual: Secretaria clasifica razón de inactividad  │
│  └─ Etiquetas: "Inactivo_30dias", "Pendiente_Contacto"       │
│                                                               │
│  ↓ (Sistema ESPERA RESPUESTA o Secretaria investiga)         │
│                                                               │
│  ETAPA 2: RAZÓN IDENTIFICADA                                 │
│  ├─ Trigger: Paciente responde O secretaria análiza          │
│  ├─ Posibles razones:                                        │
│  │  1. Satisfecho pero necesita mantenimiento                │
│  │  2. Insatisfecho con resultados                           │
│  │  3. Problemas económicos / sin presupuesto                │
│  │  4. Cambió a otra clínica                                 │
│  │  5. No responde (muy frío para reactivar)                 │
│  │                                                           │
│  ├─ Acción Auto: Ofrecer específica según razón              │
│  ├─ Acción Auto: Descuento de reactivación (15-25%)          │
│  ├─ Acción Auto: Envío de plan de mantenimiento              │
│  ├─ Tarea Manual: Follow-up en 3-5 días si no responde       │
│  └─ Etiquetas: "Razon_[X]", "Oferta_Enviada"                 │
│                                                               │
│  ↓                                                            │
│                                                               │
│  ETAPA 3: REACTIVADO (o PERDIDO PERMANENTE)                 │
│  ├─ REACTIVADO: Paciente contrata/agenda                    │
│  │  ├─ Move de vuelta a Pipeline 1, 2 o 4 (según servicio)  │
│  │  ├─ Se agrega etiqueta: "Reactivado_[Fecha]"             │
│  │  └─ Descuento aplicado automáticamente                   │
│  │                                                           │
│  └─ PERDIDO PERMANENTE: Paciente no responde                │
│     ├─ Move a "Archivo" después de 60+ días de inactividad  │
│     ├─ Motivo documentado en notas                          │
│     ├─ Se puede re-intentar cada 6 meses (estrategia anual)  │
│     └─ Etiquetas: "Perdido_Permanente", "Sin_Contacto_60d"   │
│                                                               │
└──────────────────────────────────────────────────────────────┘
```

### 📋 TABLA DE ETAPAS

| Etapa | Qué pasa | Quién actúa | Datos clave | Acciones automáticas | Tareas manuales | Duración |
|-------|----------|-------------|------------|----------------------|-----------------|----------|
| 1. INACTIVO DETECTADO | Sistema detecta 30+ días sin contacto | Sistema (automático) | Última interacción | Mensaje "Te extrañamos" + Encuesta | Secretaria investiga razón | 30+ días |
| 2. RAZÓN IDENTIFICADA | Se determina por qué se fue | Paciente/Secretaria | Razón de inactividad | Oferta personalizada según razón | Follow-up en 3-5 días | 3-7 días |
| 3. REACTIVADO/PERDIDO | Paciente regresa o se archiva | Paciente/Sistema | Estado final | Move a pipeline correspondiente o archivo | Registrar motivo final | Final |

### 🏷️ Etiquetas para este Pipeline

```
Automatizadas:
- Inactivo_30dias
- Inactivo_60dias
- Inactivo_90dias
- Oferta_Enviada
- Razon_Satisfecho_Mantenimiento
- Razon_Insatisfecho
- Razon_Economico
- Razon_Cambio_Clinica
- Razon_No_Responde
- Reactivado_[Fecha]
- Perdido_Permanente

Por origen (para análisis):
- Venia_Consulta_Inicial
- Venia_Aparatologia
- Venia_Recurrencia
- etc.
```

### 🤖 Automaciones Clave + Estrategias de Temporalidad

| Automatización | Cuándo | Qué hace | Canal | ESTRATEGIA |
|---|---|---|---|---|
| Detección automática | Día 30 sin contacto | Crea tarea para secretaria | Internal Task | (Sistema) |
| Te extrañamos | Inmediato al detectar | Mensaje amable | WhatsApp | Estándar |
| Encuesta razón | 1h después de mensajr | ¿Por qué te fuiste? | WhatsApp | Estándar |
| Fotos inspiradoras | 24h después | Muestra nuevos tratamientos | Email | Estándar |
| Oferta Día de Madres | Mayo (si está inactivo) | "Regálale consulta a mamá" | Email/WhatsApp | TEMPORAL |
| Oferta Día del Padre | Junio | "Papá merece verse bien" | Email/WhatsApp | TEMPORAL |
| Oferta Reactivación | 3-5 días después | Descuento 20% | Email/WhatsApp | Estándar |
| Último intento | Día 60 sin respuesta | "Última oportunidad" | Email | Estándar |

### 💡 EJEMPLOS DE ESTRATEGIAS TEMPORALES

```
TEMPORALIDAD MEXICANA (Estrategias de Reactivación):

Día de Madres (Mayo):
→ Mensaje: "Regálale a mamá una consulta para sus tratamientos"
→ Oferta: Consulta gratis + 15% descuento tratamiento

Día del Padre (Junio):
→ Mensaje: "Papá merece verse bien - Ven a consulta"
→ Oferta: Hombres: "Discreto y profesional"

Regreso a Clases (Agosto):
→ Mensaje: "Nueva tú, nuevo año escolar"
→ Oferta: Paquetes de tratamientos

Navidad (Diciembre):
→ Mensaje: "Llega a Navidad radiante"
→ Oferta: Paquetes premium con descuento

Año Nuevo (Enero):
→ Mensaje: "Propósito 2027: Tu mejor versión"
→ Oferta: Suscripciones anuales con descuento
```

---

---

## 📋 PIPELINE 4: RECURRENCIA

### 🎯 Objetivo
Gestionar pacientes que necesitan **visitas periódicas regulares** (cada 30, 60, 90 días, trimestral, semestral, etc.)

### 📊 Características
- Ciclos predefinidos por tratamiento
- Recordatorios automáticos según el ciclo
- Re-agendamiento automático o manual
- Ideal para: Botox, fillers, peeling, etc.

### 💰 Valor Típico
$1,000-$3,000 MXN/mes (recurrencia)

### 🔀 Flujo Visual
```
┌──────────────────────────────────────────────────────────────┐
│ PIPELINE 4: RECURRENCIA (Ciclos Periódicos)                  │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│  NOTA: Este pipeline es MUY SIMPLE - son solo 2-3 etapas    │
│        porque la mayoría del trabajo es AUTOMÁTICO            │
│                                                               │
│  ETAPA 1: PACIENTE EN RECURRENCIA (Activo)                   │
│  ├─ Trigger: Paciente completó ciclo y contrató renovación   │
│  ├─ Ciclos posibles:                                          │
│  │  - 30 días (ej: ciertos tratamientos de mantenimiento)    │
│  │  - 60 días (ej: láser depilación, peeling)                │
│  │  - 90 días (ej: botox típico)                             │
│  │  - Trimestral (4 sesiones/año)                            │
│  │  - Semestral (2 sesiones/año)                             │
│  │  - Anual (1 sesión/año)                                   │
│  │                                                           │
│  ├─ Datos: Ciclo configurado, próxima cita estimada          │
│  ├─ Acción Auto: Recordatorio X días antes (configurable)    │
│  ├─ Acción Auto: Confirmación de cita 48h antes              │
│  ├─ Acción Auto: Instrucciones pre-tratamiento               │
│  ├─ Acción Auto: Recordatoriosauto (24h, 1h, 15min)          │
│  ├─ Tarea Manual: Secretaria confirma si sigue/cambia ciclo  │
│  └─ Etiquetas: "Recurrencia_30d", "Cliente_VIP", "Activo"    │
│                                                               │
│  ↓ (Paciente completa sesión)                                │
│                                                               │
│  ETAPA 2: SESIÓN COMPLETADA → PRÓXIMA RECURRENCIA           │
│  ├─ Trigger: Doctor marca sesión como completada             │
│  ├─ Acción Auto: Cálculo automático de próxima fecha          │
│  ├─ Acción Auto: Crear nuevo "evento" en el ciclo            │
│  ├─ Acción Auto: Encuesta de satisfacción                    │
│  ├─ Acción Auto: Vuelve a ETAPA 1 (loop infinito)            │
│  ├─ Tarea Manual: Evaluar si cambiar ciclo o parar           │
│  └─ Etiquetas: "Sesion_Completada_[Fecha]", "Proximo_[Date]" │
│                                                               │
│  ↓ (Si paciente NO confirma)                                 │
│                                                               │
│  ETAPA 3: PAUSADO / CANCELADO (Opcional)                     │
│  ├─ Trigger: Paciente pide pausa o no responde en 2 ciclos   │
│  ├─ Acción Auto: Move a Pipeline 3 (Inactivos)               │
│  ├─ Acción Auto: Mensaje de confirmación                     │
│  ├─ Tarea Manual: Registrar motivo de pausa                  │
│  └─ Etiquetas: "Pausado_[Motivo]", "Potencial_Reactivacion" │
│                                                               │
│  ↓ (Si paciente reactiva en el futuro)                        │
│  → Move de vuelta a ETAPA 1 con nuevo ciclo                  │
│                                                               │
└──────────────────────────────────────────────────────────────┘
```

### 📋 TABLA DE ETAPAS

| Etapa | Qué pasa | Quién actúa | Datos clave | Acciones automáticas | Tareas manuales | Duración |
|-------|----------|-------------|------------|----------------------|-----------------|----------|
| 1. EN RECURRENCIA | Paciente en ciclo activo | Sistema | Ciclo (30/60/90d, trim, sem) | Recordatorios según ciclo | Confirmar renovación | Recurrente |
| 2. SESIÓN COMPLETADA | Doctor completa tratamiento | Doctor | Satisfacción, resultado | Próxima cita + encuesta | Evaluar cambio ciclo | 1 sesión |
| 3. PAUSADO/CANCELADO | Paciente pausa temporalmente | Paciente/Secretaria | Motivo de pausa | Move a Inactivos | Registrar motivo | Temporal |

### 🏷️ Etiquetas para este Pipeline

```
Automatizadas:
- Recurrencia_30dias
- Recurrencia_60dias
- Recurrencia_90dias
- Recurrencia_Trimestral
- Recurrencia_Semestral
- Recurrencia_Anual
- Cliente_VIP (paciente con múltiples recurrencias)
- Sesion_Completada_[Fecha]
- Proximo_[Fecha]
- Pausado_Temporal
- Pausado_Permanente

Ejemplos por Tratamiento (se combinan):
- Recurrencia_Botox_90d
- Recurrencia_Laser_60d
- Recurrencia_Peeling_30d
```

### 🤖 Automaciones Clave

| Automatización | Cuándo | Qué hace | Canal | Ejemplo |
|---|---|---|---|---|
| Recordatorio pre-ciclo | 7 días antes | Es hora de tu próxima sesión | WhatsApp | "Tu Botox se vence en 7 días" |
| Confirmación | 48h antes | ¿Confirmas tu cita? | WhatsApp | "Confirma tu Botox para el viernes" |
| Pre-tratamiento | 24h antes | Instrucciones previas | WhatsApp | "No tomes ibuprofeno antes" |
| Recordatorio final | 1h antes | Estás por llegar? | WhatsApp | "Tu cita es en 1 hora" |
| Encuesta post | 24h después | ¿Qué tal quedó? | WhatsApp | "¿Satisfecha con resultados?" |
| Próxima fecha | Inmediato post-sesión | Cálculo automático próximo ciclo | Internal | (Sistema calcula próxima fecha) |

---

---

## 🔄 CÓMO INTERACTÚAN LOS PIPELINES

### Flujo de un Paciente Típico (Ejemplo Real)

```
PACIENTE NUEVO BOTOX
├─ INICIA EN: Pipeline 1 - CONSULTA INICIAL
│  ├─ Lead llega (WhatsApp o formulario)
│  ├─ Secretaria lo valida
│  ├─ Agenda consulta
│  ├─ Doctor realiza consulta
│  └─ Paciente ACEPTA tratamiento Botox
│
├─ MUEVE A: Pipeline 4 - RECURRENCIA (90 días)
│  ├─ Se configura ciclo de 90 días
│  ├─ Recibe recordatorios automáticos
│  ├─ Completa primera sesión de Botox
│  ├─ Sistema calcula próxima sesión: 90 días después
│  ├─ Recibe recordatorios de la próxima sesión
│  ├─ Completa sesión 2 (90 días después)
│  └─ LOOP: Vuelve a empezar ciclo
│
├─ SI EN ALGÚN MOMENTO DESAPARECE (>30 días):
│  ├─ MUEVE A: Pipeline 3 - INACTIVOS
│  ├─ Sistema envía "Te extrañamos"
│  ├─ Si responde y quiere volver → vuelve a Pipeline 4
│  └─ Si no responde → Archivo
│
├─ SI QUIERE AGREGAR LÁSER DE DEPILACIÓN:
│  ├─ MUEVE A TAMBIÉN: Pipeline 2 - APARATOLOGÍA
│  ├─ Sigue recurrencia Botox (90d)
│  ├─ Y ahora TAMBIÉN sigue recurrencia Láser (60d)
│  ├─ Ambos corren en paralelo
│  └─ Recibe recordatorios de AMBOS en paralelo
│
└─ RESULTADO: Cliente VIP con 2 recurrencias activas
```

### Diagrama de Movimiento Entre Pipelines

```
                    ┌─────────────────────┐
                    │   PIPELINE 1        │
                    │  CONSULTA INICIAL   │
                    └──────────┬──────────┘
                               │
                    ┌──────────▼──────────┐
                    │ Paciente CONVIERTE? │
                    └──┬──────────────┬───┘
                       │              │
            SI (Continúa)    NO (Se Pierde)
                       │              │
          ┌────────────▼──┐    ┌──────▼─────────────┐
          │ ¿Qué tipo?    │    │  PIPELINE 3       │
          │               │    │  INACTIVOS        │
          └─┬─┬──────┬───┘    │  (Espera 30 días) │
            │ │      │        └──────┬─────────────┘
            │ │      │               │
       ┌────▼─▼────┐ │     ┌─────────▼──────┐
       │ PIPELINE2 │ │     │ Reactivación?  │
       │APARATOLOGIA
       │ │     └─────────┬──────────┘
       └────────┘        │          │
                 ┌───────▼──┐  ┌────▼───┐
                 │ PIPELINE │  │ARCHIVO │
                 │    4     │  │(Perdido)
                 │RECURRENCIA
                 └──────────┘
```

---

---

## 📊 TABLA COMPARATIVA: QUÉ DIFERENCIA CADA PIPELINE

| Aspecto | Pipeline 1: Consulta Inicial | Pipeline 2: Aparatología | Pipeline 3: Inactivos | Pipeline 4: Recurrencia |
|---------|---|---|---|---|
| **Objetivo** | Convertir lead en paciente | Gestionar máquinas/aparatos | Traer de vuelta pacientes | Ciclos periódicos |
| **Duración típica** | 1-7 días | 30-120 días | 30-60 días | ∞ (recurrente) |
| **# Etapas** | 5-6 | 5 | 2-3 | 2-3 |
| **Trigger de entrada** | Lead llega | Paciente elige máquina | >30 días sin contacto (auto) | Completa ciclo anterior |
| **Acciones manuales** | Muchas (secretaria llama) | Pocas (doctor evalúa) | Pocas (secretaria investiga) | Muy pocas (sistema automático) |
| **Acciones automáticas** | Bienvenida, recordatorios | Cuidados, fotos, plan | "Te extrañamos", encuestas | Recordatorios, ciclos |
| **Mejor para** | Nuevas consultas | Tratamientos láser | Re-engagement | Botox, fillers, mantenimiento |
| **Ciclo** | Finaliza o mueve a P4 | Mueve a P4 al terminar | Vuelve a P1, P2, P4 si reactiva | Loop infinito (hasta pausa) |

---

---

## 🎯 ORDEN DE CONSTRUCCIÓN RECOMENDADO

Para **Semana 2-3 de Setup**, recomendamos construir en este orden:

### **SEMANA 2 (PRIORIDAD 1-2)**

**1️⃣ Pipeline 1: CONSULTA INICIAL** ← PRIMERO
- Es la **puerta de entrada** del sistema
- Todos los pacientes pasan por aquí
- Es la más simple de las 4
- **Tareas:** 6 etapas + 3-4 recordatorios principales

**2️⃣ Pipeline 4: RECURRENCIA** ← SEGUNDO
- Es **95% automático** (sistema hace casi todo)
- Muchos pacientes irán aquí después de Consulta Inicial
- Relativamente simple
- **Tareas:** 2-3 etapas + ciclos configurados

### **SEMANA 3 (PRIORIDAD 3-4)**

**3️⃣ Pipeline 2: APARATOLOGÍA** ← TERCERO
- Más específico (máquinas)
- Intermedio en complejidad
- **Tareas:** 5 etapas + plan personalizado

**4️⃣ Pipeline 3: INACTIVOS** ← CUARTO (al final)
- Es **totalmente automático** (sistema detecta inactividad)
- No urgente el primer mes (pocos inactivos aún)
- **Tareas:** 2-3 etapas + estrategias temporales

---

## 📝 RESUMEN EJECUTIVO

| Pipeline | Complejidad | Prioridad | Semana | Entrega |
|---|---|---|---|---|
| 1. Consulta Inicial | Media | 🔴 CRÍTICA | Sem 2 | Estructura + Recordatorios |
| 4. Recurrencia | Baja | 🔴 CRÍTICA | Sem 2 | Ciclos + Automatizaciones |
| 2. Aparatología | Media-Alta | 🟡 ALTA | Sem 3 | 5 Etapas + Máquinas |
| 3. Inactivos | Baja | 🟡 ALTA | Sem 3 | Detección + Estrategias |

---

**Versión:** FINAL - Lista para construir en Go High Level  
**Actualizado:** 14 de agosto de 2026  
**Estado:** ✅ APROBADO PARA CONSTRUCCIÓN
