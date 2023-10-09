'use client';

import { useEffect, useState } from "react";
import { billinStatement } from '@prisma/client';

import { DataGrid, GridColDef, GridRowsProp, GridValueGetterParams } from "@mui/x-data-grid";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

const columns = [
  {
    field: "selectCheck",
    headerName: "選択",
    width: 50,
  },
  {
    field: "syshanId",
    headerName: "契約番号",
    width: 150,
  },
  {
    field: "userName",
    headerName: "顧客名",
    width: 200,
  },
  {
    field: "supplyNumber",
    headerName: "契約内容",
    width: 200,
    renderCell: (params: any) => {
        return <div>{params.value.contractMenu}</div>;
    },
  },
  {
    field: "supplyNumberId",
    headerName: "供給地点番号",
    width: 150,
  },
  {
    field: "status",
    headerName: "ステータス",
    width: 100,
    align: "center",
    renderCell: (params: any) => {
      return (
        <div style={{ flexBasis: "300px" }}>
          {params.value === 0 && <span>未作成</span>}
          {params.value === 1 && <span>作成済</span>}
          {params.value === 2 && <span>送信済</span>}
          {params.value === 8 && <span>顧客未登録</span>}
          {params.value === 9 && <span>エラー</span>}
        </div>
      );
    },
  },
  {
    field: "totalAmount",
    headerName: "請求金額",
    width: 150,
  },
];

export default function BillingTable({
  billingList,
}: {
  billingList: billinStatement[];
}) {
  const [tabValue, setTabValue] = useState("1");
  const ChangeTab = (event: any, newValue: string) => {
    setTabValue(newValue);
  };
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  });
  const pageSizeOptions = [10, 25, 100];

  return (
    <TabContext value={tabValue}>
      <div>
        <TabList onChange={ChangeTab} aria-label="lab API tabs example">
          <Tab label="一覧" value="1" />
          <Tab label="差し戻し対象" value="2" />
        </TabList>
      </div>
      <TabPanel value="1">
        <div>
          <div style={{ height: "max-content", width: "100%" }}>
            <DataGrid
              rows={billingList}
              columns={columns}
              getRowId={(list) => list.id}
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
              pageSizeOptions={pageSizeOptions}
              autoHeight
            />
          </div>
        </div>
      </TabPanel>
      <TabPanel value="2">
        <div>
          <div style={{ height: "max-content", width: "100%" }}>
            <DataGrid
              rows={billingList}
              columns={columns}
              getRowId={(list) => list.id}
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
              pageSizeOptions={pageSizeOptions}
              autoHeight
            />
          </div>
        </div>
      </TabPanel>
    </TabContext>
  )
}
