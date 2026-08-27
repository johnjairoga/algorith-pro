# PREGUNTAS TÉCNICAS PARA ONBOARDING - CARLOS PERLAZA
**Objetivo:** Extraer información crítica que no está en documentación para implementación exitosa  
**Fecha:** 14 de agosto de 2026  
**Reunión:** Miércoles 16 de agosto, 9:00 AM (Hora México)  
**Duración:** ~45-60 minutos para esta sección

---

## 📋 GUÍA DE USO

- **Prioridad 🔴**: Respuestas son BLOQUEANTES para empezar construcción
- **Prioridad 🟡**: Respuestas optimizan la implementación
- **Prioridad 🟢**: Respuestas mejoran UX/adicionales

Toma notas directamente en este documento durante la reunión.

---

## 🔴 PREGUNTAS CRÍTICAS (BLOQUEANTES)

### SECCIÓN 1: ESTRUCTURA DE DOCTORES Y EQUIPOS

**P1.1** - ¿Cuántos doctores tiene la clínica actualmente?
- [ ] 1-2 doctors (pequeño)
- [ ] 3-5 doctors (mediano)
- [ ] 6+ doctors (grande)

**Nota:** Impacta arquitectura de calendarios y asignación de recursos

⚠️ **INFORMACIÓN CONTRADICTORIA — Confirmar con Carlos:**
- Llamada de fechamento: "los doctores de fijo son... cinco... hasta cuatro"
- Llamada de onboarding (más reciente/directa): La doctora dice "somos una clínica de tres doctores" y "muy difícilmente necesitemos más doctores", pero agrega "a veces vienen otros"
- **Acción:** Preguntar el miércoles en reunión — aclarar si son 3 ó 4-5 doctores fijos, y cuántos volantes/ocasionales

---

**P1.2** - ¿Los doctores son fijos o volantes (se habilitan/deshabilitan)?
- [ ] Todos fijos (siempre disponibles)
- [x] Algunos volantes (varían por mes) ← ✅ RESPONDIDO
- [ ] Muy variable (cambia cada semana)

**Respuesta esperada:** Nos dice si necesitamos sistema dinámico de habilitación/deshabilitación en GHL

✅ **RESPONDIDO (Llamada de fechamento y onboarding):**
- Mayormente doctores fijos, pero con **doctores volantes ocasionales** que se deben poder **habilitar/deshabilitar dinámicamente** sin complicación
- Sistema debe escalar: "si funciona para uno, funciona para todos" → Arquitectura pensada para múltiples doctores desde el inicio
- Doctora: "muy difícilmente necesitemos más doctores, pero a veces vienen otros"

**Preguntas de seguimiento:**
- ¿Cuántos doctores nuevos espera agregar en próximos 6 meses? → ❓ Pendiente
- ¿Hay doctores que comparten especialidades? (ej: 2 cirujanos plásticos) → ❓ Pendiente

---

**P1.3** - ¿Qué especialidades ofrece cada doctor? (Listar por doctor)

**Formato esperado:**
```
Dra. María: Cirugía Plástica, Liposucción
Dr. Carlos: Trasplante de Cabello, Implantología
Dra. Ana: Láser, Tratamientos Faciales
...
```

**Nota:** Define cómo categorizar servicios en el sistema

❓ **PENDIENTE — Preguntar a Carlos:**
- No se detalla en ninguna llamada
- **CRÍTICO:** Se necesita nombre, especialidades Y datos de contacto (email/teléfono) de cada doctor (fijo y volante) para dar de alta en GHL
- **Tabla a llenar en reunión:**

| Nombre Completo | Especialidades | Email | Teléfono | Tipo (Fijo/Volante) |
|---|---|---|---|---|
| | | | | |
| | | | | |
| | | | | |

---

**P1.4** - ¿Hay secretarias? ¿Cuántas y cuáles son sus responsabilidades?

**Preguntas de seguimiento:**
- [ ] Una secretaria maneja todo
- [ ] Una por doctor
- [x] Una maneja agendamiento, otra pagos ← ✅ RESPONDIDO (Parcial)
- [ ] Otra configuración: ______

**Importante:** Afecta permisos en GHL y automatizaciones

