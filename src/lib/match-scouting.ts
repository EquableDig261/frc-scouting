import { z } from "zod";

import {
  requiredNumber,
  cycleSchema,
  notes,
} from "./schema";

export const autonomous = [
  {
    name: "Team Number",
    type: "input",
    schema: requiredNumber,
    placeholder: "Enter Team Number",
  },
  {
    name: "Qualification Number",
    type: "input",
    schema: requiredNumber,
    placeholder: "Enter Match Number",
  },
  {
    name: "Starting Position",
    type: ["Processor", "Middle", "Non-Processor"],
    schema: z.enum(["Processor", "Middle", "Non-Processor"]),
    placeholder: "",
  },
  {
    name: "Left Starting Line",
    type: ["True", "False"],
    schema: z.enum(["True", "False"]),
    placeholder: "",
  },
  {
    name: "Autonomous Cycles",
    type: "cycles",
    schema: cycleSchema,
    placeholder: "",
  },
];

export const teleop = [
  {
    name: "Teleop Cycles",
    type: "cycles",
    schema: cycleSchema,
    placeholder: "",
  },
];

export const misc = [
  {
    name: "Climb Status",
    type: ["Deep", "Shallow", "Park", "None"],
    schema: z.enum(["Deep", "Shallow", "Park", "None"]),
    placeholder: "",
  },
  {
    name: "Climb Rating",
    type: "input",
    schema: requiredNumber,
    placeholder: "rate climb speed 1-5, 0 for none",
  },
  {
    name: "Driving Rating",
    type: "input",
    schema: requiredNumber,
    placeholder: "rate score driving 1-5, 0 for none",
  },
  {
    name: "Defence Rating",
    type: "input",
    schema: requiredNumber,
    placeholder: "rate defence 1-5, 0 for none",
  },
  {
    name: "Extra Notes",
    type: "notes",
    schema: notes,
    placeholder: "Enter Extra Notes",
  },
];
