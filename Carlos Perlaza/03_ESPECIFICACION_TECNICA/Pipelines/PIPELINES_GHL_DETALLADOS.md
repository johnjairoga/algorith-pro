# PIPELINES DE GO HIGH LEVEL - CLÍNICA DERMATOLÓGICA PUEBLA
**Proyecto:** Automatización CRM para Clínica Dermatológica y Cirugía Estética  
**Clínica:** Clínica Dermatológica Puebla (54+ años, 100,000+ clientes)  
**Intermediario:** Carlos Perlaza  
**Proveedor:** Algorith Pro (John)  
**Fecha:** 13 de agosto de 2026  
**Estado:** Definición de Pipelines para Construcción

---

## 📌 CONCEPTO DE PIPELINES EN GO HIGH LEVEL

Un **Pipeline** es un flujo de ventas que mueve a los contactos (leads) a través de diferentes **etapas** hasta convertirlos en pacientes que pagan.

En GHL, cada Pipeline tiene:
- **Contactos** (leads/pacientes)
- **Etapas** (pasos del flujo)
- **Automaciones** (acciones automáticas al cambiar de etapa)
- **Tareas** (reminders manuales para el equipo)
- **Reportes** (tracking del progreso)

---

## 🎯 PIPELINES PRINCIPALES A CONSTRUIR

### PIPELINE 1: CONSULTA INICIAL - PACIENTE NUEVO
**Objetivo:** Convertir un lead en paciente que agenda consulta  
**Duración:** 1-7 días  
**Valor típico:** Primera consulta $150-300 MXN

```
┌─ ETAPA 1: LEAD CAPTURADO
│  └─ Trigger: Paciente llena formulario web, WhatsApp, Instagram
│     ├─ Datos capturados: Nombre, teléfono, email, servicio interesado
│     ├─ Automación: Enviar bienvenida por WhatsApp
│     ├─ Automación: Enviar catálogo de servicios
│     └─ Tarea: Secretaria llama en < 2h
│
├─ ETAPA 2: LEAD CALIFICADO
│  └─ Trigger: Secretaria confirma interés y capacidad de pago
│     ├─ Datos: Servicio específico, presupuesto, disponibilidad
│     ├─ Automación: Enviar opciones de cita disponibles
│     ├─ Automación: Enviar link de pago para reserva (si aplica)
│     └─ Tarea: Actualizar lead con notas de llamada
│
├─ ETAPA 3: CITA AGENDADA
│  └─ Trigger: Paciente selecciona fecha/hora y paga
│     ├─ Datos: Fecha cita, doctor asignado, monto pagado
│     ├─ Automación: Enviar confirmación por WhatsApp
│     ├─ Automación: Enviar instrucciones pre-consulta
│     ├─ Automación: Recordatorio 24h antes
│     └─ Tarea: Preparar expediente médico
│
├─ ETAPA 4: CONSULTA REALIZADA
│  └─ Trigger: Doctor marca cita como completada en calendario
│     ├─ Datos: Notas médicas, diagnóstico, presupuesto de plan
│     ├─ Automación: Enviar notas de consulta por email
│     ├─ Automación: Enviar opciones de tratamientos recomendados
│     └─ Tarea: Seguimiento para confirmar próximo paso
│
└─ ETAPA 5: CONVERTIDO (O PERDIDO)
   ├─ CONVERTIDO: Paciente contrata servicio → Move a Pipeline de Tratamiento
   └─ PERDIDO: Paciente no contrata → Move a Pipeline de Re-engagement
```

**Campos de Contacto:**
- Nombre, teléfono, email
- Servicio interesado
- Presupuesto disponible
- Fecha de interés
- Fuente de lead
- Notas de llamadas
- Doctor preferido (si aplica)

**Automaciones Clave:**
1. Bienvenida inmediata (5 min después de captura)
2. Envío de catálogo de servicios (1h después)
3. Llamada de secretaria (< 2h después)
4. Opciones de disponibilidad (24h después de interés)
5. Confirmación de cita (automática al pagar)
6. Recordatorio 24h antes de consulta

---

### PIPELINE 2: PROCEDIMIENTO QUIRÚRGICO - PACIENTES CANDIDATOS
**Objetivo:** Convertir consulta en paciente quirúrgico que se prepara y realiza procedimiento  
**Duración:** 2-6 semanas (desde consulta hasta cirugía)  
**Valor típico:** $2,000-15,000 MXN por cirugía

