import React from 'react';
import { useRouter } from 'next/router'
import { Box, Code, IconButton, Switch } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';

import FeedbackRow from './FeedbackRow';
import { toggleToVisibile, toggleToNotVisible } from '@/lib/firestore'
import { Table, Tr, Th, Td } from './Table';
import DeleteFeedbackButton from './DeleteFeedbackButton';
// import DeleteSiteButton from './DeleteSiteButton';

const FeedbackTable = ({ allFeedback }) => {
  return (
    <Box overflowX="scroll">
      <Table w="full">
        <thead>
          <Tr>
            <Th>Name</Th>
            <Th>Feedback</Th>
            <Th>Route</Th>
            <Th>Visible</Th>
            <Th width="50px">{''}</Th>
          </Tr>
        </thead>
        <tbody>
          {allFeedback.map((feedback) => (
            <FeedbackRow key={feedback.id} feedback={feedback} />
          ))}
        </tbody>
      </Table>
    </Box>
  );
};

export default FeedbackTable;