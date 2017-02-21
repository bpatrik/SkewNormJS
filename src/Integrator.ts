export class Integrator {
    public static integrate(f: (x: number) => number, start: number, end: number, step: number): number {
        let total = 0;
        if (start <= end) {
            step = Math.abs(step);
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