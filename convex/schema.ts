import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
	users: defineTable({
		user_id: v.number(),
		username: v.string(),
		password: v.string(),
	}),
	yearlyData: defineTable({
		year: v.number(),
		user_id: v.number(),
		months: v.array(v.string()),
		income: v.record(v.string(), v.any()),
		expenses: v.record(v.string(), v.any()),
	}).index("by_user", ["user_id", "year"]),
});
