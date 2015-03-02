"use strict";
import support from 'source-map-support'
support.install();

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
  it("initialize", (done)=> {
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

  it("skipped", (done)=> {
    var beat = new BeatEmitter(beats);
    beat.on('beat',(currentBeat,fired)=> {
      assert(_.isNumber(currentBeat));
      assert.strictEqual(currentBeat,2000);

      assert(_.isArray(fired));
      assert.strictEqual(fired.length,2);

      done();
    });

    beat.tickAt(4000);
  });

  it("tick", (done)=> {
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

    beat.tick(4000);
  });
});

