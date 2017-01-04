'use strict';

const fs = require('fs');
const HOST = {};
let CONTENT;

(function init () {
  CONTENT = fs.readFileSync('/etc/hosts').toString();

  for (let data of CONTENT.match(/[\w\W]+?[\r\n]/g)) {
    let line = data.trim();
    if (line.startsWith('#')) continue;
    let [ip, cname] = line.split(/[\s]+/);
    HOST[cname] = ip;
  }
})();

exports.list = () => {
  return HOST;
};

exports.add = (cname, ip) => {
  if (HOST[cname]) {
    if (HOST[cname] == ip) return;
  }
  // todo check ip, check cname
  fs.appendFileSync('/etc/hosts', `${ip}\t${cname}\r`);
};

