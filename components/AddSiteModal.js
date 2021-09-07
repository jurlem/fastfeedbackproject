import { useRef } from 'react'
import { useForm } from "react-hook-form";
import useSWR, { mutate } from 'swr';
import fetcher from '@/utils/fetcher';

import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
  useToast
} from "@chakra-ui/react"


import { createSite } from '@/lib/firestore';
import { useAuth } from '@/lib/auth';


const AddSiteModal = ({ children }) => {
  const toast = useToast()
  const initialRef = useRef()
  const auth = useAuth()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { register, handleSubmit } = useForm();


  const onCreateSite = ({ name, url }) => {

    const newSite = {
      authorId: auth.user.uid,
      createdAt: new Date().toISOString(),
      name,
      url
    }

    const { id } = createSite(newSite)

    toast({
      title: "Success!",
      description: "We've added your site.",
      status: "success",
      // duration: 9000,
      isClosable: true,
    })
    mutate(['/api/sites', auth.user.token],
      async (data) => {
        return { sites: [...data.sites, { id, ...newSite }] }
      }, false)
    onClose()
  }

  return (
    <>
      <Button
        onClick={onOpen}
        backgroundColor="gray.900"
        color="white"
        fontWeight="medium"
        _hover={{ bg: 'gray.700' }}
        _active={{
          bg: 'gray.800',
          transform: 'scale(0.95)'
        }}
      >
        {children}
      </Button>
      {/* <Button fontWeight="medium" maxW="200px" > </Button> */}
      <Modal
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onCreateSite)}>
          <ModalHeader fontWeight="bold">Add Site</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input ref={initialRef} placeholder="My site"
                {...register("name", { required: true })} />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Link</FormLabel>
              <Input placeholder="https://website.com"  {...register("url", { required: true })} />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={onClose} fontWeight="medium">Cancel</Button>
            <Button type="submit" backgroundColor="#99FFFE" color="#194D4c" fontWeight="medium"
            >
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

    </>
  )
}
export default AddSiteModal