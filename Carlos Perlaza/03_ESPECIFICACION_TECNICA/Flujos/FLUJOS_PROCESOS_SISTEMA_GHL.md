# FLUJOS DE PROCESOS - SISTEMA DE AUTOMATIZACIÓN GHL
**Proyecto:** Clínica de Estética y Cirugía Plástica (Doctora - Puebla, México)  
**Cliente:** Carlos Perlaza (Intermediario)  
**Proveedor:** Algorith Pro (John)  
**Fecha:** 13 de agosto de 2026  
**Estado:** Definición de flujos post-onboarding  
**Metodología:** Agile/Scrum con entregas incrementales

---

## 📌 RESUMEN EJECUTIVO DE FLUJOS

El sistema tendrá **7 flujos principales** que se implementarán en 4 sprints de 2 semanas cada uno:

| # | Flujo Principal | Sprint | Prioridad | Estado |
|---|---|---|---|---|
| 1 | Agendamiento de Citas | SPRINT 1 | 🔴 CRÍTICA | Pending |
| 2 | Gestión de Historiales de Pacientes | SPRINT 1 | 🔴 CRÍTICA | Pending |
| 3 | Comunicación Multi-canal (WhatsApp/Email/SMS) | SPRINT 2 | 🔴 CRÍTICA | Pending |
| 4 | Pipeline de Lead Generation | SPRINT 3 | 🟡 ALTA | Pending |
| 5 | Gestión de Pagos y Facturación | SPRINT 3 | 🔴 CRÍTICA | Pending |
| 6 | Reportes y Analítica | SPRINT 3-4 | 🟡 ALTA | Pending |
| 7 | Integración de Publicidad (Meta Ads) | SPRINT 4 | 🟡 ALTA | Pending |

---

## 🔄 FLUJO 1: AGENDAMIENTO DE CITAS (SPRINT 1)

### Descripción
Sistema de reserva de citas que permite a pacientes agendar consultas con diferentes doctores, considerando disponibilidad, especialidades y servicios específicos.

### Actores Principales
- **Paciente** (cliente final que usa el sistema)
- **Secretaria** (gestiona calendarios y confirmaciones)
- **Doctor/Especialista** (volante o fijo)
- **Sistema GHL** (automatiza flujo)

### Flujo Paso a Paso

#### A) CAPTURA DE DISPONIBILIDAD (Setup Inicial - Secretaria)

```
1. Secretaria entra a GHL → Sección "Calendarios"
2. Crea calendario para cada doctor (ej: Dra. María - Cirugía Plástica)
3. Define:
   - Horarios disponibles (Lun-Vie: 9:00-13:00, 15:00-18:00)
   - Duración de citas (30 min, 45 min, 60 min por tipo)
   - Servicios asociados (Liposucción, Aumento de senos, etc.)
   - Información de contacto del doctor
4. Sistema guarda disponibilidad
5. ✅ Disponibilidad lista para pacientes
```

**Responsable:** Secretaria  
**Tiempo:** Configuración única + actualizaciones mensuales  
**Herramientas:** Go High Level Calendar Module

---

#### B) PACIENTE AGENDA CITA (Flujo Principal)

```
INICIO: Paciente accede a landing page / WhatsApp del negocio

1️⃣ OPCIÓN A - PORTAL WEB
   └─ Paciente va a página web → "Agendar Cita"
      ├─ Sistema pregunta: ¿Nuevo o cliente existente?
      │  ├─ NUEVO: Captura (Nombre, Email, Teléfono, Celular)
      │  └─ EXISTENTE: Cargar desde base de datos
      ├─ Selecciona Doctor/Especialidad
      ├─ Selecciona Servicio (de catálogo)
      ├─ Selecciona Fecha y Hora disponible
      └─ PAGA (pago completo O anticipo según config)

2️⃣ OPCIÓN B - WHATSAPP
   └─ Paciente envia: "Quiero agendar una cita"
      ├─ Bot pregunta por nombre/teléfono
      ├─ Bot muestra disponibilidades de doctores
      ├─ Paciente selecciona (mediante botones)
      ├─ Bot confirma fecha/hora
      ├─ Genera link de pago
      └─ Paciente paga

3️⃣ CONFIRMACIÓN Y ALMACENAMIENTO
   └─ Sistema almacena:
      ├─ Datos del paciente (BD centralizada)
      ├─ Información de cita (doctor, fecha, hora, servicio)
      ├─ Estado: "Confirmada"
      ├─ Datos de pago (monto, medio, comprobante)
      └─ Historial de la transacción

4️⃣ NOTIFICACIONES AUTOMÁTICAS
   ├─ WhatsApp a Paciente: "Tu cita está confirmada para [fecha/hora]"
   ├─ Email a Paciente: Comprobante de pago + recordatorio
   ├─ Notificación a Secretaria: Cita agendada (revisar)
   └─ Calendario del Doctor actualizado automáticamente
```

**Responsable:** Sistema GHL (automatizado) + Secretaria (supervisión)  
**Duración:** 2-5 minutos  
**Herramientas:** GHL Calendar + Payment Gateway + CRM

---

#### C) RECORDATORIO 24H ANTES

```
TRIGGER: Sistema detecta que falta 24 horas para la cita

1. Envía mensaje WhatsApp a paciente:
   "📅 Recordatorio: Tu cita con Dra. María es mañana a las 10:00 AM
   Servicios: Liposucción
   🔗 Confirmar asistencia: [Botón SI/NO]"

2. Paciente responde:
   ├─ SI ✅ → Sistema marca como "Confirmado"
   ├─ NO ❌ → Sistema abre opción de "Reprogramar"
   └─ Sin respuesta → Se envía Email adicional

3. Secretaria recibe resumen:
   "Confirmaciones de hoy: 8/10 citas"
```

**Responsable:** Sistema (automatizado)  
**Duración:** Automático  
**Herramientas:** GHL Automation + WhatsApp API

---

#### D) GESTIÓN DE CAMBIOS (Cancelación/Reprogramación)

```
ESCENARIO 1: Paciente quiere reprogramar
├─ Envía mensaje: "Necesito cambiar mi cita"
├─ Sistema ofrece opciones de fechas/horas disponibles
├─ Paciente selecciona nueva fecha
├─ Sistema confirma cambio en calendario
└─ Notificaciones actualizadas a todos

ESCENARIO 2: Paciente cancela
├─ Envia: "Quiero cancelar mi cita"
├─ Sistema valida si cumple política de cancelación
│  ├─ Si: Procesa reembolso/nota de crédito
│  └─ Si no: Informa política
└─ Actualiza disponibilidad para otros pacientes

ESCENARIO 3: Doctor no disponible
├─ Secretaria marca doctor como "No disponible [fecha]"
├─ Sistema notifica automáticamente a pacientes con citas ese día
├─ Ofrece opciones: Reprogramar con otro doctor o fecha
└─ Procesa cambios en cascada
```

