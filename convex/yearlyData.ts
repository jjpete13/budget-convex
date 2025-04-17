import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getYearlyData = query({
	args: {
		user_id: v.string(),
		year: v.number(),
	},
	handler: async (ctx, args) => {
		const userInfo = await ctx.db
			.query("users")
			.filter((q) => q.eq(q.field("_id"), args.user_id))
			.collect();
		return await ctx.db
			.query("yearlyData")
			.withIndex("by_user")
			.filter((q) => q.eq(q.field("user_id"), userInfo[0].user_id))
			.filter((q) => q.eq(q.field("year"), args.year))
			// TODO: change this to return first instead of collect
			.collect();
	},
});

export const updateBudgetData = mutation({
	args: {
		user_id: v.string(),
		year: v.number(),
		newData: v.record(v.string(), v.any()),
		isExpense: v.boolean(),
	},
	handler: async (ctx, args) => {
		const userInfo = await ctx.db
			.query("users")
			.filter((q) => q.eq(q.field("_id"), args.user_id))
			.collect();
		const yearlyData = await ctx.db
			.query("yearlyData")
			.withIndex("by_user")
			.filter((q) => q.eq(q.field("user_id"), userInfo[0].user_id))
			.filter((q) => q.eq(q.field("year"), args.year))
			.collect();
		if (args.isExpense) {
			return await ctx.db.patch(yearlyData[0]._id, { expenses: args.newData });
		}
		return await ctx.db.patch(yearlyData[0]._id, { income: args.newData });
	},
});
