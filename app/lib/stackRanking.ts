// app/config/stackSystem.ts

// How many products the Stack System should select for the page
// ✅ Set to 40 for a full showcase (change to 20 anytime if needed)
export const STACK_SYSTEM_PRODUCT_LIMIT = 40;

// Supported data sources for sales / product stats
export type StackSystemSource =
  | "google_sheets"
  | "supabase"
  | "woocommerce"
  | "shopify"
  | "csv_import"
  | "affiliate_api";

export const STACK_SYSTEM_SOURCES: StackSystemSource[] = [
  "google_sheets",
  "supabase",
  "woocommerce",
  "shopify",
  "csv_import",
  "affiliate_api",
];

// Fields the system expects to receive per product
export interface StackSystemProductInput {
  productId: string;
  title: string;
  category: string;
  dailySalesCount?: number | null;
  sales7Days?: number | null;
  sales30Days?: number | null;
  conversionRate?: number | null; // 0–1 range
  stockLevel?: number | null;
}

// Fields after the ranking engine processes the product
export interface StackSystemRankedProduct extends StackSystemProductInput {
  score: number;
  rank: number;
  badges: string[];
  reason: string;
}

// Default weights for scoring
export const STACK_SYSTEM_WEIGHTS = {
  sales7Days: 0.5,
  sales30Days: 0.2,
  conversionRate: 0.2,
  stockLevel: 0.1,
};

// Helper to normalize optional values
export const safeNumber = (
  value: number | null | undefined,
  fallback = 0
): number => (typeof value === "number" && !Number.isNaN(value) ? value : fallback);
