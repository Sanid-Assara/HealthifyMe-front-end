import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SearchProvider from "../context/SearchProvider";

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <SearchProvider>
        <header>
          <Header />
        </header>
        <main className="flex-grow">
          <Outlet />
        </main>
      </SearchProvider>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
