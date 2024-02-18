'use strict';

AFRAME.registerComponent('spawn_lantern', {
  schema: {
    duration: {type: 'number', default: 20000.0},  //duration is in milliseconds
  },
  init: function() {
    const Context_AF = this;
    Context_AF.lantern_button = document.querySelector('#lantern_button');

    Context_AF.el.addEventListener('click', function() {
      // Create a the lantern entity
      const lantern = document.createElement('a-entity');
      lantern.setAttribute('class', 'lantern');
      lantern.setAttribute('geometry', {
        primitive: 'cylinder',
        radius: 0.5,
        height: 1
      });
      lantern.setAttribute('material', {
        color: '#fcd349',
        opacity: 0.8,
        transparent: true
      });
// have the lantern parent to the camera
      Context_AF.el.sceneEl.appendChild(lantern);
//lantern turns white when hover
        lantern.addEventListener('mouseenter', function() {
      lantern.setAttribute('material', {
        color: '#ffffff',
        opacity: 0.8,
        transparent: true 
    });
   });
    lantern.addEventListener('mouseleave', function() {
      lantern.setAttribute('material', {
        color: '#fcd349',
        opacity: 0.8,
        transparent: true
      });
    });
//Have the lantern spawn at random places with x,y,z, constrained to the area of the "room"
      var minX = -6; // Minimum x-coordinate
      var maxX = 6;  // Maximum x-coordinate
      var minY = .5;  // Minimum y-coordinate
      var maxY = 2;  // Maximum y-coordinate
      var minZ = -6; // Minimum z-coordinate
      var maxZ = 6;  // Maximum z-coordinate
      // https://stackoverflow.com/questions/68341441/a-frame-animate-box-to-randomly-move-in-certain-area
      // get a random number from 0 to 1, multiply by range, add the min.
      var randomX = Math.random() * (maxX - minX) + minX;
      var randomY = Math.random() * (maxY - minY) + minY;
      var randomZ = Math.random() * (maxZ - minZ) + minZ;
      lantern.setAttribute('position', `${randomX} ${randomY} ${randomZ}`)// Initial position
//when mouse click on lantern, it destroys it.
    lantern.addEventListener('click', function () {
      lantern.parentNode.removeChild(lantern); // Remove the lantern when clicked
    });
  });
}
});
//To move the lantern upwards using tick.
AFRAME.registerComponent('move-lanterns', {
  schema: {
    speed: { type: 'number', default: 0.001 } // change the speed
  },
  init: function () {
  },
  tick: function (time, timeDelta) {
    var speed = this.data.speed;
    // select all the things called lantern
    var lanterns = document.querySelectorAll('.lantern');
    
    lanterns.forEach(function (lantern) {
      // Get the current position 
      var currentPosition = lantern.getAttribute('position');
      // y-coordinate of the position 
      currentPosition.y += speed * timeDelta;
      
      // Set the new position
      lantern.setAttribute('position', currentPosition);
    });
  }
});


  //component documentation: https://github.com/aframevr/aframe/blob/master/docs/core/component.md
  
  // update: function (oldData) {},
  // tick: function(time, timeDelta) {},
  // tock: function(time, timeDelta) {},
  // remove: function() {},
  // pause: function() {},
  // play: function() {},
  // updateScheme: function(data) {}