**Responsable:** Sistema + Secretaria (excepciones)  
**Duración:** Automático  
**Herramientas:** GHL Automation + CRM

---

#### E) GESTIÓN DE DOCTORES VOLANTES

```
SITUACIÓN: Clínica tiene doctores que se habilitan/deshabilitan

1. HABILITAR DOCTOR
   ├─ Secretaria entra a GHL → "Recursos" → "Agregar Doctor"
   ├─ Configura: Nombre, especialidad, horarios
   ├─ Sistema crea calendario y lo publica
   └─ Pacientes pueden agendar con este doctor

2. DESHABILITAR DOCTOR
   ├─ Secretaria marca como "No disponible"
   ├─ Sistema bloquea nuevas citas
   ├─ Notifica a pacientes con citas agendadas:
   │  "Tu doctor ha dejado de estar disponible"
   │  "¿Deseas cambiar a otro especialista?"
   └─ Ofrece alternativas automáticamente

3. TEMPORADA PARCIAL
   ├─ Doctor disponible: Lunes-Miércoles (no Jueves-Viernes)
   ├─ Secretaria configura horario específico
   ├─ Sistema solo permite agendar en esos días
   └─ Se puede cambiar mensualmente sin problema
```

**Responsable:** Secretaria (con autorización de doctora)  
**Duración:** Configuración: 5 min / Cambios: Automático  
**Herramientas:** GHL Recurses Management

---

### Métricas de Éxito

- ✅ 100% de citas confirmadas en sistema
- ✅ Tasa de no-shows < 10%
- ✅ Confirmación 24h > 80%
- ✅ Tiempo de respuesta WhatsApp < 2 min
- ✅ Disponibilidad calendario actualizada en tiempo real

---

---

## 🏥 FLUJO 2: GESTIÓN DE HISTORIALES DE PACIENTES (SPRINT 1)

### Descripción
Base de datos centralizada que registra toda la información médica y comercial del paciente para seguimiento continuo y personalización.

### Estructura de Datos Capturados

```
PACIENTE
├─ Datos Personales
│  ├─ Nombre completo
│  ├─ Email
│  ├─ Teléfono / Celular
│  ├─ Fecha de nacimiento
│  ├─ Nacionalidad/DNI
│  └─ Dirección
│
├─ Historial Médico
│  ├─ Alergias registradas
│  ├─ Condiciones de salud (diabetes, hipertensión, etc.)
│  ├─ Medicamentos actuales
│  ├─ Cirugías previas
│  ├─ Tratamientos anteriores (fechas, tipos)
│  └─ Notas médicas del doctor
│
├─ Historial de Citas
│  ├─ Citas completadas (fecha, doctor, servicio, duración)
│  ├─ Citas canceladas
│  ├─ No-shows
│  ├─ Próximas citas agendadas
│  └─ Historial de cambios
│
├─ Historial de Pagos
│  ├─ Transacciones (monto, fecha, método)
│  ├─ Comprobantes
│  ├─ Estado de pago (pagado, pendiente, refundado)
│  ├─ Saldo pendiente (si aplica)
│  └─ Historial de promociones/descuentos
│
├─ Notas y Seguimiento
│  ├─ Observaciones post-cita
│  ├─ Instrucciones pre-tratamiento
│  ├─ Instrucciones post-tratamiento
│  ├─ Recomendaciones del doctor
│  ├─ Preferencias del paciente
│  └─ Notas de seguimiento (estado de recuperación, resultados)
│
└─ Engagement
   ├─ Preferencias de comunicación
   ├─ Historial de campañas recibidas
   ├─ Estado: Lead/Prospecto/Paciente/VIP
   └─ Score de satisfacción
```

### Flujo A: PRIMER PACIENTE - CAPTURA DE DATOS

```
TRIGGER: Paciente agenda primera cita o entra al sistema

1️⃣ AUTOMATIZACIÓN INICIAL
   ├─ Sistema detecta nuevo paciente
   ├─ Captura datos básicos (de la reserva):
   │  ├─ Nombre
   │  ├─ Teléfono/Email
   │  └─ Servicio de interés
   └─ Crea registro en BD

2️⃣ ENVÍO DE FORMULARIO DE SALUD
   ├─ Sistema envía por WhatsApp/Email:
   │  "Antes de tu cita necesitamos información de salud"
   │  📋 [Link a Formulario Digital]
   ├─ Paciente completa:
   │  ├─ Alergias
   │  ├─ Medicamentos actuales
   │  ├─ Cirugías previas
   │  ├─ Condiciones médicas
   │  └─ Autorizaciones (consentimiento informado)
   └─ Sistema almacena en BD

3️⃣ REVISIÓN POR SECRETARIA
   ├─ Secretaria revisa datos en GHL
   ├─ Valida completitud
   └─ Marca como "Listo para consulta"

4️⃣ DOCTOR ACCEDE A HISTORIAL PRE-CITA
   ├─ Doctor ve al paciente en su calendario
   ├─ Puede acceder a:
   │  ├─ Información médica capturada
   │  ├─ Historial de servicios anteriores
   │  └─ Notas de citas anteriores
   └─ Se prepara para la cita
```

**Responsable:** Sistema (automatizado) + Secretaria (QA) + Doctor (revisión)  
**Duración:** Automático (1-2 horas)  
**Herramientas:** GHL CRM + Forms + Automations

---

### Flujo B: REGISTRO POST-CITA

```
TRIGGER: Después de que termina la cita

1️⃣ DOCTOR AGREGA NOTAS
   ├─ Entra a GHL → Selecciona paciente
   ├─ Agrega:
   │  ├─ Servicio realizado (con detalles)
   │  ├─ Duración
   │  ├─ Observaciones médicas
   │  ├─ Instrucciones post-tratamiento
   │  ├─ Recomendaciones de seguimiento
   │  ├─ Fotos (antes/después, si aplica)
   │  └─ Estado del paciente post-tratamiento
   └─ Sistema guarda automáticamente

2️⃣ GENERACIÓN DE INSTRUCCIONES AUTOMÁTICAS
   ├─ Sistema detecta tipo de servicio
   ├─ Genera automáticamente:
   │  ├─ Instrucciones específicas de cuidado
   │  ├─ Medicamentos recomendados
   │  ├─ Restricciones (actividad, comida, agua)
   │  └─ Duración de recuperación esperada
   └─ Las almacena en BD

3️⃣ ENVÍO A PACIENTE
   ├─ Sistema envía automáticamente por WhatsApp:
   │  "Tu procedimiento [nombre] fue exitoso! 
   │   Aquí están tus instrucciones de cuidado:
   │   - Evita agua fría por 48 horas
   │   - Usa protector solar diariamente
   │   - Toma medicamento [X] cada 8 horas
   │   📞 Si tienes dudas, escribe aquí"
   ├─ También envia por Email con formato completo
   └─ Documento PDF adjunto con instrucciones

4️⃣ ESTADÍSTICAS ACTUALIZADAS
   ├─ Sistema actualiza:
   │  ├─ Total de citas realizadas
   │  ├─ Ingresos acumulados
   │  ├─ Servicios más populares
   │  └─ Doctor más consultado
   └─ Dashboard actualizado en tiempo real
```

