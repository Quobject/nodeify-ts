"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable:no-shadowed-variable */
const test = require("blue-tape");
const index_1 = require("./index");
const command = function (command, callback) {
    const promise = Promise.resolve().then(function () {
        return Promise.resolve('do some work and return result ' + command);
    }).then(function (data) {
        //console.log(data);
        return data;
    });
    return index_1.default(promise, callback);
};
const commandWillFail = function (command, callback) {
    const promise = Promise.resolve().then(function () {
        return Promise.reject('do some work and reject ' + command);
    }).then(function (data) {
        //console.log(data);
        return data;
    });
    return index_1.default(promise, callback);
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
        return commandWillFail('with promise').then(function (data) {
            console.log('data', data);
        }).catch((e) => {
            t.equal(e, 'do some work and reject with promise');
        });
    });
    t.test('callback', t => {
        commandWillFail('with callback', function (err, data) {
            t.equal(err, 'do some work and reject with callback');
            t.equal(null, data);
            t.end();
        });
    });
});
