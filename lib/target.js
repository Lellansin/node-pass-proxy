'use strict';

const config = {
  'michelin.alpha.elenet.me': 'localhost:8100',
  'michelin-test.faas.elenet.me': 'localhost:8080'
};

exports.get = (req) => {
  return config[req.headers.host];
};

exports.update = () => {

};

exports.flush = () => {

};