**Responsable:** Doctor (notas) + Sistema (automatización)  
**Duración:** 5 min doctor + Automático resto  
**Herramientas:** GHL CRM + Automations + Email

---

### Flujo C: SEGUIMIENTO POST-TRATAMIENTO

```
TRIGGER: Después de 24h, 3 días, 1 semana, 2 semanas

SECUENCIA AUTOMÁTICA DE SEGUIMIENTO:

1️⃣ MENSAJE 24 HORAS DESPUÉS
   "¿Cómo te sientes después de tu procedimiento?
   Cuéntanos: 😊 Bien  😐 Normal  ☹️ Mal
   O escribe aquí si tienes dudas"
   
   → Si responde "Mal": Secretaria recibe alerta para contactar

2️⃣ MENSAJE 3 DÍAS DESPUÉS
   "Tu recuperación va según lo esperado?
   Comparte una foto de los resultados (opcional)
   📸 [Botón para foto]"

3️⃣ MENSAJE 1 SEMANA DESPUÉS
   "Estamos en la semana 1 de recuperación!
   🎯 Próximos pasos: Retira puntos [fecha]
   📅 Cita de control: [Agendar aquí]"

4️⃣ MENSAJE 2 SEMANAS DESPUÉS
   "Ya deberías ver cambios! Comparte tu experiencia
   ⭐ Rate tu experiencia (1-5 estrellas)
   💬 Testimonial: [Escribir aquí]"

DATOS RECOLECTADOS:
├─ Satisfacción del paciente
├─ Complicaciones o problemas
├─ Fotos de recuperación
├─ Testimonios
└─ Recomendaciones de casos similares futuros
```

**Responsable:** Sistema (automatizado) + Secretaria (excepciones)  
**Duración:** Automático  
**Herramientas:** GHL Automations + WhatsApp API

---

### Flujo D: PRÓXIMAS CITAS Y UPSELL

```
TRIGGER: Paciente completa su tratamiento

1️⃣ ANÁLISIS DE HISTORIAL
   ├─ Sistema revisa:
   │  ├─ Servicios completados
   │  ├─ Tiempo transcurrido desde último servicio
   │  ├─ Servicios complementarios que faltan
   │  └─ Patrón de compra del paciente

2️⃣ GENERACIÓN AUTOMÁTICA DE RECOMENDACIONES
   Ejemplo:
   "Completaste: Liposucción abdomen
   Servicios que potencian resultados:
   ✅ Lifting facial (complementa tu nuevo look)
   ✅ Aumento de senos (muchos clientes lo hacen junto)
   💰 Promoción especial para ti: 15% desc en próximo servicio"

3️⃣ ENVÍO DE PROPUESTA
   ├─ WhatsApp con opciones
   ├─ Email con detalles
   └─ Landing page personalizada

4️⃣ CONVERSIÓN
   ├─ Si paciente muestra interés → Sistema lo califica como "Hot Lead"
   ├─ Si no responde → Se reactiva mensaje en 2 semanas
   └─ Secretaria hace seguimiento con llamada si es VIP
```

**Responsable:** Sistema (automatizado) + Secretaria (seguimiento personal)  
**Duración:** Automático  
**Herramientas:** GHL Automations + Pipeline

---

### Métricas de Éxito

- ✅ 100% de pacientes con historia completa
- ✅ Tiempo de captura de datos < 24h después de primera cita
- ✅ Seguimiento post-cita: 100% de pacientes contactados
- ✅ Tasa de respuesta a seguimiento > 70%
- ✅ Documentación médica completa para auditoría

---

---

## 📱 FLUJO 3: COMUNICACIÓN MULTI-CANAL (SPRINT 2)

### Descripción
Sistema centralizado de comunicación que integra WhatsApp, Email y SMS para garantizar que los pacientes reciban mensajes en su canal preferido.

### Canales Disponibles

```
CANAL 1: WhatsApp API (PRIORITARIO)
├─ Mensajes automáticos
├─ Botones interactivos (Confirmar, Reprogramar, Pagar)
├─ Imágenes y documentos
└─ Disponible 24/7

CANAL 2: Email Automático
├─ Confirmaciones de cita
├─ Comprobantes de pago
├─ Instrucciones de tratamiento
├─ Boletines informativos
└─ Documentos adjuntos

CANAL 3: SMS (Opcional pero Recomendado)
├─ Recordatorios críticos (cuando WhatsApp falla)
├─ Confirmación de pago
├─ Alertas importantes
└─ Backup si no tiene WhatsApp activo
```

### Flujo A: PREFERENCIAS DE COMUNICACIÓN

```
CAPTURA INICIAL:
┌─ Al registrarse, paciente elige:
├─ ¿Cuál es tu canal preferido?
│  ├─ WhatsApp
│  ├─ Email
│  ├─ Ambos
│  └─ SMS (opcional)
├─ ¿Horarios preferidos para mensajes?
│  ├─ Mañana (7-12)
│  ├─ Tarde (12-18)
│  └─ Noche (18-22)
└─ Sistema guarda preferencia en BD
```

---

### Flujo B: AUTOMATIZACIÓN DE MENSAJES POR HITO

```
FLUJO ESTÁNDAR DE CITA (Múltiples Canales):

1️⃣ CONFIRMACIÓN INMEDIATA (5 min después de pago)
   WhatsApp: "✅ Tu cita está confirmada para [Fecha] [Hora]"
   Email: "Comprobante de pago + Resumen"
   SMS: "[Confirmación código ABC123]" (si no responde WhatsApp)

2️⃣ DÍA ANTERIOR (24h antes)
   WhatsApp: "📅 Recordatorio: tu cita es mañana"
   Email: "Detalles de la cita + Instrucciones pre-cita"

3️⃣ MAÑANA DE LA CITA (2h antes)
   WhatsApp: "Nos vemos en 2 horas! 🏥 Llega 10 min antes"
   SMS: "Recordatorio: cita en 2 horas" (si no confirmó)

4️⃣ CONFIRMACIÓN (1h antes)
   WhatsApp Bot: "¿Confirmas tu asistencia? SI / NO"
   └─ Si no responde en 30 min → Llamada automática o SMS

5️⃣ POST-CITA INMEDIATO
   WhatsApp: "Tu tratamiento fue exitoso! Aquí tus instrucciones"
   Email: "Documento PDF con instrucciones + Fotos (si aplica)"

6️⃣ SEGUIMIENTOS (24h, 3d, 1sem, 2sem)
   WhatsApp: Preguntas de satisfacción + Opciones
   Email: Info detallada + Recomendaciones
```

