# CHECKLIST TÉCNICO - ACCESO GHL Y PREPARACIÓN
**Para:** John (Algorith Pro) - Preparación para Onboarding  
**Plazo:** Antes del miércoles 16 de agosto, 9:00 AM  
**Objetivo:** Validar que tienes todo listo para demostrar y configurar

---

## ✅ STEP 1: ACCESO A GO HIGH LEVEL

### Cuenta de GHL
- [ ] ¿Tienes acceso a tu cuenta de GHL (Algorith Pro)?
- [ ] ¿Qué plan tienes? (Starter / Agency / Custom)
- [ ] ¿Tienes permisos para crear sub-cuentas para clientes?

**Si NO tienes cuenta:**
- [ ] Crear cuenta en www.gohighlevel.com
- [ ] Seleccionar plan compatible (Agency recomendado para multicliente)
- [ ] Completar onboarding de GHL

---

### Sub-cuenta para Carlos
- [ ] ¿Ya existe sub-cuenta "Carlos Perlaza - Clínica"?
- [ ] Si NO, crear nueva:
  - [ ] Nombre: "Carlos Perlaza - Clinica Estética Puebla"
  - [ ] Email: [pendiente obtener de Carlos]
  - [ ] Acceso: Admin (John) + User (Carlos/Secretaria)

**Estado:** [ ] Listo [ ] En Progreso [ ] Pendiente

---

## ✅ STEP 2: INTEGRACIONES CRÍTICAS

### WhatsApp API
- [ ] ¿Tienes acceso a Meta Business Account?
- [ ] ¿Tiene WhatsApp Business API integrada a GHL?
  
**Si NO:**
- [ ] Crear cuenta en www.facebook.com/business
- [ ] Configurar WhatsApp Business Account
- [ ] Obtener número de WhatsApp Business (o migrar existente)
- [ ] Conectar API a GHL

**Documentación:** Meta Business → WhatsApp API → GHL Connection

**Status:** [ ] Listo [ ] Parcial [ ] No iniciado

---

### Stripe (Pagos)
- [ ] ¿Tienes cuenta Stripe configurada?
- [ ] ¿Está conectada a GHL?

**Si NO:**
- [ ] Crear cuenta en www.stripe.com
- [ ] Configurar payout (cuenta bancaria)
- [ ] Conectar a GHL → Settings → Payment Gateway

**Configuración necesaria:**
- [ ] Moneda: MXN (pesos mexicanos)
- [ ] Métodos de pago: Tarjeta crédito, Transferencia
- [ ] Webhook configurado para sincronizar pagos

**Status:** [ ] Listo [ ] Parcial [ ] No iniciado

---

### PagSeguro (Alternativa Local)
- [ ] ¿Necesitamos PagSeguro además de Stripe?
  - [ ] Sí (mejor para México)
  - [ ] No (solo Stripe)
  - [ ] Ambos (máxima cobertura)

**Si Sí:**
- [ ] Crear cuenta en www.pagseguro.com.mx
- [ ] Conectar a GHL

**Status:** [ ] Listo [ ] Parcial [ ] No iniciado

---

### Gmail / Email Automático
- [ ] ¿Tienes Gmail administrativo creado?
  - Formato sugerido: `noreply@[domain-clinica].com`
  - O: `sistema@[domain-clinica].com`

**Si NO:**
- [ ] Crear email: _____________
- [ ] Verificar en GHL → Settings → Email
- [ ] Configurar SMTP (si es necesario)

**Status:** [ ] Listo [ ] Parcial [ ] No iniciado

---

## ✅ STEP 3: CONFIGURACIÓN BÁSICA EN GHL

### Estructura de CRM
- [ ] ¿Creaste el primer "Contact" (Contact Type)?
- [ ] ¿Creaste el primer "Pipeline"? (Ej: "Consulta Inicial")

