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

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure
```
root/
   ├── src/
   │   ├── app/
   │   │   ├── trip/[id]/
   │   │   │     └── page.js
   │   │   ├── globals.css
   │   │   ├── layout.js
   │   │   └── page.js
   │   ├── components/ 
   │   ├── public/  
   │   └── services/
   ├── next.config.mjs
   ├── package.json
   └── tailwind.config.ts
```
### Directory Descriptions
* components：Reusable ui components.
* public: Static assets including images.
* service：API functions.

## Routes
1. HomePage: Overview of all groups
  * route: `/`
  * source file: `/src/app/page.js`
2. TripPage: Editing page of a trip given groupId
  * route: `/trip/[id]`
  * source file: `/src/app/trip/[id]/page.js`