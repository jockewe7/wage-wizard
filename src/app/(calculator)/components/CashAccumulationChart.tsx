"use client";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { TrendingUp, DollarSign, BarChart3 } from 'lucide-react';

interface CashAccumulationChartProps {
  remainingCapital: number;
}

export const CashAccumulationChart = ({ remainingCapital }: CashAccumulationChartProps) => {
  const [investEnabled, setInvestEnabled] = useState(false);
  const [yearlyReturn, setYearlyReturn] = useState("7");

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("sv-SE", {
      style: "currency",
      currency: "SEK",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const generateCashAccumulationData = () => {
    const data = [];
    let accumulatedCash = 0;
    const returnRate = investEnabled ? (Number(yearlyReturn) || 0) / 100 : 0;
    
    for (let year = 0; year <= 10; year++) {
      if (year === 0) {
        // Starting point
        data.push({
          year: `År ${year}`,
          yearNumber: year,
          cash: 0,
          cashFormatted: formatCurrency(0),
        });
      } else {
        // Apply compound growth if investing is enabled
        if (investEnabled && returnRate > 0) {
          // Add yearly contribution and apply compound growth
          accumulatedCash = accumulatedCash * (1 + returnRate) + remainingCapital;
        } else {
          // Simple accumulation without investment returns
          accumulatedCash += remainingCapital;
        }
        
        data.push({
          year: `År ${year}`,
          yearNumber: year,
          cash: Math.max(0, accumulatedCash),
          cashFormatted: formatCurrency(Math.max(0, accumulatedCash)),
        });
      }
    }
    
    return data;
  };

  const chartData = generateCashAccumulationData();
  const finalAmount = chartData[chartData.length - 1]?.cash || 0;
  const averageAnnualSavings = finalAmount / 10; // Simple average over 10 years
  
  // Calculate what the amount would be without investment returns for comparison
  const simpleAccumulation = remainingCapital * 10;
  const investmentGain = finalAmount - simpleAccumulation;

  return (
    <Card className='p-6 md:p-8 shadow-[var(--shadow-card)] border-0 bg-gradient-to-br from-background via-background to-muted/20'>
      {/* Header Section */}
      <div className='flex items-center justify-between mb-6'>
        <div className='flex items-center gap-3'>
          <div className='p-2 rounded-lg bg-primary/10'>
            <TrendingUp className='h-5 w-5 text-primary' />
          </div>
          <div>
            <h3 className='text-xl font-bold text-foreground'>
              Kassaansamling i bolaget
            </h3>
            <p className='text-sm text-muted-foreground'>10-årsprognos</p>
          </div>
        </div>
        <div className='text-right'>
          <p className='text-xs text-muted-foreground'>Nettokassa efter 10 år</p>
          <p className='text-lg font-bold text-primary'>{formatCurrency(finalAmount)}</p>
        </div>
      </div>

      {/* Main Content: Settings Left, Chart Right */}
      <div className='grid lg:grid-cols-4 gap-6 mb-6'>
        {/* Investment Settings Section - Left Side */}
        <div className='lg:col-span-1'>
          <div className='p-4 rounded-lg bg-muted/20 border border-border/50 h-full'>
            <div className='flex items-center gap-3 mb-4'>
              <BarChart3 className='h-5 w-5 text-primary' />
              <h4 className='text-lg font-semibold text-foreground'>Inställningar</h4>
            </div>
            
            <div className='space-y-4'>
              <div className='flex items-center space-x-2'>
                <Checkbox 
                  id="invest-enabled" 
                  checked={investEnabled}
                  onCheckedChange={(checked) => setInvestEnabled(checked as boolean)}
                />
                <Label 
                  htmlFor="invest-enabled" 
                  className='text-sm font-medium text-foreground cursor-pointer'
                >
                  Investera överskottskapital
                </Label>
              </div>
              
              {investEnabled && (
                <div className='space-y-2'>
                  <Label htmlFor='yearly-return' className='text-sm text-foreground'>
                    Årlig avkastning (%)
                  </Label>
                  <Input
                    id='yearly-return'
                    type='number'
                    value={yearlyReturn}
                    onChange={(e) => setYearlyReturn(e.target.value)}
                    className='text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                    placeholder="7"
                    min="0"
                    max="50"
                    step="0.1"
                  />
                </div>
              )}
            </div>
            
            {investEnabled && (
              <p className='text-xs text-muted-foreground mt-4 leading-relaxed'>
                Kassaöverskottet investeras med {yearlyReturn}% årlig avkastning (CAGR). 
                Detta ger ränta på ränta-effekt över tid.
              </p>
            )}
          </div>
        </div>

        {/* Chart Section - Right Side */}
        <div className='lg:col-span-3'>
          <div className='h-96'>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 100,
              bottom: 20,
            }}
          >
            <defs>
              <linearGradient id="cashGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0.05}/>
              </linearGradient>
            </defs>
            <CartesianGrid 
              strokeDasharray="3 3" 
              className="opacity-20" 
              stroke="hsl(var(--muted-foreground))"
            />
            <XAxis 
              dataKey="year" 
              className="text-xs text-muted-foreground"
              tick={{ fontSize: 12 }}
              axisLine={{ stroke: 'hsl(var(--border))' }}
              tickLine={{ stroke: 'hsl(var(--border))' }}
            />
            <YAxis 
              tickFormatter={(value) => new Intl.NumberFormat("sv-SE", { 
                notation: "compact",
                compactDisplay: "short"
              }).format(value)}
              className="text-xs text-muted-foreground"
              width={90}
              tickCount={6}
              tick={{ fontSize: 11 }}
              axisLine={{ stroke: 'hsl(var(--border))' }}
              tickLine={{ stroke: 'hsl(var(--border))' }}
            />
            <Tooltip 
              formatter={(value: number) => [formatCurrency(value), 'Kassasaldo']}
              labelFormatter={(label) => `${label}`}
              contentStyle={{
                backgroundColor: 'hsl(var(--popover))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                fontSize: '14px',
              }}
              cursor={{
                strokeDasharray: '5 5',
                stroke: 'hsl(var(--primary))',
                strokeWidth: 1,
                opacity: 0.5,
              }}
            />
            <Area
              type="monotone"
              dataKey="cash"
              stroke="hsl(var(--primary))"
              strokeWidth={3}
              fill="url(#cashGradient)"
              dot={{ 
                fill: 'hsl(var(--primary))', 
                strokeWidth: 2, 
                r: 4,
                stroke: 'hsl(var(--background))'
              }}
              activeDot={{ 
                r: 7, 
                stroke: 'hsl(var(--primary))', 
                strokeWidth: 3,
                fill: 'hsl(var(--background))'
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className={`grid ${investEnabled ? 'md:grid-cols-4' : 'md:grid-cols-3'} gap-4 pt-4 border-t border-border`}>
        <div className='flex items-center gap-3 p-3 rounded-lg bg-muted/30'>
          <DollarSign className='h-4 w-4 text-primary' />
          <div>
            <p className='text-xs font-medium text-muted-foreground'>Årligt kapitalöverskott</p>
            <p className='text-sm font-semibold text-foreground'>{formatCurrency(remainingCapital)}</p>
          </div>
        </div>
        
        {investEnabled && (
          <div className='flex items-center gap-3 p-3 rounded-lg bg-emerald-500/10'>
            <TrendingUp className='h-4 w-4 text-emerald-600' />
            <div>
              <p className='text-xs font-medium text-muted-foreground'>Investeringsavkastning</p>
              <p className='text-sm font-semibold text-emerald-600'>
                {formatCurrency(investmentGain)}
              </p>
            </div>
          </div>
        )}
        
        <div className='flex items-center gap-3 p-3 rounded-lg bg-muted/30'>
          <TrendingUp className='h-4 w-4 text-emerald-500' />
          <div>
            <p className='text-xs font-medium text-muted-foreground'>
              {investEnabled ? 'Effektiv årlig tillväxt' : 'Genomsnittligt årssparande'}
            </p>
            <p className='text-sm font-semibold text-foreground'>
              {investEnabled 
                ? `${Number(yearlyReturn) || 0}%` 
                : formatCurrency(averageAnnualSavings)
              }
            </p>
          </div>
        </div>
        <div className='flex items-center gap-3 p-3 rounded-lg bg-muted/30'>
          <div className='h-4 w-4 rounded-full bg-primary' />
          <div>
            <p className='text-xs font-medium text-muted-foreground'>Total ackumulering</p>
            <p className='text-sm font-semibold text-foreground'>{formatCurrency(finalAmount)}</p>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className='mt-4 p-4 rounded-lg bg-muted/20 border border-border/50'>
        <p className='text-sm text-muted-foreground leading-relaxed'>
          {investEnabled 
            ? `Prognosen visar hur kassasaldot utvecklas över tid med ${yearlyReturn}% årlig avkastning. Det årliga överskottet på ${formatCurrency(remainingCapital)} investeras och växer med ränta på ränta-effekt över 10 år.`
            : 'Prognosen visar hur kassasaldot utvecklas över tid baserat på nuvarande inställningar. Varje år läggs det återstående kapitalet till bolagets kassa utan investeringsavkastning.'
          }
        </p>
      </div>
    </Card>
  );
};