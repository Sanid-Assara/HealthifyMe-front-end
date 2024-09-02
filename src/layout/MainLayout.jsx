import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SearchProvider from "../context/SearchProvider";

export default function MainLayout() {
  return (
    <SearchProvider>
      <div className="flex flex-col min-h-screen" data-theme="default">
        <header>
          <Header />
        </header>
        <main className="flex-grow">
          <Outlet />
        </main>

        <footer>
          <Footer />
        </footer>
      </div>
    </SearchProvider>
  );
}
