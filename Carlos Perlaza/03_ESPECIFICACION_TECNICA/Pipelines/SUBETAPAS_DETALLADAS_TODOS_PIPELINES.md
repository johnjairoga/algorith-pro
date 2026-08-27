# SUB-ETAPAS DETALLADAS - TODOS LOS PIPELINES
**Proyecto:** Sistema GHL - Clínica Dermatológica Puebla  
**Fecha:** 13 de agosto de 2026  
**Propósito:** Especificación técnica de TODAS las etapas en Go High Level  
**Usuario Final:** Carlos Perlaza (para aprobación)

---

# PIPELINE 1: CONSULTA INICIAL - LEAD → CITA AGENDADA

## Duración Total: 1-7 días | Valor: $150-300 MXN

### ETAPA 1.1: LEAD CAPTURADO
**Descripción:** Paciente completa formulario inicial desde web, WhatsApp o Facebook  
**Entrada:** Formulario enviado / Mensaje WhatsApp recibido  
**Salida:** Lead entra a GHL con datos básicos

| Aspecto | Detalle |
|---------|---------|
| **Duración en Etapa** | 0-5 minutos |
| **Responsable** | Sistema (automático) |
| **Datos Capturados** | Nombre, teléfono, email, servicio interesado, presupuesto, timeline |
| **Automaciones** | Mensaje WhatsApp bienvenida + Catálogo de servicios + Email confirmación |
| **Próxima Etapa** | Lead Calificado (automático o manual según respuesta) |
| **Criterio Avance** | Secretaria asigna tarea de llamada O sistema detecta respuesta |

**Acciones Automáticas Disparadas:**
```
├─ Enviar WhatsApp: Bienvenida + Catálogo
├─ Enviar Email: Información detallada del servicio
├─ Crear Tarea: Secretaria llamar en < 2h
├─ Tag automático: #LeadCapturado #[Servicio]
└─ Notificación: Admin panel "Nuevo Lead"
```

---

### ETAPA 1.2: LEAD CALIFICADO
**Descripción:** Secretaria confirma interés, presupuesto y timeline  
**Entrada:** Secretaria completa llamada o chat con paciente  
**Salida:** Lead confirmado con fecha de consulta

| Aspecto | Detalle |
|---------|---------|
| **Duración en Etapa** | 30 minutos - 24 horas |
| **Responsable** | Secretaria de clínica |
| **Datos Añadidos** | Confirmación de interés, respuesta a preguntas, disponibilidad de horario |
| **Automaciones** | Envío de opciones de horarios disponibles |
| **Próxima Etapa** | Cita Agendada |
| **Criterio Avance** | Paciente selecciona fecha/hora de consulta |

**Acciones Automáticas Disparadas:**
```
├─ Si Respuesta POSITIVA:
│  ├─ Enviar opciones de horarios (3-5 opciones)
│  ├─ Tag: #LeadCalificado
│  └─ Mover a etapa siguiente
│
├─ Si Respuesta NEGATIVA:
│  ├─ Tag: #LeadPerdido
│  ├─ Move a Pipeline: Leads Fríos (nurturing)
│  └─ Crear nota de por qué rechazó
│
└─ Si No responde en 48h:
   ├─ Recordatorio automático (SMS/Email)
   └─ Seguimiento manual secretaria
```

---

### ETAPA 1.3: CITA AGENDADA
**Descripción:** Paciente selecciona fecha/hora y recibe confirmación  
**Entrada:** Paciente hace click en horario disponible O secretaria agenda  
**Salida:** Cita confirmada, recordatorios programados

| Aspecto | Detalle |
|---------|---------|
| **Duración en Etapa** | 0 horas - 7 días (hasta día de cita) |
| **Responsable** | Sistema (confirmación) + Secretaria (seguimiento) |
| **Datos Añadidos** | Fecha exacta, hora, doctor asignado, dirección confirmada |
| **Automaciones** | Confirmación inmediata + Recordatorios 24h, 12h, 1h |
| **Próxima Etapa** | Consulta Realizada |
| **Criterio Avance** | Paciente asiste a cita (automático al confirmar presencia) |

**Acciones Automáticas Disparadas:**
```
├─ INMEDIATO (T=0):
│  ├─ Enviar WhatsApp: Confirmación de cita
│  ├─ Enviar Email: Detalles + Mapa + Instrucciones
│  ├─ SMS: Recordatorio simple (backup)
│  └─ Tag: #CitaConfirmada
│
├─ 24 HORAS ANTES:
│  ├─ WhatsApp: "Tu cita es mañana..."
│  ├─ Botón: "Confirmo asistencia" / "Reprogramar"
│  └─ Email: Recordatorio formal
│
├─ 12 HORAS ANTES:
│  ├─ Secretaria recibe alert: "Cita mañana"
│  └─ Si no confirmó: Llamada manual
│
├─ 2 HORAS ANTES:
│  ├─ SMS: "Tu cita es en 2 horas"
│  └─ Teléfono de clínica para confirmar
│
├─ SI PACIENTE CANCELA:
│  ├─ Marcar como "Cancelada"
│  ├─ Ofrecer otras fechas
│  ├─ Move a Pipeline: Reactivación (si es valiosa)
│  └─ Liberar slot en calendario
│
└─ SI PACIENTE NO RESPONDE (No-show):
   ├─ Tag: #NoShow
   ├─ Mensaje: "Te extrañamos, ¿qué pasó?"
   ├─ Ofrecer rescheduling
   └─ Move a Pipeline: Leads Fríos
```

---

### ETAPA 1.4: CONSULTA REALIZADA
**Descripción:** Paciente asiste a consulta con doctor  
**Entrada:** Paciente se presenta en clínica a su hora  
**Salida:** Doctor toma decisión y propone plan

| Aspecto | Detalle |
|---------|---------|
| **Duración en Etapa** | 45-60 minutos |
| **Responsable** | Doctor de clínica |
| **Datos Añadidos** | Notas médicas, fotos antes, presupuesto exacto, plan propuesto |
| **Automaciones** | Generación de plan personalizado (PDF), opciones de pago |
| **Próxima Etapa** | Convertido (Pago) O Perdido (No interesa) |
| **Criterio Avance** | Doctor marca "consulta completada" + paciente contrata O no |

