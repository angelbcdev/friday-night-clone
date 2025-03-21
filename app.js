const canvas = document.getElementById("canvas");
const c = canvas.getContext("2d");
const puntaje = document.getElementById("puntuaje");

const divGameOver = document.querySelector(".gameOver");
const botonera = document.querySelector(".botones");
const inicio = document.querySelector(".gameStar");
const opciones = document.querySelector(".opciones");

const poitn1st = document.getElementById("poitn1st");
const poitn2st = document.getElementById("poitn2st");
const poitn3st = document.getElementById("poitn3st");

const time1st = document.getElementById("time1st");
const time2st = document.getElementById("time2st");
const time3st = document.getElementById("time3st");

canvas.width = 64 * 18; //32
canvas.height = 64 * 32; //18
const flechaverde = "./assets/flechaVerde.png";
const imVerde = new Image();
imVerde.src = flechaverde;
const bGStatic = new Image();
bGStatic.src = "./assets/bgstatic.png";

const flecharoja = "./assets/flechaRojo.png";
const imRojo = new Image();
imRojo.src = flecharoja;

const flechaazul = "./assets/flechaAzul.png";
const imAzul = new Image();
imAzul.src = flechaazul;

const flechaamarilla = "./assets/flechaAmarillo.png";
const flechaamarilla2 = "./assets/flechaAmarillo2.png";
const imAmarillo = new Image();
imAmarillo.src = flechaamarilla;
let altura = -50;
let anchura = 100;
const yAmarillo = altura; //+ 0
const yRojo = altura; //+ 150;
const yVerde = altura; // + 300
const yAzul = altura; // + 450

const xAmarillo = anchura + 300;
const xRojo = anchura + 0;
const xVerde = anchura + 870;
const xAzul = anchura + 590;

let yJuego = canvas.height - 270;

let rangoJuego = 1700;
let specialmode = false;
let makePoint = true;
let gameOver = true;
let pintar = false;
let segundos = -1;
let botones = [];
let flechasDerecha = [];
let flechasIzquierda = [];
let flechasArriba = [];
let flechasAbajo = [];
const nameDatos = "DATOS1";
let parsedItem = { record: [1, 2, 3], timer: [1, 2, 3] };

const showRecords = (a, b) => {
  poitn1st.innerHTML = a[0];
  poitn2st.innerHTML = a[1];
  poitn3st.innerHTML = a[2];
  time1st.innerHTML = b[0];
  time2st.innerHTML = b[1];
  time3st.innerHTML = b[2];
};

try {
  const localStorageItem = localStorage.getItem(nameDatos);

  if (!localStorageItem) {
    localStorage.getItem(nameDatos, JSON.stringify(initialValue));
    parsedItem = { record: [1, 2, 3], timer: [1, 2, 3] };
    showRecords(parsedItem.record, parsedItem.timer);
  } else {
    parsedItem = JSON.parse(localStorageItem);
    showRecords(parsedItem.record, parsedItem.timer);
  }
} catch (error) {}

class Game {
  constructor() {
    this.enemySpeed = 2;
    this.newArrow = 0;
    this.enemyTime = 0;
    this.enemyInterval = 1000;
    this.time = 0;
    this.maxTime = 20;
    this.score = 0;
    this.backGround = new Image();
    this.backGround.src = "./assets/wallpaper.png";
  }
  draw(c) {}
  update(deltatime) {
    dificultad();

    if (segundos >= this.maxTime) {
      (gameOver = true),
        (puntaje.innerHTML = ` <p>${this.score}</p>  <br> Suerte para la <br> Proxima!`);
      mensajeGameOver();
    }
  }
  update2(deltatime) {
    if (this.enemyTime > this.enemyInterval) {
      this.addEnemy();
      this.enemyTime = 0;
    } else {
      this.enemyTime += deltatime;
    }
    flechasDerecha = flechasDerecha.filter((flechas) => !flechas.markForDelete);
    flechasIzquierda = flechasIzquierda.filter(
      (flechas) => !flechas.markForDelete
    );
    flechasArriba = flechasArriba.filter((flechas) => !flechas.markForDelete);
    flechasAbajo = flechasAbajo.filter((flechas) => !flechas.markForDelete);
  }
  addEnemy() {
    Math.random() < 0.4 ? nuevaFlechaVerde() : this.addEnemy2();
  }
  addEnemy2() {
    Math.random() < 0.6 ? this.addEnemy3() : nuevaFlechaRoja();
  }
  addEnemy3() {
    Math.random() < 0.5 ? nuevaFlechaAmarilla() : nuevaFlechaAzul();
  }
}

