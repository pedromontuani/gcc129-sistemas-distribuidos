import { Dimensions, StyleSheet } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    rowGap: 6,
  },
  row: {
    flexDirection: 'row',
    columnGap: 12,
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  dateContainer: {
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateText: {
    fontSize: 18,
    color: '#333',
    fontWeight: '500',
  },
  selectedDateText: {
    fontWeight: 'bold',
  },
  flatlist: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: SCREEN_WIDTH / 2 - 64,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#6D6780', // Tomato color
  },
  chevron: {
    width: 14,
    height: 14,
    color: '#6D6780',
  },
  chevronLeft: {
    transform: [{ rotateY: '180deg' }],
  },
  chevronTouchable: {
    height: 20,
    width: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
