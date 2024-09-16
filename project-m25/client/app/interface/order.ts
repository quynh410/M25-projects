export interface Orders{
    order_id: number,
    user_id: number,
    total_price: number,
    order_details:[
        {
          order_detail_id: number,
          product_id: number,
          name:string,
          unit_price: number,
          order_quantity: number
        }
      ],
    receive_name:string,
    receive_address:string,
    receive_phone:string
}