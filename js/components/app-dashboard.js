const Dashboard = {
  // defining data to be used in the component
  data: function() {
    return {
      tab: null,
      items: [
        'Movie List', 'My Movie Review List', 'Add New Review', 'Update My Review', 'Delete My Review',
      ]
    }
  },

  // define the template for the component
  template: `
  <div id="dashboard">
    <v-card>
      <v-card-title class="text-center justify-center py-6">
        <h1 class="font-weight-bold display-3 basil--text">
          My Personal Movie Reviews
        </h1>
      </v-card-title>
      <v-card-text>
        <v-tabs
          v-model="tab"
          background-color="transparent"
          color="basil"
          grow
        >
          <v-tab
            v-for="item in items"
            :key="item"
          >
            {{ item }}
          </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
          <v-tab-item
            v-for="item in items"
            :key="item"
          >
            <v-card flat>
                <app-movielist v-if="item=='Movie List'"></app-movielist>
                
                <app-readmysql v-if="item=='My Movie Review List'"></app-readmysql>

                <app-postdata v-if="item=='Add New Review'"></app-postdata>

                <app-putdata v-if="item=='Update My Review'"></app-putdata>

                <app-deldata v-if="item=='Delete My Review'"></app-deldata>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-card-text>
    </v-card>
  </div>
    `
}