✅ **RESPONDIDO (Llamada de onboarding):**
- Existen **3 secretarias** en la clínica
- La conexión de WhatsApp y configuración técnica con las secretarias se coordinará en una **reunión aparte** (no está definida la fecha aún)
- Por ahora, John manejará la integración técnica

❓ **PENDIENTE — Preguntar a Carlos:**
- **Nombres de las 3 secretarias + email + teléfono** de cada una (necesario para acceso y coordinación en GHL)

| Nombre Completo | Responsabilidad Principal | Email | Teléfono |
|---|---|---|---|
| | | | |
| | | | |
| | | | |

---

### SECCIÓN 2: SERVICIOS Y PRECIOS

**P2.1** - Listar todos los servicios con estructura de precios

**Tabla esperada:**
| Servicio | Precio MXN | Duración (min) | Doctor(es) | Notas |
|----------|------------|---|---|---|
| Liposucción abdomen | 5,000 | 90 | Dra. María | Requiere análisis |
| Aumento senos | 8,000 | 120 | Dra. María | Dos opciones: 300cc o 400cc |
| Consulta inicial | 300 | 30 | Todos | Aplicable al servicio |
| ... | ... | ... | ... | ... |

**Nota:** Esta información es crítica para:
- Mostrar en agendamiento
- Calcular ticket promedio
- Configurar pagos (anticipo vs total)

❓ **PENDIENTE — Preguntar a Carlos:**
- No se proporcionan precios específicos de servicios en ninguna llamada
- La clínica tiene **"muchos servicios"** de estética, dermatología, cirugía plástica y **aparatología** (identificados como área de mayor margen de ganancia)
- Se mencionan tipos de servicios: consulta inicial, procedimientos quirúrgicos, tratamientos con láser, aparatología — pero SIN precios unitarios
- **Se necesita tabla completa actualizada**

---

**P2.2** - ¿Cómo maneja los precios?

- [x] Precio fijo por servicio ← (Parcial, necesita confirmación)
- [ ] Precio + variables (ej: liposucción = $100/área adicional)
- [ ] Presupuesto a medida (tras consulta)
- [x] Paquetes (ej: "Combo Bodysculpt" = 3 servicios descuento) ← ✅ MENCIONADO

**Preguntas de seguimiento si no es fijo:**
- ¿El paciente sabe el precio antes o después de la consulta?
- ¿El sistema debe permitir cotizaciones personalizadas?
- ¿Se pueden combinar servicios?

✅ **RESPONDIDO (Parcial - Llamada de onboarding):**
- Ofrecen **"paquete o sesión individual"** (pacientes pueden elegir)
- **Aparatología** es el principal generador de ingresos ("muchísimos" aparatos caros)
- Se sugiere dirigir campañas/anuncios a servicios/aparatos específicos con **margen mayor**
- Pero estructura de precios exacta: ❓ Pendiente

---

**P2.3** - ¿Estructura de pagos? (Anticipo vs Total)

- [ ] Pago 100% antes de cita
- [x] Anticipo OBLIGATORIO (monto por definir) ← ✅ RESPONDIDO
- [ ] Anticipo 50%, resto después de consulta
- [ ] Variable según servicio: ______

**Preguntas de seguimiento:**
- Si es variable, ¿cuál es la lógica? (ej: cirugías = 50%, consulta = pago total)
- ¿Acepta pagos incompletos? (ej: paciente paga 50%, resta es deuda)
- ¿Cuáles métodos de pago tienes integrados actualmente?

✅ **RESPONDIDO (Llamada de onboarding):**
- La doctora **quiere pago/anticipo obligatorio** antes de la cita para **reducir no-shows**
- Justificación: procedimientos que reservan quirófano/equipo exclusivo representan un costo fijo
- Monto exacto del anticipo: ❓ **Pendiente** (John sugirió: "confirmación de consulta + link de pago" pero sin monto específico)
- Intención es: **"si te falta al quirófano, ya perdí el slot y el costo del equipo"**

---

### SECCIÓN 3: INFORMACIÓN TÉCNICA EXISTENTE

**P3.1** - Hosting y Dominio actual

- [ ] ¿Dónde está alojado el sitio web actual? (Godaddy, Namecheap, AWS, otro)
- [ ] ¿Quién es registrante del dominio?
- [ ] ¿Tiene acceso admin a hosting?
- [ ] ¿Email empresarial actual? (ej: info@clinica.com.mx)
- [ ] ¿Existe SSL certificate actualmente?

