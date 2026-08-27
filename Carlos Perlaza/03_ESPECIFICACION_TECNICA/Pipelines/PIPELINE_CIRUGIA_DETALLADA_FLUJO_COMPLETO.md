# PIPELINE DETALLADA: CIRUGÍA PLÁSTICA - FLUJO COMPLETO
**Proyecto:** Sistema de Automatización GHL - Clínica Dermatológica Puebla  
**Pipeline:** Procedimiento Quirúrgico  
**Duración Total:** 2-6 semanas (desde decisión hasta recuperación inicial)  
**Valor:** $2,000-15,000 MXN  
**Documento:** Especificación de Flujo de Usuario + Comportamiento de Sistema

---

## 📋 RESUMEN EJECUTIVO DEL FLUJO

```
PACIENTE                        SISTEMA GHL                         EQUIPO CLÍNICA
   │                                │                                    │
   ├─ Interesado en cirugía ───────→ ETAPA 1: Evaluación            Secretaria
   │                                │                                    │
   ├─ Revisa información ←────────── Catálogo + Antes/Después       John
   │                                │                                    │
   ├─ Agenda consulta ────────────→ ETAPA 2: Consulta Inicial       Doctor
   │                                │                                    │
   ├─ Asiste a consulta ─────────→ Doctor evalúa                    Doctor
   │                                │                                    │
   ├─ Recibe plan de cirugía ◄───── ETAPA 3: Plan Personalizado     John
   │                                │                                    │
   ├─ Paga anticipo ──────────────→ Verifica pago                   Secretaria
   │                                │                                    │
   ├─ Realiza análisis laboratorio ─ ETAPA 4: Pre-op                Secretaria
   │                                │                                    │
   ├─ Se prepara en casa ◄────────── Instrucciones automatizadas     John
   │                                │                                    │
   ├─ Llega día de cirugía ────────→ ETAPA 5: Día de Cirugía         Doctor
   │                                │                                    │
   └─ Se recupera en casa ◄────────── Seguimiento + Instrucciones    Doctor + John

```

---

# 🎬 ESCENA 1: PACIENTE DECIDE OPERARSE (ETAPA 1: EVALUACIÓN)

## EL ESCENARIO
**María**, 35 años, decidió que quiere hacerse una liposucción abdominal. Encontró la página web de la clínica en Google y hace click en "Agendar Cita".

---

## 📱 LO QUE VE MARÍA EN SU CELULAR

### Momento 1: Landing Page de Liposucción (En sitio web de clínica)

```
┌─────────────────────────────────────────────┐
│  LIPOSUCCIÓN ABDOMINAL                      │
│  Rediseña tu silueta                        │
│                                             │
│  ✨ Resultados visibles en 3 meses         │
│  ✨ Mínima cicatriz                        │
│  ✨ Recuperación: 7-14 días                │
│                                             │
│  FOTOS ANTES/DESPUÉS (5 casos reales)      │
│  [Galería de transformaciones]             │
│                                             │
│  COSTO BASE: $4,500 MXN                    │
│  (Según complejidad: $2,500-$8,000)        │
│                                             │
│  ┌──────────────────────────┐              │
│  │ 🔵 AGENDAR CONSULTA GRATIS│              │
│  └──────────────────────────┘              │
│                                             │
│  Incluye:                                   │
│  ✓ Evaluación médica                       │
│  ✓ Plan personalizado                      │
│  ✓ Presupuesto exacto                      │
└─────────────────────────────────────────────┘
```

### Momento 2: María hace click en "AGENDAR CONSULTA GRATIS"

**Sistema redirige a formulario de contacto:**

```
┌─────────────────────────────────────────────┐
│  Cuéntanos sobre ti                         │
│                                             │
│  Nombre completo:                           │
│  [María García            ]                 │
│                                             │
│  Número de WhatsApp:                        │
│  [+52 222 456 7890        ]                 │
│                                             │
│  Email:                                     │
│  [maria.garcia@email.com  ]                 │
│                                             │
│  ¿Cuál es tu interés principal?             │
│  ⦿ Liposucción abdominal                    │
│  ○ Aumento de glúteos                       │
│  ○ Otro                                     │
│                                             │
│  ¿Cuándo te gustaría operarte?              │
│  ○ Este mes                                 │
│  ⦿ Próximo mes                              │
│  ○ En 2-3 meses                             │
│  ○ Flexible                                 │
│                                             │
│  Presupuesto aproximado:                    │
│  ○ No definido aún                          │
│  ⦿ $2,000-$5,000 MXN                       │
│  ○ $5,000-$10,000 MXN                      │
│  ○ $10,000+ MXN                             │
│                                             │
│  ┌──────────────────────────┐              │
│  │  ENVIAR MI INFORMACIÓN   │              │
│  └──────────────────────────┘              │
└─────────────────────────────────────────────┘
```

**María completa el formulario y hace click en "ENVIAR".**

---

## 🔧 LO QUE SUCEDE EN GO HIGH LEVEL (AUTOMÁTICO)

### Momento 3: Sistema Recibe Información (T=0 minutos)

