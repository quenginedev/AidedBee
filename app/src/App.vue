<template>
  <v-app>
    <v-layout>
      <router-view></router-view>
    </v-layout>
  </v-app>
</template>

<script>
import {gql} from 'apollo-boost'

export default {
  name: 'App',
  apollo: {
    users: {
      query : gql`
      query Users {
        users {
          email id
        }
      }
      `
    }
  }  
};
</script>
