
```sh
$ npm install --save micro-anal
```

Example of "feeding" the analytics with random data

```js
// in server.js
const {feed, aggregate} = require('micro-anal')
const EXAMPLE_STATES = [{name: 'first'}, {name: 'second'}, {name: 'third'}]
const EXAMPLE_ID = 'an ID'
setTimeout(() => {
  feed(EXAMPLE_ID, {
    state: EXAMPLE_STATES[Math.floor(Math.random() * EXAMPLE_STATES.length)],
  }, new Date())
}, Math.rand() * 1000)

// this should be in another thread
setTimeout(() => {
  aggregate(new Date())
}, 100)
```

And then display the result

```js
// in client-cli.js
const {getState} = require('micro-anal')
const EXAMPLE_ID = 'an ID'
setTimeout(() => {
  console.log('State', getState(EXAMPLE_ID, new Date())
}, 1000)
```

To run this sample, you need to run these two commands:

```sh
$ node server.js
$ node client-cli.js
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
