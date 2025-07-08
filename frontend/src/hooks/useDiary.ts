import { useCallback, useContext } from 'react';
import { DateContext } from '../contexts/DateContext.tsx';
import NitroSqlite from '../lib/NitroSqlite.ts';
import { DiaryEntry, DiaryImage } from '../types/Database.types.ts';
import { Entry } from '../types/Diary.types.ts';
import { generateReport } from '../service/api.ts';
import { deleteFile } from '../helpers/Files.ts';

const useDiary = () => {
  const { currentDate, setCurrentDate } = useContext(DateContext);

  const getImagesByEntryId = useCallback(async (id: number) => {
    const result = await NitroSqlite.executeAsync(
      'SELECT * FROM diary_images WHERE diary_id = ?',
      [id],
    );

    return result?.rows?._array ?? [];
  }, []);

  const getEntryByDate = useCallback(
    async (date: Date): Promise<Entry | null> => {
      const result = await NitroSqlite.executeAsync(
        'SELECT * FROM diary WHERE date_time = ?',
        [date.toDateString()],
      );

      if (result.rows?.length) {
        const row = result.rows.item(0)! as unknown as DiaryEntry;

        const imagesResult = await getImagesByEntryId(row.id);

        const entry: Entry = {
          ...row,
          images: [],
        };

        entry.images =
          imagesResult.map(image => {
            const { uri } = image as unknown as DiaryImage;

            return uri;
          }) ?? [];

        return entry;
      }

      return null;
    },
    [getImagesByEntryId],
  );

  const deleteImagesByEntryId = useCallback(async (id: number) => {
    await NitroSqlite.executeAsync(
      'DELETE FROM diary_images WHERE diary_id = ?',
      [id],
    );
  }, []);

  const saveImagesForEntry = useCallback(
    async (images: string[], entryId: number) => {
      console.log('images', images);
      const batch = images.map(image => ({
        query: 'INSERT INTO diary_images (uri, diary_id) VALUES (?, ?)',
        params: [image, entryId],
      }));

      console.log('batch', batch);

      await NitroSqlite.executeBatchAsync(batch);
    },
    [],
  );

  const getImagesDescription = useCallback(async (images: string[]) => {
    const { data } = await generateReport(images);
    console.log('data', data);

    return data;
  }, []);

  const createEntry = async (date: Date, images: string[]) => {
    const { summary } = await getImagesDescription(images);

    const result = await getEntryByDate(date);

    if (!result) {
      const entry = await NitroSqlite.executeAsync(
        'INSERT INTO diary (date_time, description) VALUES (?, ?)',
        [date.toDateString(), summary],
      );
      const id = entry.insertId;
      await saveImagesForEntry(images, id!);
    } else {
      const id = result.id;
      await NitroSqlite.executeAsync(
        'UPDATE diary SET description = ? WHERE id = ?',
        [summary, id],
      );
      const imagesResult = await getImagesByEntryId(id);
      await Promise.all(
        imagesResult.map(image => deleteFile(String(image!.uri))),
      );
      await deleteImagesByEntryId(id);
      await saveImagesForEntry(images, id);
    }
  };

  return {
    currentDate,
    setCurrentDate,
    createEntry,
    getEntryByDate,
  };
};

export default useDiary;
