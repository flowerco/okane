// @ts-nocheck
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { SubscriptionType } from '../../values/customTypes';
import { useColorMode } from '@chakra-ui/react';

export const RechartsPieChart = ({
	data,
	colors,
	total,
	outerPcnt,
	innerPcnt
}: {
	data: SubscriptionType[];
	colors: string[];
	total: number;
	outerPcnt: string;
	innerPcnt: string;
}) => {

	const { colorMode } = useColorMode();

	const RADIAN = Math.PI / 180;
	const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
		const radius = outerRadius + (outerRadius - innerRadius) * 0.5;
		const x = cx + radius * Math.cos(-midAngle * RADIAN);
		const y = cy + radius * Math.sin(-midAngle * RADIAN);
		
		return (
			<text x={x} y={y} fontSize="26px" fill={colorMode === 'light' ? "black" : "white" } textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
				{`${(percent * 100).toFixed(0)}%`}
			</text>
		);
	};

	return (
		<ResponsiveContainer height='90%' width='90%'>
			<PieChart>
				<Pie
					dataKey='value'
					data={data}
					outerRadius={outerPcnt}
					innerRadius={innerPcnt}
					paddingAngle={10}
					cornerRadius={5}
					label={renderCustomizedLabel}
				>
					{data.map((sub, index) => (
						<Cell
							title={sub.name}
							value={sub.monthlyPrice}
							key={`cell-${index}`}
							fill={'none'}
							stroke={colors[index % colors.length]}
							strokeWidth={8}
							radius={[10, 10, 10]}
							style={{
								filter: `drop-shadow(10px 10px 10px ${
									colors[index % colors.length]
								}`,
							}}
						/>
					))}
				</Pie>
			</PieChart>
		</ResponsiveContainer>
	);
};
