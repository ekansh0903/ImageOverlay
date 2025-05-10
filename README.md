
# 🖼️ Image Overlay Editor

A simple React-based image editor that allows users to upload a **base image** and an **overlay image**, drag/resize/rotate the overlay, adjust its opacity, and download the final combined image.

---

## 🚀 Features

- Upload a base image and an overlay image
- Drag, resize, and rotate the overlay image using `react-moveable`
- Adjust overlay opacity in real-time
- Download the combined image as a `.png` using `html2canvas`

---

## 📦 Tech Stack

- React
- [react-moveable](https://github.com/daybrush/moveable)
- [html2canvas](https://github.com/niklasvh/html2canvas)

---

## 📸 Demo

![Image Overlay Editor Screenshot](demo.png)  
*Feel free to add your own screenshot here.*

---

## 🛠️ Installation

```bash
git clone https://github.com/your-username/image-overlay-editor.git
cd image-overlay-editor
npm install
npm start
````

---

## 🧪 Usage

1. Upload a base image (background).
2. Upload an overlay image (logo, sticker, etc.).
3. Drag, resize, or rotate the overlay image as needed.
4. Adjust the overlay opacity using the slider.
5. Click **Download Final Image** to save the result as a PNG.

---

## 📂 File Structure

```
src/
├── ImageOverlayEditor.js  # Main component
├── App.js                 # Entry point
└── index.js               # ReactDOM renderer
```