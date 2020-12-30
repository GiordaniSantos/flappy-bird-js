console.log('Flappy Bird');

let frames = 0;
const som_HIT = new Audio();
som_HIT.src = './efetos/hit.wav'

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

function criaChao() {

    const chao = {
        spriteX: 0,
        spriteY: 610,
        largura: 224,
        altura: 112,
        xCanvas: 0,
        yCanvas: canvas.height - 112,
        atualiza () {
            const movimentoChao = 1;
            const repeteEm = chao.largura / 2;
            const movimentacao = chao.xCanvas - movimentoChao

           // console.log('chao.xCanvas', chao.xCanvas);
           // console.log('repeteEm', repeteEm);
           // console.log('movimentacao', movimentacao % repeteEm);

            chao.xCanvas=  movimentacao % repeteEm;
        },
        desenha () {
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
    return chao;
}

function fazColisao(flappyBird, chao) {
    
    const flappyBirdY = flappyBird.yCanvas + flappyBird.altura;
    const chaoY = chao.yCanvas;

    if(flappyBirdY >= chaoY){
        return true;
    }

    return false;
}

function criaFlappyBird() {
    const flappyBird = {
        spriteX: 0,
        spriteY: 0,
        largura: 33,
        altura: 24,
        xCanvas: 10,
        yCanvas:50,
        gravidade: 0.25,
        velocidade: 0,
        pulo: 4.6,
        pula() {
            flappyBird.velocidade = - flappyBird.pulo; 
        },
        atualiza() {
            if(fazColisao(flappyBird, globais.chao)) {
               
                som_HIT.play();

                mudaTela(Telas.GAME_OVER);

                
                return;
            }
    
            flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade;
            flappyBird.yCanvas = flappyBird.yCanvas + flappyBird.velocidade;

        },

        movimentos: [
                { spriteX: 0, spriteY: 0, }, //asa pra cima
                { spriteX: 0, spriteY: 26 }, // asa no meio
                {spriteX: 0, spriteY: 52 }, // asa pra baixo
                { spriteX: 0, spriteY: 26 }, // asa no meio
        ],
        frameatual: 0,
        atualizaFrameAtual() {
            const intervaloDeFrames = 10;
            const passouOIntervalor = frames % intervaloDeFrames === 0 ;

            if(passouOIntervalor){
                const baseDoIncremento = 1;
                const incremento = baseDoIncremento + flappyBird.frameatual;
                const baseRepeticao = flappyBird.movimentos.length;
                flappyBird.frameatual = incremento % baseRepeticao;
            }

            // console.log('incremento', incremento);
            // console.log('baseRepeticao', baseRepeticao);
            // console.log('frame', incremento % baseRepeticao);
        },
        desenha() {
            flappyBird.atualizaFrameAtual();
            const { spriteX, spriteY } = flappyBird.movimentos[flappyBird.frameatual];
            contexto.drawImage(
                sprites,
                spriteX, spriteY, //Sprite posição X, Sprite Y
                flappyBird.largura, flappyBird.altura, // Tamanho do recorte na sprite
                flappyBird.xCanvas, flappyBird.yCanvas, 
                flappyBird.largura, flappyBird.altura
            );
        }
    }
  return flappyBird;  
} 

function criaCanos() {
    const canos = {
      largura: 52,
      altura: 400,
      chao: {
        spriteX: 0,
        spriteY: 169,
      },
      ceu: {
        spriteX: 52,
        spriteY: 169,
      },
      espaco: 80,
      desenha() {
        canos.pares.forEach(function(par) {
          const yRandom = par.y;
          const espacamentoEntreCanos = 90;
    
          const canoCeuX = par.x;
          const canoCeuY = yRandom; 
  
          // [Cano do Céu]
          contexto.drawImage(
            sprites, 
            canos.ceu.spriteX, canos.ceu.spriteY,
            canos.largura, canos.altura,
            canoCeuX, canoCeuY,
            canos.largura, canos.altura,
          )
          
          // [Cano do Chão]
          const canoChaoX = par.x;
          const canoChaoY = canos.altura + espacamentoEntreCanos + yRandom; 
          contexto.drawImage(
            sprites, 
            canos.chao.spriteX, canos.chao.spriteY,
            canos.largura, canos.altura,
            canoChaoX, canoChaoY,
            canos.largura, canos.altura,
          )
  
          par.canoCeu = {
            x: canoCeuX,
            y: canos.altura + canoCeuY
          }
          par.canoChao = {
            x: canoChaoX,
            y: canoChaoY
          }
        })
      },
      temColisaoComOFlappyBird(par) {
        const cabecaDoFlappy = globais.flappyBird.yCanvas;
        const peDoFlappy = globais.flappyBird.yCanvas + globais.flappyBird.altura;
        
        if((globais.flappyBird.xCanvas + globais.flappyBird.largura) >= par.x) {
          if(cabecaDoFlappy <= par.canoCeu.y) {
            return true;
          }
  
          if(peDoFlappy >= par.canoChao.y) {
            return true;
          }
        }
        return false;
      },
      pares: [],
      atualiza() {
        const passou100Frames = frames % 100 === 0;
        if(passou100Frames) {
          console.log('Passou 100 frames');
          canos.pares.push({
            x: canvas.width,
            y: -150 * (Math.random() + 1),
          });
        }
  
  
  
        canos.pares.forEach(function(par) {
          par.x = par.x - 2;
  
          if(canos.temColisaoComOFlappyBird(par)) {
            console.log('Você perdeu!')
            som_HIT.play();
            mudaTela(Telas.GAME_OVER);
          }
  
          if(par.x + canos.largura <= 0) {
            canos.pares.shift();
          }
        });
  
      }
    }
  
    return canos;
  }


const mensagemGetReady = {
    sX: 134,
    sY: 0,
    w: 174,
    h: 152,
    x: (canvas.width /2 ) -174 / 2,
    y: 50,
    desenha() {
        contexto.drawImage(
            sprites,
            mensagemGetReady.sX, mensagemGetReady.sY, //Sprite posição X, Sprite Y
            mensagemGetReady.w, mensagemGetReady.h, // Tamanho do recorte na sprite
            mensagemGetReady.x, mensagemGetReady.y, 
            mensagemGetReady.w, mensagemGetReady.h,
        );
    }
}

const mensagemGameOver = {
  sX: 134,
  sY: 153,
  w: 226,
  h: 200,
  x: (canvas.width /2 ) -226 / 2,
  y: 50,
  desenha() {
      contexto.drawImage(
          sprites,
          mensagemGameOver.sX, mensagemGameOver.sY, //Sprite posição X, Sprite Y
          mensagemGameOver.w, mensagemGameOver.h, // Tamanho do recorte na sprite
          mensagemGameOver.x, mensagemGameOver.y, 
          mensagemGameOver.w, mensagemGameOver.h,
      );
  }
}


function criaPlacar(){
  const placar = {
    pontuacao: 0,
    desenha() {
      contexto.font = '35px "VT323"';
      contexto.textAlign = 'right';
      contexto.fillStyle = 'white';
      contexto.fillText(`${placar.pontuacao}`, canvas.width - 10, 35);
      
    },
    atualiza() {
      const intervaloDeFrames = 20;
      const passouOIntervalor = frames % intervaloDeFrames === 0 ;

      if(passouOIntervalor){
        placar.pontuacao = placar.pontuacao+1;

      }
    }
  }
  return placar;
}


//
// Telas
//
const globais = {};

let telaAtiva = {};
function mudaTela(novaTela) {
    telaAtiva = novaTela

    if(telaAtiva.inicializa){
        telaAtiva.inicializa();
    }
}


 
const Telas = {
    INICIO: {
        inicializa(){
          globais.flappyBird =  criaFlappyBird();
          globais.chao = criaChao();
          globais.canos = criaCanos();
        },
        desenha() {
            planoDeFundo.desenha();
            globais.flappyBird.desenha();
            mensagemGetReady.desenha();
            
            globais.chao.desenha();
        },
        click() {
            mudaTela(Telas.JOGO);
        },
        atualiza() {
            globais.chao.atualiza();
            
        }
    }
};

Telas.JOGO = {
  inicializa(){
        globais.placar = criaPlacar();
  },
    desenha() {
        planoDeFundo.desenha();
        globais.canos.desenha();
        globais.chao.desenha();
        globais.flappyBird.desenha();
        globais.placar.desenha();
    },
    click() {
        globais.flappyBird.pula();
    },
    atualiza() {
        globais.canos.atualiza();
        globais.chao.atualiza();
        globais.flappyBird.atualiza();
        globais.placar.atualiza();
    }
};

Telas.GAME_OVER = {
  desenha(){
    mensagemGameOver.desenha();
  },
  atualiza(){

  },
  click(){
    mudaTela(Telas.INICIO);
  }
}

function loop() {
    
    telaAtiva.desenha();
    telaAtiva.atualiza();
    
    frames = frames + 1;
    requestAnimationFrame(loop);
}

window.addEventListener('click', function() {
    if(telaAtiva.click) {
        telaAtiva.click();
    }
});

mudaTela(Telas.INICIO);
loop(); 