**Acciones Automáticas Disparadas:**
```
├─ DURANTE CONSULTA (Doctor registra):
│  ├─ Notas médicas
│  ├─ Fotos antes (3 ángulos)
│  ├─ Medidas específicas
│  ├─ Presupuesto exacto
│  └─ Plan de tratamiento
│
├─ INMEDIATAMENTE DESPUÉS:
│  ├─ Generar PDF: "Tu Plan Personalizado"
│  ├─ Enviar por Email + WhatsApp
│  ├─ Opciones de pago mostradas
│  └─ Contador: "Confirmación dentro de 48h"
│
├─ SI CONTRATA:
│  ├─ Tag: #Convertido #[Servicio]
│  ├─ Move a Pipeline correspondiente (Cirugía, Láser, etc)
│  ├─ Generar link de pago
│  └─ Crear cita de follow-up
│
└─ SI NO CONTRATA:
   ├─ Tag: #ConsultaNoConvirti
   ├─ Move a Pipeline: Leads Fríos
   ├─ Secuencia de follow-up automática
   └─ Oferta de reconversión en 7-14 días
```

---

### ETAPA 1.5: CONVERTIDO / PERDIDO
**Descripción:** Final de Pipeline 1 - Lead se convierte a paciente O se pierde  
**Entrada:** Decisión del paciente post-consulta  
**Salida:** Move a otro Pipeline

| Aspecto | Detalle |
|---------|---------|
| **Duración en Etapa** | 0-5 min (transición) |
| **Responsable** | Sistema automático |
| **CONVERTIDO** | Move a Pipeline 2, 3, 4, ó 5 según tipo de servicio |
| **PERDIDO** | Move a Pipeline 8 (Leads Fríos - Nurturing) |
| **Próximo Paso** | Ver Pipeline específico elegido |

---

---

# PIPELINE 2: CIRUGÍA PLÁSTICA

## Duración Total: 2-6 semanas | Valor: $2,000-15,000 MXN

### ETAPA 2.1: EVALUACIÓN POST-CONSULTA
**Descripción:** Doctor recomienda procedimiento quirúrgico específico  
**Entrada:** De Pipeline 1 (Consulta Realizada - Contrata)  
**Salida:** Paciente entiende plan y acepta presupuesto

| Aspecto | Detalle |
|---------|---------|
| **Duración en Etapa** | 0-3 días |
| **Responsable** | Doctor (evaluación) + Sistema (documentación) |
| **Datos Capturados** | Tipo cirugía, costo exacto, riesgos, alternativas, fotos antes |
| **Automaciones** | Plan quirúrgico (PDF) + Consentimiento informado + Guía pre-op |
| **Próxima Etapa** | Análisis de Laboratorio |
| **Criterio Avance** | Paciente firma consentimiento o realiza primer pago |

**Acciones Automáticas:**
```
├─ Enviar PDF: Plan Quirúrgico Personalizado
├─ Enviar PDF: Consentimiento Informado (firma digital)
├─ Enviar Guía: Preparación Pre-Quirúrgica
├─ Video (3-5 min): "¿Cómo es tu día de cirugía?"
├─ Casos similares: Fotos antes/después
└─ Link de Pago: Anticipo de X%
```

---

### ETAPA 2.2: ANÁLISIS DE LABORATORIO
**Descripción:** Paciente realiza análisis de sangre requeridos  
**Entrada:** Entiende plan y acepta presupuesto  
**Salida:** Resultados de laboratorio recibidos y validados

| Aspecto | Detalle |
|---------|---------|
| **Duración en Etapa** | 3-7 días |
| **Responsable** | Paciente (realiza) + Secretaria (valida) |
| **Datos Capturados** | Tipo análisis, fecha realizado, resultados, laboratorio |
| **Automaciones** | Recordatorio laboratorio + Alert si resultados llegan |
| **Próxima Etapa** | Pago y Programación |
| **Criterio Avance** | Resultados validados por doctor (sin riesgo quirúrgico) |

**Acciones Automáticas:**
```
├─ Lista de laboratorios asociados (con descuento)
├─ Requisición digital descargable
├─ Recordatorio: "Hacer análisis en próximos 5 días"
├─ Alert a secretaria: "Paciente no hizo análisis aún"
├─ Al recibir resultados:
│  ├─ Validar valores críticos
│  ├─ Alert a doctor si hay anomalías
│  └─ Bloquear cirugía si no apto
└─ Recordatorio: "Próxima etapa: Pago y Programación"
```

---

### ETAPA 2.3: PAGO Y PROGRAMACIÓN
**Descripción:** Paciente paga anticipo y cirugía se programa en quirófano  
**Entrada:** Resultados de laboratorio validados  
**Salida:** Cirugía oficialmente programada en agenda

| Aspecto | Detalle |
|---------|---------|
| **Duración en Etapa** | 1-2 días |
| **Responsable** | Paciente (pago) + Secretaria (programación) |
| **Datos Capturados** | Monto pagado, fecha cirugía, hora, quirófano asignado |
| **Automaciones** | Confirmación pago + Bloqueo en calendario + Notificaciones |
| **Próxima Etapa** | Pre-Quirúrgico Inmediato |
| **Criterio Avance** | Pago confirmado + Cirugía en calendario quirófano |

**Acciones Automáticas:**
```
├─ Si pago NO llega en 48h:
│  ├─ Recordatorio automático (WhatsApp + Email)
│  ├─ Oferta de facilidades de pago
│  └─ If still no payment: Liberar slot (hold 7 días máx)
│
├─ Si pago SÍ llega:
│  ├─ Confirmar en GHL + Sistema de pagos
│  ├─ Bloquear fecha en calendario
│  ├─ Notificar a doctor
│  ├─ Notificar a anestesista
│  ├─ Notificar a coordinadora de quirófano
│  └─ Enviar confirmación a paciente
│
├─ Instrucciones pre-op finales
├─ Checklist de qué traer día de cirugía
└─ Números de emergencia + contacto de clínica
```

---

### ETAPA 2.4: PRE-QUIRÚRGICO INMEDIATO
**Descripción:** Últimos 7 días antes de cirugía - preparación final  
**Entrada:** Cirugía programada en quirófano  
**Salida:** Paciente llega el día de cirugía

| Aspecto | Detalle |
|---------|---------|
| **Duración en Etapa** | 5-7 días |
| **Responsable** | Sistema (recordatorios) + Paciente (cumplimiento) |
| **Datos Capturados** | Confirmaciones de paciente, medicinas tomadas, preguntas |
| **Automaciones** | Múltiples recordatorios + Checklist de preparación |
| **Próxima Etapa** | Día de Cirugía |
| **Criterio Avance** | Llega el día 0 (día de cirugía) |

