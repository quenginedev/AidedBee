<template>
    <v-container>
        <v-snackbar
            v-model="error.show"
            color="error"
            top
        >
            {{ error.message }}
            <v-btn
                color="white"
                rounded
                text
                @click="error.show = false"
            >
                Close
            </v-btn>
        </v-snackbar>
        <v-row 
            justify="center"
            align="end"
            style="height: 100vh"
        >
            <div class="col-11 col-sm-8 col-md-5 col-lg-4 col-xl-3">
                <v-row align="center" justify="space-between">
                    <v-btn v-if="show_password_field" @click="show_password_field = false" color="secondary" dark fab> 
                        <v-icon>mdi-chevron-left</v-icon>
                    </v-btn>
                    
                    <v-avatar size="60px" class="primary elevation-5">
                        <v-icon size="60" color="white">mdi-bee</v-icon>
                    </v-avatar>
                        
                    <v-btn v-if="!show_password_field" @click="login_by_phone = !login_by_phone" color="secondary" dark fab> 
                        <v-icon v-if="login_by_phone">mdi-email</v-icon>
                        <v-icon v-else>mdi-phone</v-icon>
                    </v-btn>
                </v-row>
                <v-form class=" mt-7 mb-12">
                    <v-slide-x-reverse-transition leave-absolute group>
                        <v-text-field
                            v-model="user.phone"
                            key="phone-field"
                            v-if="login_by_phone && !show_password_field"
                            filled
                            rounded
                            append-icon="mdi-phone"
                            color="primary"
                            type="tel"
                            placeholder="Phone number"
                        ></v-text-field>
                        <v-text-field
                            v-model="user.email"
                            key="email-field"
                            v-if="!login_by_phone && !show_password_field"
                            filled
                            rounded
                            append-icon="mdi-email"
                            color="primary"
                            type="email"
                            placeholder="Email"
                        ></v-text-field>
                        
                        <v-text-field
                            v-model="user.password"
                            key="password-field"
                            v-if="show_password_field"
                            filled
                            rounded
                            color="primary"
                            :type="show_password ? 'text' : 'password'"
                            placeholder="Password"
                        >
                            <v-icon @click="show_password = !show_password" slot="append">
                                {{show_password ? 'mdi-lock-open' : 'mdi-lock'}}
                            </v-icon>
                        </v-text-field>
                    </v-slide-x-reverse-transition>
                    <v-btn @click="nextStep" v-if="!show_password_field" block color="primary" dark rounded class="mb-4 elevation-7" x-large>
                        Next <v-icon>mdi-chevron-right</v-icon>
                    </v-btn>
                    <v-btn @click="loginUser" :loading="is_logging_in" v-else block color="primary" dark rounded class="mb-4 elevation-7" x-large>
                        Login <v-icon>mdi-login</v-icon>
                    </v-btn>
                    <div class=" text-center">
                        <v-btn rounded text color="secondary">forgot password?</v-btn>
                    </div>
                </v-form>
                <v-row class="my-7" justify="space-between" align="center">
                    <h4>Don't have an account?</h4>
                    <v-btn text rounded color="primary">Create</v-btn>
                </v-row>
            </div>        
        </v-row>
    </v-container>
</template>
<script>
import { 
    loginByEmailAndPassword,
    loginUserByPhoneAndPin 
    } from '../../../graphql/users.graphql'

export default {
    data() {
        return {
            login_by_phone: false,
            show_password_field: false,
            show_password: false,
            is_logging_in: false,
            user:{
                email: '',
                phone: '',
                password: '',
            },
            error: {
                message: '',
                show: false
            }
        }
    },
    methods: {
        nextStep(){
            if(this.user.email || this.user.phone)
                this.show_password_field = true
            else{
                this.error.message = 'Please fill in the field below'
                this.error.show = true
            }

        },
        loginUserByEmailAndPassword(){
            console.log('user email', this.user.email, this.user.password)
            this.$apollo.mutate({
                mutation: loginByEmailAndPassword,
                variables: {email: this.user.email, password: this.user.password}
            })
            .then(res=>{
                console.log(res)
                localStorage.setItem('token', res.data.loginByEmail.token)
                this.$router.push({name: 'user-home'})
            }).catch(err=>{
                this.error.message = err.graphQLErrors.length > 0 ? 
                    err.graphQLErrors[0].message :
                    err.message
                
                this.error.show = true
            }).finally(_=>{
                this.is_logging_in = false
            })
        },
        loginUserByPhoneAndPin(){
            console.log('user phone', this.user.phone, this.user.password)
            this.$apollo.mutate({
                mutation: loginUserByPhoneAndPin,
                variables: {email: this.user.email, pin: this.user.password}
            })
            .then(res=>{
                console.log(res)
                localStorage.setItem('token', res.data.loginByEmail.token)
                this.$router.push({name: 'user-home'})
            }).catch(err=>{
                this.error.message = err.graphQLErrors.length > 0 ? 
                    err.graphQLErrors[0].message :
                    err.message
                
                this.error.show = true
            }).finally(_=>{
                this.is_logging_in = false
            })
        },
        loginUser(){
            this.is_logging_in = true
            if(!this.login_by_phone){
                this.loginUserByEmailAndPassword()
            }else{
                this.loginUserByEmailAndPassword()
            }
        }
    },
}
</script>