/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */

import {renderLinechart} from './linechart';

describe('renderLineChart', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="container"></div>';
  });

  it('renders a line chart', async () => {
    const data = {
      values: [
        {x: 0, y: 50},
        {x: 1, y: 100},
        {x: 2, y: 230},
      ]
    };

    const container = document.getElementById('container') as HTMLElement;
    await renderLinechart(data, container);

    expect(document.querySelectorAll('.vega-embed').length).toBe(1);
  });

  it('renders a line chart with multiple series', async () => {
    const data = {
      values: [
        [
          {x: 0, y: 50},
          {x: 1, y: 100},
          {x: 2, y: 230},
        ],
        [
          {x: 0, y: 20},
          {x: 1, y: 300},
          {x: 2, y: 630},
        ],
      ]
    };

    const container = document.getElementById('container') as HTMLElement;

    await renderLinechart(data, container);
    expect(document.querySelectorAll('.vega-embed').length).toBe(1);
  });

  it('renders a line chart with multiple series custom names', async () => {
    const data = {
      values: [
        [
          {x: 0, y: 50},
          {x: 1, y: 100},
          {x: 2, y: 230},
        ],
        [
          {x: 0, y: 20},
          {x: 1, y: 300},
          {x: 2, y: 630},
        ],
      ],
      series: ['First', 'Second'],
    };

    const container = document.getElementById('container') as HTMLElement;

    await renderLinechart(data, container);
    expect(document.querySelectorAll('.vega-embed').length).toBe(1);
  });

  it('updates a line chart', async () => {
    let data = {
      values: [
        [
          {x: 0, y: 50},
          {x: 1, y: 100},
          {x: 2, y: 230},
        ],
        [
          {x: 0, y: 20},
          {x: 1, y: 300},
          {x: 2, y: 630},
        ],
      ],
      series: ['First', 'Second'],
    };

    const container = document.getElementById('container') as HTMLElement;

    await renderLinechart(data, container);
    expect(document.querySelectorAll('.vega-embed').length).toBe(1);

    data = {
      values: [
        [
          {x: 0, y: 50},
          {x: 1, y: 100},
          {x: 2, y: 230},
        ],
        [
          {x: 0, y: 20},
          {x: 1, y: 300},
          {x: 2, y: 630},
          {x: 3, y: 530},
          {x: 4, y: 230},
        ],
      ],
      series: ['First', 'Second'],
    };

    await renderLinechart(data, container);
    expect(document.querySelectorAll('.vega-embed').length).toBe(1);
  });

  it('sets width of chart', async () => {
    const data = {
      values: [
        {x: 0, y: 50},
        {x: 1, y: 100},
        {x: 2, y: 230},
      ]
    };

    const container = document.getElementById('container') as HTMLElement;
    await renderLinechart(data, container, {width: 400});

    expect(document.querySelectorAll('.vega-embed').length).toBe(1);
    expect(document.querySelectorAll('canvas').length).toBe(1);
    expect(document.querySelector('canvas')!.style.width).toBe('400px');
  });

  it('sets height of chart', async () => {
    const data = {
      values: [
        {x: 0, y: 50},
        {x: 1, y: 100},
        {x: 2, y: 230},
      ]
    };

    const container = document.getElementById('container') as HTMLElement;
    await renderLinechart(data, container, {height: 200});

    expect(document.querySelectorAll('.vega-embed').length).toBe(1);
    expect(document.querySelectorAll('canvas').length).toBe(1);
    expect(document.querySelector('canvas')!.style.height).toBe('200px');
  });
});
