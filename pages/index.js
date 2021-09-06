import Head from 'next/head'
import { Box, Button, Icon, Flex, Stack, Link, Text } from "@chakra-ui/react"
import { useAuth } from '@/lib/auth'


export default function Home() {
  const auth = useAuth()

  return (
    <Box bg="gray.100" py={16} px={4}>
      <Flex as="main" direction="column" align="center" maxW="640px" margin="0 auto" justify="center" h="100vh">
        <Head>
          <title>Fast Feedback</title>
          <script dangerouslySetInnerHTML={{
            __html: `
          if (document.cookie && document.cookie.includes('fast-feedback-auth')) {
            window.location.href = "/dashboard"
          }
        ` }} />
        </Head>
        <Icon viewBox="0 0 46 32" boxSize={12}>
          <path
            d="M19.557.113C11.34.32 9.117 8.757 9.03 12.95c1.643-2.67 4.62-3.08 6.931-3.08 2.825.085 10.27.205 17.458 0C40.61 9.663 44.802 3.28 46 .112c-5.391-.085-18.228-.205-26.443 0zM14.422 14.234C3.332 14.234-.468 24.76.045 31.948c3.594-6.418 7.617-7.53 9.243-7.445h6.675c5.956 0 11.039-6.846 12.836-10.27H14.422z"
            fill="currentColor"
          />
        </Icon>
        <Text mb={4} fontSize="lg" py={4}>
          <Text as="span" fontWeight="bold" display="inline">
            Fast Feedback
          </Text>
          {'  was built as part of '}
          <Link
            href="https://react2025.com"
            isExternal
            textDecoration="underline"
          >
            React 2025
          </Link>
          {`. It's the easiest way to add comments or reviews to your static site. Try it out by leaving a comment below. After the comment is approved, it will display below.`}
        </Text>

        {auth.user ? (
          <>
            <Button as='a' size='sm' fontWeight="medium" href="/dashboard">Viev Dashboard</Button>
            {/* <Button onClick={() => auth.signout()}>Sign out</Button> */}
          </>
        ) : (
          <Stack>
            <Button
              leftIcon={<Icon fill="white"><path
                d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
              /> </Icon>}
              backgroundColor="gray.900"
              color="white"
              fontWeight="medium"
              _hover={{ bg: 'gray.700' }}
              _active={{
                bg: 'gray.800',
                transform: 'scale(0.95)'
              }}
              mt={4}
              size="lg"
              onClick={() => auth.signinWithGitHub()}>Sign In with Github</Button>
            <Button
              leftIcon={<Icon>
                <path
                  d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"

                />

              </Icon>}
              backgroundColor="gray.900"
              color="white"
              fontWeight="medium"
              _hover={{ bg: 'gray.700' }}
              _active={{
                bg: 'gray.800',
                transform: 'scale(0.95)'
              }}
              mt={4}
              size="lg"
              onClick={() => auth.signinWithGoogle()}>Sign In with Google</Button>
          </Stack>
        )}
      </Flex>
    </Box>
  )
}
