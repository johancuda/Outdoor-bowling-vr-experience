

AFRAME.registerComponent('apply-force', {
    init: function () {
      const el = this.el; // Reference to the sphere entity
      const cameraEl = document.querySelector('a-camera'); // Reference to the camera
      el.addEventListener('click', function () {
        const body = el.body; // Access the physics body
        if (body) {
          // Get forward direction from camera.
          let forward = new THREE.Vector3(0, 0, -1);
          forward.applyQuaternion(cameraEl.object3D.quaternion);
          forward.multiplyScalar(100);  // Adjust to your liking

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


AFRAME.registerComponent('play-sound', {
    init: function() {
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
            pin.setAttribute('sound', 'src: #strike; autoplay: true; volume: 1;');
            this.collision_count++;
            setTimeout(() => {
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

AFRAME.registerComponent('play-button', {
  init: function() {
    let el = this.el;

    // Event to play music when radio is clicked
    el.addEventListener('click', () => {
      el.components.sound.playSound();
    })
  }
})

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

      ball.addEventListener('collide', ()=> {
        console.log('collision pas bien')
      })

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