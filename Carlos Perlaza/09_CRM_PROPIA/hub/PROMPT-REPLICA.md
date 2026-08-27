# Prompt para Replicar Conexión GHL

Usa este prompt (o una versión adaptada) cuando pidas ayuda a Claude para replicar la conexión a GHL.

---

## 📋 Prompt Básico

```
Necesito conectar mi subcuenta de GHL usando Private Integration API v2.0.

Tengo:
- Location ID: [TU-LOCATION-ID]
- Personal Integration Token (PIT): [TU-PIT-TOKEN]

Quiero:
1. Conectar a GHL desde Node.js
2. Verificar que la conexión funciona
3. Preparar la estructura para crear contactos, oportunidades y tags vía API

¿Puedes guiarme paso-a-paso?

Referencia: ver CONEXION-GHL.md en hub-triadeflow/
```

---

## 📋 Prompt Detallado (Para cuando surjan errores)

```
Estoy intentando conectar a GHL Private Integration v2.0 pero tengo este error:

[ERROR EXACTO AQUÍ]

Información:
- API URL: https://services.leadconnectorhq.com
- Token format: pit-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
- Location ID: [TU-ID]

He seguido:
1. Generar PIT en GHL Console → Integrations → API & Webhooks
2. Seleccionar scopes: contacts, opportunities, calendars, custom_fields, conversations, workflows
3. Copiar .env.example a .env
4. Llenar credenciales
5. Ejecutar: npm run dev

¿Qué está mal? ¿Qué necesito cambiar?
```

---

## 📋 Prompt para Agregar Nueva Funcionalidad

```
Tengo conectada una subcuenta de GHL usando Private Integration v2.0.

Estructura actual:
- ghl-client.js: Cliente de la API
- services/: Servicios reutilizables (pipelineService, fieldService, etc)
- .env: Credenciales configuradas

Necesito:
[DESCRIBE TU NECESIDAD - Crear contactos, traer oportunidades, sincronizar datos, etc]

¿Cómo lo implemento sin romper la estructura existente?

Referencia: ver README.md en hub-triadeflow/
```

---

## 📋 Prompt para Documentación

```
Tengo un proyecto que conecta a GHL vía Private Integration v2.0.

Necesito documentar cómo:
1. Generar el token
2. Configurar .env
3. Verificar la conexión
4. Replicar en otra subcuenta

¿Puedes crear un documento paso-a-paso que sea fácil de entender para alguien sin experiencia con GHL?

Incluye:
- Errores comunes y soluciones
- Limitaciones conocidas
- Diferencia entre API v1.0 y v2.0
- Checklist final
```

---

## 📋 Prompt para Troubleshooting

```
He seguido todos los pasos de CONEXION-GHL.md pero:

1. Genería el PIT ✅
2. Copié el Location ID ✅
3. Configuré .env ✅
4. Instalé dependencias ✅
5. Ejecuté npm run dev ❌

Error que recibo:
[PEGAR AQUÍ EL ERROR EXACTO]

¿Qué está fallando? ¿Qué necesito verificar en GHL Console?
```

---

## 🎯 Contexto Importante para Compartir

Cuando compartas tu setup con otros, asegúrate de incluir:

1. **Este archivo** (`CONEXION-GHL.md`)
2. **`.env.example`** (sin credenciales, solo estructura)
3. **`src/lib/ghl-client.js`** (cliente de API)
4. **`package.json`** (dependencias)

**NUNCA compartas:**
- ❌ `.env` (tiene credenciales)
- ❌ Tokens reales
- ❌ Location IDs de clientes

---

## 💡 Consejos para Claude

Para que Claude te ayude de forma óptima:

✅ **SÍ haz esto:**
- Comparte el error exacto (no resumas)
- Dile qué pasos ya intentaste
- Comparte el código relevante (ghl-client.js, .env structure)
- Dice qué versión de Node.js tienes
- Explica qué integraciones necesitas (contactos, oportunidades, etc)

❌ **NO hagas esto:**
- "No funciona" (muy vago)
- Compartir credenciales reales
- Suponer qué está mal sin verificar
- Cambiar múltiples cosas a la vez

---

## 🔄 Ejemplo: De 0 a conectado

**Scenario:** Nuevo desarrollador debe conectar otra subcuenta

**Prompt a usar:**
```
Tengo una nueva subcuenta de GHL para [NOMBRE DEL CLIENTE].

Necesito:
1. Conectarla usando el setup que ya existe en hub-triadeflow/
2. Que funcione con la misma arquitectura (ghl-client, services, etc)

Pasos que seguiré:
- Generar nuevo PIT en la subcuenta
- Copiar Location ID
- Actualizar .env

¿Qué necesito hacer exactamente? ¿Hay algo más que cambiar además de .env?

Referencia: hub-triadeflow/CONEXION-GHL.md
```

**Respuesta esperada:**
1. Link a CONEXION-GHL.md
2. Checklist específico
3. Verificación de que funciona
4. Cualquier paso diferente para esta subcuenta

---

## 📞 Cuando pedir ayuda

**Pide ayuda a Claude si:**
- ❌ Tienes error 401 (autenticación)
- ❌ Tienes error 404 (endpoint no encontrado)
- ❌ No sabes cómo generar el PIT
- ❌ No encuentras el Location ID
- ❌ Quieres agregar nuevas integraciones
- ❌ Quieres escalar a múltiples subcuentas

**Consulta la documentación si:**
- ✅ Necesitas saber qué es un PIT
- ✅ Necesitas ver la estructura de .env
- ✅ Quieres entender Private Integrations vs API pública
- ✅ Necesitas ejemplos de código
