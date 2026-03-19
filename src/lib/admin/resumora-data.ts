export type AdminStat = {
  label: string
  value: string
  change: string
  changeType: "positive" | "negative" | "neutral"
  note: string
}

export const adminStats: AdminStat[] = [
  {
    label: "Total Orders",
    value: "1,284",
    change: "+12.4%",
    changeType: "positive",
    note: "vs last 30 days",
  },
  {
    label: "Active Clients",
    value: "842",
    change: "+8.1%",
    changeType: "positive",
    note: "engaged accounts",
  },
  {
    label: "Docs In Progress",
    value: "96",
    change: "14 urgent",
    changeType: "positive",
    note: "resume + cover letter queue",
  },
  {
    label: "Monthly Revenue",
    value: "$24,920",
    change: "+18.7%",
    changeType: "positive",
    note: "gross collected",
  },
]

export type QueueItem = {
  label: string
  progress: number
}

export const productionQueue: QueueItem[] = [
  { label: "Resume Drafting", progress: 72 },
  { label: "Cover Letters", progress: 54 },
  { label: "LinkedIn Optimization", progress: 88 },
]

export type AlertItem = {
  title: string
  description: string
  tone: "critical" | "warning" | "success"
}

export const alerts: AlertItem[] = [
  {
    title: "14 urgent documents",
    description: "Due in less than 24 hours.",
    tone: "critical",
  },
  {
    title: "7 awaiting client inputs",
    description: "Missing job links or old resumes.",
    tone: "warning",
  },
  {
    title: "Payments healthy",
    description: "No failed transactions in the last 24 hours.",
    tone: "success",
  },
]