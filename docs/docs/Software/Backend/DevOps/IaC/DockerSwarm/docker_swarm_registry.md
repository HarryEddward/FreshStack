# Docker Swarm Registry

En este documento se explica como se usa y en que momento dado se aplica el registro de las imagenes de los contenedores a usarse posterioramente al orquestador.

El registro local entre el orquestador es un método de protección sobre corrupción, inexistentencia temporal/permanente de imagenes de terceros, que se usan para desarrollarse y poner en producción toda la suite empresarial.


#### Objetivo
Tener en un centro de servidores con un mismo orquestador liderando un servicio unificado local para proveer imagenes a todos los nodos escalvos.


Aquí se vería aun ejemplo practico:
```mermaid

flowchart TB
    subgraph DockerSwarm["Docker Swarm"]

        ThirdPartyImages["Imagenes de Terceros"]

        NodeMaster["Node Master - Registry Service"]
        NodeWorker1["Node Slave"]
        NodeWorker2["Node Slave"]
        NodeWorker3["Node Slave"]
        NodeWorker4["Node Slave"]
        NodeWorker5["Node Slave"]

        ThirdPartyImages -.-> |Se descargan al orquestador unicamente una vez con Ansible| NodeMaster
        

        NodeMaster e1@--> |Se pasan las imagenes desde el nodo master| NodeWorker1
        NodeMaster e2@--> NodeWorker2
        NodeMaster e3@--> NodeWorker3
        NodeMaster e4@--> NodeWorker4
        NodeMaster e5@--> NodeWorker5

        e1@{ animate: true }
        e2@{ animate: true }
        e3@{ animate: true }
        e4@{ animate: true }
        e5@{ animate: true }

    end

```


### ¿Cuando aplicarse este servicio sobre el registro de imagenes?

Al realizar el MVP, es mas que suficiente por ahora gestionar imagenes de terceros por ahora, con actualizaciónes remotas de internet.

Pero a la hora de gestionar nodos esclavos sera mas que cirtico que los servicios no se den de baja, por no tener las imagenes.

Al comienzos del MVP, se aplicaran registros privados de imagenes de terceros por el nodo master. Hay que asegurar la existencia de las imagenes contra cualquier problema externo.


**20/10/2025**