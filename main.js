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
          const force = new CANNON.Vec3(0, 0, -200); // Adjust force as needed
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