```
┌─ TRIGGER: Formulario completado
│
├─ ACCIÓN 1: Crear Contacto en GHL
│  ├─ Nombre: María García
│  ├─ WhatsApp: +52 222 456 7890
│  ├─ Email: maria.garcia@email.com
│  ├─ Pipeline: "Cirugía Plástica"
│  ├─ ETAPA INICIAL: "Evaluación Post-Consulta" (porque aún sin consulta)
│  └─ Tags: #Liposucción #Presupuesto-Confirmado #Timeline-Cercano
│
├─ ACCIÓN 2: Enviar Mensaje WhatsApp Automático
│  │
│  ├─ MENSAJE:
│  │  "¡Hola María! 👋
│  │
│  │  Gracias por tu interés en liposucción. Estamos emocionados de 
│  │  ayudarte a lograr la figura que deseas.
│  │
│  │  📋 AQUÍ ESTÁ TU INFORMACIÓN PERSONALIZADA:
│  │
│  │  Servicio: Liposucción Abdominal
│  │  Presupuesto típico: $4,500 MXN
│  │  Recuperación estimada: 7-14 días
│  │  Doctores especializados: Dra. María, Dr. Carlos
│  │
│  │  👇 VER GALERÍA DE RESULTADOS:
│  │  [Link a 5 antes/después reales]
│  │
│  │  📞 Una especialista te llamará en la próxima hora para:
│  │  ✓ Responder tus preguntas
│  │  ✓ Agendar tu consulta gratis
│  │  ✓ Explicar el proceso completo
│  │
│  │  ¿Prefieres que te llamemos por WhatsApp o teléfono?
│  │  [Botón: 📞 WhatsApp] [Botón: ☎️ Teléfono]"
│  │
│  └─ ENVIADO A: +52 222 456 7890
│
├─ ACCIÓN 3: Enviar Email Automático
│  │
│  ├─ ASUNTO: "María, aquí está tu plan personalizado de liposucción"
│  │
│  ├─ CONTENIDO:
│  │  ┌────────────────────────────────────────┐
│  │  │ ¡Hola María!                           │
│  │  │                                        │
│  │  │ Gracias por confiar en nosotros para  │
│  │  │ tu transformación.                     │
│  │  │                                        │
│  │  │ 📎 ADJUNTOS:                          │
│  │  │ 1. GUÍA: Liposucción Abdominal       │
│  │  │ 2. CASOS REALES: 5 antes/después    │
│  │  │ 3. FAQ: Preguntas frecuentes         │
│  │  │ 4. VIDEO: "¿Cómo es el día 1?"      │
│  │  │                                        │
│  │  │ 💰 PRESUPUESTO ESTIMADO:             │
│  │  │ Basado en tu información:             │
│  │  │ Rango: $3,500 - $5,500 MXN          │
│  │  │ (Exacto después de consulta)         │
│  │  │                                        │
│  │  │ 📅 PRÓXIMOS PASOS:                    │
│  │  │ 1. Especialista te llamará hoy       │
│  │  │ 2. Agendarás consulta con doctor     │
│  │  │ 3. Recibirás plan personalizado      │
│  │  │                                        │
│  │  └────────────────────────────────────────┘
│  │
│  └─ ENVIADO A: maria.garcia@email.com
│
├─ ACCIÓN 4: Crear Tarea para Secretaria
│  │
│  └─ TAREA (URGENCIA ALTA 🔴):
│     "Llamar a María García (+52 222 456 7890)
│      - Responder preguntas sobre liposucción
│      - Agendar consulta (preferentemente este mes)
│      - Tiempo estimado: 10-15 minutos
│      - Asignar a: [Secretaria 1]
│      - Plazo: HOY (dentro de 1 hora)"
│
└─ FIN DE AUTOMATIZACIÓN (T=5 minutos desde envío)

```

**Estado de María en el Sistema:**
- ✅ Contacto creado
- ✅ Información validada
- ✅ Timeline detectado: "Próximo mes"
- ✅ Presupuesto confirmado: "$2K-$5K"
- 📊 Puntuación Lead: 85/100 (HOT LEAD)
- 🔴 PRIORIDAD: Llamar hoy

---

## 👩‍💼 LO QUE VE LA SECRETARIA EN SU COMPUTADORA

### Dashboard de Secretaria (después de 2 minutos)

```
┌────────────────────────────────────────────────────┐
│  CLÍNICA DERMATOLÓGICA - DASHBOARD SECRETARIA      │
│                                                    │
│  🔴 LEADS HOT (Llamar hoy): 3 nuevos              │
│                                                    │
│  ┌─ TAREA URGENTE #1233 ──────────────────┐      │
│  │ 🔴 LLAMAR: María García                │      │
│  │                                        │      │
│  │ Interés: Liposucción Abdominal        │      │
│  │ Teléfono: +52 222 456 7890            │      │
│  │ Timeline: Próximo mes ⏰               │      │
│  │ Presupuesto: $2-5K MXN ✓              │      │
│  │ Puntuación: 85/100 (HOT)              │      │
│  │                                        │      │
│  │ Acciones:                             │      │
│  │ ☐ Llamar (WhatsApp preferible)        │      │
│  │ ☐ Responder dudas sobre procedimiento│      │
│  │ ☐ Agendar consulta                    │      │
│  │ ☐ Enviar contrato de consentimiento   │      │
│  │                                        │      │
│  │ [📱 LLAMAR AHORA] [💬 WHATSAPP]       │      │
│  └────────────────────────────────────────┘      │
│                                                    │
└────────────────────────────────────────────────────┘
```

**La secretaria hace click en "📱 LLAMAR AHORA"**

---

## 📞 MOMENTO 4: LLAMADA CON SECRETARIA (T=15 minutos)