---

### Flujo C: MANEJO DE RESPUESTAS AUTOMÁTICAS

```
PACIENTE RESPONDE EN WHATSAPP:

Escenario 1: "Necesito reprogramar"
├─ Bot: "Perfecto, aquí están tus opciones disponibles:"
├─ Muestra 3-5 slots disponibles
├─ Paciente toca un botón
├─ Sistema actualiza calendario
└─ Confirmación a todos los afectados

Escenario 2: "Tengo una duda"
├─ Analiza palabras clave (dolor, infección, etc.)
├─ Si es URGENTE: Escalada a Secretaria/Doctor
│  └─ Notificación inmediata con 🚨 URGENTE
├─ Si es COMÚN: Respuesta automática de FAQ
│  └─ "Basado en tu pregunta, revisa: [Link]"
└─ Opción: "Necesito hablar con alguien: [Botón]"

Escenario 3: "Quiero otro servicio"
├─ Bot detecta intención de compra
├─ Envía propuesta personalizada
├─ Link de pago directo
└─ Escalada a Secretaria si pregunta específicas

Escenario 4: Sin respuesta (48h después)
├─ Sistema reintenta en Email
├─ Luego en SMS
└─ Nota para Secretaria: "Paciente no respondió"
```

---

### Flujo D: NEWSLETTER Y COMUNICACIÓN GENERAL

```
CAMPAÑAS PROGRAMADAS:

1️⃣ SEMANAL (Lunes 10:00 AM)
   "Tip de belleza: 💅 [Consejo semanal]"
   Audiencia: Todos los pacientes activos
   Canal: WhatsApp + Email

2️⃣ MENSUAL (Primer día del mes)
   "Promoción especial del mes: 20% en [Servicio]"
   Audiencia: Pacientes sin tratamiento hace > 30 días
   Canal: WhatsApp + Email

3️⃣ CAMPAÑA PERSONALIZADA (Cumpleaños)
   "¡Hoy es tu día especial!
    🎁 Descuento especial: 25% en servicio sorpresa"
   Enviado: Día del cumpleaños
   Canal: WhatsApp (prioritario)

4️⃣ REACTIVACIÓN (Pacientes inactivos > 60 días)
   "Te extrañamos! 👋
    ¿Cómo te fue con tu último tratamiento?
    📞 Agende control de resultados"
   Audiencia: Pacientes sin citas hace > 60 días
   Frecuencia: Cada 15 días hasta respuesta
```

---

### Flujo E: ESCALADA A PERSONA REAL

```
SISTEMAS DE ESCALADA:

AUTOMÁTICA (sin opción):
├─ Palabra clave detectada: "dolor intenso", "infección", "emergencia"
├─ Médico/Secretaria recibe alerta inmediata
└─ Llamada prioritaria

MANUAL (usuario solicita):
├─ Paciente: "Quiero hablar con alguien"
├─ Sistema pregunta: "¿Cuándo podemos contactarte?"
├─ Paciente elige horario
├─ Secretaria recibe nota con prioridad
└─ Llamada confirmada en horario elegido

FEEDBACK NEGATIVO (rating < 3 estrellas):
├─ Sistema detecta insatisfacción
├─ Escalada a doctor responsable
├─ Doctor contacta al paciente para resolver
└─ Se registra feedback para mejoras
```

---

### Métricas de Éxito

- ✅ Tasa de respuesta WhatsApp > 85%
- ✅ Tiempo promedio de respuesta < 5 min
- ✅ Mensajes no deseados/spam < 2%
- ✅ Tasa de apertura Email > 60%
- ✅ Escaladas resueltas en < 2 horas
- ✅ Satisfacción con comunicación > 4.5/5 estrellas

---

---

## 💰 FLUJO 4: GESTIÓN DE PAGOS Y FACTURACIÓN (SPRINT 3)

### Descripción
Sistema integrado de pagos que permite múltiples métodos, opciones de pago (total o anticipado) y generación automática de comprobantes.

### Métodos de Pago Disponibles

```
PASARELA 1: STRIPE (Internacional)
├─ Tarjeta de crédito/débito
├─ Transferencia bancaria
├─ Billetera digital
└─ Múltiples monedas (USD, MXN, etc.)

PASARELA 2: PAGSEGURO (Mercado Latinoamericano)
├─ Tarjeta de crédito
├─ Transferencia bancaria
├─ Dinero en cuenta
└─ Boleto bancario

MÉTODO 3: TRANSFERENCIA BANCARIA DIRECTA
├─ Manual (Secretaria verifica)
├─ Datos del banco incluidos en sistema
└─ Comprobante cargado a mano si es necesario

MÉTODO 4: EFECTIVO EN CLÍNICA
├─ Paciente paga en persona
├─ Secretaria confirma en sistema
└─ Sistema genera recibo digital
```

### Flujo A: CAPTURA DE PAGO DURANTE AGENDAMIENTO

```
ESCENARIO 1: PAGO TOTAL (100%)

Paciente agenda cita
├─ Sistema muestra:
│  "Precio del servicio: $XXX MXN"
│  "¿Deseas pagar ahora o después?"
│
├─ Si elige PAGAR AHORA:
│  ├─ Redirige a Stripe/PagSeguro
│  ├─ Paciente ingresa datos de tarjeta
│  ├─ Sistema confirma pago exitoso
│  ├─ Cita se bloquea como CONFIRMADA
│  └─ Genera comprobante digital
│
└─ Si elige PAGAR DESPUÉS:
   ├─ Sistema genera link de pago (válido 48h)
   ├─ Envía por WhatsApp/Email
   ├─ Cita se marca como PENDIENTE PAGO
   └─ Recordatorio cada 12h si no paga


ESCENARIO 2: PAGO ANTICIPADO (Depósito inicial)

Paciente elige opción de depósito:
├─ Sistema muestra:
│  "Anticipo requerido: $XXX MXN (30% del total)
│   Saldo a pagar el día de la cita: $XXX MXN"
│
├─ Paciente paga anticipo
├─ Sistema bloquea cita como "Con Depósito"
├─ Genera comprobante de anticipo
├─ Recordatorio antes de cita:
│  "Recuerda traer $XXX MXN para completar pago"
└─ Opción de pagar saldo también por sistema
```

---

### Flujo B: GESTIÓN DE FACTURACIÓN

