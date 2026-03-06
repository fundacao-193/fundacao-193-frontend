# Script de teste para o endpoint de contato
Write-Host "`n=== TESTE DO ENDPOINT DE CONTATO ===" -ForegroundColor Cyan

# Dados de teste
$body = @{
    nome = "Teste Sistema"
    email = "teste@fundacao193.org.br"
    assunto = "Teste de Integracao"
    mensagem = "Esta e uma mensagem de teste para validar o formulario de contato."
}

$jsonBody = $body | ConvertTo-Json -Compress
Write-Host "`nEnviando requisicao..." -ForegroundColor Yellow
Write-Host "Dados: $jsonBody" -ForegroundColor Gray

try {
    $response = Invoke-RestMethod `
        -Uri "http://fundacao-193-wp.local/wp-json/fundacao193/v1/contato" `
        -Method POST `
        -Body $jsonBody `
        -ContentType "application/json; charset=utf-8"
    
    Write-Host "`n✓ SUCESSO!" -ForegroundColor Green
    Write-Host "`nResposta da API:" -ForegroundColor Cyan
    $response | Format-List
    
    Write-Host "`n✓ Proximos passos:" -ForegroundColor Yellow
    Write-Host "  1. Acesse: http://fundacao-193-wp.local/wp-admin" -ForegroundColor White
    Write-Host "  2. Vá em: Mensagens de Contato" -ForegroundColor White
    Write-Host "  3. Verifique se a mensagem apareceu!" -ForegroundColor White
    
} catch {
    Write-Host "`n✗ ERRO ao enviar mensagem" -ForegroundColor Red
    Write-Host "Detalhes:" -ForegroundColor Yellow
    
    if ($_.Exception.Response) {
        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        $errorBody = $reader.ReadToEnd()
        Write-Host $errorBody -ForegroundColor Red
    } else {
        Write-Host $_.Exception.Message -ForegroundColor Red
    }
}

Write-Host "`n"
