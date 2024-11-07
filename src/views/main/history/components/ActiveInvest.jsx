import React from "react";
import Card from "components/card";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

function ActiveInvest(props) {
  const { tableData } = props;
  const [sorting, setSorting] = React.useState([]);
  let defaultData = tableData;
  const columns = [
    columnHelper.accessor("name", {
      id: "name",
      header: () => (
        <p className="text-sm font-bold text-gray-600">스타트업</p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700">{info.getValue()}</p>
      ),
    }),
    columnHelper.accessor("progress", {
      id: "progress",
      header: () => (
        <p className="text-sm font-bold text-gray-600">목표 진행도</p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700">{info.getValue()}%</p>
      ),
    }),
    columnHelper.accessor("token", {
      id: "token",
      header: () => (
        <p className="text-sm font-bold text-gray-600">투자한 토큰</p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700">{info.getValue()}</p>
      ),
    }),
    columnHelper.accessor("date", {
      id: "date",
      header: () => (
        <p className="text-sm font-bold text-gray-600">거래체결일</p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700">{info.getValue()}</p>
      ),
    }),
    {
      id: "details",
      header: () => <span className="text-sm font-bold text-gray-600">계약 상세내용</span>,
      cell: () => (
        <button className="text-sm font-bold text-white bg-navy-700 px-4 py-1 rounded-full">
          상세 보기
        </button>
      ),
    },
    {
      id: "status",
      header: () => <span className="text-sm font-bold text-gray-600">계약 진행상황</span>,
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700">{info.getValue()}</p>
      ),
    },
  ];
  const [data, setData] = React.useState(() => [...defaultData]);
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <Card extra={"w-full pb-10 p-4 h-full"}>
      <header className="relative flex items-center justify-center">
        <div className="text-xl font-semibold text-navy-700">
          투자 내역 조회
        </div>
      </header>

      <div className="mt-8 overflow-x-auto">
        <table className="w-full">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="!border-px !border-gray-400">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className="border-b-[1px] border-gray-200 pt-4 pb-2 text-start"
                  >
                    <div className="text-xs text-gray-500">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="text-navy-700 font-bold text-sm">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border-b border-gray-200">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="py-3 px-4">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

export default ActiveInvest;

const columnHelper = createColumnHelper();
