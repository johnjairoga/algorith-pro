@echo off
REM Script de ejecución para GHL Setup - Windows
REM Fase 1: Configuración automatizada de GoHighLevel

echo.
echo ╔══════════════════════════════════════════════════════════════════╗
echo ║                  GHL SETUP - FASE 1                            ║
echo ║      Integración GoHighLevel para Conecta Pesquisadores       ║
echo ╚══════════════════════════════════════════════════════════════════╝
echo.

REM Verificar que Node.js está instalado
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Error: Node.js no está instalado
    echo.
    echo Descarga Node.js desde: https://nodejs.org
    echo.
    pause
    exit /b 1
)

echo ✅ Node.js encontrado
node --version
echo.

REM Verificar que npm está instalado
npm --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Error: npm no está instalado
    pause
    exit /b 1
)

echo ✅ npm encontrado
npm --version
echo.

REM Verificar que .env existe
if not exist ".env" (
    echo ❌ Error: archivo .env no encontrado en la carpeta actual
    echo.
    echo Por favor verifica que estás en la carpeta correcta:
    echo Periodicos Alagoas/CRM/
    echo.
    pause
    exit /b 1
)

echo ✅ Archivo .env encontrado
echo.

REM Verificar si node_modules existe
if not exist "node_modules\" (
    echo ⚠️  node_modules no encontrado
    echo.
    echo Instalando dependencias con npm install...
    echo.
    call npm install
    if errorlevel 1 (
        echo ❌ Error en npm install
        pause
        exit /b 1
    )
    echo.
)

REM Ejecutar el script
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo Ejecutando GHL Setup Script...
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.

call node scripts/ghl_setup.js

if errorlevel 1 (
    echo.
    echo ❌ Error durante la ejecución del script
    echo.
    pause
    exit /b 1
)

echo.
echo ╔══════════════════════════════════════════════════════════════════╗
echo ║                ✅ EJECUCIÓN COMPLETADA                         ║
echo ╚══════════════════════════════════════════════════════════════════╝
echo.
echo Próximos pasos:
echo 1. Revisar el archivo GHL_SETUP_REPORT.json
echo 2. Acceder a GHL para validar que la estructura fue creada
echo 3. Crear un contacto de prueba en GHL
echo 4. Proceder a Fase 2: API Integration
echo.
pause
