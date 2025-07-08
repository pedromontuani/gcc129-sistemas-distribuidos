import React, { useMemo } from 'react';
import { Text } from 'react-native';
import styles from './Header.styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import DatesList from '../datesList/DatesList.tsx';
import useDiary from '../../hooks/useDiary.ts';

const Header_: React.FC = () => {
  const { currentDate, setCurrentDate } = useDiary();

  const formattedDate = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.toLocaleString('default', { month: 'long' });

    return `${year}, ${month}`;
  }, [currentDate]);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Text style={styles.title}>{formattedDate}</Text>
      <DatesList currentDate={currentDate} onDateChange={setCurrentDate} />
    </SafeAreaView>
  );
};

const Header = React.memo(Header_);

export default Header;
