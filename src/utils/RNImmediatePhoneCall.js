import {NativeModules} from 'react-native';

var RNImmediatePhoneCall = {
    // autoEnd:是否自动挂断电话
    // number：拨打的手机号码
    immediatePhoneCall: function(number,autoEnd,callBack) {
        NativeModules.RNImmediatePhoneCall.immediatePhoneCall(number,autoEnd,callBack);
    }
};

export default RNImmediatePhoneCall;
