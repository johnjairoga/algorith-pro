# GUÍA DE DEMOSTRACIÓN - REUNIÓN ONBOARDING
**Objetivo:** Presentar solución de forma clara, creíble y convincente  
**Duración Total:** 3 horas  
**Esta sección:** 30-45 minutos de demo técnica  
**Audience:** Carlos Perlaza + Doctora + Secretarias (si asisten)

---

## 📋 ESTRUCTURA DE PRESENTACIÓN

**Tiempo Total: 3 horas**

| Fase | Tiempo | Responsable | Qué hace |
|------|--------|-------------|----------|
| Intro + Agenda | 10 min | John | Explica estructura reunión |
| Visión y Casos de Éxito | 20 min | John | Muestra resultados de casos similares |
| **DEMO TÉCNICA** | **30-45 min** | **John** | **Ver abajo** |
| Q&A Técnicas | 15 min | John | Responde preguntas |
| Requerimientos Detallados | 30 min | John + Carlos | Completa PREGUNTAS_TECNICAS_ONBOARDING.md |
| Cronograma Detallado | 15 min | John | Hitos semana por semana |
| Próximos Pasos | 10 min | John | Acciones para John y Carlos |

---

## 🎯 DEMO TÉCNICA (30-45 minutos)

### PUNTO DE VISTA DEL PACIENTE
**Tiempo: 10-15 minutos**

**Objetivo:** Mostrar experience del paciente desde el inicio

#### Paso 1: Captura de Lead (3 min)

**Escenario:** "Una mujer ve un anuncio en Facebook y le interesa liposucción"

```
MOSTRAR EN PANTALLA:
├─ Anuncio de Facebook (mock)
├─ Clic → Lleva a landing page
│  └─ Landing mostrando servicios de liposucción
│      ├─ Fotos antes/después
│      ├─ Testimonios
│      └─ Botón: "RESERVAR CONSULTA"
├─ Click en botón → Formulario aparecer
│  └─ Preguntas:
│      ├─ ¿Cuál es tu nombre?
│      ├─ ¿Tu teléfono?
│      ├─ ¿Tu email?
│      ├─ ¿Cuándo te gustaría venir?
│      └─ [SUBMIT] → Contacto capturado en GHL
└─ Confirmación visual: "¡Hemos recibido tu solicitud!"
```

**Narración:** "El lead es capturado automáticamente en nuestro sistema sin que Carlos o la secretaria tengan que hacer nada."

---

#### Paso 2: Agendamiento Online (4 min)

**Escenario:** "Paciente procede a agendar la cita"

```
MOSTRAR EN PANTALLA:
├─ Página de agendamiento
│  ├─ "¿Qué servicio quieres?"
│  │  └─ Dropdown: [Liposucción abdomen ✓]
│  ├─ "¿Cuál doctor prefieres?"
│  │  └─ Opciones: [Dra. María] [Dra. Ana]
│  │     (Con foto y especialidad)
│  ├─ "¿Cuándo?"
│  │  └─ Calendario mostrando disponibilidad en tiempo real
│  │     ├─ Verde = disponible
│  │     ├─ Rojo = ocupado
│  │     └─ Hora seleccionada: Miércoles 10:00 AM
│  └─ "Precio: $5,000 MXN"
│     ├─ Opción A: "Pagar 100% ahora"
│     ├─ Opción B: "Anticipo $2,500 hoy, resto el día de cita"
│     └─ Selecciona → Botón "PAGAR"
└─ Redirecciona a Stripe
   └─ Procesa pago
      └─ Confirmación: "¡Cita confirmada!"
```

**Lo importante a resaltar:**
- No hay intermediarios
- Paciente puede ver disponibilidad real
- Pago inmediato (reducimos no-shows)
- Confirmación automática

---

#### Paso 3: Mensajes Automáticos al Paciente (2-3 min)

**Escenario:** "El sistema contacta automáticamente al paciente"

```
MOSTRAR EN PANTALLA (Timeline):

5 MINUTOS después de pago:
├─ WhatsApp: ✅ "¡Hola María! Tu cita está confirmada
│  📅 Miércoles 16 Ago - 10:00 AM
│  🏥 Con Dra. María
│  📍 Calle Principal 123
│  💬 Si necesitas cambiar, responde aquí"

24 HORAS ANTES:
├─ WhatsApp: 📅 "¡Mañana es tu cita!
│  Confirm que irás: [SÍ] [NO]"
│
├─ Email: "Tu cita de mañana + instrucciones pre-cita"
│  ├─ Qué traer
│  ├─ Qué evitar antes
│  ├─ Horarios de apertura
│  └─ Link si necesita reprogramar

2 HORAS ANTES:
├─ WhatsApp: "⏰ En 2 horas es tu cita
│  Llega 10 min antes. ¿Necesitas algo?"
```

