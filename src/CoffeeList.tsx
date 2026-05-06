import { useState, useMemo } from "react";
import { useData } from "./StoredDataContext";

interface IData {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  desc: string;
}

export default function CoffeeList() {
  const context = useData();
  const { allData, added, setAdded, addToast } = context;
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const categories = useMemo(() => {
    if (!context) return [];

    return ["all", ...new Set(context.allData.map((item) => item.category))];
  }, [context?.allData]);

  const listData: IData[] = allData.filter((item) => {
    const matchCategory = category === "all" || item.category === category;
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  const toggleAdd = (id: number) => {
    setAdded((prev: number[]) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  return (
    <div className="classList">
      <div className="filter">
        <div className="buttons">
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={category === item ? "active" : ""}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="search">
          <input
            type="text"
            placeholder="Search . . ."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="productList">
        {listData.map((product) => (
          <div className="productItem" key={product.id}>
            <div className="productImg">
              <button className="moreBtn">More</button>
              <img src={`/${product.image}`} alt="" />
            </div>
            <p>{product.name}</p>
            <div className="productInfo">
              <p className="itemPrice">${product.price}</p>
              <button
                className={`${added.includes(product.id) ? "added" : ""}`}
                onClick={() => {
                  const isAdded = added.includes(product.id);
                  toggleAdd(product.id);
                  addToast(
                    `${product.name} ${isAdded ? "removed" : "added"}`,
                    isAdded ? "remove" : "add",
                  );
                }}
              >
                {added.includes(product.id) ? "x" : "+"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
