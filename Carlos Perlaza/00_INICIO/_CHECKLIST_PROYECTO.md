# CHECKLIST DE TAREAS PENDIENTES Y CRONOGRAMA
**Proyecto:** Automatización para Clínica - Carlos Perlaza  
**Actualización:** 11 de agosto de 2026  
**Estado:** En preparación para Onboarding

---

## TAREAS INMEDIATAS (HOY - ANTES DEL MIÉRCOLES)

### Para John (Algorith Pro)
- [ ] **Enviar contrato por correo a Carlos**
  - Archivo: `Contrato_Prestacion_Servicios_Automatizacion_Carlos_Perlaza.html`
  - Incluir versión imprimible/PDF
  
- [ ] **Enviar link de Stripe para pago restante**
  - Monto: $1,000 USD (17,117 pesos mexicanos)
  - Convertir desde: 250 USD inicial + 1,000 USD = 1,250 USD total

- [ ] **Enviar condiciones de pago por escrito**
  - Resumen de:
    - 50% ahora ($1,250 USD)
    - 50% en Go Live ($1,250 USD)
    - Mensualidad de $500 USD
    - Estructura de modelo híbrido con porcentaje

- [ ] **Confirmar correo de reunión de onboarding**
  - Asunto: "reunión de onboarding sistema de crecimiento con IA"
  - Destinatario: carlos@[correo pendiente]
  - Verificar que Carlos recibió la invitación

- [ ] **Preparar documentación técnica preliminar**
  - Especificaciones de Go High Level
  - Requisitos de hosting/dominio
  - Lista de integraciones necesarias (WhatsApp, Stripe, etc.)

- [ ] **Validar disponibilidad para miércoles 9:00 AM (hora México)**
  - Bloquear 3 horas en calendario
  - Preparar demo/pantallazos de soluciones similares
  - Tener listo acceso de prueba a Go High Level

### Para Carlos Perlaza
- [ ] **Completar pago de $1,000 USD**
  - Timing: Hoy tarde/noche o mañana
  - Método: Link de Stripe que John enviará
  - Confirmación: Esperar email de comprobante

- [ ] **Contactar a la doctora para cerrar meeting**
  - Objetivo: Confirmar que ella participará en onboarding
  - O al menos: Proporcionar información necesaria antes de la reunión

- [ ] **Recopilar información técnica:**
  - [ ] ¿Dónde está alojado el sitio actual? (hosting, proveedor)
  - [ ] ¿Quién es el registrante del dominio?
  - [ ] ¿Qué datos/accesos necesita traer de la clínica?
  - [ ] ¿Tiene credenciales de acceso actual?

- [ ] **Revisar y firmar contrato**
  - Leer cuidadosamente
  - Aclarar cualquier duda con John
  - Devolver firmado antes del miércoles

- [ ] **Preparar información de la clínica:**
  - [ ] Nombres y especialidades de doctores
  - [ ] Servicios que ofrece (listado completo)
  - [ ] Horarios de atención
  - [ ] Información de facturación/precios
  - [ ] Datos de contacto (correo, teléfono de la doctora)

---

## REUNIÓN DE ONBOARDING - MIÉRCOLES 9:00 AM

### Antes de la reunión (Preparación)

**John debe tener listo:**
- [ ] Acceso a Go High Level (cuenta demo o de prueba)
- [ ] Pantallazos/demo de clínicas similares ya implementadas
- [ ] Documentación de arquitectura propuesta
- [ ] Lista de preguntas técnicas para Carlos
- [ ] Propuesta de cronograma detallado

**Carlos debe traer:**
- [ ] Toda la documentación del proyecto actual
- [ ] Credenciales de hosting/dominio
- [ ] Información de la clínica compilada
- [ ] Preguntas/dudas que tenga

### Durante la reunión (Temas a cubrir)

**Fase 1: Presentación (30 minutos)**
- [ ] John explica enfoque y metodología
- [ ] Muestra casos de éxito similares
- [ ] Presenta demo de Go High Level

**Fase 2: Requerimientos (60 minutos)**
- [ ] Revisión de funcionalidades necesarias
- [ ] Definición de flujos de agendamiento
- [ ] Configuración de historiales de pacientes
- [ ] Setup de canales (WhatsApp, Email, SMS)
- [ ] Pasarelas de pago (Stripe, PagSeguro)
- [ ] Campañas y publicidad

**Fase 3: Aspectos Técnicos (45 minutos)**
- [ ] Hosting y dominio
- [ ] Crear correo Gmail nuevo (propuesta)
- [ ] Acceso a Go High Level
- [ ] Integraciones necesarias
- [ ] Seguridad y backups

