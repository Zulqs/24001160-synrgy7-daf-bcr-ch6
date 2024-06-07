import { Model, ModelObject } from "objection";

export class CarsModel extends Model {
    id!: number;
    user_id!: number;
    name!: string;
    price!: number;
    availabillity!: boolean;
    start_rent!: Date;
    end_rent!: Date;
    pict!: string;
    created_At!: Date;
    updated_At!: Date;
    deleted_At!: Date | null;

    static get tableName() {
        return 'cars';
    }
}

export type User = ModelObject<CarsModel>;