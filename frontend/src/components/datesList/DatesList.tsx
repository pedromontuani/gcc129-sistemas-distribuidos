import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
} from 'react';
import {
  Animated,
  Easing,
  FlatList,
  ListRenderItem,
  TouchableOpacity,
  useAnimatedValue,
  useWindowDimensions,
  View,
} from 'react-native';

import Chevron from '../../assets/chevron.svg';

import styles, { getFlatlistStyle } from './DatesList.styles';

interface Props {
  currentDate: Date;
  onDateChange: (date: Date) => void;
}

const DatesList_: React.FC<Props> = ({ currentDate, onDateChange }) => {
  const flatListRef = React.useRef<FlatList<Number>>(null);
  const screenWidth = useWindowDimensions().width;

  const today = useRef(new Date()).current;
  const isCurrentMonth =
    currentDate.getMonth() === today.getMonth() &&
    currentDate.getFullYear() === today.getFullYear();
  const isNextDisabled =
    isCurrentMonth && today.getDate() === currentDate.getDate();

  const datesList = useMemo(() => {
    const daysInMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0,
    ).getDate();

    const dates = new Array(daysInMonth).fill(null).map((_, index) => {
      const date = new Date(currentDate);
      date.setDate(index + 1);
      return date;
    });

    return dates
      .filter(date => {
        if (isCurrentMonth) {
          return date.getDate() <= today.getDate();
        }

        return date;
      })
      .map(i => i.getDate());
  }, [currentDate, isCurrentMonth, today]);

  const currentIndex = useMemo(() => {
    return currentDate.getDate() - 1; // Adjust for zero-based index
  }, [currentDate]);

  const onPressDate = useCallback(
    (date: number) => {
      const newDate = new Date(currentDate);
      newDate.setDate(date);
      onDateChange(newDate);
    },
    [currentDate, onDateChange],
  );

  const renderItem: ListRenderItem<Number> = ({ item, index }) => {
    const isSelected = index === currentIndex;

    return (
      <Item
        isSelected={isSelected}
        item={item}
        onPress={() => onPressDate(index + 1)}
      />
    );
  };

  useEffect(() => {
    flatListRef.current?.scrollToIndex({
      index: currentIndex,
      animated: true,
    });
  }, [currentIndex, screenWidth]);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.chevronTouchable}
          onPress={() => onPressDate(currentIndex)}
          hitSlop={5}
        >
          <Chevron style={[styles.chevron, styles.chevronLeft]} />
        </TouchableOpacity>
        <FlatList
          ref={flatListRef}
          horizontal
          scrollEnabled={false}
          data={datesList}
          renderItem={renderItem}
          keyExtractor={item => item.toString()}
          style={styles.flatlist}
          contentContainerStyle={getFlatlistStyle(screenWidth)}
          initialScrollIndex={currentIndex}
          getItemLayout={(data, index) => ({
            length: 40, // Height of each item
            offset: 40 * index, // Height of each item multiplied by the index
            index,
          })}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          extraData={currentIndex}
        />
        <TouchableOpacity
          style={[
            styles.chevronTouchable,
            isNextDisabled && styles.chevronDisabled,
          ]}
          onPress={() => onPressDate(currentIndex + 2)}
          disabled={isNextDisabled}
          hitSlop={5}
        >
          <Chevron style={[styles.chevron]} />
        </TouchableOpacity>
      </View>
      <View style={styles.dot} />
    </View>
  );
};

interface ItemProps {
  isSelected: boolean;
  onPress: () => void;
  item: Number;
}

const Item = React.memo(({ isSelected, onPress, item }: ItemProps) => {
  const scaleAnimation = useAnimatedValue(1);

  useLayoutEffect(() => {
    Animated.timing(scaleAnimation, {
      toValue: isSelected ? 1.3 : 1,
      duration: 200,
      easing: Easing.inOut(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [isSelected, scaleAnimation]);

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.dateContainer}>
        <Animated.Text
          style={[
            styles.dateText,
            isSelected && styles.selectedDateText,
            {
              transform: [{ scale: scaleAnimation }],
            },
          ]}
        >
          {item.toString()}
        </Animated.Text>
      </View>
    </TouchableOpacity>
  );
});

const DatesList = React.memo(DatesList_);

export default DatesList;
