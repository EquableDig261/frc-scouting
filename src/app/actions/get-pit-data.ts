"use server";

import client from './../../db';

export async function fetchPitData(team1: number, team2: number, team3: number, team4: number) {
    const query = `SELECT team_id,
    has_left_auto,
    has_center_auto,
    has_right_auto,
    prefered_auto,
    can_l1,
    can_l2,
    can_l3,
    can_l4,
    can_barge,
    can_processor,
    can_deep_climb,
    can_shallow_climb,
    is_swerve FROM competitions_teams WHERE team_id = $1 OR team_id = $2 OR team_id = $3 OR team_id = $4 ORDER BY team_id ASC`
    const data = await client.query(query, [team1, team2, team3, team4]);
    console.log(data.rows);
    return data.rows;
}