import React, { useCallback, useLayoutEffect, useState } from 'react';
import {
  FlatList,
  Image,
  ListRenderItem,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import NoContent from '../../assets/noContent.svg';
import Add from '../../assets/add.svg';
import Arrow from '../../assets/arrow.svg';

import styles from './Content.styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { launchImageLibrary } from 'react-native-image-picker';
import useDiary from '../../hooks/useDiary.ts';
import { Entry } from '../../types/Diary.types.ts';
import { saveFile } from '../../helpers/Files.ts';

const Content_: React.FC = () => {
  const [entry, setEntry] = useState<Entry | null>(null);
  const { createEntry, currentDate, getEntryByDate } = useDiary();

  const onPressAdd = useCallback(() => {
    launchImageLibrary(
      {
        includeBase64: false,
        mediaType: 'photo',
        quality: 0.6,
        selectionLimit: 5,
        restrictMimeTypes: ['image/png', 'image/jpeg', 'image/jpg'],
      },
      async result => {
        if (result.didCancel || !result.assets || result.assets.length === 0) {
          return;
        }
        const batchSaving = result.assets.map(asset =>
          saveFile(asset.uri!, asset.fileName!),
        );
        const images = await Promise.all(batchSaving);
        await createEntry(
          currentDate,
          images,
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        );
        const newEntry = await getEntryByDate(currentDate);
        setEntry(newEntry);
      },
    );
  }, [createEntry, currentDate, getEntryByDate]);

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
      {!entry ? (
        <NoContentComponent onPressAdd={onPressAdd} />
      ) : (
        <FlatList
          data={entry.images}
          renderItem={renderItem}
          keyExtractor={item => item}
          numColumns={2}
          contentContainerStyle={styles.contentContainer}
          style={styles.flatList}
          ListFooterComponent={
            <Text style={styles.text}>{entry.description}</Text>
          }
        />
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
