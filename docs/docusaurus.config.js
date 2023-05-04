// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');
const { readdirSync, existsSync } = require('fs');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Salable Node SDK',
  tagline: 'Helping run your SaaS business',
  url: 'https://docs.salable.app',
  baseUrl: '/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: '/img/salable_logo.png',
  organizationName: 'Salable',
  projectName: 'salable-docs',
  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      {
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        docs: {
          id: 'default',
          path: 'docs',
          routeBasePath: 'docs',
          sidebarPath: require.resolve('./sidebars.js'),
          lastVersion: 'current',
          versions: (() => {
            if (!existsSync('./versioned_docs')) return {};
            const versions = readdirSync(`./versioned_docs`);

            const versionNumbers = versions.flatMap((ver) =>
              ver.includes('version') ? [ver.split('-')[1]] : []
            );

            return {
              current: {
                label: 'Docs',
                path: `docs-latest`,
                banner: 'none',
              },
              ...versionNumbers.reduceRight((acc, cur) => {
                acc[cur] = {
                  label: `v${cur}`,
                  path: `docs-${cur}`,
                  banner: 'unmaintained',
                };

                return acc;
              }, {}),
            };
          })(),
        },
      },
    ],
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Salable Node SDK Docs',
        logo: {
          alt: 'Salable Logo',
          src: 'img/salable_logo.png',
        },
        items: [
          {
            type: 'docsVersion',
            position: 'left',
            label: 'Docs',
          },
          {
            type: 'docsVersionDropdown',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        copyright: `Copyright Salable © ${new Date().getFullYear()}`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
