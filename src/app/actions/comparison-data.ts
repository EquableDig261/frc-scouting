"use server";

import client from './../../db';

export async function fetchComparisonData(team1: number, team2: number, team3: number, team4: number, competition_id: number) {
    const query = `SELECT ct.team_id, 
                    COALESCE(AVG(md.auto_l1 + md.auto_l2 + md.auto_l3 + md.auto_l4), 0) AS auto_avg,
                    COALESCE(AVG(md.auto_l1), 0) AS auto_l1_avg,
                    COALESCE(AVG(md.auto_l2), 0) AS auto_l2_avg,
                    COALESCE(AVG(md.auto_l3), 0) AS auto_l3_avg,
                    COALESCE(AVG(md.auto_l4), 0) AS auto_l4_avg,
                    COALESCE(AVG(md.teleop_l1 + md.teleop_l2 + md.teleop_l3 + md.teleop_l4), 0) AS teleop_avg,
                    COALESCE(AVG(md.teleop_l1), 0) AS teleop_l1_avg,
                    COALESCE(AVG(md.teleop_l2), 0) AS teleop_l2_avg,
                    COALESCE(AVG(md.teleop_l3), 0) AS teleop_l3_avg,
                    COALESCE(AVG(md.teleop_l4), 0) AS teleop_l4_avg,
                    COALESCE(AVG(md.auto_barge), 0) AS auto_barge_avg,
                    COALESCE(AVG(md.teleop_barge), 0) AS teleop_barge_avg,
                    COALESCE(AVG(md.auto_processor + md.teleop_processor), 0) AS processor_avg,
                    COUNT(CASE WHEN md.climb_status = 'Deep' THEN 1 END) AS num_deep_climbs,
                    COUNT(CASE WHEN md.climb_status = 'Shallow' THEN 1 END) AS num_shallow_climbs,
                    COUNT(CASE WHEN md.climb_status = 'Park' THEN 1 END) AS num_parks,
                    COUNT(CASE WHEN md.climb_status = 'None' THEN 1 END) AS num_no_climbs,
                    COALESCE(AVG(md.climb_rating), 0) AS climb_rating_avg,
                    COALESCE(AVG(md.defence_rating), 0) AS defence_rating_avg,
                    COALESCE(AVG(md.scoring_rating), 0) AS scoring_rating_avg
    FROM competitions_teams ct LEFT JOIN match_data md ON ct.team_id = md.team_id WHERE (ct.team_id = $1 OR ct.team_id = $2 OR ct.team_id = $3 OR ct.team_id = $4) AND ct.competition_id = $5 GROUP BY ct.team_id ORDER BY AVG(md.auto_l1) DESC`;
    const data = await client.query(query, [team1, team2, team3, team4, Number(competition_id)]);
    return data.rows;
}