**Fase 4: Próximos Pasos (45 minutos)**
- [ ] Cronograma detallado
- [ ] Hitos de entrega
- [ ] Forma de comunicación
- [ ] Punto de contacto principal
- [ ] Clarificación de dudas

### Tareas durante la reunión

- [ ] Grabar la reunión (para referencia)
- [ ] Tomar notas detalladas
- [ ] Confirmar todos los acuerdos
- [ ] Definir fecha de inicio formal

---

## 🎯 DECISIÓN DE PIPELINES (FINAL - TERCERA LLAMADA)

**Pipelines a Construir: 4 (Simplificados, no 8)**

| # | Pipeline | Descripción | Etapas | Estado |
|---|----------|-------------|--------|--------|
| 1️⃣ | **CONSULTA INICIAL (Tratamientos)** | Lead → Contacto → Cualificación → Cita Agendada → Consulta Realizada → Convertido o Perdido | 6 | ⏳ A Construir |
| 2️⃣ | **APARATOLOGÍA** | Servicios con máquinas láser (todos ambulatorios, sin quirófano) | 5-6 | ⏳ A Construir |
| 3️⃣ | **INACTIVOS + REACTIVACIÓN** | Pacientes sin contacto >30-60 días + Estrategias con promociones | 2-3 | ⏳ A Construir |
| 4️⃣ | **RECURRENCIA** | Pacientes con tratamientos recurrentes (30, 60, 90 días, trimestral, semestral) | 2-4 | ⏳ A Construir |

**❌ Pipelines Descartados (Por Complejidad):**
- ~~Pipeline Cirugía Plástica~~ (se incluye en Consulta Inicial/Tratamientos)
- ~~Pipeline Clínica Hombres~~ (se incluye en Consulta Inicial)
- ~~Pipeline Trasplante Cabello~~ (se incluye en Consulta Inicial)
- ~~Pipeline Leads Fríos~~ (se incluye en Inactivos/Reactivación)

**Razón:** La clínica tiene 51 servicios + 21 máquinas = 72 servicios. En lugar de crear pipelines separados, usamos **filtros por tratamiento** dentro de estos 4 pipelines principales.

---

## FASE 1: SETUP (POST-ONBOARDING)

### Semana 1: Configuración Base

**Tareas de John:**
- [ ] Crear cuenta de Go High Level (independiente para Carlos)
- [ ] Configurar estructura básica
- [ ] Setup de dominio y DNS
- [ ] Instalación SSL (certificado de seguridad)
- [ ] Crear correo Gmail administrativo
- [ ] Documento compartido con credenciales
- [ ] Crear los 4 pipelines base en estructura (sin automatizaciones aún)

**Tareas de Carlos:**
- [ ] Proporcionar información completa de la clínica (doctores, secretarias, horarios)
- [ ] Definir información de recurrencia de tratamientos
- [ ] Definir preguntas del historial médico ("Ayuda Técnica")
- [ ] Estar disponible para consultas

**Entregables:**
- [ ] Go High Level básico funcional
- [ ] Acceso compartido con Carlos
- [ ] Documento de credenciales
- [ ] 4 Pipelines creados y visibles

---

### Semana 2-3: Flujos y Automatización (4 Pipelines)

**Tareas de John:**

**Pipeline 1: CONSULTA INICIAL**
- [ ] Configurar 6 etapas (Lead → Convertido/Perdido)
- [ ] Crear automatizaciones de bienvenida
- [ ] Setup de recordatorios de cita (24h, 8h, 4h, 1h, 15min, 5min)
- [ ] Crear flujos de pre-consulta
- [ ] Crear flujos de post-consulta

**Pipeline 2: APARATOLOGÍA**
- [ ] Configurar 5-6 etapas
- [ ] Setup de calendario con máquinas/aparatos disponibles
- [ ] Crear recordatorios de sesiones
- [ ] Integrar con tratamientos de mantenimiento

**Pipeline 3: INACTIVOS + REACTIVACIÓN**
- [ ] Crear etapas (Inactivo → Reactivación)
- [ ] Setup de detección automática de inactividad (>30/60 días)
- [ ] Crear flujos de reactivación con promociones
- [ ] Integrar con estrategias de temporalidad (Día de Madres, Padre, etc.)

**Pipeline 4: RECURRENCIA**
- [ ] Crear etapas según ciclos (30d, 60d, 90d, trimestral, semestral, anual)
- [ ] Setup de recordatorios automáticos
- [ ] Crear flujos de renovación/re-agendamiento
- [ ] Dashboard de pacientes en recurrencia

