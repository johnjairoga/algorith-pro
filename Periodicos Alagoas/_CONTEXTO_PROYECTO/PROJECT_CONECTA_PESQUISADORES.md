# 📋 PROYECTO CONECTA PESQUISADORES UFAL
## Landing Page + Formulario de Calificación Inteligente

**Estado:** ✅ Estructura definida | ⏳ Pendientes de CRM  
**Fecha de inicio:** Agosto 2026  
**Responsable:** John Jairo Garcia Arcentales  

---

## 📑 RESUMEN EJECUTIVO

Sistema de captación de investigadores para 3 revistas de la UFAL mediante:
- **Landing Page única** con call-to-action claro
- **Formulario one-step** que cualifica automáticamente
- **Roteamiento inteligente** según área de investigación
- **Integración CRM** (GoHighLevel) con automaciones

**Objetivo:** Capturar +20 leads/mes por revista con perfiles calificados

---

## 🏗️ ARQUITECTURA DEL PROYECTO

### Páginas

#### 1. **Landing Page** (`/`)
```
├─ Hero Section
│  ├─ Logo UFAL
│  ├─ Headline: "Publique sua Pesquisa em Revistas de Excelência da UFAL"
│  ├─ Subheadline: "Descubra qual revista é perfeita para seu trabalho"
│  ├─ CTA Primario: "Começar a Publicar" → redirige a /qualificacao
│  └─ Visual: Ilustración minimalista (pesquisadores/artículos)
│
└─ Footer
   ├─ "Conecta Pesquisadores — UFAL"
   ├─ Email: info@artificialctrl.com
   ├─ Copyright: © 2024-2026 UFAL | Powered by ArtificialCtrl
   └─ Links: Privacy Policy, Terms (TBD)
```

**Nota:** Sin sección de revistas (limpio, directo)

---

#### 2. **Página de Calificación** (`/qualificacao`)

**Header Sticky:**
- Logo Conecta Pesquisadores
- Botón "Voltar ao início" (regresa a `/`)

**Flujo Formulario — One-Step:**

| Paso | Campo | Tipo | Requerido | Detalles |
|------|-------|------|-----------|----------|
| **0** | Nombre completo | Text | Sí | Min 3, máx 100 caracteres |
| **0** | Email | Email | Sí | Validación de formato |
| **0** | WhatsApp | Tel | Sí | Selector de bandera + validación |
| **0** | Checkbox LGPD | Checkbox | Sí | "Acepto términos de privacidad" |
| **1** | Área de investigación | Radio (4 op) | Sí | Ver opciones abajo |
| **2** | Nivel académico | Radio (5 op) | Sí | Ver opciones abajo |
| **3** | Artículo listo | Radio (3 op) | Sí | Sí / Escribiendo / Explorando |
| **4** | Cuándo publicar | Radio (4 op) | Sí | 30 días / 3 meses / 6 meses / Sin fecha |

**Opciones de Área de Investigación:**
- [ ] Economía, Desarrollo, Administración, Políticas Públicas → **REPD**
- [ ] Agronomía, Ciencias del Suelo, Producción Animal/Vegetal → **Revista Ciência Agrícola**
- [ ] Historia, Historiografía, Estudios Históricos → **Revista Crítica Histórica**
- [ ] Otras Ciencias Sociales Aplicadas → Sugerencia por similitud

**Opciones de Nivel Académico:**
- [ ] Estudiante de grado
- [ ] Estudiante de maestría/especialización
- [ ] Estudiante de doctorado
- [ ] Investigador/Profesor con posdoctorado
- [ ] Investigador/Profesor establecido

**Opciones de Artículo Listo:**
- [ ] Sí, tengo artículo pronto
- [ ] No, pero estoy escribiendo
- [ ] Aún no, solo explorando oportunidades

**Opciones Cuándo Publicar:**
- [ ] Próximos 30 días
- [ ] Próximos 3 meses
- [ ] Próximos 6 meses
- [ ] Sin fecha definida

---

## 🔄 LÓGICA DE ROUTING Y TAGS

### Routing por Área:
```javascript
// Mapeó de área → revista
const routingMap = {
  "economia": "REPD",
  "agronomia": "REVISTA_CIENCIA_AGRICOLA",
  "historia": "REVISTA_CRITICA_HISTORICA",
  "other": "suggest_by_similarity"
}
```

