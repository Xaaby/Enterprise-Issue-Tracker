# PowerShell script to add Java and Maven to PATH

Write-Host "Setting up Java and Maven PATH..." -ForegroundColor Green

# Find Java installation
$javaPaths = @(
    "C:\Program Files\Java",
    "C:\Program Files (x86)\Java",
    "$env:ProgramFiles\Java",
    "$env:ProgramFiles(x86)\Java"
)

$javaBinPath = $null
foreach ($path in $javaPaths) {
    if (Test-Path $path) {
        $jdkFolders = Get-ChildItem $path -Directory -ErrorAction SilentlyContinue | Where-Object { $_.Name -like "jdk*" -or $_.Name -like "java*" }
        if ($jdkFolders) {
            $latestJdk = $jdkFolders | Sort-Object Name -Descending | Select-Object -First 1
            $javaBinPath = Join-Path $latestJdk.FullName "bin"
            if (Test-Path $javaBinPath) {
                Write-Host "Found Java at: $javaBinPath" -ForegroundColor Yellow
                break
            }
        }
    }
}

# Find Maven (check if extracted)
$mavenBinPath = "C:\apache-maven-3.9.12\bin"
if (-not (Test-Path $mavenBinPath)) {
    Write-Host "Maven not found at $mavenBinPath" -ForegroundColor Red
    Write-Host "Please extract apache-maven-3.9.12-bin.zip to C:\apache-maven-3.9.12 first" -ForegroundColor Yellow
    Write-Host "Or update the path in this script if you extracted it elsewhere" -ForegroundColor Yellow
    exit
}

# Add to PATH
$currentPath = [Environment]::GetEnvironmentVariable("Path", "User")

$pathsToAdd = @()
if ($javaBinPath -and $currentPath -notlike "*$javaBinPath*") {
    $pathsToAdd += $javaBinPath
    Write-Host "Adding Java to PATH: $javaBinPath" -ForegroundColor Green
}

if ($currentPath -notlike "*$mavenBinPath*") {
    $pathsToAdd += $mavenBinPath
    Write-Host "Adding Maven to PATH: $mavenBinPath" -ForegroundColor Green
}

if ($pathsToAdd.Count -gt 0) {
    $newPath = $currentPath + ";" + ($pathsToAdd -join ";")
    [Environment]::SetEnvironmentVariable("Path", $newPath, "User")
    Write-Host "`nPATH updated successfully!" -ForegroundColor Green
    Write-Host "`nIMPORTANT: Please close and reopen your terminal for changes to take effect." -ForegroundColor Yellow
    Write-Host "Then run: java -version" -ForegroundColor Cyan
    Write-Host "Then run: mvn --version" -ForegroundColor Cyan
} else {
    Write-Host "`nBoth Java and Maven are already in PATH (or Java not found)" -ForegroundColor Yellow
}
