//////////////////////////////////////////////////
//                                              //
//Comprobamos si existe una configuracion previa//
//                                              //
//////////////////////////////////////////////////
'use strict';

var ipc = require('ipc');
var configuration = require('../configuration');

if (!configuration.readSettings('pantalla-Id')) {
    $('.light-box').show();
    $('.form-box').show();
    $('.form-group input').on('focus blur', function (e) {
        $(this).parents('.form-group').toggleClass('active', (e.type === 'focus' || this.value.length > 0));
    }).trigger('blur');
    $('.form-group select').on('focus blur', function (e) {
        $(this).parents('.form-group').toggleClass('active', (e.type === 'focus' || this.value.length > 0));
    }).trigger('blur');

    get_loc();
    function get_loc() {
           if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(coordenadas);
           }else{
              alert('Este navegador es algo antiguo, actualiza para usar el API de localización');                  }
    }

    function coordenadas(position) {
      var lat = position.coords.latitude;
      var lon = position.coords.longitude;
    }


        configuration.saveSettings('pantalla-Id', '42');
alert(configuration.readSettings('pantalla-Id'));
}else {


  $(window).load(function(){
      $(".fakeloader").fakeLoader({
          timeToHide:12200,
          bgColor:"#1A1A20",
          imagePath:"img/load1.gif",
      });
      $.jdeskodeads.getPantallaVideos(configuration.readSettings('pantalla-Id'), function(Pantalla){
          var playlistData = JSON.stringify(Pantalla.videos);
        });
  });


  var myPlayer,
    eVideoName = document.getElementById("videoName"),
    eTimeRemaining = document.getElementById("timeRemaining"),
    timeRemaining,
    totalTime,
    currentVideoIndex = 0,
    newVideo,
    firstVideo = true,
    playlistData = [{
      "name": "Great Blue Heron",
      "thumbnailURL": "//solutions.brightcove.com/bcls/assets/images/Great-Blue-Heron.png",
      "sources": [{
        "type": "application/x-mpegURL",
        "src": "video/1.mp4"
      }, {
        "type": "video/mp4",
        "src": "video/1.mp4"
      }]
    }, {
      "name": "Birds of a Feather",
      "thumbnailURL": "http://solutions.brightcove.com/bcls/assets/images/BirdsOfAFeather.png",
      "sources": [{
        "type": "video/mp4",
        "src": "http://solutions.brightcove.com/bcls/assets/videos/BirdsOfAFeather.mp4"
      }]
    }, {
      "name": "Sea Marvels",
      "thumbnailURL": "http://solutions.brightcove.com/bcls/assets/images/Sea Marvels.png",
      "sources": [{
        "type": "video/mp4",
        "src": "http://solutions.brightcove.com/bcls/assets/videos/Sea-Marvels.mp4"
      }]
    }];
  function loadVideo() {
    if (currentVideoIndex < playlistData.length) {
      // load the new video
      myPlayer.src(playlistData[currentVideoIndex].sources);

      // increment the current video index
      currentVideoIndex++;
      // play the video
      if (firstVideo) {
        firstVideo = false;
      } else {
        myPlayer.play();
      }
    }else {
      currentVideoIndex = 0;
      loadVideo();
    }
  };
  videojs("video_1").ready(function () {
    myPlayer = this;
    myPlayer.on("ended", function () {
      loadVideo();
    });
    myPlayer.on("timeupdate", function (evt) {

    });
    // load the first video
    loadVideo();
  });
}
