"use server";

import client from './../db';

export async function fetchData() {
    const data = await client.query("SELECT team_id, picklist_rank FROM competitions_teams ORDER BY picklist_rank ASC");
    return data.rows;
}