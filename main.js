document.addEventListener("DOMContentLoaded", start);

function start(){

let theBall = document.querySelector('#theBall');


AFRAME.registerComponent('apply-force', {
    init: function () {
      const el = this.el; // Reference to the sphere entity
      el.addEventListener('click', function () {
        console.log(el)
        const body = el.body; // Access the physics body
        if (body) {
          // Create a force vector and apply it
          const force = new CANNON.Vec3(0, 0, -100); // Adjust force as needed
          const worldPoint = new CANNON.Vec3(0, 0, 0); // Apply at the center of the sphere
          body.applyImpulse(force, worldPoint); // Apply the impulse
          console.log("Force applied:", force);
        } else {
          console.error("Physics body not found on the entity.");
        }
      });
    }
  });

}

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
      console.log('salut')
      el.components.sound.playSound();
    })
  }
})