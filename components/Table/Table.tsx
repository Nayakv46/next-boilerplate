import {
  flexRender,
  type ReactTable,
  type Row,
  type RowData,
  type Column,
  type StockFeatures,
  type TableFeatures,
  type TableState_All,
  type CellData,
} from "@tanstack/react-table";
import React from "react";

import { ScoreGauge } from "@/components/ScoreGauge/ScoreGauge";

declare module "@tanstack/table-core" {
  interface ColumnMeta<
    in out TFeatures extends TableFeatures,
    in out TData extends RowData,
    TValue extends CellData = CellData,
  > {
    widthRatio?: number;
    isGroupScoreColumn?: boolean;
    headerClassName?: string;
    cellClassName?: string;
    outerCellClassName?: string;
    minWidth?: string;
  }
}

interface TableColumnMeta {
  widthRatio?: number;
  isGroupScoreColumn?: boolean;
  headerClassName?: string;
  cellClassName?: string;
  outerCellClassName?: string;
  minWidth?: string;
}

function getColumnMeta<TFeatures extends TableFeatures, TData extends RowData>(
  column: Column<TFeatures, TData>,
): TableColumnMeta {
  return (column.columnDef.meta ?? {}) as TableColumnMeta;
}

interface Props<TData extends RowData> {
  table: ReactTable<StockFeatures, TData>;
  className?: string;
  // Optional external function to provide additional classname for each row.
  // Receives the row and the visible row index.
  rowClassName?: (
    row: Row<StockFeatures, TData>,
    index: number,
  ) => string | undefined;
}

interface GroupInfo {
  score: number;
  rowCount: number;
  startIndex: number;
}

