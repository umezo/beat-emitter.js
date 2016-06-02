"use strict";

import assert from 'power-assert'
import {BeatEmitter} from "../../lib/index.js";
import _ from 'lodash';

describe("beat-emmiter", ()=> {
  var beats = [
    1000,
    2000,
    5000
  ];
  afterEach(()=> {});

  describe("initialize", ()=> {
    it("basic instance creation and work",(done)=> {
      var beat = new BeatEmitter(beats);
      beat.on('beat',(currentBeat,fired)=> {
        assert(_.isNumber(currentBeat));
        assert.strictEqual(currentBeat,1000);

        assert(_.isArray(fired));
        assert.strictEqual(fired.length,1);

        done();
      });

      beat.tickAt( 500);
      beat.tickAt( 999);
      beat.tickAt(1000);
    });
  });

  describe("tick and event fire", ()=> {
    it("some beat should be skipped and contained into fired argument if specified big time", (done)=> {
      var beat = new BeatEmitter(beats);
      beat.on('beat',(currentBeat,fired)=> {
        assert(_.isNumber(currentBeat));
        assert.strictEqual(currentBeat,2000);

        assert(_.isArray(fired));
        assert.strictEqual(fired.length,2);
        assert.strictEqual(fired[0],1000);
        assert.strictEqual(fired[1],2000);

        done();
      });

      beat.tickAt(4000);
    });

    it("events should be fired on every beats occured by tick", ()=> {
      var beat = new BeatEmitter(beats);
      var count = 0;
      beat.on('beat',(currentBeat,fired)=> {
        count++;
      });

      beat.tickAt(1001);
      beat.tickAt(2001);

      assert(count == 2);
    });
  });

  describe("reset", ()=> {
    it("some events should be fired again after reset", ()=> {
      var beat = new BeatEmitter(beats);
      var count = 0;

      beat.on('beat',(currentBeat,fired)=> {
        if (count == 0) {
          assert.strictEqual(currentBeat,1000);
        }else if(count == 1){
          assert.strictEqual(currentBeat,2000);
        }else if(count == 2){
          assert.strictEqual(currentBeat,1000);
        }

        count++;
      });

      beat.tickAt(1001);
      beat.tickAt(2001);
      beat.reset();
      beat.tickAt(1001);
    });
  });


  describe("near", ()=> {
    it("return nearest beat positions after and before current time.", ()=> {
      var beat = new BeatEmitter(beats);
      beat.tick(1001);

      var positions = beat.near();
      assert(positions.before == 1000);
      assert(positions.after == 2000);
    });

    it("just propety should be added if nearest is just on beat", ()=> {
      var beat = new BeatEmitter(beats);
      beat.tick(2000);

      var positions = beat.near();
      assert(positions.before == 1000);
      assert(positions.just == 2000);
      assert(positions.after == 5000);
    });

    it("before should be null if no beat before current time", ()=> {
      var beat = new BeatEmitter(beats);
      beat.tick(100);

      var positions = beat.near();
      assert(positions.before == null);
      assert(positions.after == 1000);
    });

    it("after should be null if no beat after current time", ()=> {
      var beat = new BeatEmitter(beats);
      beat.tick(5100);

      var positions = beat.near();
      assert(positions.before == 5000);
      assert(positions.after == null);
    });




  });

});

