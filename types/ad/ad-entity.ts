export interface SimpleAdEntity {
    id: string;
    name:string;
    lat: number;
    lon: number;
}

export interface AdEntity extends SimpleAdEntity{
    description: string;
    price: number;
    url: string;
}

export interface NewAdEntity extends Omit<AdEntity,'id'> {
    id?: string;
}