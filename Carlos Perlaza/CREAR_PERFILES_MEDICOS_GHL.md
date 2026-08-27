# 👥 CREAR PERFILES DE MÉDICOS EN GHL

**Objetivo:** Crear usuarios (Team Members/Staff) en GHL para los 3 doctores  
**Propósito:** Vincularlos a los calendarios de servicios  
**Fecha:** 27 de agosto de 2026

---

## 🎯 CÓMO FUNCIONA AGREGAR MÁS DOCTORES (Futuro)

La estructura es **muy flexible** para agregar más doctores:

```
ESCENARIO ACTUAL: 3 Doctores
├─ Dra. Anja Arellano → Cirugías + Láser
├─ Dr. Aristides Arellano → Cirugías + Medicina Estética
└─ Dra. Dafne Arellano → Medicina Estética + Dermatología

CUANDO AGREGUES MÁS DOCTORES (Futuro):
├─ Dr. Nuevo (Especialista en Láser) 
│  → Se agrega al Calendario "Tratamientos Láser" (junto a Dra. Anja)
│
├─ Dra. Otra (Especialista en Restauración Capilar)
│  → Se agrega al Calendario "Cirugía/Tratamiento Restauración Capilar"
│
└─ [Tantos doctores como necesites]
   → Cada uno se añade a sus calendarios correspondientes
```

**Los calendarios NO cambian. Solo SE AGREGAN doctores a los existentes.**

```
ANTES (con 3 doctores):
├─ Calendario "Medicina Estética"
│  └─ Doctores: Dr. Aristides, Dra. Dafne
│
DESPUÉS (agregar 1 doctor más):
├─ Calendario "Medicina Estética"
│  └─ Doctores: Dr. Aristides, Dra. Dafne, Dr. Nuevo
│
DESPUÉS (agregar 2 doctores más):
├─ Calendario "Medicina Estética"
│  └─ Doctores: Dr. Aristides, Dra. Dafne, Dr. Nuevo, Dra. Otra, etc.
```

---

## 📋 DATOS NECESARIOS PARA CREAR PERFIL DE MÉDICO EN GHL

### REQUERIDOS (Obligatorios)
```
1. Nombre Completo
2. Email (único, corporativo preferible)
3. Teléfono Laboral
4. Especialidades (1 o más)
5. Rol: "Doctor" / "Staff Member"
```

### OPCIONALES (Recomendados)
```
6. Foto profesional (perfil público)
7. Bio/Presentación (máx 200 caracteres)
8. Horarios específicos (si difieren de clínica)
9. Días de descanso/vacaciones
10. Disponibilidad para videollamadas
```

---

## 👨‍⚕️ INFORMACIÓN QUE TENGO DE LOS 3 DOCTORES

### Doctor 1: Dra. Anja Arellano M.
```
✅ Nombre completo: Dra. Anja Arellano M.
✅ Especialidades: Cirugía Estética, Restauración Capilar, Láser
✅ Email: anja.arellano@gmail.com
✅ Tel laboral: 81 46 82 32 89
✅ Tel personal: 2229543542 (NO compartir con pacientes)
✅ Certificaciones: FAFS, FABCS

❓ Falta:
  - Foto profesional
  - Bio/presentación
  - Horarios específicos
  - ¿Atiende fines de semana?
  - ¿Disponibilidad para videollamadas?
```

### Doctor 2: Dr. Aristides Arellano Huacuja
```
✅ Nombre completo: Dr. Aristides Arellano Huacuja
✅ Especialidades: Cirugía Plástica, Estética y Reconstructiva
✅ Email: aristidesarella@yahoo.com.mx
✅ Teléfono: 22 23 23 09 72, 22 22 39 26 21
✅ Certificaciones: FICS

❓ Falta:
  - Foto profesional
  - Bio/presentación
  - Horarios específicos
  - ¿Atiende fines de semana?
  - ¿Disponibilidad para videollamadas?
```

### Doctor 3: Dra. Dafne Arellano Montalvo
```
✅ Nombre completo: Dra. Dafne Arellano Montalvo
✅ Especialidades: Medicina Estética

❓ Falta (CRÍTICO):
  - Email profesional
  - Teléfono laboral
  - Foto profesional
  - Bio/presentación
  - Horarios específicos
  - ¿Atiende fines de semana?
  - ¿Disponibilidad para videollamadas?
```

---

