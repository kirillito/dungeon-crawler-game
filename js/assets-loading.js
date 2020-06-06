var playerPic = new Image();
var tilePics = [];

var imagesToLoad = 0;

function loadImageForTileCode(tileCode, fileName) {
  tilePics[tileCode] = new Image();
  beginLoadingImage(tilePics[tileCode], fileName);
}

function loadImages() {
  var	imageList	=	[
    {imgNode:playerPic,	fileName:"player.png"},
    
		{tileCode:TILE_CODE_WALL,	fileName:"wall.png"},
		{tileCode:TILE_CODE_GROUND,	fileName:"ground.png"},
		{tileCode:TILE_CODE_CHEST,	fileName:"chest.png"},
		{tileCode:TILE_CODE_DOOR,	fileName:"door.png"},
		{tileCode:TILE_CODE_KEY,	fileName:"key.png"}
    ];
    
  imagesToLoad = imageList.length;

  for (img of imageList) {
    if (img.tileCode !== undefined) {
      loadImageForTileCode(img.tileCode, img.fileName);
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