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

export default function TotalDisplay({
  totalCount,
  possibleCount,
  totalAmount,
}: {
  totalCount: number;
  possibleCount: number;
  totalAmount: number;
}){
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
          <TableCell>{totalCount}件</TableCell>
          <TableCell>{possibleCount}件</TableCell>
          <TableCell>￥{Number(totalAmount).toLocaleString()}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}
