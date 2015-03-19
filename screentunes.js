(function() {
  var canvas;
  var ctx;
  var start = null;
  var t = null;
  var factor = 10;
  var tempo = 240  // bpm
  var pitch = 2093 // 2093 Hz is C6 (does play a C6 on my monitor - JH)
  var hold = 0.87  // 1 for full sostenuto
  // notes are numbered by semitones, use .1 for a rest
  var song =     [12,12,12,12,12,12,12,15,   8,10,12,13,13, 13,13,13,12,12,12,12,10,10,12,10,15,12,12,12,12,12,12,12,15,   8,10,12,13,13, 13,13,13,12,12,12,15,15,13,10, 8,.1]
  var duration = [ 1, 1, 2, 1, 1, 2, 1, 1, 1.5,.5, 4, 1, 1,1.5,.5, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 2, 1, 1, 2, 1, 1, 1.5,.5, 4, 1, 1,1.5,.5, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2]

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

  function note(i) {
    return (i == .1 ? 0 : pitch*Math.pow(2,i/12));
  }

  function playFreq(f) {
    var maxf = 60*screen.height/2; // methinks this is the frequency a 1px on 1px off cycle would produce in theory
    factor = maxf/f;
  }

  function playSong(n) {
    playFreq(note(song[n]));
    setTimeout(function() {rest((n));},duration[n]*hold*60000./tempo);
  }

  function rest(n) {
    playFreq(0);
    setTimeout(function() {playSong((n+1) % song.length);},duration[n]*(1.-hold)*60000./tempo);
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
