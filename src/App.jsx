import { useState } from "react";
import "./App.css";
import { taiwanItems } from "./data/taiwanItem";

const categories = ["全体", "食物", "観光地", "祭り", "文化", "自然"];

function App() {
  const [activeCategory, setActiveCategory] = useState("全体");
  const [selectedItem, setSelectedItem] = useState(null);

  const filteredItems =
    activeCategory === "全体"
      ? taiwanItems
      : taiwanItems.filter((item) => item.category === activeCategory);

  return (
    <div className="app">
      <h1 className="title">台湾ガイド</h1>

      <nav className="tabs">
        {categories.map((category) => (
          <button
            key={category}
            className={activeCategory === category ? "tab active" : "tab"}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </nav>

      <div className="table">
        <div className="table-header">
          <div>順位</div>
          <div>名称</div>
          <div>カテゴリー</div>
          <div>知名度</div>
          <div>季節</div>
          <div>地域</div>
        </div>

        {filteredItems.map((item, index) => (
          <div
            key={item.id}
            className="table-row"
            onClick={() => setSelectedItem(item)}
          >
            <div>{index + 1}</div>

            <div className="name-cell">
              <img src={item.image} alt={item.name} />
              <span>{item.name}</span>
            </div>

            <div>{item.type}</div>
            <div>{item.popularity.toFixed(1)}</div>
            <div>{item.season}</div>
            <div>{item.area}</div>
          </div>
        ))}
      </div>

      {selectedItem && (
        <div className="modal-bg" onClick={() => setSelectedItem(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="close-button"
              onClick={() => setSelectedItem(null)}
            >
              ×
            </button>

            <img
              className="modal-image"
              src={selectedItem.image}
              alt={selectedItem.name}
            />

            <h2>{selectedItem.name}</h2>

            <p className="modal-category">{selectedItem.category}</p>

            <p>{selectedItem.description}</p>

            <div className="detail-list">
              <div>
                <span>おすすめ度</span>
                <strong>{selectedItem.recommend.toFixed(1)}</strong>
              </div>
              <div>
                <span>知名度</span>
                <strong>{selectedItem.popularity.toFixed(1)}</strong>
              </div>
              <div>
                <span>季節</span>
                <strong>{selectedItem.season}</strong>
              </div>
              <div>
                <span>地域</span>
                <strong>{selectedItem.area}</strong>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