**Nota:** Nos dice si migramos o creamos nuevo

✅ **RESPONDIDO (Parcial - Llamada de onboarding):**
- La clínica **ya tiene dominio y DNS propios**
- Dominio se migrará después, cuando esté listo el nuevo sistema (cambio de DNS apunta a nueva infraestructura)
- Sitio web actual seguirá activo hasta migración
- Detalles de hosting/SSL/registro: ❓ **Pendiente**

---

**P3.2** - ¿Existe base de datos de pacientes actual?

- [x] Excel/Google Sheets ← ✅ RESPONDIDO
- [ ] Sistema CRM anterior
- [ ] WhatsApp groups (no centralizado)
- [ ] No existe, partimos de cero

**Si existe:**
- ¿Cuántos pacientes están registrados?
- ¿Qué datos capturan? (nombre, email, teléfono, servicios, historial, etc.)
- ¿Puedes exportar en CSV?

✅ **RESPONDIDO (Llamada de onboarding):**
- **Historial clínico se lleva en Word** (no centralizado)
- **Contactos/pacientes están en Excel** (no automatizado)
- **No tienen CRM actual**
- Doctora confirmó: "podemos dar un Excel" con contactos existentes
- **Plan:** Importar contactos existentes al nuevo sistema durante configuración ("importar contactos actuales")

---

**P3.3** - Acceso a Go High Level

- [ ] ¿Ya tienen cuenta GHL?
- [ ] ¿Alguien tiene acceso admin?
- [ ] ¿Cuál plan tienen? (Starter, Agency, Custom)

**Si tienen:**
- Vamos a migrar datos o partir fresco?

✅ **RESPONDIDO (Llamada de fechamento):**
- Carlos **NO tiene cuenta propia de GHL hoy**
- Usó "Ninja Suite" (división de GHL para agencias) antes, en cursos
- **Quiere cuenta GHL independiente** (para poder ser agencia en el futuro y replicar con otros clientes)
- **Decisión:** Se construye dentro de la cuenta de John, exportable gratis dentro de los primeros 3 meses
- Nueva cuenta GHL será independiente para Carlos después

---

### SECCIÓN 4: INTEGRACIÓN DE PAGOS

**P4.1** - Métodos de pago que QUIEREN soportar

**Prioridad:**
- [x] 1️⃣ Stripe (tarjeta crédito/débito) ← ✅ ÚNICO MÉTODO ELEGIDO
- [ ] 1️⃣ Transferencia bancaria local
- [ ] 2️⃣ PagSeguro
- [ ] 2️⃣ Efectivo en clínica (manual)
- [ ] 3️⃣ Otro: ______

**Nota:** Determina integraciones a configurar

✅ **RESPONDIDO (Llamada de onboarding):**
- **Solo Stripe** será método de pago integrado
- PagSeguro y Mercado Pago fueron **explícitamente descartados**
- Efectivo/transferencias manuales: no aplican
- Stripe maneja tarjeta crédito/débito en México sin problema

---

**P4.2** - Información bancaria para transferencias

Si acepta transferencia bancaria:
- [ ] ¿Cuál banco? (BBVA, Santander, Banamex, etc.)
- [ ] ¿Está integrado con Stripe/PagSeguro o manual?
- [ ] ¿Generan comprobante automático o verifica el humano?

✅ **RESPONDIDO (Llamada de onboarding):**
- **No aplica** — Solo Stripe, sin transferencias bancarias manuales
- Todo pago se hace a través de Stripe (tarjeta crédito/débito)
- Los comprobantes se generan automáticamente desde Stripe

---

### SECCIÓN 5: CANALES DE COMUNICACIÓN

**P5.1** - WhatsApp Business

- [ ] ¿Ya tiene WhatsApp Business API configurado?
- [ ] ¿Tiene número específico para negocio o usa personal?
- [ ] ¿A quién llegan los mensajes? (Secretaria, todos los doctors, app)

**Nota:** Crítico porque es tu canal 🔴 prioritario

