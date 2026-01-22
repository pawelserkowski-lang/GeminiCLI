@echo off
REM GeminiHydra - Portable Launcher
cd /d "%~dp0"
node "%~dp0node_modules\@google\gemini-cli\dist\index.js" %*
