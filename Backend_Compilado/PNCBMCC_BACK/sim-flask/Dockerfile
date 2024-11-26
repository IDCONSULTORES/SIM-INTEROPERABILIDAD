# Utiliza la imagen oficial de Python 3.8
FROM python:3.8-slim-buster

# Establece el directorio de trabajo en /app
WORKDIR /sim-executable

# Instala libpq-dev para psycopg2
#RUN apt-get update && apt-get install -y libpq-dev gcc

# Instala las dependencias ODBC
#RUN apt-get install -y unixodbc unixodbc-dev

# Instala las dependencias GDAL y libgeos
#RUN apt-get update && apt-get install -y gdal-bin libgdal-dev libgeos-3.6.2 libgeos-c1v5

#RUN apt-get update && apt-get install python3-gdal


RUN apt-get update && apt-get install -y apt-utils libpq-dev gcc g++ \
    && apt-get install -y unixodbc unixodbc-dev \
    && apt-get install -y gdal-bin libgdal-dev libgeos-dev

RUN apt-get update  && apt-get install -y gnupg2

RUN apt-get update -y && apt install -y curl \
    && curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add - \
    && curl hcurl https://packages.microsoft.com/config/ubuntu/20.04/prod.list > /etc/apt/sources.list.d/mssql-release.list \
    && apt-get update \
    # && apt-get remove -y libodbc2 libodbcinst2 odbcinst unixodbc-common \
    && ACCEPT_EULA=Y apt-get install -y --allow-unauthenticated msodbcsql17 \
    && ACCEPT_EULA=Y apt-get install -y --allow-unauthenticated mssql-tools \
    &&  echo 'export PATH="$PATH:/opt/mssql-tools/bin"' >> ~/.bash_profile \
    &&  echo 'export PATH="$PATH:/opt/mssql-tools/bin"' >> ~/.bashrc

# Copia los archivos del directorio actual al contenedor en /app
# Define las variables de entorno
ENV CPLUS_INCLUDE_PATH /usr/include/gdal
ENV C_INCLUDE_PATH /usr/include/gdal

# Copia los archivos del directorio actual al contenedor en /app
COPY . .
RUN chmod +x main
# Actualiza pip y luego instala las dependencias
RUN pip install --no-cache-dir --upgrade pip \
    && pip install --no-cache-dir -r requirements.txt \
    && pip install GDAL==$(gdal-config --version) --global-option=build_ext --global-option="-I/usr/include/gdal"

#RUN pip install pyinstaller
#RUN pyinstaller main.py --onefile  --add-data '.env:.'

# Copia los archivos del directorio actual al contenedor en /app
#COPY . .
# Crea el ejecutable usando PyInstaller
#RUN pyinstaller --onefile main.py
# # Expone el puerto 8080 para Flask (si tu aplicación Flask utiliza ese puerto)
EXPOSE 8080

# # Comando para ejecutar la aplicación Flask
CMD ["./main"]
