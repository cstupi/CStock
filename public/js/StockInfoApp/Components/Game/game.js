var game_page = {
  template: '<div>\
    <my-games></my-games>\
  <game-list></game-list>\
  </div>'
};
Vue.component('my-games', {
  data() {
    return {
      loading: false,
      post: null,
      error: null,
      games: []
    }
  },
  created () {
    // fetch the data when the view is created and the data is
    // already being observed
    this.fetchData()
  },
  watch: {
    // call again the method if the route changes
    '$route': 'fetchData'
  },
  methods: {
    fetchData(){
      new GameAPI().GetAllForUser().then((g) => {
        this.games = g;
        this.loading = false;
      });
    },
    QuiteGame(gameid){
      return;
    }
  },
  template: '<div class="post">\
    <div class="loading" v-if="loading">\
      Loading...\
    </div>\
\
    <div v-if="error" class="error">\
      {{ error }}\
    </div>\
\
    <div v-if="games.length > 0" class="content">\
      <h2>My Games</h2>\
      <div v-for="game in games">{{ game.GameName }} {{ game.StartDate }} {{ game.EndDate }} <button v-on:click="QuitGame(game.GameId)">Leave</button></div>\
    </div>\
  </div>'
});
Vue.component('game-list', {
	data() {
    return {
      loading: false,
      post: null,
      error: null,
      games: [],
      mygames: [],
      password: null,
      selectedGame: null,
      showpasswordbox: false
    }
  },
  created () {
    // fetch the data when the view is created and the data is
    // already being observed
    this.fetchData()
  },
  watch: {
    // call again the method if the route changes
    '$route': 'fetchData'
  },
  methods: {
    fetchData () {
      this.error = null;
      this.loading = true;
      new GameAPI().GetAll().then((g) => {
        this.games = g;
        this.loading = false;
      });

    },
    PasswordPrompt(gameid){ 
      this.password = null;
      this.showpasswordbox = true;
      this.selectedGame = gameid;
    },
    JoinGame(gameid, password){
      if(!this.password || this.password.length == 0)
        this.password = null;
      new GameAPI().JoinGame(this.selectedGame, this.password).then((res) => {
        this.error = res;
      });
    },
    CancelJoin(){
      this.password = null;
      this.selectedGame = null;
      this.showpasswordbox = false;
    }
  },
	template: '<div class="post">\
    <div class="loading" v-if="loading">\
      Loading...\
    </div>\
\
    <div v-if="error" class="error">\
      {{ error }}\
    </div>\
\
    <div v-if="games.length > 0" class="content">\
      <h2>Available Games</h2>\
      <div v-for="game in games">{{ game.GameName }} {{ game.StartDate }} {{ game.EndDate }} <button v-on:click="PasswordPrompt(game.GameId)">Join</button></div>\
    </div>\
    <div v-if="showpasswordbox">\
    <input v-model="password" type="password"/>\
    <button  v-on:click="JoinGame(selectedGame, password)">Join</button>\
    <button v-on:click="CancelJoin()">Cancel</button>\
    </div>\
  </div>'
});