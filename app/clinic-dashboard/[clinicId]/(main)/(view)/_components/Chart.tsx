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

  
  return (
    <div>
      <h3 className="text-lg font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
        Patients accross the week
      </h3>
      <BarChart
        className="h-72"
        data={chartdata}
        index="date"
        categories={['count']}
        colors={['lime']}
        showAnimation={true}
        
      />
    </div>
  );
}