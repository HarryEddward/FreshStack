import { useShoppingStore } from '../../zustand/storeShopping.ts';

export default function ClientAppProductsTotalPriceToPay() {
  const { products } = useShoppingStore();

  // Calcular el precio total multiplicando cada precio por su cantidad
  const totalPrice = products.reduce((acc, product) => {
    return acc + product.price * product.number;
  }, 0);

  console.log(totalPrice.toFixed(2));

  return (
    <div className={"flex flex-row items-center px-2 py-2 font-bold"}>
      <span className={"text-3xl font-thin"}>Total Price: </span>
      <div className={""}>
        <span className={"text-3xl pl-2"}>
          {totalPrice.toFixed(2)}
        </span>
        <span className={"text-xl"}>€</span>
      </div>
    </div>
  );
}
