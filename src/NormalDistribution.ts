import {ErrorFunction} from "./ErrorFunction";

/**
 * NormalDistribution Distribution
 * https://en.wikipedia.org/wiki/Normal_distribution
 */
export class NormalDistribution {
    private static sqrtTwo = Math.sqrt(2);

    constructor(private mean: number = 0.0, private  stdev: number = 1.0) {
    }

    public static create(parameters: NormalDistribution.Parameters) {
        return new NormalDistribution(parameters.mean, parameters.stdev);
    }

    public random() {
        return NormalDistribution.random(this.mean, this.stdev);
    }

    public pdf(x: number) {
        return NormalDistribution.pdf(this.mean, this.stdev, x);
    }

    public cdf(x: number) {
        return NormalDistribution.cdf(this.mean, this.stdev, x);
    }
    public expectedValue() {
        return NormalDistribution.expectedValue(this.mean, this.stdev);
    }

    /**
     *  from randgen
     */
    public static random(mean: number = 0.0, stdev: number = 1.0): number {
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

    public static expectedValue(mean: number, stdev: number): number {
        return mean;
    }

    public static pdf(mean: number, stdev: number, x: number): number {
        let first = 1 / Math.sqrt(2 * stdev * stdev * Math.PI);
        let exp = Math.exp(-((x - mean) * (x - mean)) / (2 * stdev * stdev));
        return first * exp;
    }

    public static cdf(mean: number, stdev: number, x: number): number {
        return (1 / 2) * (1 + ErrorFunction.erf((x - mean) / (stdev * NormalDistribution.sqrtTwo)));
    }
}


export module NormalDistribution {
    export interface Parameters {
        mean: number,
        stdev: number
    }
}