import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
  noContentSvg: {
    height: 350,
    width: '100%',
  },
  noContentContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 40,
    rowGap: 20,
  },
  noContentText: {
    fontSize: 20,
    color: '#6D6780',
    fontWeight: '500',
    textAlign: 'center',
  },
  floatingButtonContainer: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    columnGap: 42,
  },
  floatingButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#6D6780',
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrow: {
    height: 120,
    width: 60,
    color: '#6D6780',
    transform: [{ rotateZ: '-57deg' }],
  },
  add: {
    height: 24,
    width: 24,
    color: '#fff',
  },
  flatList: {
    flex: 1,
  },
  contentContainer: {
    gap: 8,
  },
  columnContainer: {
    gap: 8,
  },
  image: {
    flex: 1,
    height: 120,
    borderRadius: 8,
  },
  text: {
    fontSize: 16,
    color: '#6D6780',
    fontWeight: '500',
    marginTop: 8,
  },
});
