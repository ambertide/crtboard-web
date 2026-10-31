import { APIService } from './APIService';

export class NullAPIService extends APIService {
  constructor() {
    super();
    this.dashboardData['asana'] = {
      cols: [
        {
          daily: false,
          name: 'Blocked',
          tasks: 5,
          type: 'BLOCKED',
        },
        {
          daily: true,
          name: 'Done',
          tasks: 6,
          type: 'DONE',
        },
        {
          daily: true,
          name: 'In Progress',
          tasks: 0,
          type: 'IN_PROGRESS',
        },
        {
          daily: true,
          name: 'To Do',
          tasks: 0,
          type: 'TODO',
        },
      ],
    };
    this.dashboardData['git'] = {
      repos: [
        {
          name: 'beemu',
          branch: 'feat/done',
          openPRs: 3,
        },
        {
          name: 'meow',
          branch: 'chore/cat/meow-meow-added',
          openPRs: 2,
        },
      ],
    };
  }
}
