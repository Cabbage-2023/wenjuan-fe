import { FC } from 'react';
import { BarChart, Bar,Cell, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from 'recharts'
import { QuestionCheckboxStatPropsType } from './interface';

const StatComponent: FC<QuestionCheckboxStatPropsType> = ({stat}) => {
    return (
        <div>
            <BarChart
                width={400}
                height={300}
                data={stat}
                margin={{
                    top: 5,
                    right: 80,
                    left: 0,
                    bottom: 5
                }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />       {/*X轴上显示name变量的值 */}
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
        </div>
    )
}

export default StatComponent;