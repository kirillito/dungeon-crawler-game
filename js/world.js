const TILE_W = 50;
const TILE_H = 50;

const	TILE_CODE_GROUND = 0;
const	TILE_CODE_WALL = 1;
const	TILE_CODE_PLAYER = 2;
const	TILE_CODE_CHEST = 3;
const	TILE_CODE_DOOR = 4;
const	TILE_CODE_KEY = 5;

const ROOM_COLS = 20;
const ROOM_ROWS = 14;

let roomGrid = 
[	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,  1,  1, 	1,
  1,	2,	0,	0,	0,	0,	0,	0,	5,	5,	5,	0,	0,	0,	0,	0,	0,  0,	5,  1,
  1,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,  0,	0,  1,
  1,	0,	0,	0,	0,	1,	0,	0,	0,	0,	0,	0,	0,	5,	5,	5,	0,  0,	0,  1,
  1,	0,	0,	1,	1,	1,	1,	1,	0,	0,	0,	1,	1,	1,	5,	1,	1,  1,	0,  1,
  1,	0,	0,	1,	5,	1,	1,	1,	1,	1,	1,	1,	1,	1,	5,	4,	4,  1,	1,  1,
  1,	0,	0,	1,	1,	1,	0,	0,	1,	1,	1,	0,	0,	5,	4,	4,	4,  4,	4,  1,
  1,	0,	0,	1,	1,	0,	0,	0,	0,	1,	0,	0,	0,	0,	5,	1,	1,  1,	1,  1,
  1,	0,	0,	1,	0,	0,	0,	0,	0,	5,	0,	0,	0,	0,	0,	0,	0,  0,	0,  1,
  1,	0,	0,  5,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,  0,	0,  1,
  1,	0,	0,	0,	0,	0,	5,	0,	0,	0,	0,	0,	5,	0,	5,	5,	5,  5,	0,  1,
  1,	1,	0,	0,	0,	0,	1,	0,	0,	5,	0,	0,	5,	5,	5,	5,	0,  0,	0,	1,
  1,	1,	1,	0,	0,	1,	1,	0,	0,	5,	0,	0,	0,	1,	5,	0,	0,  0,	3,	1,
  1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,  1,	1,  1];

  function isWallAtGridCoordinates(row, col) {
    var tileIndex = tileGridCoordinatesToIndex(row, col);
    return (roomGrid[tileIndex] == TILE_CODE_WALL);
  }
  
  function tileGridCoordinatesToIndex(row, col) {
    return col + ROOM_COLS * row;
  }
  
  function getTileCodeAtPixelCoordinates(x, y) {
    var col = Math.floor(x/TILE_W);
    var row = Math.floor(y/TILE_H);
  
    // outside the grid area - don't do anything
    if (col < 0 || col >= ROOM_COLS || row < 0 || row >= ROOM_ROWS) 
      return TILE_CODE_WALL;
  
    var tileIndex = tileGridCoordinatesToIndex(row, col);
    return roomGrid[tileIndex];
  }

  function drawRoom()	{
    var tileIndex = 0;
    var tileX;
    var tileY = 0.5*TILE_H;
    var tileType;
    
    for (var i=0;	i<ROOM_ROWS;	i++) {
      tileX = 0.5*TILE_W;
      for (var j=0;	j<ROOM_COLS;	j++) {
        tileType = roomGrid[tileIndex];
        if (tileType === TILE_CODE_KEY) {
          drawImageCenteredAtLocationWithScalingAndBackground(tilePics[tileType], tilePics[TILE_CODE_GROUND], tileX,	tileY, TILE_W, TILE_H);
        } else {
          drawImageCenteredAtLocationWithScaling(tilePics[tileType], tileX,	tileY, TILE_W, TILE_H);
        }

        tileIndex++;
        
        tileX += TILE_W;
      }
      tileY += TILE_H;
    }
  }