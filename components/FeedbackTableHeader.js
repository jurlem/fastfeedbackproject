import React from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Heading, Flex, Box, Button } from "@chakra-ui/react";
import AddSiteModal from './AddSiteModal';


const FeedbackTableHeader = ({ isPaidAccount }) => (
  <Box mx={4}>
    <Breadcrumb>
      <BreadcrumbItem>
        <BreadcrumbLink href="#">Feedback</BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
    <Flex justifyContent="space-between">
      <Heading mb={8}>My Feedback</Heading>
      <AddSiteModal>+ Add Site</AddSiteModal>
    </Flex>
  </Box>
)

export default FeedbackTableHeader