✅ **RESPONDIDO (Llamada de onboarding):**
- Clínica tiene **3 números de WhatsApp activos** actualmente
- Usan **WhatsApp Business** (sin API oficial, sin automatización)
- **Plan acordado:**
  - **1 número** se configura con **API oficial** para recordatorios automáticos
  - **Los otros 2 números** quedan de **atención manual/directa** por ahora
  - Según volumen, todos pueden migrar a API oficial después
- Coordinación con secretarias: reunión aparte (fecha por definir)

---

**P5.2** - Email automático

- [ ] ¿Email de dominio o Gmail?
- [x] ✅ Se creará email nuevo (Decisión tomada)
- [ ] ¿Usan plantillas de email actualmente?

✅ **RESPONDIDO (Decisión en Llamada de onboarding):**
- Se **creará un Gmail nuevo** para centralizar accesos y credenciales
- Esto evita depender de email personal de alguien
- John y Carlos manejarán los accesos inicialmente
- Se crea **documento de credenciales compartido** (Word protegido) para guardar contraseñas, tokens, etc.

---

**P5.3** - SMS (¿necesario?)

- [ ] Prioritario (backup de WhatsApp)
- [ ] Opcional (solo para recordatorios críticos)
- [x] No necesario ← ✅ RESPONDIDO

**Nota:** SMS es caro, pero es backup bueno si WhatsApp falla

✅ **RESPONDIDO (Llamada de onboarding - Carlos):**
- **SMS no se necesita** en México
- "De la frontera para abajo, nadie usa SMS"
- WhatsApp es el canal predominante

---

## 🟡 PREGUNTAS DE OPTIMIZACIÓN (IMPORTANTES)

### SECCIÓN 6: FLUJO DE AGENDAMIENTO

**P6.1** - Horarios de operación

Por cada doctor:
```
Dra. María:
├─ Lunes: 9:00-13:00, 15:00-18:00 ✅
├─ Martes-Viernes: Igual
├─ Sábado: 10:00-13:00
└─ Domingo: Cerrado
```

**Nota:** Afecta calendarios en GHL

❓ **PENDIENTE — Preguntar a Carlos:**
- No se detalla horario específico de cada doctor en ninguna llamada

---

**P6.2** - Duración de citas

**Por servicio esperado:**
- Consulta inicial: 30 min
- Liposucción: 120 min
- Láser: 45 min
- Etc.

**Pregunta clave:** ¿Los tiempos varían o son fijos?

❓ **PENDIENTE — Preguntar a Carlos:**
- Se identifican tipos de cita (primera vez, valoración/revisión sin costo, paquete o sesión individual)
- Pero sin duraciones específicas en las llamadas

---

**P6.3** - Lead capture points

¿Desde dónde quieren capturar leads?

- [ ] Formulario en sitio web
- [ ] WhatsApp (mensaje directo)
- [ ] Instagram DM (manual hoy, automatizar?)
- [x] Facebook (ads landing page) ← ✅ PRINCIPAL
- [ ] Google Maps
- [ ] Referencia de paciente existente
- [ ] Otro: ______

**Importante:** Cada fuente requiere integración diferente

✅ **RESPONDIDO (Llamada de fechamento y onboarding):**
- **Prioridad:** Meta Ads (Facebook/Instagram)
- **Dos tipos de campañas acordados:**
  - Campaña general: tráfico a landing page general (catálogo de servicios)
  - Campaña dirigida: tráfico a landing específica por tratamiento/servicio
- **Enfoque estratégico:** Dirigir tráfico pagado a **landing por tratamiento** (higher intent)
- Google Ads posible pero no prioritario
- **Importante:** No se genera contenido (TikTok, YouTube, etc.) — solo campañas de pago

---

**P6.4** - ¿Pacientes pueden ver disponibilidad en tiempo real?

- [x] Sí, sitio web muestra huecos disponibles ← ✅ RESPONDIDO
- [ ] No, solicitan y secretaria confirma
- [ ] Híbrido: algunos servicios sí, otros manual

**Nota:** Si es "sí", necesitamos calendario público sincronizado

✅ **RESPONDIDO (Llamada de onboarding):**
- **SÍ:** Paciente puede ver disponibilidad en tiempo real
- **Flujo específico acordado:** 
  1. Paciente selecciona **tratamiento**
  2. Visualiza **lista de doctores** que lo ofrecen (con foto/especialidad)
  3. Elige **un doctor específico**
  4. Ve **SOLO la agenda de ese doctor** (sin otros conflictos)
  5. Elige **fecha/hora disponible**

