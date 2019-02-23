"use strict";

/** @type {import('@adonisjs/framework/src/Server')} */
const Server = use("Server");

const Eureka = require("eureka-js-client").Eureka;

/*
|--------------------------------------------------------------------------
| Global Middleware
|--------------------------------------------------------------------------
|
| Global middleware are executed on each http request only when the routes
| match.
|
*/
const globalMiddleware = [
  "Adonis/Middleware/BodyParser",
  "Adonis/Middleware/Session",
  "Adonis/Middleware/Shield",
  "Adonis/Middleware/AuthInit",
  "App/Middleware/ConvertEmptyStringsToNull"
];

/*
|--------------------------------------------------------------------------
| Named Middleware
|--------------------------------------------------------------------------
|
| Named middleware is key/value object to conditionally add middleware on
| specific routes or group of routes.
|
| // define
| {
|   auth: 'Adonis/Middleware/Auth'
| }
|
| // use
| Route.get().middleware('auth')
|
*/
const namedMiddleware = {
  auth: "Adonis/Middleware/Auth",
  guest: "Adonis/Middleware/AllowGuestOnly"
};

/*
|--------------------------------------------------------------------------
| Server Middleware
|--------------------------------------------------------------------------
|
| Server level middleware are executed even when route for a given URL is
| not registered. Features like `static assets` and `cors` needs better
| control over request lifecycle.
|
*/
const serverMiddleware = ["Adonis/Middleware/Static", "Adonis/Middleware/Cors"];
/*
const client = new Eureka({
  instance: {
    app: "contacts",
    hostName: "localhost",
    ipAddr: "127.0.0.1",
    port: {
      $: 3333,
      "@enabled": 'true'
    },
    vipAddress: "contacts",
    dataCenterInfo: {
      "@class": "com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo",
      name: "MyOwn"
    },
    statusPageUrl: "http://localhost:3333"
  },
  eureka: {
    host: "192.168.1.150",
    port: 8082,
    servicePath: "/eureka/apps/",
    registerWithEureka: true,
    fetchRegistry: true
  }
});

client.logger.level("debug");
client.start(error => {
  console.log(error || "complete");
});
*/

Server.registerGlobal(globalMiddleware)
  .registerNamed(namedMiddleware)
  .use(serverMiddleware);


