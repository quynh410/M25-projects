export interface Cart{
    id: number,
    user_id: number,
    products: {
        id:number,
        product_id:number,
        categoryId:number,
        product_name:string,
        description:string,
        unit_price:number,
        rating:string,
        quantity:number,
        image:string,
        created_at:string,
        update_at:string
        discount:string
        brand: string,
        product_code: string,
        availability: string,
    },
}