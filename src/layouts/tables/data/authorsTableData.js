// import React, { useState, useEffect } from 'react';
// import SoftBox from "components/SoftBox";
// import SoftTypography from "components/SoftTypography";
// import axios from 'axios';
// import { Typography } from '@mui/material';

// function DataCircle() {
//   const [circles, setCircles] = useState([]);

//   const getCircleData = async () => {
//     try {
//       const response = await axios.get('http://152.42.188.210:8080/index.php/api/auth/check_circle');
//       setCircles(response.data.data);
//       console.log(response.data);
//     } catch (error) {
//       console.error("Error fetching circle data:", error);
//     }
//   };

//   useEffect(() => {
//     getCircleData();
//   }, []);

//   return (
//     <div>
//       <SoftBox>
//         <Typography variant="h5">Circle List</Typography>
//       </SoftBox>
//       <SoftBox mt={2}>
//         <table>
//           <thead>
//             <tr>
//               <th align="left">Circle</th>
//               <th align="center">Created</th>
//               <th align="center">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {circles.map((circle, index) => (
//               <tr key={index}>
//                 <td>
//                   <SoftTypography variant="button" fontWeight="medium">
//                     {circle.circle_name}
//                   </SoftTypography>
//                 </td>
//                 <td>
//                   <SoftTypography variant="caption" color="secondary" fontWeight="medium">
//                     {new Date(circle.created_at).toLocaleDateString()}
//                   </SoftTypography>
//                 </td>
//                 <td>
//                   <SoftTypography
//                     component="a"
//                     href="#"
//                     variant="caption"
//                     color="secondary"
//                     fontWeight="medium"
//                   >
//                     Edit
//                   </SoftTypography>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </SoftBox>
//     </div>
//   );
// }

// export default DataCircle;
