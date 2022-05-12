@echo off
echo CHECKING FOR UPDATES...
echo.
echo.

git pull
call npm i
title Wordle Tordle
cls
node .
