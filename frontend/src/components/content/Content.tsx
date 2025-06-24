import React, { useCallback, useLayoutEffect, useState } from 'react';
import {
  FlatList,
  Image,
  ListRenderItem,
  PermissionsAndroid,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  FileToCopy,
  keepLocalCopy,
  NonEmptyArray,
  pick,
} from '@react-native-documents/picker';

import NoContent from '../../assets/noContent.svg';
import Add from '../../assets/add.svg';
import Arrow from '../../assets/arrow.svg';

import styles from './Content.styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import useDiary from '../../hooks/useDiary.ts';
import { Entry } from '../../types/Diary.types.ts';
import { generateRandomFileName } from '../../helpers/Files.ts';
import useLoading from '../../hooks/useLoading.ts';

const Content_: React.FC = () => {
  const { setIsLoading, isLoading } = useLoading();
  const [entry, setEntry] = useState<Entry | null>(null);
  const { createEntry, currentDate, getEntryByDate } = useDiary();

  const onPressAdd = useCallback(async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_MEDIA_LOCATION,
        {
          title: 'AiAgentsTool Media location permission',
          message:
            'AiAgentsTool needs access to your media location ' +
            'so we can generate better descriptions for your images.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );

      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        return;
      }
    }
    try {
      const result = await pick({
        allowMultiSelection: true,
        type: ['image/jpg', 'image/jpeg', 'image/png'],
        allowVirtualFiles: false,
        mode: 'open',
      });

      if (result.length) {
        setIsLoading(true);
        const filesList: NonEmptyArray<FileToCopy> = result.map(r => ({
          uri: r.uri!,
          fileName:
            r.name ?? generateRandomFileName(r.uri.split('.').pop() || 'jpg'),
        })) as NonEmptyArray<FileToCopy>;

        const localCopy = await keepLocalCopy({
          files: filesList,
          destination: 'documentDirectory',
        });

        await createEntry(
          currentDate,
          localCopy.map(c => (c as { localUri: string }).localUri),
        );
        const newEntry = await getEntryByDate(currentDate);
        setEntry(newEntry);
      }
    } catch (error) {
      console.error('Error requesting permissions:', error);
    } finally {
      setIsLoading(false);
    }
  }, [createEntry, currentDate, getEntryByDate, setIsLoading]);

  const renderItem: ListRenderItem<string> = ({ item }) => {
    return (
      <Image style={styles.image} resizeMode="cover" source={{ uri: item }} />
    );
  };

  useLayoutEffect(() => {
    getEntryByDate(currentDate).then(setEntry);
  }, [currentDate, getEntryByDate]);

  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      {entry ? (
        <FlatList
          data={entry.images}
          renderItem={renderItem}
          keyExtractor={item => item}
          numColumns={2}
          contentContainerStyle={styles.contentContainer}
          columnWrapperStyle={styles.columnContainer}
          style={styles.flatList}
          ListFooterComponent={
            <Text style={styles.text}>{entry.description}</Text>
          }
        />
      ) : (
        <>{!isLoading && <NoContentComponent onPressAdd={onPressAdd} />}</>
      )}
    </SafeAreaView>
  );
};

const NoContentComponent: React.FC<{
  onPressAdd: () => void;
}> = ({ onPressAdd }) => {
  return (
    <View style={styles.noContentContainer}>
      <NoContent style={styles.noContentSvg} />
      <Text style={styles.noContentText}>
        No content to display.{'\n'}Try adding some pictures!
      </Text>
      <View style={styles.floatingButtonContainer}>
        <Arrow style={styles.arrow} />
        <TouchableOpacity style={styles.floatingButton} onPress={onPressAdd}>
          <Add style={styles.add} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Content = React.memo(Content_);

export default Content;
