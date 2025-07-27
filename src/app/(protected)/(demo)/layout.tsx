import { ContentLayout } from '@/app/(protected)/_components/navigation/admin-panel/content-layout';

export default function NewReportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ContentLayout>{children}</ContentLayout>;
}
