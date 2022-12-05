import React from 'react';
import { View, StyleSheet } from 'react-native';
import CustomButton from '../components/CustomButton';
import * as Animatable from 'react-native-animatable';

const ViewNav1 = (props) => {
  return (
    <Animatable.View
      animation="fadeIn"
      style={styles.container}>

    </Animatable.View>
  );
}

export default ViewNav1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  }
});