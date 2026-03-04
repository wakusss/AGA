"use client";

import {
  forwardRef,
  useRef,
  useState,
  type FormEvent,
  useImperativeHandle,
} from "react";

export interface ProfileFormData {
  username: string;
  bio: string;
  avatarUrl?: string | null;
}

interface EditProfileDialogProps {
  initialData: ProfileFormData;
  onSave: (data: ProfileFormData) => void;
}

const EditProfileDialog = forwardRef<HTMLDialogElement, EditProfileDialogProps>(
  ({ initialData, onSave }, ref) => {
    const dialogRef = useRef<HTMLDialogElement>(null);

    // Fix: expose internal dialog ref to parent
    useImperativeHandle(ref, () => dialogRef.current!);

    const [username, setUsername] = useState(initialData.username);
    const [bio, setBio] = useState(initialData.bio);
    const [avatarUrl, setAvatarUrl] = useState<string | null | undefined>(
      initialData.avatarUrl,
    );

    const handleSubmit = (e: FormEvent) => {
      e.preventDefault();
      onSave({
        username: username.trim(),
        bio: bio.trim(),
        avatarUrl,
      });
      dialogRef.current?.close();
    };

    const handleClose = () => {
      dialogRef.current?.close();
    };

    return (
      <dialog
        ref={dialogRef}
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl dark:bg-neutral-900"
        onClose={handleClose}
      >
        {/* Style the modal backdrop */}

        <div className="relative">
          {/* Close button */}
          <button
            type="button"
            onClick={handleClose}
            className="absolute -right-3 -top-3 h-9 w-9 rounded-full bg-gray-100 text-2xl text-gray-600 hover:bg-gray-200 dark:bg-neutral-800 dark:text-gray-300"
            aria-label="Close"
          >
            ×
          </button>

          <h2 className="mb-6 text-2xl font-bold">Edit Profile</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Avatar section */}
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
              <div className="h-28 w-28 rounded-full overflow-hidden border-2 border-gray-200 dark:border-neutral-700">
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt="Avatar preview"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center bg-gray-100 text-gray-400 dark:bg-neutral-800">
                    No photo
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-3">
                <label className="cursor-pointer rounded-lg border border-blue-600 px-5 py-2.5 text-blue-600 hover:bg-blue-50 dark:border-blue-500 dark:text-blue-400">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setAvatarUrl(URL.createObjectURL(file));
                      }
                    }}
                  />
                  Choose Photo
                </label>

                {avatarUrl && (
                  <button
                    type="button"
                    onClick={() => setAvatarUrl(null)}
                    className="text-sm text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>

            {/* Username field */}
            <div>
              <label className="mb-1.5 block text-sm font-medium">
                Username
              </label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-lg border px-4 py-2.5 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                required
              />
            </div>

            {/* Bio field */}
            <div>
              <label className="mb-1.5 block text-sm font-medium">About</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={4}
                className="w-full rounded-lg border px-4 py-2.5 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>

            {/* Action buttons */}
            <div className="flex justify-end gap-4 pt-4">
              <button
                type="button"
                onClick={handleClose}
                className="rounded-lg border px-6 py-2.5 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-lg bg-blue-600 px-6 py-2.5 text-white hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </dialog>
    );
  },
);

EditProfileDialog.displayName = "EditProfileDialog";

export default EditProfileDialog;