### Guión de Llamada (Pre-configurado en sistema)

```
SECRETARIA: "Hola María, soy Patricia de la Clínica Dermatológica. 
             ¿Cómo estás? 😊"

MARÍA: "Hola, bien! Sí, acabo de llenar el formulario"

SECRETARIA: "¡Perfecto! Vi tu solicitud. Te llamo porque vi que 
             te interesa la liposucción abdominal, ¿es correcto?"

MARÍA: "Sí, exacto. Quiero hacerme eso este mes o el próximo"

SECRETARIA: "Excelente. El Dr. Carlos es nuestro especialista en 
             liposucción y tiene disponibilidad. Te hago una pregunta:
             ¿Es tu primera vez que te haces un procedimiento así?"

MARÍA: "Sí, es la primera vez. Tengo un poco de miedo..."

SECRETARIA: "Eso es totalmente normal. La liposucción es uno de 
             nuestros procedimientos más solicitados. El Dr. Carlos 
             tiene más de 500 casos exitosos.
             
             Te propongo algo: ¿Agendamos una consulta GRATUITA 
             con el doctor? En esa consulta él:
             
             ✓ Evalúa tu caso específico
             ✓ Te explica cómo es el procedimiento
             ✓ Te muestra casos similares al tuyo
             ✓ Te da presupuesto exacto
             ✓ Responde todas tus preguntas
             
             No hay compromiso. Solo es conocer al doctor."

MARÍA: "Okay, sí me gustaría. ¿Cuándo tiene disponibilidad?"

SECRETARIA: "El doctor tiene disponibilidad:
             - MAÑANA (jueves) a las 10:00 AM
             - Mañana a las 14:00 (2 PM)
             - Pasado mañana (viernes) a las 16:00 (4 PM)
             
             ¿Cuál te viene mejor?"

MARÍA: "Mañana a las 10:00 AM está perfecto para mí"

SECRETARIA: "¡Perfecto! Listo. Tu consulta está confirmada:
             
             📅 JUEVES 15 DE AGOSTO
             ⏰ 10:00 AM
             👨‍⚕️ DR. CARLOS - ESPECIALISTA LIPOSUCCIÓN
             📍 CLÍNICA DERMATOLÓGICA, PUEBLA
             
             Te envío los detalles por WhatsApp ahora mismo:
             ✓ Dirección exacta
             ✓ Qué traer
             ✓ Instrucciones pre-consulta
             ✓ Número de emergencia
             
             ¿Preguntas antes de terminar?"

MARÍA: "No, listo. Gracias!"

SECRETARIA: "De nada María. Te espero mañana a las 10. 
             ¡Vamos a hacer realidad ese cambio que deseas! 💪"
```

---

## 🔔 MOMENTO 5: CONFIRMACIÓN AUTOMÁTICA (INMEDIATO DESPUÉS DE LLAMADA)

**Sistema detecta que secretaria marcó cita como "CONFIRMADA"**

```
TRIGGER: Secretaria cambió estado a "CITA AGENDADA"

ACCIÓN 1: WhatsApp de Confirmación (Inmediato)
"✅ ¡CITA CONFIRMADA!

📅 Jueves 15 de agosto
⏰ 10:00 AM
👨‍⚕️ Dr. Carlos (Especialista Liposucción)

📍 UBICACIÓN:
Clínica Dermatológica Puebla
Calle 5 Oriente #2020, Centro, Puebla
[Link a Google Maps]

📋 ANTES DE LLEGAR:
✓ No comer 4 horas antes
✓ Usar ropa cómoda
✓ Traer ID
✓ Traer presupuesto si lo tienes ahorrado
✓ Tomar agua normalmente

☎️ IMPORTANTE:
Si no puedes ir, avísanos con 48h de anticipación

📲 Confirma que vienes:
[Botón: ✅ CONFIRMO] [Botón: ❌ NO PUEDO]"

ACCIÓN 2: Email de Confirmación
"Asunto: Tu cita está confirmada - Jueves 10:00 AM
Adjuntos:
- Mapa con direcciones
- Recomendaciones pre-consulta
- PDF: 'Guía de Consulta Inicial'
- Video (3 min): 'Qué esperar en tu consulta'"

ACCIÓN 3: Crear Recordatorio Automático
"Enviar WhatsApp reminder 24 horas antes: Jueves a las 10:00 AM"

ACCIÓN 4: Actualizar Etapa en Pipeline
"Pipeline: Cirugía Plástica
Etapa ANTERIOR: Evaluación Post-Consulta
Etapa NUEVA: Consulta Realizada (próxima etapa esperada)
Status: CITA_CONFIRMADA"

ACCIÓN 5: Notificar al Doctor
"Dr. Carlos, tienes nueva cita:
Paciente: María García, 35 años
Procedimiento: Liposucción abdominal
Horario: Jueves 10:00 AM
Notas: Primera consulta, primera vez operándose, algo nerviosa"
```

**Estado de María en Sistema después de esta etapa:**
- ✅ Lead Calificado
- ✅ Cita Confirmada (ETAPA 2)
- 📊 Puntuación: 92/100
- 🎯 Próximo Paso: Asistir a consulta y decisión del doctor

---

# 🏥 ESCENA 2: DÍA DE CONSULTA CON DOCTOR (ETAPA 3: PLAN PERSONALIZADO)

