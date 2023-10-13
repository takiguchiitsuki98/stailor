'use client';

import { useEffect, useState } from "react";
import { BillinStatement } from '@prisma/client';

import { DataGrid, GridColDef, GridRowsProp, GridValueGetterParams } from "@mui/x-data-grid";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useForm, SubmitHandler } from "react-hook-form";

import {
  Card,
  Button,
} from '@tremor/react';

import { createPdf } from './createPdf';

// 明細作成対象
interface PdfData {
  syshanIDs: string[];
}

export default function BillingTable({
  billingList,
}: {
  billingList: BillinStatement[];
}) {
  const [tabValue, setTabValue] = useState("1");
  const ChangeTab = (event: any, newValue: string) => {
    setTabValue(newValue);
  };
  
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<PdfData>({ mode: "onChange" })

  const columns = [
    {
      field: "selectCheck",
      headerName: "選択",
      width: 50,
      renderCell: (params: any) => {
        return (
          <input
            id={params.id}
            type="checkbox"
            value={params.id}
            defaultChecked={false}
            disabled={false}
          {...register("syshanIDs")}
          />
        );
      },
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
      field: "supplyNumber",
      headerName: "供給地点名",
      width: 200,
      renderCell: (params: any) => {
          return <div>{params.value.supplyName}</div>;
      },
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

  let filteredList = billingList;
  // 未作成
  if (tabValue === "1") {
    filteredList = filteredList.filter((billing => billing.status === 0));
  // エラー
  } else if (tabValue === "3") {
    filteredList = filteredList.filter((billing => billing.status === 9));
  // 作成済み
  } else if (tabValue === "4") {
    filteredList = filteredList.filter((billing => billing.status === 1 || billing.status === 2));
  // 未連携
  } else if (tabValue === "5") {
    filteredList = filteredList.filter((billing => billing.status === 1));      
  // 連携済み
  } else if (tabValue === "6") {
    filteredList = filteredList.filter((billing => billing.status === 2));      
  }

  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  });
  const pageSizeOptions = [10, 25, 100];

  const onSubmit: SubmitHandler<PdfData> = async (data: PdfData) => {
    if (!data.syshanIDs){
      alert("対象明細をチェックしてください")
      return;
    }
    // alert("SubmitHandler : " + data.syshanIDs)

    // PDF作成 // TODO 後で引数渡しに修正
    await createPdf();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TabContext value={tabValue}>
        <div>
          <TabList onChange={ChangeTab} aria-label="lab API tabs example">
            <Tab label="未作成" value="1" />
            <Tab label="全件" value="2" />
            <Tab label="エラー" value="3" />
            <Tab label="作成済み" value="4" />
            <Tab label="未連携" value="5" />
            <Tab label="連携済み" value="6" />
          </TabList>
        </div>
        <TabPanel value="1">
          <div>
            <div style={{ height: "max-content", width: "100%" }}>
              <DataGrid
                rows={filteredList}
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
                rows={filteredList}
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
        <TabPanel value="3">
          <div>
            <div style={{ height: "max-content", width: "100%" }}>
              <DataGrid
                rows={filteredList}
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
        <TabPanel value="4">
          <div>
            <div style={{ height: "max-content", width: "100%" }}>
              <DataGrid
                rows={filteredList}
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
        <TabPanel value="5">
          <div>
            <div style={{ height: "max-content", width: "100%" }}>
              <DataGrid
                rows={filteredList}
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
        <TabPanel value="6">
          <div>
            <div style={{ height: "max-content", width: "100%" }}>
              <DataGrid
                rows={filteredList}
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
      <Card className="max-w-xs mt-3">
        <button type="submit" disabled={!isValid || isSubmitting}>明細作成</button>
        {/* <button onClick={createPdf}>明細作成</button> */}
      </Card>
      <Card className="max-w-xs mt-3">
        <button type="submit" disabled={!isValid || isSubmitting}>全件明細作成</button>
      </Card>
    </form>
  )
}
