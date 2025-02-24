<<<<<<< HEAD
import { useMutation } from "@tanstack/react-query";
=======
import {
  useMutation,
} from "@tanstack/react-query";
>>>>>>> 03997ca83e92534005f18531b19b66bb8cadbee1
import { useRouter } from "next/navigation";
import { approveBecomePublisher } from "./actions";
import { useToast } from "@/components/ui/use-toast";
import { PublisherRequest } from "@prisma/client";

<<<<<<< HEAD
interface ApproveMutationVariables {
  request: PublisherRequest;
  action: "approve" | "reject";
  message: string; // Add a default value for message
}

export function useApproveBecomePublisherMutation() {
  const router = useRouter();
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: async ({ request, action, message }: ApproveMutationVariables) => {
      return approveBecomePublisher({ request, action, message }); // Pass the message
    },
    onSuccess: (_, { action, message }) => {
      router.refresh();
      toast({
        description: `The request has been successfully ${action}ed.${
          message ? `\nMessage: "${message}"` : ""
        }`,
      });
    },
    onError: (error, { action }) => {
      toast({
        variant: "destructive",
        description: `Failed to ${action} the request. Please try again. Error: ${error.message}`,
      });
    },
  });

  return mutation;
}
=======
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


>>>>>>> 03997ca83e92534005f18531b19b66bb8cadbee1
