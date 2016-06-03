/* tslint:disable:no-shadowed-variable */
import test = require('blue-tape');
import nodeify from './index';

const command = function (command: string, callback?: (err, data) => void): Promise<any> {

  const promise = Promise.resolve().then(function () {
    return Promise.resolve('do some work and return result ' + command);
  }).then(function (data) {
    //console.log(data);
    return data;
  });

  return nodeify(promise, callback);
};

const commandWillFail = function (command: string, callback?: (err, data) => void): Promise<any> {

  const promise = Promise.resolve().then(function () {
    return Promise.reject('do some work and reject ' + command);
  }).then(function (data) {
    //console.log(data);
    return data;
  });

  return nodeify(promise, callback);
};

test('nodeify', t => {

  t.test('promise', t => {
    return command('with promise').then(function (data) {
      t.equal(data, 'do some work and return result with promise');
    });
  });

  t.test('callback', t => {
    command('with callback', function (err, data) {
      t.equal(data, 'do some work and return result with callback');
      t.end();
    });
  });
});

test('nodeify should fail', t => {

  t.test('promise', t => {
    return t.shouldFail( commandWillFail('with promise').then(function (data) {
      t.equal(data, 'do some work and return result with promise');
    }) );
  });

  t.test('callback', t => {
    commandWillFail('with callback', function (err, data) {
      t.equal(err, 'do some work and reject with callback');
      t.equal(null, data);
      t.end();
    });
  });
});

