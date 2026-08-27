# RESUMEN DE ACUERDOS - LLAMADA CARLOS PERLAZA
**Fecha:** 11 de agosto de 2026  
**Participantes:** John (Algorith Pro) & Carlos Perlaza (Agencia de Branding, Puebla México)  
**Estado:** Acuerdos confirmados para proceder con proyecto

---

## 1. VISIÓN DEL PROYECTO

**Objetivo Principal de Carlos:**
- Expandir su agencia de branding hacia **automatización e inteligencia artificial para clínicas médicas**
- Crear una **solución replicable y vendible** (llave en mano)
- Escalar de clientes mexicanos de bajo pago hacia zona norte (Monterrey) con mejor capacidad de pago
- Construir su propia agencia de automatización

**Primer Cliente Piloto:**
- Doctora con clínica de estética, cirugía plástica y servicios varios
- Clínica pequeña/familiar con ~4-5 doctores
- Doctores "volantes" que se pueden habilitar/deshabilitar
- 3 secretarias en equipo administrativo
- Múltiples servicios que funcionan como catálogo

---

## 2. SOLUCIÓN TÉCNICA A CONSTRUIR

### Plataforma Base
- **Go High Level** (GHL) - Plataforma principal
- Cuenta GHL **independiente y propia** para Carlos (transferible al futuro)
- Exportable en cualquier momento

### Funcionalidades Principales

#### Agendamiento y Disponibilidad
- Calendario con múltiples doctores/especialistas
- Sistema para agregar/quitar doctores volantes dinámicamente
- Recordatorios automáticos de citas (24h antes)
- Confirmación de asistencia por WhatsApp/SMS
- Cancelación y reprogramación fácil

#### Historiales de Pacientes
- Base de datos centralizada de pacientes
- Historial de servicios y tratamientos realizados
- Información de pre y post tratamiento
- Registro de alergias y contraindicaciones
- Notas médicas y observaciones

#### Pipeline de Ventas y Lead Generation
- Capture de leads desde múltiples fuentes
- Cualificación automática
- Secuencias de automatización para seguimiento
- Conversión lead → paciente → cliente fidelizado
- Upsell de servicios adicionales

#### Comunicación Multi-canal
- **WhatsApp API** (oficial) - Prioritario
- Email automatizado
- SMS (opcional)
- Chat en sitio web (opcional)
- Integración con CRM

#### Pagos y Facturación
- Pasarelas de pago integradas (Stripe, PagSeguro)
- Opción de **pagos anticipados O pagos completos** (configurable)
- Recibos automáticos
- Dashboard de facturación

#### Reportes y Analítica
- Dashboard de facturación mensual
- Reportes de citas (completadas, canceladas, no-shows)
- Análisis de conversión de leads
- Seguimiento de fuentes de tráfico (campañas, anuncios)
- KPIs de desempeño

#### Publicidad Integrada
- Integración con Meta Ads (Facebook/Instagram)
- Campaigns **generales** (a la página) y **dirigidas** (a productos específicos)
- Dos tipos de campañas manejables desde el sistema
- Seguimiento de ROI de campañas

### Nota Importante
- La solución debe ser **fácil, no complicada**
- Inspiración: Go High Level maneja TODO (emails, WhatsApp, calendarios, pipeline, landing pages)
- No usar herramientas problemáticas como Lobable (demasiados problemas)
- El sistema debe resolver problemas, no crearlos

---

## 3. ESTRUCTURA DE PAGOS ACORDADA

### Fase 1: Setup / Desarrollo (DIVIDIDO 50/50)

**Monto Total:** $2,500 USD ≈ **42,800 pesos mexicanos**

**Primer Pago (HOY/Anticipado):**
- **$1,250 USD** (21,400 pesos mexicanos)
- Convertido desde: **250 USD** inicial + **1,000 USD** más = **1,250 USD**
- Se realizó el pago de **250 USD** (4,283 pesos mexicanos) en la llamada via Stripe
- Falta: **1,000 USD** adicionales (17,117 pesos mexicanos)
- **Timing:** Hoy o mañana (antes de la reunión del miércoles)

