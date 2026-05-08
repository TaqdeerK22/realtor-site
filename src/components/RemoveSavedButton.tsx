"use client";

export default function RemoveSavedButton({
  id,
  onRemove,
}: {
  id: string;
  onRemove: (id: string) => void;
}) {
  function removeSaved() {
    const saved = JSON.parse(localStorage.getItem("savedListings") || "[]");
    const updated = saved.filter((savedId: string) => savedId !== id);

    localStorage.setItem("savedListings", JSON.stringify(updated));
    onRemove(id);
  }

  return (
    <button
      onClick={removeSaved}
      style={{
        marginTop: "10px",
        padding: "10px 14px",
        background: "red",
        color: "white",
        border: "none",
        borderRadius: "8px",
      }}
    >
      Remove Saved
    </button>
  );
}