**General:**
- [ ] Setup de calendario con múltiples doctores
- [ ] Integración WhatsApp API (1 número con API oficial)
- [ ] Configuración de base de datos de pacientes
- [ ] Sistema de etiquetas (Pagó, Pre-tratamiento, Post-tratamiento, Campaña_X, etc.)
- [ ] Setup de filtros por tratamiento (aplicable a todos los pipelines)

**Entregables:**
- [ ] 4 Pipelines con flujos completos
- [ ] Automatizaciones funcionales
- [ ] Historiales de pacientes con "Ayuda Técnica" médica
- [ ] WhatsApp integrado y probado
- [ ] Sistema de etiquetas activo

---

### Semana 4: Pagos y Campañas

**Tareas de John:**
- [ ] Integración de Stripe
- [ ] Setup de pasarela de pagos
- [ ] Configuración de emails automáticos
- [ ] Integración Meta Ads (Facebook/Instagram con tracking de eventos)
- [ ] Setup de reportes y dashboards (por doctor, tratamiento, pipeline, campaña)
- [ ] Implementar etiquetado automático de campañas

**Entregables:**
- [ ] Pasarelas de pago funcionando en todos los 4 pipelines
- [ ] Conexión de campañas publicitarias con tracking
- [ ] Dashboards con métricas por pipeline, tratamiento y doctor

---

### Semana 4: Pagos y Campañas

**Tareas de John:**
- [ ] Integración de Stripe
- [ ] Setup de pasarela de pagos
- [ ] Configuración de emails automáticos
- [ ] Integración Meta Ads (Facebook/Instagram)
- [ ] Setup de reportes y dashboards

**Entregables:**
- [ ] Pasarelas de pago funcionando
- [ ] Conexión de campañas publicitarias
- [ ] Dashboards de facturación

---

## FASE 2: TESTING Y AJUSTES

### Semana 5: QA Completo (4 Pipelines)

**Tareas de John:**
- [ ] Testing exhaustivo de los 4 pipelines
  - [ ] Consulta Inicial: flujo completo lead → conversión
  - [ ] Aparatología: agendamiento y recurrencia de sesiones
  - [ ] Inactivos/Reactivación: detección automática y re-engagement
  - [ ] Recurrencia: recordatorios y re-agendamientos automáticos
- [ ] Verificación de integraciones (WhatsApp, Stripe, Meta Ads)
- [ ] Prueba de seguridad básica y cumplimiento LGPD
- [ ] Verificación de datos y migraciones
- [ ] Testing de etiquetas y filtros por tratamiento
- [ ] Testing de dashboards y reportes

**Tareas de Carlos:**
- [ ] Revisar y validar funcionalidades de los 4 pipelines
- [ ] Pruebas con secretarias y doctores
- [ ] Comunicar feedback sobre flujos
- [ ] Validar que tratamientos estén correctamente categorizados

**Entregables:**
- [ ] Reporte de QA detallado por pipeline
- [ ] Lista de bugs (si los hay)
- [ ] Validación de flujos por tratamiento
- [ ] Feedback para mejoras y ajustes

---

### Semana 6: Capacitación

**Tareas de John:**
- [ ] Preparar guías de usuario
- [ ] Videos tutoriales
- [ ] Capacitación en vivo (2-3 sesiones)
- [ ] Documentación técnica

**Tareas de Carlos:**
- [ ] Participar en capacitaciones
- [ ] Entrenar a equipo de la clínica
- [ ] Documentar procesos locales

**Entregables:**
- [ ] Documentación completa
- [ ] Equipo capacitado
- [ ] Videos de referencia

---

## FASE 3: GO LIVE (4 Pipelines Funcionales)

### Día de Lanzamiento

**Antes de Go Live:**
- [ ] Último backup de datos
- [ ] Checklist final de los 4 pipelines
  - [ ] Consulta Inicial: todas las 6 etapas activas
  - [ ] Aparatología: calendario y máquinas configuradas
  - [ ] Inactivos/Reactivación: detección automática funcionando
  - [ ] Recurrencia: ciclos configurados y recordatorios activos
- [ ] Validación de integraciones (WhatsApp, Stripe, Meta Ads, Email)
- [ ] Validación de seguridad y LGPD
- [ ] Validación de datos médicos ("Ayuda Técnica")
- [ ] Plan de soporte post-lanzamiento (3-6 meses)

**Durante Go Live:**
- [ ] Activación de los 4 pipelines en producción
- [ ] Monitoreo en tiempo real de flujos
- [ ] Verificación de automaciones
- [ ] Soporte disponible (John + Carlos)
- [ ] Comunicación con cliente (doctora + secretarias)

