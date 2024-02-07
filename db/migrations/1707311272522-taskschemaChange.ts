import { MigrationInterface, QueryRunner } from "typeorm";

export class TaskschemaChange1707311272522 implements MigrationInterface {
    name = 'TaskschemaChange1707311272522'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tasks" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "projectName" character varying NOT NULL, "prioriyt" text NOT NULL, "descreption" character varying NOT NULL, "status" text NOT NULL, "createdAt" TIMESTAMP NOT NULL, "updatedAt" TIMESTAMP NOT NULL, "timeTaken" TIMESTAMP NOT NULL, "assignedUserId" uuid, CONSTRAINT "PK_8d12ff38fcc62aaba2cab748772" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD CONSTRAINT "FK_cf34ff7f1de7b973b7ad5f536de" FOREIGN KEY ("assignedUserId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" DROP CONSTRAINT "FK_cf34ff7f1de7b973b7ad5f536de"`);
        await queryRunner.query(`DROP TABLE "tasks"`);
    }

}
