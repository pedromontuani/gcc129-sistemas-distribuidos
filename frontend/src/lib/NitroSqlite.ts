import { open } from 'react-native-nitro-sqlite';

const NitroSqlite = open({ name: 'myDb.sqlite' });

export const init = async () => {
  try {
    const sqlQueries = [
      {
        query:
          'CREATE TABLE IF NOT EXISTS diary (id INTEGER PRIMARY KEY, description TEXT, date_time TEXT)',
      },
      {
        query:
          'CREATE TABLE IF NOT EXISTS diary_images (id INTEGER PRIMARY KEY AUTOINCREMENT, uri TEXT, diary_id INTEGER, FOREIGN KEY(diary_id) REFERENCES diary(id))',
      },
    ];
    await NitroSqlite.executeBatchAsync(sqlQueries);
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
};

export default NitroSqlite;
