/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";

import type React from "react";
import { useEffect, useState } from "react";

import { useFormContext } from "react-hook-form";
import { toast } from "sonner";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/form";
import { Textarea } from "~/textarea";

type TNotesFieldProps = {
  name: string;
  label: string;
};

export function NotesField({ name, label }: TNotesFieldProps) {
  const { control, setValue, watch } = useFormContext();

  const value = watch(name) || { text: ""};

  function handleTextChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setValue(name, { ...value, text: e.target.value });
  }

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="space-y-2">
              <Textarea
                placeholder="Notes..."
                value={value.text}
                onChange={handleTextChange}
              />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
