// @ts-nocheck
import { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { SubscriptionType } from '../../values/customTypes';

export const RechartsPieChart = ({
	data,
	colors,
	total,
}: {
	data: SubscriptionType[];
	colors: string[];
	total: any;
}) => {
	const [labelState, setLabelState] = useState({
		fill: '#FFFFFF',
		fontSize: '30px',
	});

	return (
		<ResponsiveContainer height='100%' width='100%'>
			<PieChart width={950} height={950}>
				<Pie
					dataKey='value'
					data={data}
					outerRadius={300}
					innerRadius={230}
					paddingAngle={10}
					cornerRadius={5}
					label={labelState}
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
