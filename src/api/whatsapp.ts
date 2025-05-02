import { supabase } from "@src/helpers/supabase-client";
import { queryClient } from "@src/providers/TanstackQueryProvider";
import { useMutation, useQuery } from "@tanstack/react-query";

export type WhatsappRequestType = {
  id: number;
  phone: string;
  photo_link: string;
  isSent: boolean;
  created_at: Date;
};

export const WHATSAPP_REQUESTS = "WHATSAPP_REQUESTS";

export const fetchWhatsappRequests = async (): Promise<
  WhatsappRequestType[]
> => {
  try {
    const { data, error } = await supabase
      .from("whatsapp_requests")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    throw error;
  }
};

export const useGetWhatsappRequests = () => {
  return useQuery({
    queryKey: [WHATSAPP_REQUESTS],
    queryFn: fetchWhatsappRequests,
  });
};

export const createWhatsappRequest = async (body: {
  phone: string;
  photo_link: string;
}) => {
  try {
    const { error } = await supabase.from("whatsapp_requests").insert(body);

    if (error) {
      throw error;
    }
  } catch (error) {
    throw error;
  }
};

export const useCreateWhatsappRequest = () => {
  return useMutation({
    mutationFn: createWhatsappRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [WHATSAPP_REQUESTS] });
    },
  });
};

export const updateSentStatus = async (id: number) => {
  try {
    const { error } = await supabase
      .from("whatsapp_requests")
      .update({ isSent: true })
      .eq("id", id);

    if (error) {
      throw error;
    }
  } catch (error) {
    throw error;
  }
};

export const useUpdateSentStatus = () => {
  return useMutation({
    mutationFn: updateSentStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [WHATSAPP_REQUESTS] });
    },
  });
};
