import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('users', (table: Knex.TableBuilder) => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('email').notNullable().unique();
        table.string('password').notNullable();
        table.string('role').notNullable();
        table.timestamp('created_At').nullable();
        table.timestamp('updated_At').nullable();
        table.timestamp('deleted_At').nullable();
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('users');
}

