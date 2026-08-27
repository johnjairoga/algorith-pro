# ESTRUCTURA DE CARPETAS PROPUESTA - CARLOS PERLAZA

## Organización Actual vs Propuesta

### ❌ ESTADO ACTUAL
```
Carlos Perlaza/
└── Documentos/
    ├── CHECKLIST_TAREAS_PENDIENTES.md
    ├── CONTRATO*.pdf / *.docx (5 versiones)
    ├── FLUJOS_PROCESOS_SISTEMA_GHL.md
    ├── FORM_RECOLECCION_INFO_CLINICA.md
    ├── PIPELINE*.md (3 archivos)
    ├── SUBETAPAS_DETALLADAS_TODOS_PIPELINES.md
    ├── Llamadas/
    │   └── RESUMEN_ACUERDOS_LLAMADA.md
    ├── Contrato firmado/
    │   └── SERVICIOS_DE_AUTOMATIZACICDA_EN_TECNOLOG%CDA.pdf
    ├── Modificaciones - Onboarding 01 12-08-2026.docx
    ├── README.md
    ├── QUICK_REFERENCE.md
    ├── TEMPLATE_EMAIL_PARA_CARLOS.txt
    ├── RESUMEN_CAMBIOS_V2.md
    └── LISTA_ARCHIVOS.txt
```

### ✅ ESTRUCTURA PROPUESTA (NUEVA)

