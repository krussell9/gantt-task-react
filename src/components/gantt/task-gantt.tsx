import React, { useRef, useEffect } from "react";
import { GridProps, Grid } from "../grid/grid";
import { CalendarProps, Calendar } from "../calendar/calendar";
import { TaskGanttContentProps, TaskGanttContent } from "./task-gantt-content";
import styles from "./gantt.module.css";

export type TaskGanttProps = {
  gridProps: GridProps;
  calendarProps: CalendarProps;
  barProps: TaskGanttContentProps;
  ganttHeight: number;
  scrollY: number;
  scrollX: number;
};
export const TaskGantt: React.FC<TaskGanttProps> = ({
  gridProps,
  calendarProps,
  barProps,
  ganttHeight,
  scrollY,
  scrollX,
}) => {
  // Unused vars: ganttHeight, scrollY, scrollX
  void ganttHeight;
  void scrollY;
  void scrollX;
  const ganttSVGRef = useRef<SVGSVGElement>(null);
  const horizontalContainerRef = useRef<HTMLDivElement>(null);
  const verticalGanttContainerRef = useRef<HTMLDivElement>(null);
  const newBarProps = { ...barProps, svg: ganttSVGRef };

  useEffect(() => {
    // Removed manual sync
  }, [scrollY]);

  useEffect(() => {
    // Removed manual sync
  }, [scrollX]);

  return (
    <div
      className={styles.ganttVerticalContainer} // .ganttVerticalContainer { overflow: hidden; }
      ref={verticalGanttContainerRef}
      dir="ltr"
      style={{
        display: "block",
        minWidth: gridProps.svgWidth,
        flex: 1, // Allow taking remaining space
        overflow: "visible", // Override CSS overflow: hidden
        height: "fit-content", // Allow container to grow, doesn't trap sticky
      }}
    >
        <div style={{ position: "sticky", top: 0, zIndex: 10, backgroundColor: "#fff", height: calendarProps.headerHeight, width: "100%", overflow: "hidden" }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={gridProps.svgWidth}
          height={calendarProps.headerHeight}
          fontFamily={barProps.fontFamily}
        >
          <Calendar {...calendarProps} />
        </svg>
      </div>
      <div
        ref={horizontalContainerRef}
        className={styles.horizontalContainer}
        style={{ width: gridProps.svgWidth, overflow: "visible" }} // Override CSS overflow: hidden
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={gridProps.svgWidth}
          height={barProps.rowHeight * barProps.tasks.length}
          fontFamily={barProps.fontFamily}
          ref={ganttSVGRef}
        >
          <Grid {...gridProps} />
          <TaskGanttContent {...newBarProps} />
        </svg>
      </div>
    </div>
  );
};