**Lo importante:**
- Todo automático (0 trabajo manual)
- Reduce no-shows masivamente
- Paciente se siente cuidado

---

### PUNTO DE VISTA DE LA SECRETARIA
**Tiempo: 8-10 minutos**

**Objetivo:** Mostrar que la secretaria tiene visibilidad completa pero sin sobrecarga

#### Paso 1: Dashboard Secretaria (3 min)

```
MOSTRAR EN PANTALLA:

┌─ DASHBOARD SECRETARIA
├─ HOY (Miércoles 16 agosto)
│  ├─ 📅 Citas programadas: 8
│  ├─ ✅ Confirmadas: 7/8
│  ├─ ⏳ Esperando confirmación: 1
│  ├─ 📞 Leads nuevos: 3
│  └─ 💰 Ingresos esperados hoy: $35,000 MXN
│
├─ VISTA DE CITAS (Kanban/Lista)
│  ├─ María López
│  │  ├─ Servicio: Liposucción abdomen
│  │  ├─ Hora: 10:00 AM
│  │  ├─ Doctor: Dra. María
│  │  ├─ Estado: ✅ Confirmada (pagó)
│  │  └─ [Botón] "Ver Historial Completo"
│  ├─ Carmen Rodríguez
│  │  ├─ ...
│  │  └─ Estado: ⏳ Pagó pero NO confirmó
│  │     [Secretaria puede: LLAMAR / WHATSAPP / EMAIL]
│  └─ [3 más...]
│
└─ TAREAS HOY
   ├─ ☐ Confirmar 1 cita pendiente
   ├─ ☐ Seguimiento de 2 leads nuevos
   └─ ☐ Procesar 1 pago que quedó pendiente
```

**Narración:** "La secretaria ve en 10 segundos qué pasa hoy. Solo las cosas que necesitan atención aparecen."

---

#### Paso 2: Gestión de Historiales (3 min)

```
MOSTRAR EN PANTALLA:

CLICK en "María López" → Se abre historial completo

┌─ HISTORIAL DE PACIENTE
├─ INFORMACIÓN PERSONAL
│  ├─ Nombre: María López
│  ├─ Teléfono: 5551234567
│  ├─ Email: maria@email.com
│  ├─ Cumpleaños: 15 de mayo (próximo: 12 días)
│  └─ Notas especiales: "Alérgica a silicona"
│
├─ HISTORIAL MÉDICO
│  ├─ Alergias: Silicona, Penicilina
│  ├─ Medicamentos: Anticonceptivos
│  ├─ Cirugías previas: Apendicectomía (2010)
│  └─ Condiciones: Diabetes tipo 2
│
├─ HISTORIAL DE CITAS
│  ├─ Hoy: Liposucción abdomen (10:00)
│  ├─ Hace 3 meses: Consulta inicial
│  └─ [Ver historial completo]
│
├─ HISTORIAL DE PAGOS
│  ├─ Hoy: $5,000 (Liposucción) - PAGADO
│  ├─ Hace 3 meses: $300 (Consulta) - PAGADO
│  └─ Total gastado en clínica: $5,300
│
└─ NOTAS POST-CITA (de cita anterior)
   ├─ "Paciente satisfecha con consulta"
   ├─ "Recomendó procedimiento completo"
   ├─ "Próxima cita: Liposucción (hoy)"
   └─ "Seguimiento post-op: 1 semana"
```

**Lo importante:**
- Doctor ve TODO lo que necesita ANTES de la cita
- Cero fricción (no busca papeles)
- Seguridad (alergias visibles arriba)

---

#### Paso 3: Automatizaciones en Tiempo Real (2 min)

```
MOSTRAR EN PANTALLA:

EVENTO: Paciente responde "NO" al recordatorio 24h antes

TIMELINE DE LO QUE PASA AUTOMÁTICAMENTE:

├─ 10:05 AM - Paciente responde "NO puedo ir"
│
├─ 10:06 AM - AUTOMÁTICO:
│  ├─ Sistema detecta "NO"
│  ├─ Envia opciones: "¿Deseas reprogramar?"
│  │  └─ [Semana siguiente] [Semana +2] [Más opciones]
│  ├─ Notificación a Secretaria:
│  │  "🚨 María López no puede ir. Respondió a automatización"
│  ├─ Hora se libera en calendario
│  └─ Ofertas para otro paciente en standby
│
└─ 10:07 AM - Secretaria ve en Dashboard
   └─ Acción requerida: "Llamar a María o procesarla en pipeline de reactivación"
```

