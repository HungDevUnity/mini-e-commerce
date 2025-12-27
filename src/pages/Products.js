import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Lỗi tải sản phẩm:", err);
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.push({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: 1,
    });

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Đã thêm vào giỏ hàng");
  };

  if (loading) {
    return <p style={{ textAlign: "center" }}>Đang tải...</p>;
  }

  if (!product) {
    return <p style={{ textAlign: "center" }}>Không tìm thấy sản phẩm</p>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <img
          src={product.image}
          alt={product.title}
          style={styles.image}
        />

        <div style={styles.info}>
          <h2>{product.title}</h2>

          <p style={styles.description}>
            {product.description}
          </p>

          <p style={styles.price}>
            ${product.price}
          </p>

          <button
            style={styles.button}
            onClick={handleAddToCart}
          >
            Thêm vào giỏ hàng
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;

const styles = {
  container: {
    padding: "24px",
    minHeight: "100vh",
    backgroundColor: "#f5f6fa",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: "10px",
    padding: "24px",
    display: "flex",
    gap: "32px",
    maxWidth: "900px",
    boxShadow: "0 6px 16px rgba(0,0,0,0.15)",
  },

  image: {
    width: "300px",
    height: "400px",
    objectFit: "contain",
  },

  info: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },

  description: {
    margin: "16px 0",
    lineHeight: "1.6",
    color: "#555",
  },

  price: {
    fontSize: "22px",
    fontWeight: "bold",
    color: "#27ae60",
    marginBottom: "20px",
  },

  button: {
    width: "200px",
    padding: "12px",
    fontSize: "16px",
    fontWeight: "600",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    backgroundColor: "#e67e22",
    color: "#fff",
  },
};

