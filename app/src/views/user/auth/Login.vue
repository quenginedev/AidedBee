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
            <div class="col-11">
                <v-row align="center" justify="space-between">
                    <v-btn v-if="show_password_field" @click="show_password_field = false" color="orange" dark fab> 
                        <v-icon>mdi-chevron-left</v-icon>
                    </v-btn>
                    
                    <v-avatar size="60px" class="orange elevation-5">
                        <v-icon size="60" color="white">mdi-bee</v-icon>
                    </v-avatar>
                        
                    <v-btn v-if="!show_password_field" @click="login_by_phone = !login_by_phone" color="orange" dark fab> 
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
                            color="orange"
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
                            color="orange"
                            type="email"
                            placeholder="Email"
                        ></v-text-field>
                        
                        <v-text-field
                            v-model="user.passowrd"
                            key="password-field"
                            v-if="show_password_field"
                            filled
                            rounded
                            color="orange"
                            :type="show_password ? 'text' : 'password'"
                            placeholder="Password"
                        >
                            <v-icon @click="show_password = !show_password" slot="append">
                                {{show_password ? 'mdi-lock-open' : 'mdi-lock'}}
                            </v-icon>
                        </v-text-field>
                    </v-slide-x-reverse-transition>
                    <v-btn @click="nextStep" v-if="!show_password_field" block color="orange" dark rounded class="mb-4 elevation-7" x-large>
                        Next <v-icon>mdi-chevron-right</v-icon>
                    </v-btn>
                    <v-btn @click="loginUser" :loading="is_logging_in" v-else block color="orange" dark rounded class="mb-4 elevation-7" x-large>
                        Login <v-icon>mdi-login</v-icon>
                    </v-btn>
                    <div class=" text-center">
                        <v-btn rounded text color="orange darken-2">forgot password?</v-btn>
                    </div>
                </v-form>
                <v-row class="my-7" justify="space-between" align="center">
                    <h4>Don't have an account?</h4>
                    <v-btn text rounded color="orange">Create</v-btn>
                </v-row>
            </div>        
        </v-row>
    </v-container>
</template>
<script>
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
                show: false,
                message: ''
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
        loginUser(){
            is_logging_in = true
            setTimeout(_=>{
                this.is_logging_in = false
            }, 5000)
        }
    },
}
</script>