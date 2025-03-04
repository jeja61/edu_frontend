import React, { useEffect, useState } from "react";
import '../src/app/globals.css'; // Убедитесь, что путь правильный

export default function Pages() {
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
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center text-blue-500 mb-6">Добро пожаловать в блог!</h1>

      {posts.length > 0 ? (
        <div className="space-y-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="flex p-4 border border-gray-300 rounded-xl shadow-md bg-white hover:bg-gray-50 transition"
            >
              <div className="flex-shrink-0">
                <img
                  className="w-12 h-12 rounded-full"
                  src="https://www.w3schools.com/w3images/avatar2.png" // Здесь можно поставить аватар
                  alt="user-avatar"
                />
              </div>
              <div className="ml-4 flex-1">
                <h2 className="font-semibold text-lg text-gray-800">{post.title}</h2>
                <p className="text-sm text-gray-600">{post.excerpt}</p>
                <div className="mt-2 flex items-center space-x-4">
                  <a
                    href={`/post/${post.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    Читать далее →
                  </a>
                  <button className="text-gray-600 hover:text-gray-900">💬</button>
                  <button className="text-gray-600 hover:text-gray-900">❤️</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-lg text-gray-500">Загрузка постов...</p>
      )}
    </div>
  );
}
