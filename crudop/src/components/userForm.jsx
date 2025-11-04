import { useState, useEffect } from "react";

export default function UserForm({ onSubmit, initialUser, submitLabel }) {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");

  useEffect(() => {
    if (initialUser) {
      setName(initialUser.name);
      setSlug(initialUser.slug);
    } else {
      setName("");
      setSlug("");
    }
  }, [initialUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !slug.trim()) return;
    onSubmit({ name, slug });
  };

  return (
    <form onSubmit={handleSubmit} className="user-form">
      <input
        type="text"
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Enter slug"
        value={slug}
        onChange={(e) => setSlug(e.target.value)}
        required
      />
      <button type="submit">{submitLabel}</button>
    </form>
  );
}
