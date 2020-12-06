console.log('Flappy Bird');

const sprites = new Image();
sprites.src= './sprites.png';

const canvas = document.querySelector('canvas');
const contexto= canvas.getContext('2d');

const planoDeFundo = {
    spriteX: 390,
    spriteY: 0,
    largura: 275,
    altura: 204,
    xCanvas: 0,
    yCanvas: canvas.height - 204,
    desenha() {
        contexto.fillStyle = '#70c5ce';
        contexto.fillRect(0, 0, canvas.width, canvas.height);

        contexto.drawImage(
            sprites,
            planoDeFundo.spriteX, planoDeFundo.spriteY, //Sprite posição X, Sprite Y
            planoDeFundo.largura, planoDeFundo.altura, // Tamanho do recorte na sprite
            planoDeFundo.xCanvas, planoDeFundo.yCanvas, 
            planoDeFundo.largura, planoDeFundo.altura
        );

        contexto.drawImage(
            sprites,
            planoDeFundo.spriteX, planoDeFundo.spriteY, //Sprite posição X, Sprite Y
            planoDeFundo.largura, planoDeFundo.altura, // Tamanho do recorte na sprite
            (planoDeFundo.xCanvas + planoDeFundo.largura), planoDeFundo.yCanvas, 
            planoDeFundo.largura, planoDeFundo.altura
        );
    }
}

const chao = {
    spriteX: 0,
    spriteY: 610,
    largura: 224,
    altura: 112,
    xCanvas: 0,
    yCanvas: canvas.height - 112,
    desenha() {
        contexto.drawImage(
            sprites,
            chao.spriteX, chao.spriteY, //Sprite posição X, Sprite Y
            chao.largura, chao.altura, // Tamanho do recorte na sprite
            chao.xCanvas, chao.yCanvas, 
            chao.largura, chao.altura
        );

        contexto.drawImage(
            sprites,
            chao.spriteX, chao.spriteY, //Sprite posição X, Sprite Y
            chao.largura, chao.altura, // Tamanho do recorte na sprite
            (chao.xCanvas + chao.largura), chao.yCanvas, 
            chao.largura, chao.altura
        );
    }
}


const flappyBird = {
    spriteX: 0,
    spriteY: 0,
    largura: 33,
    altura: 24,
    xCanvas: 10,
    yCanvas:50,
    gravidade: 0.25,
    velocidade: 0,
    atualiza() {
        flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade;
        flappyBird.yCanvas = flappyBird.yCanvas + flappyBird.velocidade;

    },
    desenha() {
        contexto.drawImage(
            sprites,
            flappyBird.spriteX, flappyBird.spriteY, //Sprite posição X, Sprite Y
            flappyBird.largura, flappyBird.altura, // Tamanho do recorte na sprite
            flappyBird.xCanvas, flappyBird.yCanvas, 
            flappyBird.largura, flappyBird.altura
        );
    }
}


function loop() {
    flappyBird.atualiza();
    planoDeFundo.desenha();
    chao.desenha();
    flappyBird.desenha();

    requestAnimationFrame(loop);
}

loop(); 