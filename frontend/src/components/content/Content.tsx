import React from 'react';
import { Text, View } from 'react-native';

import NoContent from '../../assets/noContent.svg';

import styles from './Content.styles';

const Content_: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.noContentContainer}>
        <NoContent style={styles.noContentSvg} />
        <Text style={styles.noContentText}>No content to display</Text>
      </View>
    </View>
  );
};

const Content = React.memo(Content_);

export default Content;
