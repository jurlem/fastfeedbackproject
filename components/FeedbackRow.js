import React, { useState } from 'react';
import { useRouter } from 'next/router'
import { Box, Code, IconButton, Switch } from '@chakra-ui/react';
import { mutate } from 'swr';


import { updateFeedback } from '@/lib/firestore'
import { Td } from './Table';
import DeleteFeedbackButton from './DeleteFeedbackButton';
import { useAuth } from '@/lib/auth';
// import DeleteSiteButton from './DeleteSiteButton';

const FeedbackRow = ({ feedback: { id, author, text, status } }) => {
  const auth = useAuth()
  const [checked, setChecked] = useState(status === 'active');
  const router = useRouter()

  const toggleVisibility = async () => {
    // setChecked(!checked)

    const newValue = { status: checked ? 'pending' : 'active' }
    await updateFeedback(id, newValue)
    mutate(['/api/feedback', auth.user.token])
  }


  return (
    <Box as="tr" key={id}>
      <Td fontWeight="medium">
        {author}
      </Td>
      <Td>
        {text}
      </Td>
      <Td>
        <Code>
          {router.route}
        </Code>
      </Td>
      <Td>
        <Switch
          isChecked={status === 'active'}
          colorScheme="teal"
          onChange={() => { toggleVisibility(status, id) }}
        />
      </Td>
      <Td>
        <DeleteFeedbackButton feedbackId={id} />
      </Td>
    </Box>
  );
};

export default FeedbackRow;