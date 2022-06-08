// https://webrtchacks.com/limit-webrtc-bandwidth-sdp/
import {ICE_CONFIG} from "../config";
import {urlBase64ToUint8Array} from "../lib/base64";
import io from "socket.io-client";
import {messages} from "../lib/emitter";
import {setMediaBitrate} from "./sdp-manipulation.js";
import {removeBandwidthRestriction} from "./sdp-manipulation.js";
import {WebRTC} from "./webrtc";

// eslint-disable-next-line max-lines-per-function
export async function setupWebRTC(state, room) {
  if (!WebRTC.isSupported()) return null;
  console.log("state", state?.socket);
  let config = ICE_CONFIG;

  const webrtc = new WebRTC({
    room: room,
    peerSettings: {
      trickle: true,
      sdpTransform: (sdp) => {
        let newSDP = sdp;
        if (state.bandwidth) {
          //   newSDP = updateBandwidthRestriction(sdp, 10)
          newSDP = setMediaBitrate(newSDP, "video", 233);
          newSDP = setMediaBitrate(newSDP, "audio", 80);
        } else {
          newSDP = removeBandwidthRestriction(sdp);
        }
        return newSDP;
      },
      config,
    },
  });

  webrtc.on("status", (info) => {
    state.status = info.status;
    console.log("state.statusstate.status", info.status);
    if (info?.status?.length == 0) {
      messages?.emit("offRemoteStream");
    }
    if (info?.status?.length > 0) {
      messages?.emit("setRemoteStream");
    }
  });

  webrtc.on("connected", ({peer}) => {
    console.log("connectedconnected", peer, state?.status);
    if (state.stream) {
      console.log("state.stream", state.stream);
      peer.setStream(state.stream);
    }
    // messages?.emit('newStreamRemote', state?.status);

    state?.status?.map((item, index) => {
      console.log("item0", item);
      if (item.peer.stream) {
        messages?.emit("newStreamRemote", item);
      }
    });
    messages.emit("requestUserInfo");
  });

  // Getting Client's Info with Local Peer Info
  webrtc.on("userInfoWithPeer", ({peer, data}) => {
    webrtc.send("userInfoUpdate", {peer, data});
  });

  // Listening to Remote Client's Info with its Local Peer Info and
  // emitting to Local Client
  webrtc.on("userInfoUpdate", ({peer, data}) => {
    messages.emit("userInfoUpdate", {peer, data});
  });

  // Listening to new messages from Remote Client and emitting to Local client
  webrtc.on("chatMessage", (info) => {
    messages.emit("newMessage", info);
  });

  let onSetLocalStream = messages.on("setLocalStream", (stream) => {
    webrtc.forEachPeer((peer) => {
      peer.setStream(stream);
    });
  });

  let onNegotiateBandwidth = messages.on("negotiateBandwidth", (stream) => {
    webrtc.forEachPeer((peer) => {
      peer.peer.negotiate();
    });
  });

  // Send a new message to all peers
  messages.on("chatMessage", ({name, message, time}) => {
    webrtc.send("chatMessage", {name, message, time});
  });

  // Listen to local userInfo and emit to webrtc for getting peer info
  messages.on("userInfo", (data) => {
    webrtc.emit("userInfo", {data});
  });

  let onSubscribePush = messages.on("subscribePush", async (on) => {
    let add = state.subscription;
    let registration = await navigator.serviceWorker.getRegistration();
    let subscription = await registration.pushManager.getSubscription();
    const vapidPublicKey = state.vapidPublicKey;
    if (!subscription && vapidPublicKey) {
      const applicationServerKey = urlBase64ToUint8Array(vapidPublicKey);
      subscription = registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey,
      });
    }
    webrtc.io.emit("registerPush", {
      add,
      room: room,
      subscription,
    });
  });

  async function getStats(peer) {
    let bytes = 0;
    let timestamp = 0;
    return new Promise((resolve) => {
      peer?.peer?.getStats((_, reports) => {
        reports.forEach((report) => {
          if (report.type === "outbound-rtp") {
            if (report.isRemote) return;
            bytes += report.bytesSent;
            timestamp = report.timestamp;
            resolve({bytes, timestamp});
          }
        });
      });
    });
  }

  // // https://github.com/webrtc/samples/blob/gh-pages/src/content/peerconnection/bandwidth/js/main.js#L253
  // let prevTimestamp = 0
  // let prevBytes = 0

  // if (!!localStorage?.debug) {
  //   let el = document.createElement("div")
  //   el.className = "bandwidth"
  //   document.body.appendChild(el)

  //   setInterval(async () => {
  //     // const now = performance.now()
  //     let results = await Promise.all(
  //       Object.values(webrtc.peerConnections).map((p) => getStats(p))
  //     )
  //     let bytes = results.reduce((acc, curr) => curr.bytes + acc, 0)
  //     let timestamp = results?.[0]?.timestamp
  //     const bitrate = (8 * (bytes - prevBytes)) / (timestamp - prevTimestamp)
  //     el.textContent = bitrate.toFixed(2) + " Bit/s"
  //     prevBytes = bytes
  //     prevTimestamp = timestamp
  //   }, 1000)
  // }

  return {
    webrtc,
    cleanup() {
      webrtc.cleanup();
      onSetLocalStream.cleanup();
      onNegotiateBandwidth.cleanup();
      onSubscribePush.cleanup();
    },
  };
}
