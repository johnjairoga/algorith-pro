# 🔗 ESTRUCTURA GHL - EJEMPLO PRÁCTICO CON TUS DOCTORES

**Estructura:** Servicio → Calendario → Doctor

---

## 📊 EJEMPLO 1: SERVICIO "BOTOX"

```
┌─────────────────────────────────────────────────────┐
│ SERVICIO: "Medicina Estética - Botox"               │
│ ├─ Descripción: Botox, fillers, inyectables        │
│ ├─ Precio: $2,000 MXN                              │
│ └─ Duración: 30-45 minutos                          │
└─────────────────────────────────────────────────────┘
                        ↓ (vinculado a)
┌─────────────────────────────────────────────────────┐
│ CALENDARIO: "Medicina Estética Antienvejecimiento"  │
│ ├─ Duración del slot: 45 minutos                    │
│ ├─ Horario: 9:00 AM - 6:00 PM                       │
│ ├─ Buffer: 15 min entre citas                       │
│ └─ Doctores asignados: (ver abajo)                  │
└─────────────────────────────────────────────────────┘
                        ↓ (asignados)
┌──────────────────┬──────────────────┐
│   DOCTOR 1       │    DOCTOR 2      │
├──────────────────┼──────────────────┤
│ Dr. Aristides    │ Dra. Dafne       │
│ Arellano H.      │ Arellano M.      │
│                  │                  │
│ Email:           │ Email:           │
│ aristidesarella  │ [Por confirmar]  │
│ @yahoo.com.mx    │                  │
│                  │                  │
│ Tel: 22232309 72 │ Tel: [Por conf]  │
│                  │                  │
│ Especialidad:    │ Especialidad:    │
│ Medicina Estética│ Medicina Estética│
└──────────────────┴──────────────────┘

🎯 RESULTADO: Cuando paciente agenda "Botox":
   → Elige calendario "Medicina Estética"
   → Sistema muestra disponibilidad de Dr. Aristides O Dra. Dafne
   → Paciente elige doctor + fecha/hora
   → Cita creada en calendario del doctor elegido
```

---

## 📊 EJEMPLO 2: SERVICIO "LÁSER DEPILACIÓN"

```
┌─────────────────────────────────────────────────────┐
│ SERVICIO: "Láser - Depilación"                      │
│ ├─ Descripción: Depilación láser permanente        │
│ ├─ Precio: $300-500 MXN por sesión                 │
│ ├─ Sesiones: 6-8 (cada 4-6 semanas)                │
│ └─ Duración: 45-60 minutos                          │
└─────────────────────────────────────────────────────┘
                        ↓ (vinculado a)
┌─────────────────────────────────────────────────────┐
│ CALENDARIO: "Tratamientos Láser"                    │
│ ├─ Duración del slot: 60 minutos                    │
│ ├─ Horario: 9:00 AM - 6:00 PM                       │
│ ├─ Buffer: 15 min entre citas                       │
│ ├─ Es recurrente: SÍ (múltiples sesiones)           │
│ └─ Doctor asignado: (ver abajo)                     │
└─────────────────────────────────────────────────────┘
                        ↓ (asignado)
┌──────────────────────────────────────┐
│     DOCTOR (ESPECIALISTA)            │
├──────────────────────────────────────┤
│ Dra. Anja Arellano M.                │
│                                      │
│ Email: anja.arellano@gmail.com       │
│                                      │
│ Tel Laboral: 81 46 82 32 89          │
│ Tel Personal: 2229543542             │
│                                      │
│ Especialidades:                      │
│ • Cirugía Estética                  │
│ • Restauración Capilar              │
│ • Láser ⭐ (especialista)            │
└──────────────────────────────────────┘

🎯 RESULTADO: Cuando paciente agenda "Láser Depilación":
   → Elige calendario "Tratamientos Láser"
   → Sistema muestra SOLO disponibilidad de Dra. Anja
   → Paciente elige fecha/hora (sesión 1)
   → Cita creada
   → Sistema recuerda: próxima sesión en 4-6 semanas
```

---

## 📊 EJEMPLO 3: SERVICIO "CIRUGÍA FACIAL"

