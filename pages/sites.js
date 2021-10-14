import useSWR from 'swr';

import DashboardShell from '@/components/DashboardShell';
import Page from '@/components/Page';
import EmptyState from '@/components/EmptyState';
import SiteTableSkeleton from '@/components/SiteTableSkeleton';
import fetcher from '@/utils/fetcher';
import SiteTable from '@/components/SiteTable';
import { useAuth } from '@/lib/auth';
import SiteTableHeader from '@/components/SiteTableHeader';


const Dashboard = () => {
  const { user } = useAuth()
  const { data } = useSWR(user ? ['/api/sites', user.token] : null, fetcher)

  const sites = data?.sites

  if (!data) {
    return <DashboardShell>
      <SiteTableHeader />
      <SiteTableSkeleton />
    </DashboardShell>
  }

  return <DashboardShell>
    <SiteTableHeader />
    {sites?.length ? <SiteTable sites={sites} /> : <EmptyState />}
  </DashboardShell>
}

const DashboardPage = () => (
  <Page name="Dashboard" path="/sites">
    <Dashboard />
  </Page>
)

export default DashboardPage

