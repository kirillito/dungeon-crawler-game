const DRIVE_POWER = 0.4;
const REVERSE_POWER = 0.2;
const TURN_RATE = 0.02;
const MIN_TURN_SPEED = 0.6;
const GROUNDSPEED_DECAY_MULT = 0.94;

class Player {
  constructor(name) {
    this.name = name;
    this.startX;
    this.startY;
    this.x;
    this.y;
    this.speed;
    this.angle;

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
    this.speed = 0;
    this.angle = 0;

    if (this.startX === undefined) {
      for (var i = 0; i < trackGrid.length; i++) {
        if (trackGrid[i] == TRACK_CODE_PLAYER) {
          var row = Math.floor(i / TRACK_COLS);
          var col = i % TRACK_COLS;
          this.startX = TRACK_W * (col + 0.5);
          this.startY = TRACK_H * (row + 0.5);
          trackGrid[i] = TRACK_CODE_ROAD;
          break;
        }
      }
    }
    this.x = this.startX;
    this.y = this.startY;
  }

  move() {
    if (this.keyHeld_North) {
      this.speed += DRIVE_POWER;
    }
    if (this.keyHeld_South) {
      this.speed += -REVERSE_POWER;
    }
    if (Math.abs(this.speed) >= MIN_TURN_SPEED) {
      if (this.keyHeld_West) {
        this.angle += -TURN_RATE * Math.PI;
      }
      if (this.keyHeld_East) {
        this.angle += TURN_RATE * Math.PI;
      }
    }
    var nextX = this.x + Math.cos(this.angle) * this.speed;
    var nextY = this.y + Math.sin(this.angle) * this.speed;
    var nextTileCode = getTrackCodeAtPixelCoordinates(nextX, nextY);
    if (nextTileCode === TRACK_CODE_ROAD || nextTileCode === TRACK_CODE_FINISH) {
      if (nextTileCode === TRACK_CODE_FINISH) {
        var currentTileCode = getTrackCodeAtPixelCoordinates(this.x, this.y);
        // TODO: it is currenty possible to drive in opposite direction and still cross the finish line counting it as a lap
        if (currentTileCode !== nextTileCode) {
          this.lap++;
        }
      }
      this.x = nextX;
      this.y = nextY;
      this.speed *= GROUNDSPEED_DECAY_MULT;
    }
    else {
      this.speed = -0.5 * this.speed;
    }
  }

  draw() {
    drawImageCenteredAtLocationWithRotation(this.imgSprite, this.x, this.y, this.angle);
  }
}
