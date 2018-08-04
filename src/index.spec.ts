/* tslint:disable:no-shadowed-variable */
const test = require('blue-tape');
import nodeify from './index';

const command = function (command: string, callback?: (err: any, data: any) => void): Promise<any> {

  const promise = Promise.resolve().then(function () {
    return Promise.resolve('do some work and return result ' + command);
  }).then(function (data) {
    //console.log(data);
    return data;
  });

  return nodeify(promise, callback);
};

const commandWillFail = function (command: string, callback?: (err: any, data: any) => void): Promise<any> {

  const promise = Promise.resolve().then(function () {
    return Promise.reject('do some work and reject ' + command);
  }).then(function (data) {
    //console.log(data);
    return data;
  });

  return nodeify(promise, callback);
};

test('nodeify', (t: any) => {

  t.test('promise', (t: any) => {
    return command('with promise').then(function (data) {
      t.equal(data, 'do some work and return result with promise');
    });
  });

  t.test('callback', (t: any) => {
    command('with callback', function (err: any, data: any) {
      t.equal(data, 'do some work and return result with callback');
      t.end();
    });
  });
});

test('nodeify should fail', (t: any) => {

  t.test('promise', (t: any) => {
    return commandWillFail('with promise').then(function (data) {
      console.log('data', data);
    }).catch((e) => {
        t.equal(e, 'do some work and reject with promise');
    });
  });

  t.test('callback', (t: any) => {
    commandWillFail('with callback', function (err: any, data: any) {
      t.equal(err, 'do some work and reject with callback');
      t.equal(null, data);
      t.end();
    });
  });
});

