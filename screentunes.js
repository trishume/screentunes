(function() {
  var canvas;
  var ctx;
  var start = null;
  var t = null;

  var tones = {
    REST: 0,
    GbelowC: 196,
    A: 220,
    Asharp: 233,
    B: 247,
    C: 262,
    Csharp: 277,
    D: 294,
    Dsharp: 311,
    E: 330,
    F: 349,
    Fsharp: 370,
    G: 392,
    Gsharp: 415
  };

  var whole = 1000;

  var durations = {
    whole: whole,
    half: whole / 2,
    quarter: whole / 4,
    eighth: whole / 8,
    sixteenth: whole / 16
  };

  var songs = {
    mary: [
      [tones.E, durations.quarter],
      [tones.D, durations.quarter],
      [tones.C, durations.quarter],
      [tones.D, durations.quarter],
      [tones.E, durations.quarter],
      [tones.E, durations.quarter],
      [tones.E, durations.half],
      [tones.D, durations.quarter],
      [tones.D, durations.quarter],
      [tones.D, durations.half],
      [tones.E, durations.quarter],
      [tones.G, durations.quarter],
      [tones.G, durations.half],
      [tones.E, durations.quarter],
      [tones.D, durations.quarter],
      [tones.C, durations.quarter],
      [tones.D, durations.quarter],
      [tones.E, durations.quarter],
      [tones.E, durations.quarter],
      [tones.E, durations.quarter],
      [tones.E, durations.quarter],
      [tones.D, durations.quarter],
      [tones.D, durations.quarter],
      [tones.E, durations.quarter],
      [tones.D, durations.quarter],
      [tones.C, durations.whole]
    ],
    scale: [
      [tones.A, durations.quarter],
      [tones.B, durations.quarter],
      [tones.C, durations.quarter],
      [tones.D, durations.quarter],
      [tones.E, durations.quarter],
      [tones.F, durations.quarter],
      [tones.G, durations.quarter]
    ],
    nyan: [
      // measure 1
      [tones.Fsharp, durations.eighth],
      [tones.Gsharp, durations.eighth],
      [tones.D, durations.sixteenth],
      [tones.Dsharp, durations.eighth],
      [tones.Csharp, durations.sixteenth],
      [tones.D, durations.sixteenth],
      [tones.Csharp, durations.sixteenth],
      [tones.B, durations.eighth],
      [tones.B, durations.eighth],
      [tones.Csharp, durations.eighth],
      // measure 2
      [tones.D, durations.eighth],
      [tones.D, durations.sixteenth],
      [tones.Csharp, durations.sixteenth],
      [tones.B, durations.sixteenth],
      [tones.Csharp, durations.sixteenth],
      [tones.Dsharp, durations.sixteenth],
      [tones.Fsharp, durations.sixteenth],
      [tones.Gsharp, durations.sixteenth],
      [tones.Dsharp, durations.sixteenth],
      [tones.Fsharp, durations.sixteenth],
      [tones.Csharp, durations.sixteenth],
      [tones.Dsharp, durations.sixteenth],
      [tones.B, durations.sixteenth],
      [tones.Csharp, durations.sixteenth],
      [tones.B, durations.sixteenth]
    ]
  };

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

  var incrTime = 0;
  var noteCount = 0;
  var song = songs.nyan;
  var play = true;
  function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!play) {return;}

    var lastNote = song[noteCount];
    if (t/2 - incrTime > lastNote[1]) {
      incrTime += lastNote[1];
      noteCount++;
      if (noteCount == song.length) {
        play = false;
        return;
      }
    }

    var note = song[noteCount];
    var magic = -note[0] * .105 + 60;

    //var magic = 5 + (Math.sin(t / 2000)+1)*7;

    bars(magic, magic);
  }

  function frame(timestamp) {
    if (start === null) start = timestamp;
    t = timestamp - start;
    render();
    AnimationFrame.request(frame);
  }

  $(document).ready(function() {
    canvas = document.getElementById("main");
    ctx = canvas.getContext("2d");
    $(window).bind("resize", resize);
    resize();
    AnimationFrame.request(frame);
  });
})();
