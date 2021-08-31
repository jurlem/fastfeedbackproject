import React from 'react';
import { Heading, Flex, Text, Button } from '@chakra-ui/react';

import AddSiteModal from './AddSiteModal';

const EmptyState = () => (
  <Flex width="100%" mb={2} backgroundColor="white" borderRadius="8px" p={16} align="center" direction="column">
    <Heading mb={8} size="lg">You havn't added any sites.</Heading>
    <Text>Welcome! Lets get started.</Text>
    <AddSiteModal>
      Add Your First Site
    </AddSiteModal>
  </Flex>
);

export default EmptyState;