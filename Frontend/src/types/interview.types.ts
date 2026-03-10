export interface Alert {
  message: string
  severity: "low" | "medium" | "high"
  time: string
}

export interface Interview {
  id: number
  day: string
  score: number
  alerts: Alert[]
}