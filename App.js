/**
 * Base Code & Asset dari:
 * Create by Refsi Sangkay / refsisangkay.github.io
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Alert, Text, View} from 'react-native';
import Image from 'react-native-remote-svg';
import Audio from 'react-native-sound';
import logo from "./yes.svg";

type Props = {};
export default class App extends Component<Props> {
  state = {
    timesClicked: 0,
    rotate: 0,
    showGuide: true,
    showCount: false
  };
  

  playMusic = () => {
    console.log('ashiap');

    // Enable playback in silence mode
    Audio.setCategory('Playback');
    // Load the sound file 'whoosh.mp3' from the app bundle
    // See notes below about preloading sounds within initialization code below.
    var audio = new Audio('ashiap.mp3', Audio.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
      // Play the sound with an onEnd callback
      audio.play((success) => {
        if (success) {
          console.log('successfully finished playing');
        } else {
          console.log('playback failed due to audio decoding errors');
        }
      });
    });
    // Reduce the volume by half
    audio.setVolume(0.5);
    // Position the sound to the full right in a stereo field
    audio.setPan(1);
    // Loop indefinitely until stop() is called
    audio.setNumberOfLoops(-1);
    // Seek to a specific point in seconds
    audio.setCurrentTime(2.5);
    // Get the current playback point in seconds
    audio.getCurrentTime((seconds) => console.log('at ' + seconds));
    // Pause the sound
    audio.pause();
    // Stop the sound and rewind to the beginning
    audio.stop(() => {
      // Note: If you want to play a sound after stopping and rewinding it,
      // it is important to call play() in a callback.
      audio.play();
    });
    // Release the audio player resource
    audio.release();

    this.setState({
      timesClicked: this.state.timesClicked + 1,
      showGuide: false,
      showCount: true
    });
  };
  

  render() {
    let that = this;
    setTimeout(function(){that.setState({rotate: that.state.rotate+1})}, 500);
    return (
      <View
      style={styles.container}
      onStartShouldSetResponder={ () => { this.playMusic() }}
      >
        <Text style={{color: 'white', fontWeight: 'bold', fontSize: 30}}>ASHIYAAP.exe</Text>
        <Image style={ {transform: [{ rotate:  this.state.rotate+'deg' }] }} source={logo}/>
        { this.state.showGuide && 
          <Text style={{color: 'white', fontSize: 20}}>Klik biar Atta ngomong "Ashiap".</Text>
        }
        { this.state.showCount && 
          <Text style={{color: 'white', fontSize: 20}}>Atta di klik: {this.state.timesClicked} kali</Text>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  }
});
