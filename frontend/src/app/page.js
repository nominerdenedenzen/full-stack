"use client";

import axios from "axios";
import { useEffect, useState } from "react";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [bookName, setBookName] = useState("");

  const [updateID, setUpdateId] = useState(null);
  const [editBookName, setEditBookName] = useState("");

  const endpoint = "http://localhost:8000/book";

  const getBooks = async () => {
    try {
      const response = await axios.get(endpoint);
      console.log("axios get working", response.data);
      setBooks(response.data);
    } catch (error) {
      console.error("GET ERROR:", error);
    }
  };

  useEffect(() => {
    getBooks();
  }, []);

  const addBook = async () => {
    if (!bookName.trim()) return;
    const book = {
      bookName: bookName,
    };
    try {
      await axios.post(endpoint, book);
      console.log("axios addBook working:", book);
      setBookName("");
      getBooks();
    } catch (error) {
      console.error("POST ERROR", error);
    }
  };

  const deleteBook = async (id) => {
    try {
      await axios.delete(endpoint, { data: { id } });
      console.log("axios delete working for ID:", id);
      getBooks();
    } catch (error) {
      console.error("DELETE ERROR:", error);
    }
  };

  const updateBook = async (id) => {
    if (!editBookName.trim()) return;
    try {
      await axios.put(endpoint, { id, bookName: editBookName });
      console.log("axios update id", id);
      setUpdateId(null);
      setEditBookName("");
      getBooks();
    } catch (error) {
      console.log("PUT ERROR", error);
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
            className="w-full border border-zinc-500 p-2.5 rounded-lg text-sm text-white bg-zinc-600 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />

          <button
            onClick={addBook}
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
              className="flex items-center justify-between border-zinc-800 bg-zinc-800/40 rounded-lg px-4 py-3 shadow-xs transition-colors gap-3"
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

              <div className="flex flex-col gap-1.5">
                <input
                  placeholder="Enter new name"
                  value={editBookName}
                  type="text"
                  onChange={(e) => setEditBookName(e.target.value)}
                  className="px-2 py-1 border rounded-md text-xs bg-zinc-700 text-white border-zinc-600 focus:outline-none"
                />
                <button
                  onClick={() => updateBook(bookItem._id)}
                  className="w-full px-2.5 py-1 border rounded-md text-xs text-white bg-sky-600 hover:bg-sky-700 font-semibold cursor-pointer"
                >
                  Update
                </button>
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
