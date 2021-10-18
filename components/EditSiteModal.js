import { useRef, useState } from 'react'

import { useForm } from "react-hook-form";
import { mutate } from 'swr';
import { SettingsIcon } from '@chakra-ui/icons'

import {
  Switch,
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
import { updateSiteSettings } from '@/lib/firestore';


const EditSiteModal = ({ children, settings, siteId }) => {
  const [checked, setChecked] = useState(false);


  const toast = useToast()
  const initialRef = useRef()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { register, handleSubmit } = useForm();


  const onEditSite = async ({ timestamp, icons, ratings }) => {
    const newSettings = {
      timestamp,
      icons,
      ratings
    }
    console.log({ newSettings })


    await updateSiteSettings(siteId, newSettings)

    toast({
      title: "Success!",
      description: "We've updated your site settings.",
      status: "success",
      // duration: 9000,
      isClosable: true,
    })
    mutate(`/api/site/${siteId}`)
    onClose()

  }
  return (
    <>
      <Button
        onClick={onOpen}
        leftIcon={<SettingsIcon />}

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
        <ModalContent as="form" onSubmit={handleSubmit(onEditSite)}>
          <ModalHeader fontWeight="bold">Edit Site</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl display="flex" alignItems="center">
              <Switch
                key={settings?.timestamp}
                {...register("timestamp")}
                defaultChecked={settings?.timestamp}
                id="show-timestamp" mr="2" colorScheme="teal" />
              <FormLabel htmlFor="timestamp" mb="0">
                Show Timestamp
              </FormLabel>
            </FormControl>
            <FormControl display="flex" alignItems="center">
              <Switch
                key={settings?.icons}
                {...register("icons")}
                defaultChecked={settings?.icons}
                id="show-icons" mr="2" colorScheme="teal" />
              <FormLabel htmlFor="icons" mb="0">
                Show Icons
              </FormLabel>
            </FormControl>
            <FormControl display="flex" alignItems="center">
              <Switch
                key={settings?.ratings}
                {...register("ratings")}
                defaultChecked={settings?.ratings}
                id="show-ratings" mr="2" colorScheme="teal" />
              <FormLabel htmlFor="ratings" mb="0">
                Show Ratings
              </FormLabel>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={onClose} fontWeight="medium">Cancel</Button>
            <Button type="submit" backgroundColor="#99FFFE" color="#194D4c" fontWeight="medium"
            >
              Update
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

    </>
  )
}
export default EditSiteModal