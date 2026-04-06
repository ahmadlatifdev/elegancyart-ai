export type AdminStat = {
  label: string;
  value: string;
  change: string;
};

export type AlertItem = {
  level: "critical" | "warning" | "success";
  title: string;
  message: string;
};

export type ProductionQueueItem = {
  id: string;
  candidate: string;
  role: string;
  status: string;
};

export type RecentOrderItem = {
  id: string;
  customer: string;
  plan: string;
  amount: string;
  status: string;
};

export const adminStats: AdminStat[] = [
  { label: "Orders", value: "24", change: "+6%" },
  { label: "Revenue", value: "$1,240", change: "+9%" },
  { label: "Conversions", value: "18%", change: "+2%" },
  { label: "Pending", value: "5", change: "-1%" },
];

export const alerts: AlertItem[] = [
  {
    level: "critical",
    title: "Payment webhook",
    message: "Stripe webhook retry required.",
  },
  {
    level: "warning",
    title: "Resume queue",
    message: "Two resumes are waiting for review.",
  },
  {
    level: "success",
    title: "System",
    message: "Admin services are running normally.",
  },
];

export const productionQueue: ProductionQueueItem[] = [
  {
    id: "RQ-1001",
    candidate: "Ava Thompson",
    role: "Product Manager",
    status: "Drafting",
  },
  {
    id: "RQ-1002",
    candidate: "Noah Martin",
    role: "Data Analyst",
    status: "Review",
  },
  {
    id: "RQ-1003",
    candidate: "Liam Carter",
    role: "Software Engineer",
    status: "Completed",
  },
];

export const recentOrders: RecentOrderItem[] = [
  {
    id: "ORD-901",
    customer: "Emma Wilson",
    plan: "Pro Resume",
    amount: "$49",
    status: "Paid",
  },
  {
    id: "ORD-902",
    customer: "James Lee",
    plan: "Cover Letter",
    amount: "$19",
    status: "Paid",
  },
  {
    id: "ORD-903",
    customer: "Sophia Hall",
    plan: "Resume + LinkedIn",
    amount: "$79",
    status: "Pending",
  },
];