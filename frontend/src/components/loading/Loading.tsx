import React from 'react';
import LottieView from 'lottie-react-native';
import { Modal, useWindowDimensions, View } from 'react-native';
import useLoading from '../../hooks/useLoading.ts';
import loadingAnimation from '../../assets/loadingAnimation.lottie';
import styles, { getLottieStyle } from './Loading.styles';

const Loading_: React.FC = () => {
  const { isLoading } = useLoading();
  const screenWidth = useWindowDimensions().width;

  return (
    <Modal
      visible={isLoading}
      transparent
      animationType="fade"
      hardwareAccelerated
    >
      <View style={styles.filler} />
      <View style={styles.container}>
        <LottieView
          style={getLottieStyle(screenWidth)}
          autoPlay
          loop
          source={loadingAnimation}
        />
      </View>
      <View style={styles.filler} />
    </Modal>
  );
};

const Loading = React.memo(Loading_);

export default Loading;
