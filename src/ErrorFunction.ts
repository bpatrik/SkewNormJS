import {Integrator} from './Integrator';

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
    const xSqr = x * x;
    while (true) {
      nFactorial *= n;

      const twoNplusOne = 2 * n + 1;

      const sign = n % 2 === 0 ? 1 : -1;
      pow *= xSqr;
      const nominator = sign * pow;
      const denominator = nFactorial * twoNplusOne;

      const result = nominator / denominator;

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
    const f = (t: number): number => {
      return Math.exp(-(t * t));
    };
    return ErrorFunction.twoPerSqrPi * Integrator.integrate(f, 0, x, 0.01);
  }

  public static erfc(x: number): number {
    return 1 - this.erf(x);
  }


}
