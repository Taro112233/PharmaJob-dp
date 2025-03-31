/* eslint-disable @typescript-eslint/no-explicit-any */

import { Control, useController } from "react-hook-form";
import { Slider } from "../ui/slider";
import { useState } from "react";
import { formatCurrency } from "@/app/utils/formatCurrency";

interface iAppProps {
    control: Control<any>;
    minSalary: number;
    maxSalary: number;
    step: number;
}

export function SalaryRangeSelector({
    control,
    maxSalary,
    minSalary,
    step
}: iAppProps) {

    const { field: fromField } = useController({
        name: 'salaryFrom',
        control,
    });

    const { field: toField } = useController({
        name: 'salaryTo',
        control,
    });

    const [range, setRange] = useState<[number, number]>([
        fromField.value || minSalary + 30000,
        toField.value || maxSalary / 2,
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
                min={minSalary}
                max={maxSalary}
                step={step}
                value={range}
            />
            <div className="flex justify-between">
                <span>{formatCurrency(range[0])}</span>
                <span>{formatCurrency(range[1])}</span>
            </div>
        </div>
    );
}