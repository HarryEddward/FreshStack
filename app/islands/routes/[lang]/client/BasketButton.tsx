import { ShoppingBasketIcon } from 'lucide-preact';


interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
};


export default function BasketButton({ open, setOpen }: Props) {
  return (
    <button onClick={() => setOpen(!open)}>
      <ShoppingBasketIcon/>
    </button>
  )

}

function BasketModal() {
  return (
    <div className={"absolute w-screen h-screen bg-black/10 flex justify-center items-center"}>
      <div className={"w-[80%] bg-white p-4"}>
        Hola
      </div>
    </div>
  )
}