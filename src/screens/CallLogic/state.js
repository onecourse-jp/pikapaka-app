import {messages} from "./lib/emitter";
import io from "socket.io-client";
import {setupWebRTC} from "./logic/connection";
import {defaultAudioConstraints, defaultVideoConstraints, getDevices, getDisplayMedia, getUserMedia, setAudioTracks} from "./logic/stream";
import {
  PRODUCTION,
  ROOM_PATH,
  SHOW_FULLSCREEN,
  SHOW_INVITATION,
  SHOW_INVITATION_HINT,
  SHOW_SETTINGS,
  SHOW_SHARE,
  SHOW_CHAT,
} from "./config";
import {objectSnapshot, isTrue} from "./lib/base.js";

const screenshots = false;

// export const DEBUG = location.port.toString() === '8080' || !location.pathname.startsWith('/ng/')
// export const isPWA = process.env.VUE_APP_TARGET === 'pwa'

// ROOM

const isOriginalBriefing = ROOM_PATH === "/ng/";
// let params = new URL(document?.location).searchParams;
// let name = params.get('room');
let room = 1111;
// const pathname = location.pathname
// if (isOriginalBriefing) {
//   let m = /^\/ngs?\/(.*?)$/gi.exec(pathname)
//   room = m && m[1]
// } else {
//   console.log("pathname", pathname)
//   if (pathname.startsWith(ROOM_PATH)) {
//     room = pathname.substr(ROOM_PATH.length)
//   }
// }
// console.log("Room =", room)

// try {
//   if (
//     pathname === "/" ||
//     room === "" ||
//     room === null ||
//     (isOriginalBriefing && room === "/ng")
//   ) {
//     room = null
//     history.pushState(null, null, isOriginalBriefing ? "/ng" : "/")
//   } else {
//     let newRoom = normalizeName(room)
//     if (room !== newRoom) {
//       room = newRoom
//       history.pushState(null, null, ROOM_PATH + newRoom)
//     }
//   }
// } catch (err) {
//   trackSilentException(err)
// }

// Hack to avoid routing ;)
const embedDemo = room === "embed-demo";
if (embedDemo) room = null;


// STATE

// const urlParams = new URLSearchParams(window.location.search);

export let state = {
  // ID of this room
  room,

  // Video stream of the local user without sound
  stream: null,

  // WebRTC connection status, containing peer info
  status: {},

  bandwidth: false,
  fill: true,
  effectValue: 0,
  filterColor: [],

  muteVideo: false,
  muteAudio: false,
  muteSound: false,
  deviceVideo: null,
  deviceAudio: null,
  socket: null,
  devices: [],

  svg: {
    stroke: "1.5",
  },

  maximized: "",

  // For notifications
  vapidPublicKey: null,

  error: null,
  upgrade: false,
  requestBugTracking: false,
  embedDemo,

  showInviteOnStart: false,
  showInviteHint: false,
  showFullscreen: false,
  showSettings: false,
  showShare: false,
  showChat: false,

  screenshots,
};

messages.on("requestBugTracking", (_) => (state.requestBugTracking = true));
messages.on("upgrade", (_) => (state.upgrade = true));

messages.on("updateStream", updateStream);

function updateStream() {
  try {
    if (state.stream) {
      state.stream?.getVideoTracks().forEach((t) => (t.enabled = !state?.muteVideo));
      state.stream?.getAudioTracks().forEach((t) => (t.enabled = !state?.muteAudio));
      state.stream?.getAudioTracks().forEach((t) => (t.enabled = !state?.muteSound));
    }
  } catch (err) {}
}
export function startPlayStream() {
  // messages.emit("setLocalStream", state.stream);
}

messages.on("switchMedia", (facingMode) => {
  console.log("switchMediaswitchMediaswitchMedia", facingMode);
  if (facingMode) {
    if (facingMode === "user") {
      switchMedia("environment");
    } else {
      switchMedia("user");
    }
  } else {
    switchMedia("user");
  }
});

let blurLib;

// eslint-disable-next-line max-lines-per-function
async function switchMedia(facingMode = "user") {
  let audio = {
    ...defaultAudioConstraints,
  };

  if (state.deviceAudio) {
    audio.deviceId = state.deviceAudio;
  }

  let video = {
    ...defaultVideoConstraints,
    facingMode: facingMode,
  };

  if (state.deviceVideo) {
    video.deviceId = state.deviceVideo;
  }

  let constraints = {
    audio,
    video,
  };

  let stream, desktopStream, media;
  const showsDesktop = state.deviceVideo === "desktop";

  if (showsDesktop) {
    let {stream} = await getDisplayMedia();
    if (stream) {
      desktopStream = stream;
      delete constraints.video;
    }
  }

  media = await getUserMedia(constraints);
  state.error = media.error;
  stream = media.stream;

  if (stream) {
    let success = true;

    let audioTracks = stream.getAudioTracks();
    if (state.deviceAudio && audioTracks?.length <= 0) {
      state.deviceAudio = null;
      success = false;
    }

    if (desktopStream) {
      setAudioTracks(desktopStream, audioTracks);

      stream = desktopStream;
    }

    let videoTracks = stream.getVideoTracks();
    if (state.deviceVideo && videoTracks?.length <= 0) {
      state.deviceVideo = null;
      success = false;
    }

    // Reset to defaults
    if (!success) {
      await switchMedia();
    }

    setAudioTracks(stream, audioTracks);
  } else {
    console.error("Media error switch media:", media.error);
  }

  state.stream = stream;
  updateStream();
  messages.emit("setLocalStream", state.stream);
}

export async function setup(room) {
  console.log("Setup state");
  messages.emit("dsadsadsad");
  let rtc;
  try {
    rtc = await setupWebRTC(state, room);

    if (!rtc) {
      alert(
        "Your browser does not support the required WebRTC technologies.\n\nPlease reconnect using an up to date web browser.\n\nThanks for your understanding.",
      );
      location.assign("/ng/");
      return;
    }

    let {stream, error} = await getUserMedia();
    console.log("get user media", stream, error);
    state.error = error;
    if (stream) {
      // Safari getDevices only works immediately after getUserMedia (bug)
      // videoSrc = URL.createObjectURL(stream); // for older browsers
      state.devices = ((await getDevices()) || []).map((d) => {
        return {
          kind: d?.kind?.toLowerCase() || "?",
          deviceId: d?.deviceId,
          label: d.label || "Unknown name",
        };
      });
    } else {
      console.error("Media error", error);
    }

    state.stream = stream;
    updateStream();
    messages.emit("setLocalStream", state.stream)
    setTimeout(switchMedia, 250);
  } catch (err) {}

  return {
    cleanup() {
      rtc?.cleanup();
    },
  };
}

// Communicate to parent

let lastUpdateSnapshot = "";
let counter = 0;

export function postUpdateToIframeParent() {
  setTimeout(() => {
    try {
      let update = {
        room: state.room,
        error: state.error,
        peers: Array.from(state.status || []).map((info) => ({
          id: info.id,
          active: info.active,
          initiator: info.initiator,
          error: info.error,
          fingerprint: info.fingerprint,
        })),
        muteVideo: state.muteVideo,
        muteAudio: state.muteAudio,
        muteSound: state.muteSound,
        maximized: state.maximized,
      };
      let snapshot = objectSnapshot(update);
      // console.log("snapshot", snapshot)
      if (snapshot !== lastUpdateSnapshot) {
        lastUpdateSnapshot = snapshot;
        update.counter = counter++;
      }
    } catch (err) {
      console.error(err);
    }
  }, 0);
}
