package com.extensionactivity;

import android.content.Context;
import android.os.RemoteException;
import android.telephony.TelephonyManager;

import androidx.annotation.NonNull;

import com.android.internal.telephony.ITelephony;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.lang.reflect.Method;

public class PhoneEndCallModule extends ReactContextBaseJavaModule {
    private static ReactApplicationContext reactContext;
    private static PhoneEndCallModule phoneModule;

    public PhoneEndCallModule(ReactApplicationContext reactContext) {
        super(reactContext);

        if (phoneModule == null) {
            phoneModule = this;
        }
        phoneModule.reactContext = reactContext;
    }


    @NonNull
    @Override
    public String getName() {
        return "PhoneModule";
    }


    private static ITelephony iTelephony;

    public static void InitItelephony(Context context) {
        if (null != iTelephony) {
            return;
        }
        TelephonyManager localTelephonyManager = (TelephonyManager) context.getSystemService(Context.TELEPHONY_SERVICE);
        try {
            Method localMethod = TelephonyManager.class.getDeclaredMethod("getITelephony", (Class[]) null);
            localMethod.setAccessible(true);
            iTelephony = ((ITelephony) localMethod.invoke(localTelephonyManager, (Object[]) null));
        } catch (Exception localException1) {
            localException1.printStackTrace();
        }
    }

    public static void toEnd(Context context) {
        try {
            if (iTelephony == null) {
                InitItelephony(context);
            }
            iTelephony.endCall();//挂断电话
            try {
                iTelephony.cancelMissedCallsNotification();//取消通知栏的未接来电通知
            } catch (NoSuchMethodError ex) {
                ex.printStackTrace();
            }
        } catch (RemoteException localRemoteException) {
            while (true)
                localRemoteException.printStackTrace();
        }
    }

    @ReactMethod
    public void PhoneEndCall() {
        try {
            if (iTelephony == null) {
                InitItelephony(phoneModule.reactContext);
            }
            iTelephony.endCall();//挂断电话
            try {
                iTelephony.cancelMissedCallsNotification();//取消通知栏的未接来电通知
            } catch (NoSuchMethodError ex) {
                ex.printStackTrace();
            }
        } catch (RemoteException localRemoteException) {
            while (true)
                localRemoteException.printStackTrace();
        }
    }
}
