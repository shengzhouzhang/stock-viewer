/**
 * Created by zhang on 5/04/2014.
 */


define(['socket_lib'], function(io){
  'use strict';

  return io.connect('http://localhost');
});
