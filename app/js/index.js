/**
 * DeskodeAds v@VERSION
 *DeskodeAds Developer,
 * http://ads.deskode.com
 *
 * Copyright (c) 2016 Ivan Sotelo
 * http://deskode.com
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 *
 * Build Date: @DATE
 *
 */

'use strict';

var ipc = require('ipc');
var configuration = require('../configuration');
var myPlayer,
eVideoName = document.getElementById("videoName"),
eTimeRemaining = document.getElementById("timeRemaining"),
timeRemaining,
totalTime,
currentVideoIndex = 0,
newVideo,
firstVideo = true,
playlistData;

//////////////////////////////////////////////////
//                                              //
//Comprobamos si existe una configuracion previa//
//                                              //
//////////////////////////////////////////////////
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
    configuration.saveSettings('pantalla-Id', '42');

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


}else {


  $(window).load(function(){
      $(".fakeloader").fakeLoader({
          timeToHide:12200,
          bgColor:"#1A1A20",
          imagePath:"img/load1.gif",
      });


  });

  $.jdeskodeads.getPantallaVideos(configuration.readSettings('pantalla-Id'), function(Pantalla){
      playlistData = Pantalla.videos;
          loadVideo();
  });

  videojs("video_1").ready(function () {
    myPlayer = this;
    myPlayer.on("ended", function () {
      loadVideo();
    });
    myPlayer.on("timeupdate", function (evt) {
    });
    // load the first video

  });

  function loadVideo() {
    if (currentVideoIndex < playlistData.length) {
      // load the new video
      myPlayer.src(playlistData[currentVideoIndex].URL);

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
}