## 📍 MOMENTO: JUEVES 10:00 AM EN CLÍNICA

### Lo que sucede en la clínica:

```
10:00 AM - María llega a clínica
│
├─ Secretaria: "Buenos días María, bienvenida!"
│  └─ Invita a pasar a sala de espera
│
├─ Rellena formulario médico rápido (5 min)
│  ├─ Alergias
│  ├─ Medicamentos actuales
│  ├─ Operaciones previas
│  └─ Expectativas del procedimiento
│
├─ 10:10 AM - Dr. Carlos entra a consultorio
│  └─ "Hola María, soy el Dr. Carlos. Cuéntame qué te trae"
│
├─ EVALUACIÓN MÉDICA (20 minutos)
│  ├─ Dr. Carlos examina abdomen
│  ├─ Toma medidas
│  ├─ Toma fotos antes (3 ángulos)
│  ├─ Explica exactamente qué va a hacer
│  └─ Muestra casos similares en tablet
│
├─ EXPLICACIÓN DE PROCESO (15 minutos)
│  ├─ Cómo funciona la liposucción
│  ├─ Opciones: Laser asistida vs Tradicional
│  ├─ Riesgos y beneficios
│  ├─ Tiempo de recuperación
│  └─ Qué esperar mes 1, 3, 6
│
├─ PRESUPUESTO (10 minutos)
│  ├─ Costo: $4,800 MXN (exacto para su caso)
│  ├─ Opciones de pago:
│  │  ├─ Pago completo ahora
│  │  ├─ 50/50: $2,400 hoy + $2,400 día de cirugía
│  │  └─ 3 cuotas: $1,600 x 3
│  ├─ Incluye: Cirugía + Anestesia + 2 revisiones post-op
│  └─ No incluye: Medicinas especiales si aplica ($200-300 extra)
│
├─ CONSENTIMIENTO INFORMADO (5 minutos)
│  ├─ Firma documento
│  └─ Se lleva copia a casa
│
├─ DECISIÓN FINAL (5 minutos)
│  ├─ Dr. Carlos: "¿Qué piensas? ¿Quieres proceder?"
│  │
│  ├─ OPCIÓN A - María dice SÍ:
│  │  "Sí doctor, me animo. Pero no tengo todo el dinero hoy.
│  │   ¿Puedo pagar mitad hoy y mitad en la cirugía?"
│  │
│  │  Dr. Carlos: "Perfecto, voy a decirle a Patricia que 
│  │              agende tu cirugía. ¿Cuándo te vendría mejor?
│  │              ¿En 1 semana o 2 semanas?"
│  │
│  │  María: "En 2 semanas está bien, me da tiempo de ahorrar"
│  │
│  └─ OPCIÓN B - María dice que necesita pensarlo:
│     "Gracias doctor, está bien. Quiero pensarlo unos días
│      con mi familia"
│
│     Dr. Carlos: "Claro, es normal. Tómate tu tiempo.
│                  Yo te recomendaría hacerlo pronto para que
│                  te recuperes en verano.
│                  Patricia te enviará todo por escrito.
│                  Cualquier duda, nos llamas. ¿Dale?"
│
└─ 11:15 AM - Consulta termina
```

---

## 🔧 LO QUE SUCEDE EN EL SISTEMA (ESCENARIO: MARÍA DICE SÍ)

