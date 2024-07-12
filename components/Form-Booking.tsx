"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import validator from "validator";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import 'react-datepicker/dist/react-datepicker.css';

import { Calendar } from "@/components/ui/calendar";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { toast } from "@/components/ui/use-toast";
import { CalendarIcon } from "lucide-react";
import { Input } from "./ui/input";
import DatePicker from "react-datepicker";

const FormSchema = z.object({
  username: z.string().nonempty({ message: "Enter your username" }),
  horse: z.string().nonempty({ message: "Select a horse" }),
  dob: z.date({ required_error: "A date of birth is required." }),
  phoneNumber: z
    .string()
    .refine(validator.isMobilePhone, { message: "A valid phone number is required." }),
});

export function BookingForm() {
  const [selectedDate, setSelectedDate] = useState(null);
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const form = useForm({
    resolver: zodResolver(FormSchema),
  });

  const filterDate = (date) => {
    const day = date.getDay();
    return day !== 0; // Disable Sundays
  };

  const filterTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);
    const currentHour = currentDate.getHours();
    const selectedHour = selectedDate.getHours();

    // Allow only between 3 PM - 12 AM
    return selectedHour >= 15 && selectedHour <= 23;
  };

  function onSubmit(data) {
    console.log(data);
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <section className="flex flex-col justify-center items-center w-full min-h-[90vh]">
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
                    <SelectTrigger>
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
                      handleDateChange(date);
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
                  <button
                    className="absolute inset-y-0 right-0 px-3 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  >
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M7 10l5 5 5-5H7z" />
                    </svg>
                  </button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button size="sm" type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </section>
  );
}