**Acciones Automáticas (Daily Reminders):**
```
├─ DÍA -7: "Una semana para tu cirugía. ¿Preguntas?"
├─ DÍA -5: "No olvides dejar de tomar aspirina hoy"
├─ DÍA -4: "Evita alcohol. Descansa mucho"
├─ DÍA -3: "Aumenta consumo de agua"
├─ DÍA -2: Checklist final
│  ├─ ¿Traerás acompañante?
│  ├─ ¿Traerás ID?
│  ├─ ¿Confirmaste que no tienes resfriado?
│  └─ [Botones SI/NO para cada uno]
│
├─ DÍA -1 (Noche anterior):
│  ├─ Instrucciones de ayuno (nada desde 20:00)
│  ├─ No beber agua desde 2h antes
│  ├─ Lavar bien la zona
│  ├─ NO maquillaje, NO perfume
│  └─ "¿Nerviosa? Es normal. Te vamos a cuidar"
│
└─ DÍA 0 (Día cirugía - 8:00 AM):
   ├─ "¡Buenos días! HOY ES TU DÍA"
   ├─ Timeline del día
   ├─ "Llegaste a las 9:30 AM?"
   └─ Números de emergencia
```

---

### ETAPA 2.5: DÍA DE CIRUGÍA
**Descripción:** Paciente se operá - evento crítico  
**Entrada:** Llega a clínica el día programado  
**Salida:** Cirugía completada exitosamente

| Aspecto | Detalle |
|---------|---------|
| **Duración en Etapa** | 3-4 horas en clínica (1.5-2.5h cirugía) |
| **Responsable** | Doctor + Anestesista + Enfermeras (Sistema registra) |
| **Datos Capturados** | Hora inicio/fin, incidentes, grasa removida, fotos quirófano |
| **Automaciones** | Registros de vitales (sistema hospitalario) + Notificaciones |
| **Próxima Etapa** | Post-Quirúrgico Inmediato |
| **Criterio Avance** | Cirugía completada + Paciente en recuperación |

**Eventos en Sistema:**
```
├─ 09:30 - Paciente llega
│  └─ Secretaria marca "Presente" en GHL
│
├─ 09:45 - Pre-op
│  └─ Anestesista marca "Pre-op iniciado"
│
├─ 10:30 - Comienza cirugía
│  ├─ Doctor presiona "INICIO CIRUGÍA"
│  ├─ Cronómetro automático inicia
│  ├─ Registra: Hora, Doctor, Anestesista, Enfermeras
│  └─ Sistema recibe vitales cada 5 min (monitoreo)
│
├─ DURANTE CIRUGÍA:
│  ├─ Cada 30 min: Reporte de progreso
│  ├─ Alert si hay complicaciones
│  └─ Familia recibe update (si enabled)
│
├─ FINALIZA CIRUGÍA (ej: 12:00):
│  ├─ Doctor presiona "CIRUGÍA COMPLETADA"
│  ├─ Calidad: "Excelente / Buena / Aceptable / Complicaciones"
│  ├─ Registra:
│  │  ├─ Duración real
│  │  ├─ Volumen grasa removida
│  │  ├─ Incidentes (si los hubo)
│  │  └─ Observaciones médicas
│  └─ Fotos post-cirugía (zona tratada)
│
└─ POST-CIRUGÍA:
   ├─ Paciente a sala de recuperación
   ├─ Sistema espera "PACIENTE DESPIERTA"
   ├─ Anestesista marca vitales estables
   └─ Move a siguiente etapa
```

---

### ETAPA 2.6: POST-QUIRÚRGICO INMEDIATO
**Descripción:** Primeras 48 horas post-cirugía - recuperación en casa  
**Entrada:** Paciente despierta y se va a casa  
**Salida:** Recuperación inicial sin complicaciones

| Aspecto | Detalle |
|---------|---------|
| **Duración en Etapa** | 2-3 días |
| **Responsable** | Paciente (cuidados) + Sistema (recordatorios) + Secretaria (excepciones) |
| **Datos Capturados** | Medicinas tomadas, dolor nivel, complicaciones, fotos cicatrización |
| **Automaciones** | Recordatorios cada 8h + Encuestas de estado + Alert si complicaciones |
| **Próxima Etapa** | Recuperación y Seguimiento |
| **Criterio Avance** | Pasan 48h sin complicaciones O complicación resuelta |

**Automaciones Intensivas:**
```
├─ PRIMERA NOCHE (T+4h):
│  ├─ WhatsApp: "¿Cómo estás? ¿Dolor manejable?"
│  ├─ Link de encuesta (dolor 1-10)
│  ├─ Recordatorio medicinas
│  └─ Si dolor > 8: Alert a secretaria
│
├─ CADA 8 HORAS (próximas 48h):
│  ├─ "¿Ya tomaste tus medicinas?"
│  ├─ "¿Drena mucho?" (si tiene drenajes)
│  ├─ "¿Fiebre? ¿Infección sospechada?"
│  ├─ [Botones SI/NO/EMERGENCIA]
│  └─ Foto de cicatrización (día 1, 2)
│
├─ DÍA 1 (24h después):
│  ├─ Email detallado con:
│  │  ├─ Qué esperar hoy
│  │  ├─ Medicinas a tomar
│  │  ├─ Restricciones movimiento
│  │  ├─ Cuándo llamar emergencia
│  │  └─ Video: "Primer día post-op"
│  └─ Foto de progreso
│
├─ DÍA 2 (48h después):
│  ├─ "¿Hinchazón bajando?"
│  ├─ "¿Moretones normales?"
│  ├─ "¿Cicatriz viéndose bien?"
│  └─ Si TODO OK → Move a siguiente etapa
│     Si hay complicaciones → Alert a doctor
│
└─ ALERTAS AUTOMÁTICAS:
   ├─ Fiebre > 38.5°C → EMERGENCIA
   ├─ Sangrado excesivo → EMERGENCIA
   ├─ Dificultad respirar → EMERGENCIA
   └─ [Más de 5 complicaciones potenciales documentadas]
```

---

### ETAPA 2.7: RECUPERACIÓN Y SEGUIMIENTO
**Descripción:** Semanas 3-6 post-cirugía - seguimiento de cicatrización  
**Entrada:** Primeras 48h sin complicaciones  
**Salida:** Alta médica y regreso a vida normal

| Aspecto | Detalle |
|---------|---------|
| **Duración en Etapa** | 3-4 semanas |
| **Responsable** | Sistema (seguimiento) + Doctor (revisiones) |
| **Datos Capturados** | Fotos cicatrización, dolor residual, movilidad, satisfacción |
| **Automaciones** | Recordatorios semanales + Citas de seguimiento + Encuestas |
| **Próxima Etapa** | COMPLETO - Move a Pipeline 6 (Retención) |
| **Criterio Avance** | 4 semanas de recuperación exitosa + Alta médica |

