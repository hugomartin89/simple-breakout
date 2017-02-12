abstract class Actor extends ex.Actor {
    private texture: ex.Texture;

    public constructor(texture: ex.Texture, x: number = 0, y: number = 0, collisionType: ex.CollisionType = ex.CollisionType.PreventCollision) {
        super(x, y, texture.width, texture.height);

        this.texture = texture;
        this.collisionType = collisionType;
    }

    public onInitialize(engine: ex.Engine): void {
        super.onInitialize(engine);

        this.addDrawing(this.texture);
    }
}

export default Actor;
