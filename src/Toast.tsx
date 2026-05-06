import { useData } from "./StoredDataContext";

export default function Toast() {
  const context = useData();
  if (!context) return null;

  const { note } = context;

  return (
    <div className="toast-container">
      {note.map((item) => (
        <div key={item.id} className={`toast ${item.type}`}>
          {item.text}
        </div>
      ))}
    </div>
  );
}