## 📝 PREGUNTAS QUE NECESITO RESPONDER

### PARA TODOS LOS DOCTORES (3):

```
1️⃣ FOTO PROFESIONAL
   ¿Tienen foto profesional para perfil público?
   Formato preferido: JPG o PNG (500x500px mínimo)

2️⃣ PRESENTACIÓN/BIO
   ¿Qué bio/descripción quieren en perfil?
   Ejemplo: "Especialista en Medicina Estética con 15 años de experiencia"
   Máximo: 200 caracteres

3️⃣ HORARIOS
   ¿Todos atienden 9:00 AM - 6:00 PM?
   ¿O hay horarios específicos por doctor?
   
   Ejemplo:
   - Dra. Anja: Lunes-Viernes 9-6 (cirugías solo lunes/miércoles)
   - Dr. Aristides: Lunes-Viernes 10-7
   - Dra. Dafne: Martes-Viernes 9-5

4️⃣ DISPONIBILIDAD DE FIN DE SEMANA
   ¿Algún doctor atiende sábados o domingos?

5️⃣ VIDEOLLAMADAS
   ¿Pueden hacer consultas virtuales?
   ¿Alguno usa Google Meet, Zoom, Microsoft Teams?
```

### SOLO PARA Dra. Dafne (CRÍTICO):

```
6️⃣ EMAIL LABORAL (REQUERIDO)
   ¿Cuál es el email corporativo de Dra. Dafne?
   Ejemplo: dafne.arellano@clinicapuebla.com
   
   Si no tiene, ¿puedo crear uno?
   Opciones:
   ☐ dafne.arellano@clinicapuebla.com
   ☐ dra.dafne@clinicapuebla.com
   ☐ otro: _______________________

7️⃣ TELÉFONO LABORAL (REQUERIDO)
   ¿Cuál es el teléfono laboral de Dra. Dafne?
```

---

## 🔧 PLANTILLA: PERFIL COMPLETO DE MÉDICO

Una vez respondas, usaré esta estructura para crear el perfil:

```json
{
  "nombre_completo": "Dra. Anja Arellano M.",
  "email": "anja.arellano@gmail.com",
  "telefono_laboral": "81 46 82 32 89",
  "especialidades": [
    "Cirugía Estética",
    "Restauración Capilar",
    "Tratamientos Láser"
  ],
  "certificaciones": ["FAFS", "FABCS"],
  "rol": "Doctor",
  "bio": "[Tu respuesta aquí]",
  "foto_url": "[URL de foto o archivo]",
  "horarios": {
    "lunes_viernes": "9:00 AM - 6:00 PM",
    "sabado": "Cerrado",
    "domingo": "Cerrado"
  },
  "servicios_atiende": [
    "Cirugía Plástica Facial",
    "Cirugía Plástica Corporal",
    "Cirugía de Restauración Capilar",
    "Tratamiento de Restauración Capilar",
    "Tratamientos Láser"
  ],
  "videollamadas": "Sí/No",
  "plataforma_videoconferencia": "Google Meet / Zoom / Otro"
}
```

---

## ✅ PRÓXIMOS PASOS

**PASO 1 (Ahora):** Responde mis 7 preguntas arriba ↑

**PASO 2:** Con esa información, crearé:
- ✅ Perfiles JSON de los 3 doctores
- ✅ Scripts para crear Team Members en GHL
- ✅ Vinculación automática doctor → calendarios

**PASO 3:** Crear los 8 calendarios en GHL con doctores asignados

**PASO 4:** Testing de agendamiento

---

## 🚀 AGREGAR MÁS DOCTORES EN EL FUTURO

Cuando agregues más doctores:

1. Responde estas 7 preguntas para cada doctor nuevo
2. Yo crearé su perfil
3. Se agrega automáticamente a sus calendarios
4. Listo para recibir pacientes

**Ejemplo:** Si contratas "Dr. Nuevo Especialista en Láser":
```
1. Respondo 7 preguntas
2. Creo perfil de Dr. Nuevo
3. Se agrega a Calendario "Tratamientos Láser" (junto a Dra. Anja)
4. Pacientes ahora ven 2 opciones: Dra. Anja O Dr. Nuevo
5. Automático, sin cambiar nada más
```

---

**ESPERO TUS RESPUESTAS A LAS 7 PREGUNTAS ARRIBA PARA CREAR LOS PERFILES.** ⬆️