**Después de Go Live:**
- [ ] Validación de todas las funciones de los 4 pipelines
- [ ] Monitoreo 24/7 primeros 7 días
- [ ] Documentación de incidentes
- [ ] Ajustes rápidos según feedback
- [ ] Validación de primer pago y campañas

**Entregable:**
- [ ] 4 Pipelines en producción y funcionando
- [ ] Validación completada
- [ ] Dashboards mostrando datos reales
- [ ] Equipo capacitado en uso

---

## PAGOS - CRONOGRAMA

| Hito | Monto | Fecha | Estado |
|------|-------|-------|--------|
| Anticipo 1 | 250 USD | ✅ Pagado | Completado |
| Anticipo 2 | 1,000 USD | Hoy/mañana | Pendiente |
| **Total Setup (50%)** | **$1,250 USD** | Antes del miércoles | Pendiente |
| Setup Final (50%) | $1,250 USD | 5 días post Go Live | Futuro |
| **Total Setup** | **$2,500 USD** | | |
| Mensualidad 1 | $500 USD | Primer mes post Go Live | Futuro |
| Mensualidad 2+ | $500 USD | Según acuerdo | Futuro |

---

## DOCUMENTACIÓN GENERADA

✅ **Completados:**
- [x] Contrato de prestación de servicios (HTML)
- [x] Contrato de prestacion de servicios (Markdown)
- [x] Resumen de acuerdos de la llamada (1ª y 2ª llamada)
- [x] Checklist de tareas inicial
- [x] Decisiones de 3ª llamada documentadas
- [x] FORMULARIO_INTEGRACION_COMPLETO.docx (con Pipelines, Branding, Información Técnica)
- [x] Especificaciones de 4 Pipelines simplificados

📋 **Pendiente de John:**
- [ ] Enviar contrato por correo
- [ ] Enviar link de Stripe para pago final
- [ ] Enviar FORMULARIO_INTEGRACION_COMPLETO.docx a Carlos
- [ ] Enviar especificaciones de los 4 pipelines
- [ ] Crear carpeta Google Drive para branding/imágenes

---

## PERSONAS Y CONTACTOS

| Persona | Rol | Email | Teléfono | Notas |
|---------|-----|-------|----------|-------|
| John | Proveedor (Algorith Pro) | [A completar] | [A completar] | Brasil |
| Carlos Perlaza | Cliente (Agencia) | [A completar] | [A completar] | Puebla, México |
| Doctora | Cliente Final | [A completar] | [A completar] | Aún por confirmar asistencia |

---

## NOTAS IMPORTANTES

⚠️ **Riesgos a monitorear:**
1. La doctora aún no ha cerrado definitivamente (3 reuniones canceladas)
2. Carlos necesita ver resultados rápido
3. Capacidad de pago de la doctora aún no confirmada
4. Definición de mensualidad aún en zona gris

✅ **Factores positivos:**
1. La doctora ya pagó por página web
2. Carlos tiene presupuesto confirmado
3. Solución es replicable para futuros clientes
4. Timeline es realista
5. John y Carlos tienen buena química comercial

🎯 **KPIs de éxito:**
- Go Live antes de 45 días (Objetivo: Semana 6)
- **4 Pipelines funcionales sin problemas:**
  - [ ] Consulta Inicial: leads → conversión fluida
  - [ ] Aparatología: sesiones recurrentes agendadas automáticamente
  - [ ] Inactivos/Reactivación: 80%+ de pacientes inactivos re-enganchados
  - [ ] Recurrencia: 95%+ de recordatorios entregados a tiempo
- Doctora satisfecha y dispuesta a pagar mensualidad ($500 USD)
- Sistema escalable: Solución lista para replicar con otros clientes
- Carlos genera su primer "caso de éxito" comprobado y documentado
- Integración completa: WhatsApp, Stripe, Meta Ads, Email funcionando
- Dashboard con métricas: Conversión por pipeline, doctor, tratamiento, campaña

**Métricas de Entrada (Meta):**
- Pagos por Stripe: >80% de convertidos
- Tasa de no-shows reducida: <10% (vs. baseline histórico)
- Ingresos mensuales en sistema: $15,000+ MXN en primeros 30 días post-launch

---

**Documento Preparado:** 11 de agosto de 2026  
**Versión:** 2.0 (Actualizado con decisión de 4 Pipelines)  
**Última actualización:** 14 de agosto de 2026  
**Responsable:** John (Algorith Pro)  
**Estado:** En ejecución - Semana 2 de setup  
**Próxima revisión:** Después de semana 2 (antes de Semana 3 de flujos)
