KMUni Tech Backend (NestJS)

This is a scaffolded NestJS project (TypeORM + Passport-JWT). To get started:

1. Install dependencies:

```bash
cd kmuni-tech-backend-nest
npm install
```

2. Configure Postgres in environment variables or edit `src/app.module.ts` defaults.

3. Run in dev mode:

```bash
npm run start:dev
```

Notes:

- `synchronize: true` is enabled for quick development; use migrations for production.
- This is a scaffold — convert controllers, services, and DTOs from the Java project into the `src` folder.
- Default local DB: SQLite in-memory. To use Postgres set `DB_TYPE=postgres` and provide DB_HOST/DB_USER/DB_PASS/DB_NAME in `.env` or environment.
- Example: create a `.env` file at project root (a sample `.env` is included).
