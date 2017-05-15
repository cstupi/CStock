var game_page = {
  template: '<div class="game-page">\
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
  template: '\
  <div class="game-container">\
   <h2>Your Games</h2>\
    <div v-if="games.length > 0" class="pure-g">\
      <div class="pure-u-1" v-for="game in games">\
        <div class="pure-g">\
          <div class="pure-u-4-24">{{ game.GameName }}</div> \
          <div class="pure-u-4-24">{{ game.StartDate }}</div>\
          <div class="pure-u-4-24">{{ game.EndDate }}</div>\
          <div class="pure-u-4-24"><button v-on:click="QuitGame(game.GameId)">Leave</button></div>\
          <div class="pure-u-4-24"><router-link :to="\'Trade/\' + game.GameId">Trade</router-link></div>\
          <div class="pure-u-4-24"><router-link :to="\'Portfolio/\' +game.GameId">Portfolio</router-link></div>\
        </div>\
      </div>\
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
        router.push("/portfolio/" + gameid);
        this.error = res;
      });
    },
    CancelJoin(){
      this.password = null;
      this.selectedGame = null;
      this.showpasswordbox = false;
    }
  },
	template: '\
  <div class="game-container">\
   <h2>Available Games</h2>\
    <div v-if="games.length > 0" class="pure-g">\
      <div class="pure-u-1" v-for="game in games">\
        <div class="pure-g">\
          <div class="pure-u-7-24">{{ game.GameName }}</div> \
          <div class="pure-u-7-24">{{ game.StartDate }}</div>\
          <div class="pure-u-4-24">{{ game.EndDate }}</div>\
          <div class="pure-u-6-24"><button v-on:click="PasswordPrompt(game.GameId)">Join</button></div>\
        </div>\
      </div>\
    </div>\
    <div v-if="showpasswordbox">\
      <label>Game Password: </label> \
      <input v-model="password" type="password" style="clear:both !important" />\
    <button  v-on:click="JoinGame(selectedGame, password)">Join</button>\
    <button v-on:click="CancelJoin()">Cancel</button>\
    </div>\
  </div>'
});