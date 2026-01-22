Import-Module "$PSScriptRoot\AgentSwarm.psm1" -Force
$res = Invoke-Llm -AgentName "Dijkstra" -FullPrompt "Create a JSON list of 3 fruits. Format: [{name: 'apple'}, ...]"
Write-Host "RAW RESPONSE:" -ForegroundColor Yellow
Write-Host $res
Write-Host "---"
