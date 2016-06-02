"use strict";
import events from 'events';

export class BeatEmitter extends events.EventEmitter{

  /**
   * @param beats {Array<Integer>} list of time for beat
   */
  constructor(beats) {
    super();
    this._timeAt = 0;
    this._beats = [null].concat(beats);
    this._index = 0;
  }

  /**
   * ahead internal timer by specified duration
   * @param duration {Integer} time to ahead
   */
  tick(duration) {
    this.tickAt(this._timeAt+duration);
  }


  /**
   * set internal timer to specified time
   * @param time {Integer} absolute time
   */
  tickAt(time) {
    this._timeAt = time;

    let lastIndex = this.update(time);

    if (this._index < lastIndex) {

      let fired = this._beats.slice(this._index+1,lastIndex+1);
      this._index = lastIndex;

      this.emit('beat', this._beats[this._index], fired);
    }
  }

  /**
   * all beats status should be set unfired
   */
  reset() {
    this._index = 0;
    this._timeAt = 0;
  }

  /**
   * __private method__
   * @param pos {Integer} target time to calculate index
   * @return {Integer} beat index for pos
   *
   */
  update(pos){
    for( let i = this._index+1, n = this._beats.length; i<n ; i++){
      let beat = this._beats[i];

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
