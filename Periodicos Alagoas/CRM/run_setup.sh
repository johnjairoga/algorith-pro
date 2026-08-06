#!/bin/bash

# Script de ejecución para GHL Setup - Mac/Linux
# Fase 1: Configuración automatizada de GoHighLevel

echo ""
echo "╔══════════════════════════════════════════════════════════════════╗"
echo "║                  GHL SETUP - FASE 1                            ║"
echo "║      Integración GoHighLevel para Conecta Pesquisadores       ║"
echo "╚══════════════════════════════════════════════════════════════════╝"
echo ""

# Verificar que Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Error: Node.js no está instalado"
    echo ""
    echo "Instala Node.js con:"
    echo "  Mac: brew install node"
    echo "  Linux: sudo apt-get install nodejs npm"
    echo ""
    exit 1
fi

echo "✅ Node.js encontrado"
node --version
echo ""

# Verificar que npm está instalado
if ! command -v npm &> /dev/null; then
    echo "❌ Error: npm no está instalado"
    exit 1
fi

echo "✅ npm encontrado"
npm --version
echo ""

# Verificar que .env existe
if [ ! -f ".env" ]; then
    echo "❌ Error: archivo .env no encontrado en la carpeta actual"
    echo ""
    echo "Por favor verifica que estás en la carpeta correcta:"
    echo "Periodicos Alagoas/CRM/"
    echo ""
    exit 1
fi

echo "✅ Archivo .env encontrado"
echo ""

# Verificar si node_modules existe
if [ ! -d "node_modules" ]; then
    echo "⚠️  node_modules no encontrado"
    echo ""
    echo "Instalando dependencias con npm install..."
    echo ""
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ Error en npm install"
        exit 1
    fi
    echo ""
fi

# Ejecutar el script
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Ejecutando GHL Setup Script..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

node scripts/ghl_setup.js

if [ $? -ne 0 ]; then
    echo ""
    echo "❌ Error durante la ejecución del script"
    echo ""
    exit 1
fi

echo ""
echo "╔══════════════════════════════════════════════════════════════════╗"
echo "║                ✅ EJECUCIÓN COMPLETADA                         ║"
echo "╚══════════════════════════════════════════════════════════════════╝"
echo ""
echo "Próximos pasos:"
echo "1. Revisar el archivo GHL_SETUP_REPORT.json"
echo "2. Acceder a GHL para validar que la estructura fue creada"
echo "3. Crear un contacto de prueba en GHL"
echo "4. Proceder a Fase 2: API Integration"
echo ""
