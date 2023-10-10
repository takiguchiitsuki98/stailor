'use client';
import {
  Text,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Badge,
  TableHeaderCell,
  ProgressBar
} from '@tremor/react';
import React from 'react'

export default function TotalDisplay(){
  return (
    <Table className="mt-5">
      <TableHead>
        <TableRow>
          <TableHeaderCell>合計件数</TableHeaderCell>
          <TableHeaderCell>作成可能件数</TableHeaderCell>
          <TableHeaderCell>合計金額</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
            {/* // TODO 後で変数に置き換え */}
          <TableCell>10件</TableCell>
          <TableCell>20件</TableCell>
          <TableCell>￥123,456,78</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}
