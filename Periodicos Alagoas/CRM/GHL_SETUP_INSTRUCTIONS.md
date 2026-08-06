# 🚀 INSTRUCCIONES DE EJECUCIÓN — GHL Setup Script

## Objetivo
Automatizar la creación de la estructura en GoHighLevel (Fase 1):
- ✅ Crear 9 tags (3 revista, 3 cualificación, 3 timeline)
- ✅ Crear 3 pipelines (uno por revista)
- ✅ Crear 8 campos personalizados

---

## 📋 REQUISITOS PREVIOS

### 1. Node.js Instalado
```bash
# Verificar que Node.js está instalado
node --version  # Debería ser >= 14.0.0

# Si no está instalado, descargar de: https://nodejs.org
```

### 2. Dependencias NPM
El script requiere los siguientes paquetes:
- `axios` — Para hacer requests HTTP
- `chalk` — Para mensajes coloreados en consola
- `dotenv` — Para leer variables de .env

### 3. Credenciales de GHL en `.env`

El archivo `.env` debe contener:
```
GHL_API_TOKEN=pit-fa036e1b-49a8-442d-99ff-cd86cc3ec5d5
GHL_LOCATION_ID=XuChmr0YIHg823jqvZTN
```

✅ **Ya están disponibles en el archivo `.env` de la carpeta CRM**

---

## 🛠️ INSTALACIÓN

### Paso 1: Instalar Node.js (si no lo tienes)

**Windows:**
1. Ir a https://nodejs.org
2. Descargar versión LTS (recomendado)
3. Ejecutar el instalador
4. Seguir las instrucciones

**Mac:**
```bash
brew install node
```

**Linux:**
```bash
sudo apt-get install nodejs npm
```

### Paso 2: Instalar Dependencias

Navega a la carpeta CRM y ejecuta:

```bash
# Cambiar a carpeta CRM
cd "Periodicos Alagoas/CRM"

# Instalar dependencias (OPCIÓN 1 - Recomendado)
npm install axios chalk dotenv

# O instalar todas las dependencias (OPCIÓN 2)
npm install
```

---

## ⚙️ CONFIGURACIÓN

### Verificar archivo `.env`

El archivo `.env` debe estar en `Periodicos Alagoas/CRM/.env` con:

```
GHL_API_TOKEN=pit-fa036e1b-49a8-442d-99ff-cd86cc3ec5d5
GHL_LOCATION_ID=XuChmr0YIHg823jqvZTN
```

**✅ IMPORTANTE:** No compartir este archivo públicamente (ya está en `.gitignore`)

### Variables de Entorno (Alternativa)

Si prefieres no usar `.env`, puedes exportar las variables:

**Windows (PowerShell):**
```powershell
$env:GHL_API_TOKEN = "pit-fa036e1b-49a8-442d-99ff-cd86cc3ec5d5"
$env:GHL_LOCATION_ID = "XuChmr0YIHg823jqvZTN"
node scripts/ghl_setup.js
```

**Mac/Linux (Bash):**
```bash
export GHL_API_TOKEN="pit-fa036e1b-49a8-442d-99ff-cd86cc3ec5d5"
export GHL_LOCATION_ID="XuChmr0YIHg823jqvZTN"
node scripts/ghl_setup.js
```

---

## 🏃 EJECUCIÓN DEL SCRIPT

### Opción 1: Desde PowerShell (Windows)

```powershell
# Navegar a la carpeta del proyecto
cd "c:\Users\John\Desktop\John Jairo\Clientes\algorith-pro"

# Cambiar a carpeta CRM
cd "Periodicos Alagoas/CRM"

# Ejecutar script
node scripts/ghl_setup.js
```

### Opción 2: Desde Bash/Terminal (Mac/Linux)

```bash
# Navegar a la carpeta del proyecto
cd ~/path/to/algorith-pro

# Cambiar a carpeta CRM
cd "Periodicos Alagoas/CRM"

# Ejecutar script
node scripts/ghl_setup.js
```