**Cronograma Seguimiento:**
```
├─ SEMANA 1 (Días 3-7):
│  ├─ Día 3: "¿Cómo va la recuperación?"
│  ├─ Día 5: "Cicatriz viéndose bien?"
│  ├─ Día 7: Cita de revisión (Doctor revisa en vivo)
│  └─ Foto de cicatrización (comparar con fotos post-op)
│
├─ SEMANA 2 (Días 8-14):
│  ├─ Día 8: "Puedes comenzar caminar 15-20 min"
│  ├─ Día 10: Cita de seguimiento #2 (Retirar drenajes si aplica)
│  ├─ Día 12: "¿Moretones bajando?"
│  ├─ Día 14: Foto de progreso (1 semana)
│  └─ Encuesta: "¿Cómo te ves con los cambios?"
│
├─ SEMANA 3-4 (Días 15-28):
│  ├─ Día 21: "Puedes volver a trabajo desk"
│  ├─ Día 24: "Cicatriz se ve genial"
│  ├─ Día 28: Foto de progreso (1 mes)
│  ├─ Cita final de revisión
│  └─ Encuesta de satisfacción (1-10)
│
└─ SEMANA 5-6 (Post-alta):
   ├─ Seguimiento mensual (si aplica)
   ├─ Foto a mes 2
   ├─ Foto a mes 3
   ├─ Encuesta final de resultados
   └─ Ofrecer procedimientos complementarios (UPSELL)
```

---

---

# PIPELINE 3: LÁSER / ESTÉTICA - TRATAMIENTOS RECURRENTES

## Duración Total: 1-12 semanas | Valor: $300-2K por sesión, 4-8 sesiones típicamente

### ETAPA 3.1: CONSULTA LÁSER/ESTÉTICA
**Descripción:** Doctor evalúa candidato para tratamiento laser  
**Entrada:** De Pipeline 1 (Consulta Inicial - Contrata Láser)  
**Salida:** Paciente entiende plan de sesiones

| Aspecto | Detalle |
|---------|---------|
| **Duración en Etapa** | 0-2 días |
| **Responsable** | Doctor especialista |
| **Datos Capturados** | Tipo de piel, Fitzpatrick clasificación, expectativas, fotos antes |
| **Automaciones** | Plan de sesiones (PDF), antes/después casos similares |
| **Próxima Etapa** | Evaluación de Candidato |
| **Criterio Avance** | Doctor aprueba como candidato viable |

**Acciones Automáticas:**
```
├─ Enviar galería antes/después (10-20 casos similares)
├─ PDF: "Tu Plan Personalizado de Tratamiento"
│  ├─ Número de sesiones recomendadas
│  ├─ Espaciamiento entre sesiones
│  ├─ Costo total vs individual
│  ├─ Resultados esperados timeline
│  └─ Restricciones durante tratamiento
├─ Video: "¿Cómo es una sesión de láser?"
└─ Opciones de pago: Sesión individual vs Paquete con descuento
```

---

### ETAPA 3.2: EVALUACIÓN DE CANDIDATO
**Descripción:** Doctor confirma que paciente es seguro para tratamiento  
**Entrada:** Consulta completada con datos médicos  
**Salida:** Aprobación de candidato

| Aspecto | Detalle |
|---------|---------|
| **Duración en Etapa** | 1 día |
| **Responsable** | Doctor |
| **Datos Capturados** | Contraindicaciones, medicinas que interfieren, tipo de piel confirmado |
| **Automaciones** | Aprobación automática O bloqueo con razón específica |
| **Próxima Etapa** | Primera Sesión |
| **Criterio Avance** | Doctor marca "APROBADO PARA TRATAMIENTO" |

**Decisiones del Sistema:**
```
├─ APROBADO:
│  ├─ Enviar instrucciones pre-sesión
│  ├─ Link para agendar primera sesión
│  └─ Move a "Primera Sesión"
│
└─ NO APROBADO (razones):
   ├─ "Tipo de piel no compatible"
   ├─ "Alergia a anestésico local"
   ├─ "Embarazo" (contraindicación temporal)
   ├─ "Medicinas interferentes" (ej: Roaccutane)
   └─ Ofrecer:
      ├─ Alternativa de tratamiento
      ├─ Reagendarizar en X meses
      └─ Move a Leads Fríos con nota
```

---

### ETAPA 3.3: PRIMERA SESIÓN
**Descripción:** Paciente asiste a primer tratamiento láser  
**Entrada:** Candidato aprobado + Sesión agendada  
**Salida:** Primera sesión completada con evaluación

| Aspecto | Detalle |
|---------|---------|
| **Duración en Etapa** | 1-2 días (30-60 min de procedimiento) |
| **Responsable** | Doctor + Técnico láser |
| **Datos Capturados** | Parámetros láser usados, reacción piel, fotos durante/después |
| **Automaciones** | Instrucciones post-sesión inmediatas, encuesta reacción |
| **Próxima Etapa** | Sesiones 2-X (Seguimiento) |
| **Criterio Avance** | Sesión completada sin complicaciones |

**Automaciones Post-Sesión:**
```
├─ INMEDIATO (en clínica):
│  ├─ Aplicar hidratante/protector
│  ├─ Entregar instrucciones post-sesión impresas
│  └─ Agendar próxima sesión (automático, 7-10 días después)
│
├─ 24 HORAS DESPUÉS:
│  ├─ WhatsApp: "¿Cómo te sientes? ¿Enrojecimiento normal?"
│  ├─ Encuesta: Reacción de piel (escala 1-10)
│  ├─ "¿Algún problema?"
│  ├─ Foto de piel (para tracking)
│  └─ Alert si reacción adversa (más de escala esperada)
│
├─ 72 HORAS DESPUÉS:
│  ├─ "¿Ya desapareció el enrojecimiento?"
│  ├─ "¿Viéndose cambios?"
│  └─ Reminder: "Tu próxima sesión es..." [FECHA]
│
└─ PRÓXIMA SESIÓN (7-10 días):
   ├─ Recordatorio 48h antes
   ├─ Instrucciones pre-sesión
   └─ Confirmación 24h antes
```

---

### ETAPA 3.4: SESIONES 2-X (SEGUIMIENTO)
**Descripción:** Ciclo repetido de sesiones hasta completar plan  
**Entrada:** Primera sesión exitosa  
**Salida:** Progreso visible en cada sesión

| Aspecto | Detalle |
|---------|---------|
| **Duración en Etapa** | Típicamente 4-8 semanas (1 sesión cada 7-10 días) |
| **Responsable** | Doctor + Paciente (adherencia) |
| **Datos Capturados** | Progreso observable, ajustes de parámetros, fotos antes/después cada sesión |
| **Automaciones** | Recordatorios automáticos, encuestas de progreso, alertas de ausencias |
| **Próxima Etapa** | Ciclo Completado |
| **Criterio Avance** | Completar todas las sesiones planeadas |

