var canvas = document.getElementById('video-canvas');
var ctx = canvas.getContext('2d');
var video = document.getElementById('video-element');

video.addEventListener('play', function () {
  setInterval(function() {
    // Write video frame to canvas
    ctx.drawImage(video, 0, 0, video.width, video.height);

    // Chroma key

    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var data = imageData.data;

    // FULL TRANSPARENT
    //var tolerance = 150;
    //for(var i = 0, n = data.length; i < n; i += 4) {
    //  var diff = Math.abs(data[i] - data[0]) + Math.abs(data[i+1] - data[1]) + Math.abs(data[i+2] - data[2]);
    //  if(diff < tolerance) {
    //    data[i + 3] = 0;
    //  }
    //}

    // SEMI TRANSPARENT
    var tolerance = 150;
    for(var i = 0, n = data.length; i < n; i += 4) {
      var diff = Math.abs(data[i] - data[0]) + Math.abs(data[i+1] - data[1]) + Math.abs(data[i+2] - data[2]);
      data[i + 3] = (diff*diff)/tolerance;
    }

    ctx.putImageData(imageData, 0, 0);
  });
}, null);
