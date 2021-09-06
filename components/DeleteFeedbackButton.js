import React, { useState, useRef } from 'react'
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react"
import { IconButton, Button } from '@chakra-ui/react';
import { DeleteIcon, } from '@chakra-ui/icons';

import { useAuth } from '@/lib/auth';
import { deleteFeedback } from '@/lib/firestore'
import { mutate } from 'swr';

const DeleteFeedbackButton = ({ feedbackId }) => {
  const auth = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const onClose = () => setIsOpen(false)

  const onDelete = () => {
    deleteFeedback(feedbackId)
    mutate(['/api/feedback', auth.user.token],
      async (data) => {
        return { feedback: data.feedback.filter(feedback => feedback.id !== feedbackId) }
      }, false)
    onClose()
  }
  const cancelRef = useRef()
  return (
    <>
      {/* <Button onClick={onOpen}>Open Modal</Button> */}
      <IconButton
        onClick={() => setIsOpen(true)}
        aria-label="Delete feedback"
        icon={<DeleteIcon />}
        variant="ghost">
      </IconButton>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Feedback
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={onDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}
export default DeleteFeedbackButton

