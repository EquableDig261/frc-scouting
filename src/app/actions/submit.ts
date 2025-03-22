"use server";

import { z } from "zod";

import client from './../../db';

import { autonomous, teleop, misc } from "@/lib/match-scouting";

const formSchema = z.object({
  ...Object.fromEntries(autonomous.map((field) => [field.name, field.schema])),
  ...Object.fromEntries(teleop.map((field) => [field.name, field.schema])),
  ...Object.fromEntries(misc.map((field) => [field.name, field.schema])),
  competitionID: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;
type TFormDataKeys = keyof Omit<FormData, "competitionID">;

export async function submit(data: FormData) {

  const {competitionID, ...formData} = formSchema.parse(data);

  try {

    const autoCycles = Object.values(
      formData["Autonomous Cycles" as TFormDataKeys]
    );

    const teleopCycles = Object.values(
      formData["Teleop Cycles" as TFormDataKeys]
    );

    const values = [
      Number(competitionID),
      formData["Team Number" as TFormDataKeys],
      formData["Qualification Number" as TFormDataKeys],
      autoCycles[0],
      autoCycles[1],
      teleopCycles[0],
      teleopCycles[1],
      autoCycles[2],
      autoCycles[3],
      teleopCycles[2],
      teleopCycles[3],
      autoCycles[4],
      autoCycles[5],
      teleopCycles[4],
      teleopCycles[5],
      autoCycles[6],
      autoCycles[7],
      teleopCycles[6],
      teleopCycles[7],
      autoCycles[8],
      teleopCycles[8],
      autoCycles[9],
      autoCycles[10],
      teleopCycles[9],
      teleopCycles[10],
      formData["Left Starting Line" as TFormDataKeys],
      formData["Starting Position" as TFormDataKeys],
      formData["Climb Status" as TFormDataKeys],
      formData["Defence Rating" as TFormDataKeys],
      formData["Driving Rating" as TFormDataKeys],
      formData["Climb Rating" as TFormDataKeys],
      Object.values(formData["Extra Notes" as TFormDataKeys])
    ];

    const query = `
    INSERT INTO match_data (competition_id, team_id, match_number, 
                            auto_l1, auto_l1_misses, teleop_l1, teleop_l1_misses, 
                            auto_l2, auto_l2_misses, teleop_l2, teleop_l2_misses, 
                            auto_l3, auto_l3_misses, teleop_l3, teleop_l3_misses, 
                            auto_l4, auto_l4_misses, teleop_l4, teleop_l4_misses,
                            auto_processor, teleop_processor,
                            auto_barge, auto_barge_misses, teleop_barge, teleop_barge_misses,
                            leave_starting_line, auto_side, climb_status,
                            defence_rating, scoring_rating, climb_rating,
                            extra_notes)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 
            $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, 
            $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, 
            $31, $32)
    `;

    await client.query(query, values);
    
    return { success: true, message: "Form submitted successfully." };
  } catch (error) {
    if (error instanceof Error && error.message.includes("duplicate key value")) {
      return {success: false, message: `Team ${formData["Team Number" as TFormDataKeys]} already scouted for match ${formData["Qualification Number" as TFormDataKeys]}` };
    }
    if (error instanceof Error && error.message.includes("violates foreign key constraint")) {
      const competition = await client.query("SELECT * FROM competitions WHERE id = $1", [Number(competitionID)]);
      if (competition.rowCount === 0) {
        return {success: false, message: `Selected Competition Does Not Exist` };
      }
      else {
        return {success: false, message: `Team ${formData["Team Number" as TFormDataKeys]} Does Not Play At Currently Selected Competition` };
      }
    }
    console.error(
      "Form submission failed:",
      error instanceof Error ? error.message : "Unknown error occurred."
    );
    if (error instanceof z.ZodError) {
      const errorMessages = error.errors
        .map((err) => `${err.path.join(".")}: ${err.message}`)
        .join(", ");
      return { success: false, message: `Validation failed: ${errorMessages}` };
    }
    return { success: false, message: "Form submission failed." };
  }
}
