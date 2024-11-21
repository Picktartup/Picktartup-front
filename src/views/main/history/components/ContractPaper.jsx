import React, { useState } from "react";
import { pdfjs, Document, Page } from 'react-pdf';
import { Download } from 'lucide-react';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

const ContractPaper = ({ investmentData }) => {
  const pdfUrl = investmentData.contractPdfUrl;
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const handleDownload = async () => {
    try {
      const response = await fetch(pdfUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = "contract.pdf"; // 원하는 파일명으로 수정 가능
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('PDF 다운로드 중 오류가 발생했습니다:', error);
    }
  };

  return (
    <div className="bg-white p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">계약서 조회</h2>
      <div className="relative w-full bg-white">
        <Document
          file={pdfUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          className="flex justify-center">
          <Page 
            pageNumber={pageNumber} 
            className="rounded-lg overflow-hidden shadow-2xl shadow-blue-800/50"
            renderTextLayer={false}
            renderAnnotationLayer={false}
          />
        </Document>

        {/* Controls Container */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center bg-white rounded-lg shadow-lg px-6 py-2">
          {/* Pagination Controls */}
          <div className="flex items-center gap-4 pr-4 border-r border-gray-200">
            <button 
              onClick={() => pageNumber > 1 && setPageNumber(pageNumber - 1)}
              className={`text-gray-500 hover:text-gray-900 focus:outline-none ${pageNumber <= 1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              disabled={pageNumber <= 1}
            >
              &lt;
            </button>
            
            <span className="text-md text-gray-900">
              {pageNumber} of {numPages}
            </span>
            
            <button 
              onClick={() => pageNumber < numPages && setPageNumber(pageNumber + 1)}
              className={`text-gray-500 hover:text-gray-900 focus:outline-none ${pageNumber >= numPages ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              disabled={pageNumber >= numPages}
            >
              &gt;
            </button>
          </div>

          {/* Download Button */}
          <button 
            onClick={handleDownload}
            className="flex items-center gap-2 pl-4 text-gray-800 hover:text-gray-900 focus:outline-none"
            title="PDF 다운로드"
          >
            <Download size={18} />
            <span className="text-sm">다운로드</span>
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default ContractPaper;