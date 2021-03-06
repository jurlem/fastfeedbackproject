import React from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Heading, Flex, Box, Button } from "@chakra-ui/react";
import AddSiteModal from './AddSiteModal';
import NextLink from 'next/link';


const FeedbackTableHeader = ({ siteName }) => (
  <Box mx={4}>
    <Breadcrumb>
      <BreadcrumbItem>
        <NextLink href="/feedback" psssHref>
          <BreadcrumbLink >Feedback</BreadcrumbLink>
        </NextLink>
      </BreadcrumbItem>
    </Breadcrumb>
    <Flex justifyContent="space-between">
      <Heading mb={8}>All Feedback</Heading>
      <AddSiteModal>+ Add Site</AddSiteModal>
    </Flex>
  </Box>
)

export default FeedbackTableHeader