"use server";

import client from './../db';

export async function fetchData() {
    const data = await client.query("SELECT * FROM teams");
    return data.rows;
}