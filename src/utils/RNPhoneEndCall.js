import { NativeModules } from "react-native";
// 下一句中的ToastExample即对应上文
// public String getName()中返回的字符串

var RNPhoneEndCall = {
    //android挂断电话方法
    PhoneEndCall: function() {
        NativeModules.PhoneModule.PhoneEndCall();
    }
};

export default RNPhoneEndCall;