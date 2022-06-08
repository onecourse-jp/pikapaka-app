// Copyright (c) 2020-2021 Dirk Holtwick. All rights reserved. https://holtwick.de/copyright

import SimplePeer from "simple-peer";
import Peer from "react-native-peerjs";

import {
  RTCPeerConnection,
  RTCIceCandidate,
  RTCSessionDescription,
  RTCView,
  MediaStream,
  MediaStreamTrack,
  mediaDevices,
  registerGlobals,
} from "react-native-webrtc";
const SimplePeerRN = new SimplePeer({
  initiator: true,
  wrtc: {
    RTCPeerConnection,
    RTCIceCandidate,
    RTCSessionDescription,
    RTCView,
    MediaStream,
    MediaStreamTrack,
    mediaDevices,
    registerGlobals,
  },
});
import {cloneObject} from "../lib/base";
import {Emitter, messages} from "../lib/emitter";
import {getFingerprintString, sha256Messages, splitByNChars} from "./fingerprint";
if (typeof process === "undefined") process = {};
process.nextTick = setImmediate;

// module.exports = process;
// import { encodeBase32 } from 'zeed';

let ctr = 1;

export class WebRTCPeer extends Emitter {
  static isSupported() {
    console.log("Peer.WEBRTC_SUPPORTPeer.WEBRTC_SUPPORT", Peer.WEBRTC_SUPPORT);
    return true;
  }

  constructor({remote, local, ...opt} = {}) {
    super();

    this.remote = remote;
    this.local = local;
    this.initiator = opt.initiator;
    this.room = opt.room || "";
    this.id = "webrtc-peer" + ctr++;
    this.fingerprint = "";
    this.name = "";

    this.setupPeer(opt);
  }

  // eslint-disable-next-line max-lines-per-function
  setupPeer(opt) {
    this.error = null;
    this.active = false;
    this.stream = null;

    let opts = cloneObject({
      ...opt,
      // Allow the peer to receive video, even if it's not sending stream:
      // https://github.com/feross/simple-peer/issues/95
      wrtc: {
        RTCPeerConnection,
        RTCIceCandidate,
        RTCSessionDescription,
        RTCView,
        MediaStream,
        MediaStreamTrack,
        mediaDevices,
        registerGlobals,
      },
      offerConstraints: {
        offerToReceiveAudio: true,
        offerToReceiveVideo: true,
      },
    });

    // https://github.com/feross/simple-peer/blob/master/README.md
    this.peer = new SimplePeer(opts);

    this.peer.on("close", (_) => this.close());

    // We receive a connection error
    this.peer.on("error", (err) => {
      this.error = err;
      this.emit("error", err);
      this.close();
      setTimeout(() => {
        this.setupPeer(opt); // ???
      }, 1000);
    });

    // This means, we received network details (signal) we need to provide
    // the remote peer, so he can set up a connection to us. Usually we will
    // send this over a separate channel like the web socket signaling server
    this.peer.on("signal", (data) => {
      this.emit("signal", data);
    });
    messages.on("closeCall", (_) => {
      this.close();
    });

    this.peer.on("signalingStateChange", async (_) => {
      const fpl = getFingerprintString(this.peer?._pc?.currentLocalDescription?.sdp) || "";
      const fpr = getFingerprintString(this.peer?._pc?.currentRemoteDescription?.sdp) || "";
      if (fpl && fpr) {
        const digest = await sha256Messages(this.room, fpl, fpr);
        // this.fingerprint = splitByNChars(encodeBase32(digest), 4);
      } else {
        this.fingerprint = "";
      }
    });

    // We received data from the peer
    this.peer.on("data", (data) => {
      this.emit("data", data);
      this.emit("message", {data}); // Channel compat
    });

    // Connection succeeded
    this.peer.on("connect", (event) => {
      console.log(" this.peer.on(connect");
      this.active = true;
      // p.send('whatever' + Math.random())
      this.emit("connect", event);
    });

    this.peer.on("stream", (stream) => {
      console.log("this.peer.onstream", stream);
      this.stream = stream;
      this.emit("stream", stream);
      messages?.emit("setRemoteStream", stream);
    });
  }

  setStream(stream) {
    if (!this.peer.streams.includes(stream)) {
      console.log("this.peer.streams.includes");
      try {
        this.peer.streams.forEach((s) => {
          console.log("this.peer.streams.forEach");
          try {
            console.log("this.peer.streams.removeStream");
            this.peer.removeStream(s);
          } catch (err) {}
        });
      } catch (err) {}
      if (stream) {
        console.log("streamstreamstreamstream");
        try {
          this.peer.addStream(stream);
        } catch (err) {}
      }
    }
  }

  // We got a signal from the remote peer and will use it now to establish the connection
  signal(data) {
    if (this.peer && !this.peer.destroyed) {
      // To prove that manipulated fingerprints will result in refusing connection
      // if (data?.sdp) {
      //   data.sdp = data.sdp.replace(/(fingerprint:.*?):(\w\w):/, '$1:00:')
      // }
      this.peer.signal(data);
    } else {
    }
  }

  postMessage(data) {
    // Channel compat
    this.peer.send(data);
  }

  close() {
    this.emit("close");
    this.active = false;
    this.peer?.destroy();
  }
}
