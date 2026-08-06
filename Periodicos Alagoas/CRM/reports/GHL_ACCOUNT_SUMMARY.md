# 📊 RESUMEN DE CUENTA GHL - PERIODICOS ALAGOAS

**Generado:** 6 de Agosto 2026  
**Proyecto:** Conecta Pesquisadores UFAL  
**Estado:** 🔴 FASE 1 NO EJECUTADA AÚN

---

## ⚠️ NOTA IMPORTANTE

Este documento muestra la **CONFIGURACIÓN PLANEADA** para la cuenta de GHL. 
Para obtener el estado ACTUAL de tu cuenta, ejecuta:

```bash
node scripts/ghl_audit.js
```

---

## 🔐 CREDENCIALES DE LA CUENTA

| Campo | Valor |
|-------|-------|
| **Location ID** | `XuChmr0YIHg823jqvZTN` |
| **API Token** | `pit-fa036e1b-49a8-442d-99ff-cd86cc3ec5d5` |
| **API URL** | `https://api.gohighlevel.com/v1` |
| **Proyecto** | Conecta Pesquisadores UFAL |

---

## 📈 CONFIGURACIÓN PLANEADA

### TAGS (9 Totales)

#### Por Revista (3)
```
1. REPD
   └─ Color: #1E3A8A (Azul)
   └─ Descripción: Economia & Políticas Públicas

2. REVISTA_CIENCIA_AGRICOLA
   └─ Color: #10B981 (Verde)
   └─ Descripción: Agronomía & Producción

3. REVISTA_CRITICA_HISTORICA
   └─ Color: #9333EA (Púrpura)
   └─ Descripción: Historia & Humanidades
```

#### Por Cualificación (3)
```
4. LEAD_QUENTE
   └─ Color: #EF4444 (Rojo)
   └─ Descripción: Artículo listo - WhatsApp en 1 hora

5. LEAD_EDUCACIONAL
   └─ Color: #F97316 (Naranja)
   └─ Descripción: Estudiante explorando - Email sequence 3 días

6. LEAD_PARCIAL
   └─ Color: #9CA3AF (Gris)
   └─ Descripción: Solo datos básicos - Sin acción automática
```

#### Por Timeline (3)
```
7. INTENT_30_DIAS
   └─ Color: #3B82F6 (Azul)
   └─ Descripción: Publicar en próximos 30 días

8. INTENT_3_MESES
   └─ Color: #8B5CF6 (Púrpura)
   └─ Descripción: Publicar en próximos 3 meses

9. INTENT_6_MESES
   └─ Color: #EC4899 (Rosa)
   └─ Descripción: Publicar en próximos 6 meses

10. INTENT_SIN_FECHA
    └─ Color: #64748B (Gris oscuro)
    └─ Descripción: Sin fecha definida
```

---

### PIPELINES (3 Totales)

#### Pipeline 1: REPD
```
Nombre: REPD — Economia & Políticas Públicas
Descripción: Pipeline para pesquisadores de economia, desarrollo y políticas públicas
Tag Automático: REPD

Etapas:
  1. Nuevo Lead (lead recém capturado)
  2. Cualificado (lead passou pela qualificação)
  3. En Contacto (equipo entrando en contacto)
  4. Convertido (lead convertido en miembro)
```

#### Pipeline 2: Revista Ciência Agrícola
```
Nombre: Revista Ciência Agrícola — Agronomía & Producción
Descripción: Pipeline para pesquisadores de agronomia y producción
Tag Automático: REVISTA_CIENCIA_AGRICOLA

Etapas:
  1. Nuevo Lead
  2. Cualificado
  3. En Contacto
  4. Convertido
```

#### Pipeline 3: Revista Crítica Histórica
```
Nombre: Revista Crítica Histórica — Historia & Humanidades
Descripción: Pipeline para pesquisadores de história
Tag Automático: REVISTA_CRITICA_HISTORICA

Etapas:
  1. Nuevo Lead
  2. Cualificado
  3. En Contacto
  4. Convertido
```

---

### CAMPOS PERSONALIZADOS (8 Totales)

| # | Nombre | Tipo | Requerido | Opciones |
|---|--------|------|-----------|----------|
| 1 | Nombre | Text | ✅ Sí | - |
| 2 | Email | Email | ✅ Sí | - |
| 3 | WhatsApp | Phone | ✅ Sí | - |
| 4 | Área de Investigación | Select | ✅ Sí | Economía/Agronomía/Historia/Otra |
| 5 | Nivel Académico | Select | ✅ Sí | Grado/Maestría/Doctorado/Posdoctorado/Profesor |
| 6 | Artículo Listo | Select | ✅ Sí | Sí/Escribiendo/Explorando |
| 7 | Cuándo Publicar | Select | ✅ Sí | 30d/3m/6m/Sin fecha |
| 8 | LGPD Aceptado | Checkbox | ✅ Sí | - |