**Segundo Pago (Al finalizar proyecto):**
- **$1,250 USD** (21,400 pesos mexicanos) - 50%
- Condición: Sistema completamente funcional, aprobado y en Go Live
- Plazo: Dentro de 5 días después de Go Live

### Fase 2: Acompañamiento Mensual

**Valor Base Establecido:** $500 USD mensuales

**Estructura Final a Negociar con Cliente Final:**

El acuerdo establece que Carlos puede negociar con la doctora según estas opciones:

**Opción A - Valor Fijo:**
- $500 USD mensuales fijos
- Incluye: soporte, mantenimiento, mejora continua

**Opción B - Modelo Híbrido (RECOMENDADO):**
- $300 USD base mensuales
- Plus: 10% de la facturación adicional generada
- **Ejemplo:** Si la clínica genera $10,000 USD extras/mes = $300 + $1,000 comisión = $1,300 total

### Distribución de Ingresos

1. **Algorith Pro** recibe: Setup ($2,500 USD) + Acompañamiento ($500 USD/mes)
2. **Carlos Perlaza** cobra a la doctora:
   - Setup + Campañas de publicidad (Meta Ads)
   - Mensualidad según la estructura negociada
   - Comisión de campañas publicitarias (independiente)
   - "Pellizco" de herramientas/softwares utilizados

3. **La Doctora (Cliente Final)** paga:
   - Setup único
   - Mensualidad de mejora continua
   - Campañas y publicidad (a Carlos)
   - **NO paga directo por licencia Go High Level** (incluida en la solución)

---

## 4. CRONOGRAMA Y PRÓXIMOS PASOS

### Inmediato (Hoy/Mañana)
- ✅ Pago de 250 USD realizado en la llamada via Stripe
- [ ] Completar pago de 1,000 USD restantes (antes del miércoles)
- [ ] Recepción de contrato por correo (John enviará)
- [ ] Aclaraciones sobre hosting/dominio con la doctora

### Reunión Oficial de Onboarding
**Fecha:** Miércoles 10 (de la llamada) a las **9:00 AM hora México**  
**Formato:** Virtual/Remota  
**Duración:** 3 horas  
**Participantes:** John + Carlos + posiblemente la Doctora  
**Objetivo:** 
- Presentación de requisitos técnicos
- Recolección de información de la clínica
- Definición de hosting y dominio
- Inicio formal del proyecto

**Tareas para Carlos (antes del miércoles):**
- Traer toda información del proyecto actual
- Datos del hosting y dominio (si ya tiene)
- Información de la doctora y clínica
- Aclaraciones sobre puntos técnicos

### Fase de Desarrollo (Post-Onboarding)
**Duración:** 15-30 días hábiles
- Configuración de Go High Level
- Setup de pipelines y automatizaciones
- Integración de canales
- Configuración de pagos
- Pruebas completas

### Fase de Testing y Ajustes
**Duración:** 5-10 días
- QA completo
- Ajustes según feedback
- Capacitación del equipo

### Go Live
**Duración:** 1 día
- Activación en producción
- Monitoreo inicial

**Entonces:** Segundo pago 5 días después

---

## 5. CUENTA DE GO HIGH LEVEL

- **Proveedor:** Algorith Pro (John) suministrará una cuenta
- **Transferibilidad:** La cuenta es independiente y puede exportarse
- **Futuro:** Carlos puede convertirse en agencia oficial de Go High Level
- **Beneficio:** No hay costo adicional de Go High Level para la cliente final
- **Nota:** Carlos quiere una cuenta GHL **aparte** (no dentro de la de John)

---

## 6. PUNTOS CLAVE DE LA NEGOCIACIÓN

### Lo que quedó claro:
1. **Carlos es emprendedor serio:**
   - 25-30 años en negocios
   - Antes tenía socios, ahora trabaja con colaboradores contratados
   - Tiene contactos en múltiples países
   - Paga a proveedores por adelantado (para evitar problemas)

