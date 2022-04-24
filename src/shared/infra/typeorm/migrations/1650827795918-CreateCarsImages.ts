import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateCarsImages1650827795918 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'cars_images',
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true },
          { name: 'image_name', type: 'varchar' },
          { name: 'car_id', type: 'uuid' },
          { name: 'created_at', type: 'timestamp', default: 'now()' },
        ],
        foreignKeys: [
          {
            name: 'fk_car',
            referencedTableName: 'cars',
            referencedColumnNames: ['id'],
            columnNames: ['car_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('cars_images');
  }
}
