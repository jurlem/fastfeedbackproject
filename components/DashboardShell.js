import React from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo';
import { Box, Button, Flex, Link, Avatar, Icon } from "@chakra-ui/react";

import { useAuth } from '@/lib/auth';
import SiteTableHeader from './SiteTableHeader';

const DashboardShell = ({ children }) => {
  const router = useRouter()
  const { user, signout } = useAuth();

  const path = router.pathname
  const url = `https://fastfeedbackproject.vercel.app${path}`
  const title = path.charAt(1).toUpperCase() + path.slice(2) + ' | FastFeedback'
  return (
    <>
      <NextSeo
        title={title}
        canonical={url}
        openGraph={{
          url,
          title
        }}
      />
      <Box backgroundColor="gray.100" h="100vh">
        <Flex
          backgroundColor="white"
          mb={[8, 16]}
          w="full"
          borderTop="5px solid #0AF5F4"
        >
          <Flex
            alignItems="center"
            justifyContent="space-between"
            maxW="1250px"
            margin="0 auto"
            w="full"
            px={8}
            py={4}
            h="60px"
          >
            <Flex align="center">
              <NextLink href="/" passHref>
                <Icon mr={4} viewBox="0 0 46 32" boxSize={6}>
                  <path
                    d="M19.557.113C11.34.32 9.117 8.757 9.03 12.95c1.643-2.67 4.62-3.08 6.931-3.08 2.825.085 10.27.205 17.458 0C40.61 9.663 44.802 3.28 46 .112c-5.391-.085-18.228-.205-26.443 0zM14.422 14.234C3.332 14.234-.468 24.76.045 31.948c3.594-6.418 7.617-7.53 9.243-7.445h6.675c5.956 0 11.039-6.846 12.836-10.27H14.422z"
                    fill="currentColor"
                  />
                </Icon>
              </NextLink>
              <NextLink href="/sites" passHref>
                <Link mr={4}>Sites</Link>
              </NextLink>
              <NextLink href="/feedback" passHref>
                <Link>Feedback</Link>
              </NextLink>
            </Flex>
            <Flex justifyContent="center" alignItems="center">
              {user && (<Button mr={2} variant="ghost" onClick={() => signout()}>
                <Link mr={4}>
                  Log Out
                </Link>
              </Button>)}
              <NextLink href="/account" passHref>
                <Link>
                  <Avatar size="sm" src={user?.photoUrl} />
                </Link>
              </NextLink>
            </Flex>
          </Flex>
        </Flex>
        <Flex margin="0 auto" direction="column" maxW="1250px" px={[0, 8, 8]}>
          {children}
        </Flex>
      </Box>
    </>
  );
};

export default DashboardShell;