import React, {useEffect, useState, useRef} from "react";
import {
  View,
  Text,
  PermissionsAndroid,
  Image,
  Animated,
  Alert,
  Platform,
  BackHandler,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import {WebRTCPeer} from "./webrtc-peer";
import InCallManager from "react-native-incall-manager";
import styles from "./styles";
// import RNCallKeep from 'react-native-callkeep';
import LinearGradient from "react-native-linear-gradient";
import {SafeAreaView} from "react-native-safe-area-context";
import io from "socket.io-client";
import bus from "@utils/eventBus";
import ModalPortal from "react-native-modal";
import Space from "@components/Space";
import RoundButton from "@components/RoundButton";
// import RingAnimated from '@components/RingAnimated';

import {
  RTCPeerConnection,
  RTCIceCandidate,
  RTCSessionDescription,
  RTCView,
  MediaStream,
  MediaStreamTrack,
  mediaDevices,
  registerGlobals,
  MediaStreamConstraints,
} from "react-native-webrtc";
import Peer from "react-native-peerjs";
import Config from "react-native-config";
import {request, PERMISSIONS} from "react-native-permissions";
let pcPeers = {};
let myStream = {};
let fall = new Animated.Value(0);
const STUN_SERVER = "stun:webrtc.skyrockets.space:3478";
// const STUN_SERVER = 'turn:turn01.brie.fi:5349';
const CONNECTION_STATE = {
  INIT: "INIT",
  WAITING: "WAITING",
  CONNECT: "CONNECT",
  MISSING: "MISSING",
  ERROR: "ERROR",
  REJECT: "REJECT",
  END: "END",
};
const {width} = Dimensions.get("window");

export default function ScreenCall({navigation, route}) {
  // console.log('remoteMessage', route.params);

  // const { remoteMessage } = route.params;
  const remoteMessage = route.params?.remoteMessage;
  // console.log('remoteMessage', remoteMessage);
  const [statusConnection, setStatusConnect] = useState(CONNECTION_STATE.INIT);
  const [textShowStatus, setTextShowStatus] = useState("");
  const [callData, setCallData] = useState();
  const [localStream, setLocalStream] = useState();
  const [remoteStream, setRemoteStream] = useState();
  const [isPopup, setIsPopup] = useState(false);
  const [peerServer, setPeerServer] = useState();
  const [isMuted, setIsMuted] = useState(false);
  const [speakerphone, setSpeakerphone] = useState(false);
  const [activeCall, setActiveCall] = useState();
  const [users, setUsers] = useState([]);
  const [peerId, setPeerId] = useState();
  const [peerConnections, setPeerConnections] = useState({});
  const connectedUser = useRef(null);
  const offerRef = useRef(null);
  var socket;
  const [timeOfCall, setTimeOfCall] = useState(0);
  const [callTime, setCallTime] = useState(0);
  const [waitTime, setWaitTime] = useState(0);
  const room = 1111;
  const refConnectionVideo = useRef();
  const refInterval = useRef();
  React.useLayoutEffect(() => {
    navigation.setOptions({headerTitle: "", headerTransparent: true});
  }, [navigation]);

  const handlePeer = ({remote, wrtc, local, initiator = false} = {}) => {
    let peer = new WebRTCPeer({
      local,
      remote,
      initiator,
      wrtc,
      room: room,
    });
    let newPeerConn = {...peerConnections};
    console.log("newPeerConn peer", remote, newPeerConn, peer);
    newPeerConn[remote] = peer;
    setLocalStream(remote);
    setPeerConnections(newPeerConn);

    // We received the local signal (i.e. network location description) that
    // we will now send via web socket signaling server to the remote peer
    peer.on("signal", (signal) => {
      // log('received peer signal', remote)
      socket.emit("signal", {
        from: local,
        to: remote,
        signal,
        initiator,
      });
    });

    // The full connection is established, from now on we can exchange data
    peer.on("connect", () => {
      socket.emit("connected", {peer});
      updateStatus();
    });

    // A message from the remote peer
    peer.on("data", (data) => {
      // depr
      let {type, ...msg} = JSON.parse(data);
      socket.emit(type, msg);
    });

    peer.on("message", (data) => {
      socket.emit("message", data); // Channel compat
    });

    // peer.on("stream", (_) => updateStatus());
    // peer.on("track", (_) => updateStatus());

    // Listening to userInfo and emitting back with local peer info
    socket.on("userInfo", (data) => {
      socket.emit("userInfoWithPeer", {peer, data});
    });

    return peer;
  };
  const updateStatus = () => {
    console.log("go here updateStatus", peerConnections);
    let status = Object.values(peerConnections).map((peer) => {
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
    socket.emit("status", {status});
  };

  useEffect(async () => {
    const wrtc = {
      RTCPeerConnection,
      RTCIceCandidate,
      RTCSessionDescription,
      RTCView,
      MediaStream,
      MediaStreamTrack,
      mediaDevices,
      registerGlobals,
    };
    const socketServer = "https://dev-signaling.lisod.vn/";
    // const socketServer = "ws://test-hankyu.lisod.vn:4444";
    // console.log("user test-hankyu.lisod.vn:4444", user);
    const options = {
      // query: {token: `${accessToken}`},
      transports: ["websocket"],
    };
    socket = io(socketServer, options);

    socket.on("connect", (s) => {
      console.log("connected to socket.io server");
      socket.emit("join", {room});
    });
    socket.on("joined", ({room, peers, vapidPublicKey}) => {
      const local = socket.id;
      console.log("socket.on joined room", room, peers);
      socket.on("signal", ({from, to, signal, initiator}) => {
        // log('received signal', from, to === local, initiator)
        // If we are not already connected, do it now
        let peer = peerConnections[from];
        console.log("socket.on signal", from, signal, peer);
        if (!peer) {
          peer = handlePeer({
            remote: from,
            local,
            initiator: false,
            wrtc,
          });
        }
        peer.signal(signal);
        updateStatus();
      });
      for (let i = 0; i < peers.length; i++) {
        const remote = peers[i];
        handlePeer({
          remote,
          local,
          initiator: true,
          wrtc: null,
        });
      }
      updateStatus();
    });

    socket.on("disconnect", (reason) => {
      console.log("disconnect to socket.io server");
      bus.emit("socket.off");
      // alert('disconnect');
      if (reason === "io server disconnect") {
        // the disconnection was initiated by the server, you need to reconnect manually
        socket.connect();
      }
      // else the socket will automatically try to reconnect
    });
    socket.on("connect_error", (reason) => {
      // alert('connect_error');
      console.log("connect error", reason);
      bus.emit("socket.off");
      setTimeout(() => {
        socket.connect();
      }, 1000);
    });
    global.socket = socket;
  }, []);

  const _renderItem = ({item}) => {
    console.log("rendered item");
    return (
      <Image
        style={{width: (width - 70) / 2, height: 163, backgroundColor: "#C4C4C4", marginTop: 8}}
        source={{
          uri: item.image,
        }}
      />
    );
  };
  const dataPopup = [{}, {}, {}];
  return (
    <>
      <View style={[styles.videoMain]}>
        {localStream && (
          <View style={styles.yourVideo}>
            <RTCView style={{height: 200, width: 132}} streamURL={localStream} objectFit={"cover"} zOrder={20} mirror={true} />
          </View>
        )}
        {/* {localStream && (
          <RTCView
            streamURL={localStream?.toURL()}
            objectFit={"cover"}
            mirror={true}
            style={styles.remoteVideo}
            // ref={refConnectionVideo}
          />
        )} */}
        <ModalPortal
          isVisible={isPopup}
          animationInTiming={500}
          animationOutTiming={500}
          backdropTransitionInTiming={500}
          backdropTransitionOutTiming={500}
          swipeDirection="down"
          scrollHorizontal={true}
          style={styles.modalPopup}
        >
          <View style={styles.viewPopup}>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={{fontSize: 18, color: "#000000"}}>受信画像</Text>
              <TouchableOpacity onPress={() => setIsPopup(false)}>
                <Image source={require("@assets/images/icons/close_black.png")} style={{width: 20, height: 20}} resizeMode="cover" />
              </TouchableOpacity>
            </View>
            <FlatList
              numColumns={2}
              horizontal={false}
              columnWrapperStyle={{justifyContent: "space-between"}}
              data={dataPopup}
              renderItem={(item, index) => _renderItem(item, index)}
              keyExtractor={(item) => item.id}
            />
          </View>
        </ModalPortal>
        <View style={styles.bottomTool}>
          <TouchableOpacity
            onPress={() => {
              socket?.emit(("join", {room: 1111111}));
            }}
          >
            <Image style={{width: 50, height: 50}} source={require("@assets/images/icons/ic_camera_inversion.png")} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Image style={{width: 50, height: 50}} source={require("@assets/images/icons/ic_quit_room_call.png")} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsPopup(true)}>
            <Image style={{width: 50, height: 50}} source={require("@assets/images/icons/ic_photo_call.png")} />
          </TouchableOpacity>
        </View>
        <View style={styles.overBackground}>
          <Image style={{width: width, height: 143}} source={require("@assets/images/icons/bg_overground.png")} />
        </View>
      </View>
    </>

    // <LinearGradient colors={["#FF7840", "#F15D69", "#E3496A"]} style={{flex: 1}}>
    //   <View
    //     style={{
    //       flex: 1,
    //       justifyContent: "space-between",
    //     }}
    //   >
    //     <View
    //       style={{
    //         flex: 1,
    //         justifyContent: "flex-start",
    //         alignItems: "center",
    //         marginTop: 150,
    //       }}
    //     >
    //       <View style={{}}>
    //         <View
    //           style={{
    //             position: "absolute",
    //             justifyContent: "center",
    //             alignSelf: "center",
    //             top: -135,
    //           }}
    //         >
    //           <LottieView
    //             style={{width: "100%"}}
    //             source={require("@assets/animation/call/call_animation.json")}
    //             autoPlay={true}
    //             loop={true}
    //             speed={1.5}
    //           />
    //           {/* <RingAnimated /> */}
    //         </View>
    //         <Image
    //           source={{
    //             uri: remoteMessage?.data.avatar,
    //           }}
    //           style={{
    //             width: 130,
    //             height: 130,
    //             borderRadius: 9999,
    //             overflow: "hidden",
    //           }}
    //         />
    //       </View>
    //       <Text style={styles.name}>{remoteMessage?.data.name}</Text>
    //       <Text style={styles.statusLabel}>
    //         {statusConnection !== CONNECTION_STATE.CONNECT && global.t(`call.${statusConnection}`)}
    //         {statusConnection === CONNECTION_STATE.CONNECT && toTime(callTime)}
    //       </Text>
    //       {/* <Text style={styles.name}>{mapStatus[statusConnection]}</Text> */}
    //     </View>
    //     <View style={styles.bottomView}>
    //       <View
    //         style={{
    //           flex: 1,
    //           justifyContent: "space-between",
    //           flexDirection: "row",
    //           paddingHorizontal: 40,
    //           marginTop: 40,
    //         }}
    //       >
    //         <RoundButton
    //           active={speakerphone}
    //           source={speakerphone ? require("@assets/images/ic_volume_up.png") : require("@assets/images/low-volume.png")}
    //           onPress={() => toggleSpeaker()}
    //           style={styles.actionButton}
    //         />
    //         <RoundButton
    //           active={!isMuted}
    //           typeMute={true}
    //           onPress={() => toggleMute()}
    //           source={require("@assets/images/btn_record_voice.png")}
    //           style={styles.actionButton}
    //         />
    //         <RoundButton
    //           activeBackgroundColor="red"
    //           active={true}
    //           onPress={() => {
    //             const callId = callData ? callData?.callId : remoteMessage?.data.callId;
    //             console.log("pressCloseCall", callData?.callId, remoteMessage?.data.callId);
    //             global.socket?.emit("CLOSE_CALL", {callId, callTime});

    //             closeCall();
    //           }}
    //           source={require("@assets/images/ic_callend_notifbar.png")}
    //           style={styles.actionButton}
    //         />
    //       </View>
    //     </View>

    //   </View>
    // </LinearGradient>
  );
}
