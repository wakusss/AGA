// components/PopUpEditPost.tsx
"use client";

import {
  forwardRef,
  useRef,
  useState,
  type FormEvent,
  useImperativeHandle,
} from "react";
import { updatePost } from "../../lib/utils";
import { type Post } from "../types/Post";

export interface PostFormData {
  content: string;
  imageUrl?: string | null;
}

interface EditPostDialogProps {
  initialData: Post;
  onSuccess?: () => void;
}

const EditPostDialog = forwardRef<HTMLDialogElement, EditPostDialogProps>(
  ({ initialData, onSuccess }, ref) => {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [content, setContent] = useState(initialData.content);
    const [imageUrl, setImageUrl] = useState<string | null | undefined>(
      initialData.imageUrl,
    );
    const [loading, setLoading] = useState(false);

    useImperativeHandle(ref, () => dialogRef.current!);

    // Expose dialog ref to parent
    if (ref) {
      if (typeof ref === "function") ref(dialogRef.current);
      else ref.current = dialogRef.current;
    }

    const handleSubmit = async (e: FormEvent) => {
      e.preventDefault();
      if (!content.trim()) return;

      setLoading(true);

      await updatePost(
        initialData.id,
        { content, imageUrl: imageUrl || null },
        () => {
          setLoading(false);
          dialogRef.current?.close();
          onSuccess?.();
        },
        (msg) => {
          setLoading(false);
          alert(msg); // or use toast
        },
      );
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) setImageUrl(URL.createObjectURL(file));
    };

    const removeImage = () => setImageUrl(null);

    return (
      <dialog
        ref={dialogRef}
        className="fixed inset-0 m-auto
    max-w-lg w-[90vw] max-h-[90vh] h-fit
    rounded-xl shadow-2xl border border-gray-200
    bg-white p-6 overflow-y-auto
    backdrop:bg-black/60 backdrop:backdrop-blur-sm"
      >
        <div className="relative">
          <button
            onClick={() => dialogRef.current?.close()}
            className="absolute -right-3 -top-3 h-8 w-8 rounded-full bg-gray-200 text-xl hover:bg-gray-300 dark:bg-neutral-800"
          >
            ×
          </button>

          <h2 className="mb-5 text-xl font-bold">Edit Post</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Image */}
            <div className="flex items-center gap-4">
              {imageUrl ? (
                <div className="relative h-24 w-24 overflow-hidden rounded-lg">
                  <img
                    src={imageUrl}
                    alt="preview"
                    className="h-full w-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute -right-2 -top-2 h-6 w-6 rounded-full bg-red-500 text-white text-xs"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <div className="h-24 w-24 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 dark:bg-neutral-800">
                  no image
                </div>
              )}

              <label className="cursor-pointer rounded border border-blue-600 px-4 py-2 text-blue-600 hover:bg-blue-50">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                  disabled={loading}
                />
                {imageUrl ? "Change" : "Add image"}
              </label>
            </div>

            {/* Content */}
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
              className="w-full rounded-lg border p-3 focus:border-blue-500 dark:bg-neutral-800 dark:text-white"
              placeholder="Post text..."
              required
              disabled={loading}
            />

            {/* Buttons */}
            <div className="flex justify-end gap-3 pt-3">
              <button
                type="button"
                onClick={() => dialogRef.current?.close()}
                disabled={loading}
                className="rounded-lg border px-5 py-2 hover:bg-gray-100 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || !content.trim()}
                className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700 disabled:opacity-60"
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        </div>
      </dialog>
    );
  },
);

EditPostDialog.displayName = "EditPostDialog";

export default EditPostDialog;
