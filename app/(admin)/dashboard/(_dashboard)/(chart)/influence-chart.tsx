"use client"

import { useMemo } from "react"
import { Label, Pie, PieChart } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { Exposant, Visitor } from "@/lib/type"

export default function InfluenceChart({ visitors, exposants }: { visitors: Visitor[], exposants: Exposant[] }) {

    const visitorsPerson = visitors.length
    const exposantsPerson = exposants.length
    
    const chartData = [
        { browser: "Visiteurs", visitors: visitorsPerson, fill: "#00B0FF" },
        { browser: "Exposants", visitors: exposantsPerson, fill: "#FF0000" },
        { browser: "Fournisseurs", visitors: 15, fill: "#FFA500" },
    ]

    const chartConfig = {
        visitors: {
            label: "Visitors",
            color: "hsl(var(--chart-1))"
        },
        exposants: {
            label: "Exposants",
            color: "hsl(var(--chart-2))",
        },
        fournisseurs: {
            label: "Fournisseurs",
            color: "hsl(var(--chart-3))",
        },
        other: {
            label: "Autres",
            color: "hsl(var(--chart-4))",
        },
    } satisfies ChartConfig

    const totalVisitors = useMemo(() => {
        return chartData.reduce((acc, curr) => acc + (Array.isArray(curr.visitors) ? curr.visitors.reduce((a, b) => a + b, 0) : curr.visitors), 0)
    }, [chartData])

    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle>Influence lors du Salon</CardTitle>
                <CardDescription>January - June 2024</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={chartData}
                            dataKey="visitors"
                            nameKey="browser"
                            innerRadius={60}
                            strokeWidth={5}
                        >
                            <Label
                                content={({ viewBox }) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    className="fill-foreground text-3xl font-bold"
                                                >
                                                    {totalVisitors.toLocaleString()}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="fill-muted-foreground"
                                                >
                                                    Total
                                                </tspan>
                                            </text>
                                        )
                                    }
                                    return null;
                                }}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}

