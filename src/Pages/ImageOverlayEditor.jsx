import React, { useRef, useState } from "react";
import Moveable from "react-moveable";
import html2canvas from "html2canvas";

function ImageOverlayEditor() {
  const [baseImage, setBaseImage] = useState(null);
  const [overlayImage, setOverlayImage] = useState(null);
  const [opacity, setOpacity] = useState(1);
  const [overlayLoaded, setOverlayLoaded] = useState(false); // 👈 NEW
  const [overlayStyle, setOverlayStyle] = useState({
    top: 100,
    left: 100,
    width: 200,
    height: 200,
    rotate: 0,
  });

  const targetRef = useRef(null);
  const containerRef = useRef(null);

  const handleBaseUpload = (e) => {
    const file = e.target.files[0];
    if (file) setBaseImage(URL.createObjectURL(file));
  };

  const handleOverlayUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setOverlayLoaded(false); // 👈 Reset before image is ready
      setOverlayImage(URL.createObjectURL(file));
    }
  };

  const handleDownload = async () => {
    const canvas = await html2canvas(containerRef.current);
    const link = document.createElement("a");
    link.download = "combined-image.png";
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Image Overlay Editor</h2>

      <input type="file" accept="image/*" onChange={handleBaseUpload} />
      <input type="file" accept="image/*" onChange={handleOverlayUpload} />
      <br /><br />

      <label>Opacity: </label>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={opacity}
        onChange={(e) => setOpacity(parseFloat(e.target.value))}
      />

      <br /><br />

      <button onClick={handleDownload}>Download Final Image</button>

      <div
        ref={containerRef}
        style={{
          position: "relative",
          width: "fit-content",
          marginTop: 30,
          border: "1px solid #ccc",
        }}
      >
        {baseImage && (
          <img
            src={baseImage}
            alt="Base"
            style={{ display: "block", maxWidth: "100%" }}
          />
        )}

        {overlayImage && (
          <img
            ref={targetRef}
            src={overlayImage}
            alt="Overlay"
            onLoad={() => setOverlayLoaded(true)} // ✅ Track when image is ready
            style={{
              position: "absolute",
              top: overlayStyle.top,
              left: overlayStyle.left,
              width: overlayStyle.width,
              height: overlayStyle.height,
              opacity: opacity,
              transform: `rotate(${overlayStyle.rotate}deg)`,
              cursor: "move",
            }}
          />
        )}

        {overlayImage && overlayLoaded && targetRef.current && (
          <Moveable
            target={targetRef.current}
            container={null}
            draggable
            resizable
            rotatable
            throttleDrag={0}
            throttleResize={0}
            throttleRotate={0}
            onDrag={({ left, top }) => {
              setOverlayStyle((prev) => ({ ...prev, left, top }));
            }}
            onResize={({ width, height, drag }) => {
              setOverlayStyle((prev) => ({
                ...prev,
                width,
                height,
                top: drag.top,
                left: drag.left,
              }));
            }}
            onRotate={({ beforeRotate }) => {
              setOverlayStyle((prev) => ({
                ...prev,
                rotate: beforeRotate,
              }));
            }}
          />
        )}
      </div>
    </div>
  );
}

export default ImageOverlayEditor;
