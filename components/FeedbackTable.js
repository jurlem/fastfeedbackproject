import React from 'react';
import { useRouter } from 'next/router'
import { Box, Code, IconButton, Switch } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';

import { Table, Tr, Th, Td } from './Table';
import DeleteFeedbackButton from './DeleteFeedbackButton';
// import DeleteSiteButton from './DeleteSiteButton';

const FeedbackTable = ({ allFeedback }) => {
  const router = useRouter()


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
            <Box as="tr" key={feedback.id}>
              <Td fontWeight="medium">
                {feedback.author}
              </Td>
              <Td>
                {feedback.text}
              </Td>
              <Td>
                <Code>
                  {router.route}
                </Code>
              </Td>

              <Td>
                <Switch
                  isChecked={feedback.status === 'active'}
                  colorScheme="teal"
                  onChange={() => { console.log('switched!') }}
                />
              </Td>

              <Td>
                <DeleteFeedbackButton feedbackId={feedback.id} />
                {/* <DeleteSiteButton siteId={site.id} /> */}
              </Td>
            </Box>
          ))}
        </tbody>
      </Table>
    </Box>
  );
};

export default FeedbackTable;