**Cada Sesión Repetida (Sesiones 2, 3, 4, etc.):**
```
├─ PRE-SESIÓN (48h antes):
│  ├─ Recordatorio automático
│  ├─ Instrucciones: "No tomar sol, no exfoliantes"
│  └─ Link para reprogramar si no puede
│
├─ DURANTE SESIÓN:
│  ├─ Doctor puede ajustar parámetros (según progreso)
│  ├─ Foto de progreso (comparar con sesión anterior)
│  ├─ Nota si hay cambios esperados
│  └─ Comentario: "Progreso excelente" / "Continuar igual" / "Necesita ajuste"
│
├─ POST-SESIÓN:
│  ├─ Misma secuencia que Sesión 1
│  ├─ Encuesta de satisfacción CON PROGRESO
│  ├─ "¿Ves cambios comparado a sesión anterior?"
│  │  ├─ Excelente cambio (1st option)
│  │  ├─ Cambio visible
│  │  ├─ Cambio ligero
│  │  └─ Sin cambio (Alert a doctor)
│  └─ FOTO COMPARATIVA (lado a lado con sesión anterior)
│
├─ SI NO ASISTE A SESIÓN:
│  ├─ Alert: "Faltaste a tu sesión"
│  ├─ Oferta de rescheduling gratis
│  ├─ "¿Hay problema? ¿Cambió de idea?"
│  ├─ Si falta 2 sesiones: Oferta de pausar tratamiento
│  └─ Retorno a futuro (mover a Leads Fríos si abandona)
│
└─ PROGRESO TRACKING:
   ├─ Sistema crea "gráfico de sesiones"
   ├─ Paciente ve: "Sesión 3 de 8" (progreso visual)
   ├─ Dashboard: Fotos lado-a-lado de antes/después
   └─ Si pausa: "Tienes X sesiones pendientes"
```

---

### ETAPA 3.5: CICLO DE TRATAMIENTO COMPLETADO
**Descripción:** Paciente termina plan de X sesiones - resultados finales  
**Entrada:** Última sesión completada  
**Salida:** Encuesta de satisfacción + Ofrecer mantenimiento

| Aspecto | Detalle |
|---------|---------|
| **Duración en Etapa** | 1-3 días (evaluación post-ciclo) |
| **Responsable** | Doctor (evaluación final) + Sistema (documentación) |
| **Datos Capturados** | Fotos antes/después final, satisfacción, resultados alcanzados |
| **Automaciones** | Galería antes/después, encuesta completa, oferta de mantenimiento |
| **Próxima Etapa** | Retención / Upsell |
| **Criterio Avance** | Paciente satisfecho + Encuesta completada |

**Acciones Finales:**
```
├─ FOTOS FINALES:
│  ├─ Doctor toma fotos finales (mismo ángulo que antes)
│  ├─ Sistema crea "Galería de Transformación"
│  ├─ Compara con fotos de sesión 1
│  ├─ Muestra progreso sesión-a-sesión
│  └─ Paciente recibe PDF: "Tu Transformación"
│
├─ ENCUESTA FINAL (NPS + Satisfacción):
│  ├─ "¿Logró tus objetivos?" (1-10)
│  ├─ "¿Recomendarías este tratamiento?" (Sí/No)
│  ├─ "¿Tomarías testimonial/foto para redes?" (Sí/No)
│  ├─ Comentarios abiertos
│  └─ Email con todas respuestas
│
├─ OFERTA DE MANTENIMIENTO:
│  ├─ "Ahora necesitas sesiones de retoque cada 3-6 meses"
│  ├─ Opción 1: Paquete de mantenimiento anual (descuento 20%)
│  ├─ Opción 2: Sesiones individuales pagadas
│  └─ "¿Cuándo quieres tu primera sesión de retoque?"
│
├─ TESTIMONIAL/PORTFOLIO:
│  ├─ Si autorizó: Move fotos a "Success Stories" (redes)
│  ├─ Invitar a dejar video testimonial
│  ├─ Ofrecer incentivo ($200-500 desc si lo hace)
│  └─ Publicar con consentimiento
│
└─ UPSELL COMPLEMENTARIO:
   ├─ "¿Te interesaría este otro tratamiento complementario?"
   ├─ Mostrar 2-3 opciones que combinen bien
   ├─ "Muchos pacientes que hacen [tratamiento1] luego hacen [2]"
   └─ Opción 1: Move a otro Pipeline (ej: Botox)
      Opción 2: Solo guardar interés (nurturing posterior)
```

---

### ETAPA 3.6: RETENCIÓN / UPSELL
**Descripción:** Mantener paciente activo - mantenimiento recurrente  
**Entrada:** Ciclo completado (con o sin mantenimiento)  
**Salida:** Paciente en contrato de retención OR Move a Leads Fríos

| Aspecto | Detalle |
|---------|---------|
| **Duración en Etapa** | Permanente (o hasta abandono) |
| **Responsable** | Sistema (recordatorios) + Secretaria (seguimiento personal) |
| **Próxima Etapa** | Move a Pipeline 6 (Retención) |

**Automatización:**
```
├─ SI ACEPTÓ RETOQUE/MANTENIMIENTO:
│  ├─ Recordatorio 1 semana antes de fecha planeada
│  ├─ Confirmar cita
│  ├─ Ir a Sesiones 2-X (mismo flujo)
│  └─ Move a Pipeline 6 (Retención)
│
├─ SI NO ACEPTÓ MANTENIMIENTO:
│  ├─ Recordatorio: "Tu tratamiento terminó hace 3 meses"
│  ├─ "¿Qué tal van los resultados?"
│  ├─ Oferta de sesión de retoque (15% desc)
│  ├─ Si no responde en 60 días:
│  │  └─ Move a Pipeline 7 (Reactivación)
│  └─ Si sí interesa:
│     └─ Agendar y volver a Sesiones (ciclo repetido)
│
└─ OFERTAS PERIÓDICAS:
   ├─ "Promoción especial para clientes leales"
   ├─ "Nuevo tratamiento similar: 20% desc"
   ├─ Programa de referidos (llevar amiga = desc)
   └─ Email trimestral con novedades
```

---

---

# PIPELINE 4: CLÍNICA PARA HOMBRES - PROCEDIMIENTOS MASCULINOS

## Duración Total: Variable | Valor: $500-5K MXN

*Nota: Flujos son similares a Pipelines 2 y 3, pero especializados para hombres*

