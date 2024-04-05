"use client"
import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const CircularProgressBar = ({ size, strokeWidth, progress, className, fontSize }: {
    size: number;
    strokeWidth: number;
    progress: number;
    className?: string;
    fontSize: number;
}) => {
    return <div className={cn(" max-w-[150px] aspect-square", className)}>
        <CircularProgressbar
            value={progress}
            text={`${progress}%`}
            styles={buildStyles({
                strokeLinecap: 'butt',
                textSize: '15px',
                pathTransitionDuration: 0.5,
                pathColor: `#27272a`,
                textColor: '#f88',
            })}
        />
    </div>
    
};
export default CircularProgressBar;