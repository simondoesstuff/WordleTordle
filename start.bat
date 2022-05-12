@echo off
echo CHECKING FOR UPDATES...
echo.
echo.

git pull
call npm i
cls
title Wordle Tordle
node .
