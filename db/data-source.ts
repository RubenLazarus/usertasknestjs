import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  password: 'u@123',
  username: 'postgres',
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/db/migrations/*.js'],
  database: 'task',
  synchronize: false,
  logging: false,
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
