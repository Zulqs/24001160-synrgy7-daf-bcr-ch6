import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("cars", (table: Knex.TableBuilder) => {
        table.increments('id').primary();
        table.integer('user_id', 10).notNullable().references('id').inTable("users").onDelete("Cascade");
        table.string('name', 255).notNullable();
        table.integer('price', 20).notNullable();
        table.boolean('availabillity').notNullable().defaultTo(false);
        table.timestamp('start_rent').notNullable();
        table.timestamp('end_rent').notNullable();
        table.text('pict').notNullable();
        table.timestamp('created_At').nullable();
        table.timestamp('updated_At').nullable();
        table.timestamp('deleted_At').nullable();
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("cars");
}