### Tags Automáticos (GHL):

**Por Revista:**
- `REPD`
- `REVISTA_CIENCIA_AGRICOLA`
- `REVISTA_CRITICA_HISTORICA`

**Por Cualificación:**
- `LEAD_QUENTE` — Si artículo status = "Sí, tengo artículo pronto"
- `LEAD_EDUCACIONAL` — Si nivel < Maestría Y artículo status = "Explorando"
- `LEAD_PARCIAL` — Paso 0 completado (datos básicos)

**Por Timeline:**
- `INTENT_30_DIAS`
- `INTENT_3_MESES`
- `INTENT_6_MESES`
- `INTENT_SIN_FECHA`

---

## 📊 INTEGRACIÓN CRM (GoHighLevel)

### IDs Configurados:
```
trackingId: tk_c15c37470edf428b81ade5811d26fa13
locationId: XuChmr0YIHg823jqvZTN
projectId: 1785846120717677855
```

### Flujo de Datos:

**Paso 0 Completado:**
```
Trigger: Usuario completa datos básicos + LGPD
Acción: Enviar a GHL con tag LEAD_PARCIAL
Datos: Nombre, Email, WhatsApp
```

**Formulario Completo:**
```
Trigger: Usuario completa todos los 5 pasos
Acción: Enviar a GHL con tags de revista + cualificación + timeline
Datos: Todos los campos + revista asignada
```

---

## 🎨 PANTALLA FINAL

**Mensaje:**
```
✨ PARABÉNS! VOCÊ ENCONTROU A REVISTA CERTA

[Mensaje personalizado según revista]

📚 Beneficios dentro da comunidade:
✓ Acesso a comunidade verificada de pesquisadores
✓ Orientação de especialistas da universidade
✓ Checklist completo de submissão

[BOTÃO GRANDE AZUL] Acessar Comunidade Agora
[Link do grupo WhatsApp]
```

**Comportamiento:**
- Sin botón "Voltar ao início" en último paso
- CTAssignmentButton redirige a grupo WhatsApp (link real)
- Datos guardados automáticamente en GHL

---

## 📈 TRACKING E ANALYTICS

### Google Tag Manager
**ID:** GTM-WZMZ5773

**Eventos a rastrear:**
- Page view Landing Page
- Click CTA "Comenzar a Publicar"
- Formulario iniciado (Paso 0)
- Cada paso completado (Paso 1-5)
- Formulario enviado exitoso
- Click "Acessar Comunidade"

### SEO & Meta Tags
- OG tags (Open Graph) configurados
- Twitter cards configurados
- Favicon SVG personalizado
- Meta description única
- Canonical tags

---

## 🎨 DISEÑO VISUAL

### Paleta de Colores
- **Primario (CTAs):** Azul UFAL `#1E3A8A`
- **Fondo:** Blanco `#FFFFFF` o gris muy claro `#F8F9FA`
- **Acentos:** Gris oscuro `#374151`
- **Éxito:** Verde `#10B981`
- **Error:** Rojo `#EF4444`

### Tipografía
- **Sans-serif moderna:** Inter, Poppins, Roboto Flex
- **Títulos:** Bold 32-48px
- **Subtítulos:** 18-20px, regular
- **Cuerpo:** 16px mobile, 16-18px desktop
- **CTAs:** Bold 16px, maiúsculas o título case

### Responsividad
- ✅ Mobile (< 768px)
- ✅ Tablet (768px - 1024px)
- ✅ Desktop (> 1024px)

### Animaciones
- Fade-in entre pasos (300ms)
- Slide-up en entrada de inputs
- Scale-in en confirmaciones
- Sin animaciones pesadas en mobile

### Validaciones
- Validación en tiempo real
- Mensajes de error en rojo, debajo del campo
- Mensajes de éxito en verde
- Focus states claros

---

## ⏳ PENDIENTES — ACCIONES INMEDIATAS

### 🔴 CRÍTICO (Bloquea Go-Live)

- [ ] **Crear grupos WhatsApp** (3 grupos, uno por revista)
  - REPD: `https://chat.whatsapp.com/[ID]` ← Obtener link público
  - Revista Ciência Agrícola: `https://chat.whatsapp.com/[ID]`
  - Revista Crítica Histórica: `https://chat.whatsapp.com/[ID]`
  - ⏱️ Responsable: Ronaldo (UFAL)