### ETAPA 4.1: CONSULTA CONFIDENCIAL
**Descripción:** Especialista en procedimientos masculinos atiende hombre  
**Entrada:** De Pipeline 1 (Lead interesado en servicios hombres)  
**Salida:** Plan personalizado confidencial

| Aspecto | Detalle |
|---------|---------|
| **Duración en Etapa** | 30-45 minutos |
| **Responsable** | Doctor especializado en hombres |
| **Datos Capturados** | Procedimiento, expectativas, nivel de confidencialidad requerida |
| **Automaciones** | Plan confidencial + Énfasis en privacidad |
| **Próxima Etapa** | Según tipo de procedimiento (Cirugía, Láser, etc.) |
| **Criterio Avance** | Doctor recomienda procedimiento específico |

**Diferencias vs consulta general:**
```
├─ Énfasis en CONFIDENCIALIDAD
│  ├─ "Nadie necesita saberlo"
│  ├─ Archivo encriptado + privado
│  └─ Fotos confidenciales (nunca en redes sin permiso)
│
├─ CASOS SIMILARES DE HOMBRES:
│  ├─ Mostrar antes/después de hombres
│  ├─ Narrativa: "Como tú, discreto"
│  └─ Testimoniales de hombres
│
├─ TIEMPO POST-OP MÍNIMO:
│  ├─ Procedimientos en viernes (regresa lunes al trabajo)
│  ├─ Mínimo ausentismo
│  └─ Recuperación discreta
│
└─ EXPECTATIVAS REALISTAS:
   ├─ "Cambio notable pero natural"
   ├─ "Nadie notará la cirugía, solo que te ves mejor"
   └─ Fotos antes/después solo mostradas a paciente
```

### ETAPA 4.2-4.N: Flujos de Cirugía O Láser
*Usar flujos de Pipeline 2 o 3 según tipo de procedimiento contratado*

---

---

# PIPELINE 5: TRASPLANTE DE CABELLO - ARTAS ROBÓTICO

## Duración Total: 6-12 meses | Valor: $3K-12K MXN

### ETAPA 5.1: EVALUACIÓN DE CALVICIE
**Descripción:** Especialista evalúa candidato para trasplante ARTAS  
**Entrada:** De Pipeline 1 (Lead con interés en trasplante)  
**Salida:** Número de injertos necesarios definido

| Aspecto | Detalle |
|---------|---------|
| **Duración en Etapa** | 0-2 días |
| **Responsable** | Doctor especialista en trasplante |
| **Datos Capturados** | Grado de calvicie (Norwood scale), viabilidad donante, foto cabello |
| **Automaciones** | Cálculo automático injertos + Presupuesto |
| **Próxima Etapa** | Evaluación Médica |
| **Criterio Avance** | Doctor determina candidato viable |

---

### ETAPA 5.2: EVALUACIÓN MÉDICA
**Descripción:** Validar salud general para procedimiento quirúrgico mayor  
**Entrada:** Evaluación capilar completada  
**Salida:** Aprobación médica general

| Aspecto | Detalle |
|---------|---------|
| **Duración en Etapa** | 1 semana |
| **Responsable** | Doctor general + Análisis sangre |
| **Automaciones** | Requisición análisis + Validación resultados |
| **Próxima Etapa** | Programación ARTAS |
| **Criterio Avance** | Análisis completos sin contraindicaciones |

---

### ETAPA 5.3: PROGRAMACIÓN ARTAS
**Descripción:** Agendar procedimiento con robot ARTAS en quirófano  
**Entrada:** Aprobación médica  
**Salida:** Procedimiento en calendario

| Aspecto | Detalle |
|---------|---------|
| **Duración en Etapa** | 1-2 semanas |
| **Responsable** | Secretaria + Doctor |
| **Próxima Etapa** | Pre-ARTAS |
| **Criterio Avance** | Pago confirmado + Fecha reservada |

---

### ETAPA 5.4: PRE-ARTAS
**Descripción:** Preparación 7-14 días antes  
**Entrada:** Procedimiento programado  
**Salida:** Llega el día de trasplante

| Aspecto | Detalle |
|---------|---------|
| **Duración en Etapa** | 7-14 días |
| **Responsable** | Sistema + Paciente |
| **Automaciones** | Recordatorios diarios + Instrucciones específicas |
| **Próxima Etapa** | Procedimiento ARTAS |
| **Criterio Avance** | Día del procedimiento llega |

---

### ETAPA 5.5: PROCEDIMIENTO ARTAS
**Descripción:** Extracción y implantación con robot ARTAS (4-8 horas)  
**Entrada:** Paciente llega el día  
**Salida:** Procedimiento completado + Paciente en recuperación

| Aspecto | Detalle |
|---------|---------|
| **Duración en Etapa** | 4-8 horas de procedimiento |
| **Responsable** | Doctor + Robot ARTAS + Equipo |
| **Automaciones** | Registro de procedimiento, fotos, datos de injertos |
| **Próxima Etapa** | Recuperación Inicial |
| **Criterio Avance** | Procedimiento completado sin complicaciones |

---

### ETAPA 5.6: RECUPERACIÓN INICIAL (Semanas 1-2)
**Descripción:** Primeras 2 semanas post-trasplante - cuidados intensivos  
**Entrada:** Procedimiento completado  
**Salida:** Sin complicaciones iniciales

| Aspecto | Detalle |
|---------|---------|
| **Duración en Etapa** | 14 días |
| **Responsable** | Paciente (cuidados) + Sistema (monitoreo) |
| **Automaciones** | Recordatorios diarios de cuidados + Encuestas estado |
| **Próxima Etapa** | Fase de Shedding |
| **Criterio Avance** | 2 semanas sin complicaciones |

**Recordatorios Diarios:**
```
├─ Día 1: "Descansa completamente"
├─ Día 2: "No laves cabeza aún"
├─ Día 3-7: "Protocolo de lavado especial" (PDF detallado)
├─ Día 7: "Retira puntos de zona donante" (cita médica)
├─ Día 10: "Puedes trabajar si desk job"
├─ Día 14: "Revisión médica 2 semanas post-op"
└─ Fotos diarias de zona implantada (tracking)
```

---

### ETAPA 5.7: FASE DE SHEDDING (Meses 1-3)
**Descripción:** Caída natural del cabello trasplantado (es NORMAL)  
**Entrada:** Después de 2 semanas post-op  
**Salida:** Shedding completado (cabello caído, raíces quedan)

