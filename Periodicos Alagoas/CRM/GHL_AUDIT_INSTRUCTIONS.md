# 📊 AUDITORÍA DE GHL
## Cómo obtener un resumen completo de la cuenta

---

## 🎯 OBJETIVO

El script `ghl_audit.js` conecta con tu cuenta de GHL y genera un reporte completo con:
- ✅ Información de la cuenta (nombre, email, zona horaria)
- ✅ Total de tags creados
- ✅ Total de pipelines creados  
- ✅ Total de campos personalizados
- ✅ Total de contactos en base de datos
- ✅ Muestra de contactos recientes
- ✅ Reporte en JSON y Markdown

---

## 🚀 CÓMO EJECUTAR

### Opción 1: Windows (Más fácil)

```powershell
# Abrir PowerShell o Command Prompt
cd "c:\Users\John\Desktop\John Jairo\Clientes\algorith-pro\Periodicos Alagoas\CRM"

# Ejecutar el audit
node scripts/ghl_audit.js
```

### Opción 2: Mac/Linux

```bash
# Abrir Terminal
cd "Periodicos Alagoas/CRM"

# Ejecutar el audit
node scripts/ghl_audit.js
```

### Opción 3: Usando NPM (Más rápido)

```bash
cd "Periodicos Alagoas/CRM"

# Agregar script a package.json (si aún no está)
npm run audit

# O ejecutar directamente
npx node scripts/ghl_audit.js
```

---

## 📋 REQUISITOS PREVIOS

✅ **Node.js instalado** (v14.0.0 o superior)
```bash
node --version  # Debe mostrar v14.0.0 o superior
```

✅ **Dependencias NPM instaladas**
```bash
cd "Periodicos Alagoas/CRM"
npm install
```

✅ **Archivo .env con credenciales**
```
GHL_PIT_TOKEN=pit-fa036e1b-49a8-442d-99ff-cd86cc3ec5d5
GHL_LOCATION_ID=XuChmr0YIHg823jqvZTN
```

---

## 📊 SALIDA ESPERADA

Cuando ejecutes el script, verás algo como:

```
╔════════════════════════════════════════════════════════════════╗
║                    GHL AUDIT - REPORTE DE CUENTA              ║
║              Periodicos Alagoas - Conecta Pesquisadores      ║
╚════════════════════════════════════════════════════════════════╝

[15:32:15] ℹ️  Conectando con GHL...
[15:32:16] ✅ Conexión exitosa
[15:32:16] ℹ️  Obteniendo tags...
[15:32:17] ✅ 9 tags encontrados
[15:32:17] ℹ️  Obteniendo pipelines...
[15:32:18] ✅ 3 pipelines encontrados
[15:32:18] ℹ️  Obteniendo campos personalizados...
[15:32:19] ✅ 8 campos encontrados
[15:32:19] ℹ️  Obteniendo muestra de contactos...
[15:32:20] ✅ Muestra: 5 contactos

📊 DATOS GENERALES
   Nombre: Conecta Pesquisadores UFAL
   Email: info@conecta-pesquisadores.ufal.edu.br
   Zona Horaria: America/Maceio

📈 ESTADÍSTICAS
   Tags: 9
   Pipelines: 3
   Campos Personalizados: 8
   Contactos: 0

🏷️  TAGS
   • REPD (#1E3A8A)
   • REVISTA_CIENCIA_AGRICOLA (#10B981)
   • REVISTA_CRITICA_HISTORICA (#9333EA)
   • LEAD_QUENTE (#EF4444)
   • LEAD_EDUCACIONAL (#F97316)
   • LEAD_PARCIAL (#9CA3AF)
   • INTENT_30_DIAS (#3B82F6)
   • INTENT_3_MESES (#8B5CF6)
   • INTENT_6_MESES (#EC4899)
   • INTENT_SIN_FECHA (#64748B)

📋 PIPELINES
   1. REPD — Economia & Políticas Públicas (4 etapas)
   2. Revista Ciência Agrícola — Agronomía & Producción (4 etapas)
   3. Revista Crítica Histórica — Historia & Humanidades (4 etapas)

📝 CAMPOS PERSONALIZADOS
   1. Nombre (text) *
   2. Email (email) *
   3. WhatsApp (phone) *
   4. Área de Investigación (select) *
   5. Nivel Académico (select) *
   6. Artículo Listo (select) *
   7. Cuándo Publicar (select) *
   8. LGPD Aceptado (checkbox) *

╔════════════════════════════════════════════════════════════════╗
║                    ✅ AUDITORÍA COMPLETADA                   ║
╚════════════════════════════════════════════════════════════════╝

ℹ️  Reportes generados en carpeta: reports/
  • Formato JSON: ghl_audit_2026-08-06.json
  • Formato Markdown: ghl_audit_2026-08-06.md
```

