# 📅 ESTRUCTURA DE CALENDARIOS/SERVICIOS - CLÍNICA DERMATOLÓGICA PUEBLA

**Documento:** Recomendación de Calendarios para GHL  
**Fecha:** 26 de agosto de 2026  
**Base:** Servicios listados en sitio web + Estructura 4 Pipelines  
**Estado:** 🔴 REQUIERE CONFIRMACIÓN DE DURACIONES Y HORARIOS

---

## 🎯 PRINCIPIO

Crear **UN CALENDARIO POR CADA PROCEDIMIENTO/SERVICIO** que aparece en el menú del sitio web.

Esto permite que:
- ✅ Pacientes agendan el servicio específico que desean
- ✅ Sistema asigna duración correcta (cirugía ≠ consulta)
- ✅ Filtrado automático por doctor especializado
- ✅ Recordatorios específicos por tipo de procedimiento

---

## 📋 CALENDARIOS PROPUESTOS (8 SERVICIOS PRINCIPALES)

### 1️⃣ CIRUGÍA PLÁSTICA FACIAL

**Nombre del Calendar en GHL:** `Cirugía Plástica Facial`

**Procedimientos incluidos (ejemplos):**
- Rinoplastia
- Blepharoplastia (cirugía de párpados)
- Lifting facial
- Otras cirugías faciales

**Duración estimada:**
- Consulta previa: 30-45 min
- Procedimiento quirúrgico: **150-180 min** (2.5-3 horas)
- Buffer post-procedimiento: 30 min

**Duración total en calendario:** `180-210 min` ⏱️

**Requiere:**
- ✅ Consulta previa (Pipeline 1)
- ✅ Consentimiento informado
- ✅ Evaluación médica completa
- ✅ Período de recuperación (documentar días de incapacidad)

**Instrucciones pre-procedimiento:**
- No comer/beber 8 horas antes
- No tomar aspirina 1 semana antes
- Traer acompañante (conducción post-operatoria)
- Llegar 30 min antes

**Instrucciones post-procedimiento:**
- Reposo 3-5 días
- No conducir durante 24-48h
- Vendajes específicos
- Medicinas: antibióticos + analgésicos
- Seguimiento a 48h, 1 semana, 2 semanas

**Disponibilidad:** ⏰ [A DEFINIR - Horarios específicos para cirugías]

**Doctores que pueden hacer esto:** [A DEFINIR - Cuáles tienen especialidad en cirugía facial]

---

### 2️⃣ CIRUGÍA PLÁSTICA CORPORAL

**Nombre del Calendar en GHL:** `Cirugía Plástica Corporal`

**Procedimientos incluidos (ejemplos):**
- Abdominoplastia
- Liposucción
- Aumento de senos
- Reducción de senos
- Otras cirugías corporales

**Duración estimada:**
- Consulta previa: 30-45 min
- Procedimiento quirúrgico: **180-240 min** (3-4 horas)
- Buffer post-procedimiento: 30 min

**Duración total en calendario:** `210-270 min` ⏱️

**Requiere:**
- ✅ Consulta previa (Pipeline 1)
- ✅ Evaluación médica completa
- ✅ Consentimiento informado
- ✅ Análisis de laboratorio (posiblemente)

**Instrucciones pre-procedimiento:**
- Ayuno 8 horas
- No tomar aspirina 1 semana antes
- Traer acompañante
- Usar ropa cómoda para ir

**Instrucciones post-procedimiento:**
- Reposo 5-7 días
- No conducir 48h
- Compresión (faja/vendaje) 2-4 semanas
- Medicinas: antibióticos + analgésicos + drenaje si aplica
- Seguimiento a 48h, 1 semana, 2 semanas, 1 mes

**Disponibilidad:** ⏰ [A DEFINIR]

**Doctores:** [A DEFINIR - Especialistas en cirugía corporal]

---

### 3️⃣ CIRUGÍA DE RESTAURACIÓN CAPILAR

**Nombre del Calendar en GHL:** `Cirugía de Restauración Capilar`

**Procedimientos incluidos:**
- Injertos de cabello (FUE, FUT)
- Trasplante capilar

**Duración estimada:**
- Consulta previa: 30-45 min
- Procedimiento quirúrgico: **240-360 min** (4-6 horas)
- Buffer: 30 min

**Duración total en calendario:** `300-390 min` ⏱️