setInterval(function () {
  segundos++;
}, 1000);

const nuevaFlechaVerde = () => {
  flechasDerecha.push(new Flecha(xVerde, yVerde, flechaverde)); //
};
const nuevaFlechaRoja = () => {
  flechasIzquierda.push(new Flecha(xRojo, yRojo, flecharoja));
};
const nuevaFlechaAmarilla = () => {
  flechasArriba.push(new Flecha(xAmarillo, yAmarillo, flechaamarilla));
};
const nuevaFlechaAzul = () => {
  flechasAbajo.push(new Flecha(xAzul, yAzul, flechaazul));
};

const safeLocalStorage = () => {
  if (parsedItem.record[0] < game.score) {
    puntaje.innerHTML = `<p>${game.score} </p> <br>  Felicitaciones!! <br> Nuevo Records`;
    parsedItem.record.unshift(game.score);
    parsedItem.record.pop();
    parsedItem.timer.unshift(segundos);
    parsedItem.timer.pop();
    const datosJSON = JSON.stringify(parsedItem);

    localStorage.setItem(nameDatos, datosJSON);
  }
};

const dificultad = () => {
  switch (segundos) {
    case 5:
      game.enemySpeed = 6.5;
      game.enemyInterval = 1950;
      break;
    case 10:
      game.enemySpeed = 7;
      game.enemyInterval = 1600;
      break;
    case 15:
      game.enemySpeed = 8.5;
      game.enemyInterval = 1450;
      break;
    case 20:
      game.enemySpeed = 10;
      game.enemyInterval = 1350;
      break;
    case 25:
      game.enemySpeed = 11.5;
      game.enemyInterval = 1200;
      break;
    case 30:
      game.enemySpeed = 12;
      game.enemyInterval = 1100;
    case 35:
      game.enemySpeed = 12.5;
      game.enemyInterval = 900;
      break;
    case 40:
      game.enemySpeed = 13;
      game.enemyInterval = 800;
      break;
    case 45:
      game.enemySpeed = 13.5;
      game.enemyInterval = 750;
      break;
    case 50:
      game.enemySpeed = 14;
      game.enemyInterval = 600;
      break;
    case 55:
      game.enemySpeed = 15;
      game.enemyInterval = 400;
      break;
  }
};

class Extras {
  constructor(x, y, width, height, image) {
    this.position = {
      x: x,
      y: y,
      width: 800,
      height: 800,
    };
    this.image = new Image();
    this.image.src = image;
    this.imageWidth = width;
    this.imageHeight = height;
    this.frameX = 0;
    this.frameY = 0;
    this.frameTime = 0;
    this.maxFrame = 16;
    this.fps = 12;
    this.frameInterval = 1000 / this.fps;
    this.frameTime = 0;
  }
  draw2() {
    c.drawImage(
      this.image,
      this.frameX * this.imageWidth,
      this.frameY * this.imageHeight,
      this.imageWidth,
      this.imageHeight,
      this.position.x,
      this.position.y,
      this.position.width,
      this.position.height
    );
  }
  update(deltaTime) {
    if (this.frameTime > this.frameInterval) {
      this.frameTime = 0;
      if (this.frameX < this.maxFrame) this.frameX++;
      else this.frameX = 0;
    } else this.frameTime += deltaTime;
  }
}

class Player {
  constructor() {
    this.position = {
      x: 700,
      y: yJuego - 480,
      width: 400,
      height: 400,
    };
    this.image = new Image();
    this.image.src = "./assets/player2.png";
    this.imageWidth = 420;
    this.imageHeight = 470;
    this.frameX = 0;
    this.frameY = 0;
    this.keys = [];
    this.frameTime = 0;
    this.maxFrame = 11;
    this.fps = 12;
    this.frameInterval = 1000 / this.fps;
    this.frameTime = 0;
  }
  draw(c) {
    c.fillText(segundos, 510, 157);
    // flechas semis-transparete para guia
    c.drawImage(imVerde, xVerde, yJuego, 100, 100);
    c.drawImage(imRojo, xRojo, yJuego, 100, 100);
    c.drawImage(imAzul, xAzul, yJuego, 100, 100);
    c.drawImage(imAmarillo, xAmarillo, yJuego, 100, 100);
  }

