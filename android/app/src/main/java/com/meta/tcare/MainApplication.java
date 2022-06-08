package com.meta.tcare;

// import com.bugsnag.android.Bugsnag;
import android.app.Application;
import android.content.Context;
import com.facebook.FacebookSdk;
import com.facebook.appevents.AppEventsLogger;
import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;
// import com.facebook.react.bridge.JSIModulePackage; // <- add
// import com.swmansion.reanimated.ReanimatedJSIModulePackage; // <- add
import java.lang.reflect.InvocationTargetException;
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
import java.util.List;
import com.microsoft.codepush.react.CodePush;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost =
      new ReactNativeHost(this) {
          @Override
          public String getJSBundleFile() {
              return CodePush.getJSBundleFile();
          }
        @Override
        public boolean getUseDeveloperSupport() {
          return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
          @SuppressWarnings("UnnecessaryLocalVariable")
          List<ReactPackage> packages = new PackageList(this).getPackages();
          // Packages that cannot be autolinked yet can be added manually here, for example:
           //packages.add(new RNFSPackage());
          return packages;
        }

        @Override
        protected String getJSMainModuleName() {
          return "index";
        }
      //   @Override
      //    protected JSIModulePackage getJSIModulePackage() {
      //   return new ReanimatedJSIModulePackage(); // <- add
      // }
      };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    // Bugsnag.start(this);
    SoLoader.init(this, /* native exopackage */ false);
  }

  /**
   *
   * @param context
   * @param reactInstanceManager
   */

}