**Requiere:**
- ✅ Consulta previa (evaluación de zona donante/receptora)
- ✅ Análisis de compatibilidad capilar
- ✅ Consentimiento informado

**Instrucciones pre-procedimiento:**
- Lavar cabello la noche anterior
- No usar productos en cabello
- Evitar alcohol 48h antes
- Traer gorro/sombrero para después

**Instrucciones post-procedimiento:**
- No lavar cabello 48-72h
- Evitar tocar zona injertada
- Dormir con cabeza elevada
- Resultados visibles: 3-6 meses
- Seguimiento: 1 semana, 1 mes, 3 meses

**Disponibilidad:** ⏰ [A DEFINIR]

**Doctores:** [A DEFINIR - Especialista en injertos]

---

### 4️⃣ TRATAMIENTO DE RESTAURACIÓN CAPILAR (NO-QUIRÚRGICO)

**Nombre del Calendar en GHL:** `Tratamiento de Restauración Capilar`

**Procedimientos incluidos:**
- PRP capilar
- Mesoterapia capilar
- Láser de baja potencia para cabello
- Otros tratamientos no-quirúrgicos

**Duración estimada:**
- Duración: **45-60 min**
- Buffer: 15 min

**Duración total en calendario:** `60 min` ⏱️

**Requiere:**
- ✅ Consulta previa (Pipeline 1)
- ⚠️ Evaluación de alopecia/causas
- ⚠️ Ciclo de múltiples sesiones (típicamente 4-6 sesiones cada 3-4 semanas)

**Instrucciones pre-procedimiento:**
- Evitar alcohol 24h antes
- No usar productos químicos 48h antes
- Llegar con cabello limpio

**Instrucciones post-procedimiento:**
- No lavar cabello 24h
- Evitar sol directo 48h
- No usar secador 1 semana
- Continuidad: próxima sesión en 3-4 semanas

**Tipo de Pipeline:** 🔄 **RECURRENCIA (Pipeline 4)**
- Sesiones múltiples espaciadas (cada 3-4 semanas)
- Necesita recordatorios automáticos para próxima cita

**Disponibilidad:** ⏰ [A DEFINIR]

**Doctores:** [A DEFINIR]

---

### 5️⃣ MOLDEO CORPORAL

**Nombre del Calendar en GHL:** `Moldeo Corporal`

**Procedimientos incluidos:**
- CoolSculpting / Criolipolisis
- Radiofrecuencia corporal
- Ultrasonido cavitacional
- Otros tratamientos de contorneado

**Duración estimada:**
- Duración: **60-90 min** (según área tratada)
- Buffer: 15 min

**Duración total en calendario:** `75-105 min` ⏱️

**Requiere:**
- ⚠️ Consulta previa (Pipeline 1) - RECOMENDADO pero no siempre obligatorio
- ⚠️ Evaluación de áreas a tratar
- ⚠️ Ciclo de múltiples sesiones (típicamente 2-4 sesiones cada 4-6 semanas)

**Instrucciones pre-procedimiento:**
- Hidratación abundante 48h antes
- No tomar antiinflamatorios 48h antes
- Ropa cómoda

**Instrucciones post-procedimiento:**
- Masajes en zona (2-3 días después)
- Drenaje linfático recomendado
- Resultados progresivos: 4-12 semanas
- Próxima sesión: 4-6 semanas después

**Tipo de Pipeline:** 🔄 **APARATOLOGÍA (Pipeline 2)**
- Tratamiento con máquinas/aparatos
- Sesiones recurrentes
- Plan personalizado según paciente

**Disponibilidad:** ⏰ [A DEFINIR]

**Doctores/Técnicos:** [A DEFINIR - Técnicos certificados en aparatos]

---

### 6️⃣ TRATAMIENTOS LÁSER

**Nombre del Calendar en GHL:** `Tratamientos Láser`

**Sub-tipos de procedimientos:**
- Láser para depilación
- Láser para resurfacing (renovación de piel)
- Láser para remoción de cicatrices
- Láser para rejuvenecimiento
- Láser para manchas/lunares
- Otros tratamientos láser

**Duración estimada:**
- Duración: **30-60 min** (según área y tipo de láser)
- Buffer: 15 min

**Duración total en calendario:** `45-75 min` ⏱️

