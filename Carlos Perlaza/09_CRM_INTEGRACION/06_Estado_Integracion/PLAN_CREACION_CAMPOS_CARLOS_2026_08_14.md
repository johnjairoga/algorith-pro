# 🚀 PLAN DE CREACIÓN: 40 CAMPOS PERSONALIZADOS

**Proyecto:** Carlos Perlaza - Clínica Dermatológica  
**Fecha:** 14 de agosto de 2026  
**Responsable:** Claude Code  
**Estado:** ✅ LISTO PARA EJECUTAR

---

## 📋 RESUMEN EJECUTIVO

Se ha completado la preparación para crear los **40 campos personalizados** de la clínica de Carlos Perlaza mediante API GHL.

### Estado Actual

| Componente | Estado | Archivo/Script |
|-----------|--------|----------------|
| ✅ **Pipelines** | Creados (4/4) | PIPELINES_CREADOS.md |
| ✅ **Validación de campos** | Ejecutado (0/40 encontrados) | obtener-campos-existentes.mjs |
| ✅ **Documentación de campos** | Completa | CAMPOS_PERSONALIZADOS_GHL.md |
| ✅ **Guía de carpetas** | Disponible | CREAR_CUSTOM_FIELD_GROUPS.md |
| ✅ **Script de creación** | Listo | criar-40-campos-carlos.js |
| ⏳ **Carpetas en GHL** | Pendiente (manual) | - |
| ⏳ **Campos en GHL** | Pendiente (script) | - |

---

## 🎯 PLAN DE ACCIÓN: 2 PASOS

### PASO 1: CREAR 15 CARPETAS EN GHL CONSOLE (20-30 min)

**Ubicación:** GHL Console → Settings → Custom Fields

**Carpetas a crear:**

#### Oportunidades (9 carpetas)
1. ✔️ Financiero
2. ✔️ Fechas y Programación
3. ✔️ Origen y Tracking
4. ✔️ Productos y Servicios
5. ✔️ Métodos de Pago
6. ✔️ Consulta y Atendimiento
7. ✔️ Equipo y Responsables
8. ✔️ Pérdida y Análisis

#### Contactos (6 carpetas)
9. ✔️ Oportunidades Abiertas
10. ✔️ Seguimiento y Control
11. ✔️ Información de Empresa
12. ✔️ Dirección y Ubicación
13. ✔️ Datos Personales
14. ✔️ Clasificación

**Guía:** Ver `CREAR_CUSTOM_FIELD_GROUPS.md`

**IMPORTANTE:** Guardar los IDs de cada carpeta después de crearlas

---

### PASO 2: CREAR 40 CAMPOS POR API (automatizado)

**Script:** `hub/criar-40-campos-carlos.js`

**Pasos:**

1. **Obtener IDs de carpetas** (del Paso 1)
   ```
   Copiar los IDs de cada carpeta creada en GHL
   ```

2. **Actualizar el script**
   ```javascript
   // En hub/criar-40-campos-carlos.js, línea ~29
   const FOLDER_IDS = {
     financiero: 'ID_REAL_AQUI',
     fechas: 'ID_REAL_AQUI',
     // ... etc
   };
   ```

3. **Ejecutar el script**
   ```bash
   cd "c:/Users/John/Desktop/John Jairo/Clientes/algorith-pro/Carlos Perlaza/09_CRM_PROPIA/hub"
   node criar-40-campos-carlos.js
   ```

4. **Verificar resultado**
   ```bash
   # Re-validar con el script de lectura
   node obtener-campos-existentes.mjs
   
   # Resultado esperado:
   # ✅ Total Existentes: 40
   # ❌ Total Faltantes: 0
   # 📊 Progreso: 100%
   ```

---

## 📊 DETALLES TÉCNICOS

### Endpoint de API Utilizado

```
POST https://services.leadconnectorhq.com/locations/{locationId}/customFields
```

### Headers Requeridos

```
Authorization: Bearer {GHL_PIT_TOKEN}
Content-Type: application/json
Accept: application/json
Version: 2021-07-28
```

### Payload Ejemplo

```json
{
  "name": "Valor Restante a Pagar",
  "dataType": "NUMERICAL",
  "model": "opportunity",
  "parentId": "ID_DE_LA_CARPETA",
  "description": "Saldo pendiente de pago",
  "showInForms": true,
  "position": 0
}
```

### DataTypes Soportados

| DataType | Uso | Ejemplo |
|----------|-----|---------|
| TEXT | Texto corto | "Nombre del vendedor" |
| NUMERICAL | Números | Cantidad, Porcentaje |
| DATE | Fechas | "Data Pagamento" |
| SINGLE_OPTIONS | Dropdown simple | "Origen" (una opción) |
| MULTIPLE_OPTIONS | Dropdown múltiple | "Productos Adquiridos" |

