# UNSAM Cypress Tramites a Distancia
[![unsam.png](https://i.postimg.cc/bYbHh8G0/unsam.png)](https://postimg.cc/Yjrm65zj)

## Introduccion
Este proyecto corre Cypress en Node contra el entorno de testing deployado para las pruebas de TAD.

## Como iniciar el proyecto

1. Instalar [node](https://nodejs.org/es/). Podes verificar si lo tenes instalado chequeando la version de node con el siguiente comando:
```
node -v
```

2. Clonar el proyecto con el siguiente comando:
```
git clone https://github.com/andylarquy/unsam-cypress-tad.git
```

3. Pegar el archivo "cypress.env.json" en la carpeta raíz del proyecto para poder acceder a las credenciales y variables de entorno.

4. En la carpeta raíz del proyecto descargar las dependencias con:
```
npm i
```
 
5. Iniciar Cypress con el comando:
```
npm test
```
