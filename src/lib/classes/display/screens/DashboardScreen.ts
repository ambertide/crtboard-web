import type { Repo } from '#lib/classes/api/DashboardData.ts';
import { DisplayScreen } from './DisplayScreen';
import IconGitMerge from '#lib/assets/icons/at-icons_git-branch.svg?raw';

export class DashboardScreen extends DisplayScreen {
  private lastRenderedFooterCount = 0;
  private innerBodyWidth: number = 0;
  private innerBodyHeight: number = 0;
  private static readonly icons = {
    merge: IconGitMerge,
  };

  constructor(...args: ConstructorParameters<typeof DisplayScreen>) {
    super(...args);
    this.ctx.fillStyle = DisplayScreen.colors['gray-950'];
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.innerBodyHeight = this.canvas.height - (22 * 2);
    this.innerBodyWidth = this.canvas.width - (22 * 2);
    this.renderBorders();
  }

  public static get name(): string {
    return 'Dashboard';
  }

  public static get id(): string {
    return 'dashboard';
  }

  private renderBorders() {
    this.ctx.strokeStyle = DisplayScreen.colors['gray-50'];
    this.ctx.lineWidth = 1;
    // Outer border
    this.ctx.strokeRect(17.5, 17.5, this.canvas.width - (18 * 2), this.canvas.height - (18 * 2));
    // Inner border
    this.ctx.strokeRect(21.5, 21.5, this.canvas.width - (22 * 2), this.canvas.height - (22 * 2));
    // Header
    this.ctx.strokeRect(21.5, 21.5, this.canvas.width - (22 * 2), 36);
    this.renderGitFooters();
  }

  private renderGitFooters() {
    const numberOfRepos = this.dashboardData.git?.repos?.length ?? 0;
    if (numberOfRepos !== this.lastRenderedFooterCount) {
      this.dashboardData.git?.repos.forEach((repo, i) => this.renderGitFooter(
        {
          x: 22,
          y: this.height - 22 - (36 * (i + 1)),
        },
        repo,
      ));
    }
  }

  private renderGitFooter = (start: { x: number, y: number }, repo: Repo) => {
    // Calculate the width of the three zones
    const safeZoneWidth = this.innerBodyWidth / 3;
    this.ctx.strokeRect(start.x - 0.5, start.y - 0.5, this.innerBodyWidth, 36);
    // First empty out the whole zone
    this.ctx.fillRect(start.x + 7.5, start.y + 7.5, this.innerBodyWidth - 8, 36 - 8);
    // And then render the texts
    const oldFillStyle = this.ctx.fillStyle;
    this.ctx.font = `bold ${DisplayScreen.fonts.header.md}`;
    this.ctx.fillStyle = repo.openPRs ? DisplayScreen.colors['gray-50'] : DisplayScreen.colors['gray-400'];
    this.drawSVGAt(new Path2D(DashboardScreen.icons.merge), start.x + 8, start.y + 8);
    this.ctx.fillText(repo.openPRs ? `${repo.openPRs} PRs Waiting for Merge` : 'No PRs Waiting Merge', start.x + 8 + 20 + 8, start.y + 8);
    // Restore style
    this.ctx.fillStyle = oldFillStyle;
  };

  public render(): void {
    // Calculate updates.
  }

  public release(): void {
    // Not much to do here.
  }
}
