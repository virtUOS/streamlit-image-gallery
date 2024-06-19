import React from "react"
import StreamlitGallery from "./StreamlitGallery";
import { createRoot } from "react-dom/client";

const root = createRoot(
    document.getElementById("root")!
);

root.render(
  <React.StrictMode>
    <StreamlitGallery />
  </React.StrictMode>,
)
