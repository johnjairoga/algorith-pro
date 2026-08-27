# Integración GHL API v2 — Calendarios

**Documentación:** Mapeo de métodos locales → endpoints API v2 de GohighLevel

---

## 📡 Configuración Base

### GHLClient — Métodos de Calendario

Ubicación: `src/lib/ghl-client.js`

#### 1. createCalendar(calendarData)
**Endpoint:** `POST https://rest.gohighlevel.com/v2/calendars`

**Método:**
```javascript
const response = await ghl.createCalendar({
  name: 'Evaluaciones',
  description: '...',
  type: 'booking', // 'booking', 'event', 'availability'
  duration: 60, // minutos
  color: '#2E7D32',
  businessHours: {
    start: '08:00',
    end: '20:00',
    timezone: 'America/Fortaleza',
    daysOfWeek: [1, 2, 3, 4, 5, 6]
  },
  bufferTime: { before: 0, after: 0 },
  syncWithGoogle: false,
  googleCalendarEmail: 'optional@example.com',
  autoScheduling: { enabled: true, intervalDays: 90 }
});
```

**Response:**
```json
{
  "data": {
    "id": "calendar-id-xxx",
    "name": "Evaluaciones",
    "locationId": "location-id",
    "type": "booking",
    "created": "2026-08-05T10:30:00Z"
  }
}
```

#### 2. updateCalendar(calendarId, calendarData)
**Endpoint:** `PUT https://rest.gohighlevel.com/v2/calendars/:calendarId`

**Método:**
```javascript
const response = await ghl.updateCalendar('calendar-id-xxx', {
  name: 'Evaluaciones Actualizadas',
  businessHours: { /* ... */ },
  syncWithGoogle: true
});
```

---

## 📅 Tipos de Calendarios

### 1. Booking Calendar
**Propósito:** Reservas públicas (clientes agendan)

**Atributos:**
- `type: 'booking'`
- `duration`: Requerido (duración de slots)
- `businessHours`: Horarios disponibles
- Soporta múltiples servicios

**Caso de uso:** Calendario de Evaluaciones

### 2. Event Calendar
**Propósito:** Registro de eventos (interno)

**Atributos:**
- `type: 'event'`
- `duration`: Duración estándar
- No tiene slots públicos disponibles
- Uso: PT registra aulas después de realizadas

**Caso de uso:** Calendarios de Aulas, Reavaliaciones

### 3. Availability Calendar
**Propósito:** Disponibilidad de recursos (PT)

**Atributos:**
- `type: 'availability'`
- `syncWithGoogle: true` (CRÍTICO)
- `breaks`: Pausas dentro del día
- Fuente de verdad = Google Calendar del PT

**Caso de uso:** Calendarios individuales de Personal Trainers

---

## 🔗 Mapeo: Calendarios → Automatizaciones

| Calendario | Tipo | Auto 2 | Auto 3 | Auto 5 |
|-----------|------|--------|--------|--------|
| **Evaluaciones** | booking | ✅ Trigger | - | - |
| **Aulas** | event | - | ✅ Recordatorios | ✅ Calcula inactividad |
| **PT (×4)** | availability | - | ✅ Disponibilidad | - |
| **Reavaliaciones** | event | - | ✅ Recordatorio 3d | - |

---

## 🛠️ Creación de Calendarios

### Script Automático
```bash
node hub-triadeflow/src/setup/criar-calendarios.js
```

**Configuración:** `config/calendarios.json`

**Resultado:** `results/fase4a-calendarios.json`

---

## 📋 Payload Mínimo por Tipo

### Booking (Evaluaciones)
```json
{
  "locationId": "location-id",
  "name": "Evaluaciones",
  "type": "booking",
  "duration": 60,
  "color": "#2E7D32",
  "businessHours": {
    "start": "08:00",
    "end": "20:00",
    "timezone": "America/Fortaleza",
    "daysOfWeek": [1, 2, 3, 4, 5, 6]
  }
}
```

### Event (Aulas)
```json
{
  "locationId": "location-id",
  "name": "Aulas",
  "type": "event",
  "duration": 60,
  "color": "#1565C0",
  "businessHours": {
    "start": "08:00",
    "end": "20:00",
    "timezone": "America/Fortaleza",
    "daysOfWeek": [1, 2, 3, 4, 5, 6]
  }
}
```

