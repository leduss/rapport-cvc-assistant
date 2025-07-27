import AdminPanelLayout from './_components/navigation/admin-panel/admin-panel-layout';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return <AdminPanelLayout>{children}</AdminPanelLayout>;
}
