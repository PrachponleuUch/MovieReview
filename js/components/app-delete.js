// Delete API
Vue.component('app-deldata', {
  template: `
  <v-row>
		<v-col cols="12" md="6 ">
			<v-card class="mx-auto" max-width="90%">
				<v-card-text>
					<v-form>
						<v-text-field label="imdbID" v-model="imdbID" /></v-text-field>
						<v-btn depressed v-on:click="delData(imdbID)" color="#F4511E">Delete</v-btn>
					</v-form>
				</v-card-text>
			</v-card>
		</v-col>
		<!-- Output -->
		<v-col cols="12" md="6">
			<v-card class="mx-auto" max-width="90%">
				<v-card-text>
					<!-- Output -->
					<p>Output Message : {{msg}}</p>
					<p>Status Code: {{statusVal}}</p>
					<p>Status: {{statusText}}</p>
				</v-card-text>
			</v-card>
		</v-col>
	</v-row>
  `,
  // variable initialization
  data: function() {
    return {
			imdbID: '',
      msg: '',
      statusVal: '',
      statusText: '',
    }
  },

  methods: {

    delData: function(id) {
      var delSQLApiURL = 'resources/apis.php/imdbID/' + id;
      var self = this;
      // DELETE request using fetch with error handling
      const requestOptions = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          imdbID: id
        })
      };

			fetch(delSQLApiURL, requestOptions)
				.then( response =>{
					//turning the response into the usable data
					self.statusVal = response.status;
					self.statusText = response.statusText;
					return response.json( );
				})
				.then( data =>{
					//This is the data you wanted to get from url
					self.msg = "Data deleted Successfully"
					
				})
				.catch(error => {
					self.msg = 'There was an error!';
					self.statusText = error;
				});	
    }
  }
})
