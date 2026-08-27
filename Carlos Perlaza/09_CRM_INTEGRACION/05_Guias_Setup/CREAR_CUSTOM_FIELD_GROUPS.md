# 📁 GUÍA: CREAR CARPETAS DE CAMPOS PERSONALIZADOS EN GHL

**Clínica:** Dermatológica Puebla - Carlos Perlaza  
**Fecha:** 14 de agosto de 2026  
**Duración estimada:** 20-30 minutos  
**Requisitos:** Acceso a GHL Console (Settings → Custom Fields)

---

## 🎯 ¿QUÉ SON LAS CARPETAS DE CAMPOS (CUSTOM FIELD GROUPS)?

En GHL, los **Custom Field Groups** son carpetas que organizan campos personalizados por tema o categoría. Esto hace que:

✅ Sea más fácil encontrar campos (no están todos mezclados)  
✅ La interfaz sea más limpia y profesional  
✅ Nuevos usuarios sepan dónde buscar cada dato  
✅ Se mantenga consistencia entre clientes  

---

## 🚀 PASO A PASO: CREAR CARPETAS

### **PASO 1: Acceder a Custom Fields en GHL**

1. Inicia sesión en [GHL Console](https://app.gohighlevel.com)
2. Ve a **Settings** (⚙️ ícono abajo a la izquierda)
3. Selecciona **Custom Fields**
4. Verás dos opciones:
   - **Opportunities** (Oportunidades)
   - **Contacts** (Contactos)

---

## 📋 CREAR CARPETAS PARA OPORTUNIDADES

Vamos a crear **9 carpetas** en este orden:

### **1️⃣ CARPETA: "Financiero" 💰**

```
GHL Console
└─ Settings
   └─ Custom Fields
      └─ Opportunities
         └─ + Add Group
```

**Pasos:**
1. Click en **+ Add Group** (o "+ New Field Group")
2. Nombre: `Financiero`
3. Descripción (opcional): `Campos de valores y moneda`
4. Haz clic en **Create Group**

**Campos que van aquí:**
- Valor restante a pagar
- Valor Fechado
- Valor do lead

---

### **2️⃣ CARPETA: "Fechas y Programación" 📅**

**Nombre:** `Fechas y Programación`  
**Descripción:** `Gestión de fechas importantes y cronograma`

**Campos que van aquí:**
- Previsão da data de fechamiento esperada
- Data Pagamento
- Data Fin Programa
- Data Inicio Programa
- Período da data de tratamiento esperado
- Data Agendamiento

---

### **3️⃣ CARPETA: "Pipeline y Gestión" 🏷️**

**Nombre:** `Pipeline y Gestión`  
**Descripción:** `Información de pipeline y etapas`

**Campos que van aquí:**
- Nome da oportunidade
- Pipeline
- Etapa
- Status

---

### **4️⃣ CARPETA: "Origen y Tracking" 🔗**

**Nombre:** `Origen y Tracking`  
**Descripción:** `Fuentes de origen y parámetros de tracking`

**Campos que van aquí:**
- Origen
- Fonte da oportunidade
- Source Type
- Source Ads
- UTM Campaign
- UTM Medium
- UTM Source

---

### **5️⃣ CARPETA: "Productos y Servicios" 🛍️**

**Nombre:** `Productos y Servicios`  
**Descripción:** `Información de productos y servicios contratados`

**Campos que van aquí:**
- Produtos Adquiridos
- Programa Vendido
- Renovación

---

### **6️⃣ CARPETA: "Métodos de Pago" 💳**

**Nombre:** `Métodos de Pago`  
**Descripción:** `Formas y plataformas de pago`

**Campos que van aquí:**
- Forma de Pagamento
- Plataforma Checkout

---

### **7️⃣ CARPETA: "Consulta y Atendimiento" 📞**

**Nombre:** `Consulta y Atendimiento`  
**Descripción:** `Información de consultas y seguimiento`

**Campos que van aquí:**
- Día da Semana Consulta
- Horário da consulta
- Número da consulta
- Canal Consulta
- Día para envio do checkin

---

### **8️⃣ CARPETA: "Equipo y Responsables" 👤**

**Nombre:** `Equipo y Responsables`  
**Descripción:** `Personas responsables de la oportunidad`

**Campos que van aquí:**
- Vendedor Responsável
- Propriedário
- Médico de Perda

---

### **9️⃣ CARPETA: "Pérdida y Análisis" ❌**

**Nombre:** `Pérdida y Análisis`  
**Descripción:** `Motivos de pérdida y análisis de probabilidad`

**Campos que van aquí:**
- Motivo de Perda
- Probabilidade de previsão

---

## 👥 CREAR CARPETAS PARA CONTACTOS

Ahora vamos a crear **6 carpetas** en **Contacts**:

### **1️⃣ CARPETA: "Oportunidades Abiertas" 🔄**

**Nombre:** `Oportunidades Abiertas`  
**Descripción:** `Oportunidades activas del contacto`

**Campos que van aquí:**
- Op Abierta Nutrición
- Op Abierta Onboarding
- Op Abierta Fidelización
- Op Abierta Comercial

---

### **2️⃣ CARPETA: "Seguimiento y Control" 📊**

**Nombre:** `Seguimiento y Control`  
**Descripción:** `Métricas de seguimiento del contacto`

**Campos que van aquí:**
- Cantidad de Follow-ups
- Próximo Retorno Estimado
- Cantidad de Procedimientos
- Origen do Lead
- Data Entrada

---

### **3️⃣ CARPETA: "Información de Empresa" 🏢**

**Nombre:** `Información de Empresa`  
**Descripción:** `Datos de la empresa o negocio`

**Campos que van aquí:**
- Nome comercial
- Website
- Fuso horário

---

### **4️⃣ CARPETA: "Dirección y Ubicación" 📍**

**Nombre:** `Dirección y Ubicación`  
**Descripción:** `Información de dirección completa`

**Campos que van aquí:**
- Rua
- Cidade
- Estado
- País
- Código postal

---

### **5️⃣ CARPETA: "Datos Personales" 👤**

**Nombre:** `Datos Personales`  
**Descripción:** `Información personal del contacto`

**Campos que van aquí:**
- Nome
- Sobrenome
- E-mail
- Telefone
- Data de nascimento

---

### **6️⃣ CARPETA: "Clasificación" 📌**

**Nombre:** `Clasificación`  
**Descripción:** `Tipología y origen del contacto`

**Campos que van aquí:**
- Fonte de contato
- Tipo de contato

---

## ✅ CHECKLIST DE CREACIÓN

### OPORTUNIDADES (9 carpetas)
```
□ Financiero (3 campos)
□ Fechas y Programación (6 campos)
□ Pipeline y Gestión (4 campos)
□ Origen y Tracking (7 campos)
□ Productos y Servicios (3 campos)
□ Métodos de Pago (2 campos)
□ Consulta y Atendimiento (5 campos)
□ Equipo y Responsables (3 campos)
□ Pérdida y Análisis (2 campos)

Total: 9 carpetas, 35 campos
```

### CONTACTOS (6 carpetas)
```
□ Oportunidades Abiertas (4 campos)
□ Seguimiento y Control (5 campos)
□ Información de Empresa (3 campos)
□ Dirección y Ubicación (5 campos)
□ Datos Personales (5 campos)
□ Clasificación (2 campos)

Total: 6 carpetas, 24 campos
```

**TOTAL GENERAL: 15 carpetas, 50 campos**

---

## 💡 TIPS IMPORTANTES

✅ **Orden Lógico:** Las carpetas deben tener un orden lógico que tenga sentido para el usuario  
✅ **Nombres Claros:** Usa nombres que sean descriptivos y en español  
✅ **Descripciones:** Agrega descripciones breves (opcional pero recomendado)  
✅ **Consistencia:** Usa los mismos nombres de carpetas para todos los clientes (para que sea predecible)

---

## 🎯 DESPUÉS DE CREAR CARPETAS

Una vez creadas todas las carpetas:

1. **Mover campos a sus carpetas**
   - Cada campo debe estar asignado a su carpeta correspondiente
   - En GHL, al crear un campo puedes elegir a qué grupo pertenece

2. **Verificar en la interfaz**
   - Ve a Opportunities o Contacts
   - Deberías ver las carpetas expandibles con sus campos dentro

3. **Documentar en tu sistema**
   - Guardar screenshot de la estructura final
   - Crear manual para nuevos usuarios

---

## 📱 VER CARPETAS EN ACCIÓN

Una vez creadas, cuando crees una oportunidad o contacto, verás algo como esto:

```
📋 Nueva Oportunidad
├─ 💰 Financiero
│  ├─ Valor restante a pagar
│  ├─ Valor Fechado
│  └─ Valor do lead
│
├─ 📅 Fechas y Programación
│  ├─ Data Pagamento
│  ├─ Data Agendamiento
│  └─ (3 más)
│
├─ 🏷️ Pipeline y Gestión
│  ├─ Nome da oportunidade
│  ├─ Pipeline
│  └─ (2 más)
│
... (6 carpetas más)
```

---

## 🚀 PRÓXIMOS PASOS

1. ✅ Crear las 15 carpetas en GHL
2. ⏳ Asignar campos a cada carpeta
3. ⏳ Verificar que todo esté organizado correctamente
4. ⏳ Crear automaciones que usen estos campos
5. ⏳ Capacitar al equipo sobre la nueva estructura

---

**Tiempo estimado:** 20-30 minutos para toda la estructura  
**Dificultad:** ⭐ Fácil  
**Beneficio:** ⭐⭐⭐⭐⭐ Muy alto (organización y usabilidad)

---

**Documento generado:** 14 de agosto de 2026  
**Responsable:** Claude Code (Algorith Pro)
