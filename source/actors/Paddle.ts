class Paddle extends ex.Actor {
    private texture: ex.Texture;

    public constructor(texture: ex.Texture, x: number = 0, y: number = 0) {
        super(x, y, texture.width, texture.height);

        this.texture = texture;
        this.collisionType = ex.CollisionType.Fixed;
    }

    public onInitialize(engine: ex.Engine): void {
        super.onInitialize(engine);

        this.addDrawing(this.texture);
    }

    public update(engine: ex.Engine, delta: number): void {
        super.update(engine, delta);

        // aseguro que la raqueta no se salga
        // del "viewport"
        if (this.getLeft() < 0) {
            this.x = this.getWidth() / 2;
        }
        else if (this.getRight() >= engine.getWidth()) {
            this.x = engine.getWidth() - this.getWidth() / 2;
        }
    }
}

export default Paddle;
