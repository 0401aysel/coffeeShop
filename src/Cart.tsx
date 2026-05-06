import { useState, useMemo } from "react";
import { useData } from "./StoredDataContext";

export default function Cart() {
  const context = useData();
  const [takeType, setTakeType] = useState("Dine in");
  const [table, setTable] = useState<number | null>(null);
  const { allData, added, setAdded, addToast } = context;

  const cartProducts = useMemo(() => {
    return allData.filter((p) => added.includes(p.id));
  }, [allData, added]);

  const totalOrder = useMemo(() => {
    return cartProducts.reduce((sum, item) => sum + item.price, 0);
  }, [cartProducts]);

  const tax = useMemo(() => {
    return takeType === "Dine in" ? totalOrder * 0.1 : 0;
  }, [totalOrder, takeType]);

  const deliveryFee = useMemo(() => {
    return takeType === "Delivery" ? 5 : 0;
  }, [takeType]);

  const total = useMemo(() => {
    return totalOrder + tax + deliveryFee;
  }, [totalOrder, tax, deliveryFee]);

  return (
    <>
      <div className="cart">
        <div className="cartButtons">
          <p>Order details</p>
          <button
            onClick={() => {
              setAdded([]);
              setTable(null);
              addToast("All products removed", "reset");
            }}
          >
            Reset
          </button>
          <div>
            <select
              value={takeType}
              onChange={(e) => setTakeType(e.target.value)}
            >
              <option value="Dine in">Dine in</option>
              <option value="Take Away">TakeAway</option>
              <option value="Delivery">Delivery</option>
            </select>
          </div>
        </div>
        <div className="addedList">
          {cartProducts.map((item) => (
            <div key={item.id}>
              <p>{item.name}</p>
              <img src={`/${item.image}`} />
            </div>
          ))}
        </div>
        <div className="checkout">
          <div className="total">
            <p>Total:</p>
            <p>{total}$</p>
          </div>
          <div className="total">
            <p>
              {takeType === "Dine in"
                ? "Tax:"
                : takeType === "Delivery"
                  ? "Delivery:"
                  : "Fee:"}
            </p>

            <p>
              {takeType === "Dine in"
                ? tax
                : takeType === "Delivery"
                  ? deliveryFee
                  : 0}
              $
            </p>
          </div>
          <div className="total">
            <p>Delivery:</p>
            <p>{deliveryFee}$</p>
          </div>
          <div className="takeType">
            <p>Orders</p>
            <p>{totalOrder}</p>
          </div>
          <div className={`table ${takeType === "Dine in" ? "show" : "hide"}`}>
            <p>Select table</p>
            <div className="dropdown">
              <select
                value={table ?? ""}
                onChange={(e) => setTable(Number(e.target.value))}
              >
                <option value="" disabled>
                  Select table
                </option>
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <option key={n} value={n}>
                    Table {n}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div
            className="pay"
            onClick={() => {
              setAdded([]);
              setTable(null);
              addToast("Success payment", "success");
            }}
          >
            Pay
          </div>
        </div>
      </div>
    </>
  );
}
