(function() {
  var canvas;
  var ctx;
  var start = null;
  var t = null;
  var minimum = 0;
  var maximum = 0;
  var stage = 0;

  var AnimationFrame = (function() {
    var FPS = 16.6666666667; // 1000 / 60 = Frames Per Second
    var RAF = window.requestAnimationFrame
          || window.webkitRequestAnimationFrame
          || window.mozRequestAnimationFrame
          || window.msRequestAnimationFrame
          || window.oRequestAnimationFrame
          || function(a) { window.setTimeout(a, FPS); };
    var CAF = window.cancelAnimationFrame
          || window.webkitCancelAnimationFrame
          || window.mozCancelAnimationFrame
          || window.msCancelAnimationFrame
          || window.oCancelAnimationFrame
          || function(a) { window.clearTimeout(a); };
    return {
      request: function(a) {
        RAF(a);
      },
      cancel: function(a) {
        CAF(a);
      }
    };
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
  
  function note(height) {
    if(height > 0) {
      bars(height, height);
    }
  }

  function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var magic = 5 + (Math.sin(t / 2000)+1)*7;
    bars(magic, magic);
  }
  
  function play() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var pitch = (maximum - minimum) * (Math.sin(t / 2000))/2 + (maximum + minimum)/2;
    note(pitch);
  }
  
  function setMin() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    minimum = -49 * $("#min").val() / 99 + 51;
    note(minimum);
  }
  
  function setMax() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    maximum = -49 * $("#max").val() / 99 + 51;
    note(maximum);
  }

  function frame(timestamp) {
    if (start === null) start = timestamp;
    t = timestamp - start;
    //render();
    if(stage == 0) {
      setMin();
    } else if (stage == 1) {
      $("#tune1").hide();
      $("#tune2").show();
      setMax();
    } else {
      $("#tune2").hide();
      play();
    }
    AnimationFrame.request(frame);
  }

  $(document).ready(function() {
    canvas = document.getElementById("main");
    ctx = canvas.getContext("2d");
    $(window).bind("resize", resize);
    $("#tune2").hide();
    $("#is_set1").click(function() { stage++;});
    $("#is_set2").click(function() { stage++;});
    resize();
    AnimationFrame.request(frame);
  });
})();