---

### SECCIÓN 7: SEGUIMIENTO Y RECORDATORIOS

**P7.1** - ¿Automático o manual?

Para confirmación 24h antes:
- [x] Automático: WhatsApp bot pregunta "¿Confirmas?" ← ✅ RESPONDIDO
- [ ] Manual: Secretaria llama
- [ ] Híbrido: Bot primero, si no responde → llamada

✅ **RESPONDIDO (Llamada de onboarding):**
- **Automatizado:** Secuencia propuesta por John: Confirmación + recordatorios en 24h/8h/4h/1h/15min/5min antes
- **Carlos sugirió:** ~4 avisos sería suficiente (quedó abierto a configuración)
- El sistema sigue siendo flexible — se puede ajustar según feedback de la doctora

---

**P7.2** - Seguimiento post-cita

¿Quieren contactar a pacientes después? ¿Cuándo?

- [x] 24h: "¿Cómo te sientes?" ← ✅ CONFIRMADO
- [x] 1 semana: "Cita de control" ← ✅ CONFIRMADO
- [ ] 3 días: "Comparte foto de resultados"
- [ ] 2 semanas: "Rate tu experiencia"

✅ **RESPONDIDO (Llamada de onboarding):**
- Confirmado que debe existir **seguimiento post-cita**
- Datos capturados: **historial médico general + pre/post-operatorio**
- **Campos críticos:** Alergias y medicamentos ("importantísimo")
- Sistema de historial: **"de dos vías"** — paciente llena una parte, doctora completa con notas de consulta
- **Cadencia exacta no fijada** para esta clínica específica, quedó abierta para definir con doctora en primeras iteraciones
- [ ] Mensual: "¿Mantenimiento?"

---

### SECCIÓN 8: DATOS Y PRIVACIDAD

**P8.1** - ¿Datos médicos sensibles?

El sistema capturará:
- [ ] Alergias
- [ ] Medicamentos actuales
- [ ] Cirugías previas
- [ ] Condiciones médicas (diabetes, presión alta)
- [ ] Fotos antes/después

**Pregunta:** ¿Tienen consentimiento de pacientes? ¿Dónde se almacenan fotos?

---

**P8.2** - Compliance (GDPR/LGPD)

- [ ] ¿Necesitan cumplimiento GDPR? (Clientes internacionales)
- [ ] ¿Necesitan cumplimiento LGPD? (Brasil)
- [ ] ¿Necesitan estar HIPAA-ready? (No aplica México pero es bueno saber)

**Nota:** Afecta dónde guardamos datos, backups, etc.

---

**P8.3** - Retención de datos

¿Cuánto tiempo guardan información de paciente?

- [ ] Indefinido (hasta que paciente pida delete)
- [ ] 1 año post-última cita
- [ ] 5 años (estándar legal)
- [ ] No saben

---

## 🟢 PREGUNTAS ADICIONALES (MEJORAS)

### SECCIÓN 8: DATOS Y PRIVACIDAD

**P8.1** - Datos médicos sensibles

✅ **RESPONDIDO (Llamada de onboarding):**
- El sistema capturará y almacenará datos médicos sensibles
- Obligatorio: **Historial médico** (general + pre/post-operatorio)
- Críticos: **Alergias** y **medicamentos actuales** ("importantísimo" según doctora)
- Formulario bidireccional: paciente llena datos iniciales → doctora completa notas de consulta
- Fotos antes/después pueden capturarse (con consentimiento)

**P8.2** - GDPR/LGPD compliance

❓ **PENDIENTE:** No se toca el tema en ninguna llamada. Preguntar si hay requerimientos de cumplimiento.

**P8.3** - Retención de datos

❓ **PENDIENTE:** No se define política de retención en ninguna llamada.

---

### SECCIÓN 9: FUNCIONALIDADES FUTURAS

**P9.1** - Prioridades post-MVP

Dentro de 3-6 meses, ¿qué necesitan?