---

## 📁 ARCHIVOS GENERADOS

Después de ejecutar el audit, encontrarás dos archivos en la carpeta `reports/`:

### 1. `ghl_audit_YYYY-MM-DD.json`
Formato JSON con toda la información estructurada:
```json
{
  "timestamp": "2026-08-06T15:32:20.000Z",
  "ghlLocationId": "XuChmr0YIHg823jqvZTN",
  "account": { ... },
  "summary": { ... },
  "data": {
    "tags": [ ... ],
    "pipelines": [ ... ],
    "customFields": [ ... ],
    "contactsSample": { ... }
  }
}
```

### 2. `ghl_audit_YYYY-MM-DD.md`
Formato Markdown legible para revisión:
- Información de la cuenta
- Resumen de estadísticas
- Lista de tags con colores
- Detalles de pipelines y etapas
- Campos personalizados
- Muestra de contactos
- Estado de configuración
- Próximos pasos

---

## ✅ INTERPRETACIÓN DEL REPORTE

### Estado COMPLETO (Fase 1 Finalizada)
```
✅ 9 tags creados
✅ 3 pipelines creados
✅ 8 campos personalizados creados
✅ Contactos siendo capturados
```

**Significa:** Puedes proceder a Fase 2 (Integración API)

### Estado INCOMPLETO (Fase 1 No Finalizada)
```
❌ 0 tags creados
❌ 0 pipelines creados
❌ 0 campos personalizados creados
```

**Significa:** Necesitas ejecutar primero:
```bash
npm run setup
# o
run_setup.bat
```

---

## 🔄 EJECUTAR AUDITORÍA REGULARMENTE

Se recomienda ejecutar el audit:

1. **Después de cada fase** - para validar que se crearon los elementos
2. **Semanalmente** - para monitorear el crecimiento de contactos
3. **Después de cambios** - si hiciste cambios manuales en GHL

---

## 🐛 TROUBLESHOOTING

### Error: "Cannot find module 'axios'"
```bash
npm install axios chalk dotenv
```

### Error: "401 Unauthorized"
- Verifica que el token en `.env` es correcto
- El token debe ser: `pit-fa036e1b-49a8-442d-99ff-cd86cc3ec5d5`

### Error: "Location not found"
- Verifica que el Location ID es: `XuChmr0YIHg823jqvZTN`
- Accede a GHL directamente para confirmar

### Error: "ENOENT: no such file or directory"
- Asegúrate de estar en la carpeta `Periodicos Alagoas/CRM`
- Verifica que `.env` existe en esa carpeta

---

## 📞 PRÓXIMOS PASOS

Después de revisar el reporte:

1. **Si Fase 1 está completa:**
   - Proceder a Fase 2: Integración API
   - Crear script que envíe leads desde formulario a GHL

2. **Si Fase 1 NO está completa:**
   - Ejecutar: `npm run setup`
   - Esperar a que se creen los elementos
   - Volver a ejecutar: `node scripts/ghl_audit.js`

---

**Documento:** GHL Audit Instructions  
**Versión:** 1.0  
**Última actualización:** 6 Agosto 2026
