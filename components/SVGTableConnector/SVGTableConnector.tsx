import { useEffect, useState, type RefObject } from "react";

interface SVGTableConnectorProps {
  tableRef: RefObject<HTMLDivElement | null>;
  data: any[];
}

export function SVGTableConnector({ tableRef, data }: SVGTableConnectorProps) {
  const [svgHeight, setSvgHeight] = useState(0);
  const [groupPositions, setGroupPositions] = useState<number[]>([]);

  useEffect(() => {
    if (!tableRef.current) return;

    const tableElement = tableRef.current.querySelector("table");
    if (!tableElement) return;

    // Calculate total SVG height
    const totalHeight = tableElement.scrollHeight;
    setSvgHeight(totalHeight);

    // Calculate positions of first row in each group
    const rows = tableElement.querySelectorAll("tbody tr");
    const positions: number[] = [];
    let currentGroup: string | null = null;

    rows.forEach((row) => {
      const cells = row.querySelectorAll("td");
      if (cells.length > 0) {
        const rowElement = row as HTMLElement;
        const groupName = (cells[0] as HTMLElement).textContent?.trim();

        // If we hit a new group, record the position of this first row
        if (groupName && groupName !== currentGroup) {
          currentGroup = groupName;
          const offsetTop = rowElement.offsetTop + rowElement.offsetHeight / 2;
          positions.push(offsetTop);
        }
      }
    });

    setGroupPositions(positions);
  }, [data, tableRef]);

  return (
    <svg
      className="absolute left-2.5 top-0 w-12 pointer-events-none overflow-visible"
      style={{ transform: "translateX(-24px)", height: svgHeight }}
    >
      {/* Vertical line */}
      <line
        x1="24"
        y1="0"
        x2="24"
        y2={groupPositions[groupPositions.length - 1] || svgHeight}
        // stroke="#1E1E1E0F"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.35"
      />
      {/* Horizontal lines to each group - positioned at first row of group */}
      {groupPositions.map((yPos, index) => (
        <line
          key={`connector-${index}`}
          x1="24"
          y1={yPos}
          x2="36"
          y2={yPos}
          // stroke="#1E1E1E0F"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.35"
        />
      ))}
    </svg>
  );
}
