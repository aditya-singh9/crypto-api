# CryptoCurrency API

## Features

- It can give upto 95 cryptocurrency data.
- Can give data of specific a cryptocurrency.
- The data includes Name, Price, MarketCapital and CirculatingSupply of the cryptocurrency.
- Data is given in json format.

## Usage

To get all the details of top 100 cryptocurrency, go to `https://coincrypto-api.herokuapp.com/crypto `

If you want to search or get data of specific cryptocurrency, You can simply go to `https://coincrypto-api.herokuapp.com/crypto/{CryptoName}`
and type the cryptocurrency name in place of {CryptoName}.

## Installation

Install the dependencies and start the server

```sh
cd coincrypto-api
npm i
node index.js
```

The server will start at `localhost:8000`.
