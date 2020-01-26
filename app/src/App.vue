<template>
  <v-app>
    <v-content>
      <h1>Users</h1>
      <ApolloQuery :query="require('./graphql/users.gql').default">
        <template slot-scope="{ result: { loading, error, data } }">
          <div v-if="loading"> loading </div>
          <div v-if="error">
            {{error}}
          </div>
          <div v-if="data">
            {{data}}
          </div>
        </template>
      </ApolloQuery>
    </v-content>
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