| Aspecto | Detalle |
|---------|---------|
| **Duración en Etapa** | 6-12 semanas |
| **Responsable** | Sistema (tranquilizar) + Doctor (validar es normal) |
| **Automaciones** | Recordatorios que es normal + Evidencia científica |
| **Próxima Etapa** | Crecimiento de Nuevo Cabello |
| **Criterio Avance** | Shedding completo (cabello ha caído, raíces vivas) |

**Comunicación Crítica (Paciente se asusta):**
```
├─ SEMANA 4: "¿Empezó el shedding?"
│  ├─ Mensaje: "ES TOTALMENTE NORMAL"
│  ├─ Video científico: "Por qué cae cabello trasplantado"
│  ├─ Foto: "Esto es lo que vas a ver (no te asustes)"
│  └─ "La raíz está viva bajo el cuero cabelludo"
│
├─ SEMANA 6: Pico de shedding
│  ├─ "Esto significa que las raíces se enraizaron bien"
│  ├─ "En 4 semanas empezará a crecer nuevo cabello"
│  ├─ Recordatorio de medicinas (minoxidil, finasterida)
│  └─ Encuesta: "¿Confías en el proceso?"
│
└─ SEMANA 12: "Shedding debería estar completo"
   ├─ "Ahora vienen los resultados"
   ├─ "En 2-3 semanas verás mini pelos"
   └─ "Paciencia, estamos en la mejor parte"
```

---

### ETAPA 5.8: CRECIMIENTO DE NUEVO CABELLO (Meses 3-6)
**Descripción:** Cabello nuevo crece visiblemente cada mes  
**Entrada:** Shedding completado  
**Salida:** Resultados claros visibles

| Aspecto | Detalle |
|---------|---------|
| **Duración en Etapa** | 12-16 semanas |
| **Responsable** | Sistema (celebrar progreso) + Doctor (revisiones) |
| **Automaciones** | Recordatorios mensuales de medicinas + Fotos de progreso |
| **Próxima Etapa** | Resultados Finales |
| **Criterio Avance** | 6 meses post-op (cabello visible de 1-2 cm) |

**Celebración de Progreso:**
```
├─ MES 3: "¡Vemos mini pelos!"
│  ├─ Foto: Comparación (semana 12 vs semana 0)
│  ├─ Encuesta: "¿Ves cambios?"
│  └─ "Esto es el comienzo"
│
├─ MES 4: "¡Cabello de 0.5cm visible!"
│  ├─ "En 2 meses esto tendrá 2cm"
│  ├─ Fotos de progreso lado-a-lado
│  └─ Cita de revisión médica (validar crecimiento)
│
├─ MES 5: "¡Cabello de 1cm!"
│  ├─ "Ya puedes cortarte el cabello normal"
│  ├─ "El cabello nuevo se comporta igual al tuyo"
│  └─ Encuesta: "¿Satisfecho con progreso?"
│
└─ MES 6: "¡Cabello de 1.5-2cm!"
   ├─ "Ya ves el resultado definitivo"
   ├─ Fotos finales antes/después
   └─ Move a siguiente etapa
```

---

### ETAPA 5.9: RESULTADOS FINALES (Meses 6-12)
**Descripción:** Cabello establecido - resultados definitivos  
**Entrada:** 6 meses post-op  
**Salida:** Alta médica + Oferta de segundo procedimiento (si viable)

| Aspecto | Detalle |
|---------|---------|
| **Duración en Etapa** | 6+ meses (continuo) |
| **Responsable** | Sistema (seguimiento) |
| **Automaciones** | Fotos mensuales + Encuesta de satisfacción final |
| **Próxima Etapa** | Move a Pipeline 6 (Retención) |

**Culminación:**
```
├─ MES 12: FOTO FINAL ANTES/DESPUÉS
│  ├─ Mismo ángulo que foto inicio
│  ├─ Mismo iluminación
│  ├─ Comparación impactante
│  └─ "Tu transformación está completa"
│
├─ ENCUESTA FINAL:
│  ├─ "¿Logró objetivos?" (1-10)
│  ├─ "¿Te operarías de nuevo si necesitaras?" (Sí/No)
│  ├─ "¿Testimonial para redes?" (Sí/No)
│  └─ Video testimonial (si autoriza)
│
├─ MANTENIMIENTO A LARGO PLAZO:
│  ├─ Medicinas: Continuar minoxidil + finasterida
│  ├─ Seguimiento anual (opcional)
│  ├─ Si tuvo éxito: Oferta segundo trasplante (si candidato)
│  └─ Programa de referidos (llevar amigos = comisión)
│
└─ PORTFOLIO:
   ├─ Si autorizó: Publicar caso de éxito (redes)
   ├─ Incentivo: $500 desc o procedimiento gratis futuro
   └─ Move a Pipeline 6 (Retención + Programa Referidos)
```

---

---

# PIPELINE 6: RETENCIÓN Y FIDELIZACIÓN

## Duración Total: Permanente | Valor: $1K-3K/mes en servicios recurrentes

### ETAPA 6.1: PACIENTE CON SERVICIO COMPLETADO
**Descripción:** Paciente terminó servicio - ahora ofrecemos retención  
**Entrada:** De cualquier Pipeline (1-5) cuando servicio finaliza  
**Salida:** Paciente en programa de retención

| Aspecto | Detalle |
|---------|---------|
| **Duración en Etapa** | 1-3 días |
| **Responsable** | Sistema + Doctor |
| **Automaciones** | Encuesta de satisfacción + NPS + Oferta mantenimiento |
| **Próxima Etapa** | Paciente Activo en Seguimiento |
| **Criterio Avance** | Encuesta completada + Satisfacción > 7/10 |

---

### ETAPA 6.2: PACIENTE ACTIVO EN SEGUIMIENTO
**Descripción:** Paciente con citas recurrentes programadas  
**Entrada:** Aceptó programa de mantenimiento/seguimiento  
**Salida:** Citas completas regularmente

| Aspecto | Detalle |
|---------|---------|
| **Duración en Etapa** | 3-12 meses (mínimo) |
| **Responsable** | Paciente (cumplimiento) + Sistema (recordatorios) |
| **Automaciones** | Recordatorios de citas + Documentación de progreso |
| **Próxima Etapa** | Paciente Inactivo O VIP |

---

### ETAPA 6.3: PACIENTE INACTIVO (30+ días sin contacto)
**Descripción:** Paciente con cita pendiente próximamente  
**Entrada:** Automático cuando no hay cita en próximos 30 días  
**Salida:** Re-enganche OR Move a Reactivación

| Aspecto | Detalle |
|---------|---------|
| **Duración en Etapa** | Automático, trigger diario |
| **Automaciones** | Recordatorio amable + Oferta de retoque/mantenimiento |
| **Próxima Etapa** | Activo nuevamente (si responde) O Reactivación (si 60+ días) |

