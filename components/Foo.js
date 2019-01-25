import React from 'react';
import {View, Text, WebView, StyleSheet} from 'react-native';

class Foo extends React.Component {

  render () {
    return (
      <View style={{flex: 1}}>
        <Text>this is a foo.</Text>
        <WebView
          style={styles.webViewContainer}
          source={{uri: 'https://www.baidu.com'}}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  webViewContainer: {
    width: '100%'
  }
});

export default Foo;