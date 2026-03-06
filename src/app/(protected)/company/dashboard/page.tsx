import ActivitySection from '../components/ActivitySection';
import MetricsRow from '../components/MetricsRow';
import ProductSection from '../components/ProductSection';
import QuickActions from '../components/QuickActions';

export default function CompanyDashboard() {
  return (
    <>
      <MetricsRow />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        <div className="lg:col-span-2">
          <ProductSection />
        </div>

        <div className="flex flex-col gap-6">
          <ActivitySection />
          <QuickActions />
        </div>
      </div>
    </>
  );
}
