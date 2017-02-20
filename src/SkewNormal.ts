import {Normal} from "./Normal";
import {OwensTFunction} from "./OwensTFunction";
export class SkewNormal {

    constructor(public location: number = 0, public scale: number = 1.0, public shape: number = 0) {

    }

    public static create(parameters: SkewNormal.Parameters) {
        return new SkewNormal(parameters.location, parameters.scale, parameters.shape);
    }

    public random(min: number = -Infinity, max: number = Infinity): number {
        return SkewNormal.random(this.location, this.scale, this.shape, min, max);
    }

    public cdf(x: number) {
        return SkewNormal.cdf(this.location, this.scale, this.shape, x);
    }

    public invcdf(x: number) {
        return SkewNormal.invcdf(this.location, this.scale, this.shape, x);
    }

    public expectedValue(x: number) {
        return SkewNormal.expectedValue(this.location, this.scale, this.shape);
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

    /**
     * cumulative distribution function
     * @param location
     * @param scale
     * @param shape
     * @param x
     * @returns {number}
     */
    public static cdf(location: number = 0, scale: number = 1.0, shape: number = 0, x: number): number {
        return Normal.cdf(location, scale, x) - 2 * OwensTFunction.T((x - location) / scale, shape);
    }

    public static invcdf(location: number = 0, scale: number = 1.0, shape: number = 0, x: number): number {
        let f = (x: number) => {
            return SkewNormal.cdf(location, scale, shape, x);
        };
        return SkewNormal.invertFunction(f, -0.0, 10, 0.01, x);
    }

    public static expectedValue(location: number = 0, scale: number = 1.0, shape: number = 0) {
        let ro = shape / Math.sqrt(1 + shape * shape);
        return location + scale * ro * Math.sqrt(2 / Math.PI);
    }

    private static invertFunction(f: Function, start: number, end: number, step: number, y: number): number {
        let foundX = NaN;
        let distance = Math.abs(y - f(start));
        //TODO: implement binary search
        for (let x = start; x < end; x += step) {
            let ret = f(x);
            let dist = Math.abs(y - ret);
            if (distance > dist) {
                foundX = x;
                distance = dist;
            }

        }

        return foundX;
    }
}

export module SkewNormal {
    export interface Parameters {
        shape: number,
        location: number,
        scale: number
    }
}

