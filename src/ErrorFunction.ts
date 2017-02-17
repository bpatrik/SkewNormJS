/**
 * Error function
 * http://mathworld.wolfram.com/Erf.html
 * https://en.wikipedia.org/wiki/Error_function
 */
export class ErrorFunction {


    private static twoPerSqrPi = 2 / Math.sqrt(Math.PI);
    private static epsilon = Math.pow(10, -30);

    /**
     * Erf defining as a Maclaurin series
     * has precision problem if abs(x) > 8
     * @param x
     */
    public static erf2(x: number): number {

        let sum = 0;

        sum += x;

        let n = 1;
        let nFactorial = 1;
        let pow = x;
        let xSqr = x * x;
        while (true) {
            nFactorial *= n;

            let twoNplusOne = 2 * n + 1;

            let sign = n % 2 == 0 ? 1 : -1;
            pow *= xSqr;
            let nominator = sign * pow;
            let denominator = nFactorial * twoNplusOne;

            let result = nominator / denominator;

            if (isNaN(result)) {
                console.log(n, result, sum);
                break;
            }
            sum += result;
            if (Math.abs(result) < ErrorFunction.epsilon || n > 500) {
                console.log(n, result);
                break;
            }


            n++;
        }

        return ErrorFunction.twoPerSqrPi * sum;
    }

    /**
     * with approximation integration
     * @param x
     */
    public static erf(x: number): number {


        let f = (t: number): number => {
            return Math.exp(-(t * t));
        };
        let step = x / 10000;
        return ErrorFunction.twoPerSqrPi * ErrorFunction.integrate(f, 0, x, 0.01);
    }

    private static integrate(f: (x: number) => number, start: number, end: number, step: number): number {
        let total = 0;
        step = Math.abs(step);
        if (start <= end) {
            for (let x = start; x < end; x += step) {
                total += f(x + step / 2) * step;
            }
        } else {
            step = -Math.abs(step);
            for (let x = start; x > end; x += step) {
                total += f(x - step / 2) * step;
            }
        }
        return total;
    }
}
