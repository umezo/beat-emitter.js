# beat-emmiter.js
dispatch event on beat


# Usage
```javascript
var BeatEmitter = require('beat-emitter.js');

var BEAT_TIMING_LIST = [1000, 2000, 3000]; // the list of beats as Number Array
var beat = new BeatEmitter(BEAT_TIMING_LIST);

beat.on('beat',function(currentBeat,fired){

});


var s = new Date().getTime();
setTimeout(function(){
  var g = new Date().getTime();
  beat.tickAt(g-s);
},10);

```
