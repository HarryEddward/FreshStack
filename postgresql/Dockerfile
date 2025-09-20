FROM quay.io/keycloak/keycloak:latest as builder
ENV KC_DB=postgres
ENV KC_CACHE=ispn
ENV KC_CACHE_STACK=jdbc-ping
# Add other build-time vars like KC_FEATURES=token-exchange if needed
RUN /opt/keycloak/bin/kc.sh build

FROM quay.io/keycloak/keycloak:latest
COPY --from=builder /opt/keycloak /opt/keycloak
ENTRYPOINT ["/opt/keycloak/bin/kc.sh"]