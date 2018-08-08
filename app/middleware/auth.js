module.exports = (options, app) => {
    return async function auth(ctx, next) {
        console.log(ctx.session);
        if(!ctx.session || !ctx.session.phone){
            console.log('认证失败');
            ctx.body = {
                timestamp: +new Date(),
                status: 401 ,
                error: 'Not Found',
                message: 'No message available',
                path: '/user/login',
            }
            return;
        }else{
            await next();
        }
    }
}
