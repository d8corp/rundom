import { createRouting } from '../components'
import { lazy } from '../utils'
import { MainLayout } from './layouts/MainLayout'
import { MenuLayout } from './layouts/MenuLayout'
import { menu } from './menu'
import { LoadingPage } from './pages/system/LoadingPage'
import { uiMenu } from './uiMenu'

export const routing = createRouting([
  {
    component: MainLayout,
    childrenFallback: <LoadingPage />,
    children: [
      {
        index: true,
        component: lazy(() => import('./pages/main/HomePage')),
      },
      {
        path: 'ui',
        index: true,
        component: lazy(() => import('./pages/ui/UIPage/UIPage')),
      },
      {
        path: 'ui',
        component: ({ children }) => <MenuLayout menu={uiMenu} children={children} />,
        children: [
          {
            index: true,
            path: 'introduction',
            component: lazy(() => import('./pages/ui/UIIntroductionPage')),
          },
          {
            index: true,
            path: 'components',
            component: lazy(() => import('./pages/ui/ComponentsPage')),
          },
          {
            index: true,
            path: 'icons',
            component: lazy(() => import('./pages/ui/IconsPage')),
          },
          {
            index: true,
            path: 'typography',
            component: lazy(() => import('./pages/ui/TypographyPage')),
          },
          {
            index: true,
            path: 'link',
            component: lazy(() => import('./pages/ui/LinkPage')),
          },
          {
            index: true,
            path: 'markdown',
            component: lazy(() => import('./pages/ui/MarkdownPage')),
          },
          {
            index: true,
            path: 'button',
            component: lazy(() => import('./pages/ui/ButtonPage')),
          },
          {
            index: true,
            path: 'code',
            component: lazy(() => import('./pages/ui/CodePage')),
          },
          {
            index: true,
            path: 'divider',
            component: lazy(() => import('./pages/ui/DividerPage')),
          },
          {
            index: true,
            path: 'scrollbar',
            component: lazy(() => import('./pages/ui/ScrollbarPage')),
          },
          {
            index: true,
            path: 'card',
            component: lazy(() => import('./pages/ui/CardPage')),
          },
          {
            index: true,
            path: 'box',
            component: lazy(() => import('./pages/ui/BoxPage')),
          },
          {
            index: true,
            path: 'flex',
            component: lazy(() => import('./pages/ui/FlexPage')),
          },
          {
            index: true,
            path: 'text',
            component: lazy(() => import('./pages/ui/TextPage')),
          },
          {
            index: true,
            path: 'eyebrow',
            component: lazy(() => import('./pages/ui/EyebrowPage')),
          },
          {
            index: true,
            path: 'check-box',
            component: lazy(() => import('./pages/ui/CheckBoxPage')),
          },
          {
            index: true,
            path: 'radio-box',
            component: lazy(() => import('./pages/ui/RadioBoxPage')),
          },
          {
            index: true,
            path: 'toggle',
            component: lazy(() => import('./pages/ui/TogglePage')),
          },
          {
            index: true,
            path: 'field',
            component: lazy(() => import('./pages/ui/FieldPage')),
          },
          {
            index: true,
            path: 'input',
            component: lazy(() => import('./pages/ui/InputPage')),
          },
          {
            index: true,
            path: 'description',
            component: lazy(() => import('./pages/ui/DescriptionPage')),
          },
          {
            index: true,
            path: 'title',
            component: lazy(() => import('./pages/ui/TitlePage')),
          },
          {
            index: true,
            path: 'message',
            component: lazy(() => import('./pages/ui/MessagePage')),
          },
          {
            index: true,
            path: 'popover',
            component: lazy(() => import('./pages/ui/PopoverPage')),
          },
          {
            index: true,
            path: 'dropdown',
            component: lazy(() => import('./pages/ui/DropdownPage')),
          },
          {
            index: true,
            path: 'spin',
            component: lazy(() => import('./pages/ui/SpinPage')),
          },
          {
            index: true,
            path: 'devtools',
            component: lazy(() => import('./pages/ui/DevtoolsPage')),
          },
          {
            index: true,
            path: 'option',
            component: lazy(() => import('./pages/ui/OptionPage')),
          },
          {
            index: true,
            path: 'options',
            component: lazy(() => import('./pages/ui/OptionsPage')),
          },
        ],
      },
      {
        component: ({ children }) => <MenuLayout menu={menu} children={children} />,
        children: [
          {
            index: true,
            path: 'quick-start',
            component: lazy(() => import('./pages/main/QuickStartPage')),
          },
          {
            index: true,
            path: 'jsx-elements',
            component: lazy(() => import('./pages/main/JSXElementsPage')),
          },
          {
            index: true,
            path: 'jsx-dom-elements',
            component: lazy(() => import('./pages/main/JSXDOMElementsPage')),
          },
          {
            index: true,
            path: 'components',
            component: lazy(() => import('./pages/main/ComponentsPage')),
          },
          {
            index: true,
            path: 'state-management',
            component: lazy(() => import('./pages/main/StateManagementPage')),
          },
          {
            index: true,
            path: 'changelog',
            component: lazy(() => import('./pages/main/ChangelogPage')),
          },
          {
            index: true,
            path: 'routing',
            component: lazy(() => import('./pages/main/RoutingPage')),
          },
          {
            index: true,
            path: 'portal',
            component: lazy(() => import('./pages/main/PortalPage')),
          },
          {
            index: true,
            path: 'context',
            component: lazy(() => import('./pages/main/ContextPage')),
          },
          {
            index: true,
            path: 'for',
            component: lazy(() => import('./pages/main/ForPage')),
          },
          {
            index: true,
            path: 'router',
            component: lazy(() => import('./pages/main/RouterPage')),
          },
          {
            index: true,
            path: 'delay',
            component: lazy(() => import('./pages/main/DelayPage')),
          },
          {
            index: true,
            path: 'show',
            component: lazy(() => import('./pages/main/ShowPage')),
          },
          {
            index: true,
            path: 'hide',
            component: lazy(() => import('./pages/main/HidePage')),
          },
          {
            index: true,
            path: 'suspense',
            component: lazy(() => import('./pages/main/SuspensePage')),
          },
          {
            index: true,
            path: 'lazy',
            component: lazy(() => import('./pages/main/LazyPage')),
          },
          {
            index: true,
            path: 'pipe',
            component: lazy(() => import('./pages/main/PipePage')),
          },
          {
            index: true,
            path: 'try',
            component: lazy(() => import('./pages/main/TryPage')),
          },
          {
            index: true,
            path: 'hub-provider',
            component: lazy(() => import('./pages/main/HubProviderPage')),
          },
          {
            index: true,
            path: 'use-param',
            component: lazy(() => import('./pages/main/UseParamPage')),
          },
          {
            index: true,
            path: 'use-params',
            component: lazy(() => import('./pages/main/UseParamsPage')),
          },
          {
            index: true,
            path: 'use-styles',
            component: lazy(() => import('./pages/main/UseStylesPage')),
          },
          {
            index: true,
            path: 'ref',
            component: lazy(() => import('./pages/main/RefPage')),
          },
        ],
      },
      {
        component: lazy(() => import('./pages/system/NotFoundPage')),
      },
    ],
  },
])
