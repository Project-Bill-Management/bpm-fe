import React from 'react';
import { Grid } from '@mui/material';
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Transactions from "layouts/billing/components/Transactions";
import Invoices from "layouts/billing/components/Invoices";

function HistoryTransaction() {
  return (
    <DashboardLayout>
      <SoftBox mt={2}>
        <SoftBox mb={1.5}>
          <Grid container spacing={1}>
            <Grid item xs={6} lg={7} style={{ height: '100%' }}>
              <Transactions />
            </Grid>
            <Grid item xs={6} lg={5} style={{ height: '50%' }}>
              <Invoices />
            </Grid>
          </Grid>
        </SoftBox>
      </SoftBox>
    </DashboardLayout>
  );
}

export default HistoryTransaction;
