import {AdRecord} from "../records/ad.record";

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