### Opción 3: Hacer el script ejecutable (Mac/Linux)

```bash
# Hacer el script ejecutable
chmod +x scripts/ghl_setup.js

# Ejecutar directamente
./scripts/ghl_setup.js
```

---

## 📊 SALIDA ESPERADA

Cuando el script se ejecute correctamente, verás una salida similar a:

```
╔════════════════════════════════════════════════════════════════╗
║                    GHL SETUP - FASE 1                         ║
║        Integración GoHighLevel para Conecta Pesquisadores    ║
╚════════════════════════════════════════════════════════════════╝

[14:32:15] ℹ️  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[14:32:15] ℹ️  FASE 1.1: Validando Conexión con GHL
[14:32:15] ℹ️  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[14:32:16] ℹ️  Validando conexión con GHL...
[14:32:17] ✅ Conexión exitosa con GHL
[14:32:17] ℹ️  Ubicación: Conecta Pesquisadores UFAL
[14:32:17] ℹ️  ID de Ubicación: XuChmr0YIHg823jqvZTN

[14:32:17] ℹ️  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[14:32:17] ℹ️  FASE 1.2: Creando Tags (9 totales)
[14:32:17] ℹ️  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[14:32:17] ℹ️  Creando tags de revista...
[14:32:18] ✅ Tag creado: REPD
[14:32:18] ✅ Tag creado: REVISTA_CIENCIA_AGRICOLA
[14:32:19] ✅ Tag creado: REVISTA_CRITICA_HISTORICA
[14:32:19] ℹ️  Creando tags de cualificación...
[14:32:20] ✅ Tag creado: LEAD_QUENTE
[14:32:20] ✅ Tag creado: LEAD_EDUCACIONAL
[14:32:21] ✅ Tag creado: LEAD_PARCIAL
[14:32:21] ℹ️  Creando tags de timeline...
[14:32:22] ✅ Tag creado: INTENT_30_DIAS
[14:32:22] ✅ Tag creado: INTENT_3_MESES
[14:32:23] ✅ Tag creado: INTENT_6_MESES
[14:32:23] ✅ Tag creado: INTENT_SIN_FECHA
[14:32:23] ✅ Total de tags creados: 10

[14:32:24] ℹ️  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[14:32:24] ℹ️  FASE 1.3: Creando Pipelines (3 totales)
[14:32:24] ℹ️  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[14:32:25] ✅ Pipeline creado: REPD — Economia & Políticas Públicas
[14:32:26] ✅ Pipeline creado: Revista Ciência Agrícola — Agronomía & Producción
[14:32:27] ✅ Pipeline creado: Revista Crítica Histórica — Historia & Humanidades
[14:32:27] ✅ Total de pipelines creados: 3

[14:32:28] ℹ️  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[14:32:28] ℹ️  FASE 1.4: Creando Campos Personalizados (8 totales)
[14:32:28] ℹ️  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[14:32:29] ✅ Campo personalizado creado: Nombre
[14:32:30] ✅ Campo personalizado creado: Email
[14:32:30] ✅ Campo personalizado creado: WhatsApp
[14:32:31] ✅ Campo personalizado creado: Área de Investigación
[14:32:32] ✅ Campo personalizado creado: Nivel Académico
[14:32:32] ✅ Campo personalizado creado: Artículo Listo
[14:32:33] ✅ Campo personalizado creado: Cuándo Publicar
[14:32:34] ✅ Campo personalizado creado: LGPD Aceptado
[14:32:34] ✅ Total de campos creados: 8

[14:32:35] ℹ️  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[14:32:35] ℹ️  Generando Reporte Final

╔════════════════════════════════════════════════════════════════╗
║                    ✅ FASE 1 COMPLETADA                       ║
╚════════════════════════════════════════════════════════════════╝

[14:32:36] ✅ Tags creados: 10
[14:32:36] ✅ Pipelines creados: 3
[14:32:36] ✅ Campos personalizados creados: 8

Próximos pasos:
[14:32:36] ℹ️  1. Revisar GHL_SETUP_REPORT.json para verificar IDs
[14:32:36] ℹ️  2. Crear contacto de prueba en GHL
[14:32:36] ℹ️  3. Validar que la estructura está correcta
[14:32:36] ℹ️  4. Proceder a Fase 2: API Integration
```

