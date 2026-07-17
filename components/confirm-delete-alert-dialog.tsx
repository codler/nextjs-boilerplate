"use client"

import * as React from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog"

interface ConfirmDeleteAlertDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => Promise<void> | void
  title?: string
  description?: string
  confirmText?: string
  cancelText?: string
  confirmButtonVariant?: React.ComponentProps<
    typeof AlertDialogAction
  >["variant"]
  isLoading?: boolean
}

interface UseConfirmDeleteDialogOptions {
  title?: string
  description?: string
  confirmText?: string
  cancelText?: string
  confirmButtonVariant?: React.ComponentProps<
    typeof AlertDialogAction
  >["variant"]
}

interface ConfirmDeleteDialogPayload extends UseConfirmDeleteDialogOptions {
  onConfirm: () => Promise<void> | void
}

export function ConfirmDeleteAlertDialog({
  open,
  onOpenChange,
  onConfirm,
  title = "Delete item?",
  description = "Are you sure you want to delete this item? This action cannot be undone.",
  confirmText = "Delete",
  cancelText = "Cancel",
  confirmButtonVariant = "destructive",
  isLoading = false,
}: ConfirmDeleteAlertDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel size="sm">{cancelText}</AlertDialogCancel>
          <AlertDialogAction
            size="sm"
            variant={confirmButtonVariant}
            onClick={onConfirm}
            disabled={isLoading}
          >
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export function useConfirmDeleteDialog({
  title,
  description,
  confirmText,
  cancelText,
  confirmButtonVariant,
}: UseConfirmDeleteDialogOptions = {}) {
  const [open, setOpen] = React.useState(false)
  const [payload, setPayload] =
    React.useState<ConfirmDeleteDialogPayload | null>(null)
  const [isLoading, setIsLoading] = React.useState(false)

  const openConfirmDeleteDialog = React.useCallback(
    (options: ConfirmDeleteDialogPayload) => {
      setPayload(options)
      setOpen(true)
    },
    []
  )

  const handleConfirm = React.useCallback(async () => {
    if (!payload) return

    try {
      setIsLoading(true)
      await payload.onConfirm()
    } finally {
      setIsLoading(false)
      setOpen(false)
      setPayload(null)
    }
  }, [payload])

  const handleOpenChange = React.useCallback((nextOpen: boolean) => {
    if (!nextOpen) {
      setPayload(null)
      setIsLoading(false)
    }
    setOpen(nextOpen)
  }, [])

  const dialog = (
    <ConfirmDeleteAlertDialog
      open={open}
      onOpenChange={handleOpenChange}
      onConfirm={handleConfirm}
      title={payload?.title ?? title}
      description={payload?.description ?? description}
      confirmText={payload?.confirmText ?? confirmText}
      cancelText={payload?.cancelText ?? cancelText}
      confirmButtonVariant={
        payload?.confirmButtonVariant ?? confirmButtonVariant
      }
      isLoading={isLoading}
    />
  )

  return {
    openConfirmDeleteDialog,
    confirmDeleteDialog: dialog,
  }
}