```
DATOS CAPTURADOS POR TRANSACCIÓN:

├─ Paciente (Nombre, RUC/RFC, Email)
├─ Servicio (Tipo, duración, precio)
├─ Forma de pago (Método, fecha, comprobante)
├─ Doctor (Quién realizó)
├─ Estado (Pagado, Pendiente, Refundado)
├─ Moneda (MXN, USD, BRL)
└─ Impuestos (si aplica IVA u otro)

COMPROBANTE DIGITAL AUTOMÁTICO:

Sistema genera PDF con:
├─ Número de factura único (AUTO-INCREMENTO)
├─ Fecha y hora
├─ Nombre de paciente
├─ Servicio realizado
├─ Precio unitario + IVA
├─ Método de pago
├─ Comprobante de transacción (si aplica)
├─ Instrucciones de devolución/reclamación
└─ Contacto de servicio al cliente

Envío automático por:
├─ Email (principal)
├─ WhatsApp (resumen corto + link al PDF)
└─ Copia guardada en BD (historial)
```

---

### Flujo C: REEMBOLSOS Y DEVOLUCIONES

```
ESCENARIO 1: CANCELACIÓN POR PACIENTE

Paciente solicita cancelación
├─ Sistema valida política:
│  ├─ ¿Cuánto tiempo antes de la cita?
│  │  ├─ > 48h: Reembolso 100%
│  │  ├─ 24-48h: Reembolso 50%
│  │  └─ < 24h: Sin reembolso (nota de crédito)
│
├─ Si cumple reembolso:
│  ├─ Sistema autoriza reembolso
│  ├─ Inicia transferencia a tarjeta/banco
│  ├─ Envía confirmación al paciente
│  └─ Nota: "Reembolso procesado en 3-5 días hábiles"
│
└─ Si no cumple:
   ├─ Sistema genera NOTA DE CRÉDITO
   ├─ Saldo disponible por 6 meses
   ├─ Paciente puede usar en otro servicio
   └─ Recordatorio mensual: "Tienes crédito de $XXX"


ESCENARIO 2: CANCELACIÓN POR CLÍNICA

Doctor debe cancelar cita
├─ Sistema abre formulario:
│  "¿Por qué se cancela? 
│   - Doctor no disponible
│   - Paciente canceló
│   - Otro"
│
├─ Si fue por clínica:
│  ├─ Reembolso 100% automático
│  ├─ Crédito para rescheduling prioritario
│  └─ Disculpa + descuento para próxima cita
│
└─ Sistema notifica:
   ├─ Paciente: "Sentimos cancelar tu cita..."
   ├─ Opciones de nueva fecha
   └─ "Te damos 15% desc en próximo servicio"


ESCENARIO 3: INSATISFACCIÓN CON RESULTADO

Paciente reporta insatisfacción en encuesta
├─ Sistema detecta rating < 3 estrellas
├─ Abre ticket de soporte (urgente)
├─ Doctor revisa caso
├─ Si doctor acepta:
│  ├─ Reembolso parcial O completo
│  ├─ Sesión corrective (sin costo)
│  └─ Compensación adicional (descuento futuro)
└─ Paciente recibe propuesta
   ├─ Acepta propuesta
   ├─ Rechaza → Escalada a gerente
   └─ Se registra para mejoras
```

---

### Flujo D: DASHBOARD DE FACTURACIÓN

```
DATOS VISIBLES PARA SECRETARIA:

RESUMEN DIARIO:
├─ Ingresos hoy: $XXXX
├─ Transacciones: 12
├─ Pagos pendientes: $XXX
├─ Reembolsos: $XXX
└─ Saldo neto: $XXXX

RESUMEN MENSUAL:
├─ Ingresos totales: $XXXXX
├─ Comparativa vs mes anterior: +15%
├─ Servicio más vendido: Liposucción
├─ Doctor con más ingresos: Dra. María
├─ Tasa de conversión: 85%
└─ Promedio por transacción: $XXX

REPORTES DETALLADOS:
├─ Por servicio (tabular)
├─ Por doctor (gráfico)
├─ Por método de pago (pie chart)
├─ Por fuente de lead (si aplica)
└─ Por paciente (historial)

ALERTAS AUTOMÁTICAS:
├─ Pagos pendientes hace > 7 días
├─ Disputas de tarjeta
├─ Refunds rechazados
└─ Anomalías de transacción
```

---

### Métricas de Éxito

- ✅ Tasa de pago exitoso > 99%
- ✅ Tiempo de procesamiento < 5 min
- ✅ Errores de pago < 0.5%
- ✅ Reembolsos procesados en < 24h
- ✅ Precisión de comprobantes: 100%
- ✅ Saldo de ingresos reconciliado diariamente

---

---

## 📊 FLUJO 5: PIPELINE DE LEAD GENERATION (SPRINT 3)

### Descripción
Sistema de captura, calificación y automatización de leads que convierte prospectivos en pacientes de pago.

### Fuentes de Lead

```
FUENTE 1: SITIO WEB (Landing Page)
├─ Formulario: "Solicitar Consulta"
├─ Campos capturados: Nombre, Email, Teléfono, Servicio Interesado
├─ Trigger: Lead entra automáticamente a primer flujo

FUENTE 2: WHATSAPP DIRECTO
├─ Paciente escribe: "Hola, me interesa..."
├─ Sistema captura: Nombre, Teléfono, Mensaje
├─ Trigger: Inicia secuencia de calificación

FUENTE 3: INSTAGRAM/FACEBOOK (Meta Ads)
├─ Click en anuncio → Landing page
├─ Captura de datos vía formulario
├─ Sincronización automática GHL

FUENTE 4: REFERENCIA (Paciente Existente)
├─ Paciente recomienda amiga
├─ Sistema detecta "Referencia de: [Nombre]"
├─ Aplica 10% desc a ambos

FUENTE 5: GOOGLE MAPS / BÚSQUEDA LOCAL
├─ Click en "Reservar" o "Llamar"
├─ Captura de búsqueda + ubicación
└─ Datos enrutados a CRM
```

---

### Flujo A: CALIFICACIÓN AUTOMÁTICA DE LEADS