---

## 🚀 CÓMO CREAR ESTA ESTRUCTURA

### Opción 1: Automática (Recomendado)

```bash
cd "Periodicos Alagoas/CRM"

# Windows
run_setup.bat

# Mac/Linux
./run_setup.sh

# O manual
npm run setup
```

El script creará automáticamente todos los tags, pipelines y campos.

### Opción 2: Manual en GHL

1. **Crear Tags:**
   - Ir a Settings → Tags
   - Crear cada tag con nombre y color

2. **Crear Pipelines:**
   - Ir a Pipelines
   - Crear 3 pipelines con sus etapas

3. **Crear Campos Personalizados:**
   - Ir a Settings → Custom Fields
   - Crear 8 campos con tipos correctos

---

## 📊 ESTADO ESPERADO DESPUÉS DE FASE 1

Cuando ejecutes el script de setup, tu cuenta debería tener:

✅ **9 Tags**
  - 3 por revista
  - 3 de cualificación
  - 3 de timeline (+ 1 extra sin fecha)

✅ **3 Pipelines**
  - Cada uno con 4 etapas
  - Tags automáticos asignados

✅ **8 Campos Personalizados**
  - Todos los campos requeridos para el formulario
  - Tipos correctos (text, email, phone, select, checkbox)
  - Con opciones definidas

✅ **0 Contactos** (al inicio)
  - A medida que ejecutes las campañas, los contactos llegarán

---

## 🔍 CÓMO VERIFICAR

Después de ejecutar el setup, verifica que todo esté correcto:

### En GHL Directamente

1. **Verificar Tags:**
   - Settings → Tags
   - Deberías ver los 10 tags creados
   - Verifica nombres y colores

2. **Verificar Pipelines:**
   - Pipelines
   - Deberías ver 3 pipelines
   - Cada uno con 4 etapas

3. **Verificar Campos:**
   - Settings → Custom Fields
   - Deberías ver 8 campos
   - Verifica tipos y si son requeridos

### Usando el Script de Auditoría

```bash
node scripts/ghl_audit.js
```

Esto generará:
- `reports/ghl_audit_2026-08-06.json` - Formato JSON
- `reports/ghl_audit_2026-08-06.md` - Formato Markdown legible

---

## ❌ POSIBLES PROBLEMAS

### Problema: "Request failed with status code 404"
**Causa:** API URL incorrecta o Location ID inválido
**Solución:** 
- Verifica que `.env` tiene las credenciales correctas
- Accede a GHL directamente para confirmar tu Location ID

### Problema: "401 Unauthorized"
**Causa:** Token de API inválido
**Solución:**
- Verifica el token en `.env`
- Regenera el token en GHL si es necesario

### Problema: Tags/Pipelines ya existen
**Causa:** Fase 1 ya fue ejecutada
**Solución:**
- Es normal - el script saltará elementos existentes
- Continúa a Fase 2

---

## 📋 PRÓXIMOS PASOS

1. **Verificar Credenciales** ✅
   - Asegúrate que `.env` tiene valores correctos

2. **Ejecutar Setup** 
   ```bash
   npm run setup
   ```

3. **Verificar Estructura**
   ```bash
   node scripts/ghl_audit.js
   ```

4. **Proceder a Fase 2**
   - Crear script de integración API
   - Conectar formulario con GHL

---

## 📞 REFERENCIA RÁPIDA

**Credenciales de Conexión:**
```
Location ID:  XuChmr0YIHg823jqvZTN
API Token:    pit-fa036e1b-49a8-442d-99ff-cd86cc3ec5d5
API URL:      https://api.gohighlevel.com/v1
```

**Scripts Disponibles:**
- `npm run setup` - Crear estructura automáticamente
- `node scripts/ghl_audit.js` - Auditar cuenta actual
- `run_setup.bat` - Ejecutor Windows
- `./run_setup.sh` - Ejecutor Mac/Linux

---

**Documento:** GHL Account Summary  
**Versión:** 1.0  
**Última actualización:** 6 Agosto 2026  
**Estado:** 🔴 CONFIGURACIÓN PLANEADA (NO EJECUTADA)
