import type { Repo } from '#lib/classes/api/DashboardData.ts';
import { DisplayScreen } from './DisplayScreen';
// @ts-ignore: IDE is going insane here, custom loader support seems inconsistent.
import IconGitMerge from '#lib/assets/icons/at-icons_git-merge.svg?d';
// @ts-ignore: IDE is going insane here, custom loader support seems inconsistent.
import IconGitBranch from '#lib/assets/icons/at-icons_git-branch.svg?d';

export class DashboardScreen extends DisplayScreen {
  private lastRenderedFooterCount = 0;
  private innerBodyWidth: number = 0;
  private innerBodyHeight: number = 0;
  private static readonly icons = {
    merge: IconGitMerge,
    branch: IconGitBranch,
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
    this.renderBody();
  }

  /**
   * Get the height between footers and headers
   */
  private get bodyHeightBesidesFooter() {
    return this.innerBodyHeight - (36 * this.lastRenderedFooterCount) - 36;
  }

  private renderBody() {
    // Clear a large middle section to destroy any leftover text
    this.ctx.fillRect(22.5, 22.5 + 36, this.innerBodyWidth - 2, this.bodyHeightBesidesFooter - 2);
    // Now actually draw the thing
    this.ctx.save();
    this.ctx.textBaseline = 'alphabetic';
    this.ctx.textAlign = 'center';
    this.ctx.font = DashboardScreen.fonts.header.xl;
    this.ctx.fillStyle = DashboardScreen.colors['gray-400'];
    this.ctx.fillText('NOMINAL', 22 + this.innerBodyWidth / 2, 22 + 36 + (this.bodyHeightBesidesFooter / 2));
    this.ctx.save();
  }

  private renderGitFooters() {
    const numberOfRepos = this.dashboardData.git?.repos?.length ?? 0;
    if (numberOfRepos !== this.lastRenderedFooterCount) {
      this.lastRenderedFooterCount = numberOfRepos;
      this.dashboardData.git?.repos.forEach((repo, i) => this.renderGitFooter(
        {
          x: 22,
          y: this.height - 22 - (36 * (i + 1)),
        },
        repo,
      ));
      return true;
    }
    return false;
  }

  private renderPRCounts = (start: { x: number, y: number }, repo: Repo) => {
    this.ctx.save();
    this.ctx.fillStyle = repo.openPRs ? DisplayScreen.colors['gray-50'] : DisplayScreen.colors['gray-400'];
    this.drawSVGAt(new Path2D(DashboardScreen.icons.merge), start.x + 8, start.y + 8);
    this.ctx.font = `${DisplayScreen.fonts.body.sm}`;
    this.ctx.fillText(repo.openPRs ? `${repo.openPRs} PRs Waiting for Merge` : 'No PRs Waiting Merge', start.x + 8 + 20 + 8, start.y + 8 + 18);
    this.ctx.restore();
  };

  private renderRepoName = (start: { x: number, y: number }, repo: Repo, safeZoneWidth: number) => {
    this.ctx.save();
    this.ctx.font = DisplayScreen.fonts.header.xs;
    this.ctx.fillStyle = DisplayScreen.colors['gray-50'];
    this.ctx.textAlign = 'center';
    this.ctx.fillText(repo.name, start.x + 8 + safeZoneWidth * 1.5, start.y + 8 + 18);
    this.ctx.restore();
  };

  private renderBranchName = (start: { x: number, y: number }, repo: Repo, safeZoneWidth: number) => {
    this.ctx.save();
    this.ctx.font = DisplayScreen.fonts.body.sm;
    this.ctx.fillStyle = DisplayScreen.colors['gray-50'];
    this.ctx.textAlign = 'right';
    this.drawSVGAt(new Path2D(DashboardScreen.icons.branch), this.canvas.width - 50, start.y + 8);
    this.ctx.fillText(repo.branch, start.x + (safeZoneWidth * 3) - 36, start.y + 8 + 18);
    this.ctx.restore();
  };

  private renderGitFooter = (start: { x: number, y: number }, repo: Repo) => {
    // Calculate the width of the three zones
    const safeZoneWidth = this.innerBodyWidth / 3;
    this.ctx.strokeRect(start.x - 0.5, start.y - 0.5, this.innerBodyWidth, 36);
    // First empty out the whole zone, double -8 for padding on both dirs
    this.ctx.fillRect(start.x + 7.5, start.y + 7.5, this.innerBodyWidth - 8 - 8, 36 - 8 - 8);
    // And then render the texts
    this.renderPRCounts(start, repo);
    this.renderRepoName(start, repo, safeZoneWidth);
    this.renderBranchName(start, repo, safeZoneWidth);
  };

  public render(): void {
    // Calculate updates.
  }

  public release(): void {
    // Not much to do here.
  }
}
