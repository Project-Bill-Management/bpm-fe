import Card from "@mui/material/Card";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import Bill from "layouts/billing/components/Bill";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

function Message() {
  return (
    <DashboardLayout>
    <Card id="delete-account">
      <SoftBox pt={3} px={2}>
        <SoftTypography variant="h6" fontWeight="medium">
          Message Box
        </SoftTypography>
      </SoftBox>
      <SoftBox pt={1} pb={1} px={5}>
        <SoftBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          <Bill
            message = "Ody Frans invites you to join his circle, accept by pressing approve! "
            name="Circle Name"
            created="Ody Frans"
          />
        </SoftBox>
      </SoftBox>
    </Card>
    </DashboardLayout>
  );
}

export default Message;