```
TRIGGER: Dr. Carlos presiona botón "Consulta Completada - CONTRATA CIRUGÍA"
en su app móvil (desde consultorio)

ACCIÓN INMEDIATA 1: Actualizar Historial Médico
├─ Guardar notas del doctor:
│  "Paciente candidato excelente. 35 años, buena salud general.
│   Adiposidad abdominal moderada. Recomiendo liposucción 
│   láser asistida. Presupuesto: $4,800 MXN.
│   Paciente acepta procedimiento. Agendar en 2 semanas."
├─ Guardar fotos antes (3 ángulos)
├─ Guardar medidas del abdomen
├─ Guardar tipo de anestesia recomendada
└─ Guardar restricciones post-op específicas

ACCIÓN INMEDIATA 2: Mover a siguiente ETAPA
Pipeline: Cirugía Plástica
Etapa ANTERIOR: Consulta Realizada
Etapa NUEVA: Análisis de Laboratorio
Status: CONTRATA_CIRUGÍA

ACCIÓN INMEDIATA 3: Generar Plan de Cirugía Personalizado (PDF)
├─ Título: "Tu Plan Personal de Liposucción - María García"
├─ Contenido:
│  ├─ Resumen de la consulta
│  ├─ Fotos antes (privadas, solo para María)
│  ├─ Procedimiento a realizar (paso a paso)
│  ├─ Presupuesto desglosado
│  ├─ Timeline (semana por semana)
│  ├─ Instrucciones pre-op detalladas
│  ├─ Qué esperar post-op
│  ├─ Medicinas recomendadas
│  └─ Teléfonos de emergencia
│
└─ Guardar en nube + enviar a María

ACCIÓN INMEDIATA 4: Crear Tarea para Secretaria
"Agendar cirugía de María García
 Fecha preferida: En 2 semanas (aprox. 29 de agosto)
 Duración estimada: 1.5 horas
 Doctor: Dr. Carlos
 Anestesista: Confirmar
 Costo confirmado: $4,800 MXN
 Pago: 50/50 ($2,400 hoy, $2,400 día de cirugía)"

ACCIÓN INMEDIATA 5: Generar Link de Pago
├─ Monto: $2,400 MXN (anticipo 50%)
├─ Plazo: Pagar dentro de 48 horas
├─ Métodos aceptados: Stripe, PagSeguro, Transferencia
├─ Confirmación: Por email y WhatsApp automático
└─ Si no paga en 48h: Recordatorio automático

ACCIÓN INMEDIATA 6: Enviar WhatsApp a María
"🎉 ¡FELICIDADES MARÍA!

Acabas de tomar la mejor decisión. 
El Dr. Carlos está emocionado de ayudarte a lograr 
la figura que deseas.

📋 TU PLAN PERSONALIZADO:
Procedimiento: Liposucción Láser Asistida
Presupuesto Total: $4,800 MXN
Tu inversión te dará: Abdomen definido, sin cicatriz visible

💰 PRÓXIMO PASO - PAGO:
Necesitamos anticipo de $2,400 MXN para confirmar tu fecha.

👇 PAGAR AHORA:
[Link de Stripe - $2,400]

Si prefieres transferencia o tenéis dudas:
Llama a Patricia: [Número telefónico]

⏰ IMPORTANTE: Confirma pago dentro de 48 horas 
    (sino liberamos tu slot para otro paciente)

📎 Se te envió por email:
✓ Tu plan personalizado (PDF)
✓ Guía pre-cirugía
✓ Qué esperar en recuperación
✓ Video: 'Primer mes después de liposucción'

¿Preguntas? Escribe aquí 👇"

ACCIÓN INMEDIATA 7: Enviar Email a María
"Asunto: Tu Plan de Liposucción Personalizado - $4,800 MXN
Adjuntos:
- Plan_Liposuccion_Maria_Garcia.pdf
- Guia_Pre_Cirugia_Checklist.pdf
- Medicinas_Recomendadas.pdf
- Video: Recuperación_Dia_1_Liposuccion.mp4
- Testimonios_Video: Pacientes_con_liposuccion_similar.mp4"

ACCIÓN INMEDIATA 8: Crear Tarea para Doctor
"Dr. Carlos - Cirugía programada para María
Fecha propuesta: 29 de agosto a las 10:00 AM (confirm)
Tipo: Liposucción láser asistida abdominal
Duración estimada: 1.5 horas
Anestesia: [A coordinar con anestesista]
Notas: Paciente nerviosa, primera vez. Dedicar tiempo en 
       explicar paso a paso en pre-op."
```

---

## 💳 MOMENTO 6: MARIA REALIZA PAGO (T=2 horas después de consulta)

**María llega a casa y abre el WhatsApp:**

```
"Oye, aquí está el link de pago. Dejo que me lo mande a mí misma"

[Hace click en link de Stripe]

Página de pago Stripe:
┌─────────────────────────────────────┐
│ PAGO SEGURO LIPOSUCCIÓN             │
│                                     │
│ Clínica: Dermatológica Puebla      │
│ Paciente: María García              │
│ Procedimiento: Liposucción Abdominal│
│ Monto: $2,400.00 MXN                │
│                                     │
│ Número de Tarjeta:                  │
│ [4532 1234 5678 9010]              │
│                                     │
│ Fecha Vencimiento: 12/26            │
│ CVC: 123                            │
│                                     │
│ [🔒 PAGAR $2,400.00]                │
└─────────────────────────────────────┘

✅ PAGO EXITOSO

"Tu pago de $2,400 MXN ha sido procesado.
 
 Comprobante: #TXN-20260815-12345
 
 Reservamos tu cita para:
 📅 29 de AGOSTO (2 semanas)
 ⏰ 10:00 AM
 
 Recibirás confirmación en tu email"
```

---

## 🔧 AUTOMACIONES QUE SE DISPARAN (Post Pago)

