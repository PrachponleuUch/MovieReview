Vue.component('app-postdata', {
  template: `
  <v-row>
    <v-col cols="12" md="6" >
      <v-card class="mx-auto" max-width="90%">
        <v-card-text>
          <v-form>
            <v-text-field label="imdbID" v-model="imdbID" /></v-text-field>
            <v-text-field label="Title" v-model="movieTitle" /></v-text-field>
            <v-text-field label="Year" v-model="movieYear" /></v-text-field>
            <v-text-field label="Type" v-model="movieType" /></v-text-field>
            <v-text-field label="Rating" v-model="movieRating" /></v-text-field>
            <v-text-field label="Review" v-model="movieReview" /></v-text-field>
            <v-btn depressed v-on:click="postData(imdbID,movieTitle, movieYear,movieType,movieRating,movieReview)" color="#00B0FF"> 
            Add
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col >
      <!-- Output -->
    <v-col cols="12" md="6">
      <v-card class="mx-auto" max-width="90%">
        <v-card-text>
          <p>Output Message : {{ msg }}</p>
          <p>Status Code: {{statusVal}}</p>
          <p>Status: {{statusText}}</p>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
  `,
  data: function() {
    return {
      movieTitle: '',
      imdbID: '',
      movieYear: '',
      movieType: '',
      movieRating: '',
      movieReview: '',
      msg: '',
      statusVal: '',
      statusText: ''
    }
  },
  methods: {

    postData: function(id, title, year, type, rating, review) {
      //define url for api
      var postSQLApiURL = 'resources/apis.php/'
      var self = this;
      // POST request using fetch with error handling
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          imdbID: id,
          Title: title,
          Year: year,
          Type: type,
          Rating: rating,
          Review: review
        })
      };
		fetch(postSQLApiURL, requestOptions)
      .then( response =>{
        //turning the response into the usable data
        self.statusVal = response.status;
        self.statusText = response.statusText;
        return response.json( );
      })
      .then( data =>{
        //This is the data you wanted to get from url
        self.msg = "Data Inserted Successfully."  ;
      })
      .catch(error => {
        self.msg = 'There was an error!' + error;
      });	
    }
  }
});