**Narración:** "Cuando el paciente no puede ir, el sistema lo detecta inmediatamente. La secretaria solo maneja excepciones, no rutina."

---

### PUNTO DE VISTA DEL DOCTOR
**Tiempo: 5-8 minutos**

**Objetivo:** Mostrar que el doctor tiene tiempo para ver al paciente, no papeles

#### Paso 1: Vista Pre-Cita (3 min)

```
MOSTRAR EN PANTALLA:

Doctor abre su calendario 30 min antes de cita:

┌─ CALENDARIO DOCTOR
├─ HOY - 10:00 AM: María López - Liposucción abdomen
│  └─ [CLICK para expandir]
│     ├─ ✅ Paciente confirmó
│     ├─ ✅ Pagó $5,000
│     ├─ ✅ Completó formulario pre-cita
│     │
│     ├─ 📄 INFORMACIÓN CRÍTICA
│     │  ├─ Edad: 38 años
│     │  ├─ Alergias: ⚠️ Silicona, Penicilina
│     │  ├─ Medicamentos: Anticonceptivos
│     │  ├─ Cirugías previas: Sí (Apendicectomía)
│     │  └─ Diagnóstico: Diabetes tipo 2
│     │
│     ├─ 💭 NOTAS DE CONSULTA ANTERIOR
│     │  ├─ "Paciente quiere abdomen plano"
│     │  ├─ "Presupuesto: $5K confirmado"
│     │  ├─ "Expectativas: moderadas, realistas"
│     │  └─ "Candidata ideal para liposucción"
│     │
│     └─ 🎯 PLAN SUGERIDO
│        ├─ Área: Abdomen + flancos
│        ├─ Duración: ~90 minutos
│        └─ Anestesia: Tumescente local
│
├─ 10:30 AM: Otro paciente...
└─ [...resto de citas]
```

**Lo importante:**
- Todo en 1 pantalla
- No hay sorpresas médicas
- Doctora se prepara mejor

---

#### Paso 2: Notas Post-Cita (2 min)

```
MOSTRAR EN PANTALLA:

Después de cita, doctor abre nota post-cita:

┌─ REGISTRO POST-CITA
├─ Procedimiento: Liposucción abdomen + flancos
├─ Duración: 95 minutos
├─ Anestesia: Tumescente local
├─ Complicaciones: Ninguna
├─ Técnica: VASER Ultrasound
├─ Peso extraído: 2.3 kg
├─ Observaciones: "Excelentes resultados, muy satifecha"
│
├─ INSTRUCCIONES POST-OP (pre-generadas)
│  ├─ No dúchas por 48h
│  ├─ Usar faja compresiva 24/7 por 2 semanas
│  ├─ Tomar antibiótico cada 8h
│  ├─ Evitar actividad pesada por 1 mes
│  └─ Próxima cita: 1 semana para revisión
│
└─ [GUARDAR]
   └─ AUTOMÁTICO:
      ├─ Instrucciones se envían a paciente (WhatsApp + Email)
      ├─ Cita de revisión se agenda automáticamente
      ├─ Recordatorio se crea para secretaria
      └─ Paciente recibe follow-ups automáticos (24h, 3d, 1sem)
```

**Lo importante:**
- Médico dicta, sistema documenta
- Cero carga administrativa para doctor
- Auditoría completa para regulaciones

---

### VISTA DE INGRESOS/ROI
**Tiempo: 3-5 minutos**

**Objetivo:** Mostrar dinero que genera

```
MOSTRAR EN PANTALLA:

┌─ DASHBOARD DE INGRESOS
├─ HOY (Miércoles)
│  ├─ Citas completadas: 6
│  ├─ Ingresos: $28,500 MXN
│  ├─ Ticket promedio: $4,750
│  └─ Conversión: 7 leads → 6 citas (86%)
│
├─ ESTA SEMANA
│  ├─ Citas: 28
│  ├─ Ingresos: $140,000 MXN
│  └─ vs Semana anterior: +25% 📈
│
├─ ESTE MES (Proyectado)
│  ├─ Citas proyectadas: 120
│  ├─ Ingresos proyectados: $600,000 MXN
│  └─ vs Meta del mes: 95% cumplida
│
└─ POR SERVICIO
   ├─ Liposucción: $240,000 (40%)
   ├─ Aumento senos: $180,000 (30%)
   ├─ Láser: $90,000 (15%)
   └─ Otros: $90,000 (15%)
```

**Narración:** "Cada paciente que ve en el calendario es dinero confirmado. No hay sorpresas de no-shows."

---

## 🎬 FLUJO COMPLETO EN 2 MINUTOS (Video Demo)

