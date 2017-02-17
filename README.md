# SkewNormJS
The project contains some useful functions to generate samples from skew normal distribution.
It also generates cfd and inverse cdf of skew normal.

### Install:
`npm install skewnormjs`

### Usage:
 * See example at `/test`
 * OR:
```typescript
import {SkewNormal} from "skewnormjs";
SkewNormal.cdf(0.5, 0.17, -0.54, x);
```