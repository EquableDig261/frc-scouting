"use server";

import client from './../../db';

type PitData = {
    team_id: number;
    has_left_auto: boolean;
    has_center_auto: boolean;
    has_right_auto: boolean;
    prefered_auto: string;
    can_l1: boolean;
    can_l2: boolean;
    can_l3: boolean;
    can_l4: boolean;
    can_barge: boolean;
    can_processor: boolean;
    can_deep_climb: boolean;
    can_shallow_climb: boolean;
    is_swerve: boolean;
  };

export async function setPitData(data: PitData) {
    const query = `UPDATE competitions_teams SET has_left_auto = $2, has_center_auto = $3, has_right_auto = $4, prefered_auto = $5, can_l1 = $6, can_l2 = $7, can_l3 = $8, can_l4 = $9, can_barge = $10, can_processor = $11, can_deep_climb = $12, can_shallow_climb = $13, is_swerve = $14 WHERE team_id = $1`
    const values = [data.team_id, data.has_left_auto, data.has_center_auto, data.has_right_auto, data.prefered_auto, data.can_l1, data.can_l2, data.can_l3, data.can_l4, data.can_barge, data.can_processor, data.can_deep_climb, data.can_shallow_climb, data.is_swerve];
    await client.query(query, values);
}