  draw2() {
    c.fillStyle = "black";
    c.font = "80px Silkscreen";
    c.fillText("TIEMPO ", canvas.width / 3, 80);
    this.acctionKey();
  }
  update(deltaTime) {
    c.drawImage(
      this.image,
      this.frameX * this.imageWidth,
      this.frameY * this.imageHeight,
      this.imageWidth,
      this.imageHeight,
      this.position.x,
      this.position.y,
      this.position.width,
      this.position.height
    );

    if (this.frameTime > this.frameInterval) {
      this.frameTime = 0;
      if (this.frameX < this.maxFrame) this.frameX++;
      else this.frameX = 0;
    } else this.frameTime += deltaTime;
  }
  Arrow(x, y, width, height, color) {
    x = x;
    y = y;
    width = width;
    height = height;
    color = color;
  }
  input() {
    window.addEventListener("keydown", (e) => {
      if (
        (e.key === "ArrowDown" ||
          e.key === "ArrowUp" ||
          e.key === "ArrowLeft" ||
          e.key === "ArrowRight" ||
          e.key === "w" ||
          e.key === "a" ||
          e.key === "d" ||
          e.key === "s" ||
          e.key === " " ||
          e.key === "f" ||
          e.key === "g" ||
          e.key === "Enter") &&
        this.keys.indexOf(e.key) === -1
      ) {
        this.keys.push(e.key);
      }
    });
    window.addEventListener("keyup", (e) => {
      e.preventDefault();
      if (
        e.key === "ArrowDown" ||
        e.key === "ArrowUp" ||
        e.key === "ArrowLeft" ||
        e.key === "ArrowRight" ||
        e.key === "w" ||
        e.key === "a" ||
        e.key === "d" ||
        e.key === "s" ||
        e.key === " " ||
        e.key === "f" ||
        e.key === "g" ||
        e.key === "Enter"
      ) {
        this.keys.splice(this.keys.indexOf(e.keys), 1), (botones = []);
      }
    });
  }
  acctionKey() {
    this.input();

    flechasDerecha, flechasIzquierda, flechasArriba, flechasAbajo;

    if (this.keys == "ArrowRight")
      pressButon(xVerde, yJuego, flechaverde),
        this.colitionArrow(flechasDerecha, 4);
    else if (this.keys == "ArrowLeft")
      pressButon(xRojo, yJuego, flecharoja),
        this.colitionArrow(flechasIzquierda, 1);
    else if (this.keys == "ArrowDown")
      pressButon(xAzul, yJuego, flechaazul),
        this.colitionArrow(flechasAbajo, 2);
    else if (this.keys == "ArrowUp")
      pressButon(xAmarillo, yJuego, flechaamarilla),
        this.colitionArrow(flechasArriba, 3);
  }
  colitionArrow(todasFlechas, sprite) {
    if (makePoint) {
      for (let i = 0; i < todasFlechas.length; i++) {
        let transicionalArrow = todasFlechas[i];
        if (
          botones[0].x <= transicionalArrow.x + 25 &&
          botones[0].x + botones[0].width / 2 >= transicionalArrow.x &&
          botones[0].y <= transicionalArrow.y + transicionalArrow.height &&
          botones[0].y + botones[0].height >= transicionalArrow.y
        ) {
          gF.frameY = 1;
          player.frameY = sprite;
          (makePoint = false), (transicionalArrow.markForDelete = true);
          pintar = true;
          setTimeout(() => {
            player.frameY = 0;
            gF.frameY = 0;
            game.score++;
            makePoint = true;
            pintar = false;
          }, 500);
        }
      }
    }
  }
}

// funciones del HTML
const gameStart = () => {
  setTimeout(() => {
    showopciones();
  }, 500);
};

const showopciones = () => {
  opciones.classList.remove("noMostrar"), inicio.classList.add("noMostrar");
  botonera.classList.remove("noMostrar");
};
const shangeTime = (t) => {
  (game.maxTime = t),
    setTimeout(() => {
      opciones.classList.add("noMostrar"), animate(0);
    }, 600);
};
const specialmodef = () => {
  specialmode = true;
  setTimeout(() => {
    showopciones();
  }, 500);
};
const releaseButons = () => {
  (player.keys = []), (botones = []);
};
const pushArriba = () => {
  player.keys.push("ArrowUp"), r2butons();
};
const pushAbajo = () => {
  player.keys.push("ArrowDown"), r2butons();
};
const pushDerecha = () => {
  player.keys.push("ArrowRight"), r2butons();
};
const pushIzquierda = () => {
  player.keys.push("ArrowLeft"), r2butons();
};
const mensajeGameOver = () => {
  divGameOver.classList.add("mostrar");
  divGameOver.classList.remove("noMostrar");
  safeLocalStorage();
};
const r2butons = () => {
  setTimeout(() => {
    (player.keys = []), (botones = []);
  }, 300);
};

