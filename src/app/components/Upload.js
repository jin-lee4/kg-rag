"use client";
import { useState } from 'react';

const Upload = () => {
  const [file, setFile] = useState(null);
  const [text, setText] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      const result = await response.json();
      const ocrResponse = await fetch('/api/ocr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ filePath: result.filePath }),
      });

      if (ocrResponse.ok) {
        const ocrResult = await ocrResponse.json();
        setText(ocrResult.text); // Display the extracted text
      }
    } else {
      console.error('Upload failed');
    }
  };

  return (
    <div>
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      <div>
        <pre>{text}</pre>
      </div>
    </div>
  );
};

export default Upload;
