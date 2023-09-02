import {AdEntity, NewAdEntity} from "../types";
import {ValidationError} from "../utils/errors";
import {pool} from "../utils/db";
import {FieldPacket} from "mysql2";
import {v4 as uuid} from 'uuid'

type AdRecordResults = [AdEntity[], FieldPacket[]]

export class AdRecord implements AdEntity{
    id: string;
    name: string;
    description: string;
    price: number;
    url: string;
    lat: number;
    lon: number;

    constructor(obj:NewAdEntity) {

        if(!obj.name || obj.name.length  > 50){
            throw new ValidationError("Nazwa ogłoszenia nie może być pusta ani przekraczać 50 znaków!")
        }
        if(obj.description.length > 1000){
            throw new ValidationError("Treść ogłoszenia nie może przekaraczać 1000 znakow!")
        }
        if(obj.price < 0 || obj.price > 9999){
            throw new ValidationError("Cena nie może być mniejsza niż 0 ani przekraczać 9999zł!")
        }
        if(!obj.url || obj.url.length  > 100){
            throw new ValidationError("Link ogłoszenia nie może być pusty ani przekraczać 100 znaków!")
        }
        if(typeof obj.lon !== 'number' || typeof obj.lat !== 'number'){
            throw new ValidationError("Nie można zlokalizować ogłoszenia.")
        }

        this.id = obj.id ? obj.id : uuid();
        this.name = obj.name;
        this.description = obj.description;
        this.price = obj.price;
        this.url = obj.url;
        this.lon = obj.lon;
        this.lat = obj.lat;
    }

    static async getOne(id: string):Promise<AdRecord|null> {
        const [results] = await pool.execute("Select * FROM `ads` WHERE id = :id",{
            id:id,
        }) as AdRecordResults;

        return results.length === 0 ? null : new AdRecord(results[0])
    }

    async addOne():Promise<AdRecord> {
        const newEntity = {
            id: this.id,
            name: this.name,
            description: this.description,
            price: this.price,
            url: this.url,
            lon: this.lon,
            lat: this.lat,
        };

        await pool.execute(
            "INSERT INTO `ads` (`id`, `name`, `description`, `price`, `url`, `lat`, `lon`) VALUES (:id,:name,:description,:price,:url,:lon,:lat)",
            newEntity
        )

        return new AdRecord(newEntity);
    }

    static async listBySearch(search: string):Promise<AdRecord[]|null> {
        const [results] = await pool.execute("Select * FROM `ads` WHERE `name` LIKE :name",{
            name: '%'+search+'%',
        }) as AdRecordResults;

        return results.length === 0 ? null : results.map(result => new AdRecord(result))
    }
}