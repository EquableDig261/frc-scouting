import client from './db';

export const getAllCompetitions = async () => {
  const query = 'SELECT * FROM competitions';
  try {
    const result = await client.query(query);
    return result.rows;  // Return the rows from the query
  } catch (err) {
    console.error('Error fetching competitions:', err);
  }
};