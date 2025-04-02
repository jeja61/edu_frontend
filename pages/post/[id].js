import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import '../../src/app/globals.css';

export default function PostPage() {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState(null);
  const [author, setAuthor] = useState(""); // Теперь автор вводится вручную
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    if (id) {
      // Загружаем пост
      fetch(`http://localhost:8080/posts/${id}`)
        .then((response) => response.json())
        .then((data) => setPost(data))
        .catch((error) => console.error("Ошибка загрузки поста:", error));

      // Загружаем комментарии
      fetch(`http://localhost:8080/comments?id=${id}`)
        .then((response) => response.json())
        .then((data) => setComments(data))
        .catch((error) => console.error("Ошибка загрузки комментариев:", error));
    }
  }, [id]);

  const handleCommentSubmit = async () => {
    if (!newComment.trim() || !author.trim()) {
      console.error("Комментарий или автор не могут быть пустыми.");
      return;
    }

    // Отправляем комментарий на сервер
    const response = await fetch(`http://localhost:8080/comments?id=${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        author: author,
        content: newComment,
        photos: [] // Если фотографии, добавьте их сюда
      })
    });

    if (response.ok) {
      router.reload();
    } else {
      console.error("Ошибка добавления комментария:", response.status);
    }
  };

  // Функция для удаления поста
  const handleDeletePost = async () => {
    const response = await fetch(`http://localhost:8080/posts/${id}`, {
      method: "DELETE"
    });

    if (response.ok) {
      router.push("/"); // Перенаправляем на главную страницу
    } else {
      console.error("Ошибка удаления поста:", response.status);
    }
  };

  // Функция для редактирования поста
  const handleEditPost = () => {
    router.push(`/edit-post/${id}`); // Перенаправляем на страницу редактирования
  };

  if (!post) return <p className="text-center text-lg text-gray-500">Загрузка...</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="bg-white border border-gray-300 rounded-xl shadow-md p-6 space-y-4">
        <h1 className="text-3xl font-bold text-gray-800">{post.title}</h1>
        <p className="text-gray-800">{post.content}</p>
      </div>

      {/* Кнопки для редактирования и удаления */}
      <div className="mt-4 flex justify-between">
        <button
          onClick={handleEditPost}
          className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
        >
          Редактировать пост
        </button>
        <button
          onClick={handleDeletePost}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Удалить пост
        </button>
      </div>

      {/* Секция комментариев */}
      <div className="mt-6 bg-white p-4 border border-gray-300 rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800">Комментарии</h2>
        {comments.length > 0 ? (
          <ul className="mt-4 space-y-2">
            {comments.map((comment) => (
              <li key={comment.id} className="p-2 border-b border-gray-300">
                <p className="text-gray-700">
                  <strong>{comment.author}:</strong> {comment.content}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 mt-4">Комментариев пока нет.</p>
        )}

        {/* Форма добавления комментария */}
        <div className="mt-4">
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-lg text-black"
            placeholder="Ваш ник"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <textarea
            className="w-full p-2 border border-gray-300 rounded-lg mt-2 text-black"
            rows="3"
            placeholder="Напишите комментарий..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button
            onClick={handleCommentSubmit}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Добавить комментарий
          </button>
        </div>
      </div>
    </div>
  );
}