```
┌─────────────────────────────────────────────────────┐
│ SERVICIO: "Cirugía Plástica Facial"                 │
│ ├─ Descripción: Rinoplastia, lifting, blefaroplastia│
│ ├─ Precio: $3,000-8,000 MXN                         │
│ ├─ Requiere: Consulta previa + consentimiento       │
│ └─ Duración: 180-210 minutos                        │
└─────────────────────────────────────────────────────┘
                        ↓ (vinculado a)
┌─────────────────────────────────────────────────────┐
│ CALENDARIO: "Cirugía Plástica Facial"               │
│ ├─ Duración del slot: 210 minutos (3.5 horas)      │
│ ├─ Horario: 9:00 AM - 6:00 PM                       │
│ ├─ Buffer: 30 min (para limpiar quirófano)          │
│ ├─ Citas por día: máximo 2-3                        │
│ └─ Doctores asignados: (ver abajo)                  │
└─────────────────────────────────────────────────────┘
                        ↓ (asignados)
┌──────────────────┬──────────────────┐
│   DOCTOR 1       │    DOCTOR 2      │
├──────────────────┼──────────────────┤
│ Dra. Anja        │ Dr. Aristides    │
│ Arellano M.      │ Arellano Huacuja │
│                  │                  │
│ Email:           │ Email:           │
│ anja.arellano    │ aristidesarella  │
│ @gmail.com       │ @yahoo.com.mx    │
│                  │                  │
│ Tel: 81 46 82... │ Tel: 22232309 72 │
│                  │                  │
│ Especialidades:  │ Especialidades:  │
│ • Cirugía Estét. │ • Cirugía Plástica│
│ • Restauración   │ • Estética       │
└──────────────────┴──────────────────┘

🎯 RESULTADO: Cuando paciente agenda "Cirugía Facial":
   → Elige calendario "Cirugía Plástica Facial"
   → Sistema muestra disponibilidad de Dra. Anja O Dr. Aristides
   → Paciente elige doctor + fecha/hora
   → Sistema da instrucciones pre-operatorias
   → Cita creada con buffer de 30 min después (limpieza)
   → Recordatorios: 7 días antes, 3 días, 1 día, 4h antes
```

---

## 📊 EJEMPLO 4: SERVICIO "CONSULTA DERMATOLÓGICA"

```
┌─────────────────────────────────────────────────────┐
│ SERVICIO: "Dermatología - Consulta General"         │
│ ├─ Descripción: Consulta dermatológica, acné, alerg │
│ ├─ Precio: $150-300 MXN                             │
│ ├─ Es entrada al sistema (Pipeline 1)              │
│ └─ Duración: 40-55 minutos                          │
└─────────────────────────────────────────────────────┘
                        ↓ (vinculado a)
┌─────────────────────────────────────────────────────┐
│ CALENDARIO: "Dermatología y Alergias"               │
│ ├─ Duración del slot: 50 minutos                    │
│ ├─ Horario: 9:00 AM - 6:00 PM                       │
│ ├─ Buffer: 15 min                                   │
│ ├─ Citas por día: 8-10                              │
│ └─ Doctores asignados: (ver abajo)                  │
└─────────────────────────────────────────────────────┘
                        ↓ (asignados)
┌──────────────────┬──────────────────┐
│   DOCTOR 1       │    DOCTOR 2      │
├──────────────────┼──────────────────┤
│ Dr. Aristides    │ Dra. Dafne       │
│ Arellano H.      │ Arellano M.      │
│                  │                  │
│ Email:           │ Email:           │
│ aristidesarella  │ [Por confirmar]  │
│ @yahoo.com.mx    │                  │
│                  │                  │
│ Tel: 22232309 72 │ Tel: [Por conf]  │
│                  │                  │
│ Especialidades:  │ Especialidades:  │
│ • Cirugía Estét. │ • Medicina Estét.│
│ • Dermatología   │ • Dermatología   │
└──────────────────┴──────────────────┘

🎯 RESULTADO: Cuando paciente agenda "Consulta Dermatológica":
   → Elige calendario "Dermatología y Alergias"
   → Sistema muestra disponibilidad de Dr. Aristides O Dra. Dafne
   → Paciente elige doctor + fecha/hora
   → Cita creada → Sistema inicia Pipeline 1
   → Recordatorios automáticos
```

