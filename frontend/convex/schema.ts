import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Thai property listings
  properties: defineTable({
    name: v.string(),
    location: v.string(),
    district: v.string(),
    price: v.number(), // Price in THB
    type: v.string(), // "condo", "house", "villa", "townhouse"
    bedrooms: v.number(),
    bathrooms: v.number(),
    area: v.number(), // Square meters
    description_th: v.string(),
    description_en: v.string(),
    features: v.array(v.string()),
    nearBts: v.optional(v.string()), // Nearest BTS station
    nearMrt: v.optional(v.string()), // Nearest MRT station
    imageUrl: v.optional(v.string()),
  })
    .index("by_location", ["location"])
    .index("by_type", ["type"])
    .index("by_price", ["price"]),

  // Chat conversations
  conversations: defineTable({
    sessionId: v.string(),
    title: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_session", ["sessionId"]),

  // Individual chat messages
  messages: defineTable({
    conversationId: v.id("conversations"),
    role: v.union(v.literal("user"), v.literal("assistant"), v.literal("system")),
    content: v.string(),
    timestamp: v.number(),
  }).index("by_conversation", ["conversationId", "timestamp"]),
});

