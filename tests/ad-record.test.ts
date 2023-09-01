import {AdRecord} from "../records/ad.record";

const defaultObj = {
    name:'TestName',
    description:'Dc...',
    url:'https://wp.pl',
    price: 0,
    lat: 9,
    lon: 9,
}

test('Can build AdRecord', ()=>{
    const ad = new AdRecord(defaultObj);

    expect(ad.name).toBe('TestName')
    expect(ad.description).toBe('Dc...')
})

//All Validation tests

test('Validate invalid Price', ()=>{
    expect(()=> new AdRecord({
        ...defaultObj,
        price: -2,
    })).toThrow("Cena nie może być mniejsza niż 0 ani przekraczać 9999zł!")
})
test('Validate invalid Name', ()=>{
    expect(()=> new AdRecord({
        ...defaultObj,
        name: '',
    })).toThrow("Nazwa ogłoszenia nie może być pusta ani przekraczać 50 znaków!")
})
test('Validate invalid Description', ()=>{
    expect(()=> new AdRecord({
        ...defaultObj,
        description:
            'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX' +
            'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX' +
            'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX' +
            'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX' +
            'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX' +
            'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX' +
            'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX' +
            'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX' +
            'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX' +
            'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    })).toThrow("Treść ogłoszenia nie może przekaraczać 1000 znakow!")
})
test('Validate invalid URL', ()=>{
    expect(()=> new AdRecord({
        ...defaultObj,
        url: '',
    })).toThrow("Link ogłoszenia nie może być pusty ani przekraczać 100 znaków!")
})