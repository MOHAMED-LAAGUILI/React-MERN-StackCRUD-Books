import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Books() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get("http://localhost:3010");
        console.log(res.data);
        setBooks(res.data);
      } catch (err) {
        console.warn(err);
      }
    };
    fetchAllBooks();
  }, []);

  const handleDelete = async (BookId) => {
    try {
      await axios.delete(`http://localhost:3010/Books/${BookId}`);
      window.location.reload();
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">Books</h1>
      <div className="row row-cols-1 row-cols-lg-3 g-4">
        {books.map((book) => (
          <div className="col" key={book.id}>
            <div className="card h-100">
              {book.cover && (
                <img src={book.cover} alt="" className="card-img-top" />
              )}
              <div className="card-body">
                <h2 className="card-title">{`${book.id} - ${book.title}`}</h2>
                <p className="card-text">{`Description: ${book.description}`}</p>
                <p className="card-text">{`Price: ${book.price} $`}</p>
              </div>
              <div className="card-footer">
                <button
                  className="btn btn-danger me-2"
                  onClick={() => handleDelete(book.id)}
                >
                  Delete
                </button>
                <Link to={`/UpdateBook/${book.id}`}>
                  <button className="btn btn-success">Update</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-4">
      <Link to="/AddBook">
        <button className="btn btn-warning fw-bolder">Add Book</button>
        </Link>
      </div>
    </div>
  );
}