export function Table<TData extends RowData>({
  table,
  className,
  rowClassName,
}: Props<TData>) {
  const rows = table.getRowModel().rows;
  const state = table.state as TableState_All;
  const groupKey = state.grouping?.[0];

  // In grouped mode, top-level rows are group containers.
  // Use leaf rows for the custom table rendering.
  const visibleRows = groupKey
    ? rows.flatMap((row) => row.getLeafRows())
    : rows.filter((row) => !row.getIsGrouped());

  // Calculate total width ratio
  const totalRatio = table
    .getAllLeafColumns()
    .reduce(
      (sum, col) =>
        sum + (getColumnMeta<StockFeatures, TData>(col).widthRatio ?? 1),
      0,
    );

  // Get width percentage for a column
  const getColumnWidth = (widthRatio: number) => {
    return `${((widthRatio / totalRatio) * 100).toFixed(2)}%`;
  };

  // Find the gauge column
  const gaugeColumn = table
    .getAllLeafColumns()
    .find(
      (col) =>
        getColumnMeta<StockFeatures, TData>(col).isGroupScoreColumn === true,
    );

  // Calculate average functional score for a group
  const getGroupScore = (groupValue: string) => {
    if (!groupKey || !gaugeColumn) return 0;
    const groupRows = visibleRows.filter(
      (row) => row.getValue<string>(groupKey) === groupValue,
    );
    const scores = groupRows
      .map((row) => {
        const score = row.getValue<number | string>(gaugeColumn.id);
        const numericScore =
          typeof score === "number" ? score : Number(score);
        return Number.isFinite(numericScore) ? numericScore : 0;
      })
      .filter((score) => score > 0);

    if (scores.length === 0) return 0;
    return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  };

  // Calculate group information for gauge rendering
  const groupInfo = new Map<string, GroupInfo>();
  visibleRows.forEach((row, index) => {
    const currentGroup = groupKey
      ? row.getValue<string>(groupKey)
      : undefined;
    if (currentGroup && groupKey && !groupInfo.has(currentGroup)) {
      const count = visibleRows.filter(
        (r) => r.getValue<string>(groupKey) === currentGroup,
      ).length;
      groupInfo.set(currentGroup, {
        score: getGroupScore(currentGroup),
        rowCount: count,
        startIndex: index,
      });
    }
  });

  return (
    <div className={`w-full flex gap-4 ${className || ""}`}>
      <div className="flex-1 overflow-x-auto rounded-lg">
        <table
          className="w-full min-w-[500px]"
          style={{ tableLayout: "fixed" }}
        >
          <thead>
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id}>
                {hg.headers.map((h) => {
                  const meta = getColumnMeta<StockFeatures, TData>(h.column);
                  const widthRatio = meta?.widthRatio ?? 1;
                  const isGaugeColumn = meta?.isGroupScoreColumn === true;

                  // Skip gauge column header
                  if (isGaugeColumn) {
                    return null;
                  }

                  return (
                    <th
                      key={h.id}
                      style={{ width: getColumnWidth(widthRatio) }}
                      className={`px-4 py-3 text-left text-sm font-medium truncate ${
                        meta?.headerClassName || ""
                      }`}
                      title={h.column.columnDef.header?.toString() || ""}
                    >
                      {h.isPlaceholder
                        ? null
                        : flexRender(h.column.columnDef.header, h.getContext())}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>

          <tbody>
            {visibleRows.map((row, index) => {
              const prev = visibleRows[index - 1];
              const next = visibleRows[index + 1];

              const currentGroup = groupKey
                ? row.getValue<string>(groupKey)
                : undefined;
              const prevGroup =
                groupKey && prev
                  ? prev.getValue<string>(groupKey)
                  : undefined;
              const nextGroup =
                groupKey && next
                  ? next.getValue<string>(groupKey)
                  : undefined;

              const isStartOfGroup =
                !groupKey || index === 0 || currentGroup !== prevGroup;

              const isEndOfGroup =
                !groupKey ||
                index === visibleRows.length - 1 ||
                currentGroup !== nextGroup;

              return (
                <React.Fragment key={row.id}>
                  {/* GAP between groups */}
                  {groupKey && isStartOfGroup && index !== 0 && (
                    <tr>
                      <td colSpan={table.getAllLeafColumns().length}>
                        <div className="h-2" />
                      </td>
                    </tr>
                  )}

                  <tr
                    className={`transition hover:opacity-80 ${
                      rowClassName ? (rowClassName(row, index) ?? "") : ""
                    }`}
                  >
                    {(() => {
                      const visibleCells = row
                        .getVisibleCells()
                        .filter(
                          (cell) =>
                            getColumnMeta<StockFeatures, TData>(cell.column)
                              .isGroupScoreColumn !== true,
                        );

                      const nonHiddenCellIndexes = visibleCells
                        .map((cell, idx) => {
                          const meta = getColumnMeta<StockFeatures, TData>(
                            cell.column,
                          );
                          const classNames = `${meta?.headerClassName || ""} ${
                            meta?.cellClassName || ""
                          }`;
                          const isHiddenByClass = /(^|\s)w-0(\s|$)/.test(
                            classNames,
                          );
                          const isHiddenByRatio = meta?.widthRatio === 0;
                          return isHiddenByClass || isHiddenByRatio ? -1 : idx;
                        })
                        .filter((idx) => idx !== -1);

                      const firstVisibleIndex = nonHiddenCellIndexes[0] ?? 0;
                      const lastVisibleIndex =
                        nonHiddenCellIndexes[nonHiddenCellIndexes.length - 1] ??
                        visibleCells.length - 1;

                      return visibleCells.map((cell, visibleIndex) => {
                        const isFirst = visibleIndex === firstVisibleIndex;
                        const isLast = visibleIndex === lastVisibleIndex;
                        const meta = getColumnMeta<StockFeatures, TData>(
                          cell.column,
                        );
                        const widthRatio = meta?.widthRatio ?? 1;

                        const base = "px-4 py-2 text-sm";

                        const rounding = [
                          isStartOfGroup && isFirst ? "rounded-tl-lg" : "",
                          isStartOfGroup && isLast ? "rounded-tr-lg" : "",
                          isEndOfGroup && isFirst ? "rounded-bl-lg" : "",
                          isEndOfGroup && isLast ? "rounded-br-lg" : "",
                        ]
                          .filter(Boolean)
                          .join(" ");

                        return (
                          <td
                            key={cell.id}
                            style={{ width: getColumnWidth(widthRatio) }}
                            className={`${base} ${rounding} ${
                              meta?.outerCellClassName || ""
                            }`}
                          >
                            <div
                              className={`truncate ${
                                meta?.cellClassName || ""
                              }`}
                            >
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext(),
                              )}
                            </div>
                          </td>
                        );
                      });
                    })()}
                  </tr>
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Gauges Container */}
      {groupKey && gaugeColumn && (
        <div className="flex flex-col  min-w-max mt-11">
          {visibleRows.map((row, index) => {
            const currentGroup = row.getValue<string>(groupKey);
            const prev = visibleRows[index - 1];
            const isStartOfGroup =
              index === 0 ||
              currentGroup !== prev?.getValue<string>(groupKey);

            if (!isStartOfGroup) return null;

            const info = groupInfo.get(currentGroup);
            if (!info) return null;

            // Add gap between groups
            if (index !== 0) {
              return (
                <React.Fragment key={`gap-${currentGroup}`}>
                  <div className="h-2.5" />
                  <div
                    key={currentGroup}
                    style={{ height: `${info.rowCount * 36}px` }}
                    className="flex items-center justify-center rounded-lg p-4"
                  >
                    <ScoreGauge
                      score={info.score}
                      label={currentGroup}
                      size={Math.min(Math.max(info.rowCount * 20, 30), 70)}
                      functionName={currentGroup}
                    />
                  </div>
                </React.Fragment>
              );
            }

            return (
              <div
                key={currentGroup}
                style={{ height: `${info.rowCount * 36}px` }}
                className="flex items-center justify-center rounded-lg p-4"
              >
                <ScoreGauge
                  score={info.score}
                  label={currentGroup}
                  size={Math.min(Math.max(info.rowCount * 20, 30), 70)}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
