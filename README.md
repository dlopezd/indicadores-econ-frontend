# indicadores-econ-frontend
Es una aplicación desarrollada en React que consume los servicios de la aplicación [indicadores-econ-backend](https://github.com/dlopezd/indicadores-econ-backend) para obtener indicadores económicos. Las dos principales funciones desarrolladas son:
  - Obtener el último estado de ciertos indicadores.
  - Ver de forma gráfica y en una tabla de datos, el histórico de valores de un indicador en particular.

## Características!
  - La primera vez que se le solicita cierta información al backend, se almacena en un ```Context``` para evitar la sobrecarga del back con información ya solicitada.
  - La segunda vez, se listará la información del context por lo que el renderizado será muy rápido.

## Limitaciones:
  - Al no estar conectado al backend no se entera de eventuales cambios en los registros, por lo que podría mejorarse con ```Web Sockets``` u otra tecnología similar.

## Instalación

Para instalar las dependencias (incluídas las de desarrollo):

```sh
$ cd indicadores-econ-frontend
$ npm install -d
```
Para configurar un puerto debes agregar una variable de entorno:
  - Para ejecutar el front también debe estar corriendo el back, por lo que debes crear la variable ```PORT``` para el front y priorizar el uso de la variable ```PORT_BACK``` para la aplicación back. De este modo evitarás conflictos entre las aplicaciones por el uso del mismo puerto.
```sh
$ export PORT=<PUERTO_DESEADO>
```
  - También puedes omitir estes paso y por defecto se ejecutará en el puerto ```3000```.
 
  Además deberás configurar el endpoint de la aplicación back. Para ello debes editar el archivo ```src/context/baseUrl.js``` y modificar la variable baseUrlApi que por defecto es
```js
// GUARDAR URL SIN SLASH FINAL 
export const baseUrlApi = "http://localhost:2000";
```

Finalmente para iniciar la aplicación
```sh
$ npm start
```
