@IF EXIST "%~dp0\node.exe" (
  "%~dp0\node.exe"  "%~dp0\done-serve" %*
) ELSE (
  @SETLOCAL
  @SET PATHEXT=%PATHEXT:;.JS;=;%
  node  "%~dp0\done-serve" %*
)
