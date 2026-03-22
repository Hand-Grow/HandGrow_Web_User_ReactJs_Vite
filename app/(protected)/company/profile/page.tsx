import MainLayout from '@/src/components/layout/MainLayout';
import ProfileContent from '@/src/components/profile-content';

export default function Page() {
  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto py-8 px-4">
        <ProfileContent />
      </div>
    </MainLayout>
  );
}
