import {createPool} from "mysql2/promise";

export const pool = createPool({
    host: 'localhost',
    user:'root',
    database:'megak_mapp-app',
    namedPlaceholders: true,
    decimalNumbers:true,
})