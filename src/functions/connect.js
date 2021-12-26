const WebSocket = require("ws");
const http = require("http");
const express = require("express");
const msgpack = require("msgpack-lite");
const fetch = require("node-fetch");
const app = express();
var puppeteer = require("puppeteer");

function Connect(crash, listen, msgpack, url, name) {
  listen.send("```" + url + "```");
  let ws = new WebSocket(url, {
    headers: {
      origin: "http://moomoo.io"
    }
  });
  ws.onclose = e => {
    listen.send(`closed ${e.code}`);
  };
  ws.onopen = () => {
    listen.send("open");
    function send(e) {
      let n = msgpack.encode([e, Array.prototype.slice.call(arguments, 1)]);
      ws.readyState && ws.send(n);
    }
    name &&
      setInterval(() => {
        send("sp", {
          name: name,
          moofoll: 1,
          skin: 6
        });
      }, 500);
  };
}


module.exports = Connect;
