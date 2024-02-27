/* eslint-disable react/prop-types */
// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";
import SoftBadge from "components/SoftBadge";
import { Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import React, { useState } from 'react';
import axios from 'axios';

function DataCircle() {
  const [dataNamaCircle, setdataNamaCircle] = useState([]);
  // const [namaCircle, setNamaCircle] = useState("");
  // const [id, setId] = useState(null);
  // const [showModal, setShowModal] = useState(false);

  const GetDataNamaCircle = async () => {
    const getData = await axios.get(
      ''
    );
    setdataNamaCircle(getData.data.data);
    console.log(getData);
  };
  useEffect(() => {
    GetDataNamaCircle();
  }, []);

  // const handleShowModal = (namaCircle, id) => {
  //   setNamaCircle(namaCircle);
  //   setId(id);
  //   setShowModal(true);
  // };

  // const handleCloseModal = () => {
  //   setNamaCircle("");
  //   setId(null);
  //   setShowModal(false);
  // };

  // const handleSaveNamaCircle = async () => {
  //   let error = "";
  //   if (namaCircle.trim() === "") {
  //     error = "The Circle name cannot be empty";
  //     return;
  //   }
  //   try {
  //     // Cek apakah nama circle sudah ada
  //     const response = await axios.get(
  //       `?namaCircle=${namaCircle}`
  //     );
  //     const isNamaCircleExists = response.data.exists;
  
  //     if (isNamaCircleExists) {
  //       error = "The name Circle is already in use";
  //     } else {
  //       // Simpan nama circle ke database
  //       await axios.post(
  //         '',
  //         { namaCircle: namaCircle }
  //       );
  //       console.log("The Circle name has been successfully saved to the database");
  //     }
  //   } catch (error) {
  //     console.log("Error menyimpan nama circle:", error);
  //   }
  // };
  
// function Author({ image, name, email }) {
//   return (
//     <SoftBox display="flex" alignItems="center" px={1} py={0.5}>
//       {/* <SoftBox mr={2}>
//         <SoftAvatar src={image} alt={name} size="sm" variant="rounded" />
//       </SoftBox> */}
//       <SoftBox display="flex" flexDirection="column">
//         <SoftTypography variant="button" fontWeight="medium">
//           {name}
//         </SoftTypography>
//         <SoftTypography variant="caption" color="secondary">
//           {email}
//         </SoftTypography>
//       </SoftBox>
//     </SoftBox>
//   );
// }

// function Function({ job, org }) {
//   return (
//     <SoftBox display="flex" flexDirection="column">
//       <SoftTypography variant="caption" fontWeight="medium" color="text">
//         {job}
//       </SoftTypography>
//       <SoftTypography variant="caption" color="secondary">
//         {org}
//       </SoftTypography>
//     </SoftBox>
//   );
// }

const authorsTableData = {
  columns: [
    { name: "circle", align: "left" },
    { name: "created", align: "center" },
    { name: "action", align: "center" },
  ],

  rows: [
    {
      circle: (
        <SoftTypography variant="button" fontWeight="medium">
          {dataNamaCircle}
        </SoftTypography>
      ),
      created: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          {new Date().toLocaleDateString()}
        </SoftTypography>
      ),
      action: (
        <SoftTypography
          component="a"
          href="#"
          variant="caption"
          color="secondary"
          fontWeight="medium"
        >
          Edit
        </SoftTypography>
      ),
    },

    // {
    //   author: <Author image={team3} name="Alexa Liras" email="alexa@creative-tim.com" />,
    //   function: <Function job="Programator" org="Developer" />,
    //   status: (
    //     <SoftBadge variant="gradient" badgeContent="offline" color="secondary" size="xs" container />
    //   ),
    //   created: (
    //     <SoftTypography variant="caption" color="secondary" fontWeight="medium">
    //       11/01/19
    //     </SoftTypography>
    //   ),
    //   action: (
    //     <SoftTypography
    //       component="a"
    //       href="#"
    //       variant="caption"
    //       color="secondary"
    //       fontWeight="medium"
    //     >
    //       Edit
    //     </SoftTypography>
    //   ),
    // },
    // {
    //   author: <Author image={team4} name="Laurent Perrier" email="laurent@creative-tim.com" />,
    //   function: <Function job="Executive" org="Projects" />,
    //   status: (
    //     <SoftBadge variant="gradient" badgeContent="online" color="success" size="xs" container />
    //   ),
    //   created: (
    //     <SoftTypography variant="caption" color="secondary" fontWeight="medium">
    //       19/09/17
    //     </SoftTypography>
    //   ),
    //   action: (
    //     <SoftTypography
    //       component="a"
    //       href="#"
    //       variant="caption"
    //       color="secondary"
    //       fontWeight="medium"
    //     >
    //       Edit
    //     </SoftTypography>
    //   ),
    // },
    // {
    //   author: <Author image={team3} name="Michael Levi" email="michael@creative-tim.com" />,
    //   function: <Function job="Programator" org="Developer" />,
    //   status: (
    //     <SoftBadge variant="gradient" badgeContent="online" color="success" size="xs" container />
    //   ),
    //   created: (
    //     <SoftTypography variant="caption" color="secondary" fontWeight="medium">
    //       24/12/08
    //     </SoftTypography>
    //   ),
    //   action: (
    //     <SoftTypography
    //       component="a"
    //       href="#"
    //       variant="caption"
    //       color="secondary"
    //       fontWeight="medium"
    //     >
    //       Edit
    //     </SoftTypography>
    //   ),
    // },
    // {
    //   author: <Author image={team2} name="Richard Gran" email="richard@creative-tim.com" />,
    //   function: <Function job="Manager" org="Executive" />,
    //   status: (
    //     <SoftBadge variant="gradient" badgeContent="offline" color="secondary" size="xs" container />
    //   ),
    //   created: (
    //     <SoftTypography variant="caption" color="secondary" fontWeight="medium">
    //       04/10/21
    //     </SoftTypography>
    //   ),
    //   action: (
    //     <SoftTypography
    //       component="a"
    //       href="#"
    //       variant="caption"
    //       color="secondary"
    //       fontWeight="medium"
    //     >
    //       Edit
    //     </SoftTypography>
    //   ),
    // },
    // {
    //   author: <Author image={team4} name="Miriam Eric" email="miriam@creative-tim.com" />,
    //   function: <Function job="Programtor" org="Developer" />,
    //   status: (
    //     <SoftBadge variant="gradient" badgeContent="offline" color="secondary" size="xs" container />
    //   ),
    //   created: (
    //     <SoftTypography variant="caption" color="secondary" fontWeight="medium">
    //       14/09/20
    //     </SoftTypography>
    //   ),
    //   action: (
    //     <React.Fragment>
    //       <SoftTypography
    //         href="#"
    //         variant="text"
    //         color="secondary"
    //         startIcon={<EditIcon />}
    //         onClick={() => handleEdit(id)}
    //       >
    //         Edit
    //       </SoftTypography>
    //       <Button
    //         variant="text"
    //         color="secondary"
    //         size="small"
    //         startIcon={<DeleteIcon />}
    //         onClick={() => handleDelete(id)}
    //       >
    //         Delete
    //       </Button>
    //     </React.Fragment>
    //   ),

    // },
  ],
};
}
export default DataCircle;