```
┌─ ETAPA 1: EVALUACIÓN POST-CONSULTA
│  └─ Trigger: Doctor recomienda procedimiento quirúrgico
│     ├─ Datos: Tipo de cirugía, costo estimado, riesgos, alternativas
│     ├─ Automación: Enviar plan de tratamiento por email/PDF
│     ├─ Automación: Agendar sesión de "consentimiento informado"
│     ├─ Automación: Enviar guía de preparación pre-quirúrgica
│     └─ Tarea: Secretaria confirma comprensión del paciente
│
├─ ETAPA 2: ANÁLISIS DE LABORATORIO
│  └─ Trigger: Paciente acepta procedimiento
│     ├─ Datos: Laboratorio recomendado, costo de estudios
│     ├─ Automación: Enviar requisición de laboratorio
│     ├─ Automación: Enviar ubicaciones de laboratorios asociados
│     ├─ Automación: Recordatorio de hacer estudios (7-5 días antes)
│     └─ Tarea: Recibir y archivar resultados de laboratorio
│
├─ ETAPA 3: PAGO Y PROGRAMACIÓN
│  └─ Trigger: Resultados de laboratorio confirmados
│     ├─ Datos: Pago confirmado, fecha de cirugía reservada
│     ├─ Automación: Enviar resumen de día de cirugía
│     ├─ Automación: Instrucciones de ayuno y preparación final
│     ├─ Automación: Confirmación de hora de llegada
│     └─ Tarea: Validar que quirófano esté disponible
│
├─ ETAPA 4: PRE-QUIRÚRGICO INMEDIATO
│  └─ Trigger: 48-24 horas antes de cirugía
│     ├─ Datos: Confirmación final de paciente
│     ├─ Automación: Enviar checklist final (no comer, no beber, no maquillaje)
│     ├─ Automación: Recordatorio de llegar 30 min antes
│     ├─ Automación: Números de emergencia de clínica
│     └─ Tarea: Confirmar disponibilidad de equipo quirúrgico
│
├─ ETAPA 5: DÍA DE CIRUGÍA
│  └─ Trigger: Paciente llega a clínica
│     ├─ Datos: Hora de entrada, anestésico usado, duración, complicaciones
│     ├─ Automación: Notificar a familia (si proporcionaron contacto)
│     ├─ Automación: Foto de ingreso al quirófano (si autorizado)
│     └─ Tarea: Monitoreo durante cirugía
│
├─ ETAPA 6: POST-QUIRÚRGICO INMEDIATO
│  └─ Trigger: Cirugía completada
│     ├─ Datos: Observaciones del doctor, medicinas prescritas, restricciones
│     ├─ Automación: Enviar instrucciones post-op completas
│     ├─ Automación: Programar cita de revisión (1 semana)
│     ├─ Automación: Recordatorio de medicinas (cada 8h por 3 días)
│     └─ Tarea: Seguimiento hospitalario (si aplica)
│
└─ ETAPA 7: RECUPERACIÓN Y SEGUIMIENTO
   ├─ Datos: Fotos de cicatrización, complicaciones reportadas
   ├─ Automación: Seguimientos automáticos (1sem, 2sem, 1mes, 3mes, 6mes)
   ├─ Automación: Encuesta de satisfacción
   ├─ Automación: Ofrecer procedimientos complementarios
   └─ Tarea: Revisiones médicas programadas
```

**Campos de Contacto:**
- Tipo de cirugía planeada
- Costo estimado
- Fecha de cirugía
- Anestesia recomendada
- Citas de seguimiento
- Complicaciones post-op
- Rating de satisfacción
- Referencia de fotos antes/después

**Automaciones Clave:**
1. Envío de consentimiento informado
2. Recordatorio de análisis de laboratorio
3. Checklist de preparación 48h antes
4. Instrucciones post-op inmediatas
5. Seguimiento de cicatrización
6. Encuesta de satisfacción

---

### PIPELINE 3: TRATAMIENTO NO-QUIRÚRGICO - LÁSER Y ESTÉTICA
**Objetivo:** Convertir lead en paciente de tratamientos laser/estética recurrentes  
**Duración:** 1-12 semanas (según ciclo de tratamiento)  
**Valor típico:** $300-2,000 MXN por sesión, 4-8 sesiones promedio

