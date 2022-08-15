/**
 * A configuration file for semantic-release
 *
 * @see {@link https://semantic-release.gitbook.io/semantic-release/} for about semantic-release.
 * @see {@link https://semantic-release.gitbook.io/semantic-release/usage/configuration} for configuration details.
 * @see {@link https://github.com/semantic-release/semantic-release/blob/971a5e0d16f1a32e117e9ce382a1618c8256d0d9/lib/get-config.js#L56} for about default config.
 */

// const types = require("./commit-types.config");
const defaultBranch = "main"; // or "master"
const changelogFile = "CHANGELOG.md";

module.exports = {
  /**
   * Git branch targeted for release
   *
   * @see https://semantic-release.gitbook.io/semantic-release/usage/workflow-configuration
   */
  branches: [
    "+([0-9])?(.{+([0-9]),x}).x",
    defaultBranch,
    { name: "beta", prerelease: true },
    { name: "alpha", prerelease: true },
  ],
  /**
   * Git tag format. You can use Lodash templates.
   * This setting is ignored when using multi-semantic-release.
   */
  tagFormat: "v${version}",
  /**
   * plugin to run
   */
  plugins: [
    /**
     * Analyze commits with conventional-changelog.
     * @see https://github.com/semantic-release/commit-analyzer
     */
    [
      "@semantic-release/commit-analyzer",
      {
        // preset: "conventionalcommits",
        releaseRules: [
          { breaking: true, release: "major" },
          { revert: true, release: "patch" },
          // ...types.flatMap(({ type, release }) =>
          //   release ? [{ type, release }] : []
          // ),
        ],
      },
    ],
    /**
     * Generate changelog content with conventional-changelog.
     * @see https://github.com/semantic-release/release-notes-generator
     */
    [
      "@semantic-release/release-notes-generator",
      {
        // preset: "conventionalcommits",
        presetConfig: {
          // types: types.map(({ type, section, hidden }) => ({
          //   type,
          //   section,
          //   hidden: hidden ?? true,
          // })),
        },
      },
    ],
    /**
     * Generate a changelogFile based on the changelog contents.
     * @see https://github.com/semantic-release/changelog
     */
    [
      "@semantic-release/changelog",
      {
        changelogFile,
      },
    ],
    /**
     * Update package.json version or publish npm package.
     * @see https://github.com/semantic-release/npm
     */
    [
      "@semantic-release/npm",
      {
        npmPublish: true,
      },
    ],
    /**
     * Commit the assets generated during the release to your Git repository.
     * @see https://github.com/semantic-release/git
     */
    [
      "@semantic-release/git",
      {
        // files to commit
        assets: [
          "dist/**/*",
          "package.json", // to commit changes in the version field
          "package-lock.json", // to commit changes in the version field
          changelogFile, // to commit changes in changelogFile
        ],
        // commit message
        message:
          "release: 🏹 ${nextRelease.gitTag} [skip ci]\n\n${nextRelease.notes}",
      },
    ],
    /**
     * Publish GitHub releases and leave comments on released pull requests and issues.You can also upload assets to releases.
     * @see https://github.com/semantic-release/github
     */
    [
      "@semantic-release/github",
      {
        // Labels for related issues and PRs
        releasedLabels: ["released", "released-in-${nextRelease.gitTag}"],
        // Comments left on related issues and PRs
        successComment:
          "🎉 This ${issue.pull_request ? 'pull request' : 'issue'} is included in version ${nextRelease.gitTag}.",
      },
    ],
    /**
     * Run shell commands at various points in the release process.
     * @see https://github.com/semantic-release/exec
     */
    // [
    //   "@semantic-release/exec",
    //   {
    //     // prepare: "npx typedoc",
    //   },
    // ],
  ],
};