"use client";

import { useEffect } from "react";

function isImageTarget(target: EventTarget | null) {
  return target instanceof HTMLElement && Boolean(target.closest("img"));
}

export default function ImageProtection() {
  useEffect(() => {
    const preventImageDrag = (event: DragEvent) => {
      if (isImageTarget(event.target)) {
        event.preventDefault();
      }
    };

    const preventImageContextMenu = (event: MouseEvent) => {
      if (isImageTarget(event.target)) {
        event.preventDefault();
      }
    };

    const preventImageCopy = (event: ClipboardEvent) => {
      const selection = window.getSelection();
      const selectedImage =
        selection?.anchorNode?.parentElement?.closest("img");

      if (selectedImage) {
        event.preventDefault();
      }
    };

    document.addEventListener("dragstart", preventImageDrag);
    document.addEventListener("contextmenu", preventImageContextMenu);
    document.addEventListener("copy", preventImageCopy);

    return () => {
      document.removeEventListener("dragstart", preventImageDrag);
      document.removeEventListener("contextmenu", preventImageContextMenu);
      document.removeEventListener("copy", preventImageCopy);
    };
  }, []);

  return null;
}
