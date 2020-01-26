import User from '@/views/user'
export default [{
    path: '/',
    component: User,
    children: [
        { path: 'auth',  component: _=>import('../views/user/auth'), children : [
            { name: 'user-login', path: '', component: _=>import('../views/user/auth/Login.vue')}
        ]}
    ]
}]