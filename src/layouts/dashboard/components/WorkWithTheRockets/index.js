//container work whit the rockets

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Images
import ivancik from "assets/images/ivancik.jpg";

function WorkWithTheRockets() {
  return (
    <Card sx={{ height: "100%" }}>
      <SoftBox position="relative" height="100%" p={3}>
        <SoftBox
          display="flex"
          flexDirection="column"
          height="100%"
          py={3}
          px={3}
          borderRadius="lg"
          sx={{
            backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
              `${linearGradient(
                rgba(gradients.dark.main, 0.8),
                rgba(gradients.dark.state, 0.8)
              )}, url(${ivancik})`,
            backgroundSize: "cover",
          }}
        >
          <SoftBox mb={3} pt={3}>
            <SoftTypography variant="h5" color="white" fontWeight="bold">
            Create and approve
            </SoftTypography>
          </SoftBox>
          <SoftBox mb={10}>
            <SoftTypography variant="body2" color="white">
            Create a new circle and organize anyone who you think can enter the cricle or event.
            </SoftTypography>
          </SoftBox>
          <SoftTypography
            component="a"
            href="/tables"
            variant="button"
            color="white"
            fontWeight="medium"
            sx={{
              mt: "auto",
              mr: "auto",
              display: "inline-flex",
              alignItems: "center",
              cursor: "pointer",

              "& .material-icons-round": {
                fontSize: "1.125rem",
                transform: `translate(2px, -0.5px)`,
                transition: "transform 0.2s cubic-bezier(0.34,1.61,0.7,1.3)",
              },

              "&:hover .material-icons-round, &:focus  .material-icons-round": {
                transform: `translate(6px, -0.5px)`,
              },
            }}
          >
            More
            <Icon sx={{ fontWeight: "bold" }}>arrow_forward</Icon>
          </SoftTypography>
        </SoftBox>
      </SoftBox>
    </Card>
  );
}

export default WorkWithTheRockets;
