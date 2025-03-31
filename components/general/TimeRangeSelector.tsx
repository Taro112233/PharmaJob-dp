/* eslint-disable @typescript-eslint/no-explicit-any */

import { Control, useController } from "react-hook-form";
import { Slider } from "../ui/slider";
import { useState } from "react";
import { formatTime } from "@/app/utils/formatTime";

interface iAppProps {
    control: Control<any>;
    minTime: number;
    maxTime: number;
    step: number;
}

export function TimeRangeSelector({
    control,
    maxTime,
    minTime,
    step
}: iAppProps) {

    const { field: fromField } = useController({
        name: 'timeFrom',
        control,
    });

    const { field: toField } = useController({
        name: 'timeTo',
        control,
    });

    const [range, setRange] = useState<[number, number]>([
        fromField.value || minTime + 8,
        toField.value || maxTime - 8,
    ]);

    function handleChangeRange(value: number[]) {
        const newrange: [number, number] = [value[0], value[1]];
        setRange(newrange);
        fromField.onChange(newrange[0]);
        toField.onChange(newrange[1]);
    }

    return (
        <div className="w-full space-y-4">
            <Slider
                onValueChange={handleChangeRange}
                min={minTime}
                max={maxTime}
                step={step}
                value={range}
            />
            <div className="flex justify-between">
                <span>{formatTime(range[0])}</span>
                <span>{formatTime(range[1])}</span>
            </div>
        </div>
    );
}