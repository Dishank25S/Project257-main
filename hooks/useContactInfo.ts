import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { localDB, type ContactInfo } from "@/lib/supabase"

export function useContactInfo() {
  return useQuery({
    queryKey: ["contact-info"],
    queryFn: async () => {
      return localDB.contact.get()
    },
  })
}

export function useContactInfoMutations() {
  const queryClient = useQueryClient()

  const updateContactInfo = useMutation({
    mutationFn: async (updates: Partial<ContactInfo>) => {
      return localDB.contact.update(updates)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contact-info"] })
    },
  })

  return { updateContactInfo }
}