```
┌─ ETAPA 1: CONSULTA LÁSER/ESTÉTICA
│  └─ Trigger: Lead interesado en tratamiento no-quirúrgico
│     ├─ Datos: Tipo de tratamiento (láser, botox, peeling, etc.)
│     ├─ Automación: Enviar galería de antes/después del tratamiento
│     ├─ Automación: Enviar plan de tratamiento típico (X sesiones)
│     ├─ Automación: Enviar pricing de paquetes vs sesiones individuales
│     └─ Tarea: Agendar consulta con especialista
│
├─ ETAPA 2: EVALUACIÓN DE CANDIDATO
│  └─ Trigger: Paciente en consulta
│     ├─ Datos: Tipo de piel, fotoinclasificación, expectativas, contraindicaciones
│     ├─ Automación: Enviar plan personalizado de sesiones
│     ├─ Automación: Enviar cuidados pre-tratamiento (24h antes)
│     ├─ Automación: Ofrecer paquete de sesiones con descuento
│     └─ Tarea: Validar que paciente entiende resultados realistas
│
├─ ETAPA 3: PRIMERA SESIÓN
│  └─ Trigger: Paciente contrata y paga primera sesión
│     ├─ Datos: Fecha de sesión, parámetros de láser usados, resultado
│     ├─ Automación: Confirmación de cita
│     ├─ Automacion: Instrucciones post-tratamiento (protector solar, etc.)
│     ├─ Automación: Encuesta post-sesión (24h después)
│     └─ Tarea: Monitoreo durante tratamiento
│
├─ ETAPA 4: SESIONES 2-X (SEGUIMIENTO)
│  └─ Trigger: Cada sesión completada
│     ├─ Datos: Progreso visible, cambios de parámetros, reacciones adversas
│     ├─ Automación: Recordatorio de próxima sesión (7-10 días)
│     ├─ Automación: Cuidados post-sesión específicos
│     ├─ Automación: Foto de progreso (si autorizado)
│     └─ Tarea: Evaluar si necesita ajuste en plan
│
├─ ETAPA 5: CICLO DE TRATAMIENTO COMPLETADO
│  └─ Trigger: Paciente completó plan de X sesiones
│     ├─ Datos: Antes/después final, satisfacción final, resultados
│     ├─ Automación: Enviar galería de resultados
│     ├─ Automación: Encuesta de satisfacción completa
│     ├─ Automación: Ofrecer mantenimiento (sesiones de retoque)
│     ├─ Automación: Ofrecer otros tratamientos complementarios
│     └─ Tarea: Archivos de resultados para portfolio (si consiente)
│
└─ ETAPA 6: RETENCIÓN / UPSELL
   ├─ Automación: Recordatorio de mantenimiento (cada 3-6 meses)
   ├─ Automacion: Ofertas especiales de otros tratamientos
   ├─ Automación: Programa de referidos (comisión si trae amiga)
   └─ Move a Pipeline de Retención si no contrata mantenimiento
```

**Campos de Contacto:**
- Tipo de tratamiento láser/estética
- Tipo de piel / fotoclasificación
- Número de sesiones planeadas
- Sesiones completadas
- Parámetros de tratamiento
- Fotos antes/después
- Reacciones adversas
- Costo total
- Paquete vs individual

**Automaciones Clave:**
1. Envío de antes/después de otros pacientes
2. Cuidados pre y post-sesión
3. Recordatorio de próxima sesión
4. Encuestas de progreso
5. Ofrecer complementarios
6. Programa de referidos

---

### PIPELINE 4: CLÍNICA PARA HOMBRES - SERVICIOS MASCULINOS
**Objetivo:** Especializar en procedimientos estéticos para hombres  
**Duración:** Variable (consulta a ciclo completo)  
**Valor típico:** $500-5,000 MXN por servicio

