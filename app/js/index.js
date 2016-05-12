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
      "src": "http://solutions.brightcove.com/bcls/assets/videos/Great-Blue-Heron.m3u8"
    }, {
      "type": "video/mp4",
      "src": "http://solutions.brightcove.com/bcls/assets/videos/Great-Blue-Heron.mp4"
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
