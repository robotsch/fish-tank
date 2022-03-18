class BiteFish extends Fish {
  constructor(options) {
    super(options);
    this.isTasty = false;
    this.imageUri = "/images/bite-fish.gif";
    this.killRange = 100
  }

  updateOneTick() {
    var delta = this.swimVelocity.scale(PHYSICS_TICK_SIZE_S);
    this.position.addMut(delta);
    this.timeUntilSpeedChange -= PHYSICS_TICK_SIZE_S;
    if (this.timeUntilSpeedChange < 0) {
      this.makeNewVelocity();
    }
    // This happens every tick for every bitefish, not ideal but it's what we've got
    // Loop through every denizen in the tank
    for (const fishId in this.tank.denizens) {
      // If the denizen is tasty (not bitefish, not starter)
      if (this.tank.denizens[fishId].isTasty) {
        // Check to see if current target is within a 100 radius
        if(this.isInKillRange(
          this.position.x,
          this.position.y,
          this.tank.denizens[fishId].position.x,
          this.tank.denizens[fishId].position.y
        )) {
          // Kill the unlucky fish that got too close
          this.tank.denizens[fishId].kill();
        }
      }
    }
  }
  // Distance between two points formula, had to google this one
  isInKillRange(x1, y1, x2, y2, range) {
    const xs = Math.pow((x2 - x1), 2)
    const ys = Math.pow((y2 - y1), 2)
    return Math.sqrt(xs + ys) < this.killRange ? true : false
  }

  onClick(event) {
    this.makeNewVelocity(50);
    console.log(this.position);
  }
}
