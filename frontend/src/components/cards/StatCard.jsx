export default function StatCard({
  title,
  value,
}) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border">
      <h3 className="text-gray-500 text-sm">
        {title}
      </h3>

      <p className="text-3xl font-bold mt-2">
        {value}
      </p>
    </div>
  );
}