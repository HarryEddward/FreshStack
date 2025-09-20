# README

La base de datos PostgreSQL se usa como entorno completo aplicado al sistema empresarial si es posible, aplicando como: Auth, Software HA High Disponibility and more.

Includes: 
- Keycloak (Main Server)
- HAProxy (Load balancer for PgBouncer's)
- PG Databases (For each software)
- PG Primary database (Main db for general propouses)
- Replica Set's & High Diponibility (For each db server, not for sharding)