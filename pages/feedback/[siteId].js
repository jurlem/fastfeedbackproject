import useSWR from 'swr';
import { useRouter } from 'next/router';

import { useAuth } from '@/lib/auth';
import fetcher from '@/utils/fetcher';
import Page from '@/components/Page';
import DashboardShell from '@/components/DashboardShell';
import EmptyState from '@/components/EmptyState';
import SiteTableSkeleton from '@/components/SiteTableSkeleton';
import FeedbackTable from '@/components/FeedbackTable';
import FeedbackTableHeader from '@/components/FeedbackTableHeader';
import SiteFeedbackTableHeader from '@/components/SiteFeedbackTableHeader';

const SiteFeedback = () => {

  const { user } = useAuth()
  const router = useRouter()
  const { siteId } = router.query
  const { data } = useSWR(user ? [`/api/feedback/${siteId}`, user.token] : null, fetcher)

  const feedback = data?.feedback

  if (!data) {
    return <DashboardShell>
      <SiteFeedbackTableHeader />
      <SiteTableSkeleton />
    </DashboardShell>
  }

  return <DashboardShell>
    <SiteFeedbackTableHeader siteName={data.site.name} />
    {feedback?.length ? <FeedbackTable allFeedback={feedback} /> : <EmptyState />}
  </DashboardShell>
}

const SiteFeedbackPage = () => (
  <Page name="Name of the Site Feedback" path="/feedback">
    <SiteFeedback />
  </Page>
);

export default SiteFeedbackPage;
