# ./keycloak/Dockerfile
ARG KC_VERSION=latest
FROM quay.io/keycloak/keycloak:${KC_VERSION} AS builder
WORKDIR /opt/keycloak

# Copia tu jar del theme dentro de providers
COPY ./keycloak-theme.jar /opt/keycloak/providers/keycloak-theme.jar

# Ejecuta el build para que Keycloak "registre" el provider/theme
RUN /opt/keycloak/bin/kc.sh build

# Imagen final
FROM quay.io/keycloak/keycloak:${KC_VERSION}
COPY --from=builder /opt/keycloak/ /opt/keycloak/

# Pon el theme por defecto (reemplaza cafebuy-theme por el nombre real dentro del jar)
ENV KC_SPI_THEME_DEFAULT=cafebuy-theme

# Mantén tu ENTRYPOINT/COMMAND habitual — aquí ejemplo optimizado
ENTRYPOINT ["/opt/keycloak/bin/kc.sh", "start", "--optimized", "--import-realm"]
