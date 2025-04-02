import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import '../../src/app/globals.css';

export default function EditPostPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [author, setAuthor] = useState("");
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      // Загружаем пост для редактирования
      fetch(`http://localhost:8080/posts/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setTitle(data.title);
          setContent(data.content);
          if (data.tagsId && Array.isArray(data.tagsId)) {
            setTags(data.tagsId.join(", ")); // Преобразуем массив тегов в строку
          }setAuthor(data.author);
        })
        .catch((error) => console.error("Ошибка загрузки поста:", error));
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim() || !author.trim()) return;

    // Преобразуем строку тегов обратно в массив
    const tagsList = tags.split(",").map(tag => tag.trim());

    const response = await fetch(`http://localhost:8080/posts`, {
      method: "PUT",  // Используем PUT для обновления данных
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: id,  // Список тегов
        title: title, 
        content: content // Контент поста
      }),
    });

    if (response.ok) {
      router.push(`/post/${id}`); // Перенаправление на страницу поста
    } else {
      console.error("Ошибка обновления поста:", response.status);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center text-blue-500 mb-6">Редактировать пост</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 border border-gray-300 rounded-xl shadow-md">
        <input
          type="text"
          placeholder="Заголовок поста"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg text-black"
        />
        <textarea
          placeholder="Текст поста"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg text-black"
          rows="5"
        />
        <input
          type="text"
          placeholder="Автор"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg text-black"
        />
        <input
          type="text"
          placeholder="Теги (через запятую)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg text-black"
        />
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Сохранить изменения
        </button>
      </form>
    </div>
  );
}
