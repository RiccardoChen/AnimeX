# Animex_back-end

This is the back-end of the Animex project, built with **Spring Boot** [3.4.5](https://spring.io/projects/spring-boot) and **Java** [21](https://www.oracle.com/it/java/technologies/downloads/#jdk21-windows).
## 📂 Database Setup
**MySQL** is used for data persistence and storage.(**MySQL Server** [8.4.8](https://dev.mysql.com/downloads/mysql/))

### 📥 Restore from `db_dati.sql`

1. Create a **MySQL** database named `animex`.
    ```sql
    create database animex;
    ```
2. Open your terminal and navigate to the `AnimeX/AnimeX_back-end/database` directory.
    ```
    cd AnimeX/AnimeX_back-end/database
    ```
3. Restore the database by importing the `db_data.sql` dump file into the `animex` database.
    ```bash
    mysql -u root -p animex < db_dati.sql
    ```
   1. If the command is entered correctly, you will be prompted for your local MySQL root `password`. Note that the characters will be invisible as you type. 


4. Navigate to `Animex/Animex_back-end/src/main/resources/application.yaml` and update the `password` field to grant Spring Boot access to your local database. If you prefer `.properties` over `.yaml`, you can set up the database connection in application.properties instead.


5. To start the server, run the `AnimexSbApplication.java` file found under `src/main/java/it.project.animex_backend`.
