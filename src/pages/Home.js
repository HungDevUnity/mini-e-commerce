import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Lỗi khi gọi API:", error);
        setLoading(false);
      });
  }, []);

  const handleViewDetail = (id) => {
    navigate(`/products/${id}`);
  };

  if (loading) {
    return <p style={{ textAlign: "center" }}>Đang tải sản phẩm...</p>;
  }
   
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Danh sách sản phẩm</h2>

      <div style={styles.grid}>
        {products.map((product) => (
          <div key={product.id} style={styles.card}>
            <img
              src={product.image}
              alt={product.title}
              style={styles.image}
            />

            <h4 style={styles.name}>
              {product.title}
            </h4>

            <p style={styles.price}>
              ${product.price}
            </p>

            <button
              style={styles.button}
              onClick={() => handleViewDetail(product.id)}
            >
              Xem chi tiết
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;

const styles = {
  container: {
    padding: "24px",
    backgroundColor: "#f5f6fa",
    minHeight: "100vh",
  },

  title: {
    textAlign: "center",
    marginBottom: "24px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: "20px",
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: "10px",
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },

  image: {
    width: "120px",
    height: "160px",
    objectFit: "contain",
    marginBottom: "12px",
  },

  name: {
    fontSize: "14px",
    textAlign: "center",
    minHeight: "40px",
  },

  price: {
    fontWeight: "bold",
    margin: "8px 0",
    color: "#27ae60",
  },

  button: {
    marginTop: "auto",
    padding: "8px 12px",
    border: "none",
    borderRadius: "6px",
    backgroundColor: "#3498db",
    color: "#fff",
    cursor: "pointer",
    fontSize: "14px",
  },
};