```
TRIGGER: Pago de $2,400 confirmado en sistema

ACCIÓN 1: Confirmar Cirugía en Calendario
├─ Dr. Carlos: Cirugía programada 29 ago 10:00 AM (1.5 horas)
├─ Quirófano: Reservado
├─ Anestesista: Notificado para confirmar
└─ Secretaria: Recibe notificación "Cirugía de María confirmada"

ACCIÓN 2: Enviar Confirmación a María (WhatsApp)
"✅ PAGO RECIBIDO

Tu cirugía está 100% confirmada:
📅 Jueves 29 de agosto
⏰ 10:00 AM
👨‍⚕️ Dr. Carlos + Equipo anestésico
🏥 Quirófano 2, Clínica Dermatológica

Faltan: 14 DÍAS

Ahora necesitamos que hagas análisis de laboratorio.
Te envío los requisitos:

📋 ESTUDIOS REQUERIDOS:
✓ Biometría Hemática
✓ Química Sanguínea
✓ Prueba de Coagulación
✓ Electrocardiograma (por edad)
✓ Radiografía de Tórax (si aplica)

Este análisis cuesta ~$1,500-2,000 MXN

Tienes 5 opciones de laboratorios asociados:
1. Laboratorio X (a 2 km de clínica)
2. Laboratorio Y (centro)
[etc]

👉 Puedes hacértelo en cualquier laboratorio
📞 Si lo haces en nuestros asociados, María te regala descuento"

ACCIÓN 3: Crear Checklist de Pre-op para María
"Tareas antes de tu cirugía (29 de agosto):

SEMANA 1 (15-21 de agosto):
☐ Hacer análisis de laboratorio
☐ Traer resultados 3 días antes
☐ Ver videos educativos (15 min c/u)
☐ Comprar medicinas post-op en farmacia
☐ Preparar lista de preguntas para el anestesista

SEMANA 2 (22-28 de agosto):
☐ Dejar de tomar ibuprofeno y aspirina
☐ Dejar de fumar (28 días antes mejora cicatrización)
☐ Aumentar consumo de agua
☐ Evitar alcohol
☐ Dormir 8 horas diarias

SEMANA DE CIRUGÍA (25-29 de agosto):
☐ Confirmar asistencia (call Patricia)
☐ Traer ID y tarjeta de seguro
☐ Lavar bien la zona abdominal noche anterior
☐ No comer desde las 20:00 del 28 de agosto
☐ No beber agua desde 2 horas antes
☐ Llegar 30 minutos antes
☐ Traer acompañante (regresa a casa sedada)"

ACCIÓN 4: Programar Recordatorios Automáticos
├─ 7 días antes (22 ago): 'Análisis debe estar listo'
├─ 3 días antes (26 ago): 'Últimas instrucciones'
├─ 1 día antes (28 ago): 'Ayuno desde las 20:00'
├─ Día mismo (29 ago 8:00 AM): 'Buenos días! Hoy es tu día'
└─ Post-cirugía: [Descrito en etapa siguiente]

ACCIÓN 5: Mover a siguiente ETAPA
Pipeline: Cirugía Plástica
Etapa ANTERIOR: Análisis de Laboratorio
Etapa NUEVA: Pago y Programación
Status: PAGO_CONFIRMADO_CIRUGÍA_AGENDADA
```

**Estado de María en Sistema ahora:**
- ✅ Consulta Completada ✓
- ✅ Pago de Anticipo Confirmado ✓
- ✅ Cirugía Programada para 29 de agosto
- 📊 Probabilidad de asistencia: 95%
- 📊 Puntuación en Pipeline: 98/100
- 🎯 Próximo Paso: Realizar laboratorios y prepararse

---

# 🏥 ESCENA 3: DÍA DE CIRUGÍA (ETAPA 4: DÍA DE CIRUGÍA)

## ⏰ JUEVES 29 DE AGOSTO, 8:00 AM

### María se despierta (ya lleva 12 horas de ayuno)

```
Primer mensaje WhatsApp que recibe:
"🎯 BUENOS DÍAS MARÍA!

HOY ES TU DÍA. Estamos listos para transformar tu abdomen.

⏰ TIMELINE DEL DÍA:
09:30 - Llega a clínica con acompañante
09:45 - Cambio a ropa quirúrgica
10:00 - Pre-op: Dr. Carlos + Anestesista hablan contigo
10:30 - Entras a quirófano
11:45 - Sale a sala de recuperación
13:00 - Puedes irte a casa con acompañante

📋 RECUERDA TRAER:
✓ ID
✓ Tarjeta de seguro (si aplica)
✓ Teléfono cargado
✓ Acompañante: [IMPORTANTE - NO SOLAS]

🚫 RECUERDA NO:
✗ Comer ni beber
✗ Maquillaje
✗ Perfume
✗ Joyas o metales

☎️ Si tienes miedo o preguntas:
Llama a Patricia: [Número]

¡VAMOS! 💪 Estás en las mejores manos"
```

### 9:30 AM - María llega a clínica con hermana

```
Secretaria: "Hola María! Qué emoción. Bienvenidas!
             [Abrazo reconfortante]

             Primero vamos a oficina para:
             1. Confirmar que pagaste la segunda mitad ($2,400)
             2. Firmar último consentimiento de anestesia
             3. Responder preguntas finales"

[10 minutos de papeleo]

Secretaria: "Perfecto María. Todo listo.
             Tu hermana puede quedarse en sala de espera.
             Vamos a llevarte al pre-op."

[Llevan a María a pre-op area]

Pre-op Nurse: "Hola María, bienvenida! Soy Ana.
               Voy a hacer algunas cosas estándar:
               
               1. Medir presión arterial y temperatura
               2. Preguntarte sobre alergias (confirmación)
               3. Hacerte un último formulario
               4. Explicarte qué va a pasar"

[Chequeo vital: Presión 120/80, Temp 37°C - Todo normal]

Ana: "Perfecto. Todo está excelente María.
      Ahora te explico qué va a pasar:
      
      1. En 5 minutos entra el anestesista, te pone 
         anestesia intravenosa (es como caer dormida)
         
      2. Entras al quirófano ya dormida
      
      3. El Dr. Carlos hace la liposucción (1.5 horas)
      
      4. Te despiertas en sala de recuperación 
         con nosotras cerca
      
      5. Tu hermana entra cuando ya estés más despierta

      ¿Preguntas?"

María: "Tengo mucho miedo de no despertar"

Ana: "Es totalmente normal. Pero aquí hacemos esto 
      cientos de veces. El anestesista va a estar 
      monitoreando tu corazón, oxígeno y todo constantemente.
      
      En 15 años nunca hemos tenido un problema.
      
      Tú solo duérmete tranquila y confía."

[Entra Anestesista]

Anestesista: "Hola María, soy Dr. Luis.
              Yo voy a estar cuidando que duermas bien
              y que tu cuerpo esté perfecto durante la cirugía.
              
              ¿Preguntas para mí?"

María: "¿Me van a respirar artificialmente?"

Anestesista: "Sí, te voy a poner un tubo para que respires
              oxígeno puro. Es muy seguro. Cuando despiertes,
              no lo vas a sentir."

[Anestesista coloca IV en brazo]

Anestesista: "Ahora voy a inyectar el medicamento.
              Va a sentir mucha relajación...
              
              Piensa en algo bonito... un viaje, una playa..."

[Anestesia comienza]

María: "Se siente raro... todo se bla..."

[María duerme profundamente]

Anestesista: "Perfecto. Está lista. Llevamos a quirófano"

[La llevan a quirófano en cama especial]
```

