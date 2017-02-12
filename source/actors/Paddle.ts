import Actor from "../core/Actor";

class Paddle extends Actor {
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
