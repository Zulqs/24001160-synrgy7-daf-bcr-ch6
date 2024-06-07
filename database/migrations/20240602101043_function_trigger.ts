import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.raw(`
        CREATE OR REPLACE FUNCTION cars_crud_log_function() RETURNS TRIGGER AS $$
        BEGIN
        IF TG_OP = 'INSERT' THEN
            INSERT INTO cars_crud_log (user_id, user_name, process, name, price, availabillity, start_rent, end_rent, pict, "created_At", "updated_At", "deleted_At")
            VALUES (NEW.user_id, (SELECT name FROM users WHERE id = NEW.user_id), 'insert', NEW.name, NEW.price, NEW.availabillity, NEW.start_rent, NEW.end_rent, NEW.pict, NEW."created_At", NEW."updated_At", null);
        ELSIF TG_OP = 'UPDATE' THEN
            INSERT INTO cars_crud_log (user_id, user_name, process, name, price, availabillity, start_rent, end_rent, pict, "created_At", "updated_At", "deleted_At")
            VALUES (NEW.user_id, (SELECT name FROM users WHERE id = NEW.user_id), 'update', NEW.name, NEW.price, NEW.availabillity, NEW.start_rent, NEW.end_rent, NEW.pict, NEW."created_At", NEW."updated_At", null);
        ELSIF TG_OP = 'DELETE' THEN
            INSERT INTO cars_crud_log (user_id, user_name, process, name, price, availabillity, start_rent, end_rent, pict, "created_At", "updated_At", "deleted_At")
            VALUES (OLD.user_id, (SELECT name FROM users WHERE id = OLD.user_id), 'delete', OLD.name, OLD.price, OLD.availabillity, OLD.start_rent, OLD.end_rent, OLD.pict, OLD."created_At", OLD."updated_At", current_timestamp);
        END IF;
        RETURN NULL;
        END;
        $$ LANGUAGE plpgsql;
    `)
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.raw(`
        DROP FUNCTION IF EXISTS cars_crud_log_function() CASCADE;
    `);
}

