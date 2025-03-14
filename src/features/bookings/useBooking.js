/* eslint-disable no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import { createBooking } from "../../services/apiBookings";
import { useParams } from "react-router-dom";

export function useBooking() {
  const { bookingId } = useParams();
  const {
    isLoading,
    error,
    data: booking,
  } = useQuery({
    queryKey: ["booking", bookingId],
    queryFn: () => createBooking(),
    retry: false,
  });
  return { booking, error, isLoading };
}