```
┌─ ETAPA 1: LEAD MASCULINO INTERESADO
│  └─ Trigger: Hombre busca procedimiento estético
│     ├─ Datos: Procedimiento específico (aumento pectoral, liposucción, implante barba, etc.)
│     ├─ Automación: Enviar casos antes/después de hombres
│     ├─ Automación: Mensaje emphasizing "discreto y profesional"
│     ├─ Automación: Enviar información sobre confidencialidad
│     └─ Tarea: Asignar a especialista en men's clinic
│
├─ ETAPA 2: CONSULTA CONFIDENCIAL
│  └─ Trigger: Lead agenda consulta
│     ├─ Datos: Objetivo específico, expectativas realistas, timeline
│     ├─ Automación: Confirmación con énfasis en privacidad
│     ├─ Automación: Información de resultados típicos para hombres
│     └─ Tarea: Doctor especializado en hombres atiende
│
├─ ETAPA 3: PLAN PERSONALIZADO
│  └─ Trigger: Consulta realizada
│     ├─ Datos: Plan de tratamiento, costo, timeline, cuidados específicos
│     ├─ Automación: Enviar plan de confidencialidad
│     ├─ Automación: Enviar instrucciones de ausencia mínima del trabajo
│     └─ Tarea: Confirmar que paciente se siente cómodo
│
└─ ETAPA 4-7: MISMO FLUJO QUE PIPELINE 2 O 3 SEGÚN TIPO
   └─ (Cirugía → Pipeline 2 / Láser → Pipeline 3)
```

---

### PIPELINE 5: TRASPLANTE DE CABELLO - ARTAS ROBÓTICO
**Objetivo:** Especializar en trasplante de cabello con tecnología ARTAS  
**Duración:** 3-6 meses (ciclo completo de crecimiento)  
**Valor típico:** $3,000-12,000 MXN (procedimiento único pero seguimiento largo)

```
┌─ ETAPA 1: EVALUACIÓN DE PÉRDIDA CAPILAR
│  └─ Trigger: Hombre/Mujer interesado en trasplante
│     ├─ Datos: Grado de calvicie, tipo de cabello, área receptora, área donante
│     ├─ Automación: Enviar casos antes/después inspiradores
│     ├─ Automación: Evaluación de candidato (formulario)
│     ├─ Automación: Enviar explicación tecnología ARTAS
│     └─ Tarea: Agendar evaluación con especialista
│
├─ ETAPA 2: EVALUACIÓN MÉDICA
│  └─ Trigger: Consulta con especialista
│     ├─ Datos: Cantidad de injertos necesarios, viabilidad de procedimiento
│     ├─ Automación: Enviar plan quirúrgico personalizado
│     ├─ Automacion: Timeline de resultados (3-6 meses de crecimiento)
│     ├─ Automación: Enviar instrucciones de preparación
│     └─ Tarea: Validar capacidad de pago y timeline
│
├─ ETAPA 3: PROCEDIMIENTO ARTAS
│  └─ Trigger: Día del procedimiento
│     ├─ Datos: Injertos extraídos, injertos implantados, duración
│     ├─ Automación: Protocolo post-op extensivo (crucial para resultados)
│     ├─ Automación: Calendario de recuperación
│     ├─ Automación: Medicinas post-op (minoxidil, finasterida)
│     └─ Tarea: Monitoreo intensivo primera semana
│
├─ ETAPA 4: RECUPERACIÓN INICIAL (Semanas 1-4)
│  └─ Trigger: Post-procedimiento inmediato
│     ├─ Datos: Fotos de área implantada, complicaciones, adherencia a cuidados
│     ├─ Automación: Recordatorios diarios de cuidados
│     ├─ Automación: Fotos de progreso (semana 1, 2, 4)
│     ├─ Automación: Encuesta de dolor/complicaciones
│     └─ Tarea: Revisión médica cada semana
│
├─ ETAPA 5: FASE DE SHEDDING (Meses 1-3)
│  └─ Trigger: Caída de cabello (natural post-trasplante)
│     ├─ Datos: Verificar que es shedding normal, no rechazo
│     ├─ Automación: Tranquilizar al paciente (es normal)
│     ├─ Automación: Enviar evidencia científica de shedding
│     ├─ Automación: Continuidad de medicinas
│     └─ Tarea: Revisión médica mensual
│
├─ ETAPA 6: CRECIMIENTO DE NUEVO CABELLO (Meses 3-6)
│  └─ Trigger: Primeros brotes de cabello visible
│     ├─ Datos: Fotos de progreso, densidad visible, satisfacción
│     ├─ Automación: Fotos de progreso (mes 3, 6)
│     ├─ Automación: Encuesta de satisfacción intermedia
│     ├─ Automación: Recordatorio de medicinas de mantenimiento
│     └─ Tarea: Revisión mensual para validar progreso
│
└─ ETAPA 7: RESULTADOS FINALES (Meses 6-12)
   ├─ Datos: Fotos finales antes/después, satisfacción final, mantenimiento
   ├─ Automación: Encuesta de satisfacción completa
   ├─ Automación: Testimonio/video testimonial (si autoriza)
   ├─ Automación: Oferta de segundo procedimiento (si área donante lo permite)
   └─ Tarea: Archivo de caso de éxito
```

