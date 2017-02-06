import Ball from "./actors/Ball";
import Brick from "./actors/Brick";
import Paddle from "./actors/Paddle";

const WIDTH: number = 800;
const HEIGHT: number = 600;

let engine: ex.Engine;
let loader: ex.Loader;

let music: ex.Sound;
let pop: ex.Sound;
let lose: ex.Sound;

let ball: Ball;
let ballTexture: ex.Texture;

let bricksTextures: Array<ex.Texture>;
let bricks: Array<Brick>;

let paddle: Paddle;
let paddleTexture: ex.Texture;

function loadResources(): void {
    loader = new ex.Loader();

    music = new ex.Sound("music/ingame.ogg");
    pop = new ex.Sound("sounds/pop.ogg");
    lose = new ex.Sound("sounds/lose.ogg")

    ballTexture = new ex.Texture("images/balls/grey.png");

    bricksTextures = new Array<ex.Texture>();
        bricksTextures.push(new ex.Texture("images/bricks/blue.png"));
        bricksTextures.push(new ex.Texture("images/bricks/green.png"));
        bricksTextures.push(new ex.Texture("images/bricks/grey.png"));
        bricksTextures.push(new ex.Texture("images/bricks/purple.png"));
        bricksTextures.push(new ex.Texture("images/bricks/red.png"));

    paddleTexture = new ex.Texture("images/paddles/red.png");

    loader.addResource(music);
    loader.addResource(pop);
    loader.addResource(lose);
    loader.addResource(ballTexture);
    loader.addResources(bricksTextures);
    loader.addResource(paddleTexture);
}

function generateBoard(): void {
    const padding: number = 15; // separación entre ladrillos
    const xoffset: number = 75; // x-offset
    const yoffset: number = 40; // y-offset
    const columns: number = 16;
    const rows: number = 5;

    let brick: Brick;
    let texture: ex.Texture;
    let posx: number;
    let posy: number;

    for (var j = 0; j < rows; j++) {
        for (var i = 0; i < columns; i++) {
            texture = bricksTextures[j % bricksTextures.length];
            posx = xoffset + i * (texture.width + padding) + padding;
            posy = yoffset + j * (texture.height + padding) + padding;

            brick = new Brick(texture, posx, posy);
            brick.on("collision", function(event: ex.CollisionEvent): void {
                event.actor.kill();

                pop.play();

                // realiza un efecto de sacudida de la cámara
                engine.currentScene.camera.shake(10, 5, 250);
            });

            bricks.push(brick);
        }
    }
}

function configureEvents(): void {
    engine.input.pointers.primary.on("move", function (event: ex.Input.PointerEvent): void {
        // actualizo la posición de la pelota y
        // la raqueta al mover el mouse

        if (ball.vel.x === 0 && ball.vel.y === 0) {
            ball.x = event.x;
        }

        paddle.x = event.x;
    });

    engine.input.keyboard.on("press", function (event: ex.Input.KeyEvent): void {
        // intercambia entre modo de depuración
        if (event.key === ex.Input.Keys.D) {
            engine.isDebug = !engine.isDebug;
        }

        // dispara la pelota
        if (event.key === ex.Input.Keys.Space) {
            if (ball.vel.x === 0 || ball.vel.y === 0) {
                ball.vel.setTo(250, -250);
            }
        }
    });

    // reinicializo la pelota cuando se sale
    // del "viewport"
    ball.on("exitviewport", (event: ex.GameEvent): void => {
        paddle.pos.setTo(engine.getWidth() / 2, engine.getHeight() - 60);
        ball.pos.setTo(engine.getWidth() / 2, engine.getHeight() - 84);
        ball.vel.setTo(0, 0);
        lose.play();
    });
}

function initialize(): void {
    ball = new Ball(ballTexture, engine.getWidth() / 2, engine.getHeight() - 84);
    bricks = new Array<Brick>();
    paddle = new Paddle(paddleTexture, engine.getWidth() / 2, engine.getHeight() - 60);

    generateBoard();
}

function main(): void {
    engine = new ex.Engine();

    loadResources();

    engine.start(loader).then(function() {
        initialize();
        configureEvents();

        bricks.forEach((brick: Brick): void => {
            engine.add(brick);
        });

        engine.add(ball);
        engine.add(paddle);

        music.setLoop(true);
        music.play();
    });
};

window.onload = main;
