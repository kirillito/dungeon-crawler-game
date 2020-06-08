class Player {
  PLAYER_MOVE_SPEED = 3.0;

  constructor(name) {
    this.name = name;
    this.startX;
    this.startY;
    this.x;
    this.y;
    this.keys;

    this.keyHeld_North = false;
    this.keyHeld_East = false;
    this.keyHeld_South = false;
    this.keyHeld_West = false;
  }

  init(img) {
    this.imgSprite = img;
    this.reset();
  }

  setupControls(northKey, eastKey, southKey, westKey) {
    this.controlKeyNorth = northKey;
    this.controlKeyEast = eastKey;
    this.controlKeySouth = southKey;
    this.controlKeyWest = westKey;
  }

  reset() {
    if (this.startX === undefined) {
      for (var i = 0; i < roomGrid.length; i++) {
        if (roomGrid[i] == TILE_CODE_PLAYER) {
          var row = Math.floor(i / ROOM_COLS);
          var col = i % ROOM_COLS;
          this.startX = TILE_W * (col + 0.5);
          this.startY = TILE_H * (row + 0.5);
          roomGrid[i] = TILE_CODE_GROUND;
          break;
        }
      }
    }
    this.x = this.startX;
    this.y = this.startY;
    this.keys = 0;
  }

  move() {
    var nextX = this.x;
    var nextY = this.y;

    if (this.keyHeld_North) {
      nextY -= this.PLAYER_MOVE_SPEED;
    }
    if (this.keyHeld_East) {
      nextX += this.PLAYER_MOVE_SPEED;
    }
    if (this.keyHeld_South) {
      nextY += this.PLAYER_MOVE_SPEED;
    }
    if (this.keyHeld_West) {
      nextX -= this.PLAYER_MOVE_SPEED;
    }

    var nextTileIndex = getTileIndexAtPixelCoordinates(nextX, nextY);
    var nextTileCode = TILE_CODE_WALL;
    
    if (nextTileIndex !== undefined) {
      nextTileCode = roomGrid[nextTileIndex];
    }

    switch (nextTileCode) {
      case TILE_CODE_GROUND:
        this.x = nextX;
        this.y = nextY;       
        break;
      case TILE_CODE_CHEST:
        this.reset();
        break;
      case TILE_CODE_KEY:
        this.keys++;
        roomGrid[nextTileIndex] = TILE_CODE_GROUND;
        break;
      case TILE_CODE_DOOR:
        if (this.keys > 0) {
          this.keys--;
          roomGrid[nextTileIndex] = TILE_CODE_GROUND;
        }
        break;
      case TILE_CODE_WALL:
      default:
        break;
    }
  }

  draw() {
    drawImageCenteredAtLocationWithRotation(this.imgSprite, this.x, this.y);
  }
}
