var playerPic = new Image();
var trackPics = [];

var imagesToLoad = 0;

function loadImageForTrackCode(trackCode, fileName) {
  trackPics[trackCode] = new Image();
  beginLoadingImage(trackPics[trackCode], fileName);
}

function loadImages() {
  var	imageList	=	[
    {imgNode:playerPic,	fileName:"player.png"},
    
		{trackCode:TRACK_CODE_WALL,	fileName:"wall.png"},
		{trackCode:TRACK_CODE_ROAD,	fileName:"floor.png"},
		{trackCode:TRACK_CODE_FINISH,	fileName:"finish.png"},
		{trackCode:TRACK_CODE_MOUNTAIN,	fileName:"mountain.png"},
		{trackCode:TRACK_CODE_TREES,	fileName:"trees.png"},
		{trackCode:TRACK_CODE_LAKE,	fileName:"lake.png"},
		{trackCode:TRACK_CODE_FLAG,	fileName:"flag.png"}
    ];
    
  imagesToLoad = imageList.length;

  for (img of imageList) {
    if (img.trackCode !== undefined) {
      loadImageForTrackCode(img.trackCode, img.fileName);
    } else {
      beginLoadingImage(img.imgNode,img.fileName);
    }    
  }
}

function beginLoadingImage(imgNode, fileName) {
  imgNode.src = "images/" + fileName;
  imgNode.onload = setAssetAsLoadedAndLaunchIfReady();
}

function setAssetAsLoadedAndLaunchIfReady() {
  imagesToLoad--;
  this.launchIfReady();
}