**Requiere:**
- ✅ Consulta previa (Pipeline 1) - OBLIGATORIO
- ✅ Evaluación de tipo de piel (clasificación fotoclasificación)
- ✅ Consentimiento informado
- ✅ Ciclo de múltiples sesiones (típicamente 4-8 sesiones cada 4-6 semanas)

**Instrucciones pre-procedimiento (CRÍTICO):**
- ❌ NO depilarse 48h antes (solo rasurarse)
- ❌ NO exposición solar 2 semanas antes
- ❌ NO tomar ibuprofeno 48h antes
- ✅ Usar protector solar 50+ 2 semanas antes
- ✅ Hidratar bien la piel
- ✅ Llegar sin maquillaje/productos

**Instrucciones post-procedimiento:**
- ✅ Protector solar 50+ diariamente por 2 semanas
- ✅ No depilarse 2 semanas después
- ✅ No exponerse al sol 2 semanas
- ✅ Evitar ejercicio intenso 48h
- ✅ Usar crema hidratante específica
- ⚠️ Posible enrojecimiento 1-3 días

**Tipo de Pipeline:** 🔄 **APARATOLOGÍA (Pipeline 2)**
- Máquinas/aparatos de láser
- Sesiones recurrentes (ciclo determinado por tipo de láser y resultados)
- Evaluación de progreso entre sesiones

**Disponibilidad:** ⏰ [A DEFINIR - Posiblemente turnos específicos]

**Doctores/Técnicos:** [A DEFINIR - Certificados en láser]

**NOTA IMPORTANTE:** Depilación láser = 6-8 sesiones cada 6-8 semanas (largo plazo)

---

### 7️⃣ MEDICINA ESTÉTICA ANTIENVEJECIMIENTO

**Nombre del Calendar en GHL:** `Medicina Estética Antienvejecimiento`

**Procedimientos incluidos:**
- Botox (botulinum toxin)
- Fillers (ácido hialurónico, etc.)
- PRP (plasma rico en plaquetas)
- Otros inyectables anti-envejecimiento

**Duración estimada:**
- Duración: **20-45 min** (según número de zonas)
- Buffer: 10 min

**Duración total en calendario:** `30-55 min` ⏱️

**Requiere:**
- ⚠️ Consulta previa (Pipeline 1) - RECOMENDADO
- ⚠️ Evaluación de expectativas
- ⚠️ Fotos antes para documentar

**Instrucciones pre-procedimiento:**
- No tomar aspirina 1 semana antes
- No tomar alcohol 24h antes
- Evitar otros inyectables 2 semanas antes
- Llegar sin maquillaje

**Instrucciones post-procedimiento:**
- No tocar zona inyectada 4 horas
- No ejercicio intenso 24h
- No acostarse 4h después (si Botox)
- Posible enrojecimiento/leve hinchazón 24-48h
- Resultados Botox: 3-7 días
- Resultados Fillers: inmediato + mejora 2 semanas

**Tipo de Pipeline:** 🔄 **RECURRENCIA (Pipeline 4) - MUY IMPORTANTE**
- Botox: cada 3-4 meses (90 días típicamente)
- Fillers: cada 6-12 meses (depende del filler)
- Pacientes ALTAMENTE RECURRENTES = VIP

**Disponibilidad:** ⏰ [A DEFINIR - Probablemente horarios flexibles]

**Doctores/Enfermeras Especialistas:** [A DEFINIR]

**NOTA:** Este es UNO DE LOS SERVICIOS MÁS RECURRENTES = Enfoque en Pipeline 4

---

### 8️⃣ DERMATOLOGÍA Y ALERGIAS

**Nombre del Calendar en GHL:** `Dermatología y Alergias`

**Procedimientos incluidos:**
- Consulta dermatológica general
- Tratamiento de acné
- Tratamiento de rosácea
- Pruebas de alergia
- Otros tratamientos dermatológicos

**Duración estimada:**
- Duración: **30-45 min**
- Buffer: 10 min

**Duración total en calendario:** `40-55 min` ⏱️

**Requiere:**
- ✅ Sin consulta previa obligatoria (es la consulta misma)
- ⚠️ Historial médico de paciente
- ⚠️ Posibles pruebas de laboratorio

**Instrucciones pre-procedimiento:**
- Traer historial de alergias conocidas
- No usar maquillaje si es para evaluación de acné
- Traer medicinas actuales (si toma)

**Instrucciones post-procedimiento:**
- Depende del tratamiento específico
- Posible prescripción de medicinas
- Seguimiento según indicaciones

