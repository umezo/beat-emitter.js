"use strict";
import events from 'events';

export class BeatEmitter extends events.EventEmitter{
  constructor(beats) {
    this._timeAt = 0;
    this._beats = [0].concat(beats);
    this._index = 0;
  }

  tick(duration) {
    this.tickAt(this._timeAt+duration);
  }


  tickAt(time) {
    this._timeAt = time;

    //console.log('tick');
    var lastIndex = this.update(time);
    //console.log('    tick','index ->',this._index,'last ->',lastIndex,'len ->',this._beats.length);

    if (this._index < lastIndex) {

      let fired = this._beats.slice(this._index+1,lastIndex+1);
      this._index = lastIndex;

      this.emit('beat', this._beats[this._index], fired);
    }
  }

  reset() {
    this._index = 0;
  }

  update(pos){
    //console.log('update');
    for( let i = this._index+1, n = this._beats.length; i<n ; i++){
      let beat = this._beats[i];
      //console.log('    update', 'condition:', beat>=pos, 'pos -> ', pos, 'beat -> ', beat, 'index -> ',this._index, 'i -> ',i);

      if (pos < beat) {
        return i-1;
      }
    }

    return this._beats.length-1;
  }

}



// -----------------------------------------A-----------------------------------------------------B-------------------------------------------
// -----------------p-------------------------------------------------------------------------------------------------------------------------
// -----------------------------------------------------------p------------------------------------------------------------------------------- A will fired
