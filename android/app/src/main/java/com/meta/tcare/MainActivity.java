package com.meta.tcare;
import android.os.Bundle; // here
import org.devio.rn.splashscreen.SplashScreen; // here
import com.facebook.FacebookSdk;
import com.facebook.appevents.AppEventsLogger;
import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;
public class MainActivity extends ReactActivity {
//    @Override
//    protected void onCreate(Bundle savedInstanceState) {
//        SplashScreen.show(this);  // here
//        super.onCreate(savedInstanceState);
//    }
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(this);  // here
        super.onCreate(null);
    }
    @Override
    protected void onSaveInstanceState(Bundle outState) {
        super.onSaveInstanceState(outState);
        if (outState != null) { outState.clear(); }
    }
    /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "PikaPaka";
  }
  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
   return new ReactActivityDelegate(this, getMainComponentName()) {
      @Override
      protected ReactRootView createRootView() {
       return new RNGestureHandlerEnabledRootView(MainActivity.this);
     }
    };
  }
}
