import React from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Heading, Flex, Box, Button } from "@chakra-ui/react";
import AddSiteModal from './AddSiteModal';


const SiteTableHeader = ({ isPaidAccount }) => (
  <Box mx={4}>
    <Breadcrumb>
      <BreadcrumbItem>
        <BreadcrumbLink href="#">Sites</BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
    <Flex justifyContent="space-between">
      <Heading mb={8}>My Sites</Heading>
      <AddSiteModal>+ Add Site</AddSiteModal>
    </Flex>
  </Box>
)

export default SiteTableHeader