### 10:30 AM - En el Quirófano

```
[Sistema de GHL automáticamente registra]

TRIGGER: Dr. Carlos presiona "Cirugía inicia" en iPad
Status actualizado: EN_QUIRÓFANO

[Anestesista monitorea constantemente vitales]
[Enfermera esteriliza zona abdominal]
[Dr. Carlos comienza con cánula de liposucción]

EN GHL - CRONOMETRO DE CIRUGÍA ACTIVO:
Hora inicio: 10:32 AM
Duración prevista: 1.5 horas
Doctores presentes: Dr. Carlos (cirujano), Dr. Luis (anestesista), 2 enfermeras
Temperatura quirófano: 20°C (óptima)
Estado vitales María: ✅ Estables
  - Presión: 118/76
  - O2: 98%
  - Corazón: 64 bpm (normal)

[En la sala de espera, hermana de María recibe mensaje]
"Tu hermana está en quirófano.
 Todo está perfecto. ✅
 Duración estimada: 1.5 horas
 Te mantendré informada cada 30 min"
```

### 12:00 PM - Cirugía Completada

```
TRIGGER: Dr. Carlos presiona "Cirugía completada exitosamente"

EN GHL - REGISTRO DE CIRUGÍA:
Hora inicio: 10:32 AM
Hora fin: 12:00 PM
Duración real: 1h 28 min ✅
Resultado: EXITOSO
Complicaciones: NINGUNA ✅
Cantidad de grasa removida: 2.3 liters (estimado)

Nota del Dr. Carlos:
"Liposucción láser abdominal completada sin incidentes.
 Resultado excepcional. Cicatrices mínimas.
 Abdomen definido logrado. Paciente despierta en recuperación.
 Vitales perfectas. Plan de recuperación: estándar."

Fotos de quirófano:
- Área tratada durante procedimiento
- Abdomen post-procedimiento (zona operada)
- Cantidad de grasa removida

[ENVIADO A: Archivo médico de María (privado)]

ACCIÓN 1: Enviar notificación a sala de espera
"✅ LA CIRUGÍA TERMINÓ EXITOSAMENTE!

El Dr. Carlos está muy satisfecho con los resultados.
Todo salió perfecto. Cero complicaciones.

María está en sala de recuperación.
En 15 minutos puede entrar a verla."

[Hermana de María entra a sala de recuperación]

Hermana: "¡María! ¡Despierta cariño!"

María: (adormilada) "¿Ya... ya terminó?"

Hermana: "Sí mi amor! El doctor dice que salió perfecto!
          Mira tu abdomen!"

María: "Ay Dios... se ve plano... Wow..."

Anestesista Ana: "Descansa un poco más. Te vas a sentir
                  rara por un par de horas por la anestesia.
                  Eso es normal."
```

### 1:00 PM - María se va a casa

