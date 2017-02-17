/**
 * Owen's T function
 * https://en.wikipedia.org/wiki/Owen%27s_T_function
 * "In mathematics, Owen's T function T(h, a), named after statistician Donald Bruce Owen, is defined by
 * {\displaystyle T(h,a)={\frac {1}{2\pi }}\int _{0}^{a}{\frac {e^{-{\frac {1}{2}}h^{2}(1+x^{2})}}{1+x^{2}}}dx\quad \left(-\infty <h,a<+\infty \right).} ..."
 */
export class OwensTFunction {

    private static onePer2Pi = 1 / (2 * Math.PI);


    public static T(h: number, a: number): number {
        let f = (x: number): number => {
            let nominator = Math.exp(-1 / 2 * h * h * (1 + x * x));
            let denominator = (1 + x * x);
            return nominator / denominator;
        };
        let step = a / 10000;
        return OwensTFunction.onePer2Pi * OwensTFunction.integrate(f, 0, a, step);
    }

    private static integrate(f: (x: number) => number, start: number, end: number, step: number): number {
        let total = 0;
        for (let x = start; x < end; x += step) {
            total += f(x + step / 2) * step;
        }
        return total;
    }
}