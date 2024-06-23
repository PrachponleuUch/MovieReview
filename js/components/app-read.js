
Vue.component('app-readmysql', {
  // define the template for the component
  template: `
  <v-row>
    <v-col cols="12" md="12" >
      <form>
        <div class="input-group mb-3">
            <input type="text" class="form-control form-control-lg" placeholder="Search Here" v-model="input">
        </div>
      </form>
      <div class="row">
        <div class="table-responsive">
					<table  class="table table-hover table-striped">
						<thead class="thead-dark">
            <tr> 
              <th id="imdbID" scope='col'>imdbID</th>
              <th id="movieTitle" scope='col'>Title</th>
              <th id="movieYear" scope='col'>Year</th>
              <th id="movieType" scope='col'>Type</th>
              <th id="movieRating" scope='col'>Rating</th>
              <th id="movieReview" scope='col'>Review</th>
              <th id="more" scope='col'></th>
            </tr> 
						</thead>
						<tbody>
            <tr v-for="m in getItems" scope='row'   >
              <td header="imdbID">{{m.imdbID}}</td>
              <td header="movieTitle">{{m.Title}}</td>
              <td header="movieYear">{{m.Year}}</td>
              <td header="movieType" >{{m.Type | formatStr}}</td>
              <td header="movieRating" >{{m.Rating}}</td>
              <td header="movieReview" >{{m.Review}}</td>
              <td header="more"><v-btn depressed v-on:click="delData(m.imdbID)" color="#F4511E">Delete</v-btn></td>
            </tr> 
						</tbody>
					</table>
				</div>
			</div>
    </v-col>
    <v-col cols="12" md="12">
      <paginate
      :page-count=getPageCount
      :page-range="3"
      :margin-pages="1"
      :click-handler="clickCallback"
      :prev-text=" 'Prev' "
      :next-text="'Next'"
      :container-class="'pagination'"
      :page-class="'page-item'"
      :active-class="'currentPage'">
      </paginate>
    </v-col>
  </v-row>
  `,
   // variables initialization
  data: function() {
    return {
      perPage:3,
      currentPage:1,
      movies: [],
      input: ''
    }
  },
  computed:{
    // returns the data according to the page number
    getItems: function() {
        let current = this.currentPage * this.perPage;
        let start = current - this.perPage;
        return this.filterMovies.slice(start, current);
    },
     // returns total number of pages required according to the total rows of data
    getPageCount: function() {
      return Math.ceil(this.filterMovies.length / this.perPage);
    },
    // filters movies based on user input
    filterMovies: function(){
      return this.movies.filter((m) =>
              m.imdbID.toLowerCase().includes(this.input.toLowerCase()) ||
              m.Title.toLowerCase().includes(this.input.toLowerCase()) ||
              m.Year.toLowerCase().includes(this.input.toLowerCase()) ||
              m.Type.toLowerCase().includes(this.input.toLowerCase()) ||
              m.Rating.toLowerCase().includes(this.input.toLowerCase()) ||
              m.Review.toLowerCase().includes(this.input.toLowerCase()) 
            ); 
    }
  },
  //formats string so that the 1st letter is capitalized
  filters: {
    formatStr: function(str){
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
  },
  methods:{
    //sets the clicked page
      clickCallback: function(pageNum){
        this.currentPage = Number(pageNum);
      },
      delData: function(id) {
        var delSQLApiURL = 'resources/apis.php/imdbID/' + id; //define url for api
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
          return response.json( );
        })
        .then( data =>{
          //This is the data you wanted to get from url
          self.msg = "Data deleted Successfully";
          alert(self.msg);
        })
        .catch(error => {
          self.msg = 'There was an error!' + '\n' + error;
          alert(self.msg);
        });	
      }
    },
  created() {
    var self = this
    var readSQLApiURL = 'resources/apis.php/' //define url for api
    // GET request using fetch with error handling
    fetch(readSQLApiURL )
			.then( response =>{
			  //turning the response into the usable data
        return response.json( );
			})
			.then( data =>{
			  //This is the data you wanted to get from url
        self.movies=data;
			})
			.catch(error => {
        self.errorMessage = error;
			});
  }
})
// create pagination component
Vue.component('paginate', VuejsPaginate)
