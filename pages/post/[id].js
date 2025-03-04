import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import '../../src/app/globals.css';

export default function PostPage() {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:8080/posts/${id}`)
        .then((response) => response.json())
        .then((data) => setPost(data))
        .catch((error) => console.error("Ошибка загрузки поста:", error));
    }
  }, [id]);

  if (!post) return <p className="text-center text-lg text-gray-500">Загрузка...</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      {/* Контейнер для поста */}
      <div className="bg-white border border-gray-300 rounded-xl shadow-md p-6 space-y-4">
        {/* Информация об авторе */}
        <div className="flex items-center space-x-4">
          <img
            className="w-12 h-12 rounded-full"
            src="https://www.w3schools.com/w3images/avatar2.png" // Аватарка пользователя
            alt="User Avatar"
          />
          <div>
            <h2 className="font-semibold text-xl text-gray-800">Имя пользователя</h2>
            <p className="text-sm text-gray-600">@username</p>
          </div>
        </div>

        {/* Заголовок поста */}
        <h1 className="text-3xl font-bold text-gray-800">{post.title}</h1>

        {/* Контент поста */}
        <p className="text-gray-800">{post.content}</p>

        {/* Кнопки для взаимодействия */}
        <div className="flex items-center space-x-6 text-gray-600 mt-4">
          <button className="flex items-center space-x-2 hover:text-blue-600">
            <span>💬</span>
            <span>Комментировать</span>
          </button>
          <button className="flex items-center space-x-2 hover:text-red-600">
            <span>❤️</span>
            <span>Лайк</span>
          </button>
          <button className="flex items-center space-x-2 hover:text-blue-600">
            <span>🔗</span>
            <span>Поделиться</span>
          </button>
        </div>

        {/* Кнопка возвращения к списку постов */}
        <div className="mt-8 text-center">
          <a
            href="/pages"
            className="inline-block px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
          >
            Вернуться к списку постов
          </a>
        </div>
      </div>
    </div>
  );
}
