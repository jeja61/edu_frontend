import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import '../../src/app/globals.css'; // Убедитесь, что путь правильный

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
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-4xl font-extrabold text-center text-gray-400 mb-8">
        {post.title}
      </h1>
      <div className="border-2 border-gray-400 rounded-2xl shadow-md p-6 bg-gray-400">
        <p className="text-gray-800 mb-4">{post.content}</p>
      </div>
      <div className="mt-8 text-center">
        <a
          href="/pages" // Ссылка для возврата к списку постов
          className="inline-block px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
        >
          Вернуться к списку постов
        </a>
      </div>
    </div>
  );
}
