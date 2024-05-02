/**
=========================================================
* Soft UI Dashboard React - v4.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Card from "@mui/material/Card";
// import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Billing page components
import Transaction from "layouts/billing/components/Transaction";

function Transactions() {
  return (
    <Card sx={{ height: "100%" }}>
      <SoftBox display="flex" justifyContent="space-between" alignItems="center" pt={3} px={2}>
        <SoftTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          Your Transaction&apos;s
        </SoftTypography>
        <SoftBox display="flex" alignItems="flex-start">
          <SoftBox color="text" mr={0.5} lineHeight={0}>
            <Icon color="inherit" fontSize="small">
              date_range
            </Icon>
          </SoftBox>
          <SoftTypography variant="button" color="text" fontWeight="regular">
            02-05-2024 s/d 02-06-2024
          </SoftTypography>
        </SoftBox>
      </SoftBox>
      <SoftBox pt={3} pb={2} px={2}>
        <SoftBox mb={2}>
          <SoftTypography
            variant="caption"
            color="text"
            fontWeight="bold"
            textTransform="uppercase"
          >
            newest
          </SoftTypography>
        </SoftBox>
        <SoftBox
          component="ul"
          display="flex"
          flexDirection="column"
          p={0}
          m={0}
          sx={{ listStyle: "none" }}
        >
          <Transaction
            color="error"
            icon="arrow_downward"
            name="Iuran 'Beli galon event kampanye'"
            description="02-05-2024"
            value="- Rp. 5000"
          />
          <Transaction
            color="success"
            icon="arrow_upward"
            name="'Iuran beli bolpoint event kampanye' di Acc"
            description="01-05-2024"
            value="+ 2.000"
          />
        </SoftBox>
        <SoftBox mt={1} mb={2}>
          <SoftTypography
            variant="caption"
            color="text"
            fontWeight="bold"
            textTransform="uppercase"
          >
            yesterday
          </SoftTypography>
        </SoftBox>
        <SoftBox
          component="ul"
          display="flex"
          flexDirection="column"
          p={0}
          m={0}
          sx={{ listStyle: "none" }}
        >
           <Transaction
            color="dark"
            icon="priority_high"
            name="Iuran beli bolpoint event kampanye"
            description="30-04-2024"
            value="Pending"
          />
          <Transaction
            color="error"
            icon="arrow_downward"
            name="Iuran 'Beli bolpoint event kampanye"
            description="30-04-2024"
            value="- 2.000"
          />
           <Transaction
            color="error"
            icon="arrow_downward"
            name="Iuran 'Beli galon event kampanye'"
            description="02-05-2024"
            value="- Rp. 5000"
          />
          <Transaction
            color="success"
            icon="arrow_upward"
            name="'Iuran beli bolpoint event kampanye' di Acc"
            description="01-05-2024"
            value="+ 2.000"
          />
           <Transaction
            color="error"
            icon="arrow_downward"
            name="Iuran 'Beli galon event kampanye'"
            description="02-05-2024"
            value="- Rp. 5000"
          />
          <Transaction
            color="success"
            icon="arrow_upward"
            name="'Iuran beli bolpoint event kampanye' di Acc"
            description="01-05-2024"
            value="+ 2.000"
          />
        </SoftBox>
      </SoftBox>
    </Card>
  );
}

export default Transactions;
