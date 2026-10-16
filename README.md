This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

# To run the project

1. This should create a database container with Docker

docker compose config
docker compose up -d db

2. Install needed dependecies:

npm install

3. Set up the database based on provided schema

npx prisma validate
npx prisma generate
npx prisma migrate status
npx prisma migrate deploy

4. Run the server:

npm run dev

## Seeds

In folder:
node-boilerplate\prisma\seeds
Example admin user seed: npx ts-node usersSeed.ts

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
