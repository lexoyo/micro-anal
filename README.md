
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

If you run this at 11:00 and then check at 12:01 you should see something like this:

```json
{ 
  "2019" : {
    "aggregated": {
      count: 33,
      state: [{name: 'first', count: 12}, {name: 'second', count: 10}, {name: 'third', count: 11}],
    },
    "10": {
      "aggregated": {
        count: 33,
        state: [{name: 'first', count: 12}, {name: 'second', count: 10}, {name: 'third', count: 11}],
      },
      "9": {
        "11": {
          count: 33,
          state: [{name: 'first', count: 12}, {name: 'second', count: 10}, {name: 'third', count: 11}],
        },
        "12": {
          "0": {
            count: 33,
            state: [{name: 'first', count: 12}, {name: 'second', count: 10}, {name: 'third', count: 11}],
          },
          "1": {
            "0": {
              count: 3,
              state: [{name: 'first', count: 1}, {name: 'second', count: 1}, {name: 'third', count: 1}],
            },
            "11": {
              count: 33,
              state: [{name: 'first', count: 12}, {name: 'second', count: 10}, {name: 'third', count: 11}],
            },
          },
        },
      },
    },
  },
}
```
