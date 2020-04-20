import {makeRoute} from '@sha/router'

export default {
    index: makeRoute('/',),
    login: makeRoute('/login'),
    profile: makeRoute('/profile'),
    news: makeRoute('/news'),
    /**
     *
     *
     signUp: makeRoute('/app/signUp'),
     signIn: makeRoute('/app/signIn'),
     example: makeRoute('/app/example'),
     unknownTrainer: makeRoute('/app/t_unknown'),
     guestLink: makeRoute<{type?: string}>('/app/guest/:type'),

     trainersQuiz: makeRoute<{displayName: string}>('/app/t/:displayName'),
     trainersPlanPage: makeRoute<{planId: string}>('/app/p/:planId'),
     htmlMenuPage: makeRoute<{planId: string}>('/app/p/:planId/html/menu/'),
     htmlShoppingPage: makeRoute<{planId: string}>('/app/p/:planId/html/shopping/'),

     requestPasswordReset: makeRoute('/app/requestPasswordReset'),
     setPassword: makeRoute<{resetPasswordGuid: string}>('/app/setPassword/:resetPasswordGuid'),

     trainerVerification: makeRoute('/app/in/verify'),
     myClients: makeRoute('/app/in'),
     newPlan: makeRoute('/app/in/newPlan'),
     addBalance: makeRoute('/app/in/addBalance'),

     tinkoffDone: makeRoute('/app/in/pay/done'),
     tinkoffFailed: makeRoute('/app/in/pay/failed'),


     myClientPlan: makeRoute<{planId: string}>('/app/in/myplans/:planId'),
     editMyClientPlan: makeRoute<{planId: string}>('/app/in/myplans/edit/:planId'),
     demoMyClientPlan: makeRoute<{planId: string}>('/app/in/myplans/demo/:planId'),
     demoMyClientPlanNoBack: makeRoute<{planId: string}>('/app/in/myplans/demo/noback/:planId'),
     buyPlan: makeRoute<{planId: string}>('/app/in/buyPlan/:planId'),
     trainersSettings: makeRoute('/app/in/settings'),
     trainersHello: makeRoute('/app/in/hello'),
     planDecorSettings: makeRoute('/app/in/planDecorSettings'),

     planBrandDecorSettings: makeRoute('/app/in/planBrandDecorSettings')
     */
}
