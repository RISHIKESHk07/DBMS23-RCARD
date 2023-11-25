// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import '../../App.css';

// const Index = () => {
//   const { fid } = useParams();
//   const [pdfUrl, setPdfUrl] = useState(null);

//   useEffect(() => {
//     const fetchPdf = async () => {
//       try {
//         const response = await axios.get(`http://localhost:3002/notes/files/${fid}/blob`);
//         // Assuming the response.data contains the PDF URL
//         setPdfUrl(response.data);
//       } catch (error) {
//         console.error('Error fetching PDF:', error);
//       }
//     };

//     fetchPdf();
//   }, [fid]);

//   return (
//     <div>
//       {pdfUrl ? (
//         <iframe title="PDF Viewer" src={pdfUrl} width="100%" height="1000px"></iframe>
//       ) : (
//         <p>Loading PDF...</p>
//       )}
//     </div>
//   );
// };

// export default Index;

import React, { useEffect, useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import axios from 'axios';
import pdf from '../../../public/generated.pdf'
const Index = () => {
  let uname= useParams().username
  let id=useParams().id
  const { fid } = useParams();
  const [pdfUrl, setPdfUrl] = useState(null);
  const navigate = useNavigate()
  useEffect(() => {
    const fetchPdf = async () => {
      try {
        const response = await axios.get(`http://localhost:3002/notes/files/${fid}/blob`, {
          responseType: 'blob', // Set the response type to 'blob'
        });
        
        // Create a blob URL from the response data
        const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
        const url = URL.createObjectURL(pdfBlob);
        
        setPdfUrl(url);
      } catch (error) {
        console.error('Error fetching PDF:', error);
      }
    };
    
    navigate(`/login/${uname}/Dashboard/todos/${id}/Notes/file/${fid}/pdf`)
    fetchPdf();
  }, []);

  return (
    <div>
      pdfUrl ? (
        <iframe src={pdf} width="100%" height="1000px"></iframe>
      ) 
    </div>
  );
};

export default Index;