---

### PIPELINE 6: RETENCIÓN Y FIDELIZACIÓN
**Objetivo:** Mantener pacientes actuales, evitar churn, generar recurrencia  
**Duración:** Permanente  
**Valor típico:** $1,000-3,000 MXN/mes en servicios de mantenimiento

```
┌─ ETAPA 1: PACIENTE CON SERVICIO COMPLETADO
│  └─ Trigger: Paciente terminó servicio contratado
│     ├─ Automación: Enviar encuesta de satisfacción completa
│     ├─ Automación: Oferta de mantenimiento (si aplica)
│     ├─ Automación: Servicios complementarios recomendados
│     └─ Tarea: Seguimiento personal si NPS < 3
│
├─ ETAPA 2: PACIENTE ACTIVO EN SEGUIMIENTO
│  └─ Trigger: Paciente en citas de seguimiento médico
│     ├─ Automación: Recordatorios de citas programadas
│     ├─ Automación: Fotos de progreso (para comparar)
│     ├─ Automación: Tips de mantenimiento de resultados
│     └─ Tarea: Documentar satisfacción en cada visita
│
├─ ETAPA 3: PACIENTE INACTIVO (30+ días sin contacto)
│  └─ Trigger: Paciente no tiene cita en próximos 30 días
│     ├─ Automación: Recordatorio amable "¿Cómo van tus resultados?"
│     ├─ Automación: Oferta de retoque/mantenimiento
│     ├─ Automación: Promoción especial por lealtad
│     ├─ Automación: Invitación a evento de clínica (si existe)
│     └─ Tarea: Llamada de secretaria si inactividad > 60 días
│
├─ ETAPA 4: PROGRAMA DE REFERIDOS
│  └─ Trigger: Paciente puede referir amigos/familia
│     ├─ Automación: Programa de referidos automático
│     ├─ Automación: Link de referido personalizado
│     ├─ Automación: Descuento cuando amiga se convierte
│     ├─ Automación: Descuento cuando referida completa tratamiento
│     └─ Tarea: Seguimiento de referidos completados
│
└─ ETAPA 5: VIP / PACIENTE PREMIUM
   ├─ Trigger: Paciente con alto lifetime value o múltiples procedimientos
   ├─ Automación: Acceso prioritario a citas
   ├─ Automación: Descuentos especiales VIP
   ├─ Automación: Invitación a eventos exclusivos
   ├─ Automación: Atención personalizada de doctor
   └─ Tarea: Llamada de aprecio cada trimestre
```

---

### PIPELINE 7: REACTIVACIÓN - PACIENTES PERDIDOS
**Objetivo:** Traer de vuelta a pacientes que no han venido en 60+ días  
**Duración:** 2-4 semanas  
**Valor típico:** $500-2,000 MXN (re-enganche)

```
┌─ ETAPA 1: PACIENTE INACTIVO DETECTADO
│  └─ Trigger: Sistema detecta > 60 días sin contacto
│     ├─ Automación: Mensaje amable: "Te extrañamos!"
│     ├─ Automación: Encuesta: "¿Cómo te fue con tu tratamiento?"
│     ├─ Automación: Fotos inspiradoras de nuevos tratamientos
│     └─ Tarea: Clasificar por razón de inactividad
│
├─ ETAPA 2: RAZÓN DE PÉRDIDA IDENTIFICADA
│  └─ Trigger: Paciente responde o secretaria analiza
│     ├─ Razón 1: Satisfecho pero necesita mantenimiento → Oferta de mantenimiento
│     ├─ Razón 2: Insatisfecho con resultados → Oferta de corrección
│     ├─ Razón 3: Problemas económicos → Oferta de paquetes pagables
│     ├─ Razón 4: Cambió de clínica → Oferta de recompensa por regreso
│     └─ Razón 5: No responde → Move a Pipeline Cold Lead
│
├─ ETAPA 3: OFERTA PERSONALIZADA
│  └─ Trigger: Razón identificada
│     ├─ Automación: Oferta específica según razón
│     ├─ Automación: Descuento de reactivación (15-25%)
│     ├─ Automación: Envío de plan de mantenimiento
│     └─ Tarea: Follow-up en 3-5 días si no responde
│
└─ ETAPA 4: REACTIVADO O PERDIDO PERMANENTE
   ├─ Reactivado: Move de vuelta a Pipeline correspondiente
   └─ Perdido: Archivar con razón documentada
```

