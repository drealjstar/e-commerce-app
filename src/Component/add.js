export const getTotal = (cart) =>{
let price= 0;
cart.map((prod) =>{

price = price + prod.price  * prod.quantity;
 
});

return  price 
}
