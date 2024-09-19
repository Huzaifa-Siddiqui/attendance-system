'use client';

import { useState } from 'react';

export default function UploadEnrollment() {
  const [file, setFile] = useState(null);



  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  async function handleUpload(event) {
    event.preventDefault();

    if (!file) {
      alert('Please select a file');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload-enrollment', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        console.log('File uploaded successfully:', result);
        alert('File uploaded successfully');
      } else {
        console.error('Error uploading file:', result);
        alert(`Error uploading file: ${result.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Unexpected error occurred during file upload');
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Upload Enrollment CSV</h1>
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
