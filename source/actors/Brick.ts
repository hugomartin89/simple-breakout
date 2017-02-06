class Brick extends ex.Actor {
    private texture: ex.Texture;

    public constructor(texture: ex.Texture, x: number = 0, y: number = 0) {
        super(x, y, texture.width, texture.height);

        this.texture = texture;
        this.collisionType = ex.CollisionType.Active;
    }

    public onInitialize(engine: ex.Engine): void {
        super.onInitialize(engine);

        this.addDrawing(this.texture);
    }
}

export default Brick;

