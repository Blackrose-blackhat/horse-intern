"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import validator from "validator";
import { Button } from "@/components/ui/button";
import "react-datepicker/dist/react-datepicker.css";

import Lottie from "react-lottie";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import DatePicker from "react-datepicker";
import animationData from "@/public/Animation - 1720889874377.json"; // Update this path to your JSON file

const FormSchema = z.object({
  username: z.string().nonempty({ message: "Enter your username" }),
  horse: z.string().nonempty({ message: "Select a horse" }),
  dob: z.date({ required_error: "A date is required." }),
  phoneNumber: z.string().refine((val) => validator.isMobilePhone(val), {
    message: "A valid phone number is required.",
  }),
});

export default function BookingForm() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState(null);

  const form = useForm({
    resolver: zodResolver(FormSchema),
  });

  const filterDate = (date: Date) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Disable Sundays
    if (date.getDay() === 0) {
      return false;
    }

    // Disable dates before tomorrow
    return date.getTime() >= tomorrow.getTime();
  };

  const filterTime = (time:string) => {
    const selectedDate = new Date(time);
    const selectedHour = selectedDate.getHours();

    // Allow only between 3 PM - 12 AM
    return selectedHour >= 15 && selectedHour <= 23;
  };

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const onSubmit = (data:any) => {
    setFormData(data);
    handleOpen();
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <section className="flex flex-col justify-center items-end px-40 w-full min-h-[90vh]">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="border border-white/40 rounded-md p-10 space-y-8 bg-black/70"
        >
          <FormDescription>
            Please fill out the form below to book your horse ride.
          </FormDescription>

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Enter your name</FormLabel>
                <Input
                  type="text"
                  {...field}
                  placeholder="Enter your name"
                  className="bg-transparent"
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Enter your Phone Number</FormLabel>
                <Input
                  type="text"
                  {...field}
                  placeholder="Enter your number"
                  className="bg-transparent"
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="horse"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select a horse</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="bg-transparent">
                      <SelectValue placeholder="Select your ride" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="midnight-thunder">
                      Midnight Thunder
                    </SelectItem>
                    <SelectItem value="silver-blaze">Silver Blaze</SelectItem>
                    <SelectItem value="stardust-whisper">
                      Stardust Whisper
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dob"
            render={({ field }) => (
              <FormItem className="relative">
                <div className="relative">
                  <DatePicker
                    {...field}
                    selected={selectedDate}
                    onChange={(date) => {
                      setSelectedDate(date);
                      field.onChange(date);
                    }}
                    filterDate={filterDate}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={60}
                    timeCaption="Time"
                    filterTime={filterTime}
                    dateFormat="MMMM d, yyyy h:mm aa"
                    className="w-64 py-2 pl-4 pr-10 rounded-full border border-gray-300 bg-transparent focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    placeholderText="Select a date and time"
                  />
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <Dialog open={isOpen} onClose={handleClose} className="relative z-10">
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="bg-black/50"
                size="lg"
                type="submit"
              >
                Book your freedom
              </Button>
            </DialogTrigger>

            <DialogContent>
              <Lottie options={defaultOptions} height={200} width={200} />
              <DialogHeader>
                <DialogTitle>Your Freedom is booked</DialogTitle>
                <DialogDescription>
                  <ul>
                   
                    <li>
                      Our team will reach out to you at{" "}
                      <span className="font-semibold">
                        {formData?.phoneNumber}
                      </span>{" "}
                      for further details.
                    </li>
                    <li>
                      Thank you <span>{formData?.username}</span> for booking
                      with us!
                    </li>
                    <li>A calendar invite has been sent to your email.</li>
                  </ul>
                  <ul>
                    <li>
                      <strong>Name:</strong>{" "}
                      <span className="font-semibold">
                        {formData?.username}
                      </span>
                    </li>
                    <li>
                      <strong>Horse Type:</strong>{" "}
                      <span className="font-semibold">{formData?.horse}</span>
                    </li>
                    <li>
                      <strong>Date of Booking:</strong>{" "}
                      <span className="font-semibold">
                        {new Date(formData?.dob).toDateString()}
                      </span>
                    </li>
                    <li>
                      <strong>Phone Number:</strong>{" "}
                      <span className="font-semibold">
                        {formData?.phoneNumber}
                      </span>

                    </li>
                    <br />
                   
                  </ul>
                </DialogDescription>
              </DialogHeader>
              <Button
                onClick={handleClose}
                className="mt-4 bg-blue-500 text-white"
              >
                Close
              </Button>
            </DialogContent>
          </Dialog>
        </form>
      </Form>
    </section>
  );
}
