//projects

// @mui material components
import Tooltip from "@mui/material/Tooltip";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";
import SoftProgress from "components/SoftProgress";

// Images
import logoXD from "assets/images/small-logos/logo-xd.svg";
import logoAtlassian from "assets/images/small-logos/logo-atlassian.svg";
import logoSlack from "assets/images/small-logos/logo-slack.svg";
import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
import logoJira from "assets/images/small-logos/logo-jira.svg";
import logoInvesion from "assets/images/small-logos/logo-invision.svg";
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";

export default function data() {
  const avatars = (members) =>
    members.map(([image, name]) => (
      <Tooltip key={name} title={name} placeholder="bottom">
        <SoftAvatar
          src={image}
          alt="name"
          size="xs"
          sx={{
            border: ({ borders: { borderWidth }, palette: { white } }) =>
              `${borderWidth[2]} solid ${white.main}`,
            cursor: "pointer",
            position: "relative",

            "&:not(:first-of-type)": {
              ml: -1.25,
            },

            "&:hover, &:focus": {
              zIndex: "10",
            },
          }}
        />
      </Tooltip>
    ));

  return {
    columns: [
      { name: "circle", align: "left" },
      { name: "members", align: "left" },
      { name: "event", align: "center" },
      { name: "completion", align: "center" },
    ],

    rows: [
      {
        circle: [logoXD, "Soft UI XD Version"],
        members: (
          <SoftBox display="flex" py={1}>
            {avatars([
              [team1, "Ryan Tompson"],
              [team2, "Romina Hadid"],
              [team3, "Alexander Smith"],
              [team4, "Jessica Doe"],
            ])}
          </SoftBox>
        ),
        event: (
          <SoftTypography variant="caption" color="text" fontWeight="medium">
            21
          </SoftTypography>
        ),
        completion: (
          <SoftBox width="8rem" textAlign="left">
            <SoftProgress value={21} color="info" variant="gradient" label={false} />
          </SoftBox>
        ),
      },
      {
        circle: [logoAtlassian, "Add Progress Track"],
        members: (
          <SoftBox display="flex" py={1}>
            {avatars([
              [team2, "Romina Hadid"],
              [team4, "Jessica Doe"],
            ])}
          </SoftBox>
        ),
        event: (
          <SoftTypography variant="caption" color="text" fontWeight="medium">
          5
          </SoftTypography>
        ),
        completion: (
          <SoftBox width="8rem" textAlign="left">
            <SoftProgress value={5} color="info" variant="gradient" label={false} />
          </SoftBox>
        ),
      },
      {
        circle: [logoSlack, "Fix Platform Errors"],
        members: (
          <SoftBox display="flex" py={1}>
            {avatars([
              [team1, "Ryan Tompson"],
              [team3, "Alexander Smith"],
            ])}
          </SoftBox>
        ),
        event: (
          <SoftTypography variant="caption" color="text" fontWeight="medium">
          -
          </SoftTypography>
        ),
        completion: (
          <SoftBox width="8rem" textAlign="left">
            <SoftProgress value={0} color="success" variant="gradient" label={false} />
          </SoftBox>
        ),
      },
      {
        circle: [logoSpotify, "Launch our Mobile App"],
        members: (
          <SoftBox display="flex" py={1}>
            {avatars([
              [team4, "Jessica Doe"],
              [team3, "Alexander Smith"],
              [team2, "Romina Hadid"],
              [team1, "Ryan Tompson"],
            ])}
          </SoftBox>
        ),
        event: (
          <SoftTypography variant="caption" color="text" fontWeight="medium">
            13
          </SoftTypography>
        ),
        completion: (
          <SoftBox width="8rem" textAlign="left">
            <SoftProgress value={13} color="info" variant="gradient" label={false}/>
          </SoftBox>
        ),
      },
      {
        circle: [logoJira, "Add the New Pricing Page"],
        members: (
          <SoftBox display="flex" py={1}>
            {avatars([[team4, "Jessica Doe"]])}
          </SoftBox>
        ),
        event: (
          <SoftTypography variant="caption" color="text" fontWeight="medium">
            7
          </SoftTypography>
        ),
        completion: (
          <SoftBox width="8rem" textAlign="left">
            <SoftProgress value={7} color="info" variant="gradient" label={false} />
          </SoftBox>
        ),
      },
      {
        circle: [logoInvesion, "Redesign New Online Shop"],
        members: (
          <SoftBox display="flex" py={1}>
            {avatars([
              [team1, "Ryan Tompson"],
              [team4, "Jessica Doe"],
            ])}
          </SoftBox>
        ),
        event: (
          <SoftTypography variant="caption" color="text" fontWeight="medium">
            96
          </SoftTypography>
        ),
        completion: (
          <SoftBox width="8rem" textAlign="left">
            <SoftProgress value={96} color="success" variant="gradient" label={false} />
          </SoftBox>
        ),
      },
    ],
  };
}
