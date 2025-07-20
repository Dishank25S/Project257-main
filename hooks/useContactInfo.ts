import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { supabase } from "@/lib/supabase"

export type ContactInfo = {
  id: string
  photographer_name: string
  phone: string
  location: string
  email: string | null
  instagram_url: string | null
  facebook_url: string | null
  whatsapp_url: string | null
  updated_at: string
}

export function useContactInfo() {
  return useQuery({
    queryKey: ["contact-info"],
    queryFn: async () => {
      const { data, error } = await supabase.from("contact_info").select("*").single()

      // Return default values if no data exists or error occurs
      if (error || !data) {
        return {
          id: "default",
          photographer_name: "Krishna Broker",
          phone: "+91 9665984974",
          location: "Swargate, Pune",
          email: null,
          instagram_url: null,
          facebook_url: null,
          whatsapp_url: null,
          updated_at: new Date().toISOString(),
        } as ContactInfo
      }

      return data as ContactInfo
    },
  })
}

export function useContactInfoMutations() {
  const queryClient = useQueryClient()

  const updateContactInfo = useMutation({
    mutationFn: async (updates: Partial<ContactInfo>) => {
      const { data, error } = await supabase
        .from("contact_info")
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq("id", (await supabase.from("contact_info").select("id").single()).data?.id)
        .select()
        .single()

      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contact-info"] })
    },
  })

  return { updateContactInfo }
}
