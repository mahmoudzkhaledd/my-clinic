"use client"
import { BarChart } from '@tremor/react';

const chartdata = [
  {
    date: 'Saturday',
    count: 167,
  },
  {
    date: 'Sunday',
    count: 127,
  },
  {
    date: 'Monday',
    count: 167,
  },
  {
    date: 'Tuesday',
    count: 50,
  },
  {
    date: 'Wednesday',
    count: 167,
  },
  {
    date: 'Thursday',
    count: 200,
  },
  {
    date: 'Firday',
    count: 10,
  },
  
];

export function BarsChart() {
  type CustomTooltipTypeBar = {
    payload: any;
    active: boolean | undefined;
    label: any;
  };

  const customTooltip = (props: CustomTooltipTypeBar) => {
    const { payload, active } = props;
    if (!active || !payload) return null;
    return (
      <div className="w-56 rounded-tremor-default border border-tremor-border bg-tremor-background p-2 text-tremor-default shadow-tremor-dropdown">
        {payload.map((category: any, idx: number) => (
          <div key={idx} className="flex flex-1 space-x-2.5">
            <div
              className={`flex w-1 flex-col bg-${category.color}-500 rounded`}
            />
            <div className="space-y-1">
              <p className="text-tremor-content">{category.dataKey}</p>
              <p className="font-medium text-tremor-content-emphasis">
                {category.value} bpm
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  };
  return (
    <div>
      <h3 className="text-lg font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
        Average BPM
      </h3>
      <BarChart
        className="h-72"
        data={chartdata}
        index="date"
        categories={['count']}
        colors={['lime']}
        
       
        // customTooltip={customTooltip}
      />
    </div>
  );
}