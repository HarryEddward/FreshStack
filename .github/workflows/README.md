# README.md

Para el uso del VPS estaremos usando el nodo maestro apra aplicar los secretos y todo lo necesario de configuraciones por Docker Swarm.

Los archivos de testeo a produccion unicamente son:
- **vps-update-changes-repo.yml**: Unicamente para refeljar cambios y probar servicios o configuraciónes en producción. En este deberemos de aplicar con Jenkins la gestión de nuevos cambios del repo por nuevos cambios y solo se usa unicamente para hacer pruebas en el nodo maestro general del VPS.