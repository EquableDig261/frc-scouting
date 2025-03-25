"use server";

import client from './../../db';

export async function updatePicklist(startIndex: number, finishIndex: number, competition_id: number) {
    finishIndex = finishIndex + 1;
    startIndex = startIndex + 1;
    const direction = startIndex < finishIndex ? -1 : 1;
    const query = `UPDATE competitions_teams 
                    SET picklist_rank = 
                    CASE 
                        WHEN picklist_rank = $4 THEN $5
                        WHEN picklist_rank >= $2 AND picklist_rank <= $3 THEN picklist_rank + $1
                        ELSE picklist_rank
                    END WHERE competitions_id = $6`;
    let lowest = startIndex;
    let highest = finishIndex;
    if (startIndex > finishIndex) {
        lowest = finishIndex;
        highest = startIndex;
    }

    await client.query(query, [direction, lowest, highest, startIndex, finishIndex, competition_id]);
}