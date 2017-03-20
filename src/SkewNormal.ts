import {NormalDistribution} from "./NormalDistribution";
import {OwensTFunction} from "./OwensTFunction";
import {ErrorFunction} from "./ErrorFunction";
import {FunctionInverter} from "./FunctionInverter";


export class SkewNormal {

    private static sqrtTwoPi = Math.sqrt(2 * Math.PI);
    private static sqrtTwo = Math.sqrt(2);

    constructor(public location: number = 0, public scale: number = 1.0, public shape: number = 0) {

    }

    public static create(parameters: SkewNormal.Parameters) {
        return new SkewNormal(parameters.location, parameters.scale, parameters.shape);
    }

    public random(min: number = -Infinity, max: number = Infinity): number {
        return SkewNormal.random(this.location, this.scale, this.shape, min, max);
    }

    public pdf(x: number): number {
        return SkewNormal.pdf(this.location, this.scale, this.shape, x);
    }

    public cdf(x: number): number {
        return SkewNormal.cdf(this.location, this.scale, this.shape, x);
    }

    public invcdf(x: number): number {
        return SkewNormal.invcdf(this.location, this.scale, this.shape, x);
    }

    public expectedValue(): number {
        return SkewNormal.expectedValue(this.location, this.scale, this.shape);
    }


    public static random(location: number = 0, scale: number = 1.0, shape: number = 0, min: number = -Infinity, max: number = Infinity): number {
        let sigma, u0, v, u1, ret;


        sigma = shape / Math.sqrt(1 + Math.pow(shape, 2));

        let generate = function () {
            u0 = NormalDistribution.random();
            v = NormalDistribution.random();
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
     * https://en.wikipedia.org/wiki/Skew_normal_distribution
     * http://reference.wolfram.com/language/ref/SkewNormalDistribution.html
     * http://www.boost.org/doc/libs/1_50_0/libs/math/doc/sf_and_dist/html/math_toolkit/dist/dist_ref/dists/skew_normal_dist.html
     * then the PDF of the skew normal distribution with shape parameter α, defined by O'Hagan and Leonhard (1976) is
     * @param location
     * @param scale
     * @param shape
     * @param x
     */
    public static pdf(location: number = 0, scale: number = 1.0, shape: number = 0, x: number = 0): number {
        let exp = Math.exp(-((x - location) * (x - location)) / (2 * scale * scale));
        let err = ErrorFunction.erfc(-(shape * (x - location)) / (SkewNormal.sqrtTwo * scale));
        return (exp * err) / (SkewNormal.sqrtTwoPi * scale);
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
        return NormalDistribution.cdf(location, scale, x) - 2 * OwensTFunction.T((x - location) / scale, shape);
    }

    public static invcdf(location: number = 0, scale: number = 1.0, shape: number = 0, y: number): number {
        if (y < 0 || y > 1) {
            return NaN;
        }
        let f = (x: number) => {
            return SkewNormal.cdf(location, scale, shape, x);
        };
        return FunctionInverter.invertMonoton(f, -0.0, 10, y);
    }

    public static expectedValue(location: number = 0, scale: number = 1.0, shape: number = 0) {
        let ro = shape / Math.sqrt(1 + shape * shape);
        return location + scale * ro * Math.sqrt(2 / Math.PI);
    }

}

export module SkewNormal {
    export interface Parameters {
        shape: number,
        location: number,
        scale: number
    }
}

