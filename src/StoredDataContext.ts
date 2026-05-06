import { createContext, useContext } from "react";

interface IData {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  desc: string;
}
type TNote = {
  id: number;
  type: "add" | "remove" | "success" | "reset";
  text: string;
};
interface IDataContext {
  allData: IData[];
  setAllData: React.Dispatch<React.SetStateAction<IData[]>>;

  added: number[];
  setAdded: React.Dispatch<React.SetStateAction<number[]>>;

  note: TNote[];
  setNote: React.Dispatch<React.SetStateAction<TNote[]>>;

  addToast: (text: string, type?: TNote["type"]) => void;
}

export const DataContext = createContext<IDataContext | null>(null);

export const useData = () => {
  return useContext(DataContext);
};
