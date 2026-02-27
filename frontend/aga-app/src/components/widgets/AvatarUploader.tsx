// components/AvatarUploader.tsx
"use client";

import { useState } from "react";

interface AvatarUploaderProps {
  currentAvatarUrl: string | null;
  onUploadComplete: (newUrl: string | null) => void;
}

export default function AvatarUploader({
  currentAvatarUrl,
  onUploadComplete,
}: AvatarUploaderProps) {
  const [preview, setPreview] = useState<string | null>(currentAvatarUrl);
  const [uploading, setUploading] = useState(false);

  // Замени на свои значения (лучше в .env)
  const CLOUD_NAME = "твой_cloud_name"; // например dmyexample
  const UPLOAD_PRESET = "profile_avatar_unsigned"; // имя твоего unsigned пресета

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Локальный превью сразу
    const localPreview = URL.createObjectURL(file);
    setPreview(localPreview);

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", UPLOAD_PRESET);

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        },
      );

      if (!res.ok) throw new Error("Ошибка загрузки");

      const data = await res.json();
      onUploadComplete(data.secure_url); // передаём готовый URL наверх
    } catch (err) {
      console.error("Cloudinary upload error:", err);
      alert("Не удалось загрузить фото");
      setPreview(currentAvatarUrl); // откат к старому
      onUploadComplete(currentAvatarUrl); // возвращаем старый
    } finally {
      setUploading(false);
      // Не забываем очистить локальный blob-URL
      if (localPreview.startsWith("blob:")) URL.revokeObjectURL(localPreview);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    onUploadComplete(null); // сигнал — удалить аватар
  };

  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start sm:gap-6">
      {/* Превью */}
      <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-full border-2 border-gray-200 dark:border-neutral-700">
        {preview ? (
          <img
            src={preview}
            alt="Avatar preview"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-100 text-gray-400 dark:bg-neutral-800">
            Нет фото
          </div>
        )}
      </div>

      {/* Кнопки */}
      <div className="flex flex-col gap-3">
        <label className="cursor-pointer rounded-lg border border-blue-600 px-5 py-2.5 text-center text-blue-600 hover:bg-blue-50 dark:border-blue-500 dark:text-blue-400 dark:hover:bg-neutral-800">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
            disabled={uploading}
          />
          {uploading ? "Загрузка..." : "Выбрать фото"}
        </label>

        {preview && (
          <button
            type="button"
            onClick={handleRemove}
            className="text-sm text-red-600 hover:underline dark:text-red-400"
            disabled={uploading}
          >
            Удалить
          </button>
        )}
      </div>
    </div>
  );
}
