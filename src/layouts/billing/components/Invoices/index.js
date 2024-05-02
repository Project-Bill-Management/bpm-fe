// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";

// Billing page components
import Invoice from "layouts/billing/components/Invoice";

function Invoices() {
  return (
    <Card id="delete-account" sx={{ height: "100%" }}>
      <SoftBox pt={2} px={2} display="flex" justifyContent="space-between" alignItems="center">
        <SoftTypography variant="h6" fontWeight="medium">
          Invoices
        </SoftTypography>
        <SoftButton variant="outlined" color="info" size="small">
          view all
        </SoftButton>
      </SoftBox>
      <SoftBox p={2}>
        <SoftBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          <Invoice date="March, 01, 2024" id="#MS-415646" price="Rp. 180.000" icon="description" />
          <Invoice date="February, 10, 2024" id="#RV-126749" price="Rp. 250.000" icon="description" />
          <Invoice date="April, 05, 2024" id="#QW-103578" price="Rp. 120.000" icon="description" />
          <Invoice date="June, 25, 2024" id="#MS-415646" price="Rp. 180.000" icon="description" />
          <Invoice date="March, 01, 2024" id="#AR-803481" price="Rp. 300.000" icon="description" noGutter />
        </SoftBox>
      </SoftBox>
    </Card>
  );
}

export default Invoices;
