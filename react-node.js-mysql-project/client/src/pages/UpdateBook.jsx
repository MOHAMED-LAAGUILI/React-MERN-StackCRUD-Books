import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function UpdateBook() {
  const [book, setBook] = useState({
    title: "",
    description: "",
    price: null,
    cover: "",
    author: "",
  });

  const navigate = useNavigate();
  const { id } = useParams(); // get the book id from the URL parameter

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(`http://localhost:3010/Books/${id}`);
        setBook(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBook();
  }, [id]);

  const HandleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const HandleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3010/Books/${id}`, book);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">Update Book</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={book.title}
            onChange={HandleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            value={book.description}
            onChange={HandleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Price
          </label>
          <input
            type="number"
            className="form-control"
            id="price"
            name="price"
            value={book.price}
            onChange={HandleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cover" className="form-label">
            Cover
          </label>
          <input
            type="text"
            className="form-control"
            id="cover"
            name="cover"
            value={book.cover}
            onChange={HandleChange}
          />
        </div>
        <button type="button" className="btn btn-primary" onClick={HandleUpdate}>
          Update Book
        </button>
      </form>
    </div>
  );
}