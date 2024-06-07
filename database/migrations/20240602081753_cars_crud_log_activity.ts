import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("cars_crud_log", (table: Knex.TableBuilder) => {
        table.increments('id').primary();
        table.integer('user_id', 10);
        table.string('user_name', 255);
        table.string('process', 20);
        table.string('name', 255);
        table.integer('price', 20);
        table.boolean('availabillity');
        table.timestamp('start_rent');
        table.timestamp('end_rent');
        table.text('pict');
        table.timestamp('created_At');
        table.timestamp('updated_At');
        table.timestamp('deleted_At').defaultTo(null);
    })
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("cars_crud_log");

}

