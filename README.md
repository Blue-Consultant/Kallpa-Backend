## Kallpa

**Kallpa** es una API REST para la creación y gestión de anuncios. Desarrollada con **Express.js** y el ORM **Sequelize**, proporciona endpoints eficientes para interactuar con la base de datos, permitiendo crear, actualizar y eliminar anuncios. Este proyecto está diseñado para ser consumido por el frontend, con un enfoque en rendimiento y escalabilidad.

## Desplegar entorno de desarrollo

Para poder trabajar con el proyecto de manera local, es necesario configurar el entorno de desarrollo correctamente. A continuación, te mostramos los pasos para crear los archivos de configuración necesarios y ejecutar el proyecto de manera adecuada.

## Getting Started

1. **Clonar el repositorio**:

   ```bash
   git clone https://github.com/usuario/repositorio.git
   cd repositorio
   ```

2. **Instalar dependencias**:

   ```bash
   npm install
   ```

3. **Crear directorio `env/*`**:

   Es necesario crear un directorio llamado `env/` que contendrá los archivos de configuración específicos para cada entorno. Estos archivos definen las variables de entorno necesarias para el proyecto, dependiendo del entorno en el que se ejecute.

   ### Estructura del directorio

   El directorio `env/` debe contener los siguientes archivos:

   env/ ├── .env.development ├── .env.production

   ### Nombres de los archivos

   Los archivos de configuración de entorno se nombran según el siguiente esquema:

   - **.env.development**: Variables de entorno específicas para el entorno de desarrollo.
   - **.env.production**: Variables de entorno específicas para el entorno de producción.

   ### Variables de entorno comunes

   A continuación, te mostramos un ejemplo de cómo configurar las variables de entorno para cada archivo según el entorno. Asegúrate de adaptar estos valores según las necesidades de tu proyecto.

   #### Ejemplo de archivo `.env.development`

   ```ini
   # server
   PORT=4000
   HOST=0.0.0.0

   # logs
   LOG_INFO=C:/Users/NOMBRE_USUARIO/node_apps/logs_app/kallpa/info.log
   LOG_ERROR=C:/Users/NOMBRE_USUARIO/node_apps/logs_app/kallpa/error.log
   LOG_REQUEST=C:/Users/NOMBRE_USUARIO/node_apps/logs_app/kallpa/request.log

   # database MYSQL
   NAME_DB_MYSQL=kallpa_db
   MAIN_MYSQL_HOST=localhost
   MAIN_MYSQL_PORT=3306
   MAIN_MYSQL_USER=root
   MAIN_MYSQL_PASSWORD=password

   # keys per crypt
   SALTS_BC=10
   TOKEN_KEY=KL0iokj89JKkjkjh89kKL65
   CRYPTO_KEY=JF90kj583IO5LK4*42k-sj
   ```

4. **Ejecutar la aplicación**:
   ```bash
   npm run dev
   ```
