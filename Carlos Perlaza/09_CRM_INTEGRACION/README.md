# 📱 CARPETA 09_CRM_INTEGRACION

**Propósito:** Almacenar TODA la información necesaria para integrar y configurar Go High Level (GHL) con los servicios de la clínica.

**Fecha de Creación:** 14 de agosto de 2026  
**Estado:** En preparación  
**Responsable:** John (Algorith Pro)

---

## 📁 ESTRUCTURA DE CARPETAS

```
09_CRM_INTEGRACION/
│
├── 01_Credenciales_Acceso/
│   ├── GHL_Credenciales.txt (⚠️ CONFIDENCIAL)
│   ├── Acceso_Hosting.txt (⚠️ CONFIDENCIAL)
│   ├── API_Keys.txt (⚠️ CONFIDENCIAL)
│   └── README.md
│
├── 02_Configuracion_Integraciones/
│   ├── WhatsApp/
│   │   ├── Setup_WhatsApp_API.md
│   │   ├── Numeros_Configurados.txt
│   │   ├── Templates_Automatizadas.md
│   │   └── Webhook_URL.txt
│   │
│   ├── Stripe/
│   │   ├── Setup_Stripe.md
│   │   ├── API_Keys_Stripe.txt (⚠️)
│   │   ├── Webhooks_Configuracion.md
│   │   └── Planes_Productos.md
│   │
│   ├── Meta_Ads/
│   │   ├── Setup_Meta_Ads.md
│   │   ├── Pixel_Configuration.md
│   │   ├── Conversion_Tracking.md
│   │   └── API_Access.txt (⚠️)
│   │
│   └── Email/
│       ├── Gmail_Setup.md
│       ├── SMTP_Configuration.txt
│       ├── Email_Templates.md
│       └── Acceso_Gmail.txt (⚠️)
│
├── 03_APIs_Webhooks/
│   ├── GHL_API_Documentation.md
│   ├── Webhooks_Events.md
│   ├── Webhook_URLs.txt
│   ├── Event_Triggers.md
│   └── Testing_Webhooks.md
│
├── 04_Documentacion_Tecnica/
│   ├── Arquitectura_GHL.md
│   ├── Flujo_de_Datos.md
│   ├── Seguridad_LGPD.md
│   ├── Escalabilidad.md
│   └── Performance_Monitoring.md
│
├── 05_Guias_Setup/
│   ├── PASO_1_Crear_Cuenta_GHL.md
│   ├── PASO_2_Configurar_Pipelines.md
│   ├── PASO_3_Integrar_WhatsApp.md
│   ├── PASO_4_Integrar_Stripe.md
│   ├── PASO_5_Integrar_Meta_Ads.md
│   ├── PASO_6_Configurar_Automaciones.md
│   └── PASO_7_Testing_Completo.md
│
├── 06_Estado_Integracion/
│   ├── Checklist_Setup.md
│   ├── Issues_Encontrados.md
│   ├── Soluciones_Aplicadas.md
│   ├── Testing_Results.md
│   └── Go_Live_Checklist.md
│
└── README.md (este archivo)
```

---

## 📋 QUÉ VA EN CADA CARPETA

### **01_Credenciales_Acceso** 🔐
**Propósito:** Almacenar accesos seguros (CONFIDENCIAL)

**Archivos:**
- `GHL_Credenciales.txt` → Login/Password de GHL (con formato seguro)
- `Acceso_Hosting.txt` → Acceso al servidor/hosting actual
- `API_Keys.txt` → API keys de todas las integraciones
- `README.md` → Guía de seguridad para credenciales

**⚠️ IMPORTANTE:**
- ✅ Usar contraseñas seguras (min 16 caracteres, símbolos, números)
- ✅ NO compartir estos archivos por email sin encriptar
- ✅ Cambiar contraseña cada 90 días
- ✅ Usar autenticación 2FA en GHL

---

### **02_Configuracion_Integraciones** 🔌
**Propósito:** Detalles de cómo está configurada cada integración

**Subcarpetas:**

#### **WhatsApp/**
- Setup de API oficial de WhatsApp
- Números configurados (cuál es cuál)
- Templates de mensajes automáticos
- URLs de webhooks

#### **Stripe/**
- Cómo está configurada la pasarela
- API keys (seguro)
- Configuración de webhooks (pagos exitosos, fallos, etc.)
- Lista de productos/planes

#### **Meta_Ads/**
- Pixel de Meta configurado
- Cómo rastrear conversiones
- API access documentado
- Conexión con GHL para leads

#### **Email/**
- Gmail configurado
- SMTP settings
- Templates de email automáticas
- Permisos de acceso

---

### **03_APIs_Webhooks** 🔗
**Propósito:** Documentación técnica de APIs y webhooks

**Archivos:**
- `GHL_API_Documentation.md` → Endpoints principales que usamos
- `Webhooks_Events.md` → Qué eventos generan qué acciones
- `Webhook_URLs.txt` → URLs donde GHL envía eventos
- `Event_Triggers.md` → Cuándo se ejecuta cada evento
- `Testing_Webhooks.md` → Cómo testear que funcionen

**Ejemplo de evento:**
```
EVENTO: Paciente paga en Stripe
└─ GHL recibe webhook de Stripe
   └─ Ejecuta automación "Enviar confirmación"
      └─ Etiqueta automática "Pagó"
         └─ Move a siguiente etapa
```

---

