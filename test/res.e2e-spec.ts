import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { ResModule } from './../src/res/res.module';
import { DataSource } from 'typeorm';

export function getDBConnection(): Promise<DataSource> {
  const dataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });
  return dataSource.initialize();
}

describe('ResController (e2e)', () => {
  let Res: INestApplication;
  let dataSource: DataSource;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ResModule],
    }).compile();

    Res = moduleFixture.createNestApplication();

    dataSource = await getDBConnection();

    await Res.init();
  });

  it('/ (GET)', () => {
    return request(Res.getHttpServer())
      .get('/')
      .expect(200)
      .expect('This action adds a new re');
  });

  it('Select from dataSource', async () => {
    const res = await dataSource.query('select 1 from testtable');
  });

  afterAll(async () => {
    await dataSource.destroy();
    await Res.close();
  });
});
