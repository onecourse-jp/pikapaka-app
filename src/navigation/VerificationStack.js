// import * as React from 'react';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import {
//   SCREEN_VERIFY_STEP_1,
//   SCREEN_VERIFY_STEP_2,
//   SCREEN_VERIFY_STEP_3,
//   SCREEN_VERIFY_STEP_4,
//   SCREEN_VERIFY_STEP_5,
// } from '../screens/screens.constants';
// import VerifyStep1 from '@screens/Verify/VerifyStep1';
// import VerifyStep2 from '@screens/Verify/VerifyStep2';
// import VerifyStep3 from '@screens/Verify/VerifyStep3';
// import VerifyStep4 from '@screens/Verify/VerifyStep4';
// import VerifyStep5 from '@screens/Verify/VerifyStep5';
// import { Image, TouchableOpacity } from 'react-native';
// import { navigationRef } from './NavigationService';
// import Colors from '@config/styles';
// import IonIcons from 'react-native-vector-icons/Ionicons';
// import { useNavigation } from '@react-navigation/native';

// const VerificationStack = createNativeStackNavigator();
// export default function () {
//   const navigation = useNavigation();

//   return (
//     <VerificationStack.Navigator
//       screenOptions={({ navigation }) => ({
//         presentation: 'fullScreenModal',
//         animation: 'none',
//         headerLeft: () => (
//           <TouchableOpacity
//             onPress={() => navigation.goBack()}
//             style={{
//               height: 32,
//               width: 32,
//               marginRight: 16,
//               backgroundColor: Colors.color.COLOR_PORCELAIN,
//               borderRadius: 10,
//               justifyContent: 'center',
//               alignItems: 'center',
//             }}>
//             <Image
//               source={require('@assets/images/icons/ic_back.png')}
//               resizeMode="cover"
//             />
//           </TouchableOpacity>
//         ),
//       })}>
//       <VerificationStack.Screen
//         name={SCREEN_VERIFY_STEP_1}
//         component={VerifyStep1}
//         options={{ title: global.t('verify1_title') }}
//       />
//       <VerificationStack.Screen
//         name={SCREEN_VERIFY_STEP_2}
//         component={VerifyStep2}
//         options={{ title: global.t('verify2_title') }}
//       />
//       <VerificationStack.Screen
//         name={SCREEN_VERIFY_STEP_3}
//         component={VerifyStep3}
//         options={{ title: global.t('verify3_title') }}
//       />
//       <VerificationStack.Screen
//         name={SCREEN_VERIFY_STEP_4}
//         component={VerifyStep4}
//         options={{ title: global.t('verify4_title') }}
//       />
//       <VerificationStack.Screen
//         name={SCREEN_VERIFY_STEP_5}
//         component={VerifyStep5}
//         options={{ title: global.t('verify5_title') }}
//       />
//     </VerificationStack.Navigator>
//   );
// }