```
ACCIÓN POST-QUIRÚRGICA EN GHL:

Instucción 1: Generar Protocolo Post-Op Personalizado

"PROTOCOLO DE RECUPERACIÓN POST-LIPOSUCCIÓN - MARÍA GARCÍA

DÍA 1-2 (Hoy y mañana):
├─ Descansa completamente (cama)
├─ Puede tomar líquidos claros (agua, jugo)
├─ Analgésicos cada 6 horas según receta
├─ Drenajes: Cámbialos cada vez que se llenen
├─ Vendas: Mantén apretadas, no las quites
├─ Movimiento: Solo para ir al baño
└─ Dieta: Comida ligera (no grasa)

DÍA 3-7 (Próxima semana):
├─ Comienza a caminar en casa (10-15 min cada 2h)
├─ Puede duchar (protege la zona)
├─ Retira vendas después de día 7
├─ Continúa analgésicos si necesita
├─ Cuidado de drenajes (si aún tienes)
├─ Evita subir escaleras
└─ Nada de ejercicio o pesas

DÍA 8-14 (Semana 2):
├─ Camina 20-30 min 3x al día
├─ Puedes volver trabajo de escritorio
├─ Masaje suave del área (según instrucciones)
├─ Usa faja compresiva 12h al día mínimo
├─ Medicinas anti-inflamatorios
└─ Primera revisión con Dr. Carlos (DÍA 10)

MEDICINAS A TOMAR:
├─ Amoxicilina: 500mg cada 8h x 7 días (antibiótico)
├─ Paracetamol: 500mg cada 6h (para dolor)
├─ Ibuprofeno: 400mg cada 8h (anti-inflamatorio)
├─ Pomada de árnica: 2x diarios (moretones)
└─ Vitamina C: 1000mg diarios (cicatrización)"

Acción 2: Enviar WhatsApp con instrucciones de hoy

"🏠 YA ESTÁS EN CASA - INSTRUCCIONES CRÍTICAS

PRÓXIMAS 24 HORAS:
✅ Descansa mucho
✅ Toma analgésicos (pastillas en bolsa)
✅ Bebe agua constantemente
✅ Come ligero
✅ Los moretones y hinchazón es NORMAL
✅ La sensación extraña es NORMAL

🚫 NO:
✗ No hagas ejercicio
✗ No levantes cosas pesadas
✗ No duermas boca abajo
✗ No tomes alcohol por 2 semanas (con medicinas)
✗ No te duchas en tina, solo regadera

⚠️ LLAMA DE EMERGENCIA SI:
├─ Fiebre > 38.5°C
├─ Sangrado excesivo
├─ Dificultad para respirar
├─ Dolor insoportable
└─ Secreción verde/amarilla (infección)

☎️ TELÉFONOS:
├─ Emergencia Clínica: [Número 24/7]
├─ Whatsapp Dr. Carlos: [Número]
└─ Secretaria Patricia: [Número laboral]

📅 CITA DE SEGUIMIENTO: 10 días
   Martes 8 de septiembre, 10:00 AM
   Para revisar cicatrización y retirar drenajes (si aplica)"

Acción 3: Crear tareas automáticas de seguimiento

RECORDATORIOS AUTOMÁTICOS:
├─ 24h después: ¿Cómo te sientes?
├─ 48h después: Revisión de drenajes
├─ 72h después: Cambio de vendas
├─ Día 10: Recordatorio cita de seguimiento
├─ Día 14: Encuesta de progreso
├─ Día 30: Control importante (cicatrización)
├─ Día 60: Cómo se ve ahora
└─ Día 90: Resultado final

Acción 4: Notificar al doctor

"Dr. Carlos - Cirugía Completada:
 Paciente: María García
 Procedimiento: Liposucción Láser Abdominal
 Resultado: Excelente ✅
 Duración: 1h 28min
 Complicaciones: Ninguna ✅
 
 Próxima revisión: 10 de septiembre
 
 Notas: Paciente consciente, vitales estables.
        Expectativas altas de resultado."
```

---

## 📊 RESUMEN DEL FLUJO COMPLETADO

### Línea de Tiempo Total

```
DÍA 1 (Jueves 14 agosto):
  09:00 AM - María llena formulario online
  09:05 AM - Sistema envía bienvenida + catálogo
  11:00 AM - Secretaria llama a María
  14:00 PM - María confirma consulta

DÍA 2 (Viernes 15 agosto):
  10:00 AM - Consulta con Dr. Carlos
  11:00 AM - María ve presentación de antes/después
  11:15 AM - Dr. Carlos da presupuesto exacto ($4,800)
  11:30 AM - María paga anticipo ($2,400 via Stripe)
  12:00 PM - Sistema confirma cirugía para 29 de agosto

DÍAS 3-14 (Semanas 1-2):
  Múltiples recordatorios automáticos
  María hace análisis de laboratorio
  Recibe instrucciones de preparación
  Ve videos educativos

DÍA 15 (Jueves 29 agosto):
  09:30 AM - Llega a clínica
  10:00 AM - Pre-op con anestesista
  10:32 AM - Comienza cirugía
  12:00 PM - Cirugía completada
  13:00 PM - Se va a casa con acompañante
  14:00 PM - Primer recordatorio post-op por WhatsApp

DÍAS 16-45 (Semanas 3-6):
  Seguimiento automático de recuperación
  Cita de revisión día 10 (8 de septiembre)
  Actualizaciones de progreso
  Fotos de cicatrización
  Encuestas de satisfacción

RESULTADO FINAL:
  ✅ Abdomen definido
  ✅ María enamorada de resultados
  ✅ NPS Score: 10/10
  ✅ Testimonial y fotos para redes sociales
  ✅ UPSELL: Ofrece procedimiento complementario
```

---

## ✅ PUNTOS CLAVE QUE VALIDAR

### ¿Es este el flujo que quieres implementar?

**Aspectos críticos a confirmar:**

1. **Automations de Bienvenida**
   - ¿El mensaje de WhatsApp inmediato está bien?
   - ¿El email con catálogo es suficiente?
   - ¿Traer documentos en PDF está bien?

2. **Tiempo de Respuesta**
   - ¿Secretaria debe llamar en < 2 horas? (muy rápido?)
   - ¿O pueden ser en < 24 horas?

3. **Pago de Anticipo**
   - ¿Se debe pedir 50% o puede ser 30%?
   - ¿Cuánto tiempo para pagar (48h, 7 días)?

4. **Seguimiento Post-Op**
   - ¿Recordatorios diarios o cada 2-3 días?
   - ¿Pruebas de laboratorio son obligatorias?

5. **Mensajes**
   - ¿Los mensajes de WhatsApp tienen mucho emoji?
   - ¿Están demasiado informales?
   - ¿Falta algo importante?

6. **Escaladas**
   - ¿Qué pasa si María no paga el anticipo?
   - ¿Qué pasa si no confirma la cita?
   - ¿Cuál es el plan B?

---

**Documento Preparado:** 13 de agosto de 2026  
**Versión:** 1.0 - FLUJO COMPLETO DETALLADO  
**Responsable:** Claude Code + Equipo  
**Estado:** 🟢 LISTO PARA APROBACIÓN  
**Siguiente Etapa:** Aprobación de Carlos → Ajustes → Implementación en SPRINT 1
