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


export default class App extends React.Component {

  phoneCall = () => {
    try {
      RNPhoneEndCall.PhoneEndCall()
    } catch (e) {
      alert("无法关闭电话")
    }
  }

  phoneCall1 = () => {
    try {
      RNImmediatePhoneCall.immediatePhoneCall('10086');

      // setTimeout(() => {
      //   this.phoneCall()
      // }, 10000)
    } catch (e) {
      alert("无法拨打电话,或者无法正常挂断电话")
    }
  }

  render(): React$Node {
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
                  <Text style={styles.sectionTitle}>电话通了之后，挂断电话</Text>
                  <Text style={styles.sectionDescription}>
                    Edit <Text style={styles.highlight}>App.js</Text> to change this
                    screen and then come back to see your edits.
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                      this.phoneCall1()
                    }}
                    style={styles.sectionContainer}>
                  <Text style={styles.sectionTitle}>拨10086然后一会自动挂断，发现需要返回app才能挂断</Text>
                  <Text style={styles.sectionDescription}>
                    <ReloadInstructions/>
                  </Text>
                </TouchableOpacity>
                <View style={styles.sectionContainer}>
                  <Text style={styles.sectionTitle}>Debug</Text>
                  <Text style={styles.sectionDescription}>
                    <DebugInstructions/>
                  </Text>
                </View>
                <View style={styles.sectionContainer}>
                  <Text style={styles.sectionTitle}>Learn More</Text>
                  <Text style={styles.sectionDescription}>
                    Read the docs to discover what to do next:
                  </Text>
                </View>
                <LearnMoreLinks/>
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
    color: Colors.black,
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
});