**Pipelines a crear (básico):**
- [ ] Pipeline 1: Consulta Inicial (5 etapas)
- [ ] Pipeline 2: Procedimiento Quirúrgico (7 etapas)
- [ ] Pipeline 3: Láser/Estética (6 etapas)

**Status:** [ ] Plantilla lista [ ] Ejemplos [ ] Sin empezar

---

### Custom Fields (Campos Personalizados)
- [ ] ¿Identificaste los custom fields para "Paciente"?

**Mínimo requerido:**
- [ ] Nombre (Text) ← Estándar
- [ ] Teléfono (Phone) ← Estándar
- [ ] Email (Email) ← Estándar
- [ ] Fecha de nacimiento (Date)
- [ ] Alergias (Text/Textarea)
- [ ] Medicamentos actuales (Text/Textarea)
- [ ] Cirugías previas (Text/Textarea)
- [ ] Preferencia de comunicación (Dropdown: WhatsApp/Email/SMS)
- [ ] NPS Score (Number: 1-10)

**Status:** [ ] Lista completa [ ] Parcial [ ] No iniciado

---

### Calendarios de Doctores
- [ ] ¿Creaste calendarios básicos en GHL?

**Mínimo (estructura):**
- [ ] Calendario Dra. María (prueba)
- [ ] Horarios de ejemplo
- [ ] Servicios asociados

**Status:** [ ] Listo con ejemplo [ ] Sin empezar

---

## ✅ STEP 4: PLANTILLAS DE AUTOMATIZACIÓN

### Email Templates
- [ ] ¿Creaste template para "Confirmación de Cita"?
- [ ] ¿Creaste template para "Recordatorio 24h Antes"?
- [ ] ¿Creaste template para "Instrucciones Post-Cita"?

**Mínimo requerido (3 templates):**
1. Confirmación cita
2. Recordatorio pre-cita
3. Instrucciones post-cita

**Status:** [ ] 3+ templates listos [ ] Parcial [ ] No iniciado

---

### WhatsApp Templates
- [ ] ¿Creaste templates de WhatsApp en Meta Business?
- [ ] ¿Conectadas a GHL?

**Mínimo requerido (3 templates):**
1. Bienvenida lead
2. Confirmación cita
3. Recordatorio cita

**Nota:** Los templates de WhatsApp necesitan aprobación de Meta (24-48h)

**Status:** [ ] En revisión [ ] Aprobados [ ] No iniciado

---

## ✅ STEP 5: AUTOMACIONES BÁSICAS

### Flujo de Agendamiento
- [ ] ¿Creaste primer flujo: "Cuando paciente agenda cita"?

**Este flujo debe:**
- [ ] Enviar email de confirmación
- [ ] Enviar WhatsApp de confirmación
- [ ] Crear tarea para secretaria
- [ ] Actualizar calendario doctor

**Status:** [ ] Listo [ ] En progreso [ ] No iniciado

---

### Flujo de Recordatorio 24h
- [ ] ¿Configuraste trigger: "24h antes de cita"?

**Este flujo debe:**
- [ ] Enviar WhatsApp con botones (Confirmar / Reprogramar)
- [ ] Enviar email adicional
- [ ] Crear tarea si no confirma

**Status:** [ ] Listo [ ] En progreso [ ] No iniciado

---

## ✅ STEP 6: DASHBOARD Y REPORTES

### Dashboard Gerencial (Básico)
- [ ] ¿Tienes widget que muestre:
  - [ ] Citas hoy
  - [ ] Ingresos mes
  - [ ] Tasa de conversión

**Status:** [ ] Listo [ ] Parcial [ ] No iniciado

---

## ✅ STEP 7: DOCUMENTACIÓN LISTA

### Para Demostración
- [ ] Captura de pantalla: Pipeline de ejemplo
- [ ] Captura de pantalla: Agendamiento (cómo se ve para paciente)
- [ ] Captura de pantalla: Calendario (cómo se ve para doctor)
- [ ] Video demo (máx 3 min): "Cómo agenda un paciente"

