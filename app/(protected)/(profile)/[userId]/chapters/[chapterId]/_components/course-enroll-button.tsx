"use client";

import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";
import { useRouter } from "next/navigation";
import { BeatLoader } from "react-spinners";

interface CourseEnrollButtonProps {
  price: number;
  courseId: string;
}

export const CourseEnrollButton = ({
  price,
  courseId,
}: CourseEnrollButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter()
  const onClick = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(`/api/courses/${courseId}/checkout`)
      if (response) {
        window.location.assign(response.data.url);
        setIsLoading(false);
      }
    } catch {
      toast.error("Something went wrong");
      setIsLoading(false);
      return
    }
  }

  return (
    <Button
      onClick={onClick}
      disabled={isLoading}
      size="sm"
      className="w-full md:w-44"
    >
      {isLoading ? (
        <BeatLoader size={10} color="background" />
      ) : (
        `Enroll for ${formatPrice(price)}`
      )}

    </Button>
  )
}