import DemoHomePage from "../PracticeDemo/pages/DemoHomePage";
import TabDemoPage  from "../PracticeDemo/pages/TabDemoPage";
import TabDemoLayout from "../PracticeDemo/layouts/TabDemoLayout";


const practiceDemoSubRouters = [
    {
        index: true,  //匹配父路由`/demo`，**没有子路径** → 触发 `index:true` 的路由，渲染 DemoHomePage
        element: <DemoHomePage />
    },
    { 
        path: 'home', 
        element: <DemoHomePage /> 
    },
    {
        path: 'tab',
        element: <TabDemoLayout />,
        children: [
            {
                index: true,  //匹配父路由`/demo/tab`，**没有子路径** → 触发 `index:true` 的路由，渲染 TabDemoPage
                element: <DemoHomePage />
            },
            {
                path: 'home',
                element: <DemoHomePage />
            }
            ,
            {
                path: 'demo',
                element: <TabDemoPage />
            }
        ]
    }
]

export default practiceDemoSubRouters