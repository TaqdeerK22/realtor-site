import Navbar from "../../components/Navbar";
import SavedListingsClient from "../../components/SavedListingsClient";

export default function SavedPage() {
  return (
    <>
      <Navbar />

      <main style={{ padding: "40px" }}>
        <h1>Saved Listings</h1>

        <SavedListingsClient />
      </main>
    </>
  );
}