```
Carlos Perlaza/
│
├── 📋 00_INICIO/
│   ├── README.md                              (Índice maestro del proyecto)
│   ├── QUICK_REFERENCE.md                     (Referencia rápida)
│   └── _CHECKLIST_PROYECTO.md                 (Estado general)
│
├── ⚖️ 01_CONTRATO_Y_LEGAL/
│   ├── CONTRATO_FINAL_FIRMADO.pdf            (Versión oficial)
│   ├── Contrato_Prestacion_Servicios_Automatizacion_Carlos_Perlaza.md
│   ├── Historial_Versiones/
│   │   ├── v1_Original.docx
│   │   ├── v2_Ediciones.docx
│   │   ├── v3_Completo.docx
│   │   └── [otras versiones antiguas]
│   └── Notas_Legales.md
│
├── 🚀 02_ONBOARDING/
│   ├── 📅 REUNION_MIERCOLES_14_AGOSTO.md     (Plan de reunión)
│   ├── FORM_RECOLECCION_INFO_CLINICA.md      (Formulario para llevar)
│   ├── Documentos_a_Traer_Checklist.md
│   ├── Modificaciones_Onboarding_12_08_2026.docx
│   └── Email_Template_Carlos.txt
│
├── 📐 03_ESPECIFICACION_TECNICA/
│   │
│   ├── 📊 Flujos/
│   │   ├── FLUJOS_PROCESOS_SISTEMA_GHL.md    (7 flujos principales)
│   │   ├── Agendamiento_Detallado.md         (si se expande después)
│   │   ├── Historiales_Detallado.md
│   │   └── Comunicacion_Detallado.md
│   │
│   ├── 🔄 Pipelines/
│   │   ├── PIPELINES_GHL_OVERVIEW.md         (8 pipelines resumido)
│   │   ├── Pipeline_01_Consulta_Inicial.md
│   │   ├── Pipeline_02_Cirugia_Plastica.md
│   │   │   ├── PIPELINE_CIRUGIA_DETALLADA_FLUJO_COMPLETO.md
│   │   │   └── SUBETAPAS_CIRUGÍA.md
│   │   ├── Pipeline_03_Laser_Estetica.md
│   │   ├── Pipeline_04_Clinica_Hombres.md
│   │   ├── Pipeline_05_Trasplante_Cabello.md
│   │   ├── Pipeline_06_Retencion.md
│   │   ├── Pipeline_07_Reactivacion.md
│   │   └── Pipeline_08_Leads_Frios.md
│   │
│   ├── ⚙️ Automations/
│   │   ├── AUTOMATIONS_OVERVIEW.md           (Resumen de automations)
│   │   ├── Automations_Pipeline_1.md
│   │   ├── Automations_Pipeline_2.md
│   │   └── [etc por pipeline]
│   │
│   └── 📝 SUBETAPAS_DETALLADAS_TODOS_PIPELINES.md (Documento maestro - 41 etapas)
│
├── 🏥 04_INFORMACION_CLINICA/
│   ├── Clinica_Dermatologica_Puebla_SUMMARY.md
│   ├── Servicios_Ofrecidos.md
│   ├── Doctores_Especialidades.md
│   ├── Horarios_Disponibilidad.md
│   ├── Tarifas_y_Presupuestos.md
│   └── Datos_Acceso_Clinica.md               (Acceso a sistemas, dominios, etc.)
│
├── 💬 05_COMUNICACION/
│   ├── Llamadas/
│   │   ├── RESUMEN_ACUERDOS_LLAMADA_11_08_2026.md
│   │   ├── Notas_Llamada_Seguimiento.md
│   │   └── [futuras llamadas]
│   │
│   ├── Emails/
│   │   ├── TEMPLATE_EMAIL_PARA_CARLOS.txt
│   │   ├── Email_Confirmacion_Sprint_1.txt
│   │   └── [templates por tema]
│   │
│   ├── WhatsApp/
│   │   ├── Templates_Mensajes.md
│   │   └── Secuencias_Automaticas.md
│   │
│   └── Mensajes_Sistemas_GHL/
│       ├── Mensajes_Pipeline_1.md
│       ├── Mensajes_Pipeline_2.md
│       └── [por pipeline]
│
├── 📅 06_SPRINTS/
│   ├── SPRINT_PLAN_OVERVIEW.md               (Resumen de 4 sprints)
│   │
│   ├── Sprint_1_Semanas_1-2/
│   │   ├── Plan_Sprint_1.md
│   │   ├── Tareas_Asignadas.md
│   │   ├── Deliverables.md
│   │   └── Checklist_Completitud.md
│   │
│   ├── Sprint_2_Semanas_3-4/
│   │   ├── Plan_Sprint_2.md
│   │   └── [estructura similar]
│   │
│   ├── Sprint_3_Semanas_5-6/
│   │   ├── Plan_Sprint_3.md
│   │   └── [estructura similar]
│   │
│   └── Sprint_4_Semana_7/
│       ├── Plan_Sprint_4.md
│       └── [estructura similar]
│
├── 📊 07_REPORTES_Y_SEGUIMIENTO/
│   ├── Progreso_Proyecto.md
│   ├── Cambios_Solicitados.md                (RESUMEN_CAMBIOS_V2.md → aquí)
│   ├── Issues_Bloqueadores.md
│   └── Métricas_Exito.md
│
└── 🗂️ 08_ARCHIVOS_ANTIGUOS/
    ├── LISTA_ARCHIVOS.txt                    (referencia histórica)
    ├── TEMPLATE_VIEJO_EMAIL.txt
    └── [versiones previas no usadas]
```

---

## 📌 BENEFICIOS DE ESTA ESTRUCTURA

✅ **Claridad:** Cada carpeta tiene un propósito específico  
✅ **Navegación:** Fácil encontrar documentos por categoría  
✅ **Mantenimiento:** Historial de versiones organizadas  
✅ **Escalabilidad:** Fácil agregar nuevas subcarpetas  
✅ **Profesionalismo:** Estructura lista para cliente final  
✅ **Documentación:** README en inicio guía a nuevas personas  

---

## 🔄 PLAN DE MIGRACIÓN

### PASO 1: Crear estructura de carpetas (automático)
### PASO 2: Mover archivos a sus lugares (con git mv para mantener historial)
### PASO 3: Crear índices en cada carpeta (INDEX.md)
### PASO 4: Actualizar referencias cruzadas en documentos
### PASO 5: Commit a git con mensaje: "Organizar estructura de carpetas"

---

## ✅ ¿APROBAS ESTA ESTRUCTURA?

Si está OK, la ejecuto en los próximos pasos:
- [ ] Sí, crear la estructura exacta
- [ ] Sí, pero con cambios: _______________
- [ ] No, prefiero otra: _______________
