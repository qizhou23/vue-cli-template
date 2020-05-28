/**
 * 找到@/views下所有路由routes.js文件，全部合并到routes里，并导出
 * 后由@/router/index.js注册到路由里
 */

const requireComponent = require.context('@/views', true, /routes\.js$/)

let noLayoutRoutes = []
let layoutRoutesObj = {}
let layoutNavObj = {}

requireComponent.keys().forEach(filePath => {
    const componentConfig = requireComponent(filePath)
    const layout = componentConfig.default.layout

    if (layout) {
        layoutRoutesObj[layout] = layoutRoutesObj[layout] || []
        layoutNavObj[layout] = layoutNavObj[layout] || []
        layoutRoutesObj[layout] = [
            ...layoutRoutesObj[layout],
            ...componentConfig.default.routes.filter(route => !route.url)
        ]
        layoutNavObj[layout] = [
            ...layoutNavObj[layout],
            ...[componentConfig.default]
        ]
    } else {
        noLayoutRoutes = [...noLayoutRoutes, ...componentConfig.default.routes]
    }
})

export const NoLayoutRoutes = noLayoutRoutes.filter(routes => !routes.url)
export const LayoutRoutesObj = layoutRoutesObj
export const LayoutNavObj = layoutNavObj
