"use server";

import client from './../db';

export async function fetchData() {
    const query = `
    SELECT team_id, picklist_rank, background_color 
    FROM competitions_teams 
    ORDER BY picklist_rank ASC`;
    
    const data = await client.query(query);
    return data.rows;
}