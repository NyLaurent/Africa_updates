import {
  useMutation,
} from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { approveBecomePublisher } from "./actions";
import { useToast } from "@/components/ui/use-toast";
import { PublisherRequest } from "@prisma/client";

export function useApproveBecomePublisherMutation() {
  const router = useRouter();
  const { toast } = useToast()

  const mutation = useMutation({
    mutationFn: async ({ request, action }: { request: PublisherRequest, action: "approve" | "reject" }) => {
      return Promise.all([
        approveBecomePublisher({ request, action }),
      ]);
    },
    onSuccess: () => {
      router.refresh()
      toast({
        description: "You have successfully submitted your publisher request. We will review it shortly.",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        description: `Failed to submit request. Please try again. Error: ${error.message}`,
      });
    },
  });
  return mutation;
}


