## Installation Algorithm for Software on a Local Computer:

- Unpack the archive with the software.
- In the Visual Studio Code development environment, navigate to the course_project folder.
- Install dependencies using the command npm install.
- Navigate to the course_project_server folder.
- Install dependencies using the command npm install.
- Create a database named next-course-project in PgAdmin 4.
- Create a .env file and write the constants DATABASE_URL, JWT_SECRET_KEY, PORT in it.
- Execute the following commands in order: npx prisma db push, npx prisma generate, npx ts-node prisma/seed.ts, npm run start:dev.
- Navigate to the course_project folder.
- Run the command npm run dev.

## Алгоритм установки программного обеспечения на локальный компьютер:

- распаковать архив с программным обеспечением;
- в среде разработки Visual Studio Code перейти в папку course_project;
- установить зависимости командой npm install;
- перейти в папку course_project_server;
- установить зависимости командой npm install;
- создать базу данных next-course-project в PgAdmin 4;
- создать файл .env и записать в него константы: DATABASE_URL, JWT_SECRET_KEY, PORT;
- выполнить команды по порядку: npx prisma db push, npx prisma generate, npx ts-node prisma/seed.ts, npm run start:dev;
- перейти в папку course_project;
- выполнить команду npm run dev.