```
MOMENTO: Inmediatamente después de captura de lead

1️⃣ PREGUNTAS DE CALIFICACIÓN (Chatbot)
   Sistema envía automáticamente:
   
   "¡Hola [Nombre]! 👋
    Gracias por tu interés. Cuéntame:
    
    1. ¿Cuál servicio te interesa?
       a) Liposucción
       b) Aumento de senos
       c) Lifting facial
       d) Otro: [escribir]
    
    2. ¿Cuándo te gustaría agendar?
       a) Esta semana
       b) Próxima semana
       c) Próximas 2 semanas
       d) Flexible
    
    3. ¿Es tu primera vez?
       a) Sí, es nueva
       b) He hecho procedimientos antes
    
    4. ¿Tienes dudas?"

2️⃣ PUNTUACIÓN AUTOMÁTICA
   Sistema asigna puntuación (0-100):
   ├─ Respondió todas preguntas: +30 pts
   ├─ Servicio específico mencionado: +20 pts
   ├─ Timeframe cercano (< 2 semanas): +25 pts
   ├─ Es cliente nuevo: +15 pts
   └─ Presupuesto compatible: +10 pts
   
   RESULTADO:
   ├─ 80+ puntos: ⭐ HOT LEAD (Acción inmediata)
   ├─ 50-79 puntos: 🟡 WARM LEAD (Seguimiento regular)
   └─ < 50 puntos: 🔵 COLD LEAD (Nutrición a largo plazo)

3️⃣ ENRUTAMIENTO AUTOMÁTICO
   ├─ HOT: Sistema asigna a Secretaria (llamada en <1h)
   ├─ WARM: Entrada a secuencia de Email/WhatsApp
   └─ COLD: Entra a lista de nutrición (campañas mensuales)

4️⃣ ASIGNACIÓN A VENDEDOR
   Si no está automatizado:
   ├─ Sistema busca disponibilidad de Secretaria
   ├─ Si ocupada: Pone en cola con prioridad
   └─ Notificación: "Nuevo HOT LEAD asignado"
```

---

### Flujo B: SECUENCIAS DE AUTOMATIZACIÓN POR TIPO

```
SECUENCIA HOT LEAD (Convertir en 24-48h):

Día 1 - Hora 0 (Inmediato):
├─ WhatsApp: "Hola [Nombre]! 🎯 Llamamos en 30 min?"
├─ Botón: "SI, LLÁMAME" / "MÁS TARDE"
└─ Secretaria recibe alert con lead sheet

Día 1 - Hora 0.5 (Si no responde):
├─ SMS: "Hola, ¿dónde te llamo?"
└─ Teléfono incluido

Día 1 - Si Secretaria llama:
├─ Presenta opciones de horarios
├─ Envía link de pago
├─ Si paciente agenda → Sistema cierra lead como "CONVERTIDO"
└─ Si paciente rechaza → Pasa a WARM LEAD

---

SECUENCIA WARM LEAD (Nutrición 2-4 semanas):

Día 1-2:
├─ Email: "Información sobre el servicio que te interesa"
└─ Incluye: Fotos before/after, testimonios, video

Día 4:
├─ WhatsApp: "¿Tienes dudas? Estamos aquí para ayudarte 💬"
└─ Link a FAQ

Día 8:
├─ Email: "Promoción especial para ti: 10% desc"
└─ Link de pago directo

Día 15:
├─ WhatsApp: "¿Aún te interesa? Te hemos reservado un slot"
└─ Botón: "Quiero agendar"

Cada 2 semanas (hasta conversión o descalificación):
└─ Cambiar con nueva información/testimonio

---

SECUENCIA COLD LEAD (Nutrición 3-6 meses):

Semanal:
├─ Email: Tip de belleza
└─ Mención casual de servicio

Mensual:
├─ WhatsApp: Nueva promoción
├─ Envío de testimonio de paciente nuevo
└─ "¿Recordamos tu interés en [servicio]?"

Trimestral:
├─ Encuesta: "¿Qué nos falta para ganarte?"
└─ Oferta especial si responde

Objetivo:
└─ Mantener enganche hasta que lead esté listo
```

---

### Flujo C: REGISTRO EN CRM

```
Cada lead se carga en tabla con campos:

┌─ Lead ID: AUTO-GENERADO
├─ Nombre
├─ Email
├─ Teléfono
├─ Servicio Interesado
├─ Fuente: (Web, WhatsApp, Facebook, etc.)
├─ Fecha Captura
├─ Última Interacción
├─ Puntuación: (0-100)
├─ Estado: (PROSPECT / WARM / HOT / CONVERTED / LOST)
├─ Secretaria Asignada
├─ Notas: (Conversación con secretaria)
├─ Próxima Acción
├─ Fecha Próxima Acción
└─ Resultado Final (Si aplica)

VISTA DE SECRETARIA:
┌─ Kanban Board con columnas:
├─ NUEVOS (últimas 24h)
├─ EN SEGUIMIENTO
├─ PENDIENTE PAGO
├─ CONVERTIDO
└─ DESCALIFICADO

Secretaria arrastra leads entre columnas
├─ Automático cuando paciente agenda
├─ Manual cuando ella categoriza
└─ Sistema registra timestamp de cada cambio
```

---

### Métricas de Éxito

- ✅ Tiempo de respuesta a lead < 30 min
- ✅ Tasa de conversión lead → cita: 30%+
- ✅ Tiempo de conversión promedio: 5-7 días
- ✅ Costo por conversión: < $50 USD
- ✅ Tasa de no-show convertidos: < 5%
- ✅ Referencia ROI: Cada lead vale $XXX USD

---

---

## 📈 FLUJO 6: REPORTES Y ANALÍTICA (SPRINT 3-4)

### Descripción
Dashboards automáticos que rastrean KPIs del negocio en tiempo real.

### Dashboards Principales

```
DASHBOARD 1: RESUMEN GERENCIAL

ROW 1 (Métricas Clave):
├─ Ingresos Este Mes: $XXXX (vs meta)
├─ Citas Completadas: XX (vs mes anterior)
├─ Tasa de Conversión: XX% (vs promedio)
└─ Satisfacción Promedio: X.X/5 ⭐

ROW 2 (Gráficos):
├─ Ingresos por mes (último 12 meses)
├─ Citas completadas vs canceladas
├─ Top 3 servicios más vendidos
└─ Satisfacción por doctor

ROW 3 (Alertas):
├─ 🔴 Pago pendiente: $XXXX
├─ 🟡 Confirmación pendiente: 3 citas
├─ 🟢 Meta de mes: 85% cumplida
└─ 🟢 Cliente VIP aniversario hoy

---

DASHBOARD 2: OPERACIONAL (Para Secretaria)

VISTA HOY:
├─ Citas programadas: XX
├─ Citas confirmadas: XX
├─ Leads nuevos: X
├─ Pagos pendientes: X
└─ Mensajes sin responder: X

TAREAS HOY:
├─ ☐ Confirmar citas (recordatorio 24h)
├─ ☐ Seguimiento post-cita
├─ ☐ Llamar a HOT LEADS
└─ ☐ Procesar pagos pendientes

CALENDAR VIEW:
├─ Calendario de citas (por doctor)
├─ Disponibilidades abiertas
├─ Doctores con sobrecarga
└─ Slots recomendados para overbooking

---

DASHBOARD 3: VENDEDOR (Para Carlos)

PERSPECTIVA DE NEGOCIO:
├─ Ingresos Algorith Pro: $XXXX
├─ Ingresos Total Carlos (incluye comisiones): $XXXX
├─ Clientes activos: X
├─ Churn rate: X%
├─ Lifetime Value promedio: $XXXX
└─ Nuevos clientes este mes: X

PROYECCIONES:
├─ Ingresos proyectados próximo mes
├─ Capacidad de escalar
├─ Rentabilidad por cliente
└─ Recomendaciones de crecimiento

REPLICABILIDAD:
├─ Documentación completada: X%
├─ Procesos estandarizados: X%
├─ Tiempo promedio setup: XX días
└─ Costos por cliente: $XXX
```

