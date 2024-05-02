# Byte

A platform for developers to plan and manage virtual workshops

## Tech stack

- **Frontend:** Typescript, [Next.js](https://nextjs.org/), [Tailwindcss](https://tailwindcss.com)
- **Backend:** Nextjs server actions and [Drizzle ORM](https://orm.drizzle.team) to manage database interaction
- **Database:** Postgres
- **Auth:** [Clerk](https://clerk.com)
- **DevOps:** Docker and Github actions to automate workflows

## Architecture Overview

The architecture of this project revolves around a streamlined development and deployment process, leveraging Docker in the development environment for consistency and mirroring production conditions. For deployment, the project utilizes Vercel and Vercel Postgres Database for database

## Roadmap

- [ ] Deploy the application to Vercel
- [ ] Setup home page
- [ ] Add auth with clerk
      and more

## Running locally

### With Docker

1. Clone the repository

```bash
git clone https://github.com/Raphico/byte.git
cd byte
```

2. Start the application

```bash
docker-compose up --build
```

### Without Docker

1. Clone the repository

```bash
git clone https://github.com/Raphico/byte.git
cd byte
```

2. Start the development server

```bash
pnpm run dev
```

## License

Licensed under the MIT license. Check the [LICENSE](./LICENSE.md) file for details.
