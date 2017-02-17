import {ErrorFunction} from "./ErrorFunction";

/**
 * Normal Distribution
 * https://en.wikipedia.org/wiki/Normal_distribution
 */
export class Normal {
    private static sqrtPi = Math.sqrt(Math.PI);
    /**
     *  from randgen
     */
    public static random(mean: number = 0.0, stdev: number = 1.0) {
        let u1, u2, v1, v2, s;

        do {
            u1 = Math.random();
            u2 = Math.random();

            v1 = 2 * u1 - 1;
            v2 = 2 * u2 - 1;
            s = v1 * v1 + v2 * v2;
        } while (s === 0 || s >= 1);

        return stdev * v1 * Math.sqrt(-2 * Math.log(s) / s) + mean;

    }

    public static cdf(mean: number, stdev: number, x: number): number {
        return (1 / 2) * (1 + ErrorFunction.erf(x - mean / (stdev * Normal.sqrtPi)));
    }
}