import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import SoftBox from "components/SoftBox";
import breakpoints from "assets/theme/base/breakpoints";
import curved0 from "assets/images/curved-images/curved0.jpg";
import { useNavigate, useParams } from 'react-router-dom';
import Grid from "@mui/material/Grid";
import AppBar from "@mui/material/AppBar";
import SoftTypography from "components/SoftTypography";
import { CenterFocusStrong } from "@mui/icons-material";

function Headerdetail() {
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const navigate = useNavigate();
  const {nama_event} = useParams();

  useEffect(() => {
    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.sm
        ? setTabsOrientation("vertical")
        : setTabsOrientation("horizontal");
    }

    window.addEventListener("resize", handleTabsOrientation);
    handleTabsOrientation();

    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, [tabsOrientation]);

  return (
    <SoftBox position="relative">
      <SoftBox
        display="flex"
        alignItems="center"
        justifyContent="center"
        position="relative"
        minHeight="10rem"
        borderRadius="xl"
        sx={{
          backgroundImage: `url(${curved0})`,
          backgroundSize: "cover",
          backgroundPosition: "25%",
          overflow: "hidden",
        }}
      />
            {/* <Card
        sx={{
          backdropFilter: `saturate(200%) blur(30px)`,
          backgroundColor: ({ functions: { rgba }, palette: { white } }) => rgba(white.main, 0.8),
          boxShadow: ({ boxShadows: { navbarBoxShadow } }) => navbarBoxShadow,
          position: "relative",
          mt: -8,
          mx: 3,
          py: 2,
          px: 30,
        }}
      >
        <Grid container spacing={3} alignItems="center">
        <Grid item>
            <SoftBox height="100%" mt={0.5} lineHeight={1}>
              <SoftTypography variant="h5" fontWeight="medium" textAlign="center">
                {nama_event}
              </SoftTypography>
            </SoftBox>
          </Grid>
        </Grid>
      </Card> */}
    </SoftBox>
  );
}

export default Headerdetail;
