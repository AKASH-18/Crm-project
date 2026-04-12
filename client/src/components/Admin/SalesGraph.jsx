import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";

function SalesGraph({ data }) {
  return (
    <BarChart width={600} height={300} data={data}>
      <CartesianGrid stroke="#eee" />

      <XAxis dataKey="day" />

      {/* ✅ Y-axis as percentage */}
      <YAxis domain={[0, 100]} tickFormatter={(tick) => `${tick}%`} />

      <Tooltip formatter={(value) => `${value}%`} />

      <Bar dataKey="rate" fill="#2563eb" radius={[15, 15, 0, 0]} />
    </BarChart>
  );
}

export default SalesGraph;