**Opcional: Si tienes tiempo, muestra video corto (2 min) de:**

```
Video Demo: "De Lead a Pago en 3 horas"

┌─ 00:00 - Paciente ve anuncio en Instagram
├─ 00:10 - Click lleva a landing page
├─ 00:25 - Llena formulario (15 seg)
├─ 00:35 - Selecciona fecha/hora (10 seg)
├─ 00:45 - Paga $5,000 (10 seg)
├─ 00:55 - Recibe confirmación WhatsApp
├─ 01:15 - Secretaria ve cita en dashboard (automático)
├─ 01:30 - Doctor ve historial pre-cita
├─ 01:45 - Paciente recibe recordatorio 24h antes
└─ 02:00 - "¡Y el ciclo completo fue SIN intervención manual!"
```

---

## 🚨 OBJECCIONES COMUNES (Prepararse)

### Objeción 1: "¿Es muy complicado?"

**Respuesta:**
"Para Carlos y la secretaria NO. Ellas solo ven lo importante.  
El 80% es automático. Los doctores solo ven el historial del paciente, nada de papeles."

**Demo:** Muestra dashboard secretaria en 30 segundos

---

### Objeción 2: "¿Qué pasa si WhatsApp no funciona?"

**Respuesta:**
"Tenemos backup automático: si WhatsApp falla, enviamos Email + SMS.  
El paciente siempre recibe el mensaje."

**Demo:** Muestra flujo de automaciones con múltiples canales

---

### Objeción 3: "¿Dónde quedan los datos?"

**Respuesta:**
"Todo en Go High Level, que es el CRM estándar de toda Latinoamérica.  
Encriptado, con backups automáticos, LGPD compliant.  
Los datos son TUYOS - puedes exportar en cualquier momento."

**Demo:** Muestra opción de "Exportar a CSV"

---

### Objeción 4: "¿Cuánto cuesta?

**Respuesta:**
"$2,500 USD setup (ya están los primeros $1,250).  
Después: $500 USD/mes o $300 + 10% de ingresos adicionales.  
En este caso, con $600K/mes de ingresos proyectados, la opción híbrida es mejor: $300 + $60K = $60,300 pesos/mes (9% del aumento)."

---

## 📸 PANTALLAZOS CLAVE (Capturar ANTES de reunión)

Tienes que tener screenshots listos:

- [ ] Landing page con formulario
- [ ] Proceso de agendamiento (3 pasos)
- [ ] Stripe checkout
- [ ] Dashboard secretaria (hoy)
- [ ] Historial de paciente (ejemplo)
- [ ] Recordatorio WhatsApp
- [ ] Mensaje de confirmación Email
- [ ] Calendario doctor
- [ ] Dashboard de ingresos
- [ ] Automatizaciones lista

**Guardar en:** `Carlos Perlaza/DEMO_SCREENSHOTS/`

---

## ⏱️ TIMING CONTROL

**Durante la demo:**

```
Min 0-2:   Intro + contexto
Min 2-7:   Vista del paciente (captura + agendamiento)
Min 7-12:  Mensajes automáticos
Min 12-20: Dashboard secretaria
Min 20-25: Historial paciente
Min 25-32: Vista doctor (pre + post cita)
Min 32-37: Dashboard ingresos
Min 37-42: Q&A / Objeciones
Min 42-45: Cierre + próximos pasos

TOTAL: 45 minutos
```

**Señales de timing:**
- Si te atrasas: Salta a "Video Demo 2 min"
- Si tienes mucho tiempo: Ve más profundo en historiales

---

## 🎯 MENSAJES CLAVE A DEJAR

**Al terminar la demo, Carlos debe pensar:**

1. ✅ "Este sistema es para MI pacientes, no para tecno-nerds"
2. ✅ "La secretaria va a trabajar menos, no más"
3. ✅ "Los doctores van a ver más y ver mejor"
4. ✅ "El dinero se confirma antes de la cita"
5. ✅ "Los pacientes quedan más felices"
6. ✅ "Yo (Carlos) entiendo la 'magia' que hace"
7. ✅ "John sabe de técnica, puedo confiar en él"

---

## 📝 NOTAS DURANTE DEMO

**Espacio para tomar notas:**

```
Preguntas de Carlos:
- 

Reacciones de Doctora:
- 

Preocupaciones expresadas:
- 

Puntos donde necesita más claridad:
- 

Ideas suyas que surgieron:
- 
```

---

**Documento Preparado:** 14 de agosto de 2026  
**Para:** Reunión Onboarding - 16 de agosto  
**Tiempo:** Practica esta demo 1-2 veces antes de la reunión  
**Duración recomendada:** 35-45 minutos
