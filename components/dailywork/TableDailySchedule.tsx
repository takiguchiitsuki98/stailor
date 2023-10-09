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

const data = [
    {
        taskName: "ZZZ-99ZZ001_【立川】タスク整理・管理",
        EstimatedTime: "2",
        ActualTime: "1",
        status: "対応中",
        progress: 50
    }, {
        taskName: "A14-01ME001_【Brasinha】見積・提案内容作成",
        EstimatedTime: "3",
        ActualTime: "3",
        status: "対応中",
        progress: 100
    }, {
        taskName: "A06-01ZZ002_【辻田建機】Stailor定例MTG",
        EstimatedTime: "3",
        ActualTime: "3",
        status: "対応中",
        progress: 0
    }, {
        taskName: "A06-01ZZ002_【辻田建機】Stailor定例MTG",
        EstimatedTime: "3",
        ActualTime: "3",
        status: "対応中",
        progress: 30
    },
];
export const TableDailySchedule = () => {
    return (
        <Table className="mt-5">
            <TableHead>
                <TableRow>
                    <TableHeaderCell>タスク名</TableHeaderCell>
                    <TableHeaderCell>予定(/h)</TableHeaderCell>
                    <TableHeaderCell>実績(/h)</TableHeaderCell>
                    <TableHeaderCell>ステータス</TableHeaderCell>
                    <TableHeaderCell>進捗</TableHeaderCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {data.map((item) => (
                    <TableRow key={item.taskName}>
                        <TableCell>
                            <a href="/" className='text-blue-600 underline'>{item.taskName}</a>
                        </TableCell>
                        <TableCell>
                            <Text>{item.EstimatedTime}</Text>
                        </TableCell>
                        <TableCell>
                            <Text>{item.ActualTime}</Text>
                        </TableCell>
                        <TableCell>
                            <Badge color="emerald">
                                {item.status}
                            </Badge>
                        </TableCell>
                        <TableCell>
                            {item.progress}% <ProgressBar value={item.progress} color="teal" className="mt-3" />                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
