const TILE_W = 50;
const TILE_H = 50;

const	TILE_CODE_GROUND = 0;
const	TILE_CODE_WALL = 1;
const	TILE_CODE_PLAYER = 2;
const	TILE_CODE_CHEST = 3;
const	TILE_CODE_DOOR = 4;
const	TILE_CODE_KEY = 5;

const ROOM_COLS = 18;
const ROOM_ROWS = 12;

let roomGrid = 
[	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,  1,  1, 	1,
  1,	2,	0,	0,	0,	0,	0,	0,	1,	0,	0,	0,	0,	0,	0,  0,	1,  1,
  1,	1,	0,	0,	0,	0,	0,	0,	4,	0,	0,	0,	0,	0,	0,  0,	0,  1,
  1,	1,	1,	1,	1,	1,	0,	1,	1,	1,	1,	0,	0,	0,	0,  1,	0,  1,
  1,	0,	3,	0,	1,	1,	0,	1,	5,	0,	1,	4,	1,	0,	0,  1,	5,  1,
  1,	0,	0,	0,	1,	5,	0,	1,	0,	0,	0,	0,	1,	1,	0,  1,	1,  1,
  1,	0,	0,	0,	1,	1,	1,	1,	0,	0,	0,	0,	0,	1,	0,  0,	0,  1,
  1,	0,	0,  0,	1,	5,	0,	0,	0,	0,	0,	0,	0,	1,	0,  5,	0,  1,
  1,	0,	0,	0,	1,	1,	1,	1,	0,	0,	0,	0,	0,	1,	1,  1,	5,  1,
  1,	1,	0,	0,	4,	4,	4,	4,	0,	0,	0,	0,	0,	1,	1,  1,	1,	1,
  1,	1,	1,	0,	1,	1,	1,	1,	0,	0,	0,	1,	1,	1,	1,  1,	1,	1,
  1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,  1,	1,  1];

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

  function tileTypeHasTransparency(tileType) {
    return (tileType === TILE_CODE_KEY || tileType === TILE_CODE_CHEST || tileType === TILE_CODE_DOOR);
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
        if (tileTypeHasTransparency(tileType)) {
          drawImageCenteredAtLocationWithScaling(tilePics[TILE_CODE_GROUND], tileX,	tileY, TILE_W, TILE_H);
        }
        drawImageCenteredAtLocationWithScaling(tilePics[tileType], tileX,	tileY, TILE_W, TILE_H);

        tileIndex++;
        
        tileX += TILE_W;
      }
      tileY += TILE_H;
    }
  }