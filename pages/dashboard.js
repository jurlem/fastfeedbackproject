import Head from 'next/head';
import useSWR from 'swr';

import DashboardShell from '@/components/DashboardShell';
import EmptyState from '@/components/EmptyState';
import SiteTableSkeleton from '@/components/SiteTableSkeleton';
import fetcher from '@/utils/fetcher';
import SiteTable from '@/components/SiteTable';
import { useAuth } from '@/lib/auth';
import SiteTableHeader from '@/components/SiteTableHeader';

export default function Dashboard() {
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
