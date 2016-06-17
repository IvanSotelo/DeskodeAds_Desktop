/**
 * DeskodeAds v@VERSION
 * DeskodeAds Developer,
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

  const os = require('os')
  const homeDir = os.homedir()
  //Variable;
  var ipc = require('ipc'),//Comunicacion con sistema
  configuration = require('../configuration'), //Configuracion local
  eVideoName = document.getElementById("videoName"),//Video
  eTimeRemaining = document.getElementById("timeRemaining"),
  datosPantalla,
  myPlayer,
  timeRemaining,
  totalTime,
  currentVideoIndex = 0,
  newVideo,
  firstVideo = true,
  lat,
  lon,
  playlistData=configuration.readSettings('Videos');

//////////////////////////////////////////////////
//                                              //
//Comprobamos si existe una configuracion previa//
//                                              //
//////////////////////////////////////////////////
if (!configuration.readSettings('Pantalla-Id')) {
  $('.light-box').show();
  $('.form-box').show();
  $('.form-group input').on('focus blur', function (e) {
      $(this).parents('.form-group').toggleClass('active', (e.type === 'focus' || this.value.length > 0));
  }).trigger('blur');
  $('.form-group select').on('focus blur', function (e) {
      $(this).parents('.form-group').toggleClass('active', (e.type === 'focus' || this.value.length > 0));
  }).trigger('blur');

  get_loc();

  $('#login-form').submit(function(event){
  event.preventDefault();
      datosPantalla = new pantalla($('#categoria-form').val(), $('#ubicacion-form').val(), $('#red-form').val(), lat, lon);

      $.jdeskodeads.postPantalla(datosPantalla,function(Pantallas){
            configuration.saveSettings('Pantalla-Id',Pantallas.Pantalla.IdPantalla);
            location.reload();
      });
  });

}else {

  $(".fakeloader").fakeLoader({
      timeToHide:12200,
      bgColor:"#1A1A20",
      imagePath:"img/load1.gif",
  });

  $.jdeskodeads.getPantallaVideos(configuration.readSettings('Pantalla-Id'), function(Pantalla){
      if(Pantalla.videos){
        playlistData = Pantalla.videos;
        configuration.saveSettings('Videos',Pantalla.videos);
      }
  });

  videojs("video_1").ready(function () {
    myPlayer = this;
    myPlayer.on("ended", function () {
      loadVideo();
    });
  });
}

//////////////////////////////////////////////////
//                                              //
//              Funciones Globales              //
//                                              //
//////////////////////////////////////////////////

function loadVideo() {
  if (currentVideoIndex < playlistData.length) {

    // load the new video
    myPlayer.src(homeDir + '/'+playlistData[currentVideoIndex].URL);
    // increment the current video index
    currentVideoIndex++;
    // play the video
    myPlayer.play();
  }else {
    currentVideoIndex = 0;
    loadVideo();
  }
};

function get_loc() {
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(coordenadas);
  }else{
      alert('Este navegador es algo antiguo, actualiza para usar el API de localización');
  }
};

function coordenadas(position) {
  lat = position.coords.latitude;
  lon = position.coords.longitude;
};

function pantalla(dato1, dato2, dato3, dato4, dato5) {
  this.Categoria_id = dato1;
  this.Ubicacion = dato2;
  this.Red_id = dato3;
  this.Lat = dato4;
  this.Lng = dato5;
};
