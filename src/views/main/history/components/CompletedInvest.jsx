import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";

import Card from "components/card";

const columnHelper = createColumnHelper();

function CompletedInvest({ tableData }) {
  const navigate = useNavigate();
  
  const isArray = Array.isArray(tableData);
  const validData = isArray ? tableData : [];
  const [data, setData] = useState(() => [...validData]);

  const [sorting, setSorting] = useState([{ id: "contractDate", desc: true }]);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    setData([...validData]);
  }, [validData]);

  const columns = [
    columnHelper.accessor("contractDate", {
      id: "contractDate",
      header: ({ column }) => (
        <div className="flex items-center justify-center gap-2">
          <p className="text-sm font-bold text-gray-600 dark:text-white">완료 날짜</p>
          {column.getIsSorted() === "desc" ? (
            <FaSortDown className="text-violet-500" />
          ) : column.getIsSorted() === "asc" ? (
            <FaSortUp className="text-violet-500" />
          ) : (
            <FaSort className="text-gray-400" />
          )}
        </div>
      ),
      cell: (info) => {
        const date = new Date(info.getValue());
        const formattedDate = date.toISOString().split("T")[0];
        return (
          <p className="text-sm font-bold text-navy-700 dark:text-white text-center">
            {formattedDate}
          </p>
        );
      },
    }),
    columnHelper.accessor("startupName", {
      id: "startupName",
      header: ({ column }) => (
        <div className="flex items-center justify-center gap-2">
          <p className="text-sm font-bold text-gray-600 dark:text-white">스타트업</p>
          {column.getIsSorted() === "desc" ? (
            <FaSortDown className="text-violet-500" />
          ) : column.getIsSorted() === "asc" ? (
            <FaSortUp className="text-violet-500" />
          ) : (
            <FaSort className="text-gray-400" />
          )}
        </div>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-center text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor("tokenAmount", {
      id: "tokenAmount",
      header: ({ column }) => (
        <div className="flex items-center justify-center gap-2">
          <p className="text-sm font-bold text-gray-600 dark:text-white">반환 토큰 수량</p>
          {column.getIsSorted() === "desc" ? (
            <FaSortDown className="text-violet-500" />
          ) : column.getIsSorted() === "asc" ? (
            <FaSortUp className="text-violet-500" />
          ) : (
            <FaSort className="text-gray-400" />
          )}
        </div>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-center text-navy-700 dark:text-white">
          {info.getValue() !== null
           ? `${info.getValue()}% PCK` 
           : `미정`}
        </p>
      ),
    }),
    columnHelper.accessor("contractStatus", {
      id: "contractStatus",
      header: ({ column }) => (
        <div className="flex items-center justify-center gap-2">
          <p className="text-sm font-bold text-gray-600 dark:text-white">계약 상태</p>
          {column.getIsSorted() === "desc" ? (
            <FaSortDown className="text-violet-500" />
          ) : column.getIsSorted() === "asc" ? (
            <FaSortUp className="text-violet-500" />
          ) : (
            <FaSort className="text-gray-400" />
          )}
        </div>
      ),
      cell: (info) => {
        const status = info.getValue();
        return (
          <div className="flex items-center justify-center">
            <p
              className={`px-3 py-1 rounded-full text-sm font-bold text-center
                ${status === "COMPLETED"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-gray-100 text-gray-700"
                }`}
            >
              {status === "COMPLETED" ? "완료됨" : "취소됨"}
            </p>
          </div>
        );
      },
    }),
    columnHelper.accessor("progress", {
      id: "progress",
      header: ({ column }) => (
        <div className="flex items-center justify-center gap-2">
          <p className="text-sm font-bold text-gray-600 dark:text-white">수익률</p>
          {column.getIsSorted() === "desc" ? (
            <FaSortDown className="text-violet-500" />
          ) : column.getIsSorted() === "asc" ? (
            <FaSortUp className="text-violet-500" />
          ) : (
            <FaSort className="text-gray-400" />
          )}
        </div>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-center text-navy-700 dark:text-white">
          {info.getValue() !== null
           ? `${info.getValue()}%`
           : `미정`}
        </p>
      ),
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize,
      },
    },
  });

  return (
    <Card extra={"bg-white w-full h-full pt-2 pb-6"}>
      <header className="relative flex items-center justify-between pb-4 px-6 border-b border-gray-200"></header>

      <div className="mx-8 overflow-x-scroll xl:overflow-x-hidden">
      {isArray ? (
          <table className="w-full">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      onClick={header.column.getToggleSortingHandler()}
                      className="cursor-pointer border-b-[1px] border-gray-200 pt-4 pb-4 pr-3 text-center 
                        hover:bg-gray-50 dark:hover:bg-navy-700/50 transition-colors duration-200"
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr
                  key={row.original.contractId}
                  onClick={() => navigate(`/main/history/${Number(row.original.contractId)}`)}
                  className="cursor-pointer hover:bg-gray-50 dark:hover:bg-navy-700/50 transition-colors duration-200"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="min-w-[150px] border-white/0 py-3 pr-4">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>유효한 데이터가 없습니다.</p>
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-8 px-8">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          총 {data.length}건의 거래
        </div>
        <div className="flex items-center gap-6">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="px-4 py-2 text-sm font-medium text-white bg-violet-500 rounded-lg hover:bg-violet-600 
              disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 
              focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
          >
            <FaChevronLeft size={16} />
          </button>
          <span className="font-bold text-sm text-gray-700 dark:text-gray-300">
            {table.getState().pagination.pageIndex + 1} / {table.getPageCount()}
          </span>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="px-4 py-2 text-sm font-medium text-white bg-violet-500 rounded-lg hover:bg-violet-600 
              disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200
              focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
          >
            <FaChevronRight size={16} />
          </button>
        </div>
      </div>
    </Card>
  );
}

export default CompletedInvest;
