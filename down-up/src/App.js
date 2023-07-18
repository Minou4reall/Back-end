// src/App.js
import React, { useState } from 'react';

const App = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('File uploaded successfully');
      } else {
        alert('Failed to upload file');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred while uploading the file');
    }
  };

  const handleDownload = async (filename) => {
    try {
      const response = await fetch(`/download/${filename}`);

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.click();
      } else {
        alert('Failed to download file');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred while downloading the file');
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      <hr />
      <h2>Uploaded Files</h2>
      <ul>
        <li>
          <button onClick={() => handleDownload('filename1')}>Download File 1</button>
        </li>
        <li>
          <button onClick={() => handleDownload('filename2')}>Download File 2</button>
        </li>
      </ul>
    </div>
  );
};

export default App;