---

### Flujo A: REPORTES AUTOMÁTICOS POR EMAIL

```
REPORTE DIARIO (Para Secretaria)
Enviado: 18:00 cada día de trabajo

"Resumen del Día - [Fecha]
├─ Citas hoy: 8 completadas
├─ Ingresos hoy: $XXX
├─ Nuevos leads: 2
├─ Pago pendiente: $XXX (de 1 paciente)
└─ Próximo: 3 citas confirmadas mañana"

---

REPORTE SEMANAL (Para Doctora)
Enviado: Viernes 17:00

"Reporte Semanal - Clínica Estética
├─ Citas completadas: 15
├─ Pacientes satisfechos: 14 (93%)
├─ Ingresos: $XXX
├─ Procedimientos por tipo:
│  ├─ Liposucción: 5
│  ├─ Aumento senos: 4
│  └─ Lifting facial: 6
└─ Próxima semana: 12 citas confirmadas"

---

REPORTE MENSUAL (Para Gerencia)
Enviado: 1er día del mes

"Reporte Mensual - [Mes]
├─ RESUMEN EJECUTIVO
│  ├─ Ingresos: $XXXXX (vs meta: XX%)
│  ├─ Citas: XX (+XX% vs mes anterior)
│  ├─ Nuevos pacientes: X
│  ├─ Satisfacción: X.X/5 ⭐
│  └─ Churn: X%
│
├─ ANÁLISIS DETALLADO
│  ├─ Ingresos por servicio
│  ├─ Ingresos por doctor
│  ├─ Tasa de conversión by source
│  └─ Análisis de no-shows
│
├─ OPORTUNIDADES
│  ├─ Servicios con demanda no atendida
│  ├─ Horas pico sin doctores disponibles
│  └─ Clientes con potencial de upsell
│
└─ ACCIONABLES
   ├─ Recomendación 1: ...
   ├─ Recomendación 2: ...
   └─ Recomendación 3: ..."

---

REPORTE CUSTOM
Usuario puede generar reportes ad-hoc:
├─ Rango de fechas customizable
├─ Filtros: Doctor, Servicio, Paciente, Fuente
├─ Formatos: PDF, Excel, Google Sheets
└─ Descarga o envío automático por email
```

---

### Flujo B: TRACKEO DE KPIs EN TIEMPO REAL

```
MÉTRICAS QUE SE ACTUALIZAN CADA HORA:

OPERACIONALES:
├─ Citas hoy: XX
├─ Confirmadas: XX (XX%)
├─ Canceladas: X
├─ No-shows: X
├─ Completadas: XX
└─ Promedio duración: XXmin

COMERCIALES:
├─ Ingresos hoy: $XXX
├─ Ingresos mes: $XXXXX (vs meta)
├─ Ticket promedio: $XXX
├─ Método pago más usado: Stripe (60%)
└─ Proyección mes: $XXXXX

PACIENTES:
├─ Nuevos hoy: X
├─ Activos este mes: XX
├─ Retención 90d: XX%
├─ Churn: X%
├─ NPS Score: X/10

LEADS & CONVERSION:
├─ Nuevos leads hoy: X
├─ Leads en pipeline: XX
├─ Tasa conversión: XX%
├─ Tiempo promedio: X días
└─ Costo por conversión: $XXX

DOCTORES:
├─ Doctor 1: X citas (X% ocupación)
├─ Doctor 2: X citas (X% ocupación)
├─ Doctor 3: X citas (X% ocupación)
└─ Más demandado: Dra. María (95%)

SATISFACCIÓN:
├─ Rating promedio: X.X/5
├─ Promotores (5 estrellas): XX%
├─ Neutros: XX%
├─ Detractores: X%
└─ NPS: XX
```

---

### Métricas de Éxito

- ✅ Reportes generados automáticamente: 100%
- ✅ Precisión de datos: 99.9%
- ✅ Actualización en tiempo real: < 5 min delay
- ✅ Accesibilidad de reportes: 24/7
- ✅ Usuarios activos usando reportes: > 80%

---

---

## 🎯 FLUJO 7: INTEGRACIÓN DE PUBLICIDAD (META ADS) (SPRINT 4)

### Descripción
Conexión automática con campañas de Meta (Facebook/Instagram) para rastreo de ROI y generación de leads.

### Flujo A: SETUP INICIAL DE CONEXIÓN

```
PASO 1: CONEXIÓN GHL ↔ FACEBOOK
├─ John configura en GHL:
│  ├─ Cuenta de Facebook Ads
│  ├─ Pixel de Meta
│  └─ Autorización de API
└─ Sistema vincula cuentas

PASO 2: SINCRONIZACIÓN DE AUDIENCIAS
├─ GHL exporta lista de pacientes a Meta
├─ Meta crea audiencia "Pacientes Clínica"
├─ Permite retargeting a pacientes existentes
└─ Crea "Lookalike Audience" de clientes similares

PASO 3: SEGUIMIENTO DE CONVERSIONES
├─ Meta pixel recibe datos de:
│  ├─ Click en anuncio
│  ├─ Visita a landing page
│  ├─ Clic en "Agendar cita"
│  ├─ Finalización de pago
│  └─ Cita completada
└─ GHL recibe feedback de conversión
```

---

### Flujo B: TIPOS DE CAMPAÑAS

