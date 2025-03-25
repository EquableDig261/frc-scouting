"use server";

import client from './../db';

export async function fetchData(competition_id: number) {
    const query = `
    SELECT team_id, picklist_rank, background_color 
    FROM competitions_teams 
    WHERE competition_id = $1
    ORDER BY picklist_rank ASC`;
    
    const data = await client.query(query, [competition_id]);
    return data.rows;
}