- [ ] Programa de referidos (paciente trae amiga → descuento)
- [ ] Publicidad (Meta Ads integrado)
- [x] Reportes avanzados (ROI por canal, etc.) ← Implícito en "dashboard"
- [ ] App móvil para pacientes
- [ ] Programa de fidelización (puntos)
- [ ] Integración con contabilidad (exportar a contador)
- [ ] Otro: ______

✅ **RESPONDIDO (Parcial - Llamada de onboarding):**
- **Chat web** fue **explícitamente descartado por ahora** (puede venir después si doctora lo pide)
- **Tracking de costos de tokens** fue **descartado por ahora**
- **Enfoque:** MVP simple que funcione sin complicaciones, mejoras después basadas en feedback real

---

**P9.2** - Escalabilidad

¿Esperan crecer?

- [ ] 1 doctora → 2-3 doctors en 6 meses
- [ ] 100 pacientes → 500 en un año
- [ ] Agregar más sedes/clínicas

✅ **RESPONDIDO (Parcial - Llamada de onboarding):**
- Expectativa **baja** de crecer en número de doctores fijos: "muy difícilmente necesitemos más doctores"
- **Pero:** Sistema **pensado para escalar desde el inicio** — "si funciona para uno, funciona para todos"
- Crecimiento de pacientes: ❓ No se cuantifica en las llamadas

---

### SECCIÓN 10: FEEDBACK Y EXPECTATIVAS

**P10.1** - ¿Qué es éxito?

En 30 días post-lanzamiento:
- ¿Cuál es el objetivo mínimo? (ej: 10 citas/semana)
- ¿Cuál es el objetivo stretch? (ej: 20 citas/semana)
- ¿Cuál métrica importa más? (conversiones, ingresos, satisfacción)

❓ **PENDIENTE:**
- No hay meta específica fijada para esta clínica
- Nota: Se mostró caso de referencia (**clínica de nutrición Goja Eleven**: $13K/mes en últimos 30 días) como ejemplo de capacidad, **NO como meta para esta clínica**

---

**P10.2** - Dolores actuales

¿Cuáles son los 3 mayores problemas hoy?

✅ **RESPONDIDO (Llamada de fechamento y onboarding):**
1. **Sin historial centralizado** — documentos en Word sueltos, contactos en Excel, sin CRM
2. **Sin recordatorios automáticos** — actualmente manual
3. **Riesgo de no-shows en procedimientos** — reservan quirófano/equipo exclusivo, costo fijo
4. **Sitio web actual es solo catálogo** — sin agendamiento funcional, sin pago en línea

---

**P10.3** - Preocupaciones técnicas

¿Tienen miedo de algo?

- [ ] Que el sistema sea complicado de usar
- [ ] Que se pierdan datos
- [ ] Que no funcione WhatsApp
- [ ] Que no se integre con su sistema actual
- [ ] Que sea muy caro mantener
- [x] La doctora no entiende técnica → ✅ IDENTIFICADA
- [x] Preferencia por simplicidad + pesos MXN ← ✅ IDENTIFICADA

✅ **RESPONDIDO (Llamada de onboarding):**
- **La doctora se frustra** cuando no entiende 100% de la propuesta técnica (no es su tema)
- **Su padre** (dueño, quien paga) debe aprobar costos
- Prefiere **todo simple** y **en pesos mexicanos**, no en dólares
- Nota sobre cotización: "hazmela sencilla" (pedido explícito)
- Estrategia: Mostrar **resultados**, no jerga técnica

---

## 💰 CONTEXTO COMERCIAL RELEVANTE (extraído de las llamadas)

**No encaja en preguntas puntuales pero es importante para NO perder:**

### Estructura de Pagos Acordada
- **Setup:** $2,500 USD (~42,800 MXN)
  - 50% ahora ($1,250 USD / 21,400 MXN) ✅ **Parcialmente pagado**
  - 50% a los 5 días de que el sistema funcione ($1,250 USD / 21,400 MXN) ⏳ Pendiente

### Acompañamiento Mensual (ABIERTO, aún en negociación)
- **Original propuesto:** 6 meses acompañamiento mensual ($500 USD/mes)
- **Reducido por doctora:** La doctora sugiere bajarlo a **3 meses máximo** (no quiere compromiso largo aún)
- **Modelo alternativo en conversación:** $300 USD base + 10% de ingresos adicionales (cuando se generan)
- **Estructura de Carlos:** 
  - Él cubre costos iniciales de acompañamiento
  - Recupera con campañas publicitarias (Facebook/Instagram) que él maneja

