class Ball extends ex.Actor {
    private texture: ex.Texture;

    public constructor(texture: ex.Texture, x: number = 0, y: number = 0) {
        super(x, y, texture.width, texture.height);

        this.texture = texture;
        this.collisionType = ex.CollisionType.Elastic;
    }

    public onInitialize(engine: ex.Engine): void {
        super.onInitialize(engine);

        this.addDrawing(this.texture);
    }

    public update(engine: ex.Engine, delta: number): void {
        super.update(engine, delta);

        // la pelota debe rebotar en los laterales
        // del "viewport"
        if (this.getLeft() < 0) {
            this.x = this.getWidth() / 2;
            this.vel.x *= -1;
        }
        else if (this.getRight() >= engine.getWidth()) {
            this.x = engine.getWidth() - this.getWidth() / 2;
            this.vel.x *= -1;
        }

        // también debe rebotar en la parte superior
        // del "viewport"
        if (this.getTop() < 0) {
            this.y = this.getHeight() / 2;
            this.vel.y *= -1;
        }
    }
}

export default Ball;
