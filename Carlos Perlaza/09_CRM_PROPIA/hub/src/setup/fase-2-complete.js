import { spawn } from 'child_process';

async function executarScript(scriptPath, scriptName) {
  return new Promise((resolve, reject) => {
    console.log(`\n▶️  Executando: ${scriptName}\n`);

    const child = spawn('node', [scriptPath], {
      stdio: 'inherit',
      cwd: process.cwd()
    });

    child.on('exit', (code) => {
      if (code === 0) {
        console.log(`\n✅ ${scriptName} completado\n`);
        resolve(true);
      } else {
        console.error(`\n❌ ${scriptName} falhou com código ${code}\n`);
        reject(new Error(`${scriptName} falhou`));
      }
    });

    child.on('error', (err) => {
      console.error(`Erro ao executar ${scriptName}:`, err.message);
      reject(err);
    });
  });
}

async function executarFase2() {
  try {
    console.log('\n');
    console.log('███████████████████████████████████████████████████████████');
    console.log('███                                                       ███');
    console.log('███  🚀 FASE 2: CRIAR CAMPOS E TAGS EM GHL 🚀           ███');
    console.log('███                                                       ███');
    console.log('███████████████████████████████████████████████████████████\n');

    console.log('Este script vai executar, em ordem:\n');
    console.log('1. 📋 Campos Comerciais');
    console.log('2. ⚙️  Campos Operacionais');
    console.log('3. 🏷️  Todas as Tags\n');

    console.log('═══════════════════════════════════════════════════════════');

    // Passo 1: Campos Comerciais
    await executarScript(
      './src/setup/campos-comerciais.js',
      'Campos Comerciais'
    );

    // Passo 2: Campos Operacionais
    await executarScript(
      './src/setup/campos-operacionais.js',
      'Campos Operacionais'
    );

    // Passo 3: Todas as Tags
    await executarScript(
      './src/setup/criar-todas-tags.js',
      'Criação de Tags'
    );

    // Resumo final
    console.log('\n███████████████████████████████████████████████████████████');
    console.log('███                                                       ███');
    console.log('███  ✅ FASE 2 COMPLETADA COM SUCESSO! ✅               ███');
    console.log('███                                                       ███');
    console.log('███████████████████████████████████████████████████████████\n');

    console.log('📌 O que foi criado em GHL:\n');
    console.log('  ✓ 7 Campos Comerciais');
    console.log('  ✓ 6 Campos Operacionais');
    console.log('  ✓ 30 Tags de segmentación e automación\n');

    console.log('🎯 Próximos passos:\n');
    console.log('  1. Revisar campos e tags en GHL Console');
    console.log('  2. Ajustar descripción de campos si es necesario');
    console.log('  3. Crear formularios y webhooks (Fase 3)\n');

  } catch (error) {
    console.error('\n❌ ERRO NA FASE 2:', error.message);
    process.exit(1);
  }
}

executarFase2();
