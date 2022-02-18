# CoinMarketFi [![Twitter](https://img.shields.io/twitter/url/https/twitter.com/cloudposse.svg?style=social&label=Follow%20%40nate0922)](https://twitter.com/nate0922)

<p align="center">
  <a href="https://creativedesignsguru.com/demo/Nextjs-Boilerplate/"><img src="public/assets/images/nextjs-starter-banner.png?raw=true" alt="Next js starter banner"></a>
</p>

We want to make it easier for you to buy cryptocurrency — including Bitcoin and Ethereum — no matter where you live in the world! Learn from us as we walk you through some of the topics that beginners will need to understand to get started. Check out this Cryptocurrency Exchange List with more cryptocurrency exchanges and brokers than any other list in the world, including information on fees, deposit methods, supported cryptocurrencies and much more.

## Features

### Cryptocurrencies
  - 🔥 User can check price, marketcap, volumne of crytocurrencies.
  - 🎨 User can buy crytocurrencies by referial link and get bonus coin by NEAR token.

### Exchanges
 - 💅 List information of Exchanges : Headquaters, Trade Volume 24h

### Marketplace - Next Step
 - TODO

### Referal Social Network (Facebook/Twitter/Youtube) - Next Step
 - 🎉 User can like/share post to receive Near token bonus
 - ✅ User can retweet to receive Near token bonus
 - ✏️ User can watch youtube video to receive Near token bonus

## Philosophy

- TBD
- TBD

## Screenshots

### Cryptocurrencies
![Alt text](./res/img/cryptocurrencies.jpg)

### Exchanges
![Alt text](./res/img/exchanges.jpg)

### Marketplace
![Alt text](./res/img/marketplace.jpg)


## Overrall Settings

Run the following command on your local environment:

```
git clone --depth=1 https://github.com/ixartz/Next-js-Boilerplate.git my-project-name
cd my-project-name
npm install
```

Then, you can run locally in development mode with live reload:

```
npm run dev
```

Open http://localhost:3000 with your favorite browser to see your project.

```
.
├── README.md                # README file
├── next.config.js           # Next JS configuration
├── public                   # Public folder
│   └── assets
│       └── images           # Image used by default template
├── src
│   ├── layout               # Atomic layout components
│   ├── pages                # Next JS pages
│   ├── styles               # PostCSS style folder with Tailwind
│   ├── templates            # Default template
│   └── utils                # Utility folder
├── tailwind.config.js       # Tailwind CSS configuration
└── tsconfig.json            # TypeScript configuration
```

### Customization

You can easily configure Next js Boilerplate. Please change the following file:

- `public/apple-touch-icon.png`, `public/favicon.ico`, `public/favicon-16x16.png` and `public/favicon-32x32.png`: your website favicon, you can generate from https://favicon.io/favicon-converter/
- `src/styles/global.css`: your CSS file using Tailwind CSS
- `src/utils/AppConfig.ts`: configuration file
- `src/templates/Main.tsx`: default theme

## Sequence Diagrams
You had deployed coinmarketfi smart contract to Near blockchain for Near wallet of coinmarketfi (as master wallet).
When user load my website, we will connet to Near service with master wallet keystore config.
Users need connect theirs wallet to we can send Near token bonus when they get token bonus from website.

![Alt text](./res/img/SqLoadPage_ConnectWallet.jpg)


Currently, when user refer link to buy crytocurrencies, we will send some Near token to user as token bonus
![Alt text](./res/img/ReferLink_CurrentVer.jpg)


In next step, we will check to map user with 3rd party site (Exchanges when buy crytocurrencies, Facebook, Twitter, Youtube,...). When we receive token bonus from 3rd party site, we will convert it to near token and send about 60%~70% to user as token bonus.
![Alt text](./res/img/ReferlinkContract.jpg)

### License

Licensed under the MIT License, Copyright © 2020

See [LICENSE](LICENSE) for more information.
