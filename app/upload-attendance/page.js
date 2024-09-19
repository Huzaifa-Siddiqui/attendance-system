'use client';

import { useState } from 'react';

export default function UploadAttendance() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload-attendance', {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();
      alert(result.message || 'Upload failed');
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Upload failed');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Upload Attendance CSV</h1>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white py-2 px-4 mt-4 rounded"
      >
        Upload
      </button>
    </div>
  );
}
