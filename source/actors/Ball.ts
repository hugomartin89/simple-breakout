import Actor from "../core/Actor";

class Ball extends Actor {
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
