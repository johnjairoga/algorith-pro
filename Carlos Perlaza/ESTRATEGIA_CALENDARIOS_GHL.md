# 📅 ESTRATEGIA DE CALENDARIOS EN GHL - CLÍNICA DERMATOLÓGICA

**Documento:** Definición de estrategia antes de crear calendarios  
**Fecha:** 27 de agosto de 2026  
**Estado:** 🔴 REQUIERE DECISIÓN DEL USUARIO

---

## 🎯 ESTRUCTURA EN GHL

La jerarquía en GHL es:

```
SERVICIOS (Services)
    ↓
CALENDARIOS (Calendars) 
    ↓
TEAM MEMBERS / DOCTORES (Staff)
    ↓
PACIENTES (Contacts)
```

**Ejemplo real:**
```
Servicio: "Botox"
    → Calendar: "Medicina Estética" (disponibilidad general)
    → Team Members: Dra. María, Dr. Carlos, Dra. Laura
    → Paciente: Agendas con un doctor disponible
```

---

## 🔄 FLUJO DE AGENDAMIENTO EN GHL

```
1. Paciente ve SERVICIO en sitio web (ej: "Botox")
2. Sistema muestra CALENDARIOS disponibles
3. Paciente elige DOCTOR disponible (si hay múltiples)
4. Paciente elige FECHA/HORA
5. Sistema crea CITA en el calendario del doctor
```

---

## 📋 DOS OPCIONES DE ESTRUCTURA

### OPCIÓN A: Calendarios por SERVICIO (Recomendado)
**Ventaja:** Más simple, menos calendarios, flexible con doctores

```
Calendarios creados: 8

1. "Cirugía Plástica Facial"
   ├─ Dra. Magda Morales
   ├─ Dr. Otro Cirujano
   └─ (pueden atender)

2. "Medicina Estética"
   ├─ Dra. María
   ├─ Dra. Laura
   └─ (pueden atender)

3. "Tratamientos Láser"
   ├─ Técnico 1
   ├─ Técnico 2
   └─ (pueden atender)

... y 5 más
```

**Pros:**
✅ Simple: 8 calendarios totales
✅ Flexible: doctores pueden cambiar de servicio
✅ UX clara: pacientes ven servicio → doctor disponible

**Contras:**
❌ Si tienes muchos doctores, puede haber conflictos de disponibilidad

---

### OPCIÓN B: Calendarios por DOCTOR + SERVICIO
**Ventaja:** Control total de disponibilidad de cada doctor

```
Calendarios creados: 40+ (8 servicios × 5+ doctores)

Ejemplos:
1. "Botox - Dra. María"
2. "Botox - Dra. Laura"
3. "Botox - Dr. Carlos"
4. "Láser Depilación - Dra. María"
5. "Láser Depilación - Técnico Juan"
... y más
```

**Pros:**
✅ Control total de disponibilidad por doctor
✅ Cada doctor tiene calendario independiente
✅ Fácil ver quién está disponible

**Contras:**
❌ Muchos calendarios (puede ser confuso)
❌ Paciente debe saber qué doctor elegir
❌ Más trabajo de mantenimiento

---

## ❓ PREGUNTAS CLAVE A RESPONDER

Antes de continuar, necesito saber:

### 1️⃣ DOCTORES Y ESPECIALIDADES
```
¿Cuántos doctores tiene la clínica?
¿Cuáles son sus nombres y especialidades?
¿Cada doctor se especializa en ciertos servicios?

Ejemplo respuesta:
- Dra. Magda Morales → Cirugías faciales + corporales
- Dr. Carlos → Restauración capilar
- Dra. María → Botox + Fillers + Láser
- Técnico Juan → Láser + Moldeo corporal
```

### 2️⃣ DISPONIBILIDAD DE DOCTORES
```
¿Todos los doctores atienden igual horario?
¿O tienen horarios diferentes?
¿Hay doctores que solo atienden días específicos?

Ejemplo respuesta:
- Todos: Lunes a Viernes 9:00 - 18:00
- O: Dra. Magda solo cirugías (lunes/miércoles), otros diariamente
```

### 3️⃣ ESTRUCTURA PREFERIDA
```
¿Prefieres OPCIÓN A o OPCIÓN B?

OPCIÓN A: 8 calendarios por servicio (más simple)
OPCIÓN B: 40+ calendarios por doctor+servicio (más control)
```

### 4️⃣ INTEGRACIÓN CON PIPELINES
```
¿Cómo vinculas calendarios con los 4 pipelines?

- Pipeline 1 (Consulta Inicial) → Calendario: Dermatología + Cirugías
- Pipeline 2 (Aparatología) → Calendario: Láser + Moldeo
- Pipeline 4 (Recurrencia) → Calendario: Medicina Estética + Restauración Capilar
```

---

## 📊 RECOMENDACIÓN ACTUAL

Basándome en la información del proyecto:

**RECOMENDACIÓN: OPCIÓN A (8 calendarios por servicio)**

**Razón:**
- ✅ Más simple de mantener
- ✅ Los 4 pipelines se alinean bien
- ✅ Pacientes no necesitan saber qué doctor asignar
- ✅ Sistema automático puede distribuir doctores por disponibilidad

---

## 🔀 FLUJO PROPUESTO CON OPCIÓN A

```
PIPELINE 1: Consulta Inicial
├─ Lead llega
├─ Agenda en: "Dermatología y Alergias" 
│  (ó "Cirugía [Tipo]" si aplica)
└─ Sistema asigna doctor disponible

PIPELINE 2: Aparatología  
├─ Lead ya consultó, quiere láser/moldeo
├─ Agenda en: "Tratamientos Láser" o "Moldeo Corporal"
└─ Sistema asigna técnico/doctor disponible

PIPELINE 4: Recurrencia
├─ Paciente que ya contrató Botox
├─ Sistema recuerda: próxima cita en 90 días
├─ Abre: "Medicina Estética"
└─ Paciente confirma/reprograma

LEAD → CONSULTA → TRATAMIENTO → RECURRENCIA
         ↓           ↓              ↓
      Dermatología  Láser/Moldeo   Medicina Estética
```

---

## ✅ SIGUIENTES PASOS

Una vez respondas las 4 preguntas:

1. Crear configuración actualizada de calendarios
2. Obtener IDs de todos los team members
3. Crear los 8 (o más) calendarios correctamente
4. Vincular calendarios ↔ doctores ↔ servicios
5. Vincular calendarios ↔ pipelines en automaciones

---

**Espero tu respuesta sobre:**
1. Doctores y especialidades
2. Horarios de operación
3. Estructura preferida (A o B)
4. Cómo vincular con pipelines