---

### PIPELINE 8: LEADS FRÍOS - NURTURING A LARGO PLAZO
**Objetivo:** Mantener contacto con leads que aún no están listos para comprar  
**Duración:** 3-12 meses  
**Valor típico:** Conversión eventual a cualquier pipeline anterior

```
┌─ ETAPA 1: LEAD FRÍO CAPTURADO
│  └─ Trigger: Lead interesado pero sin presupuesto/timeline claro
│     ├─ Datos: Servicio de interés, presupuesto aproximado, timeline
│     ├─ Automación: Bienvenida + Catálogo de servicios
│     ├─ Automación: Educación sobre procedimientos
│     └─ Tarea: Clasificación inicial
│
├─ ETAPA 2: EDUCACIÓN SEMANAL
│  └─ Trigger: Lead en nurturing
│     ├─ Automación: Email semanal con:
│     │  ├─ Tips de belleza/salud
│     │  ├─ Casos de éxito inspiradores
│     │  ├─ Videos educativos
│     │  ├─ Promociones limitadas
│     │  └─ Testimonios de pacientes
│     └─ Tarea: Monitoreo de open rates/engagement
│
├─ ETAPA 3: REENGANCHE CADA 2 SEMANAS
│  └─ Trigger: Lead no abre emails
│     ├─ Automación: WhatsApp con contenido visual
│     ├─ Automación: Oferta time-limited ("solo esta semana")
│     ├─ Automación: Consulta gratuita (si sigue sin respuesta)
│     └─ Tarea: Análisis de por qué lead no engacha
│
└─ ETAPA 4: CALIFICACIÓN PERIÓDICA
   ├─ Automación: Encuesta mensual: "¿Estás lista? ¿En cuánto tiempo?"
   ├─ Si sí → Move a Pipeline correspondiente
   ├─ Si no → Mantener en nurturing
   └─ Tarea: Revisión trimestral de lista completa
```

---

## 📊 RESUMEN DE TODOS LOS PIPELINES

| # | Pipeline | Duración | Valor | Etapas | Prioridad |
|---|----------|----------|-------|--------|-----------|
| 1 | Consulta Inicial | 1-7 días | $150-300 | 5 | 🔴 CRÍTICA |
| 2 | Cirugía Plástica | 2-6 sem | $2K-15K | 7 | 🔴 CRÍTICA |
| 3 | Láser/Estética | 1-12 sem | $300-2K | 6 | 🔴 CRÍTICA |
| 4 | Clínica Hombres | Variable | $500-5K | 4 | 🟡 ALTA |
| 5 | Trasplante Cabello | 6-12 mes | $3K-12K | 7 | 🟡 ALTA |
| 6 | Retención | Permanente | $1K-3K/mes | 5 | 🔴 CRÍTICA |
| 7 | Reactivación | 2-4 sem | $500-2K | 4 | 🟡 ALTA |
| 8 | Leads Fríos | 3-12 mes | Variable | 4 | 🟢 MEDIA |

---

## 🔗 FLUJO ENTRE PIPELINES

```
Lead Capturado (Pipeline 1)
    ↓
    ├─ CONVERTIDO EN CONSULTA
    │  ├─ → Interesado en Cirugía → Pipeline 2 (Cirugía Plástica)
    │  ├─ → Interesado en Láser → Pipeline 3 (Láser/Estética)
    │  ├─ → Hombre → Pipeline 4 (Clínica Hombres)
    │  ├─ → Interesado Trasplante → Pipeline 5 (Trasplante Cabello)
    │  └─ → No Convertido → Pipeline 8 (Leads Fríos)
    │
    └─ Paciente en cualquier Pipeline:
       ├─ Completó servicio → Pipeline 6 (Retención)
       ├─ No se activa > 60 días → Pipeline 7 (Reactivación)
       ├─ Satisfecho → Ofrecer Complementarios → Pipeline 3 o 2
       └─ Nuevas necesidades → Vuelve a Pipeline 1
```

