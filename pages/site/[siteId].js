import { useRef, useState } from 'react';
import { useRouter } from 'next/router'
import {
  Box, Button,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react"

import Feedback from '@/components/Feedback';
import { useAuth } from "@/lib/auth";
import { getAllFeedback, getAllSites } from "@/lib/firestore-admin";
import { createFeedback } from "@/lib/firestore";
import DashboardShell from '@/components/DashboardShell';

export async function getStaticProps(context) {
  const siteId = context.params.siteId
  const { feedback } = await getAllFeedback(siteId)
  return {
    props: {
      initialFeedback: feedback
    },
    revalidate: 1
  }
}

export async function getStaticPaths() {
  const { sites } = await getAllSites()
  const paths = sites.map(site => ({
    params: {
      siteId: site.id.toString()
    },
  }))

  return {
    paths,
    fallback: true
    // fallback true -> otherwise static gen fails to display a new site created after buildtime
  };
}

const SiteFeedback = ({ initialFeedback }) => {
  const auth = useAuth()
  const router = useRouter()
  const inputEl = useRef()
  const [allFeedback, setAllFeedback] = useState(initialFeedback)

  const onSubmit = (e) => {
    e.preventDefault()

    const newFeedback = {
      author: auth.user.name,
      authorId: auth.user.uid,
      siteId: router.query.siteId,
      text: inputEl.current.value,
      createdAt: new Date().toISOString(),
      provider: auth.user.provider,
      status: 'pending'
    }
    // Clears up input field after comment is sumbitted:
    inputEl.current.value = ""
    createFeedback(newFeedback)
    setAllFeedback([newFeedback, ...allFeedback])
  }

  return (
    <DashboardShell>
      <Box display="flex" flexDirection='column' width='full' maxWidth='700px' margin='0 auto'>
        <Box as='form' onSubmit={onSubmit}>
          <FormControl my={8} id="comment" >
            <FormLabel>Comment</FormLabel>
            <Input ref={inputEl} type="comment" />
            <Button mt={2} type='submit' fontWeight='medium' isDisabled={router.isFallback}>Add Comments</Button>
          </FormControl>
        </Box>

        {allFeedback && allFeedback.map(feedback => (
          <Feedback key={feedback.id} {...feedback} />
        ))}
      </Box>
    </DashboardShell>
  )
}
export default SiteFeedback
