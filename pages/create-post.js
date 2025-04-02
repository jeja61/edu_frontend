import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import '../src/app/globals.css';

export default function CreatePostPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState(""); // Для тегов
  const [author, setAuthor] = useState(""); // Для автора
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim() || !author.trim()) return;

    // Преобразуем строку тегов в массив чисел (можно адаптировать, если сервер ожидает другой формат)
    const tagsList = tags.split(",").map(tag => tag.trim()); // Просто строковые теги

    const response = await fetch("http://localhost:8080/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tagsUd: tagsList,  // Список тегов
        title: title,    // Заголовок
        author: author,  // Автор
        createdDate: new Date().toISOString(),  // Дата создания
        content: content // Контент поста
      }),
    });

    if (response.ok) {
      router.push("/"); // Перенаправление на главную страницу
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center text-blue-500 mb-6">Создать новый пост</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 border border-gray-300 rounded-xl shadow-md">
        <input
          type="text"
          placeholder="Заголовок поста"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
        <textarea
          placeholder="Текст поста"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
          rows="5"
        />
        <input
          type="text"
          placeholder="Автор"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
        <input
          type="text"
          placeholder="Теги (через запятую)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Опубликовать
        </button>
      </form>
    </div>
  );
}