---

### ETAPA 6.4: PROGRAMA DE REFERIDOS
**Descripción:** Paciente refiere amigos/familia - gana descuentos  
**Entrada:** Paciente completado con satisfacción alta  
**Salida:** Nuevos pacientes vía referido

| Aspecto | Detalle |
|---------|---------|
| **Automaciones** | Link de referido único + Tracking de conversiones |
| **Comisión** | Descuento cuando referido se convierte |

---

### ETAPA 6.5: PACIENTE VIP
**Descripción:** Paciente premium - múltiples procedimientos, alto lifetime value  
**Entrada:** Automático basado en: lifetime value > $10K O 3+ procedimientos  
**Salida:** Trato preferencial

| Aspecto | Detalle |
|---------|---------|
| **Beneficios** | Acceso prioritario, descuentos VIP, atención personal |
| **Automaciones** | Llamada trimestral + Oferta de procedimientos nuevos |

---

---

# PIPELINE 7: REACTIVACIÓN - PACIENTES PERDIDOS

## Duración Total: 2-4 semanas | Valor: $500-2K MXN

### ETAPA 7.1: PACIENTE INACTIVO DETECTADO
**Descripción:** Sistema detecta paciente sin citas > 60 días  
**Entrada:** Automático, trigger diario  
**Salida:** Mensajes de re-enganche enviados

| Aspecto | Detalle |
|---------|---------|
| **Automaciones** | "Te extrañamos" + Encuesta de razón + Oferta especial |
| **Próxima Etapa** | Razón Identificada |

---

### ETAPA 7.2: RAZÓN DE PÉRDIDA IDENTIFICADA
**Descripción:** Análisis de por qué paciente se fue  
**Entrada:** Paciente responde encuesta O secretaria analiza  
**Salida:** Estrategia de regreso personalizada

| Aspecto | Detalle |
|---------|---------|
| **Razones Típicas** | Satisfecho pero necesita mantenimiento / Insatisfecho / Problemas económicos / Cambió de clínica / No responde |
| **Próxima Etapa** | Oferta Personalizada |

---

### ETAPA 7.3: OFERTA PERSONALIZADA
**Descripción:** Oferta específica según razón de pérdida  
**Entrada:** Razón identificada  
**Salida:** Paciente regresa OR pierde definitivamente

| Aspecto | Detalle |
|---------|---------|
| **Automaciones** | Oferta de descuento + Facilidades de pago + Nuevo servicio |
| **Próxima Etapa** | Reactivado (vuelve a Pipeline original) OR Perdido Permanente |

---

---

# PIPELINE 8: LEADS FRÍOS - NURTURING A LARGO PLAZO

## Duración Total: 3-12 meses | Valor: Variable (conversión futura)

### ETAPA 8.1: LEAD FRÍO CAPTURADO
**Descripción:** Lead interesado pero sin presupuesto/timeline claro  
**Entrada:** De Pipeline 1 (rechazó en consulta) O Pipeline 7 (paciente perdido)  
**Salida:** Entra a secuencia de nurturing

| Aspecto | Detalle |
|---------|---------|
| **Automaciones** | Clasificación de razón de no-conversión |
| **Próxima Etapa** | Educación Semanal |

---

### ETAPA 8.2: EDUCACIÓN SEMANAL
**Descripción:** Contenido educativo + Inspiracional + Promocional  
**Entrada:** Lead entra a nurturing  
**Salida:** Mantiene contacto con marca

| Aspecto | Detalle |
|---------|---------|
| **Frecuencia** | 1x por semana (Email O WhatsApp) |
| **Contenido** | Tips + Casos de éxito + Promociones limitadas + Testimonios |
| **Duración** | Indefinida (hasta conversión o opt-out) |
| **Automaciones** | Secuencia programada + Segmentación por interés |

---

### ETAPA 8.3: RE-ENGAGEMENT CADA 2 SEMANAS
**Descripción:** Si lead no abre emails - estrategia diferente  
**Entrada:** Lead no abre email semanal  
**Salida:** Re-enganchado O definitivamente perdido

| Aspecto | Detalle |
|---------|---------|
| **Automaciones** | WhatsApp visual + Consulta gratuita (si sigue indiferente) |
| **Próxima Etapa** | Calificación Periódica |

---

### ETAPA 8.4: CALIFICACIÓN PERIÓDICA
**Descripción:** Validar si lead está listo  
**Entrada:** Cadencia de 30 días  
**Salida:** Si ready → Move a Pipeline correspondiente / Si no → Continue nurturing

| Aspecto | Detalle |
|---------|---------|
| **Encuesta Mensual** | "¿Ya estás lista? ¿En cuánto tiempo?" |
| **Próxima Etapa** | Convertido (Move a Pipeline 1-5) OR Continue nurturing |

---

---

## 📊 RESUMEN: TOTAL DE SUB-ETAPAS POR PIPELINE

| Pipeline | Etapas | Total Sub-Etapas |
|----------|--------|------------------|
| 1. Consulta Inicial | 1.1 - 1.5 | 5 |
| 2. Cirugía Plástica | 2.1 - 2.7 | 7 |
| 3. Láser/Estética | 3.1 - 3.6 | 6 |
| 4. Clínica Hombres | 4.1 - 4.N | 2+ (reutiliza 2 y 3) |
| 5. Trasplante Cabello | 5.1 - 5.9 | 9 |
| 6. Retención | 6.1 - 6.5 | 5 |
| 7. Reactivación | 7.1 - 7.3 | 3 |
| 8. Leads Fríos | 8.1 - 8.4 | 4 |
| **TOTAL** | | **41 SUB-ETAPAS** |

---

## ✅ CHECKLIST DE VALIDACIÓN

**Para Carlos aprobar este documento:**

- [ ] ¿Están claras todas las etapas?
- [ ] ¿Las automations tiene sentido?
- [ ] ¿Los tiempos son realistas?
- [ ] ¿Faltan etapas o opciones?
- [ ] ¿Los mensajes son apropiados?
- [ ] ¿Las escaladas (emergencias) están cubiertas?
- [ ] ¿Hay opciones para cuando paciente no quiere?
- [ ] ¿Cómo se ve en GHL los "Kanban boards"?

---

**Documento Preparado:** 13 de agosto de 2026  
**Versión:** 1.0 - SUB-ETAPAS DEFINIDAS  
**Responsable:** Claude Code + Equipo  
**Estado:** 🟢 LISTO PARA APROBACIÓN POR CARLOS  
**Próximo Paso:** Revisión + Aprobación → Implementación en SPRINT 1
