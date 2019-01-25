import React from 'react';
import {Button, View, Text, WebView} from 'react-native';
import {createStackNavigator} from 'react-navigation';
import WebViewBridge from 'react-native-webview-bridge';

const testHtml = require('./test.html');

class HomeScreen extends React.Component {
  render() {
    return (
      <View
        style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {/* <Text>Home Screen haha</Text>
        <Button
          title="Go to Details"
          onPress={() => this.props.navigation.navigate('Details')}
        /> */}
        <Button title="小程序" onPress={() => this.props.navigation.navigate('WebView')}/>
      </View>
    );
  }
}

class DetailsScreen extends React.Component {
  render() {
    return (
      <View
        style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Text>Details Screen</Text>
      </View>
    );
  }
}

class WebViewScreen extends React.Component {

  onBridgeMessage : function (message) {
    const {webviewbridge} = this.refs;

    switch (message) {
      case "hello from webview":
        webviewbridge.sendToBridge("hello from react-native");
        break;
      case "got the message inside webview":
        console.log("we have got a message from webview! yeah");
        break;
    }
  },

  render() {

    const injectScript = `
    (function () {
      if (WebViewBridge) {
        WebViewBridge.onMessage = function (message) {
          if (message === "hello from react-native") {
            WebViewBridge.send("got the message inside webview");
          }
        };
        WebViewBridge.send("hello from webview");
      }
    }());
  `;

    return (<WebView bounces={false} onBridgeMessage={this.onBridgeMessage} ref="webViewRef" scalesPageToFit={true} injectedJavaScript={injectScript} javaScriptEnabledAndroid={true} domStorageEnabled={true} // source={{
      uri: 'http://172.16.0.174:8080/index.html?feed_id=5baad0047d65437a89267b423ca5e585&language_tag_code=2&language_type=1&pos=cn&token=d922d210637411e8bdee00163e0c817a'
    }
  }} // source={{
      uri: 'http://172.16.0.168:8080/index.html?feed_id=5ba97f49f41f4c45a4af233dc8a9e7d5&language_tag_code=2&language_type=1&pos=cn&token=d922d210637411e8bdee00163e0c817a'
    }
  }} source={testHtml} // source={{
      uri: 'http://47.93.241.33/ono/test/ono-sdk-test/'
    }
  }} // onMessage={(event) => { //监听html发送过来的数据} // const message = event.nativeEvent.data;
  // alert(message.split(',')[0])
  // }}
/>);
  }
}

const RootStack = createStackNavigator({
  Home: HomeScreen,
  Details: DetailsScreen,
  WebView: WebViewScreen
}, {initialRouteName: 'Home'});

export default class App extends React.Component {
  render() {
    return <RootStack/>;
  }
}