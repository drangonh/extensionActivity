/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    TouchableOpacity
} from 'react-native';

import {
    Header,
    LearnMoreLinks,
    Colors,
    DebugInstructions,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import RNPhoneEndCall from "./src/utils/RNPhoneEndCall";
import RNImmediatePhoneCall from "./src/utils/RNImmediatePhoneCall";

let arr = ["10011", "10086"]
export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            phoneArr: arr,
            selPhone: ""
        }
    }

    phoneCall = () => {
        try {
            RNPhoneEndCall.PhoneEndCall()
        } catch (e) {
            alert("无法关闭电话")
        }
    }

    phoneCall1 = (arr) => {
        const newArr = JSON.parse(JSON.stringify(arr));
        if (newArr.length == 0) {
            return
        }

        try {
            const first = newArr.shift();

            this.setState({
                selPhone: first
            }, () => {
                RNImmediatePhoneCall.immediatePhoneCall(first, true, (res) => {
                    console.log(first, res)

                    setTimeout(() => {
                        if (res) {
                            this.phoneCall1(newArr)
                        } else {
                            this.phoneCall1(newArr)
                        }
                    }, 1000)

                });
            })


        } catch (e) {
            alert("无法拨打电话,或者无法正常挂断电话")
        }
    }

    render(): React$Node {
        const {phoneArr, selPhone} = this.state
        return (
            <>
                <StatusBar barStyle="dark-content"/>
                <SafeAreaView>
                    <ScrollView
                        contentInsetAdjustmentBehavior="automatic"
                        style={styles.scrollView}>
                        <Header/>
                        {global.HermesInternal == null ? null : (
                            <View style={styles.engine}>
                                <Text style={styles.footer}>Engine: Hermes</Text>
                            </View>
                        )}
                        <View style={styles.body}>
                            <TouchableOpacity
                                onPress={() => {
                                    this.phoneCall()
                                }}
                                style={styles.sectionContainer}>
                                <Text style={styles.sectionTitle}>挂断电话功能</Text>
                            </TouchableOpacity>


                            <TouchableOpacity
                                onPress={() => {
                                    this.phoneCall1(phoneArr)
                                }}
                                style={styles.sectionContainer}>
                                <Text style={styles.sectionTitle}>拨打并且自动挂断</Text>
                            </TouchableOpacity>


                            {phoneArr.map((item, index) => {
                                return (
                                    <Text
                                        style={[styles.sectionText, selPhone==item ? styles.color : null]}>{item}</Text>
                                )

                            })}
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </>
        )
    }
}

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: Colors.lighter,
    },
    engine: {
        position: 'absolute',
        right: 0,
    },
    body: {
        backgroundColor: Colors.white,
    },
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: Colors.white,
        paddingTop:20,
        paddingBottom:20,
        backgroundColor:"blue",
        paddingLeft:10
    },

    sectionText: {
        fontSize: 24,
        fontWeight: '600',
        color: Colors.black,
        marginTop: 10,
        backgroundColor:"yellow",
        marginHorizontal: 24,
        paddingTop:10,
        paddingBottom:10,
        paddingLeft:10
    },

    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
        color: Colors.dark,
    },
    highlight: {
        fontWeight: '700',
    },
    footer: {
        color: Colors.dark,
        fontSize: 12,
        fontWeight: '600',
        padding: 4,
        paddingRight: 12,
        textAlign: 'right',
    },
    color:{
        color:"red"
    }
});