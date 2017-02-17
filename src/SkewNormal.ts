import {Normal} from "./Normal";
import {OvensTFunction} from "./OwensTFunction";
export class SkewNormal {

    constructor(public location: number = 0, public scale: number = 1.0, public shape: number = 0) {

    }

    public random(min: number = -Infinity, max: number = Infinity): number {
        return SkewNormal.random(this.shape, this.location, this.scale, min, max);
    }

    public static random(location: number = 0, scale: number = 1.0, shape: number = 0, min: number = -Infinity, max: number = Infinity): number {
        let sigma, u0, v, u1, ret;


        sigma = shape / Math.sqrt(1 + Math.pow(shape, 2));

        let generate = function () {
            u0 = Normal.random();
            v = Normal.random();
            u1 = (sigma * u0 + Math.sqrt(1 - Math.pow(sigma, 2)) * v);

            if (u0 >= 0) {
                return u1 * scale + location;
            }
            return (-u1) * scale + location;
        };

        do {
            ret = generate();
        } while (ret < min || ret > max);

        return ret;
    }

    public static cdf(location: number = 0, scale: number = 1.0, shape: number = 0, x: number): number {
        return Normal.cdf(location, scale, x) - 2 * OvensTFunction.T((x - location) / scale, shape);
    }
}