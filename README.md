# nextjs-quick-api

<br />

## _A remote API, quickly._

### Check it out <a href="https://nextjs-quick-api.vercel.app/">here</a>

<br />

This project is meant to help frontend developers who need to test a remote endpoint quickly.

Just paste in your sample API response and get a remote url for free.

Super helpful while developing apps, when your backend might not be ready in time for frontend consumption. Just ask your backend teammate for a sample JSON structure and paste it in. Now you can use chrome devtools to throttle and test all of those button states that you've been working on!

_Note:_ local development requires a local instance of `mongod` to be running. Alternatively, you may add your own configuration for `DB_URL` and `DB_PASS` with remote service in `/db/index.js`
<br>
<br>

---

<br>
<br>

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/import?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

---

<br/>

### Caveats

If you really really want to deploy this, you'll need to set up a remote Mongo DB that matches the url scheme in `db/index.js`

Otherwise, running a local `mongod` should suffice for local develpment
