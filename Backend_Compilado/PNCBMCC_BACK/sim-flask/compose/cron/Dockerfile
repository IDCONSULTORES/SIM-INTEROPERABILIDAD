# Utilizamos la imagen base de Alpine
FROM alpine:latest

# Instalamos el paquete de cron y su-exec
RUN apk update && apk add --no-cache dcron su-exec curl

# Creamos un archivo de configuración para el cron
ARG API_ENDPOINT
ENV API_ENDPOINT $API_ENDPOINT

RUN echo "*/10 * * * * curl  $API_ENDPOINT" > /etc/crontabs/root
#0 0 * * *

# Copiamos el script de inicio y le damos permisos de ejecución
COPY /compose/cron/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Iniciamos el script de entrada
ENTRYPOINT ["/entrypoint.sh"]