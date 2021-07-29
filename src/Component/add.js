export const getTotal = (cart) => {
    let price = 0;
    return cart.map((prod) => {

        price = price + prod.price * prod.quantity;

    });

    return price
}
