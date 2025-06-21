import React, { useCallback, useEffect, useMemo } from 'react';
import {
  FlatList,
  ListRenderItem,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Chevron from '../../assets/chevron.svg';

import styles from './DatesList.styles';

interface Props {
  currentDate: Date;
  onDateChange: (date: Date) => void;
}

const DatesList_: React.FC<Props> = ({ currentDate, onDateChange }) => {
  const flatListRef = React.useRef<FlatList<Number>>(null);

  const datesList = useMemo(() => {
    const daysInMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0,
    ).getDate();

    return new Array(daysInMonth).fill(null).map((_, index) => index + 1);
  }, [currentDate]);

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
      <TouchableOpacity onPress={() => onPressDate(index + 1)}>
        <View style={styles.dateContainer}>
          <Text
            style={[styles.dateText, isSelected && styles.selectedDateText]}
          >
            {item.toString()}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    flatListRef.current?.scrollToIndex({
      index: currentIndex,
      animated: true,
    });
  }, [currentIndex]);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.chevronTouchable}
          onPress={() => onPressDate(currentIndex)}
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
          contentContainerStyle={styles.contentContainer}
          initialScrollIndex={currentIndex}
          getItemLayout={(data, index) => ({
            length: 40, // Height of each item
            offset: 40 * index, // Height of each item multiplied by the index
            index,
          })}
          extraData={currentIndex}
        />
        <TouchableOpacity
          style={styles.chevronTouchable}
          onPress={() => onPressDate(currentIndex + 2)}
        >
          <Chevron style={[styles.chevron]} />
        </TouchableOpacity>
      </View>
      <View style={styles.dot} />
    </View>
  );
};

const DatesList = React.memo(DatesList_);

export default DatesList;
