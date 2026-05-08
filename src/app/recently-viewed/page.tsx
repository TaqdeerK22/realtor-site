import Navbar from "../../components/Navbar";
import RecentlyViewedClient from "../../components/RecentlyViewedClient";

export default function RecentlyViewedPage() {
  return (
    <>
      <Navbar />

      <main style={{ padding: "40px" }}>
        <h1>Recently Viewed Listings</h1>

        <RecentlyViewedClient />
      </main>
    </>
  );
}
