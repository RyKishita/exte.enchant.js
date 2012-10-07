@echo off
IF "%1"=="" goto error
robocopy .. . %1 *.d.ts /log:copy.txt
ConvertCharCode.exe %1
pause
goto end
:error
echo Syntax: preBuild [compile file names from a file]
pause
:end