---

## 💻 IMPLEMENTACIÓN TÉCNICA EN GHL

### Elementos GHL a Configurar por Pipeline:

**1. Campos Personalizados (Custom Fields)**
```
Ejemplo para Pipeline 2 (Cirugía):
- Tipo de Cirugía (Dropdown)
- Costo Estimado (Number)
- Fecha de Cirugía (Date)
- Doctores Disponibles (Dropdown)
- Resultados Post-Op (Text)
- Fotos Antes/Después (File)
- NPS Score (1-10)
- Complicaciones Reportadas (Text)
```

**2. Automations (Flujos Automáticos)**
```
Ejemplo: "Cuando pasa de Etapa 1 a Etapa 2 (Lead Calificado)"
├─ Enviar Email: Plan de Tratamiento
├─ Crear Tarea: Secretaria confirmar en 24h
├─ Enviar WhatsApp: Opciones de horarios
└─ Actualizar Tag: "Interesado Cirugía"
```

**3. Webhooks y Triggers**
```
Trigger 1: Lead agenda cita
├─ Actualizar calendario de doctor
├─ Enviar confirmación por WhatsApp/Email
└─ Move a siguiente etapa automáticamente

Trigger 2: Paciente completa formulario médico
├─ Notificar doctor
├─ Guardar en historial
└─ Generar checklist pre-cita
```

**4. Reportes y Dashboards**
```
Dashboard Gerencial:
├─ Leads en Pipeline: X
├─ Tasa Conversión por Pipeline: XX%
├─ Revenue Proyectado: $XXXXX
├─ Pacientes por Doctor: XX
└─ NPS Score Promedio: X.X

Dashboard Secretaria:
├─ Citas Hoy: XX
├─ Confirmaciones Pendientes: X
├─ Documentos Pendientes: X
└─ Llamadas a Realizar: X

Dashboard Doctor:
├─ Citas Programadas: XX
├─ Pacientes Nuevos: X
├─ Históricos Completos: XX%
└─ Seguimientos Pendientes: X
```

---

## 🎯 PRÓXIMAS ETAPAS

### SPRINT 1 (Semanas 1-2): PIPELINES 1 + 2
- ✅ Pipeline 1: Consulta Inicial (Completo)
- ✅ Pipeline 2: Cirugía Plástica (Completo)
- Entregable: Básico funcionando, primeros leads en flujo

### SPRINT 2 (Semanas 3-4): PIPELINE 3
- ✅ Pipeline 3: Láser/Estética (Completo)
- Entregable: Sistema de tratamientos recurrentes

### SPRINT 3 (Semanas 5-6): PIPELINES 4, 6, 7
- ✅ Pipeline 4: Clínica Hombres (Básico)
- ✅ Pipeline 6: Retención (Completo)
- ✅ Pipeline 7: Reactivación (Completo)
- Entregable: Retención y fidelización

### SPRINT 4 (Semana 7): PIPELINES 5 + 8
- ✅ Pipeline 5: Trasplante Cabello (Básico)
- ✅ Pipeline 8: Leads Fríos (Básico)
- Entregable: Sistema completo funcional

---

## 🚀 CONFIGURACIÓN INICIAL ESTIMADA

**Por Pipeline:**
- 3-5 Custom Fields
- 8-15 Automations
- 2-4 Webhooks
- 15-30 Templates (Email/WhatsApp/SMS)
- 1-2 Dashboards

**Total del Proyecto:**
- ~40-50 Custom Fields
- ~70-100 Automations
- ~15-20 Webhooks
- ~100-150 Templates
- ~8-10 Dashboards

**Tiempo Estimado:** 30-45 días hábiles ✅

---

**Documento Preparado:** 13 de agosto de 2026  
**Versión:** 1.0 - PIPELINES DEFINIDOS  
**Responsable:** Claude Code + Equipo  
**Estado:** 🟢 Listo para construcción en SPRINT 1
