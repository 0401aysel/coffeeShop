import { useEffect, useState } from "react";
import Cart from "./Cart";
import CoffeeList from "./CoffeeList";
import Toast from "./Toast";
import { DataContext } from "./StoredDataContext";

interface IData {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  desc: string;
}
type TNoteType = "add" | "remove" | "success" | "reset";

type TNote = {
  id: number;
  type: TNoteType;
  text: string;
};

function App() {
  const [allData, setAllData] = useState<IData[]>([]);
  const [added, setAdded] = useState<number[]>([]);
  const [note, setNote] = useState<TNote[]>([]);

  const addToast = (text: string, type: TNoteType) => {
    const id = Date.now();

    setNote((prev) => [...prev, { id, text, type }]);

    const timer = setTimeout(() => {
      setNote((prev) => prev.filter((n) => n.id !== id));
    }, 2000);

    return () => clearTimeout(timer);
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/products.json");
        const data = await res.json();
        setAllData(data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <>
      <DataContext.Provider
        value={{
          allData,
          setAllData,
          added,
          setAdded,
          note,
          setNote,
          addToast,
        }}
      >
        <h1>Welcome to CoffeeShop</h1>
        <div className="coffeePage">
          <div className="gridSystem">
            <CoffeeList />
            <Cart />
          </div>
          <Toast />
        </div>
      </DataContext.Provider>
    </>
  );
}

export default App;
