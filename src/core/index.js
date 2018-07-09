import * as core from 'dva-core';
import TinyBee from './bee';
import { createLogger } from 'redux-logger';
import createLoading from 'dva-loading';

export function createDvaApp(appInstance, models = []) {
    //创建app
    const dvapp = core.create(
        {
            initialReducer: {}
        },
        {
            setupMiddlewares(middlewares) {
                return [
                    ...middlewares,
                    createLogger({
                        //dva-loading的log太多了，忽略掉
                        //直接从logger的state中查看loading状态即可
                        predicate: (getState, action) =>
                            action.type !== '@@DVA_LOADING/HIDE' &&
                            action.type !== '@@DVA_LOADING/SHOW',
                        duration: true,
                        collapsed: true,
                        timestamp: true
                    })
                ];
            }
        }
    );

    //加载model
    models.forEach(model => {
        dvapp.model(model);
    });

    dvapp.use(createLoading({ effects: true }));

    //启动app
    dvapp.start();

    return {
        ...dvapp,
        ...appInstance
    };
}
