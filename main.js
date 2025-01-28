/* This script contains AFrame components. */

// Component to apply a force to the ball when clicked
AFRAME.registerComponent('apply-force', {
    init: function () {
      const el = this.el; // Reference to the sphere entity
      const cameraEl = document.querySelector('a-camera'); // Reference to the camera
      el.addEventListener('click', function () {
        const body = el.body; // Access the physics body
        if (body) {
          console.log(el.object3D)
          // Get forward direction from camera.
          let forward = new THREE.Vector3(0, 0, -1);
          forward.applyQuaternion(cameraEl.object3D.quaternion);
          forward.multiplyScalar(170);  // Adjust to your liking

          // Convert to Cannon Vec3
          let force = new CANNON.Vec3(forward.x, 0, forward.z);
          const worldPoint = new CANNON.Vec3(0, 0, 0); // Apply at the center of the sphere
          body.applyImpulse(force, worldPoint); // Apply the impulse
          console.log("Force applied:", force);
        } else {
          console.error("Physics body not found on the entity.");
        }
      });
    }
  });

// Component to play a strike sound on ball collision
AFRAME.registerComponent('play-sound', {
    init: function() {
      // Get the ball, scene and first pin
      let el = this.el;
      let scene = el.sceneEl;
      this.collision_count = 0;
      let pin = scene.querySelector('#pin');

      // Timeout to the event doesn't fire when the scene is loading
      setTimeout(() => {
        // Event to fire sound on first collision
        el.addEventListener('collide', () => {
          console.log("Collision count : " + this.collision_count)
          if(this.collision_count == 0){
            console.log("Strike!")
            // Plays strike sound
            pin.setAttribute('sound', 'src: #strike; autoplay: true; volume: 1;');
            this.collision_count++;
            setTimeout(() => {
              // Removes sound to prevent unwanted behavior
              pin.removeAttribute('sound');
            }, 1000)
          }
        })
      }, 1000)

    },

  // Method to modify the collision count
  setCollisionCount: function(value) {
    this.collision_count = value;
  },

  // Method to get the collision count (for debugging purposes)
  getCollisionCount: function() {
    return this.collision_count;
  }
})

// Component to start music when the radio is clicked
AFRAME.registerComponent('play-button', {
  init: function() {
    let el = this.el;

    // Event to play music when radio is clicked
    el.addEventListener('click', () => {
      el.components.sound.playSound();
    })
  }
})

// Component to get the ball back to it's original position
AFRAME.registerComponent('reload', {
  init: function(){
    let el = this.el;
    let scene = this.el.sceneEl;

    el.addEventListener('click', () => {
      let ball = scene.querySelector('#theBall');
      let playSoundComponent = ball.components['play-sound'];
      console.log("Collision count when reload :" + playSoundComponent.getCollisionCount())
      // Replacing the ball
      ball.setAttribute('position', '0 0.5 13');
      let ballBody = ball.body;
      if (ballBody) {
        // Setting speed to 0
        ballBody.velocity.set(0, 0, 0); // Stop motion
        ballBody.angularVelocity.set(0, 0, 0); // Stop rotation
        // Changing ball color
        let ball_current_texture = el.getAttribute('material').src.id;
        ball.removeAttribute('material');
        ball.setAttribute('material', 'src', ball_current_texture);
      }
      // Updating ball position
      ball.components["dynamic-body"].syncToPhysics();

      // Reset collision count
      console.log(playSoundComponent)
      if (playSoundComponent) {
        setTimeout(() => {
        playSoundComponent.setCollisionCount(0); // Reset collision count
        }, 500)
      }
    })
  }
})

// Component to display achievements to the player
AFRAME.registerComponent('unlock-achievement', {
  schema: {
    name: { type: 'string' }
  },
  init: function () {
    this.el.addEventListener('click', () => {
      this.unlockAchievement();
    });
  },
  unlockAchievement: function () {
    let unlockedAchievements = JSON.parse(localStorage.getItem('achievements')) || [];

    if (!unlockedAchievements.includes(this.data.name)) {
      alert(`Achievement Unlocked: ${this.data.name}`);
      unlockedAchievements.push(this.data.name);
      localStorage.setItem('achievements', JSON.stringify(unlockedAchievements));

      // Update the text entity to display the new list
      updateAchievementDisplay();
    } else {
      console.log(`Achievement "${this.data.name}" is already unlocked.`);
    }
  }
});

// A helper function to update the text entity
function updateAchievementDisplay() {
  let unlockedAchievements = JSON.parse(localStorage.getItem('achievements')) || [];
  let textValue = 'Achievements:\n' + unlockedAchievements.join('\n');

  // Update the A-Frame text entity
  const textEntity = document.querySelector('#achievementList');
  if (textEntity) {
    textEntity.setAttribute('text', 'value', textValue);
  }
}

// When the scene loads, update the text once
window.addEventListener('load', () => {
  updateAchievementDisplay();
});


// Component to detect when the ball exits the lane
AFRAME.registerComponent('position-handler', {
  tick: function() {
    // Get the ball position
    let pos = this.el.object3D.position;
    let y = pos.y;

    // Floor y-axis position
    let floor_y = 0.4;

    if(y < floor_y) {
    setTimeout(() => {
      let body = this.el.body;

      this.el.setAttribute('position', '0 0.5 13');

      if (body) {
        // Setting speed to 0
        body.velocity.set(0, 0, 0); // Stop motion
        body.angularVelocity.set(0, 0, 0); // Stop rotation
      }
      // Updating ball position
      this.el.components["dynamic-body"].syncToPhysics();
    }, 500)
  }

} 
}) 