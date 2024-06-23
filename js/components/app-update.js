//creating component for updating data
Vue.component('app-putdata', {
  template: `
  <!-- Updating mySQL Table With Name as Key -->
  <v-row>
    <v-col cols="12" md="6 ">
      <v-card class="mx-auto" max-width="90%">
        <v-card-text>
          <!-- Input -->
          <v-form name="myForm2" class="form-horizontal">
            <v-text-field label="imdbID" v-model="imdbID" /></v-text-field>
            <v-text-field label="Rating" v-model="movieRating" /></v-text-field>
            <v-text-field label="Review" v-model="movieReview" /></v-text-field>
            <v-btn depressed v-on:click="putData(imdbID,movieRating,movieReview )" color="#FFEE58">
              Update
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>
    <!-- Output -->
    <v-col cols="12" md="6">
      <v-card>
        <v-card-text>
          <p>Output Message : {{msg}}</p>
          <p>Status Code: {{statusVal}}</p>
          <p>Status: {{statusText}}</p>
        </v-card-text>
      </v-card>
    </v-col>

  </v-row>
  `,
     //variables initialization
    data: function() {
      return {
        imdbID: '',
        movieRating: '',
        movieReview: '',
        msg: '',
        statusVal: '',
        statusText: '',
      }
    },
    methods: {

    putData: function(id, rating, review) {
      var putSQLApiURL = 'resources/apis.php/imdbID/' + id;
      var self = this;
      // POST request using fetch with error handling
      const requestOptions = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          imdbID: id,
          Rating: rating,
          Review: review
        })
      };
      fetch(putSQLApiURL, requestOptions)
        .then( response =>{
          //turning the response into the usable data
          self.statusVal = response.status;
          self.statusText = response.statusText;
          return response.json( );
        })
        .then( data =>{
          //data you wanted to get from url
          self.msg="successful";
        })
        .catch(error => {
          self.msg=error
        });
      }
  }
})
