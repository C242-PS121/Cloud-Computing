import { eq } from "drizzle-orm"
import { db } from "../db"
import schema from "../db/schema"

export const verify_email = async (email: string) => {
    const { users } = schema
    const [ result ] = await db.select().from(users).where(
        eq(users.email, email)
    )
    return result ? true : false
}