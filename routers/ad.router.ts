import {Router} from "express";
import {AdRecord} from "../records/ad.record";

export const adRouter = Router()

    .get('/search/:name?', async (req,res) =>{

        const ads = await AdRecord.listBySearch(req.params.name ?? '');

        res.json(ads);
    })

    .get('/:id', async (req,res)=>{
        const ad = await AdRecord.getOne(req.params.id);

        res.json(ad);
    })

    .post('/', async (req,res) =>{
        const ad = new AdRecord(req.body);
        await ad.add();
        res.json(ad);
    })