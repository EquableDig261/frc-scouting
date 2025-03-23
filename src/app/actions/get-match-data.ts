"use server";

import client from './../../db';

export async function fetchMatchData(field: string, team1: number, team2: number, team3: number, team4: number) {
    const query = `SELECT $1 FROM competitions_teams WHERE team_id = $2`;
    const data1 = await client.query(query, [field, team1]);
    const data2 = await client.query(query, [field, team2]);
    const data3 = await client.query(query, [field, team3]);
    const data4 = await client.query(query, [field, team4]);
    return [data1.rows, data2.rows, data3.rows, data4.rows];
}