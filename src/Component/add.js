export const getTotal = (cart) => {
    let price = 0;
    cart.map((prod) => {

        return price = price + prod.price * prod.quantity;

    });

    return price
}


