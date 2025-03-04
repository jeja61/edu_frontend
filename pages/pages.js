import React, { useEffect, useState } from "react";
import '../src/app/globals.css'; // Убедитесь, что путь правильный


export default function Pages() {
  console.log("to /pages/pages");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/posts")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Ошибка: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setPosts(data))
      .catch((error) => console.error("Ошибка загрузки постов:", error));
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-4xl font-extrabold text-center text-gray-600 mb-8">
        📖 Добро пожаловать в блог!
      </h1>

      {posts.length > 0 ? (
        <div className="grid gap-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="p-6 border-2 border-gray-400 rounded-2xl shadow-md hover:shadow-lg transition-all bg-gray-400"
            >
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                {post.title}
              </h2>
              <p className="text-gray-700 mb-4">{post.excerpt}</p>
              <a
                href={`/post/${post.id}`}
                className="inline-block px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
              >
                Читать далее →
              </a>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-lg text-gray-500">Загрузка постов...</p>
      )}
    </div>
  );
}
// тест 
