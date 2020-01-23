<template>
  <div id="q-app">
    <input v-model="name" placeholder="name"/>
    <input v-model="email" placeholder="email"/>
    <input v-model="password" placeholder="password"/>
    <button @click="createUser">Add User</button>
    <ApolloQuery
    :query="require('./graphql/user.gql')"
    :variables="{ id }"
  >
    <template :slot="{result : {loading, error, data}}">
      <div v-if="data"> Data</div>
      <div v-else-if="loading"> loading</div>
      <div v-else-if="error"> Error</div>
    </template>
  </ApolloQuery>
    <pre>
      {{result}}
    </pre>
    {{user}}
  </div>
</template>

<script>
import gql from 'graphql-tag'
export default {
  name: 'App',
  apollo: {
    user: gql`
      query {
        user(id: "5e2199834016293ebc6a4ecb") {
          email username name id
        }
      }
    `
  },
  data() {
    return {
      id: "5e2199834016293ebc6a4ecb",
      name: "",
      email: "",
      password: "",
      result: {}

    }
  },
  methods: {
    async createUser(){
      try{
        this.result = await this.$apollo.mutate({
          mutation: gql`mutation ($name: String!, $email: String!, $password: String!){
            createUser(email: $email, password: $password, name: $name){
              id
            }
          }` ,
          variables:{
            name: this.name,
            email: this.email,
            password: this.password
          }
        })
      }catch(e){
        console.log(e.message)
      }
    }
  },
}
</script>
