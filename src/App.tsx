import { useEffect } from "react";
import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import { AppProvider } from "./store/app";

export default function App() {
  useEffect(() => {
    const sendHeight = () => {

      window.parent.postMessage(
        {
          type: "iframe-height",
          height: document.documentElement.offsetHeight,
        },
        "*",
      );
    };

    sendHeight();

    const observer = new ResizeObserver(sendHeight);

    observer.observe(document.documentElement);
    observer.observe(document.body);

    window.addEventListener("resize", sendHeight);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", sendHeight);
    };
  }, []);

  return (
    <AppProvider>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </AppProvider>
  );
}
