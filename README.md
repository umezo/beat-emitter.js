# beat-emmiter.js
dispatch event on beat


# Usage
```javascript
var BeatEmitter = require('beat-emitter.js');

var BEAT_TIMING_LIST = [1000, 2000, 3000]; // the list of beats as Number Array
var beat = new BeatEmitter(BEAT_TIMING_LIST);

beat.on('beat',function(currentBeat,fired){

});


var audio = document.getElementById('audio-element');
setTimeout(function(){
  beat.tickAt(audio.currentTime);
},10);

```
