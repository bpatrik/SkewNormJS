import {SkewNormal} from '../../src/SkewNormal';
import {ErrorFunction} from '../../src/ErrorFunction';
import {NormalDistribution} from '../../src/NormalDistribution';

declare let Plotly: any;

const resolution = 0.01;
const skenormParam = {shape: -33, location: 0.99, scale: 0.19};
const normParam: NormalDistribution.Parameters = {mean: -2, stdev: 0.5};


const sn_pdf = () => {
  const x = [];
  const y = [];

  const skewNorm = SkewNormal.create(skenormParam);
  for (let i = -5.0; i < 5.0; i += resolution) {
    x.push(i);
    y.push(skewNorm.pdf(i));
  }

  const data = [
    {
      x: x,
      y: y,
      type: 'scatter'
    }
  ];
  const layout = {
    xaxis: {
      type: 'number',
    },
    title: 'Skew normal pdf: ' + JSON.stringify(skenormParam) + ' exp value:' + skewNorm.expectedValue()
  };

  Plotly.newPlot('skew-normal-pdf', data, layout);
};
const sn_random = () => {
  const x = [];
  const y = [];

  const skewNorm = SkewNormal.create(skenormParam);
  for (let i = -5.0; i < 5.0; i += resolution) {
    x.push(i);
    y.push(0);
  }
  for (let i = 0; i < 100000; i++) {
    const rnd = skewNorm.random();
    y[Math.round((rnd) / resolution + 5 / resolution)]++;
  }

  const data = [
    {
      x: x,
      y: y,
      type: 'bar'
    }
  ];
  const layout = {
    xaxis: {
      type: 'number',
    },
    title: 'Skew normal random: ' + JSON.stringify(skenormParam) + ' exp value:' + skewNorm.expectedValue()
  };

  Plotly.newPlot('skew-normal-random', data, layout);
};
const sn_cdf = () => {
  const x = [];
  const y = [];

  const skewNorm = SkewNormal.create(skenormParam);
  for (let i = -5.0; i < 5.0; i += resolution) {
    x.push(i);
    y.push(skewNorm.cdf(i));
  }

  const data = [
    {
      x: x,
      y: y,
      type: 'scatter'
    }
  ];
  const layout = {
    xaxis: {
      type: 'number',
    },
    title: 'Skew normal cdf: ' + JSON.stringify(skenormParam) + ' exp value:' + skewNorm.expectedValue()
  };

  Plotly.newPlot('skew-normal-cdf', data, layout);
};
const sn_inv_cdf = () => {
  const x = [];
  const y = [];

  const skewNorm = SkewNormal.create(skenormParam);
  for (let i = -0.5; i < 1.5; i += resolution / 50) {
    x.push(i);
    y.push(skewNorm.invcdf(i));
  }

  const data = [
    {
      x: x,
      y: y,
      type: 'scatter'
    }
  ];
  const layout = {
    xaxis: {
      type: 'number',
    },
    title: 'Inverted Skew normal cdf'
  };

  Plotly.newPlot('inv-skew-normal-cdf', data, layout);
};
const n_pdf = () => {
  const x = [];
  const y = [];

  const norm = NormalDistribution.create(normParam);
  for (let i = -5.0; i < 5.0; i += resolution) {
    x.push(i);
    y.push(norm.pdf(i));
  }

  const data = [
    {
      x: x,
      y: y,
      type: 'scatter'
    }
  ];
  const layout = {
    xaxis: {
      type: 'number',
    },
    title: 'NormalDistribution pdf' + JSON.stringify(skenormParam) + ' exp value:' + norm.expectedValue()
  };

  Plotly.newPlot('normal-pdf', data, layout);
};
const n_cdf = () => {
  const x = [];
  const y = [];

  const norm = NormalDistribution.create(normParam);
  for (let i = -5.0; i < 5.0; i += resolution) {
    x.push(i);
    y.push(norm.cdf(i));
  }

  const data = [
    {
      x: x,
      y: y,
      type: 'scatter'
    }
  ];
  const layout = {
    xaxis: {
      type: 'number',
    },
    title: 'NormalDistribution cdf ' + JSON.stringify(skenormParam) + ' exp value:' + norm.expectedValue()
  };

  Plotly.newPlot('normal-cdf', data, layout);
};


const erf = () => {
  const x = [];
  const y = [];

  for (let i = -15.0; i < 15.0; i += resolution) {
    x.push(i);
    y.push(ErrorFunction.erf(i));
  }

  const data = [
    {
      x: x,
      y: y,
      type: 'scatter'
    }
  ];
  const layout = {
    xaxis: {
      type: 'number',
    },
    title: 'Error Function'
  };

  Plotly.newPlot('erf', data, layout);
};

erf();
n_pdf();
n_cdf();
sn_random();
sn_cdf();
sn_pdf();
sn_inv_cdf();
