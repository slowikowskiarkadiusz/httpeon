export class v2d {
    public x: number;
    public y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public static copy(from: v2d): v2d {
        return new v2d(from.x, from.y);
    }

    public static get zero(): v2d {
        return new v2d(0, 0);
    }

    public static get one(): v2d {
        return new v2d(1, 1);
    }

    public static get nOne(): v2d {
        return new v2d(-1, -1);
    }

    public static get up(): v2d {
        return new v2d(0, -1);
    }

    public static get down(): v2d {
        return new v2d(0, 1);
    }

    public static get left(): v2d {
        return new v2d(-1, 0);
    }

    public static get right(): v2d {
        return new v2d(1, 0);
    }

    public static get leftDown(): v2d {
        return new v2d(-1, 1);
    }

    public static get leftUp(): v2d {
        return new v2d(-1, -1);
    }

    public static get rightDown(): v2d {
        return new v2d(1, 1);
    }

    public static get rightUp(): v2d {
        return new v2d(1, -1);
    }

    public copy(): v2d {
        return new v2d(this.x, this.y);
    }

    public add(v: v2d): v2d {
        return new v2d(this.x + v.x, this.y + v.y);
    }

    public sub(v: v2d): v2d {
        return new v2d(this.x - v.x, this.y - v.y);
    }

    public mul(scalar: number): v2d {
        return new v2d(this.x * scalar, this.y * scalar);
    };

    public div(scalar: number): v2d {
        return new v2d(this.x / scalar, this.y / scalar);
    };

    public mag(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y)
    }

    public norm(): v2d {
        let vec = new v2d(this.x, this.y);
        return v2d.copy(vec.div(this.mag()));
    }

    public eq(other: v2d): boolean {
        let result = this.x == other.x && this.y == other.y;
        return result;
    }

    public updt(to: v2d): v2d {
        this.x = to.x;
        this.y = to.y;

        return this;
    }

    public static dot(v1: v2d, v2: v2d): number {
        let a = [v1.x, v1.y];
        let b = [v2.x, v2.y];
        let result = a.map((x, i) => a[i] * b[i]).reduce((m, n) => m + n);
        return result;
    }

    public static distance(v1: v2d, v2: v2d): number {
        let result = Math.sqrt(Math.pow(v1.x - v2.x, 2) + Math.pow(v1.y - v2.y, 2));
        return result;
    }
}
