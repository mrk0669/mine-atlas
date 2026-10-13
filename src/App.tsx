import { useEffect, useState } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import AuthPage from "./components/AuthPage";
import Header from "./components/Header";
import Splash from "./components/Splash";
import MapPage from "./pages/MapPage";
import MineDetailPage from "./pages/MineDetailPage";
import NewsPage from "./pages/NewsPage";
import NotFound from "./pages/NotFound";
import { selectMe, useStore } from "./lib/store";

/** Flow: splash -> sign in (or create account) -> Map and News & Reports. */
function Shell() {
  const state = useStore();
  const [booting, setBooting] = useState(true);

  useEffect(() => {
    const t = window.setTimeout(() => setBooting(false), 1300);
    return () => window.clearTimeout(t);
  }, []);

  if (booting) return <Splash />;
  if (!selectMe(state)) return <AuthPage />;

  return (
    <>
      <Header />
      <main className="page-enter">
        <Routes>
          <Route path="/" element={<MapPage />} />
          <Route path="/mine/:id" element={<MineDetailPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
}

export default function App() {
  return (
    <HashRouter>
      <Toaster theme="dark" position="bottom-center" richColors closeButton />
      <Shell />
    </HashRouter>
  );
}
