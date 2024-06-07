import { Knex } from "knex";
import { hashPassword } from "../../app/utils/authUser";

export async function seed(knex: Knex): Promise<void> {
    await knex("users").del();
    const passSuperAdmin = await hashPassword("superadmin");
    const passAdmin = await hashPassword("admin");

    await knex("users").insert([
        {   name: "superadmin", 
            email: "superadmin@email.com", 
            password: passSuperAdmin, 
            role: "superadmin", 
            created_At: knex.fn.now(), 
            updated_At: knex.fn.now(), 
            deleted_At: null 
        },
        {   name: "admin", 
            email: "admin@email.com", 
            password: passAdmin, 
            role: "admin", 
            created_At: knex.fn.now(), 
            updated_At: knex.fn.now(), 
            deleted_At: null
        }
    ]);
};