**Status:** [ ] Listo [ ] Parcial [ ] No iniciado

---

### Documentación Técnica
- [ ] Diagrama: Flujo de datos (Lead → Cita → Pago → Seguimiento)
- [ ] Especificación: Integraciones necesarias (lista simple)
- [ ] Documento: Campos de datos recolectados (qué capturamos)

**Status:** [ ] Listo [ ] Parcial [ ] No iniciado

---

## ✅ STEP 8: CREDENCIALES Y ACCESO

### Para Carlos
Tienes preparado (para compartir el miércoles):

- [ ] Documentación de acceso a GHL
- [ ] Credenciales de admin (email/password inicial)
- [ ] Link a sub-cuenta
- [ ] Guía rápida: "Cómo ver tus citas"
- [ ] Contacto de support (John)

**Status:** [ ] Listo [ ] En progreso [ ] No iniciado

---

## ✅ STEP 9: VALIDACIÓN DE REQUERIMIENTOS

### Checklist Pre-Reunión (2 días antes)

- [ ] Todas las integraciones funcionan (WhatsApp, Stripe, Email)
- [ ] Puedes crear un "test booking" de principio a fin
- [ ] El flujo de email funciona
- [ ] El flujo de WhatsApp funciona
- [ ] Puedes mostrar dashboard
- [ ] Tienes respuestas a preguntas técnicas (ver PREGUNTAS_TECNICAS_ONBOARDING.md)

---

## 🎯 RIESGOS TÉCNICOS A MITIGAR

### Riesgo 1: WhatsApp No Conecta
**Síntoma:** Meta no autoriza número  
**Plan B:** Usar email + SMS mientras se configura  
**Acción:** Tener números de prueba listos

- [ ] Número de WhatsApp de prueba: _____________
- [ ] Cuenta Gmail de prueba: _____________

---

### Riesgo 2: Stripe No Procesa MXN
**Síntoma:** Stripe no soporta moneda local  
**Plan B:** Usar PagSeguro como primary  
**Acción:** Tener PagSeguro como backup

- [ ] PagSeguro cuenta: [ ] Listo [ ] No iniciado

---

### Riesgo 3: GHL Subaccount No Crea
**Síntoma:** Permisos insuficientes  
**Plan B:** Usar "Agency" en lugar de "Starter"  
**Acción:** Validar plan de GHL

- [ ] Plan GHL: _____________ 
- [ ] Soporta sub-cuentas: [ ] Sí [ ] No

---

## 📝 NOTAS DE PREPARACIÓN

```
[Escribe aquí qué validaste y qué encontraste]

Probado:
- 

Issues encontrados:
- 

Dudas a aclarar con Carlos:
- 

Cambios a hacer:
- 
```

---

## 🚀 CHECKLIST FINAL (Miércoles por la mañana)

**1 hora antes de reunión:**

- [ ] Laptop cargada (batería 100%)
- [ ] Internet probado (velocidad OK)
- [ ] Ventana de GHL abierta
- [ ] Ventana de Stripe lista
- [ ] Pantallazos de demostración listos
- [ ] Documento de preguntas impreso/digital
- [ ] Video demo disponible (offline si es posible)
- [ ] Notas abiertas para tomar respuestas
- [ ] Teléfono en silencio
- [ ] Café preparado ☕

---

## ✅ ESTADO GENERAL

**Progreso de preparación:**

```
[████░░░░░] 40% - Completado
[Editar según avances]
```

**Fecha última actualización:** _____________

**Áreas críticas pendientes:**
- 
- 
- 

**Contactos si hay emergencia:**
- Carlos: [Teléfono]
- Support GHL: [Link]
- Support Stripe: [Email]

---

**Documento Preparado:** 14 de agosto de 2026  
**Para:** Reunión Onboarding - 16 de agosto  
**Creado por:** Claude Code  
**Próxima revisión:** Miércoles 8:00 AM
