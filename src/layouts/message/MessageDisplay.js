import { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { Card } from '@mui/material';
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

function MessageDisplay() {
    return (
        <DashboardLayout>
            <Card>
                <SoftBox display="flex" justifyContent="space-between" alignItems="center" pt={3} px={3}>
                    <SoftTypography variant="h6" fontWeight="medium">
                        Message Box
                    </SoftTypography>
                </SoftBox>
                <SoftBox pb={3} />
            </Card>
        </DashboardLayout>
    )
}

export default MessageDisplay;