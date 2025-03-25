"use server";

import client from "./../../db";

interface MatchResult {
    name: string;
    categoryA?: number;
    categoryB?: number;
    categoryC?: number;
    categoryD?: number;
}

export async function fetchMatchData(field: string, team1: number, team2: number, team3: number, team4: number, competition_id: number): Promise<MatchResult[]> {
    const query = `SELECT ${field} AS field FROM match_data WHERE team_id = $1 AND competition_id = $2`;
    const results: MatchResult[] = [];

    const [data1, data2, data3, data4] = await Promise.all([
        client.query(query, [team1, competition_id]),
        client.query(query, [team2, competition_id]),
        client.query(query, [team3, competition_id]),
        client.query(query, [team4, competition_id]),
    ]);

    const maxMatches = Math.max(data1.rows.length, data2.rows.length, data3.rows.length, data4.rows.length);
    
    for (let i = 0; i < maxMatches; i++) {
        const matchData: MatchResult = { name: `Match ${i + 1}` };
        
        if (data1.rows[0] != null) matchData.categoryA = data1.rows[i] != null ? data1.rows[i]["field"] as number : 0;
        if (data2.rows[0] != null) matchData.categoryB = data2.rows[i] != null ? data2.rows[i]["field"] as number : 0;
        if (data3.rows[0] != null) matchData.categoryC = data3.rows[i] != null ? data3.rows[i]["field"] as number : 0;
        if (data4.rows[0] != null) matchData.categoryD = data4.rows[i] != null ? data4.rows[i]["field"] as number : 0;
        
        results.push(matchData);
    }

    console.log(results);
    return results;
}
