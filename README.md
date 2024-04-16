This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [https://backend-rd2rxwzuga-de.a.run.app](https://backend-rd2rxwzuga-de.a.run.app) with your browser to see the result.

## Project Structure
```
root/
   ├── src/
   │   ├── app/
   │   │   ├── trip/[id]/
   │   │   │     └── page.js
   │   │   ├── components/
   │   │   ├── globals.css
   │   │   ├── layout.js
   │   │   └── page.js
   │   ├── middleware.js
   │   └── services/
   ├── public/
   ├── next.config.mjs
   ├── package.json
   └── tailwind.config.js
```

### Directory Descriptions
* components：Reusable ui components.
* public: Static assets including images.
* services：API functions.

### File Descriptions
* middleware.js: Handling authentication with Clerk.

## Routes
1. HomePage: Overview of all groups.
  * route: `/`
  * source file: `/src/app/page.js`
2. TripPage: Editing page of a trip given groupId.
  * route: `/trip/[id]`
  * source file: `/src/app/trip/[id]/page.js`