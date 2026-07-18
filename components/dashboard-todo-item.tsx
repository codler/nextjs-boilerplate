"use client"

import { Button } from "@/components/ui/button"
import { useConfirmDeleteDialog } from "@/components/confirm-delete-alert-dialog"
import { getHttpErrorMessage } from "@/lib/error"
import { api } from "@/lib/api"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useTranslations } from "next-intl"
import { toast } from "sonner"
import { todosQueryKey } from "@/hooks/useTodosQuery"
import type { Treaty } from "@elysia/eden"

interface DashboardTodoItemProps {
  todo: Treaty.Data<typeof api.todos.get>[number]
  currentUserId?: string
}

export function DashboardTodoItem({
  todo,
  currentUserId,
}: DashboardTodoItemProps) {
  const t = useTranslations("DashboardPage")
  const queryClient = useQueryClient()

  const toggleMutation = useMutation({
    mutationFn: async () => {
      const { error } = await api.todos.toggle({ id: todo.id }).patch()
      if (error) {
        throw error
      }
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: todosQueryKey() }),
    onError: (error) => {
      toast.error(getHttpErrorMessage(error) ?? "Unable to update task")
    },
  })

  const deleteMutation = useMutation({
    mutationFn: async () => {
      const { error } = await api.todos({ id: todo.id }).delete()
      if (error) {
        throw error
      }
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: todosQueryKey() }),
    onError: (error) => {
      toast.error(getHttpErrorMessage(error) ?? "Unable to delete task")
    },
  })

  const handleDelete = async () => {
    await deleteMutation.mutateAsync()
  }

  const ownerLabel =
    todo.userId === currentUserId
      ? t("ownedByYou")
      : t("ownedBy", { owner: todo.userId })

  const { openConfirmDeleteDialog, confirmDeleteDialog } =
    useConfirmDeleteDialog({
      title: t("confirmDeleteTitleWithItem", { item: todo.text }),
      description: t("confirmDeleteDescriptionWithItem", {
        item: todo.text,
      }),
      confirmText: t("confirmDeleteAction"),
      cancelText: t("confirmDeleteCancel"),
      confirmButtonVariant: "destructive",
    })

  return (
    <>
      <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p
              className={`text-base font-medium ${
                todo.completed
                  ? "text-slate-400 line-through"
                  : "text-slate-950 dark:text-white"
              }`}
            >
              {todo.text}
            </p>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {ownerLabel}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button
              size="sm"
              variant={todo.completed ? "outline" : "secondary"}
              onClick={async () => await toggleMutation.mutateAsync()}
              disabled={toggleMutation.isPending}
              aria-busy={toggleMutation.isPending}
            >
              {toggleMutation.isPending
                ? t("updating")
                : todo.completed
                  ? t("markActive")
                  : t("complete")}
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={() =>
                openConfirmDeleteDialog({
                  onConfirm: handleDelete,
                })
              }
              disabled={deleteMutation.isPending}
              aria-busy={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? t("deleting") : t("delete")}
            </Button>
          </div>
        </div>
      </div>
      {confirmDeleteDialog}
    </>
  )
}
