#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE USER docker;
    CREATE DATABASE cafepay;
    GRANT ALL PRIVILEGES ON DATABASE cafepay TO docker;
    CREATE DATABASE cafepay;
    GRANT ALL PRIVILEGES ON DATABASE cafepay TO docker;
EOSQL