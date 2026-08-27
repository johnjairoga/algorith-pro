# Conexión a GHL Private Integration v2.0

Guía paso-a-paso para conectar cualquier subcuenta de GHL usando Private Integration API v2.0.

## ✅ Requisitos

- Acceso a consola de GHL de una subcuenta (no de la agency principal)
- Permisos para crear integraciones privadas

---

## 🔧 Paso 1: Generar Personal Integration Token (PIT)

### En consola de GHL:

1. **Ve a:** Integrations → API & Webhooks
2. **Busca:** "Personal Integration Tokens" o "Private Integrations"
3. **Click en:** "+ Create" o "New Token"
4. **Configura:**
   - **Name:** `hub-integrations` (o nombre que prefieras)
   - **Scopes:** Selecciona TODOS estos:
     ```
     ✅ contacts
     ✅ opportunities
     ✅ calendars
     ✅ custom_fields
     ✅ conversations
     ✅ workflows
     ```
   - **Expires:** 90 días (recomendado para seguridad)

5. **Click en:** "Generate" o "Create"
6. **Copia el token:** Aparecerá en formato `pit-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`
   - ⚠️ **Guarda en lugar seguro** - se muestra una sola vez

---

## 📍 Paso 2: Obtener Location ID

### En consola de GHL:

1. **Ve a:** Settings → General
2. **Busca:** "Location ID" (campo en la página)
3. **Copia el valor:** Formato `XXXXXXXXXXXXXXXXXXXXXX` (sin guiones normalmente)

Ejemplo: `SpY51xVGgkHVsHhd2oRQ`

---

## 🔐 Paso 3: Configurar variables de entorno

### En tu proyecto (carpeta `hub-triadeflow`):

```bash
# 1. Crear archivo .env (si no existe)
cp .env.example .env

# 2. Editar .env con tus credenciales
```

**Archivo `.env`:**
```env
# GHL Connection - PRIVATE INTEGRATION v2.0
GHL_LOCATION_ID=<tu-location-id>
GHL_PIT_TOKEN=pit-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
GHL_API_URL=https://services.leadconnectorhq.com

# Agency info
GHL_AGENCY_ID=FH5mDYjA1Mi4JwnMeLrA
BUSINESS_NAME=<nombre-de-tu-negocio>

# Integrations
WHATSAPP_PHONE=<tu-telefono>
INSTAGRAM_HANDLE=@tu-instagram

# Environment
NODE_ENV=development
LOG_LEVEL=info

# Dry-run mode (safety flag for mass operations)
DRY_RUN=true

# Mass dispatch limits (guardrail para regra NO MASS DISPATCH)
MAX_CONTACTS_PER_BATCH=10
ALLOW_MASS_DISPATCH=false
```

**⚠️ Importante:**
- `.env` está en `.gitignore` - NUNCA se commitea
- `.env.example` contiene solo placeholders - se commitea para referencia
- Mantén el token seguro y privado

---

## 🧪 Paso 4: Verificar conexión

### Instalar dependencias:
```bash
npm install
```

### Testear conexión:
```bash
npm run dev
```

**Salida esperada:**
```
🚀 Iniciando Personal Geronto Hub Setup...

📍 Verificando conexão com GHL...

✅ Conectado a: <nombre-de-ubicacion>

📊 Status do projeto:

Pipelines: 6
Campos: 3
Tags: 22
...
```

Si ves ✅ Conectado: **¡Éxito! La conexión funciona.**

---

## 🚨 Errores comunes y soluciones

### Error: "Unauthorized, Switch to the new API token"
**Causa:** Token v1 en lugar de v2
**Solución:** 
- Genera un nuevo PIT en "Private Integrations"
- No uses "API Keys", usa "Personal Integration Token"

### Error: "401 Unauthorized"
**Causa:** Token inválido o sin scopes
**Solución:**
- Verifica que el token tiene TODOS los scopes (contacts, opportunities, etc)
- Regenera el token si es muy viejo (>90 días)

### Error: "Not found" al crear recursos
**Causa:** Esos endpoints no están disponibles en Private Integration v2.0
**Solución:**
- Pipelines, Campos, Tags → crear **manualmente en UI de GHL**
- API → usar solo para operaciones de datos (contactos, oportunidades)

### Error: "This route is not yet supported by the IAM Service"
**Causa:** Ese recurso no puede crearse vía API en v2.0
**Solución:**
- Ese recurso debe crearse manualmente en el UI de GHL
- Espera a que GHL agregue soporte o usa API v1.0 pública

---

## 📚 Diferencia: API v1.0 vs v2.0 Private Integration

| Aspecto | v1.0 (Pública) | v2.0 (Private) |
|---------|---|---|
| **URL Base** | `https://rest.gohighlevel.com/v1` | `https://services.leadconnectorhq.com` |
| **Autenticación** | API Key (largo) | PIT (pit-xxxx) |
| **Scope** | Limitado | Amplio (si tiene permisos) |
| **Crear Pipelines** | ✅ Sí | ❌ No (IAM) |
| **Crear Campos** | ✅ Sí | ❌ No (IAM) |
| **Crear Tags** | ✅ Sí | ✅ Sí |
| **CRUD Contactos** | ✅ Sí | ✅ Sí |
| **CRUD Oportunidades** | ✅ Sí | ✅ Sí |

**Recomendación para Fase 1:**
- Usa v2.0 Private Integration (ya configurada)
- Crea Pipelines, Campos, Tags **manualmente en UI**
- Usa API para operaciones de datos (Fase 2)

---

## 🔄 Replicar en otra subcuenta

Una vez tengas esto configurado, es **trivial replicar en otra subcuenta:**

```bash
# 1. Genera nuevo PIT en la nueva subcuenta
# 2. Obtén el Location ID de la nueva subcuenta
# 3. Actualiza .env con los nuevos valores:

GHL_LOCATION_ID=<nuevo-location-id>
GHL_PIT_TOKEN=pit-nuevo-token

# 4. npm run dev
# ✅ Conectado a la nueva subcuenta
```

**Mismo código, múltiples subcuentas.** Eso es el poder de la arquitectura Hybrid + Gradual.

---

## 📞 Soporte y Documentación

- **Documentación oficial GHL:** https://help.gohighlevel.com/
- **API Docs v2.0:** https://marketplace.gohighlevel.com/docs/
- **Soporte técnico GHL:** https://help.gohighlevel.com/support

---

## ✅ Checklist de setup

- [ ] Generé PIT en GHL Console
- [ ] Copié el token completo (pit-xxxxx)
- [ ] Copié Location ID exacto
- [ ] Actualicé .env con ambos valores
- [ ] Instalé dependencias: `npm install`
- [ ] Verifiqué conexión: `npm run dev`
- [ ] Vi ✅ Conectado en la salida
- [ ] Revisé que `.env` NO está tracked en Git
- [ ] Compartí `.env.example` (sin credenciales reales)

---

## Próximos pasos

Una vez conectado:

1. **Crear Pipelines, Campos, Tags manualmente en GHL UI**
   - 6 Pipelines (comercial, carteira, recorrencia, nutrição, recrutamiento, B2B)
   - 15+ Campos personalizados (origen, región, condición de salud, etc)
   - 20+ Tags de segmentación

2. **Implementar API endpoints** (`src/api/setupRoutes.js`)
   - POST /api/setup/contacts - crear contactos vía API
   - POST /api/setup/opportunities - crear oportunidades
   - POST /api/setup/tags - agregar tags

3. **Agregar Jobs para operaciones escalables** (`src/jobs/`)
   - Importar base antigua con reintentos
   - Disparos en masa con guardrails
   - Sincronización de datos