---

## 🔗 TABLA COMPLETA: SERVICIO → CALENDARIO → DOCTORES

| # | SERVICIO | CALENDARIO | DURACIÓN | DOCTORES | PIPELINE |
|---|----------|-----------|----------|----------|----------|
| 1 | Cirugía Plástica Facial | Cirugía Plástica Facial | 210 min | Dra. Anja, Dr. Aristides | 1 |
| 2 | Cirugía Plástica Corporal | Cirugía Plástica Corporal | 270 min | Dra. Anja, Dr. Aristides | 1 |
| 3 | Cirugía Restauración Capilar | Cirugía Restauración Capilar | 390 min | Dra. Anja | 1 |
| 4 | Tratamiento Restauración Capilar | Tratamiento Restauración Capilar | 60 min | Dra. Anja, Dr. Aristides | 4 |
| 5 | Moldeo Corporal | Moldeo Corporal | 90 min | Dra. Dafne | 2 |
| 6 | Láser Depilación | Tratamientos Láser | 60 min | Dra. Anja | 2 |
| 7 | Botox / Fillers | Medicina Estética | 45 min | Dr. Aristides, Dra. Dafne | 4 |
| 8 | Consulta Dermatología | Dermatología y Alergias | 50 min | Dr. Aristides, Dra. Dafne | 1 |

---

## 🎯 CÓMO FUNCIONA EN LA PRÁCTICA

### Escenario 1: Paciente nuevo quiere Botox
```
1. Paciente ve en sitio: SERVICIO "Medicina Estética - Botox"
2. Hace clic → Sistema abre CALENDARIO "Medicina Estética"
3. Paciente ve:
   ✅ Dr. Aristides - Lunes 3:00 PM (disponible)
   ✅ Dra. Dafne - Martes 10:00 AM (disponible)
4. Paciente elige: "Dr. Aristides - Lunes 3:00 PM"
5. Sistema crea CITA en calendario de Dr. Aristides
6. Paciente recibe confirmación + recordatorios automáticos
7. Después: Sistema lo pone en PIPELINE 4 (Recurrencia)
```

### Escenario 2: Paciente nuevo quiere Láser Depilación
```
1. Paciente ve en sitio: SERVICIO "Láser - Depilación"
2. Hace clic → Sistema abre CALENDARIO "Tratamientos Láser"
3. Paciente ve:
   ✅ Dra. Anja - Miércoles 2:00 PM (especialista)
   ✅ Dra. Anja - Viernes 11:00 AM (especialista)
   (Solo Dra. Anja porque es especialista)
4. Paciente elige: "Dra. Anja - Miércoles 2:00 PM"
5. Sistema crea CITA #1 en calendario de Dra. Anja
6. Sistema registra: Sesión 1 de 6-8
7. Sistema recuerda: Próxima sesión en 4-6 semanas
8. Después: Sistema lo pone en PIPELINE 2 (Aparatología)
```

---

## ✅ RESUMEN

La estructura es:
```
PACIENTE BUSCA SERVICIO
        ↓
SISTEMA ABRE CALENDARIO CORRESPONDIENTE
        ↓
PACIENTE VE DOCTORES DISPONIBLES
        ↓
PACIENTE ELIGE DOCTOR + FECHA/HORA
        ↓
CITA CREADA EN CALENDARIO DEL DOCTOR
        ↓
SISTEMA INICIA PIPELINE CORRESPONDIENTE
        ↓
RECORDATORIOS AUTOMÁTICOS + SEGUIMIENTO
```

---

**¿Está claro? ¿Quieres que continúe con la creación de los calendarios en GHL?**

Solo falta confirmar:
1. ✅ Horarios: 9:00 AM - 6:00 PM
2. ⏳ Email de Dra. Dafne: [Por confirmar]
3. ⏳ Teléfono de Dra. Dafne: [Por confirmar]
