@echo off
IF "%1"=="" goto error
IF "%2"=="" goto error
robocopy .. . %1 *.ts /log:copy.txt
ConvertCharCode.exe %1
tsc --declarations --target ES5 --out %2 @%1
robocopy . .. %2 /log+:copy.txt
pause
goto end
:error
echo Syntax: buildTS [compile file names from a file] [output file name]
pause
:end