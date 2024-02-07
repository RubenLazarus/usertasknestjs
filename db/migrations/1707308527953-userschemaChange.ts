import { MigrationInterface, QueryRunner } from "typeorm";

export class UserschemaChange1707308527953 implements MigrationInterface {
    name = 'UserschemaChange1707308527953'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "profileImage" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "updatedAt" TIME WITH TIME ZONE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "updatedAt" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "profileImage" SET NOT NULL`);
    }

}
