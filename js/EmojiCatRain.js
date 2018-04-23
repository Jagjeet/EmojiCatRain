// Random integer function taken from:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

const ElementPosition = function ElementPosition(element, x, y, dWidth, dHeight, yVelocity) {
  this.element = element;
  this.x = x;
  this.y = y;
  this.dWidth = dWidth;
  this.dHeight = dHeight;
  this.yVelocity = yVelocity;
}; 

ElementPosition.prototype.updateY = function updateY() {
  this.y = this.y + this.yVelocity;
};

const EmojiCatRain = function EmojiCatRain()  {
  this.canvas = document.createElement('canvas');
  let h = window.innerHeight;
  let w = window.innerWidth;
  this.canvas.height = h;
  this.canvas.width = w;

  let catElemBuf = [];

  let smileCat = document.getElementById('smile_cat');
  let joyCat = document.getElementById('joy_cat');
  let smileyCat = document.getElementById('smiley_cat');
  let kissingCat = document.getElementById('kissing_cat');
  let heartEyesCat = document.getElementById('heart_eyes_cat');
  let poutingCat = document.getElementById('pouting_cat');
  let smirkCat = document.getElementById('smirk_cat');
  let screamCat = document.getElementById('scream_cat');
  let cryingCatFace = document.getElementById('crying_cat_face');
  let catEmojis = [smileCat, joyCat, smileyCat, kissingCat, heartEyesCat, smirkCat, screamCat, cryingCatFace, poutingCat];

  let ctx = this.canvas.getContext('2d');

  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, w - 1, h - 1);

  document.body.insertBefore(this.canvas, document.body.nextSibling);

  this.resetButton = document.createElement("button");
  this.resetButton.innerHTML = "Reset Canvas";
  // attach event listener to the button 
  this.resetButton.addEventListener('click', function resetButtonClickEventListener(e) {
    if (e.target && e.target.nodeName === 'BUTTON') {
      console.log("Reset Clicked");
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, w - 1, h - 1);
      catElemBuf = [];
    }
  });

  document.body.insertBefore(this.resetButton, document.body.nextSibling);

  window.requestAnimationFrame(function draw() { 

    let numNewEmojis = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1 ];
    let newEmojisIndex = getRandomIntInclusive(0, 10);

    for (let i= 0; i < numNewEmojis[newEmojisIndex]; i++) {
      let x = getRandomIntInclusive(0, w - 1);
      let y = -42;
      let size = getRandomIntInclusive(16, 42);
      let dWidth = size; 
      let dHeight = size;
      let yVelocity = getRandomIntInclusive(3, 10);
      let catElem = catEmojis[getRandomIntInclusive(0, catEmojis.length - 1)];
      let elementPosition = new ElementPosition(catElem, x, y, dWidth, dHeight, yVelocity);
      catElemBuf.push(elementPosition); 
    }

    catElemBuf.forEach(element => {
      element.updateY();
    });

    catElemBuf = catElemBuf.filter(elem => {
      if (elem.y > h + 42) {
        return false;
      }
       return true;
    });

    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, w - 1, h - 1);

    catElemBuf.forEach(elem => {
      ctx.drawImage(elem.element, elem.x, elem.y, elem.dWidth, elem.dHeight);
    });

    window.requestAnimationFrame(draw);
});
} // EmojiCatRain


// Allow inclusion in browers and node
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    RandomColorAnimation,
  };
} else {
  window.EmojiCatRain = EmojiCatRain;

  window.onload = function onload() {
    window.ecr = new EmojiCatRain();
  };
} //else