import { MigrationInterface, QueryRunner } from "typeorm";

export class TaskentityChanges1707470625480 implements MigrationInterface {
    name = 'TaskentityChanges1707470625480'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" ADD "showTimeTaken" character varying`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "timeTaken"`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD "timeTaken" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "timeTaken"`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD "timeTaken" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "showTimeTaken"`);
    }

}