2. **La doctora es cliente buena:**
   - Ya pagó por la página web del sitio
   - Interesada en mejorar su negocio
   - Específica en sus requisitos:
     - Historial médico de pacientes
     - Mensajes de preparación pre-cita
     - Seguimiento post-cita
     - Secuencias de avisos para cancelaciones

3. **El mercado de México:**
   - Precios bajos en el centro (Puebla, DF)
   - Mejor capacidad de pago en el norte (Monterrey)
   - Carlos está pivotando hacia el norte
   - Pesos mexicanos = difícil convertir a dólares (se ve muy caro)

4. **Filosofía de win-win:**
   - John (Algorith Pro) quiere que todos salgan felices
   - Carlos aprende a mantener y mejorar sistemas
   - La doctora genera más facturación
   - Todos ganan juntos

5. **Replicabilidad:**
   - Objetivo: Crear una solución **genérica y replicable**, no personalizada
   - Una vez funcione con la doctora, Carlos puede venderla a otros
   - El modelo debe ser escalable (no solo para una clínica)

---

## 7. PUNTOS SENSIBLES A RECORDAR

⚠️ **Carlos es cauteloso:**
- Necesita ver resultados antes de invertir más
- Flujo de caja es importante para él
- Busca recuperar inversión rápido
- Quiere cerrar con la doctora primero antes de invertir la mensualidad

⚠️ **La doctora aún no cierra el deal:**
- Se han cancelado 3 reuniones
- Necesita ver demostrativo del sistema
- Una vez cierre con la doctora, Carlos tendrá más confianza

⚠️ **La mensualidad es zona gris:**
- Aún no definida con la doctora
- Dependerá de cómo presente Carlos el modelo
- John propone negociar con estructura de porcentaje sobre facturación
- Carlos quiere asegurarse que la doctora puede pagar

---

## 8. CONTACTOS Y COMUNICACIÓN

**Correos a confirmar:**
- John (Algorith Pro): [A definir]
- Carlos Perlaza: [carlos@...] - A obtener del contrato

**Teléfono Carlos:** 
- Disponible desde muy temprano
- 3 horas de diferencia con John

**Reunión Agendada:**
- Calendario de onboarding: "reunión de onboarding sistema de crecimiento con IA"
- Invitación enviada a: carlos@... (pendiente confirmar recepción)

---

## 9. DOCUMENTACIÓN ACORDADA

**John debe enviar por correo:**
1. ✅ Link de pago de Stripe (1,000 USD restantes)
2. [ ] Contrato completo (este documento)
3. [ ] Documento con condiciones de pago y estructura
4. [ ] Especificaciones técnicas preliminares

**Carlos debe traer el miércoles:**
1. Información de hosting y dominio
2. Detalles de la clínica (servicios, doctores, etc.)
3. Información de acceso actual
4. Cualquier documentación del proyecto

---

## 10. RESUMEN EJECUTIVO

| Aspecto | Detalle |
|---------|---------|
| **Proyecto** | Sistema de automatización GHL para clínicas (piloto: doctora en Puebla) |
| **Solución** | Go High Level con pipelines, agendamiento, historiales, pagos, publicidad |
| **Inversión Total** | $2,500 USD (pagos 50/50) |
| **Primer Pago** | 250 USD ✅ + 1,000 USD pendiente |
| **Segundo Pago** | 1,250 USD (5 días después de Go Live) |
| **Mensualidad** | $500 USD (negociable a modelo híbrido con cliente) |
| **Duración Setup** | 30-45 días hábiles |
| **Onboarding** | Miércoles 9:00 AM hora México |
| **Objetivo Final** | Crear solución replicable para expandir agencia de Carlos |
| **Estado** | ✅ Acuerdos confirmados - Listo para comenzar |

---

**Documento preparado para:** John (Algorith Pro)  
**Para compartir con:** Carlos Perlaza  
**Fecha creación:** 11 de agosto de 2026  
**Versión:** 1.0 - FINAL