- [ ] **Email para notificaciones internas**
  - ¿Quién recibe alertas de nuevo lead? (john@triadeflow.com.br?)
  - ⏱️ Responsable: John

### 🟡 IMPORTANTE (Próxima semana)

- [ ] **Automación Lead Quente**
  - Trigger: Tag `LEAD_QUENTE`
  - Acción: Enviar WhatsApp en 1 hora
  - Mensaje: "Ótimo! Vi que você tem um artigo pronto. Vamos agendar uma ligação?"
  - ⏱️ Responsable: John (GHL setup)

- [ ] **Automación Lead Educacional**
  - Trigger: Tag `LEAD_EDUCACIONAL`
  - Acción: Enviar 3 e-mails en 3 días
  - Email 1: "Como estruturar um artigo científico"
  - Email 2: "Cronograma de submissão 2026"
  - Email 3: "Checklist antes de enviar"
  - ⏱️ Responsable: John (GHL setup) + Ronaldo (contenido emails)

- [ ] **Automación de Bienvenida WhatsApp**
  - Trigger: Formulario completado
  - Acción: Enviar mensaje de bienvenida personalizado por revista
  - Delay: 24h después de llenar formulario
  - ⏱️ Responsable: John (GHL setup)

- [ ] **Notificación Interna al Equipo**
  - Trigger: Nuevo formulario completado
  - Acción: Email/SMS a equipo con datos del lead
  - Contenido: Nombre, Email, Revista asignada, Nivel académico, Timeline
  - ⏱️ Responsable: John (GHL setup)

### 🟢 OPCIONAL (Después de Go-Live)

- [ ] Crear página de Privacy Policy
- [ ] Crear página de Terms of Service
- [ ] Optimizar para SEO (backlinks, sitemap)
- [ ] A/B testing de headlines

---

## 🚀 PRÓXIMOS PASOS (FASE 2)

### Semana 1 (Agosto 11-15)
- [ ] Recopilar links de grupos WhatsApp
- [ ] Configurar automaciones en GHL
- [ ] Testing end-to-end (llenar formulario en todos los escenarios)

### Semana 2 (Agosto 18-22)
- [ ] Publicar Landing Page en dominio oficial
- [ ] Implementar GTM tracking
- [ ] Crear anuncios Meta Ads iniciales

### Semana 3+ (Agosto 25+)
- [ ] Lanzar campañas Meta Ads
- [ ] Monitorear primeros leads
- [ ] Optimizar según datos

---

## 📞 CONTACTOS DE EQUIPO

| Rol | Nombre | Email | WhatsApp |
|-----|--------|-------|----------|
| **Técnica** | John Jairo | info@artificialctrl.com | +55 (85) 9XXXX-XXXX |
| **Coordinación** | Ronaldo | ronaldo.ferreira@ufal.edu.br | +55 (82) 9XXXX-XXXX |
| **Soporte CRM** | [TBD] | - | - |

---

## 📚 DOCUMENTOS REFERENCIA

- `PROMPT_LP_FORMULARIO_GHL.md` — Prompt original para AI Studio
- `PDR_Plano_Implementacao.md` — Plan de implementación general
- `formulario_informacoes_periodico.md` — Formulario para editores

---

## ✅ CHECKLIST FINAL (PRE-LANZAMIENTO)

- [ ] Formulario captura todos los campos sin errores
- [ ] Validaciones funcionan (requeridos, formato, etc.)
- [ ] Routing asigna correctamente según área
- [ ] Datos se envían a GHL correctamente
- [ ] Tags GHL creadas y funcionando
- [ ] Links WhatsApp válidos y testados
- [ ] Design responsive en mobile/tablet/desktop
- [ ] GTM instalado y rastreando eventos
- [ ] Automaciones GHL configuradas y testadas
- [ ] No hay errores de console/JavaScript
- [ ] Prueba end-to-end completa (llenar → WhatsApp → painel GHL)

---

*Documento versión 1.0 — Agosto 2026*  
*Proyecto: Conecta Pesquisadores UFAL | UFAL/FAPEAL*
