import { useRef, useState, type ChangeEvent } from "react";
import { createPost } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
  const [postText, setPostText] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string>("No file chosen");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // Opens the hidden file input dialog
  const handleFileSelectClick = () => {
    fileInputRef.current?.click();
  };

  // Handles file selection
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setSelectedFile(file);
    } else {
      setFileName("No file chosen");
      setSelectedFile(null);
    }
  };

  const handleCreatePost = async () => {
    let imageUrl: string | undefined;
    try {
      if (selectedFile) {
        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("upload_preset", "post_upload");

        const res = await fetch(
          "https://api.cloudinary.com/v1_1/dilkuprok/image/upload",
          {
            method: "POST",
            body: formData,
          },
        );

        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error?.message || "Error uploading file");
        }

        const data = await res.json();
        imageUrl = data.secure_url;
      }
      createPost({
        postData: {
          content: postText,
          imageUrl: imageUrl,
        },
        onSuccess: () => setIsSuccess(true),
        onError: (message) => {
          setErrorMessage(message);
        },
      });
      window.location.reload();
    } catch (err) {
      if (err instanceof Error) setErrorMessage(err.message);
    }
  };

  return (
    <>
      <div className="p-6 sm:p-8">
        {/* Post content input */}
        <textarea
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
          placeholder="What's on your mind?"
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent resize-none"
        />

        <img
          src={selectedFile ? URL.createObjectURL(selectedFile) : ""}
          alt=""
        />

        <div className="mt-4 flex flex-wrap items-center gap-4">
          {/* Hidden file input */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
            accept="image/*,.pdf"
          />

          {/* Choose file button */}
          <button
            type="button"
            onClick={handleFileSelectClick}
            className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Choose file
          </button>

          {/* Selected file name display */}
          <span className="text-gray-600 text-sm truncate max-w-xs">
            {fileName}
          </span>

          {/* Submit post button */}
          <button
            type="button"
            onClick={handleCreatePost}
            disabled={!postText.trim() && !selectedFile}
            className={`
                      ml-auto px-6 py-2.5 rounded-full font-medium transition-colors
                      ${
                        postText.trim() || selectedFile
                          ? "bg-green-600 text-white hover:bg-green-700"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }
                    `}
          >
            Post
          </button>
        </div>
      </div>
    </>
  );
}
