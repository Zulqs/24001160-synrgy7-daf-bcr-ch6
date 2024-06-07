import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    await knex("cars").del();

    await knex("cars").insert([
        {   user_id: 1,
            name: "Angkot", 
            price: 123, 
            availabillity: true, 
            start_rent: knex.fn.now(), 
            end_rent: knex.fn.now(), 
            pict: "angkot.jpg", 
            created_At: knex.fn.now(), 
            updated_At: knex.fn.now(), 
            deleted_At: null 
        },
        {   user_id: 2, 
            name: "Bajaj", 
            price: 123, 
            availabillity: false, 
            start_rent: knex.fn.now(), 
            end_rent: knex.fn.now(), 
            pict: "bajaj.jpg", 
            created_At: knex.fn.now(), 
            updated_At: knex.fn.now(), 
            deleted_At: null 
        }
    ]);
};
