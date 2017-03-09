'use strict';

const fs = require('fs');
const CONFIG = {};

function init () {
  const CONTENT = fs.readFileSync('/etc/hosts').toString();

  for (let data of CONTENT.match(/[\w\W]+?[\r\n]/g)) {
    let line = data.trim();
    if (line.startsWith('#')) continue;
    let [ip, cname, ,port, host] = line.split(/[\s]+/);
    if (ip == '127.0.0.1') {
      if (host)
        CONFIG[cname] = `${host}:${port}`;
      else
        CONFIG[cname] = port ? `${ip}:${port}` : ip;
    }
  }
  console.log(new Date, 'hosts flushed');
}

exports.get = (req) => {
  return CONFIG[req.headers.host];
};

exports.init = () => {
  init();

  fs.watchFile('/etc/hosts', (curr, prev) => {
    init();
  });
};
