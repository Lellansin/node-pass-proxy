# node-pass-proxy

Simple pass proxy tool instead of weight nginx startup.

```
npm install   # install modules
npm start     # start the proxy server
```

## Quickly Start

Update `/etc/hosts` by `sudo vim /etc/hosts`:

```
127.0.0.1 api.myHost.me       # 3029
```

Then you can access `127.0.0.1:3029` by `http://api.myHost.me` in your broswer.

```
127.0.0.1 admin-api.myHost.me # 8100 10.104.109.234
```

Then you can access `10.104.109.234:8100` by `http://admin-api.myHost.me` in your broswer.
