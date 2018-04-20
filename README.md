## Overview

Trade API proof-of-concept written in TypeScript for deployment to AWS Lambda using Node.js v8.10.

## Goals

 - Node.js for improved cold starts.
 - Easy to run and debug locally.
 - One SQL query per request using plain SQL to get flat RFR data.
 - Type safety.

## Requirements for running

- Node v8.10+
- A local MTS environment to access the database.

## Installation

```bash
$ npm install
```

## Env Configuration
The application is configured to run locally using the [Serverless Framework](https://serverless.com/) and [Serverless Offline](https://github.com/dherault/serverless-offline). The AWS Lambda environment variables for running locally can be found in the ```serverless.yml``` file

This is where you can configure the database connection details to connect to your local MTS database e.g:

```
...

environment:
    SERVICE_NAME: moth-api
    SERVICE_ENV: serverless
    LOG_LEVEL: debug
    KMS_ENABLED: false
    DATABASE_CONNECTION: '10.10.10.30'
    DATABASE_USERNAME: 'motdbuser'
    DATABASE_PASSWORD: 'password'
    DATABASE_NAME: 'mot2'
    DATABASE_KEEP_CONNECTION: true

...
```

## Running locally

```bash
# Install the serverless cli globally
npm install -g serverless

# Start locally
$ npm run start-sls
```

## Debugging locally

 - Install [Visual Studio Code](https://code.visualstudio.com/docs/setup/mac).
 - Open the root directory of the project in VS Code.
 - Main menu > View > Debug
 - Start debugging by pressing the green play button for the debug configuration named ```Debug TAPI```.
 - Add breakpoints and use the API via curl/Postman etc. to cal the API.

## Using the API

Documentation for Trade API is here: https://www.check-mot.service.gov.uk/mot-history-api

The URL root for running and debugging locally will be http://localhost:3000/

Example:

```
http://localhost:3000/trade/vehicles/mot-tests?registration=F50GGP
```