class PressButton {
  constructor(x, y, imagen) {
    (this.x = x),
      (this.y = y),
      (this.image = new Image()),
      (this.image.src = imagen),
      (this.width = 100),
      (this.height = 100);
  }
  draw() {
    c.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}
const pressButon = (x, y, imagen) => {
  x = x;
  y = y;
  imagen = imagen;

  botones.push(new PressButton(x, y, imagen));
};

class Flecha {
  constructor(x, y, srcImage) {
    this.x = x;
    this.y = y;

    this.imagefl = new Image();
    this.imagefl.src = srcImage;
    this.width = 60;
    this.height = 60;
    this.markForDelete = false;
    this.newArrowGreen = 0;
    this.crecer = 0.1;
  }
  draw() {
    c.drawImage(this.imagefl, this.x, this.y, this.width, this.height);
  }
  update() {
    this.y += game.enemySpeed;
    this.width += this.crecer;
    this.height += this.crecer;
    if (this.y > canvas.height) {
      this.markForDelete = true;
      player.frameY = 5;
      gF.frameY = 2;
      setTimeout(() => {
        player.frameY = 0;
        gF.frameY = 0;
      }, 5000);
    }
  }
}
class Layer {
  constructor(image, speedModifier) {
    this.x = 0;
    this.y = 0;
    this.image = image;
    this.width = 2244;
    this.height = 2048;
    this.speedModifier = speedModifier;
  }
  update() {
    if (this.x < -this.width) this.x = 0;
    else this.x -= this.speedModifier * (game.enemySpeed * 0.2);
  }
  draw() {
    c.drawImage(this.image, this.x, this.y, this.width, this.height);
    c.drawImage(
      this.image,
      this.x + this.width - this.speedModifier,
      this.y,
      this.width,
      this.height
    );
  }
}
class BackGround {
  constructor() {
    this.width = canvas.width;
    this.height = canvas.height;
    this.imagelayer1 = layer1;
    this.imagelayer2 = layer2;
    this.imagelayer3 = layer3;
    this.imagelayer4 = layer4;
    this.layer1 = new Layer(this.imagelayer1, 0.2);
    this.layer2 = new Layer(this.imagelayer2, 0.07); // este est el mar
    this.layer3 = new Layer(this.imagelayer3, 0.6);
    this.layer4 = new Layer(this.imagelayer4, 0); // este es el fondo azul detras no es necesario qu este moviendo
    this.bGArray = [this.layer4, this.layer2, this.layer3, this.layer1];
  }
  update() {
    this.bGArray.forEach((Layer) => {
      Layer.update();
    });
  }
  draw() {
    this.bGArray.forEach((Layer) => {
      Layer.draw();
    });
  }
}

let backGround = new BackGround();
const gF = new Extras(195, 630, 730, 686, "./assets/GF.png");
const game = new Game();
const player = new Player(rangoJuego);
let lastime = 0;
const animate = (timeStamp) => {
  const deltatime = timeStamp - lastime;
  lastime = timeStamp;
  gameOver = false;
  c.fillStyle = " white";
  c.fillRect(0, 0, canvas.width, canvas.height);
  if (!specialmode) {
    backGround.draw();
    backGround.update();
  }
  if (specialmode) {
    c.drawImage(bGStatic, 0, 0, canvas.width, canvas.height);
    gF.draw2();
    gF.update(deltatime);
    player.update(deltatime);
  }

  game.draw(c);

  c.save();
  c.globalAlpha = 0.3;
  player.draw(c);

  c.restore();

  if (pintar) {
    botones.forEach((botones) => botones.draw());
  }
  const lasFlechas = (flechas) => {
    for (let i = 0; i < flechas.length; i++) {
      let qv = flechas[i];
      qv.draw();
      qv.update();
    }
  };

  lasFlechas(flechasIzquierda);
  lasFlechas(flechasDerecha);
  lasFlechas(flechasAbajo);
  lasFlechas(flechasArriba);
  player.draw2(c);

  game.update(deltatime);
  game.update2(deltatime);

  if (!gameOver) {
    requestAnimationFrame(animate);
  }
};
