import { MigrationInterface, QueryRunner } from "typeorm";

export class AutoMigration1763958360180 implements MigrationInterface {
    name = 'AutoMigration1763958360180'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "updatedAt" TO "updated_at"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "updated_at" TO "updatedAt"`);
    }

}
