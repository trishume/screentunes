(function() {
  var canvas;
  var ctx;
  var start = null;
  var t = null;
  var factor = 10;
  var song = [1,2,3,2,3,4,3,2,1,2,3,2,1,3,2,0,0];
  var notes = [0,2093,2349,2637,2794,3136,3520,3729,3951,4186];

  var AnimationFrame = (function() {
    var FPS = 16.6666666667; // 1000 / 60 = Frames Per Second
    var RAF = window.requestAnimationFrame
          || window.webkitRequestAnimationFrame
          || window.mozRequestAnimationFrame
          || window.msRequestAnimationFrame
          || window.oRequestAnimationFrame
          || function(a) { window.setTimeout(a, FPS); }
    var CAF = window.cancelAnimationFrame
          || window.webkitCancelAnimationFrame
          || window.mozCancelAnimationFrame
          || window.msCancelAnimationFrame
          || window.oCancelAnimationFrame
          || function(a) { window.clearTimeout(a); }
    return {
      request: function(a) {
        RAF(a);
      },
      cancel: function(a) {
        CAF(a);
      }
    }
  })();

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    /* $("#canvas").css("width", w + "px");
     $("#canvas").css("height", h + "px"); */
    /* render(); */
  }

  function bar(y, height) {
    ctx.fillRect(0,y,canvas.width,height);
  }

  function bars(spacing, height) {
    ctx.fillStyle = "rgb(0,0,0)";
    var y = 0;
    var maxy = canvas.height;
    while(y < maxy) {
      bar(y,height);
      y += spacing + height;
    }
  }

  function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // var magic = 5 + (Math.sin(t / 2000)+1)*7;
    bars(factor, factor);
  }

  function frame(timestamp) {
    if (start === null) start = timestamp;
    t = timestamp - start;
    render();
    AnimationFrame.request(frame);
  }

  function playFreq(f) {
    var maxf = 60*screen.height/2; // methinks this is the frequency a 1px on 1px off cycle would produce in theory
    factor = maxf/f;
  }

  function playSong(n) {
    playFreq(notes[song[n]]);
    setTimeout(function() {rest((n+1) % song.length);},400);
  }

  function rest(n) {
    playFreq(0);
    setTimeout(function() {playSong(n);},40);
  }

  $(document).ready(function() {
    canvas = document.getElementById("main");
    ctx = canvas.getContext("2d");
    $(window).bind("resize", resize);
    resize();
    playSong(0);
    AnimationFrame.request(frame);
  });
})();
