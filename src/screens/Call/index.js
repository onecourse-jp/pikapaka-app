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
import InCallManager from "react-native-incall-manager";
import {setup, startPlayStream} from "../CallLogic/state";
import {messages} from "../CallLogic/lib/emitter";
import styles from "./styles";
// import RNCallKeep from 'react-native-callkeep';
import {SafeAreaView} from "react-native-safe-area-context";
import bus from "@utils/eventBus";
import ModalPortal from "react-native-modal";
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

const {width} = Dimensions.get("window");

export default function ScreenCall({navigation, route}) {
  const [localStream, setLocalStream] = useState();
  const [isPopup, setIsPopup] = useState(false);
  var socket;
  React.useLayoutEffect(() => {
    navigation.setOptions({headerTitle: "", headerTransparent: true});
  }, [navigation]);

  const initialize = async () => {
    if (Platform.OS === "android") {
      request(PERMISSIONS.ANDROID.RECORD_AUDIO).then((result) => {
        // …
      });
    }

    const isFrontCamera = true;
    const devices = await mediaDevices.enumerateDevices();

    const facing = isFrontCamera ? "front" : "environment";
    const videoSourceId = devices.find((device) => device.kind === "videoinput" && device.facing === facing);
    const constraints = {
      audio: true,
      video: true,
    };

    const newStream = await mediaDevices.getUserMedia(constraints);
    // setLocalStream(newStream);
    console.log("setLocalStream setLocalStream", newStream);

    // const peerServer = new Peer(undefined, {
    //   initiator: true,
    //   iceTransportPolicy: "all",
    //   offerConstraints: {offerToReceiveAudio: true, offerToReceiveVideo: true},
    //   room: 1111,
    //   // host: Config.PEER_SERVER_HOST,
    //   // path: Config.PEER_SERVER_PATH,
    //   // secure: true,
    //   // port: Config.PEER_SERVER_PORT,
    //   config: {
    //     iceTransportPolicy: "all",
    //     reconnectTimer: 3000,
    //     iceServers: [
    //       {
    //         urls: "stun:turn01.brie.fi:5349",
    //       },
    //       {
    //         urls: "turn:turn01.brie.fi:5349",
    //         username: "brie",
    //         credential: "fi",
    //       },
    //     ],
    //   },
    // });
    // console.log("peerServer peerServer", peerServer);

    // peerServer.on("error", (err) => console.log("Peer server error", err));

    // peerServer.on("open", (peerId) => {
    //   console.log("peerServer is on", peerId);

    //   setPeerServer(peerServer);
    //   setPeerId(peerId);
    //   // console.log('remoteMessage?.data.isStarting',remoteMessage?.data.isStarting);
    //   // global.socket?.emit('set-peer-id', { peerId });
    //   // if (remoteMessage?.data.isStarting) {
    //   //   call(peerId);
    //   // } else {
    //   //   const callId = callData ? callData?.callId : remoteMessage?.data.callId;
    //   //   console.log("remote accept calling", callId);
    //   //   global.socket?.emit("ACCEPT_CALLING", {uuid: callId, peerId});
    //   // }
    // });

    // peerServer.on("call", (call) => {
    //   console.log("peerServer on call", newStream);
    //   // setRemoteUser(user);
    //   // io.emit('accept-call', user?.username);
    //   try {
    //     setTimeout(() => {
    //       call.answer(newStream);
    //     }, 3000);
    //     // setActiveCall(call);
    //   } catch (e) {
    //     console.log("eeeee", e);
    //   }

    //   call.on("stream", (stream) => {
    //     console.log("  on stream", stream);
    //     setStatusConnect(CONNECTION_STATE.CONNECT);
    //     setRemoteStream(stream);
    //   });

    //   call.on("close", (e) => {
    //     console.log("call on close", e);
    //     closeCall();
    //   });

    //   call.on("error", (e) => {
    //     console.log("call on error", e);
    //   });
    // });
  };

  useEffect(async () => {
    messages.on("setLocalStream", (videoSrc) => {
      console.log("setLocalStream", videoSrc);
      setLocalStream(videoSrc);
    });
    messages.on("setRemoteStream", (videoSrc) => {
      console.log("setRemoteStream", videoSrc);
    });
    messages.on("offRemoteStream", () => {
      console.log("offRemoteStream");
    });
    initialize();
    setup();
  }, []);

  // useEffect(() => {
  //   // InCallManager.start({ media: 'audio' });
  //   // InCallManager.setForceSpeakerphoneOn(true);
  //   // InCallManager.setSpeakerphoneOn(true);
  //   InCallManager.setKeepScreenOn(true);
  //   initialize();
  //   return () => {
  //     global?.socket?.off("REJECT_CALLING");
  //     global?.socket?.off("ACCEPT_CALLING");
  //     global?.socket?.off("CLOSE_CALL");
  //   };

  // }, []);

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
            <RTCView style={{height: 200, width: 132}} streamURL={localStream?.toURL()} objectFit={"cover"} zOrder={20} mirror={true} />
          </View>
        )}
        {/* {remoteStream && (
          <RTCView
            streamURL={remoteStream?.toURL()}
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
              messages?.emit(("switchMedia", "environment"));
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
