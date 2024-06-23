
Vue.component('app-movielist', {
  // define the template for the component
  template: `
  <v-row> 
    <v-col cols="12" md="12" >
      <form>
        <div class="input-group mb-3">
            <input type="text" class="form-control form-control-lg" placeholder="Search Here" v-model="title">
            <button type="submit" class="input-group-text btn-dark" @click.prevent="search()">Search</button>
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
								<th id="more" scope='col'></th>
							</tr>
						</thead>
						
						<tbody v-show="movies">
            <tr v-for="m in getItems" scope='row'   >
              <td header="imdbID">{{m.imdbID}}</td>
              <td header="movieTitle">{{m.Title}}</td>
              <td header="movieYear">{{m.Year}}</td>
              <td header="movieType" >{{m.Type | formatStr}}</td>
              <td header="more" ><v-btn type="submit" class="input-group-text" color="#00B0FF" @click.prevent="postData(m.imdbID,m.Title, m.Year,m.Type)">Add</v-btn></td>
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
      title: '',
      msg: ''
    }
  },
  computed:{
    // returns the data according to the page number
    getItems: function() {
        let current = this.currentPage * this.perPage;
        let start = current - this.perPage;
        return this.movies ? this.movies.slice(start, current): this.movies;
    },
     //returns total number of pages required according to the total rows of data
    getPageCount: function() {
      return this.movies ? Math.ceil(this.movies.length / this.perPage): 1;
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
      search: function(){
        var self = this
        var readSQLApiURL = `https://www.omdbapi.com?apikey=35aba7c&s=${self.title}` //define url for api
        // GET request using fetch with error handling
        fetch(readSQLApiURL )
          .then( response =>{
            //turning the response into the usable data
            return response.json( );
          })
          .then( data =>{
            //data you wanted to get from url
            self.movies=data.Search;
          })
          .catch(error => {
            self.msg = error;
          });
      },
      postData: function(id, title, year, type) {
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
            Type: type
          })
        };
      fetch(postSQLApiURL, requestOptions)
        .then( response =>{
          //turning the response into the usable data
          return response.json( );
        })
        .then( data =>{
          //data you wanted to get from url
          self.msg = "Data Inserted Successfully.";
          alert(self.msg);
        })
        .catch(error => {
          self.msg = 'There was an error! ' + error + '\nNOTE: imdbID must be UNIQUE!';
          alert(self.msg);
        });	
      }
    },
  created() {
    this.search();
  }
})
// create pagination component
Vue.component('paginate', VuejsPaginate)