### Cuenta GHL
- **Será independiente** para Carlos (para poder replicar con otros clientes)
- **Inicialmente:** Se construye dentro de cuenta de John
- **Migración:** Gratis dentro de los primeros 3 meses

### Decisiones Abiertas (No resueltas en llamada)
1. **Transcripción de notas de voz del médico:** 
   - ¿Construir in-house? ¿O usar herramienta de terceros (ej: Whisper)?
   - Impacto: 3-4 semanas de desarrollo si in-house, $10-40/mes si terceros

2. **Herramienta para construir el sitio web:**
   - ¿Claude/Gemini/Lovable/Vercel/GHL?
   - Aún no definida — se definirá en próxima reunión (viernes 17 de agosto)

3. **Diseño y estructura visual de la página:**
   - Carlos está preparando "mood board de diseño" para el viernes
   - Enfoque: Simple, elegante, mobile-first (90% de usuarios en celular)

### Cronograma Actual
- **Hoy (14 ago):** Preparación reunión onboarding
- **Miércoles 16 ago, 9:00 AM (Hora México):** Reunión de onboarding (3 horas)
- **Viernes 18 ago, 9:00 AM (Hora México):** Segunda reunión con Carlos (definir diseño web, herramientas)

---

## 📝 NOTAS DE CAMPO

### Durante la reunión, captura:

**Decisiones Tomadas:**
```
[ ] Opción elegida para: [tema]
[ ] Opción elegida para: [tema]
...
```

**Incertidumbres (TBD):**
```
- [Tema] → Necesita confirmación de: [Persona] antes de [Fecha]
- [Tema] → Depende de: [Otro factor] que aún no está claro
...
```

**Blockers Identificados:**
```
🔴 [Blocker] → Solución: ______
🟡 [Risk] → Mitigation: ______
...
```

**Personas a Contactar:**
```
- [Nombre]: Para confirmar [Asunto] → [Email/Teléfono]
- [Nombre]: Para obtener [Info] → [Email/Teléfono]
...
```

---

## 🎯 CHECKLIST POST-REUNIÓN

Después de la reunión:

- [ ] Llenar todas las respuestas en este documento
- [ ] Identificar 3-5 preguntas de seguimiento sin respuesta
- [ ] Crear documento "ESPECIFICACIÓN TÉCNICA DETALLADA" con respuestas
- [ ] Validar con Carlos antes de empezar construcción
- [ ] Compartir calendar de desarrollo con hitos claros
- [ ] Primer contacto técnico (acceso GHL, credenciales, etc.) dentro de 24h

---

## 📊 MATRIZ DE DECISIÓN

**Después de la reunión, completa:**

| Decisión | Opción 1 | Opción 2 | ✅ Elegido | Impacto |
|----------|----------|----------|----------|---------|
| Pago 100% vs Anticipo | 100% antes | 50% anticipo | ✅ 50/50 | Afecta flujo, conversión |
| Horarios público | Sí, calendario abierto | No, manual | TBD | UX, automatización |
| Seguimiento post-cita | Automático bot | Manual llamada | TBD | Costo, satisfacción |
| SMS integrado | Sí | No | TBD | Costo, robustez |
| ... | ... | ... | ... | ... |

---

## 🚀 PRÓXIMAS ACCIONES (Después de Onboarding)

1. **John** → Crear especificación técnica detallada basada en respuestas
2. **Carlos** → Confirmar respuestas con doctora
3. **Ambos** → Validar especificación juntos
4. **John** → Iniciar configuración GHL (SPRINT 1)
5. **Ambos** → Check-in semanal durante desarrollo

---

**Documento Creado:** 14 de agosto de 2026  
**Versión:** 1.1 (Llenado con respuestas de transcripciones de llamadas)  
**Estado:** ✅ Completado con respuestas de las dos llamadas (fechamento + onboarding)  
**Última actualización:** 14 de agosto de 2026, 17:00  
**Próxima actualización:** Después de reunión del miércoles 16 de agosto (rellenar casillas pendientes)
