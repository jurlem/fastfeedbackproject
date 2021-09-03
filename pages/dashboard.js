import Head from 'next/head';
import useSWR from 'swr';


import DashboardShell from '@/components/DashboardShell';
import EmptyState from '@/components/EmptyState';
import SiteTableSkeleton from '@/components/SiteTableSkeleton';
import fetcher from '@/utils/fetcher';
import SiteTable from '@/components/SiteTable';
import { useAuth } from '@/lib/auth';

export default function Dashboard() {
  const { user } = useAuth()
  const { data } = useSWR(user ? ['/api/sites', user.token] : null, fetcher)
  console.log(data)
  const sites = data?.sites

  if (!data) {
    return <DashboardShell>
      <SiteTableSkeleton />
    </DashboardShell>
  }

  return <DashboardShell>
    {sites?.length ? <SiteTable sites={sites} /> : <EmptyState />}
  </DashboardShell>
}
