## Project status

It is an experiment, some things are missing for a working prototype:

* adapters: for now it saves everything in files, but it should be able to use a db
* demo: a web app which shows stats (website analytics, server state...)

Know bugs

* the `hit` method should already aggregate the data instead of replacing the current second with 1 hit

Similar more advanced project

* [micro analytics](https://github.com/micro-analytics)
* [microanalytics.io (not open source)](https://microanalytics.io/email/verify)


## How to test this?
```sh
$ npm install --save micro-anal
```

Example of a [script "feeding" the analytics with random data](samples/server.js)

And then here is a [script which displays the aggregated current stats](samples/client.js)

To run this sample, you need to run these two commands:

```sh
$ npm run sample:client
$ npm run sample:server
```

If you run this at 14:00 and then check at 14:10 you should see something like this:

```json
Hits by hours of the current day { 
  '14': { state: [ [Object], [Object], [Object] ], num: 130 } 
}
Hits by minutes of the current hour {
  '0': { state: [ [Object], [Object], [Object] ], num: 12 },
  '1': { state: [ [Object], [Object], [Object] ], num: 10 },
  '2': { state: [ [Object], [Object], [Object] ], num: 11 },
  '3': { state: [ [Object], [Object], [Object] ], num: 10 },
  '4': { state: [ [Object], [Object], [Object] ], num: 14 },         
  '5': { state: [ [Object], [Object], [Object] ], num: 9 },
  '6': { state: [ [Object], [Object] ], num: 12 },                   
  '7': { state: [ [Object], [Object], [Object] ], num: 10 },
  '8': { state: [ [Object], [Object], [Object] ], num: 12 },
  '9': { state: [ [Object], [Object], [Object] ], num: 14 },
  '10': { state: [ [Object], [Object], [Object] ], num: 12 },
}
Hits by seconds of the current minute {
  '3': { state: [ [Object] ], num: 1 },
  '4': { state: [ [Object] ], num: 1 },
  '8': { state: [ [Object] ], num: 1 },
  '10': { state: [ [Object] ], num: 1 },
  '12': { state: [ [Object] ], num: 1 },
  '21': { state: [ [Object] ], num: 1 },
  '29': { state: [ [Object] ], num: 1 },
  '30': { state: [ [Object] ], num: 1 },
  '37': { state: [ [Object] ], num: 1 },
  '40': { state: [ [Object] ], num: 1 },
  '50': { state: [ [Object] ], num: 1 }
}

```