**Tipo de Pipeline:** 📋 **CONSULTA INICIAL (Pipeline 1)**
- Entrada típica del paciente
- Puede derivar a otros servicios

**Disponibilidad:** ⏰ [A DEFINIR - Horarios normales de consulta]

**Doctores:** [A DEFINIR - Dermatólogos disponibles]

---

## 📊 TABLA RESUMEN RÁPIDA

| # | Servicio | Duración | Pipeline | Sesiones | Requiere Consulta |
|---|----------|----------|----------|----------|-------------------|
| 1 | Cirugía Plástica Facial | 180-210 min | Consulta Inicial | 1 (único) | ✅ Sí (obligatorio) |
| 2 | Cirugía Plástica Corporal | 210-270 min | Consulta Inicial | 1 (único) | ✅ Sí (obligatorio) |
| 3 | Cirugía de Restauración Capilar | 300-390 min | Consulta Inicial | 1 (único) | ✅ Sí (obligatorio) |
| 4 | Tratamiento Restauración Capilar | 60 min | Recurrencia (Pipeline 4) | 4-6 sesiones | ✅ Sí |
| 5 | Moldeo Corporal | 75-105 min | Aparatología (Pipeline 2) | 2-4 sesiones | ⚠️ Recomendado |
| 6 | Tratamientos Láser | 45-75 min | Aparatología (Pipeline 2) | 4-8 sesiones | ✅ Sí (obligatorio) |
| 7 | Medicina Estética Antienvejecimiento | 30-55 min | Recurrencia (Pipeline 4) | ∞ Recurrente | ⚠️ Recomendado |
| 8 | Dermatología y Alergias | 40-55 min | Consulta Inicial (Pipeline 1) | Variable | ❌ No (es la consulta) |

---

## 🚨 INFORMACIÓN FALTANTE CRÍTICA

### ⏰ HORARIOS DE OPERACIÓN
```
Lunes: _________ a _________
Martes: _________ a _________
Miércoles: _________ a _________
Jueves: _________ a _________
Viernes: _________ a _________
Sábado: _________ (¿Abierto?)
Domingo: _________ (¿Abierto?)

¿Hay hora de almuerzo donde no se agenda? ___________
```

### 👨‍⚕️ DOCTORES / ESPECIALISTAS
```
Doctor 1: _________________ Especialidades: _________________
Doctor 2: _________________ Especialidades: _________________
Doctor 3: _________________ Especialidades: _________________

¿Hay técnicos/enfermeras para aparatología? ¿Cuántos? ___________
```

### ⏱️ CONFIRMACIÓN DE DURACIONES
Validar que las duraciones propuestas coinciden con la realidad de la clínica:
- ¿Cirugía facial realmente toma 150-180 min?
- ¿Láser realmente toma 45-75 min?
- ¿Se necesita buffer adicional entre citas?

### 🎯 MÁQUINAS / APARATOS
Si hay 21 máquinas diferentes (según documentación):
- ¿Crear sub-calendario por cada máquina? (ej: `Láser XYZ - Depilación`)
- ¿O un calendario general `Tratamientos Láser` que filtra por máquina?

**RECOMENDACIÓN:** Un calendario general es más limpio. Especificar máquina dentro de la cita.

---

## ✅ PRÓXIMOS PASOS

1. **Recopilar información faltante** (horarios, doctores, duraciones exactas)
2. **Validar con la clínica** si las duraciones son correctas
3. **Crear los 8 calendarios en GHL** con las duraciones y disponibilidades correctas
4. **Vincular cada calendario con el Pipeline correcto:**
   - Cirugías → Pipeline 1 (Consulta Inicial)
   - Láser + Moldeo → Pipeline 2 (Aparatología)
   - Medicina Estética + Restauración Capilar → Pipeline 4 (Recurrencia)
   - Dermatología → Pipeline 1 (Consulta Inicial)

5. **Configurar recordatorios automáticos por servicio:**
   - Pre-tratamiento: instrucciones específicas
   - Post-tratamiento: cuidados específicos
   - Próximas citas: para tratamientos recurrentes

---

**Documento versión:** 1.0  
**Responsable:** John (Algorith Pro)  
**Estado:** 🔴 Pendiente de información de la clínica  
**Próxima reunión:** [A AGENDAR con Carlos Perlaza + Doctora]
