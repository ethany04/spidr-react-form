"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phoneNumber: z
    .string()
    .regex(
      /^\d{10,}$/,
      "Phone number must contain only digits and be at least 10 digits"
    ),
  email: z.string().email("Please enter a valid email address"),
  guessCost: z
    .string()
    .regex(
      /^\$\d{1,3}(,\d{3})*(\.\d{2})?$/,
      "Please enter a valid dollar amount"
    ),
  pin: z
    .string()
    .regex(
      /^\d{4}-\d{4}-\d{4}-\d{4}$/,
      "PIN must be in format ####-####-####-####"
    ),
});

type FormData = z.infer<typeof formSchema>;

export default function SpidrForm() {
  const [isSubmitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      guessCost: "",
      pin: "",
    },
  });

  const formatPin = (value: string) => {
    // Remove all non-digit characters
    const digitsOnly = value.replace(/\D/g, "");

    // Limit to 16 digits
    const limited = digitsOnly.slice(0, 16);

    // Add dashes every 4 digits
    const formatted = limited.replace(/(\d{4})(?=\d)/g, "$1-");

    return formatted;
  };

  const formatCentsToCurrency = (raw: string) => {
    const number = parseInt(raw || "0", 10);
    const float = number / 100;

    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(float);
  };

  const handlePinChange = (
    value: string,
    onChange: (value: string) => void
  ) => {
    const formatted = formatPin(value);
    onChange(formatted);
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    console.log("Form Data:", data);
    setSubmitted(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <Card className="border-2 border-[#4592a2] bg-[#28292b]/50 backdrop-blur-sm">
        {isSubmitted ? (
          <CardContent className="text-center py-12 text-white">
            <h1 className="text-2xl font-bold mb-4">Thank you!</h1>
            <p>Thank you for your interest!</p>
          </CardContent>
        ) : (
          <>
            <CardHeader className="text-center relative">
              <div className="absolute top-4 right-10 md:flex hidden">
                <Image
                  src="/spidr-logo.png"
                  alt="Spidr Logo"
                  width={40}
                  height={40}
                  className="w-10 h-10 object-contain"
                />
              </div>
              <CardTitle className="text-2xl font-bold text-[#f6fdff]">
                Air Fryer Interest Form
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Please fill out all fields to submit your information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#f6fdff] font-medium">
                            First Name
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your first name"
                              className="bg-background border-[#4592a2] focus:border-[#4592a2] focus:ring-[#4592a2]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#f6fdff] font-medium">
                            Last Name
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your last name"
                              className="bg-background border-input focus:border-primary focus:ring-primary"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="phoneNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#f6fdff] font-medium">
                            Phone Number
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your phone number"
                              className="bg-background border-input focus:border-primary focus:ring-primary"
                              value={field.value}
                              onChange={(e) => {
                                const digitsOnly = e.target.value.replace(
                                  /\D/g,
                                  ""
                                );
                                field.onChange(digitsOnly);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#f6fdff] font-medium">
                            Email Address
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="Enter your email address"
                              className="bg-background border-input focus:border-primary focus:ring-primary"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="guessCost"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#f6fdff] font-medium">
                          Guess the Cost
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="$0.00"
                            className="bg-background border-input focus:border-primary focus:ring-primary"
                            value={field.value}
                            onChange={(e) => {
                              const digistOnly = e.target.value.replace(
                                /\D/g,
                                ""
                              );
                              const formatted =
                                formatCentsToCurrency(digistOnly);
                              field.onChange(formatted);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="pin"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#f6fdff] font-medium">
                          16-Digit PIN
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="####-####-####-####"
                            className="bg-background border-input focus:border-primary focus:ring-primary font-mono"
                            value={field.value}
                            onChange={(e) =>
                              handlePinChange(e.target.value, field.onChange)
                            }
                            maxLength={19} // 16 digits + 3 dashes
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-center pt-4">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-[#4592a2] hover:bg-[#4592a2]/90 text-primary-foreground px-8 py-3 font-medium transition-colors cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary-foreground border-t-transparent mr-2"></div>
                          Submitting...
                        </>
                      ) : (
                        "Submit Form"
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </>
        )}
      </Card>
    </div>
  );
}
