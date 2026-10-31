type Event = {
  id: string
  type: string
  label: string
  expiresAt: number
  sublabel: string
};

export type Repo = {
  name: string
  branch: string
  openPRs: number
};

export type Column = {
  name: string
  tasks: number
  /** This indicates if counts are daily counts */
  daily: boolean
  type: 'TODO' | 'DONE' | 'IN_PROGRESS' | 'BLOCKED'
};

export type DashboardData = {
  events: Event[]
  git?: {
    repos: Repo[]
  }
  asana?: {
    cols: Column[]
  }
};
