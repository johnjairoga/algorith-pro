# 📅 ESTRUCTURA FINAL DE CALENDARIOS - CLÍNICA DERMATOLÓGICA PUEBLA

**Fecha:** 27 de agosto de 2026  
**Base:** 3 Doctores + 8 Servicios  
**Estrategia Seleccionada:** OPCIÓN A (Calendarios por Servicio)  
**Estado:** ✅ LISTA PARA IMPLEMENTAR

---

## 👥 DOCTORES DISPONIBLES

| # | Nombre | Especialidades | Email | Tel Laboral |
|---|--------|---|---|---|
| 1 | **Dra. Anja Arellano M.** | Cirugía Estética, Restauración Capilar, Láser | anja.arellano@gmail.com | 81 46 82 32 89 |
| 2 | **Dr. Aristides Arellano Huacuja** | Cirugía Plástica, Estética y Reconstructiva | aristidesarella@yahoo.com.mx | 22 23 23 09 72 |
| 3 | **Dra. Dafne Arellano Montalvo** | Medicina Estética | [Por confirmar] | [Por confirmar] |

---

## 📋 MAPEO: DOCTORES → SERVICIOS

```
Dra. Anja Arellano M.
├─ ✅ Cirugía Plástica Facial
├─ ✅ Cirugía Plástica Corporal
├─ ✅ Cirugía de Restauración Capilar
├─ ✅ Tratamiento de Restauración Capilar
└─ ✅ Tratamientos Láser

Dr. Aristides Arellano Huacuja
├─ ✅ Cirugía Plástica Facial
├─ ✅ Cirugía Plástica Corporal
├─ ✅ Medicina Estética Antienvejecimiento
└─ ✅ Dermatología y Alergias (si aplica)

Dra. Dafne Arellano Montalvo
├─ ✅ Medicina Estética Antienvejecimiento
├─ ✅ Moldeo Corporal (si está capacitada)
└─ ✅ Dermatología y Alergias
```

---

## 📅 LOS 8 CALENDARIOS

### **1. CIRUGÍA PLÁSTICA FACIAL**
- **Duración:** 180-210 minutos
- **Doctores:** Dra. Anja, Dr. Aristides
- **Pipeline:** Consulta Inicial (1)
- **Descripción:** Rinoplastia, blepharoplastia, lifting
- **Color:** #D32F2F (Rojo)

### **2. CIRUGÍA PLÁSTICA CORPORAL**
- **Duración:** 210-270 minutos
- **Doctores:** Dra. Anja, Dr. Aristides
- **Pipeline:** Consulta Inicial (1)
- **Descripción:** Abdominoplastia, liposucción, aumento de senos
- **Color:** #C2185B (Rosa)

### **3. CIRUGÍA DE RESTAURACIÓN CAPILAR**
- **Duración:** 300-390 minutos
- **Doctores:** Dra. Anja
- **Pipeline:** Consulta Inicial (1)
- **Descripción:** Injertos de cabello FUE/FUT, trasplante capilar
- **Color:** #7B1FA2 (Púrpura)

### **4. TRATAMIENTO DE RESTAURACIÓN CAPILAR**
- **Duración:** 60 minutos
- **Doctores:** Dra. Anja, Dr. Aristides
- **Pipeline:** Recurrencia (4)
- **Sesiones:** 4-6 cada 3-4 semanas
- **Descripción:** PRP, mesoterapia, láser baja potencia
- **Color:** #512DA8 (Morado oscuro)

### **5. MOLDEO CORPORAL**
- **Duración:** 75-105 minutos
- **Doctores:** Dra. Dafne (+ Técnico si lo hay)
- **Pipeline:** Aparatología (2)
- **Sesiones:** 2-4 cada 4-6 semanas
- **Descripción:** CoolSculpting, radiofrecuencia, ultrasonido
- **Color:** #1976D2 (Azul)

### **6. TRATAMIENTOS LÁSER**
- **Duración:** 45-75 minutos
- **Doctores:** Dra. Anja
- **Pipeline:** Aparatología (2)
- **Sesiones:** 4-8 cada 4-6 semanas
- **Descripción:** Depilación, resurfacing, cicatrices, rejuvenecimiento
- **Color:** #F57F17 (Naranja)

### **7. MEDICINA ESTÉTICA ANTIENVEJECIMIENTO**
- **Duración:** 30-55 minutos
- **Doctores:** Dr. Aristides, Dra. Dafne
- **Pipeline:** Recurrencia (4) - VIP
- **Ciclo:** Botox c/90 días, Fillers c/6-12 meses
- **Descripción:** Botox, fillers, PRP, inyectables
- **Color:** #388E3C (Verde)

### **8. DERMATOLOGÍA Y ALERGIAS**
- **Duración:** 40-55 minutos
- **Doctores:** Dr. Aristides, Dra. Dafne
- **Pipeline:** Consulta Inicial (1)
- **Descripción:** Consulta dermatológica general, acné, alergias
- **Color:** #00796B (Verde oscuro)

---

## 🔀 VINCULACIÓN: CALENDARIOS ↔ PIPELINES