```
CAMPAÑA 1: AWARENESS (Conocimiento)
Objetivo: Llegar a gente que no te conoce
├─ Audiencia: Lookalike de pacientes + intereses relacionados
├─ Creative: Videos de antes/después
├─ Presupuesto: $100-200/mes
├─ Duración: Siempre activa (top-of-funnel)
└─ Métrica: Alcance, impresiones, CPM

---

CAMPAÑA 2: CONSIDERATION (Consideración)
Objetivo: Mostrar servicios específicos a gente interesada
├─ Audiencia: Website visitors, Video viewers, Engagement
├─ Creative: Testimonios + "Cuánto cuesta liposucción?"
├─ Presupuesto: $150-250/mes
├─ Duración: Siempre activa
└─ Métrica: Clics, CTR, Cost per click

---

CAMPAÑA 3: CONVERSION (Conversión)
Objetivo: Llevar a gente al pago directo
├─ Audiencia: High-intent (website visitors + leads)
├─ Creative: "Descuento especial hoy: 20% OFF"
├─ Landing Page: Directa a agendamiento/pago
├─ Presupuesto: $200-400/mes (ajustable)
├─ Duración: Siempre activa
└─ Métrica: Conversiones, ROAS, Cost per conversion

---

CAMPAÑA 4: RETARGETING (Remarketing)
Objetivo: Traer de vuelta a gente que se fue
├─ Audiencia: Pacientes pasados (0-90 días)
├─ Creative: "¿Cómo van tus resultados? Haz tu seguimiento"
├─ Objetivo: Agendar cita de control/upsell
├─ Presupuesto: $100-150/mes
├─ Duración: Siempre activa
└─ Métrica: Reconversión rate, customer lifetime value

---

CAMPAÑA 5: SEASONAL/PROMOCIONAL
Objetivo: Aprovechar momentos específicos
├─ Periodos: Navidad, Verano, Día de la Mujer, etc.
├─ Creative: "¡Regálate belleza!" / "Especial Verano 40% OFF"
├─ Audiencia: Todos en ubicación local
├─ Presupuesto: $300-500 (temporal)
├─ Duración: 2-4 semanas
└─ Métrica: Peak conversions, revenue generated
```

---

### Flujo C: ATRIBUCIÓN Y ROI

```
CADA CONVERSIÓN REGISTRA:

Lead Completo:
├─ Nombre del paciente
├─ Fuente de lead: "Facebook Ad - Campaign X"
├─ Anuncio específico que hizo click
├─ Fecha/hora del click
├─ Página de destino
├─ Tiempo en página
└─ Dispositivo (mobile/desktop)

SEGUIMIENTO POST-CITA:
├─ ¿Agendó cita?
│  ├─ Cuánto tardó (1h, 1d, 3d)
│  ├─ Cita confirmada?
│  └─ Cita completada?
├─ Monto pagado
├─ Satisfacción (rating)
└─ Servicios adicionales adquiridos

CÁLCULO DE ROI:
Para cada campaña:
├─ Ingresos generados: $XXX (todas las citas de leads de esta campaña)
├─ Costo de campaña: $XXX
├─ ROI: (Ingresos - Costo) / Costo × 100 = XX%
├─ ROAS: Ingresos / Costo = X:1 (por cada $1 gastado, $X generado)
├─ CAC (Cost Acquisition): Costo / Clientes = $XXX
└─ LTV (Lifetime Value): Ingresos totales del cliente

DASHBOARD DE CAMPAÑAS:
Tabla con columnas:
├─ Nombre Campaña
├─ Presupuesto Gastado
├─ Clics
├─ Leads Generados
├─ Citas Agendadas
├─ Citas Completadas
├─ Ingresos Generados
├─ ROI %
└─ ROAS

Carlos puede ver:
"Campaña 'Liposucción Verano' gastó $200, generó $3,000 = 15x ROAS"
```

---

### Flujo D: OPTIMIZACIÓN AUTOMÁTICA

```
CADA SEMANA, SISTEMA ANALIZA:

├─ Qué anuncio tiene mejor CTR
├─ Qué audiencia convierte mejor
├─ Qué horario tiene más conversiones
├─ Qué dispositivo (mobile vs desktop)
├─ Qué tipo de creative (video vs imagen)

ACCIONES AUTOMÁTICAS:
├─ Aumenta presupuesto de campañas con ROAS > 5x
├─ Reduce presupuesto de ROAS < 2x
├─ Pausa anuncios con CTR muy bajo
├─ Duplica anuncio ganador con variaciones
└─ Notifica a Carlos: "Campaña X tiene ROI 20x, aumentamos presupuesto"

RECOMENDACIONES MANUALES:
├─ "Prueba anuncio dirigido a [edad] que muestra [servicio]"
├─ "Esta audiencia convierte a $XXX por lead, muy rentable"
├─ "Anuncio antiguo tiene 40% menos ROI, considera pausarlo"
└─ "Oportunidad: horario de 14-16h tiene 3x mejor conversión"
```

---

### Métricas de Éxito

- ✅ ROAS promedio: > 5:1
- ✅ CAC: < 30% del ticket promedio
- ✅ Conversión de click → cita: > 15%
- ✅ Conversión de cita → pago: > 90%
- ✅ Attribution accuracy: 100% (sin leads perdidos)
- ✅ Presupuesto optimizado: Máximo ROAS mes a mes

---

---

## 📋 RESUMEN DE FLUJOS POR SPRINT

### SPRINT 1 (Semanas 1-2): Foundation
- ✅ Flujo 1: Agendamiento de Citas (100%)
- ✅ Flujo 2: Gestión de Historiales (100%)
- **Entregable:** Sistema de agendamiento + BD de pacientes funcionando
- **Demo:** Doctora ve cómo funcionan reservas y puede agendar paciente test

### SPRINT 2 (Semanas 3-4): Communication
- ✅ Flujo 3: Comunicación Multi-canal (100%)
- **Entregable:** WhatsApp + Email automatizado funcionando
- **Demo:** Doctora recibe notificaciones de prueba, responde a mensajes

### SPRINT 3 (Semanas 5-6): Commerce
- ✅ Flujo 4: Pagos y Facturación (100%)
- ✅ Flujo 5: Pipeline de Leads (100%)
- ✅ Flujo 6: Reportes y Analítica (50%)
- **Entregable:** Pagos funcionando, leads en pipeline, dashboard básico
- **Demo:** Se ejecuta pago test, facturas se generan automáticamente

### SPRINT 4 (Semana 7): Scale
- ✅ Flujo 6: Reportes y Analítica (100%)
- ✅ Flujo 7: Meta Ads Integration (100%)
- **Entregable:** Sistema completo con analítica + Meta Ads
- **Demo:** Dashboard muestra ROI de campañas

---

## 🎯 PRÓXIMOS PASOS

1. ✅ **Definición de Flujos:** COMPLETADA (Este documento)
2. [ ] **Crear PDR Detallado:** Especificaciones técnicas por flujo
3. [ ] **Iniciar SPRINT 1:** Agendamiento + Historiales
4. [ ] **Feedback de Carlos:** Validar si faltan detalles
5. [ ] **Documentación de Procesos:** Para replicabilidad futura

---

**Documento Preparado:** 13 de agosto de 2026  
**Versión:** 1.0 - FLUJOS DEFINIDOS  
**Responsable:** Claude Code + Equipo  
**Estado:** 🟢 Listo para desarrollo  
**Próxima Etapa:** Product Definition Requirements (PDR)
