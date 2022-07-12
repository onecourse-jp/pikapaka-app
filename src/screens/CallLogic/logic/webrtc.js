// Copyright (c) 2020-2021 Dirk Holtwick. All rights reserved. https://holtwick.de/copyright

import io from "socket.io-client";
import {SIGNAL_SERVER_URL} from "../config";
import {Emitter, messages} from "../lib/emitter";
import {state} from "../state";
import {WebRTCPeer} from "./webrtc-peer";
import socket from "socket.io-client";

// See https://github.com/holtwick/briefing-signal
// import { uuid } from 'zeed';

// Handles multiple connections, one to each peer
export class WebRTC extends Emitter {
  peerConnections = {};
  peerSettings = {};

  static isSupported() {
    return WebRTCPeer.isSupported();
  }

  static async checkStatus() {
    let socket = io(SIGNAL_SERVER_URL, {
      // transports: ['websocket'],
    });

    return new Promise((resolve) => {
      let id = 1999;
      let result = socket.emit("status", {ping: id}, (result) => {
        result.ok = result.pong === id;
        resolve(result);
      });
    });
  }

  // eslint-disable-next-line max-lines-per-function
  constructor({
    wrtc, // wrtc is used for unit testing via node.js
    room = null,
    peerSettings = {},
  } = {}) {
    super();
    console.log('SIGNAL_SERVER_URL',SIGNAL_SERVER_URL)

    this.room = room;
    console.log("this.room", this.room);
    this.peerSettings = peerSettings;

    // https://socket.io/docs/client-api/
    this.io = io(SIGNAL_SERVER_URL, {
      transports: ["websocket"],
    });

    this.io.on("connect", () => {
      console.log("this.io.on connect");
      state.socket = socket;
      this.emit("io", {
        online: true,
      });
      this.emit("connect");
      this.io.emit("join", {room});
      messages.on("closeCall", (_) => {
        console.log("hahahahah");
        this.emit("disconnect");
        this.io.disconnect();
        // this.io.disconnect()
      });
    });

    this.io.on("disconnect", () => {
      console.log("disconnectdisconnect");
      this.emit("io", {
        online: false,
      });
      this.emit("disconnect");
    });
    this.io.on("adminUploadNewPicture", () => {
      console.log("adminUploadNewPictureadminUploadNewPicture");
    });
    this.io.on("connect_error", (err) => {
      // alert('connect_error');

      console.log("connect error", err);

      setTimeout(() => {
        this.io.connect();
      }, 1000);
    });
    this.io.on("remove", ({id}) => {
      console.log("removeremoveremoveremoveremove");
      let peer = this.peerConnections[id];
      if (peer) {
        peer.close();
        delete this.peerConnections[id];
        this.updateStatus();
        this.emit("disconnected", {peer});
      }
    });

    // Receive all other currently available peers
    this.io.on("joined", ({peers, vapidPublicKey}) => {
      const local = this.io.id;
      console.log("joined local", peers);

      state.vapidPublicKey = vapidPublicKey;

      // We will try to establish a separate connection to all of them
      // If the new participant (us) initiates the connections, the others do
      // not need to get updates about new peers
      this.io.on("signal", ({from, signal}) => {
        console.log("signal", from);
        // log('received signal', from, to === local, initiator)
        // If we are not already connected, do it now
        let peer = this.peerConnections[from];
        if (!peer) {
          peer = this.handlePeer({
            remote: from,
            local,
            initiator: false,
            wrtc,
          });
        }
        peer.signal(signal);
        this.updateStatus();
      });

      for (let i = 0; i < peers.length; i++) {
        const remote = peers[i];
        this.handlePeer({
          remote,
          local,
          initiator: true,
          wrtc,
        });
      }

      this.updateStatus();
    });
  }

  forEachPeer(fn) {
    Object.values(this.peerConnections).forEach(fn);
  }

  updateStatus() {
    let status = Object.values(this.peerConnections).map((peer) => {
      let {active, initiator, local, remote, error} = peer;
      return {
        active,
        initiator,
        local,
        remote,
        error,
        peer,
      };
    });
    console.log("updateStatusupdateStatusupdateStatus ", status);
    this.emit("status", {status});
  }

  getPeer(id) {
    return this.peerConnections[id] || null;
  }

  handlePeer({remote, wrtc, local, initiator = false} = {}) {
    console.log("handlePeer remote");
    let peer = new WebRTCPeer({
      local,
      remote,
      initiator,
      wrtc,
      room: this.room,
      ...this.peerSettings,
    });
    console.log("handlePeer", peer);
    this.peerConnections[remote] = peer;

    // We received the local signal (i.e. network location description) that
    // we will now send via web socket signaling server to the remote peer
    peer.on("signal", (signal) => {
      // log('received peer signal', remote)
      this.io.emit("signal", {
        from: local,
        to: remote,
        signal,
        initiator,
      });
    });

    // The full connection is established, from now on we can exchange data
    peer.on("connect", () => {
      this.emit("connected", {peer});
      this.updateStatus();
    });

    // A message from the remote peer
    peer.on("data", (data) => {
      // depr
      let {type, ...msg} = JSON.parse(data);
      this.emit(type, msg);
    });

    peer.on("message", (data) => {
      this.emit("message", data); // Channel compat
    });

    peer.on("stream", (_) => this.updateStatus());
    peer.on("track", (_) => this.updateStatus());

    // Listening to userInfo and emitting back with local peer info
    this.on("userInfo", (data) => {
      this.emit("userInfoWithPeer", {peer, data});
    });

    return peer;
  }

  postMessage(data) {
    // Channel compat
    this.forEachPeer((peer) => {
      peer.postMessage(data);
    });
  }

  send(type, msg = {}) {
    // depr
    this.postMessage(JSON.stringify({...msg, type}));
  }

  close() {
    this.forEachPeer((peer) => peer.close());
    this.peerConnections = {};
    this.io.close();
  }

  async cleanup() {
    // await super.cleanup()
    this.close();
  }
}
