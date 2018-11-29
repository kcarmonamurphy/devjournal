# can-observation-recorder

[![Build Status](https://travis-ci.org/canjs/can-observation-recorder.svg?branch=master)](https://travis-ci.org/canjs/can-observation-recorder)

Records observations between two points in time.


```js
const foo = {};
const bar = {};
observationRecorder.start();

observationRecorder.add( foo, "event1" );
observationRecorder.add( bar );

const dependencies = observationRecorder.stop();
dependencies; //-> {
//    keyDependencies: Map{
//      [foo]: Set["event1"]
//    },
//    valueDependencies: Set[bar]
// }
```
