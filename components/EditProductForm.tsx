import { useState } from "react";


export default function EditProductForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number>(0)



  
  return (
    <div>
      <h2>Edit Product Info</h2>
      <form action="">
      <p>{product.name}</p>
      <p>{product.description}</p>
      <p>{product.price}</p>
      <button
        onClick={() => {
          handleFav(product.id);
        }}
      >
        {isFaved ? "Faved" : "not faved :("}
      </button>
      </form>
    </div>
  );
}
