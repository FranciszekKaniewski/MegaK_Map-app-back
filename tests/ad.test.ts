import {AdRecord} from "../records/ad.record";
import {pool} from "../utils/db";

afterAll(async () =>{
    await pool.end();
})

test('AdRecord return data from database for one entry', async () =>{
    const ad = await AdRecord.getOne('abc')

    console.log(ad)

    expect(ad).toBeDefined();
    expect(ad.id).toBe('abc');
    expect(ad.name).toBe('Test');
})

test('AdRecord return null from unexisting entry', async ()=>{
    const ad = await AdRecord.getOne('XXX');

    expect(ad).toBe(null)
})

test('AdRecord add record and return added entry', async ()=>{
    const newRecord:AdRecord = new AdRecord({
        name:"AddTest",
        description:'',
        price:0,
        url:'https://localhost',
        lat:0,
        lon:0,
    })

    console.log(newRecord)

    expect(newRecord).toBeInstanceOf(AdRecord)

    const ad = await newRecord.addOne()

    expect(ad).toBeDefined();
    expect(ad).toBeInstanceOf(AdRecord)
    expect(ad.id).toBeDefined();
})


test('AdRecord list search records', async ()=>{
    const ads = await AdRecord.listBySearch('Test')

    expect(ads).toBeDefined();
    expect(ads).toBeInstanceOf(Array)
    ads.map(ad=>{
        expect(ad).toBeDefined();
        expect(ad).toBeInstanceOf(AdRecord)
        expect(ad.id).toBeDefined();
    })
})
test('AdRecord list empty search', async ()=> {
    const ads = await AdRecord.listBySearch('#')

    expect(ads).toBe(null);
})