"use server";

import client from '../../db';

export async function setColorData(color: string, team_id: number, competition_id: number) {
    const query = `UPDATE competitions_teams SET background_color = $1 WHERE team_id = $2 AND competition_id = $3`;
    await client.query(query, [color, team_id, competition_id]);
}