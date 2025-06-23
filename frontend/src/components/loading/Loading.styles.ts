import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filler: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export const getLottieStyle = (screenWidth: number) => {
  return StyleSheet.create({
    lottie: {
      width: screenWidth,
      height: screenWidth,
    },
  }).lottie;
};
