import { Db_DataSource } from "./dataSource";

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = Db_DataSource;
      console.log('Iniciando o DataSource...');
      await dataSource.initialize();
      console.log('Iniciado com sucesso!');
      return dataSource; 
    },
  },
];
