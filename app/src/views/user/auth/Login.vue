<template>
    <v-container>
        <v-row 
            justify="center"
            align="end"
            style="height: 100vh"
        >
            <div class="col-11">
                <v-row align="center" justify="space-between">
                    <v-avatar size="60px" class="orange elevation-7">
                        <v-icon size="60" color="white">mdi-bee</v-icon>
                    </v-avatar>
                        
                    <v-btn @click="login_by_phone = !login_by_phone" color="orange" dark fab> 
                        <v-icon v-if="login_by_phone">mdi-email</v-icon>
                        <v-icon v-else>mdi-phone</v-icon>
                    </v-btn>
                </v-row>
                <v-form class=" mt-7 mb-12">
                    <v-text-field
                        v-if="login_by_phone"
                        filled
                        rounded
                        append-icon="mdi-phone"
                        color="orange"
                        type="tel"
                        placeholder="Phone number"
                    ></v-text-field>
                    <v-text-field
                        v-if="!login_by_phone"
                        filled
                        rounded
                        append-icon="mdi-email"
                        color="orange"
                        type="email"
                        placeholder="Email"
                    ></v-text-field>
                    <v-btn block color="orange" dark rounded class="mb-4 elevation-7" x-large>
                        Next <v-icon>mdi-chevron-right</v-icon>
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
            login_by_phone: false
        }
    },
}
</script>