/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { AlertCircle } from "lucide-react";
import { Form } from "~/form";
import { Button } from "~/button";
import { InputField } from "@/components/form/input-field";
import { DropdownField } from "@/components/form/dropdown-field";
import { setPitData } from "@/app/actions/update-pit-data";

// Define the schema for the form
const formSchema = z.object({
  team_id: z.number().int().positive("Team ID must be a positive number"),
  has_left_auto: z.enum(["Yes", "No"]).transform(value => value === "Yes"),
  has_center_auto: z.enum(["Yes", "No"]).transform(value => value === "Yes"),
  has_right_auto: z.enum(["Yes", "No"]).transform(value => value === "Yes"),
  prefered_auto: z.string(),
  can_l1: z.enum(["Yes", "No"]).transform(value => value === "Yes"),
  can_l2: z.enum(["Yes", "No"]).transform(value => value === "Yes"),
  can_l3: z.enum(["Yes", "No"]).transform(value => value === "Yes"),
  can_l4: z.enum(["Yes", "No"]).transform(value => value === "Yes"),
  can_barge: z.enum(["Yes", "No"]).transform(value => value === "Yes"),
  can_processor: z.enum(["Yes", "No"]).transform(value => value === "Yes"),
  can_deep_climb: z.enum(["Yes", "No"]).transform(value => value === "Yes"),
  can_shallow_climb: z.enum(["Yes", "No"]).transform(value => value === "Yes"),
  is_swerve: z.enum(["Yes", "No"]).transform(value => value === "Yes"),
});

type FormData = z.infer<typeof formSchema>;

const initialFormData: Partial<FormData> = {
  team_id: undefined,
  has_left_auto: undefined,
  has_center_auto: undefined,
  has_right_auto: undefined,
  prefered_auto: "",
  can_l1: undefined,
  can_l2: undefined,
  can_l3: undefined,
  can_l4: undefined,
  can_barge: undefined,
  can_processor: undefined,
  can_deep_climb: undefined,
  can_shallow_climb: undefined,
  is_swerve: undefined,
};

export function PitDataSubmissionForm() {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: initialFormData,
    mode: "onSubmit",
  });

  function onSubmit(data: FormData) {
    setIsSubmitting(true);
    
    // Just console.log the data as requested
    setPitData(data, Number(localStorage.getItem("competitionID") ? localStorage.getItem("competitionID") : 1));
    
    // Show toast
    toast.success("Form data logged to console");
    
    // Reset the form
    form.reset(initialFormData);
    
    setIsSubmitting(false);
  }

  function onError(errors: any) {
    const errorMessages = Object.entries(errors).map(
      ([field, error]: [string, any]) => {
        return `${field}: ${error.message}`;
      }
    );

    toast.error(
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <AlertCircle className="h-4 w-4" />
          <span className="font-medium">Missing required fields</span>
        </div>
        <ul className="list-disc pl-5 text-sm">
          {errorMessages.map((message, index) => (
            <li key={index}>{message}</li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, onError)}
        className="space-y-8"
      >
        <div className="space-y-6">
          <h3 className="text-lg font-medium">Team Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
            <InputField
              type="number"
              name="team_id"
              label="Team ID"
              placeholder="Enter team number"
            />
          </div>
          
          <h3 className="text-lg font-medium">Autonomous Capabilities</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <DropdownField
              name="has_left_auto"
              label="Has Left Auto"
              placeholder="..."
              options={["Yes", "No"]}
            />
            <DropdownField
              name="has_center_auto"
              label="Has Center Auto"
              placeholder="..."
              options={["Yes", "No"]}
            />
            <DropdownField
              name="has_right_auto"
              label="Has Right Auto"
              placeholder="..."
              options={["Yes", "No"]}
            />
            <InputField
              type="text"
              name="prefered_auto"
              label="Preferred Auto"
              placeholder="..."
            />
          </div>
          
          <h3 className="text-lg font-medium">Scoring Capabilities</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <DropdownField
              name="can_l1"
              label="Can Score L1"
              placeholder="..."
              options={["Yes", "No"]}
            />
            <DropdownField
              name="can_l2"
              label="Can Score L2"
              placeholder="..."
              options={["Yes", "No"]}
            />
            <DropdownField
              name="can_l3"
              label="Can Score L3"
              placeholder="..."
              options={["Yes", "No"]}
            />
            <DropdownField
              name="can_l4"
              label="Can Score L4"
              placeholder="..."
              options={["Yes", "No"]}
            />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <DropdownField
              name="can_processor"
              label="Can Score Processor"
              placeholder="..."
              options={["Yes", "No"]}
            />
            <DropdownField
              name="can_barge"
              label="Can Score Barge"
              placeholder="..."
              options={["Yes", "No"]}
            />
          </div>
          
          <h3 className="text-lg font-medium">Robot Capabilities</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <DropdownField
              name="is_swerve"
              label="Is Swerve Drive"
              placeholder="..."
              options={["Yes", "No"]}
            />
            <DropdownField
              name="can_deep_climb"
              label="Can Deep Climb"
              placeholder="..."
              options={["Yes", "No"]}
            />
            <DropdownField
              name="can_shallow_climb"
              label="Can Shallow Climb"
              placeholder="..."
              options={["Yes", "No"]}
            />
          </div>
        </div>
        
        <div className="flex justify-between place-items-center pb-8">
          <Button type="reset" variant="outline" onClick={() => form.reset(initialFormData)}>
            Reset Form
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </form>
    </Form>
  );
}