### **04_Documentacion_Tecnica** 📚
**Propósito:** Documentación arquitectónica y seguridad

**Archivos:**
- `Arquitectura_GHL.md` → Cómo está diseñado todo
- `Flujo_de_Datos.md` → De dónde viene cada dato y a dónde va
- `Seguridad_LGPD.md` → Cumplimiento de protección de datos
- `Escalabilidad.md` → Cómo crece sin romperse
- `Performance_Monitoring.md` → Cómo monitoreamos performance

---

### **05_Guias_Setup** 📖
**Propósito:** Step-by-step para configurar TODO

**Archivos (En orden de ejecución):**

1. `PASO_1_Crear_Cuenta_GHL.md`
   - Crear cuenta en GHL
   - Configuración básica
   - Estructuración de equipos

2. `PASO_2_Configurar_Pipelines.md`
   - Crear 4 pipelines (Consulta, Aparatología, Inactivos, Recurrencia)
   - Agregar etapas
   - Configurar campos personalizados

3. `PASO_3_Integrar_WhatsApp.md`
   - Conectar API de WhatsApp
   - Sincronizar números
   - Configurar templates

4. `PASO_4_Integrar_Stripe.md`
   - Crear cuenta Stripe
   - Conectar con GHL
   - Configurar webhooks

5. `PASO_5_Integrar_Meta_Ads.md`
   - Instalar pixel de Meta
   - Conectar conversiones
   - Testear tracking

6. `PASO_6_Configurar_Automaciones.md`
   - Crear flujos automáticos por pipeline
   - Recordatorios
   - Cambios de etapa automáticos

7. `PASO_7_Testing_Completo.md`
   - Testing de cada pipeline
   - Testing de integraciones
   - Testing de automaciones

---

### **06_Estado_Integracion** ✅
**Propósito:** Seguimiento de qué está hecho y qué falta

**Archivos:**

- `Checklist_Setup.md`
  ```
  ☐ Cuenta GHL creada
  ☐ Pipelines configurados (4)
  ☐ WhatsApp integrado
  ☐ Stripe integrado
  ☐ Meta Ads configurado
  ☐ Automaciones creadas
  ☐ Testing completado
  ☐ Go Live aprobado
  ```

- `Issues_Encontrados.md`
  - Problemas encontrados durante setup
  - Detalles del problema
  - Impacto

- `Soluciones_Aplicadas.md`
  - Solución implementada
  - Cómo se resolvió
  - Lecciones aprendidas

- `Testing_Results.md`
  - Resultados de testing
  - Qué funcionó
  - Qué no funcionó
  - Bugs encontrados

- `Go_Live_Checklist.md`
  - Checklist final antes de Go Live
  - Validaciones de seguridad
  - Validaciones de performance
  - Validaciones de datos

---

## 🚀 CRONOGRAMA DE LLENADO

| Semana | Qué se llena | Responsable |
|--------|---|---|
| **Sem 1** | 01_Credenciales, 02_Config básica | John + Carlos |
| **Sem 2** | 03_APIs, 04_Documentación, 05_Guías | John |
| **Sem 3** | 05_Guías (pasos 6-7), 06_Testing | John |
| **Sem 4-5** | 06_Estado (completo), Go Live Checklist | John |

---

## 🔒 SEGURIDAD

### ⚠️ Lo que NUNCA va aquí
- ❌ Credenciales en texto plano en archivos versionados
- ❌ API keys en GitHub/compartidos sin encriptar
- ❌ Contraseñas de clientes
- ❌ Datos médicos sensibles (están en GHL, no aquí)

### ✅ Cómo protegemos credenciales
- 🔐 Archivo `.gitignore` excluye archivos de credenciales
- 🔐 Contraseña encriptada en archivo separado (local only)
- 🔐 Compartir credenciales solo por Bitwarden/1Password
- 🔐 Cambio de contraseña cada 90 días
- 🔐 Auditoría de acceso en GHL

---

## 📞 CONTACTOS DE EMERGENCIA (INTEGRACIÓN)

| Servicio | Contacto | Teléfono | Email |
|----------|----------|----------|-------|
| **GHL Support** | Support GHL | [A completar] | support@gohighlevel.com |
| **Stripe Support** | Stripe Developers | [A completar] | support@stripe.com |
| **Meta Business** | Facebook Support | [A completar] | [A completar] |
| **WhatsApp Business** | WhatsApp API | [A completar] | [A completar] |

---

## 📊 REFERENCIAS RÁPIDAS

### APIs Principales Usadas
- ✅ **GHL API** - Para crear/actualizar contactos, etapas, automaciones
- ✅ **Stripe API** - Para procesar pagos y recibir confirmaciones
- ✅ **WhatsApp API** - Para enviar/recibir mensajes
- ✅ **Meta Pixel API** - Para tracking de eventos

### Webhooks Principales
- ✅ **Stripe → GHL** - Confirmación de pago
- ✅ **Meta Ads → GHL** - Nuevo lead de campaña
- ✅ **WhatsApp → GHL** - Nuevo mensaje del paciente
- ✅ **GHL → Email** - Envío de confirmaciones

---

## 📝 ÚLTIMA ACTUALIZACIÓN

**Fecha:** 14 de agosto de 2026  
**Versión:** 1.0 (Estructura Base)  
**Próxima revisión:** Después de PASO_1 (Crear Cuenta GHL)

---

**Esta carpeta es el "Control Center" de todas las integraciones técnicas del proyecto.**
