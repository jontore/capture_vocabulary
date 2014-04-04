(function() {
  window.capturama = window.capturama || {};

  capturama.video = function () {
    var streaming = false,
        video        = document.querySelector('#video'),
        startbutton  = document.querySelector('#startbutton'),
        width = 300,
        height = 0;
        translateWordList = new capturama.translateWordList($('.video-capture'));

    navigator.getMedia = ( navigator.getUserMedia ||
                           navigator.webkitGetUserMedia ||
                           navigator.mozGetUserMedia ||
                           navigator.msGetUserMedia);


    this.initVideo = function () {
       navigator.getMedia({
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
          streaming = true;
        }
      }, false);
    };

    this.takepicture = function () {
      var canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      canvas.getContext('2d').drawImage(video, 0, 0, width, height);
      var data = canvas.toDataURL('image/png');

      var photo = document.createElement('img');
      photo.setAttribute('src', data);
      capturama.imageProcessing(data, function (data) {
        translateWordList.update(data);
      });
    };

    this.initEvents = function () {
      startbutton.addEventListener('click', _.bind(function (ev) {
        this.takepicture();
        ev.preventDefault();
      }, this), false);
    };

    this.initVideo();
    this.initEvents();
  };

})();

