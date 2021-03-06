import useSWR from 'swr';

import { useAuth } from '@/lib/auth';
import fetcher from '@/utils/fetcher';
import Page from '@/components/Page';
import DashboardShell from '@/components/DashboardShell';
import EmptyState from '@/components/EmptyState';
import SiteTableSkeleton from '@/components/SiteTableSkeleton';
import FeedbackTable from '@/components/FeedbackTable';
import FeedbackTableHeader from '@/components/FeedbackTableHeader';

const AllFeedback = () => {

  const { user } = useAuth()
  const { data } = useSWR(user ? ['/api/feedback', user.token] : null, fetcher)


  const feedback = data?.feedback

  if (!data) {
    return <DashboardShell>
      <FeedbackTableHeader />
      <SiteTableSkeleton />
    </DashboardShell>
  }

  return <DashboardShell>
    <FeedbackTableHeader />
    {feedback?.length ? <FeedbackTable allFeedback={feedback} /> : <EmptyState />}
  </DashboardShell>
}

const AllFeedbackPage = () => (
  <Page name="All Feedback" path="/feedback">
    <AllFeedback />
  </Page>
);

export default AllFeedbackPage;