# nodeify-ts


[![NPM](https://nodei.co/npm/nodeify-ts.png?downloads=true&downloadRank=true)](https://nodei.co/npm/nodeify-ts/)
[![NPM](https://nodei.co/npm-dl/nodeify-ts.png?months=6&height=3)](https://nodei.co/npm/nodeify-ts/)

[![NPM version][npm-image]][npm-url]
[![NPM downloads][downloads-image]][downloads-url]
[![Build status][travis-image]][travis-url]

Create functions that accept both node-style callbacks and return promises


## Installation

    npm install nodeify-ts
    
## Usage

### Javascript

```js
var nodeify = require('nodeify-ts');

var command = function (command, callback) {
    var promise = Promise.resolve().then(function () {
        return Promise.resolve('do some work and return result ' + command);
    }).then(function (data) {
        return data;
    });
    return nodeify(promise, callback);
};
```

### Typescript

```js
import nodeify from 'nodeify-ts';

const command = function (command: string, callback?: (err, data) => void): Promise<any> {

  const promise = Promise.resolve().then(function () {
    return Promise.resolve('do some work and return result ' + command);
  }).then(function (data) {
    return data;
  });

  return nodeify(promise, callback);
};
```
