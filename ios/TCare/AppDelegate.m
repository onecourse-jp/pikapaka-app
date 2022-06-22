#import "AppDelegate.h"

#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import "RNSplashScreen.h"  // here
#import <CodePush/CodePush.h>
#import <FBSDKLoginKit/FBSDKLoginKit.h>
#import <React/RCTLinkingManager.h>
@import RNLine;
@import Firebase;
#ifdef FB_SONARKIT_ENABLED
#import <SKIOSNetworkPlugin/SKIOSNetworkAdapter.h>
#endif
#import <AppsFlyerLib/AppsFlyerLib.h>
#import <UserNotifications/UserNotifications.h>
#import <AppCenterReactNative.h>
#import <AppCenterReactNativeAnalytics.h>
#import <AppCenterReactNativeCrashes.h>
@implementation AppDelegate
// Start the AppsFlyer SDK
- (void)sendLaunch:(UIApplication *)application {
    [[AppsFlyerLib shared] start];
}
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
//  [Bugsnag start];
  
#ifdef FB_SONARKIT_ENABLED
#endif
//  [RNSplashScreen show];  // here

  [FIRApp configure];
  [AppCenterReactNative register];
  [AppCenterReactNativeAnalytics registerWithInitiallyEnabled:true];
  [AppCenterReactNativeCrashes registerWithAutomaticProcessing];
  RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];
  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge
                                                   moduleName:@"ピカパカヘルスケア"
                                            initialProperties:nil];

  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  [RNSplashScreen show];  // here
  // Override point for customization after application launch.
  /** APPSFLYER INIT **/
  [[AppsFlyerLib shared] setAppsFlyerDevKey:@"NEvX4Z6NHrffjMAzoxtJpS"];
  [[AppsFlyerLib shared] setAppleAppID:@"id1628953261"];
  /* Uncomment the following line to see AppsFlyer debug logs */
  [AppsFlyerLib shared].isDebug = true;
  
  // SceneDelegate support
  [[NSNotificationCenter defaultCenter] addObserver:self
     selector:@selector(sendLaunch:)
     name:UIApplicationDidBecomeActiveNotification
     object:nil];
    if (@available(iOS 10, *)) {
        UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter];
        center.delegate = self;
        [center requestAuthorizationWithOptions:(UNAuthorizationOptionSound | UNAuthorizationOptionAlert | UNAuthorizationOptionBadge) completionHandler:^(BOOL granted, NSError * _Nullable error) {
        }];
    }

    else {
        UIUserNotificationSettings *settings = [UIUserNotificationSettings settingsForTypes: UIUserNotificationTypeAlert | UIUserNotificationTypeSound | UIUserNotificationTypeBadge categories:nil];
        [[UIApplication sharedApplication] registerUserNotificationSettings:settings];
    }

  [[UIApplication sharedApplication] registerForRemoteNotifications];
  [LineLogin setupWithChannelID:@"1657233461" universalLinkURL:nil];
  
  return YES;
}
- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
#else
  return [CodePush bundleURL];

//  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}
//- (BOOL)application:(UIApplication *)application
// continueUserActivity:(NSUserActivity *)userActivity
//   restorationHandler:(void(^)(NSArray * __nullable restorableObjects))restorationHandler
// {
//   return [RNCallKeep application:application
//            continueUserActivity:userActivity
//              restorationHandler:restorationHandler];
// }
- (BOOL)application:(UIApplication *)application
            openURL:(NSURL *)url
            options:(NSDictionary<UIApplicationOpenURLOptionsKey, id> *)options {
  if ([[FBSDKApplicationDelegate sharedInstance] application:application openURL:url options:options]){
    return YES;
  }

  return [LineLogin application:application open:url options:options] || [RCTLinkingManager application:application openURL:url options:options];
}
-(BOOL)application:(UIApplication *)application continueUserActivity:(NSUserActivity *)userActivity restorationHandler:(void (^)(NSArray<id<UIUserActivityRestoring>> * _Nullable))restorationHandler{
  return [RCTLinkingManager application:application continueUserActivity:userActivity restorationHandler:restorationHandler] || [LineLogin application:application continue:userActivity restorationHandler:restorationHandler];
}

@end