---

## 📄 REPORTE GENERADO

Después de ejecutar el script, se generará un archivo:

**`GHL_SETUP_REPORT.json`**

Este archivo contiene:
- Timestamp de ejecución
- IDs de todos los tags creados
- IDs de todos los pipelines creados
- IDs de todos los campos personalizados
- Resumen de totales

**Ejemplo:**
```json
{
  "timestamp": "2026-08-06T14:32:36.000Z",
  "ghlLocationId": "XuChmr0YIHg823jqvZTN",
  "tagsCreated": {
    "revista": {
      "REPD": { "id": "tag_12345", "name": "REPD" },
      ...
    }
  },
  "summary": {
    "totalTagsCreated": 10,
    "totalPipelinesCreated": 3,
    "totalCustomFieldsCreated": 8
  }
}
```

**Importante:** Guardar este archivo como referencia para las próximas fases.

---

## 🐛 TROUBLESHOOTING

### Error: "Cannot find module 'axios'"

**Solución:**
```bash
npm install axios chalk dotenv
```

### Error: "ENOENT: no such file or directory, open '.env'"

**Solución:**
- Verificar que el archivo `.env` existe en `Periodicos Alagoas/CRM/`
- Las credenciales están disponibles en ese archivo

### Error: "401 Unauthorized"

**Solución:**
- Verificar que el token de API es correcto
- Verificar que no hay espacios extra antes/después del token
- El token debe ser: `pit-fa036e1b-49a8-442d-99ff-cd86cc3ec5d5`

### Error: "Location not found"

**Solución:**
- Verificar que el Location ID es correcto: `XuChmr0YIHg823jqvZTN`
- Acceder a GHL directamente y confirmar que la ubicación existe

### Error: "Tag already exists"

**Solución:**
- Es normal si ejecutas el script varias veces
- El script continuará y saltará los tags que ya existen
- Verificar en GHL que los tags están creados correctamente

---

## ✅ CHECKLIST POST-EJECUCIÓN

Después de ejecutar el script:

- [ ] ✅ Script se ejecutó sin errores
- [ ] ✅ Archivo `GHL_SETUP_REPORT.json` fue generado
- [ ] ✅ Acceder a GHL y verificar que los 9 tags están creados
- [ ] ✅ Verificar que los 3 pipelines están creados
- [ ] ✅ Verificar que los 8 campos personalizados están creados
- [ ] ✅ Guardar los IDs del reporte para próximas fases
- [ ] ✅ Hacer commit en git del reporte

---

## 🚀 PRÓXIMOS PASOS

Una vez que la Fase 1 está completada:

1. **Revisar estructura en GHL**
   - Acceder a https://app.gohighlevel.com
   - Verificar tags, pipelines, campos

2. **Crear contacto de prueba**
   - Nombre: "Juan Prueba"
   - Email: test@triadeflow.com.br
   - Verificar que se asignan tags correctamente

3. **Validar API**
   - Hacer prueba de conexión con script

4. **Proceder a Fase 2**
   - Crear script de integración (enviar_lead_ghl.js)
   - Implementar lógica de routing

---

## 📞 SOPORTE

Si tienes problemas:

1. Revisar sección **Troubleshooting** arriba
2. Verificar que `.env` tiene credenciales correctas
3. Verificar que Node.js está instalado (`node --version`)
4. Contactar a John: john@triadeflow.com.br

---

**Documento:** GHL Setup Instructions  
**Versión:** 1.0  
**Última actualización:** 6 Agosto 2026  
**Estado:** 🟡 LISTO PARA EJECUTAR
