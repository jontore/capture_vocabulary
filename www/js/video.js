(function() {
  var imgUrl = 'img';

  var streaming = false,
      video        = document.querySelector('#video'),
      startbutton  = document.querySelector('#startbutton'),
      width = 200,
      height = 0;

  navigator.getMedia = ( navigator.getUserMedia ||
                         navigator.webkitGetUserMedia ||
                         navigator.mozGetUserMedia ||
                         navigator.msGetUserMedia);

  var initVideo = function () {
     navigator.getMedia(
    {
      video: true,
      audio: false
    },
    function(stream) {
      if (navigator.mozGetUserMedia) {
        video.mozSrcObject = stream;
      } else {
        var vendorURL = window.URL || window.webkitURL;
        video.src = vendorURL ? vendorURL.createObjectURL(stream) : stream;
      }
      video.play();
    },
    function(err) {
      console.log("An error occured! " + err);
    }
  );

    video.addEventListener('canplay', function(ev){
      if (!streaming) {
        height = video.videoHeight / (video.videoWidth/width);
        video.setAttribute('width', width);
        video.setAttribute('height', height);
        canvas.setAttribute('width', width);
        canvas.setAttribute('height', height);
        streaming = true;
      }
    }, false);
  };

  var takepicture = function () {
    var canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    canvas.getContext('2d').drawImage(video, 0, 0, width, height);
    var data = canvas.toDataURL('image/png');

    var photo = document.createElement('img');
    photo.setAttribute('src', data);
    postPicture(data, function () {});
  };

  var initEvents = function () {
    startbutton.addEventListener('click', function(ev){
        takepicture();
      ev.preventDefault();
    }, false);
  };

  var postPicture = function (data, cb) {
    $.ajax({
      url: imgUrl,
      type: 'POST',
      data: {
        img: data,
      },
      success: function (data) {
        cb(data);
      }
    });
  };

  initVideo();
  initEvents();

})();

