

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
          let force = new CANNON.Vec3(forward.x, forward.y, forward.z);
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
      let collision_count = 0

      setTimeout(() => {
        el.addEventListener('collide', () => {
          if(collision_count == 0){
            el.setAttribute('sound', 'src: #strike; autoplay: true; volume: 1;');
            collision_count++;
          }
        })
      }, 1000)

    }
})

AFRAME.registerComponent('play-button', {
  init: function() {
    let el = this.el;

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
      ball.setAttribute('position', '0 0.5 13');
      let ballBody = ball.body;
      if (ballBody) {
        ballBody.velocity.set(0, 0, 0); // Stop motion
        ballBody.angularVelocity.set(0, 0, 0); // Stop rotation
        let ball_current_texture = el.getAttribute('material').src.id;
        ball.removeAttribute('material');
        ball.setAttribute('material', 'src', ball_current_texture);
      }
      ball.components["dynamic-body"].syncToPhysics();
    })
  }
})
