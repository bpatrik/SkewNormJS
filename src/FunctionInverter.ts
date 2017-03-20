export class FunctionInverter {
    public static invertMonoton(f: Function, start: number, end: number, y: number) {

        let epsilon = Math.pow(10, -10);
        let position = (end + start) / 2;
        let distance = end - position;
        let value = f(position);
        let i = 0;
        let lastDirUp = null;
        let lastValue = NaN;

        let isIncreasing = f(start) < f(end);

        while (Math.abs(value - y) > epsilon) {
            let isDirChanged = (value < y && lastDirUp == !isIncreasing) ||
                (value > y && lastDirUp == isIncreasing);

            let canDecrease = Math.abs(distance) > 0.0001;

            if (isDirChanged || canDecrease) {
                distance /= 2;
            }

            if ((value < y && isIncreasing) || (value > y && !isIncreasing)) {
                lastDirUp = true;
                position += distance;
            } else {
                lastDirUp = false;
                position -= distance;
            }

            value = f(position);

            if (lastValue == value) {
                return position;
            }

            lastValue = value;
            i++;
            if (i > 1000) {
                return NaN;
            }

        }
        return position;
    }
}