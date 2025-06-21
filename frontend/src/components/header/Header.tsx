import React, { useMemo, useState } from 'react';
import { Text } from 'react-native';
import styles from './Header.styles';
import { SafeAreaView } from 'react-native-safe-area-context';

const Header_: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const formattedDate = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.toLocaleString('default', { month: 'long' });

    return `${year}, ${month}`;
  }, [currentDate]);
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Text style={styles.title}>{formattedDate}</Text>
    </SafeAreaView>
  );
};

const Header = React.memo(Header_);

export default Header;
