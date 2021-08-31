import Head from 'next/head';
import useSWR from 'swr';


import DashboardShell from '@/components/DashboardShell';
import EmptyState from '@/components/EmptyState';
import SiteTableSkeleton from '@/components/SiteTableSkeleton';
import fetcher from '@/utils/fetcher';
import SiteTable from '@/components/SiteTable';

export default function Dashboard() {
  const { data } = useSWR('/api/sites', fetcher)
  const sites = data?.sites

  console.log(data)

  if (!data) {
    return <DashboardShell>
      <SiteTableSkeleton />
    </DashboardShell>
  }

  return <DashboardShell>
    {sites.length ? <SiteTable sites={sites} /> : <EmptyState />}
  </DashboardShell>
}
