import {SkewNormal} from "../../src/SkewNormal";
import {ErrorFunction} from "../../src/ErrorFunction";
import {Normal} from "../../src/Normal";
declare let Plotly;

let resolution = 0.01;

let sncdf = () => {
    let x = [];
    let y = [];

    for (let i = -5.0; i < 5.0; i += resolution) {
        x.push(i);
        y.push(SkewNormal.cdf(0.5, 0.17, -0.54, i));
    }

    let data = [
        {
            x: x,
            y: y,
            type: 'scatter'
        }
    ];
    let layout = {
        xaxis: {
            type: 'number',
        },
        title: 'Skew normal cdf'
    };

    Plotly.newPlot('skew-normal-cdf', data, layout);
};
let sninvcdf = () => {
    let x = [];
    let y = [];

    for (let i = -5.0; i < 5.0; i += resolution) {
        x.push(i);
        y.push(SkewNormal.invcdf(0.5, 0.17, -0.54, i));
    }

    let data = [
        {
            x: x,
            y: y,
            type: 'scatter'
        }
    ];
    let layout = {
        xaxis: {
            type: 'number',
        },
        title: 'Inverted Skew normal cdf'
    };

    Plotly.newPlot('inv-skew-normal-cdf', data, layout);
};
let ncdf = () => {
    let x = [];
    let y = [];

    for (let i = -5.0; i < 5.0; i += resolution) {
        x.push(i);
        y.push(Normal.cdf(-2, Math.sqrt(0.5), i));
    }

    let data = [
        {
            x: x,
            y: y,
            type: 'scatter'
        }
    ];
    let layout = {
        xaxis: {
            type: 'number',
        },
        title: 'Normal cdf'
    };

    Plotly.newPlot('normal-cdf', data, layout);
};


let erf = () => {
    let x = [];
    let y = [];

    for (let i = -15.0; i < 15.0; i += resolution) {
        x.push(i);
        y.push(ErrorFunction.erf(i));
    }

    let data = [
        {
            x: x,
            y: y,
            type: 'scatter'
        }
    ];
    let layout = {
        xaxis: {
            type: 'number',
        },
        title: 'Error Function'
    };

    Plotly.newPlot('erf', data, layout);
};

ncdf();
erf();
sninvcdf();
sncdf();
