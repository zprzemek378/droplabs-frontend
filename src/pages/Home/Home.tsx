import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [lastProductId, setLastProductId] = useState("");

  useEffect(() => {
    const value = localStorage.getItem("lastProductId");

    if (value) {
      setLastProductId(value);
    }
  }, []);

  return (
    <>
      {lastProductId ? (
        <Link to={`/product/${lastProductId}`}>
          Go to previously seen product
        </Link>
      ) : (
        <div>Not found previously seen product</div>
      )}
    </>
  );
};

export default Home;
