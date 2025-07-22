interface StatCardProps {
  value: string;
  label: string;
  description?: string;
}

export function StatCard({ value, label, description }: StatCardProps) {
  return (
    <div className="text-center">
      <div className="text-4xl lg:text-5xl font-bold text-primary-600 mb-2">
        {value}
      </div>
      <div className="text-lg font-semibold text-gray-900 mb-1">{label}</div>
      {description && (
        <div className="text-sm text-gray-600">{description}</div>
      )}
    </div>
  );
}
