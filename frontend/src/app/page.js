"use client";

import { useEffect, useState } from "react";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [bookName, setBookName] = useState("");
  const [description, setDescription] = useState("");

  const endpoint = "http://localhost:8000/book";

  const options = [
    {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    },
    {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ bookName, description }),
    },
    (id) => ({
      method: "DELETE",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    }),
  ];

  const getBooks = async () => {
    try {
      const response = await fetch(endpoint, options[0]);
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error("GET ERROR:", error);
    }
  };

  useEffect(() => {
    getBooks();
  }, []);

  const addBook = async () => {
    if (!bookName.trim()) return;
    try {
      await fetch(endpoint, options[1]);
      setBookName("");
      setDescription("");
      getBooks();
    } catch (error) {
      console.error("POST ERROR:", error);
    }
  };

  const deleteBook = async (id) => {
    try {
      await fetch(endpoint, options[2](id));
      getBooks();
    } catch (error) {
      console.error("DELETE ERROR:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto my-10 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-6 shadow-xl font-sans transition-all">
      <div className="flex flex-col gap-5">
        <h2 className="text-xl font-bold text-slate-800 dark:text-zinc-100">
          Book Library
        </h2>

        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Enter your book name..."
            value={bookName}
            onChange={(e) => setBookName(e.target.value)}
            className="w-full border border-zinc-500 p-2.5 rounded-lg text-sm text-white  bg-zinc-600"
          />
          <input
            type="text"
            placeholder="Enter your description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-zinc-500 p-2.5 rounded-lg text-sm text-white  bg-zinc-600"
          />
          <button
            onClick={addBook}
            here
            className="w-full rounded-lg bg-sky-700 hover:bg-sky-800 active:scale-95 px-4 py-2.5 text-sm text-white font-semibold shadow-md shadow-sky-900/10 transition-all cursor-pointer"
          >
            Add Book
          </button>
        </div>

        <div className="flex flex-col gap-2.5 pt-2 border-t border-slate-100 dark:border-zinc-800">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
            Collection ({books?.length || 0})
          </h3>
          {books?.map((bookItem) => (
            <div
              key={bookItem._id}
              className="flex items-start justify-between bordeborder-zinc-800 bg-zinc-800/40  rounded-lg px-4 py-3 shadow-xs transition-colors"
            >
              <div className="flex flex-col gap-1 pr-2">
                <span className="text-sm font-semibold text-slate-800 dark:text-zinc-100">
                  {bookItem.bookName}
                </span>
                {bookItem.description && (
                  <span className="text-xs text-slate-500 dark:text-zinc-400">
                    {bookItem.description}
                  </span>
                )}
              </div>
              <button
                onClick={() => deleteBook(bookItem._id)}
                className="text-xs text-red-600 hover:text-red-800 bg-red-100 hover:bg-red-200 font-semibold px-2.5 py-1 rounded transition-colors cursor-pointer shrink-0"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
