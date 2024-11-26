FROM mcr.microsoft.com/mssql/server:2019-latest

ENV ACCEPT_EULA=Y
ENV SA_PASSWORD=1Secure*Password1

COPY ../scripts /


ENTRYPOINT [ "/bin/bash", "entrypoint.sh" ]
CMD [ "/opt/mssql/bin/sqlservr" ]