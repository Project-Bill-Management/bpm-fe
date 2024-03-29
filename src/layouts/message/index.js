import { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { Card } from '@mui/material';
import { List, ListItem, ListItemText } from '@mui/material';
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

function MessageList() {
  const messagescircle = [
    { id: 1, text: '{username} invite to you join in the {circlename}, Approve now!' }
  ];
  const messagesevent = [
    { id: 1, text: '{username} invite to you join in the {eventname} in {circlename}, Approve now!' }
  ];

  return (
    <DashboardLayout>
      <Card>
        <SoftBox pt={3} px={2}>
          <SoftTypography variant="h6" fontWeight="medium">
            Message List
          </SoftTypography>
        </SoftBox>
        <SoftBox pb={3} />
      </Card>
      <SoftBox pb={3} />
      <Card>
        <SoftBox pt={3} px={2}>
          <SoftTypography variant="h6" fontWeight="medium">
            {messagescircle.map((messagescircle) => (
              <ListItem key={messagescircle.id} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <ListItemText primary={messagescircle.text} />
                <div>
                  <Button variant="contained" color="primary" size="s">
                    Approve
                  </Button>
                  <Button variant="contained" color="dark" size="s">
                    Reject
                  </Button>
                </div>
              </ListItem>
            ))}
          </SoftTypography>
        </SoftBox>
        <SoftBox pb={3} />
      </Card>
      <SoftBox pb={3} />
      <Card>
        <SoftBox pt={3} px={2}>
          <SoftTypography variant="h6" fontWeight="medium">
            {messagesevent.map((messagesevent) => (
              <ListItem key={messagesevent.id} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <ListItemText primary={messagesevent.text} />
                <div>
                  <Button variant="contained" color="primary" size="s">
                    Approve
                  </Button>
                  <Button variant="contained" color="dark" size="s">
                    Reject
                  </Button>
                </div>
              </ListItem>
            ))}
          </SoftTypography>
        </SoftBox>
        <SoftBox pb={3} />
      </Card>
    </DashboardLayout>
  );
}

export default MessageList;