### Availability (Personal Trainer)
```json
{
  "locationId": "location-id",
  "name": "PT — João",
  "type": "availability",
  "color": "#D32F2F",
  "businessHours": {
    "start": "08:00",
    "end": "20:00",
    "timezone": "America/Fortaleza",
    "daysOfWeek": [1, 2, 3, 4, 5, 6]
  },
  "breaks": [
    { "time": "12:00-13:30", "reason": "Almuerço" },
    { "time": "16:00-16:30", "reason": "Traslados" }
  ],
  "syncWithGoogle": true,
  "googleCalendarEmail": "joao@personalgeronto.com"
}
```

---

## 🔐 Autenticación

Todos los requests requieren:

```
Authorization: Bearer {GHL_PIT_TOKEN}
Content-Type: application/json
```

**Token:** Guardar en `.env` como `GHL_PIT_TOKEN`

**Location ID:** Guardar en `.env` como `GHL_LOCATION_ID`

---

## 🧪 Testing

### 1. Verificar Calendarios Creados
```bash
curl -X GET "https://rest.gohighlevel.com/v2/calendars?locationId={locationId}" \
  -H "Authorization: Bearer {token}"
```

### 2. Verificar Disponibilidad (Booking)
```bash
curl -X GET "https://rest.gohighlevel.com/v2/calendars/{calendarId}/availability" \
  -H "Authorization: Bearer {token}" \
  -G -d "date=2026-08-10" -d "duration=60"
```

### 3. Crear Evento (Event)
```bash
curl -X POST "https://rest.gohighlevel.com/v2/calendars/{calendarId}/events" \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Aula — João",
    "start": "2026-08-10T14:00:00Z",
    "end": "2026-08-10T15:00:00Z",
    "contactId": "contact-id"
  }'
```

---

## 📚 Referencias Oficiales

- **Create Calendar:** https://marketplace.gohighlevel.com/docs/ghl/calendars/create-calendar
- **Update Calendar:** https://marketplace.gohighlevel.com/docs/ghl/calendars/update-calendar
- **API Base:** https://rest.gohighlevel.com/v2

---

## ⚠️ Guardrails & Validaciones

### Requerimientos
- ✅ `locationId` (obligatorio)
- ✅ `name` (obligatorio)
- ✅ `type` (obligatorio: booking|event|availability)
- ✅ Zona horaria válida (America/Fortaleza)
- ✅ Horarios en formato HH:mm (24h)

### Validaciones
- Duración mínima: 15 minutos
- Duración máxima: 480 minutos (8 horas)
- daysOfWeek: 1=Lunes, 7=Domingo
- Email Google válido (si syncWithGoogle)

### Google Sync
- Requiere OAuth del PT (primera vez)
- Sincronización bidireccional (15 min)
- Si PT revoca acceso → notificar a Camila
- Cambios en Google se reflejan en GHL automáticamente

---

## 🔄 Workflow: Crear → Sincronizar → Usar

```
1. crear-calendarios.js
   └─ Crea 4 calendarios en GHL (POST /v2/calendars)
   └─ Guarda IDs en results/fase4a-calendarios.json

2. Google Sync (Manual - Primera vez)
   └─ PT inicia sesión OAuth en GHL
   └─ Autoriza acceso a Google Calendar
   └─ Sincronización automática cada 15 min

3. Usar en Automatizaciones
   └─ Auto 2: data_avaliacao ← Calendario Evaluaciones
   └─ Auto 3: data_ultima_aula ← Calendario Aulas
   └─ Auto 5: Calcula inactividad desde Calendario Aulas
```

---

## 🐛 Debugging

### Error: "Invalid timezone"
**Solución:** Usar `America/Fortaleza` (IANA standard)

### Error: "Calendar already exists"
**Solución:** Usar `updateCalendar` en lugar de `createCalendar`

### Error: "Invalid Google email"
**Solución:** Verificar que email existe y OAuth fue autorizado

### Error: "Duration out of range"
**Solución:** Usar valor entre 15-480 minutos

---

## 📝 Última Actualización

**Fecha:** 2026-08-05  
**Estado:** ✅ Implementado con API v2
**Testing:** Pendiente (ejecutar criar-calendarios.js en sandbox)
