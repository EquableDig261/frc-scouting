"use server";

import client from './../db';

export async function fetchData() {
    const query = `
    SELECT team_id, picklist_rank, background_color 
    FROM competitions_teams 
    ORDER BY picklist_rank ASC`;
    
    console.log(query);
    const data = await client.query(query);
    console.log(data.rows);
    return data.rows;
}