```
PIPELINE 1: CONSULTA INICIAL
├─ Calendario: Dermatología y Alergias (40-55 min)
├─ Calendario: Cirugía Plástica Facial (180-210 min)
├─ Calendario: Cirugía Plástica Corporal (210-270 min)
└─ Calendario: Cirugía de Restauración Capilar (300-390 min)

PIPELINE 2: APARATOLOGÍA
├─ Calendario: Tratamientos Láser (45-75 min)
└─ Calendario: Moldeo Corporal (75-105 min)

PIPELINE 3: INACTIVOS + REACTIVACIÓN
└─ Reutiliza calendarios de otros pipelines

PIPELINE 4: RECURRENCIA
├─ Calendario: Medicina Estética (30-55 min) ← VIP
└─ Calendario: Tratamiento Restauración Capilar (60 min)
```

---

## 🎯 FLUJO DE UN PACIENTE

```
PACIENTE NUEVO BOTOX
├─ Lead llega (WhatsApp/formulario)
├─ Abre: PIPELINE 1 - CONSULTA INICIAL
├─ Agenda en: "Medicina Estética" 
│  (Sistema asigna: Dr. Aristides o Dra. Dafne)
├─ Consulta realizada → Paciente decide hacer Botox
├─ Mueve a: PIPELINE 4 - RECURRENCIA
├─ Configura ciclo: cada 90 días
├─ Sistema crea recordatorios automáticos
└─ Loop: Cada 90 días, paciente agenda nueva sesión

PACIENTE CON LÁSER DEPILACIÓN
├─ Lead llega
├─ Abre: PIPELINE 1 - CONSULTA INICIAL
├─ Agenda en: "Dermatología y Alergias"
│  (Sistema asigna: Dr. Aristides o Dra. Dafne)
├─ Consulta realizada → Quiere láser
├─ Mueve a: PIPELINE 2 - APARATOLOGÍA
├─ Agenda en: "Tratamientos Láser"
│  (Sistema asigna: Dra. Anja - especialista)
├─ Plan: 6-8 sesiones cada 4-6 semanas
└─ Después: Ofrece mantenimiento o pasa a PIPELINE 4
```

---

## ⏰ HORARIOS DE OPERACIÓN

**Por confirmar con la clínica:**
```
Lunes a Viernes: 9:00 AM - 6:00 PM (estándar propuesto)
Sábado: [¿Abierto? Horas limitadas?]
Domingo: Cerrado

¿Hay hora de almuerzo donde no se agenda?
¿Hay horarios específicos para cirugías?
```

---

## 🔧 CONFIGURACIÓN TÉCNICA POR CALENDARIO

Cada calendario tendrá:

✅ **Datos básicos:**
- Nombre, descripción, color
- Slug (url-friendly)
- Duración del slot

✅ **Disponibilidad:**
- Horario de operación: 9:00 AM - 6:00 PM
- Buffer: 15 min entre citas
- Pre-buffer: 10 min antes

✅ **Doctores asignados:**
- Round Robin: Sistema distribuye entre doctores disponibles
- Prioridad: Si un doctor está sobrecargado, pasa al siguiente

✅ **Integración con Pipelines:**
- Cada calendario vinculado a automaciones de su pipeline
- Recordatorios automáticos según tipo de procedimiento
- Instrucciones pre/post específicas

✅ **Configuración de pacientes:**
- Pueden reprogramar hasta 24h antes
- Pueden cancelar hasta 48h antes (reembolso según política)
- Confirmación automática 24h antes

---

## ✅ RESUMEN

| # | Calendario | Duración | Doctores | Pipeline | Sesiones |
|---|-----------|----------|----------|----------|----------|
| 1 | Cirugía Plástica Facial | 180-210 min | Dra. Anja, Dr. Aristides | 1 | 1 (única) |
| 2 | Cirugía Plástica Corporal | 210-270 min | Dra. Anja, Dr. Aristides | 1 | 1 (única) |
| 3 | Cirugía Restauración Capilar | 300-390 min | Dra. Anja | 1 | 1 (única) |
| 4 | Tratamiento Restauración Capilar | 60 min | Dra. Anja, Dr. Aristides | 4 | 4-6 (recurrente) |
| 5 | Moldeo Corporal | 75-105 min | Dra. Dafne | 2 | 2-4 (recurrente) |
| 6 | Tratamientos Láser | 45-75 min | Dra. Anja | 2 | 4-8 (recurrente) |
| 7 | Medicina Estética | 30-55 min | Dr. Aristides, Dra. Dafne | 4 | ∞ (VIP recurrente) |
| 8 | Dermatología y Alergias | 40-55 min | Dr. Aristides, Dra. Dafne | 1 | 1 o recurrente |

---

## 🚀 PRÓXIMOS PASOS

1. ✅ Confirmar horarios de operación (¿9-6? ¿hay otros horarios?)
2. ✅ Confirmar: ¿Dra. Dafne puede hacer moldeo corporal?
3. ✅ Obtener email/teléfono de Dra. Dafne
4. ⏳ Crear los 8 calendarios en GHL
5. ⏳ Vincular team members a cada calendario
6. ⏳ Configurar automaciones por pipeline
7. ⏳ Testing de agendamiento

---

**Estructura validada: ✅**  
**Lista para crear calendarios: ✅**  
**Esperar confirmación de horarios: ⏳**
