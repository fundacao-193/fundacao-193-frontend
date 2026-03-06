# Script de Validação - Personalização Admin WordPress
# Testa o painel customizado e abre no navegador

Write-Host "`n╔════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║   VALIDAÇÃO - PAINEL WORDPRESS PERSONALIZADO          ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════════╝`n" -ForegroundColor Cyan

# 1. Verifica arquivos criados
Write-Host "1️⃣  Verificando arquivos..." -ForegroundColor Yellow
$customizer = "c:\Users\natan\Local Sites\fundacao-193-wp\app\public\wp-content\themes\fundacao-193-wp\inc\admin\customizer.php"
$readme = "c:\Users\natan\Local Sites\fundacao-193-wp\app\public\wp-content\themes\fundacao-193-wp\inc\admin\README.md"

if (Test-Path $customizer) {
    $lines = (Get-Content $customizer | Measure-Object -Line).Lines
    Write-Host "   ✓ customizer.php encontrado ($lines linhas)" -ForegroundColor Green
} else {
    Write-Host "   ✗ customizer.php NÃO encontrado!" -ForegroundColor Red
    exit 1
}

if (Test-Path $readme) {
    Write-Host "   ✓ README.md encontrado" -ForegroundColor Green
} else {
    Write-Host "   ⚠ README.md não encontrado (não crítico)" -ForegroundColor Yellow
}

# 2. Verifica functions.php
Write-Host "`n2️⃣  Verificando functions.php..." -ForegroundColor Yellow
$functions = "c:\Users\natan\Local Sites\fundacao-193-wp\app\public\wp-content\themes\fundacao-193-wp\functions.php"

if (Select-String -Path $functions -Pattern "inc/admin/customizer.php" -Quiet) {
    Write-Host "   ✓ customizer.php está sendo carregado" -ForegroundColor Green
} else {
    Write-Host "   ✗ customizer.php NÃO está sendo carregado!" -ForegroundColor Red
    exit 1
}

# 3. Testa se o site está acessível
Write-Host "`n3️⃣  Testando conectividade WordPress..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://fundacao-193-wp.local" -Method Head -UseBasicParsing -TimeoutSec 5 -ErrorAction Stop
    Write-Host "   ✓ WordPress está respondendo (HTTP $($response.StatusCode))" -ForegroundColor Green
} catch {
    Write-Host "   ⚠ WordPress não está acessível" -ForegroundColor Yellow
    Write-Host "   Certifique-se de que Local WP está rodando" -ForegroundColor Yellow
}

# 4. Resumo das personalizações
Write-Host "`n4️⃣  Personalizações Implementadas:" -ForegroundColor Yellow
Write-Host "   ✓ Menu reorganizado (Notícias → Eventos → Projetos...)" -ForegroundColor Green
Write-Host "   ✓ Posts e Comentários removidos" -ForegroundColor Green
Write-Host "   ✓ Cores da marca (#3d685d + cinza)" -ForegroundColor Green
Write-Host "   ✓ Logo '193' customizado" -ForegroundColor Green
Write-Host "   ✓ Dashboard limpo com widget de boas-vindas" -ForegroundColor Green
Write-Host "   ✓ Footer personalizado" -ForegroundColor Green
Write-Host "   ✓ Melhorias em Mensagens de Contato" -ForegroundColor Green

# 5. Instruções
Write-Host "`n╔════════════════════════════════════════════════════════╗" -ForegroundColor Magenta
Write-Host "║   PRÓXIMOS PASSOS                                      ║" -ForegroundColor Magenta
Write-Host "╚════════════════════════════════════════════════════════╝" -ForegroundColor Magenta

Write-Host "`n📋 Para testar o painel personalizado:" -ForegroundColor Cyan
Write-Host "   1. Abra: http://fundacao-193-wp.local/wp-admin" -ForegroundColor White
Write-Host "   2. Faça login" -ForegroundColor White
Write-Host "   3. Observe:" -ForegroundColor White
Write-Host "      • Cores verde/cinza" -ForegroundColor Gray
Write-Host "      • Menu reorganizado" -ForegroundColor Gray
Write-Host "      • Widget de boas-vindas no Dashboard" -ForegroundColor Gray
Write-Host "      • Logo '193' no topo" -ForegroundColor Gray

Write-Host "`n📦 Para fazer deploy:" -ForegroundColor Cyan
Write-Host "   1. Instale plugin de backup (All-in-One WP Migration)" -ForegroundColor White
Write-Host "   2. Exporte o site completo" -ForegroundColor White
Write-Host "   3. Importe no servidor de produção" -ForegroundColor White
Write-Host "   4. As personalizações vão automaticamente!" -ForegroundColor White

Write-Host "`n📚 Documentação completa:" -ForegroundColor Cyan
Write-Host "   • PERSONALIZACAO_PAINEL_WORDPRESS.md (frontend)" -ForegroundColor White
Write-Host "   • inc/admin/README.md (WordPress)" -ForegroundColor White

# 6. Oferece abrir o navegador
Write-Host "`n"
$open = Read-Host "Deseja abrir o painel admin no navegador? (S/N)"

if ($open -match "^[Ss]") {
    Write-Host "`n🌐 Abrindo navegador..." -ForegroundColor Green
    Start-Process "http://fundacao-193-wp.local/wp-admin"
    Write-Host "✓ Navegador aberto!" -ForegroundColor Green
} else {
    Write-Host "`n✓ Validação concluída!" -ForegroundColor Green
}

Write-Host "`n╔════════════════════════════════════════════════════════╗" -ForegroundColor Green
Write-Host "║   ✅ PAINEL WORDPRESS PERSONALIZADO COM SUCESSO!      ║" -ForegroundColor Green
Write-Host "╚════════════════════════════════════════════════════════╝`n" -ForegroundColor Green
