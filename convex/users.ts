import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getUser = query({
  args: {
    user_id: v.number(),
  },
  handler: async (ctx, { user_id }) => {
    return await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("user_id"), user_id))
      .collect();
  },
});

export const confirmUser = mutation({
  args: {
    username: v.string(),
    password: v.string(),
  },
  handler: async (ctx, { username, password }) => {
    const match = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("username"), username))
      .filter((q) => q.eq(q.field("password"), password))
      .collect();

    if (match.length > 0) {
      return match[0]._id;
    }
    return false;
  },
})
