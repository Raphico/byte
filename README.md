# [Byte](https://byte-liart.vercel.app)

A platform for developers to plan and manage virtual workshops

## Core features

1. Users should be able to create and schedule virtual workshops, specifying details such as title, details, date, time, duration, and target audience

2. Users should be able to register for workshops, receiving confirmation for registering and receiving reminders for upcoming events

3. Interactive workshop session with video conferencing for organizer, live chats for participants to communicate with other participants and the organizer, and an integrated code editor for participants to follow along

## Tech stack

- **Frontend:** Typescript, [Next.js](https://nextjs.org/), [Tailwindcss](https://tailwindcss.com), [stream-io/video-react-sdk](https://github.com/GetStream/stream-video-js) to stream video and chat
- **Backend:** Nextjs server actions and [Drizzle ORM](https://orm.drizzle.team) to manage database interaction
- **Database:** Postgres
- **Auth:** [Clerk](https://clerk.com)
- **DevOps:** Docker and Github actions to automate workflows

## Architecture Overview

The architecture of this project revolves around a streamlined development and deployment process, leveraging Docker in the development environment for consistency and mirroring production conditions. For deployment, the project utilizes Vercel and Vercel Postgres Database

## Roadmap

- [x] Deploy the application to Vercel
- [x] Add app configuration
- [ ] Setup home page
- [ ] Add auth
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

2. Copy and update .env.example to .env

```bash
cp .env.example .env
```

3. Install dependencies

```bash
pnpm i
```

4. Start the development server

```bash
pnpm run dev
```

## License

Licensed under the MIT license. Check the [LICENSE](./LICENSE.md) file for details.