---

## 🔄 FLUJO COMPLETO

```
1. Validación de conexión GHL
   └─ ✅ COMPLETADO (validar-conexion-carlos.mjs)

2. Crear 4 pipelines
   └─ ✅ COMPLETADO (crear-pipelines-carlos.mjs)
   └─ Resultado: 17 etapas en 4 pipelines

3. Validar campos existentes
   └─ ✅ COMPLETADO (obtener-campos-existentes.mjs)
   └─ Resultado: 0 de 40 encontrados

4. Crear 15 carpetas (MANUAL en GHL Console)
   └─ ⏳ PENDIENTE
   └─ Tiempo: 20-30 minutos

5. Crear 40 campos (AUTOMATIZADO por API)
   └─ ⏳ PENDIENTE (script listo)
   └─ Script: criar-40-campos-carlos.js
   └─ Tiempo: <1 minuto

6. Validar campos creados
   └─ ⏳ PENDIENTE
   └─ Script: node obtener-campos-existentes.mjs
   └─ Tiempo: <1 minuto

7. Configurar automaciones (PRÓXIMO HITO)
   └─ ⏳ NO INICIADO
```

---

## 📁 ESTRUCTURA DE ARCHIVOS

```
Carlos Perlaza/09_CRM_INTEGRACION/
├─ 04_Documentacion_Tecnica/
│  ├─ CAMPOS_PERSONALIZADOS_GHL.md
│  ├─ CAMPOS_PREDEFINIDOS_VS_PERSONALIZADOS.md
│  └─ PIPELINES_CREADOS.md
│
├─ 05_Guias_Setup/
│  ├─ CREAR_CUSTOM_FIELD_GROUPS.md
│  └─ CREAR_40_CAMPOS_PERSONALIZADOS.md (manual - opcional)
│
├─ 06_Estado_Integracion/
│  ├─ ESTADO_CAMPOS_PERSONALIZADOS.md
│  ├─ PLAN_CREACION_CAMPOS_CARLOS_2026_08_14.md (este archivo)
│  └─ PIPELINES_CREADOS.md
│
└─ 09_CRM_PROPIA/hub/
   ├─ .env (credenciales)
   ├─ obtener-campos-existentes.mjs (lectura)
   ├─ crear-pipelines-carlos.mjs (✅ exitoso)
   ├─ criar-40-campos-carlos.js (✅ listo)
   └─ config/
      ├─ campos-existentes.json
      └─ pipelines-creados.json
```

---

## ✅ CHECKLIST

### Pre-Ejecución

- [ ] Revisar el script `criar-40-campos-carlos.js`
- [ ] Verificar que `.env` tiene `GHL_LOCATION_ID` y `GHL_PIT_TOKEN` correctos
- [ ] Crear las 15 carpetas en GHL Console
- [ ] Obtener y guardar los IDs de carpetas
- [ ] Actualizar `FOLDER_IDS` en el script

### Ejecución

- [ ] Ejecutar: `node criar-40-campos-carlos.js`
- [ ] Verificar que no hay errores en la salida
- [ ] Revisar en GHL Console que se crearon los 40 campos

### Post-Ejecución

- [ ] Ejecutar: `node obtener-campos-existentes.mjs`
- [ ] Verificar resultado: `40/40 campos encontrados`
- [ ] Actualizar `ESTADO_CAMPOS_PERSONALIZADOS.md` con resultado final
- [ ] Hacer commit y push a GitHub
- [ ] Proceder con configuración de automaciones

---

## 📞 CONTACTO & SOPORTE

**Si algo sale mal:**

1. **Error de autenticación (401):**
   - Verificar que el `.env` tiene `GHL_PIT_TOKEN` válido
   - Regenerar el PIT token si es necesario

2. **Error de carpeta no encontrada (404):**
   - Asegurar que los `FOLDER_IDS` son correctos
   - Verificar que las carpetas fueron creadas en GHL Console

3. **Error en la creación de campo:**
   - Revisar que el `dataType` sea válido
   - Verificar que el `parentId` existe
   - Revisar logs del script

---

## 📈 PRÓXIMOS PASOS (DESPUÉS DE CREAR CAMPOS)

1. **Semana 3:** Configurar automaciones (workflows)
2. **Semana 3:** Crear etiquetas/tags automáticas
3. **Semana 4:** Integración WhatsApp API
4. **Semana 4:** Integración Stripe
5. **Semana 4:** Testing end-to-end

---

**Documento generado:** 14 de agosto de 2026  
**Responsable:** Claude Code (Algorith Pro)  
**Estado:** ✅ LISTO PARA EJECUTAR

**Última actualización:** 14/08/2026 - Descubrimiento del endpoint correcto

