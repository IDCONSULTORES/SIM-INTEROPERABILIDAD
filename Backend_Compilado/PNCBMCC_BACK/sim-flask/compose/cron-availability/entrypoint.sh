#!/bin/sh

# Iniciamos el demonio de cron en primer plano con su-exec
exec su-exec root crond -f -d 8
