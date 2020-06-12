package com.extensionactivity;

import android.annotation.SuppressLint;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Handler;
import android.telephony.TelephonyManager;

import androidx.annotation.NonNull;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import com.android.internal.telephony.ITelephony;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;

import java.lang.reflect.Method;

import static androidx.core.content.ContextCompat.getSystemService;

public class RNImmediatePhoneCallModule extends ReactContextBaseJavaModule {

    private static RNImmediatePhoneCallModule rnImmediatePhoneCallModule;

    private ReactApplicationContext reactContext;
    private static String number = "";
    private static final int PERMISSIONS_REQUEST_ACCESS_CALL = 101;

    public RNImmediatePhoneCallModule(ReactApplicationContext reactContext) {
        super(reactContext);
        if (rnImmediatePhoneCallModule == null) {
            rnImmediatePhoneCallModule = this;
        }
        rnImmediatePhoneCallModule.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "RNImmediatePhoneCall";
    }

    @ReactMethod
    public void immediatePhoneCall(String number, boolean callEnd, final Callback callback) {
        RNImmediatePhoneCallModule.number = Uri.encode(number);

        if (ContextCompat.checkSelfPermission(getReactApplicationContext(),
                android.Manifest.permission.CALL_PHONE) == PackageManager.PERMISSION_GRANTED) {
            call(callEnd, callback);
        } else {
            ActivityCompat.requestPermissions(getCurrentActivity(),
                    new String[]{android.Manifest.permission.CALL_PHONE},
                    PERMISSIONS_REQUEST_ACCESS_CALL);
        }
    }

    private static ITelephony iTelephony;

    @SuppressLint("MissingPermission")
    private static void call(boolean callEnd, final Callback callback) {
        String url = "tel:" + RNImmediatePhoneCallModule.number;

        // 开始直接拨打电话
        Intent intent2 = new Intent(Intent.ACTION_CALL, Uri.parse(url));
        intent2.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        rnImmediatePhoneCallModule.reactContext.startActivity(intent2);

//        new Handler().postDelayed(new Runnable() {
//            public void run() {
//                try {
//                    PhoneEndCallModule.toEnd(rnImmediatePhoneCallModule.reactContext);
//                } catch (Exception e) {
//                    e.printStackTrace();
//                }
//            }
//        }, 5 * 1000);

        // callEnd:true自动挂断电话
        if (callEnd) {
            new Handler().postDelayed(new Runnable() {
                public void run() {
                    try {
                        // 延迟5秒后自动挂断电话
                        // 首先拿到TelephonyManager
                        TelephonyManager telMag = (TelephonyManager) rnImmediatePhoneCallModule.reactContext.getSystemService(rnImmediatePhoneCallModule.reactContext.TELEPHONY_SERVICE);
                        Class<TelephonyManager> c = TelephonyManager.class;

                        // 再去反射TelephonyManager里面的私有方法 getITelephony 得到 ITelephony对象
                        Method mthEndCall = c.getDeclaredMethod("getITelephony", (Class[]) null);

                        //允许访问私有方法
                        mthEndCall.setAccessible(true);

//                    final Object obj = mthEndCall.invoke(telMag, (Object[]) null);

                        iTelephony = ((ITelephony) mthEndCall.invoke(telMag, (Object[]) null));

                        iTelephony.endCall();//挂断电话
                        if (callback != null) {
                            callback.invoke(true);
                        }
//                    // 再通过ITelephony对象去反射里面的endCall方法，挂断电话
//                    Method mt = obj.getClass().getMethod("endCall");
//                    //允许访问私有方法
//                    mt.setAccessible(true);
//                    mt.invoke(obj);
                    } catch (Exception e) {
                        callback.invoke(false);
                        e.printStackTrace();
                    }
                }
            }, 5 * 1000);
        }else {
            callback.invoke(true);
        }

    }

    public static void onRequestPermissionsResult(int requestCode, @NonNull String permissions[], @NonNull int[] grantResults) {
        switch (requestCode) {
            case PERMISSIONS_REQUEST_ACCESS_CALL: {

                // If request is cancelled, the result arrays are empty.
                if (grantResults.length > 0
                        && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                    call(false, null);
                }
            }
        }
    }
}
